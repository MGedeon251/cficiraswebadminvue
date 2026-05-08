import { defineStore } from 'pinia';
import {
  getFilieres,
  getFiliereOrganisation,
  createFiliere,
  updateFiliere,
  deleteFiliere,
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

export const useFiliereStore = defineStore('filiereStore', {
  state: () => ({
    filieres: [],
    FiliereOrganisation: [],
    loading: false,
  }),

  actions: {
    // Récupérer toutes les filières
    async fetchFilieres() {
      const messageStore = useMessageStore();
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
        messageStore.notifyError(
          extractErrorMessage(error, 'Échec lors du chargement des filières.')
        );
      } finally {
        this.loading = false;
      }
    },

    async organisationFilieres() {
      const messageStore = useMessageStore();
      this.loading = true;
      try {
        const cached = getCache('filieres_organisation');
        if (cached) {
          this.FiliereOrganisation = cached;
          return cached;
        } else {
          const response = await getFiliereOrganisation();
          this.FiliereOrganisation = response;
          setCache('filieres_organisation', response);
          return response;
        }
      } catch (error) {
        messageStore.notifyError(
          extractErrorMessage(error, "Échec lors du chargement de l'organisation.")
        );
      } finally {
        this.loading = false;
      }
    },

    // Ajouter une nouvelle filière
    async addFiliere(data) {
      const messageStore = useMessageStore();
      this.loading = true;
      try {
        await createFiliere(data);
        messageStore.notifySuccess('Filière créée avec succès.');
        localStorage.removeItem('filieres');
        localStorage.removeItem('filieres_organisation');
        await this.fetchFilieres();
      } catch (error) {
        messageStore.notifyError(
          extractErrorMessage(error, 'Échec lors de la création de la filière.')
        );
      } finally {
        this.loading = false;
      }
    },

    // Modifier une filière existante
    async editFiliere(id, data) {
      const messageStore = useMessageStore();
      this.loading = true;
      try {
        await updateFiliere(id, data);
        messageStore.notifySuccess('Filière mise à jour avec succès.');
        localStorage.removeItem('filieres');
        localStorage.removeItem('filieres_organisation');
        await this.fetchFilieres();
      } catch (error) {
        messageStore.notifyError(
          extractErrorMessage(error, "Échec lors de l'édition de la filière.")
        );
      } finally {
        this.loading = false;
      }
    },

    // Supprimer une filière
    async removeFiliere(id) {
      const messageStore = useMessageStore();
      this.loading = true;
      try {
        await deleteFiliere(id);
        messageStore.notifySuccess('Filière supprimée avec succès.');
        localStorage.removeItem('filieres');
        localStorage.removeItem('filieres_organisation');
        await this.fetchFilieres();
      } catch (error) {
        messageStore.notifyError(
          extractErrorMessage(error, 'Échec lors de la suppression de la filière.')
        );
      } finally {
        this.loading = false;
      }
    },
  },
});
