import { defineStore } from 'pinia';
import {
  getAnneesAcademiques,
  createAnneeAcademique,
  updateAnneeAcademique,
  deleteAnneeAcademique,
} from '@/api/academique/academiqueApi';
import { useMessageStore } from '@/stores/messages/messageStore';
import { useNotifier } from '@/stores/messages/useNotifier';
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

export const useAnneeStore = defineStore('anneeStore', {
  state: () => ({
    anneesAcademiques: [],
    anneeAcademique: null,
    loading: false,
  }),

  actions: {
    // Récupérer toutes les années académiques
    async fetchAnneesAcademiques() {
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
        useMessageStore().addError('Erreur lors de la récupération des années académiques.');
      } finally {
        this.loading = false;
      }
    },

    // Ajouter une nouvelle année académique
    async addAnneeAcademique(data) {
      const { notifyError } = useNotifier();
      this.loading = true;
      try {
        await createAnneeAcademique(data);
        useMessageStore().addMessage('Année académique créée avec succès.');
        localStorage.removeItem('anneesAcademiques'); // Invalider le cache
        this.fetchAnneesAcademiques();
      } catch (error) {
        notifyError(extractErrorMessage(error, "Erreur lors de la création de l'année."));
      } finally {
        this.loading = false;
      }
    },

    // Modifier une année académique existante
    async editAnneeAcademique(id, data) {
      this.loading = true;
      try {
        await updateAnneeAcademique(id, data);
        useMessageStore().addSuccess('Année académique mise à jour avec succès.');
        localStorage.removeItem('anneesAcademiques'); // Invalider le cache
        this.fetchAnneesAcademiques();
      } catch (error) {
        useMessageStore().addError("Erreur lors de la mise à jour de l'année académique.");
      } finally {
        this.loading = false;
      }
    },

    // Supprimer une année académique
    async removeAnneeAcademique(id) {
      this.loading = true;
      try {
        await deleteAnneeAcademique(id);
        useMessageStore().addSuccess('Année académique supprimée avec succès.');
        localStorage.removeItem('anneesAcademiques'); // Invalider le cache
        this.fetchAnneesAcademiques();
      } catch (error) {
        useMessageStore().addError("Erreur lors de la suppression de l'année académique.");
      } finally {
        this.loading = false;
      }
    },
  },
});
