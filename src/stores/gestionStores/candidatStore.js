import { defineStore } from 'pinia';
import {
  getCandidatures,
  getResultatsConcours,
  getCandidatureById,
  createCandidature,
  updateCandidature,
  deleteCandidature,
  importCandidats,
  importNotesCandidats,
  addOrUpdatesNotes,
} from '@/api/gestions/gestionApi';

import { useNotifier } from '@/stores/messages/useNotifier';
import { extractErrorMessage } from '@/stores/messages/useErrorMessage';

const STORAGE_KEY = 'candidatStoreData';
const CANDIDATURES_KEY = 'candidatures';
const DETAIL_KEY = 'candidatureDetail';

export const useCandidatStore = defineStore('candidatStore', {
  state: () => ({
    candidatures: [],
    candidatureDetail: null,
    loading: false,
  }),

  actions: {
    // Initialiser depuis localStorage
    initFromLocalStorage() {
      try {
        const storedData = localStorage.getItem(STORAGE_KEY);
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          if (parsedData[CANDIDATURES_KEY]) {
            this.candidatures = parsedData[CANDIDATURES_KEY];
          }
          if (parsedData[DETAIL_KEY]) {
            this.candidatureDetail = parsedData[DETAIL_KEY];
          }
        }
      } catch (error) {
        console.error('Erreur lors de la lecture du localStorage:', error);
        this.clearLocalStorage();
      }
    },

    // Sauvegarder dans localStorage
    saveToLocalStorage() {
      try {
        const dataToStore = {
          [CANDIDATURES_KEY]: this.candidatures,
          [DETAIL_KEY]: this.candidatureDetail,
          timestamp: new Date().toISOString(), // Optionnel : pour suivre la fraîcheur des données
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToStore));
      } catch (error) {
        console.error('Erreur lors de la sauvegarde dans localStorage:', error);
      }
    },

    // Vider le localStorage
    clearLocalStorage() {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (error) {
        console.error('Erreur lors du nettoyage du localStorage:', error);
      }
    },

    async fetchCandidatures(concoursId) {
      const { notifyError } = useNotifier();
      this.loading = true;
      try {
        const response = await getCandidatures(concoursId);
        this.candidatures = response.data;
        // Sauvegarder dans localStorage après récupération
        this.saveToLocalStorage();
      } catch (e) {
        // En cas d'erreur API, essayer de charger depuis le cache
        console.warn('API error, trying to load from cache...');
        this.initFromLocalStorage();
        notifyError(extractErrorMessage(e, 'Erreur lors de la récupération des candidatures.'));
      } finally {
        this.loading = false;
      }
    },

    async fetchCandidatureById(id) {
      const { notifyError } = useNotifier();
      this.loading = true;
      try {
        const response = await getCandidatureById(id);
        this.candidatureDetail = response;
        // Sauvegarder les détails dans localStorage
        this.saveToLocalStorage();
      } catch (e) {
        // Essayer de trouver le candidat dans les données locales
        const localCandidat = this.candidatures.find(c => c.id === id);
        if (localCandidat) {
          this.candidatureDetail = localCandidat;
          console.info('Candidat chargé depuis le cache local');
        } else {
          notifyError(extractErrorMessage(e, 'Erreur lors de la récupération du candidat.'));
        }
      } finally {
        this.loading = false;
      }
    },

    async addCandidature(data) {
      const { notifySuccess, notifyError } = useNotifier();
      this.loading = true;
      try {
        const response = await createCandidature(data);
        notifySuccess(response?.message || 'Candidat ajouté avec succès.');
        
        // Actualiser depuis l'API
        if (response.concours_id) {
          await this.fetchCandidatures(response.concours_id);
        } else {
          // Si pas d'ID concours, mettre à jour localement
          this.candidatures.push(response.data);
          this.saveToLocalStorage();
        }
      } catch (e) {
        notifyError(extractErrorMessage(e, 'Erreur lors de l’ajout du candidat.'));
      } finally {
        this.loading = false;
      }
    },

    async AddUpdateNotes(data) {
      const { notifySuccess, notifyError } = useNotifier();
      this.loading = true;
      try {
        const response = await addOrUpdatesNotes(data);
        notifySuccess(response?.message || 'Notes mises a jour avec succès.');
        
        // Actualiser depuis l'API
        if (response.concours_id) {
          await this.fetchCandidatures(response.concours_id);
        }
      } catch (e) {
        notifyError(extractErrorMessage(e, 'Erreur lors de l’ajout du candidat.'));
      } finally {
        this.loading = false;
      }
    },

    async editCandidature(id, data) {
      const { notifySuccess, notifyError } = useNotifier();
      this.loading = true;
      try {
        const response = await updateCandidature(id, data);
        notifySuccess(response?.message || 'Candidature mise à jour avec succès.');
        
        // Mettre à jour localement
        const index = this.candidatures.findIndex(c => c.id === id);
        if (index !== -1 && response.data) {
          this.candidatures[index] = { ...this.candidatures[index], ...response.data };
          this.saveToLocalStorage();
        }
      } catch (e) {
        notifyError(extractErrorMessage(e, 'Erreur lors de la mise à jour de la candidature.'));
      } finally {
        this.loading = false;
      }
    },

    async removeCandidature(id) {
      const { notifySuccess, notifyError } = useNotifier();
      this.loading = true;
      try {
        const response = await deleteCandidature(id);
        notifySuccess(response?.message || 'Candidat supprimé avec succès.');
        
        // Supprimer localement
        this.candidatures = this.candidatures.filter(c => c.id !== id);
        if (this.candidatureDetail?.id === id) {
          this.candidatureDetail = null;
        }
        this.saveToLocalStorage();
      } catch (e) {
        notifyError(extractErrorMessage(e, 'Erreur lors de la suppression du candidat.'));
      } finally {
        this.loading = false;
      }
    },

    async importCandidats(file, concoursId) {
      const { notifySuccess, notifyError } = useNotifier();
      this.loading = true;
      try {
        const response = await importCandidats(file, concoursId);
        if (response.success) {
          notifySuccess(`Importation réussie de ${response.data.imported} candidat(s).`);
        } else {
          notifyError(
            `Import partiel : ${response.data.imported} réussi(s), ${response.data.failed} échec(s).`
          );
        }
        if (response.success && response.data.imported > 0) {
          try {
            await this.fetchCandidatures(concoursId);
          } catch (fetchError) {
            notifyError(
              extractErrorMessage(fetchError, 'Erreur lors du rechargement des candidatures')
            );
          }
        }
      } catch (e) {
        notifyError(extractErrorMessage(e, "Erreur lors de l'importation des candidats."));
      } finally {
        this.loading = false;
      }
    },

    async importNotesCandidats(file, concoursId) {
      const { notifySuccess, notifyError } = useNotifier();
      this.loading = true;
      try {
        const response = await importNotesCandidats(file, concoursId);
        if (response.success) {
          notifySuccess(`Importation réussie de ${response.data.imported} notes de candidat(s).`);
        } else {
          notifyError(
            `Import partiel : ${response.data.imported} réussi(s), ${response.data.failed} échec(s).`
          );
        }
        if (response.success && response.data.imported > 0) {
          try {
            await getResultatsConcours(concoursId);
          } catch (fetchError) {
            notifyError(
              extractErrorMessage(fetchError, 'Erreur lors du rechargement des notes des candidats')
            );
          }
        }
      } catch (e) {
        notifyError(
          extractErrorMessage(e, "Erreur lors de l'importation des notes des candidats.")
        );
      } finally {
        this.loading = false;
      }
    },

    // Méthode utilitaire pour forcer une synchronisation
    async syncWithServer(concoursId) {
      await this.fetchCandidatures(concoursId);
    },

    // Méthode pour obtenir les données fraîches uniquement si nécessaire
    async getCandidaturesWithCache(concoursId, forceRefresh = false) {
      if (forceRefresh || this.candidatures.length === 0) {
        await this.fetchCandidatures(concoursId);
      } else {
        this.initFromLocalStorage();
      }
      return this.candidatures;
    },
  },
});