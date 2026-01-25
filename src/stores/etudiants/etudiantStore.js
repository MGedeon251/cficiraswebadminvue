import { defineStore } from 'pinia';
import {
  getEtudiants,
  getEtudiantById,
  createEtudiant,
  updateEtudiant,
  deleteEtudiant,
  getEtudiantsByClasseFiliereAnnee,
} from '@/api/academique/etudiantApi';
import { getAnneesAcademiques, getFilieres, getClasses } from '@/api/academique/academiqueApi';
import { useMessageStore } from '@/stores/messages/messageStore';

function setCache(key, data) {
  localStorage.setItem(
    key,
    JSON.stringify({
      data,
      timestamp: Date.now(),
    })
  );
}

function getCache(key, ttl = 5 * 60 * 1000) {
  // TTL par défaut : 5 minutes
  const cached = localStorage.getItem(key);
  if (!cached) return null;

  const parsed = JSON.parse(cached);
  if (Date.now() - parsed.timestamp > ttl) {
    localStorage.removeItem(key);
    return null;
  }
  return parsed.data;
}

export const useEtudiantStore = defineStore('etudiantStore', {
  state: () => ({
    etudiants: [],
    etudiant: null,
    anneesAcademiques: [],
    filieres: [],
    classes: [],
    filteredEtudiants: [],
    loading: false,
  }),

  actions: {
    // Récupérer tous les étudiants
    async fetchEtudiants() {
      this.loading = true;
      try {
        const cached = getCache('etudiants');
        if (cached) {
          this.etudiants = cached;
        } else {
          const response = await getEtudiants();
          this.etudiants = response;
          setCache('etudiants', response);
        }
      } catch (error) {
        useMessageStore().addMessage('Erreur lors de la récupération des étudiants.');
      } finally {
        this.loading = false;
      }
    },

    // Récupérer un étudiant par ID
    async fetchEtudiantById(id) {
      this.loading = true;
      try {
        const cached = getCache(`etudiant_${id}`);
        if (cached) {
          this.etudiant = cached;
        } else {
          const response = await getEtudiantById(id);
          this.etudiant = response.data;
          setCache(`etudiant_${id}`, response.data);
        }
      } catch (error) {
        useMessageStore().addError("Erreur lors de la récupération de l'étudiant.");
      } finally {
        this.loading = false;
      }
    },

    // Ajouter un nouvel étudiant
    async addEtudiant(data) {
      this.loading = true;
      try {
        await createEtudiant(data);
        useMessageStore().addSuccess('Étudiant créé avec succès.');
        localStorage.removeItem('etudiants'); // Invalider le cache
        this.fetchEtudiants();
      } catch (error) {
        useMessageStore().addError("Erreur lors de la création de l'étudiant.");
      } finally {
        this.loading = false;
      }
    },

    // Modifier un étudiant existant
    async editEtudiant(id, data) {
      this.loading = true;
      try {
        await updateEtudiant(id, data);
        useMessageStore().addSuccess('Étudiant mis à jour avec succès.');
        localStorage.removeItem('etudiants');
        localStorage.removeItem(`etudiant_${id}`);
        this.fetchEtudiants();
      } catch (error) {
        useMessageStore().addError("Erreur lors de la mise à jour de l'étudiant.");
      } finally {
        this.loading = false;
      }
    },

    // Supprimer un étudiant
    async removeEtudiant(id) {
      this.loading = true;
      try {
        await deleteEtudiant(id);
        useMessageStore().addSuccess('Étudiant supprimé avec succès.');
        localStorage.removeItem('etudiants');
        localStorage.removeItem(`etudiant_${id}`);
        this.fetchEtudiants();
      } catch (error) {
        useMessageStore().addError("Erreur lors de la suppression de l'étudiant.");
      } finally {
        this.loading = false;
      }
    },

    // Récupérer toutes les années académiques
    async fetchAnneesAcademiques() {
      this.loading = true;
      try {
        const cached = getCache('anneesAcademiques');
        if (cached) {
          this.anneesAcademiques = cached;
        } else {
          const response = await getAnneesAcademiques();
          this.anneesAcademiques = response.data;
          setCache('anneesAcademiques', response.data);
        }
      } catch (error) {
        useMessageStore().addError('Erreur lors de la récupération des années académiques.');
      } finally {
        this.loading = false;
      }
    },

    // Récupérer toutes les filières
    async fetchFilieres() {
      this.loading = true;
      try {
        const cached = getCache('filieres');
        if (cached) {
          this.filieres = cached;
        } else {
          const response = await getFilieres();
          this.filieres = response.data;
          setCache('filieres', response.data);
        }
      } catch (error) {
        useMessageStore().addError('Erreur lors de la récupération des filières.');
      } finally {
        this.loading = false;
      }
    },

    // Récupérer toutes les classes
    async fetchClasses() {
      this.loading = true;
      try {
        const cached = getCache('classes');
        if (cached) {
          this.classes = cached;
        } else {
          const response = await getClasses();
          this.classes = response.data;
          setCache('classes', response.data);
        }
      } catch (error) {
        useMessageStore().addError('Erreur lors de la récupération des classes.');
      } finally {
        this.loading = false;
      }
    },

    // Récupérer les étudiants par classe, filière et année académique
    async fetchEtudiantsByClasseFiliereAnnee(classeId, filiereId, anneeAcademiqueId) {
      this.loading = true;
      const cacheKey = `etudiants_${classeId}_${filiereId}_${anneeAcademiqueId}`;
      try {
        const cached = getCache(cacheKey);
        if (cached) {
          this.filteredEtudiants = cached;
        } else {
          const response = await getEtudiantsByClasseFiliereAnnee(
            classeId,
            filiereId,
            anneeAcademiqueId
          );
          this.filteredEtudiants = response.data;
          setCache(cacheKey, response.data);
        }
      } catch (error) {
        useMessageStore().addError('Erreur lors de la récupération des étudiants filtrés.');
      } finally {
        this.loading = false;
      }
    },
  },
});
