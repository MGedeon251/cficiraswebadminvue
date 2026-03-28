import { defineStore } from 'pinia';
import {
  getAnneesAcademiques,
  createAnneeAcademique,
  updateAnneeAcademique,
  deleteAnneeAcademique,
} from '@/api/academique/academiqueApi';
import { useMessageStore } from '@/stores/messages/messageStore';
import { extractErrorMessage } from '@/stores/messages/useErrorMessage';

// Helpers pour gérer le cache
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
  const cached = localStorage.getItem(key);
  if (!cached) return null;

  const parsed = JSON.parse(cached);
  if (Date.now() - parsed.timestamp > ttl) {
    localStorage.removeItem(key);
    return null;
  }
  return parsed.data;
}

export const useAnneeStore = defineStore('anneeStore', {
  state: () => ({
    anneesAcademiques: [],
    anneeAcademique: null,
    loading: false,
  }),

  actions: {
    // Récupérer toutes les années académiques
    async fetchAnneesAcademiques() {
      const messageStore = useMessageStore();
      this.loading = true;
      try {
        const cached = getCache('anneesAcademiques');
        if (cached) {
          this.anneesAcademiques = cached;
        } else {
          const response = await getAnneesAcademiques();
          this.anneesAcademiques = response;
          setCache('anneesAcademiques', response);
        }
      } catch (error) {
        messageStore.notifyError('Erreur lors de la récupération des données.');
      } finally {
        this.loading = false;
      }
    },

    // Ajouter une nouvelle année académique
    async addAnneeAcademique(data) {
      const messageStore = useMessageStore();
      this.loading = true;
      try {
        await createAnneeAcademique(data);
        messageStore.notifySuccess('Année académique créée avec succès.');
        localStorage.removeItem('anneesAcademiques');
        await this.fetchAnneesAcademiques();
      } catch (error) {
        const errorMsg = extractErrorMessage(error, "Erreur lors de la création de l'année.");
        messageStore.notifyError(errorMsg);
      } finally {
        this.loading = false;
      }
    },

    // Modifier une année académique existante
    async editAnneeAcademique(id, data) {
      const messageStore = useMessageStore();
      this.loading = true;
      try {
        await updateAnneeAcademique(id, data);
        messageStore.notifySuccess('Année académique mise à jour avec succès.');
        localStorage.removeItem('anneesAcademiques');
        await this.fetchAnneesAcademiques();
      } catch (error) {
        const errorMsg = extractErrorMessage(error, 'Erreur lors de la mise à jour.');
        messageStore.notifyError(errorMsg);
      } finally {
        this.loading = false;
      }
    },

    // Supprimer une année académique
    async removeAnneeAcademique(id) {
      const messageStore = useMessageStore();
      this.loading = true;
      try {
        await deleteAnneeAcademique(id);
        messageStore.notifySuccess('Année académique supprimée avec succès.');
        localStorage.removeItem('anneesAcademiques');
        await this.fetchAnneesAcademiques();
      } catch (error) {
        const errorMsg = extractErrorMessage(error, 'Erreur lors de la suppression.');
        messageStore.notifyError(errorMsg);
      } finally {
        this.loading = false;
      }
    },
  },
});
