import { defineStore } from 'pinia';
import {
  getFilieres,
  getFiliereOrganisation,
  createFiliere,
  updateFiliere,
  deleteFiliere,
} from '@/api/academique/academiqueApi';
import { useMessageStore } from '@/stores/messages/messageStore';
import { useNotifier } from '@/stores/messages/useNotifier';
import { extractErrorMessage } from '@/stores/messages/useErrorMessage';

// Helpers pour gérer le cache
function setCache(key, data) {
  localStorage.setItem(key, JSON.stringify({
    data,
    timestamp: Date.now()
  }));
}

function getCache(key, ttl = 5 * 60 * 1000) { // TTL par défaut : 5 minutes
  const cached = localStorage.getItem(key);
  if (!cached) return null;

  const parsed = JSON.parse(cached);
  if (Date.now() - parsed.timestamp > ttl) {
    localStorage.removeItem(key);
    return null;
  }
  return parsed.data;
}

export const useFiliereStore = defineStore('filiereStore', {
  state: () => ({
    filieres: [],
    FiliereOrganisation: [],
    loading: false,
  }),

  actions: {
    // Récupérer toutes les filières
    async fetchFilieres() {
      const { notifyError } = useNotifier();
      this.loading = true;
      try {
        const cached = getCache('filieres');
        if (cached) {
          this.filieres = cached;
        } else {
          const response = await getFilieres();
          this.filieres = response;
          setCache('filieres', response);
        }
      } catch (error) {
        notifyError(extractErrorMessage(error, 'Échec lors du chargement des données.'));
      } finally {
        this.loading = false;
      }
    },
    async organisationFilieres() {
      const { notifyError } = useNotifier();
      this.loading = true;
      try {
        const cached = getCache('filieres_organisation');
        if (cached) {
          this.FiliereOrganisation = cached;
        } else {
          const response = await getFiliereOrganisation();
          this.FiliereOrganisation = response ;
          setCache('filieres_organisation', response);
          return response ; 
        }
      } catch (error) {
        notifyError(extractErrorMessage(error, 'Échec lors du chargement des données.'));
      } finally {
        this.loading = false;
      }
    },

    // Ajouter une nouvelle filière
    async addFiliere(data) {
      const { notifyError } = useNotifier();
      this.loading = true;
      try {
        await createFiliere(data);
        useMessageStore().addMessage('Filière créée avec succès.');
        localStorage.removeItem('filieres'); // Invalider le cache
        this.fetchFilieres();
      } catch (error) {
        notifyError(extractErrorMessage(error, 'Échec lors de la creation de la filiere.'));
      } finally {
        this.loading = false;
      }
    },

    // Modifier une filière existante
    async editFiliere(id, data) {
      const { notifyError } = useNotifier();
      this.loading = true;
      try {
        await updateFiliere(id, data);
        useMessageStore().addMessage('Filière mise à jour avec succès.');
        localStorage.removeItem('filieres'); // Invalider le cache
        this.fetchFilieres();
      } catch (error) {
       notifyError(extractErrorMessage(error, 'Échec lors de l\'edition de la filiere.'));
      } finally {
        this.loading = false;
      }
    },

    // Supprimer une filière
    async removeFiliere(id) {
      const { notifyError } = useNotifier();
      this.loading = true;
      try {
        await deleteFiliere(id);
        useMessageStore().addMessage('Filière supprimée avec succès.');
        localStorage.removeItem('filieres'); // Invalider le cache
        this.fetchFilieres();
      } catch (error) {
        notifyError(extractErrorMessage(error, 'Échec lors de la suppresion .'));
      } finally {
        this.loading = false;
      }
    },
  },
});
