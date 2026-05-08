import { defineStore } from 'pinia';
import {
  getNiveaux,
  getCycleNiveau,
  createNiveau,
  updateNiveau,
  deleteNiveau,
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

export const useNiveauStore = defineStore('niveauStore', {
  state: () => ({
    niveaux: [],
    loading: false,
  }),

  actions: {
    // Récupérer tous les niveaux
    async fetchNiveaux() {
      const messageStore = useMessageStore();
      this.loading = true;
      try {
        const cached = getCache('niveaux');
        if (cached) {
          this.niveaux = cached;
        } else {
          const response = await getNiveaux();
          this.niveaux = response;
          setCache('niveaux', response);
        }
      } catch (error) {
        messageStore.notifyError(
          extractErrorMessage(error, 'Échec lors du chargement des niveaux.')
        );
      } finally {
        this.loading = false;
      }
    },

    // Ajouter un nouveau niveau
    async addNiveau(data) {
      const messageStore = useMessageStore();
      this.loading = true;
      try {
        await createNiveau(data);
        messageStore.notifySuccess('Niveau créé avec succès.');
        localStorage.removeItem('niveaux');
        await this.fetchNiveaux();
      } catch (error) {
        messageStore.notifyError(
          extractErrorMessage(error, 'Échec lors de la création du niveau.')
        );
      } finally {
        this.loading = false;
      }
    },

    // Modifier un niveau existant
    async editNiveau(id, data) {
      const messageStore = useMessageStore();
      this.loading = true;
      try {
        await updateNiveau(id, data);
        messageStore.notifySuccess('Niveau mis à jour avec succès.');
        localStorage.removeItem('niveaux');
        localStorage.removeItem(`niveaux_cycle_${id}`);
        await this.fetchNiveaux();
      } catch (error) {
        messageStore.notifyError(
          extractErrorMessage(error, 'Échec lors de la mise à jour du niveau.')
        );
      } finally {
        this.loading = false;
      }
    },

    // Supprimer un niveau
    async removeNiveau(id) {
      const messageStore = useMessageStore();
      this.loading = true;
      try {
        await deleteNiveau(id);
        messageStore.notifySuccess('Niveau supprimé avec succès.');
        localStorage.removeItem('niveaux');
        localStorage.removeItem(`niveaux_cycle_${id}`);
        await this.fetchNiveaux();
      } catch (error) {
        messageStore.notifyError(
          extractErrorMessage(error, 'Échec lors de la suppression du niveau.')
        );
      } finally {
        this.loading = false;
      }
    },

    // Récupérer les niveaux par cycle
    async getNiveauByCycle(id) {
      const messageStore = useMessageStore();
      this.loading = true;
      const cacheKey = `niveaux_cycle_${id}`;
      try {
        const cached = getCache(cacheKey);
        if (cached) {
          this.niveaux = cached;
        } else {
          const response = await getCycleNiveau(id);
          this.niveaux = response;
          setCache(cacheKey, response);
        }
      } catch (error) {
        messageStore.notifyError(
          extractErrorMessage(error, 'Échec lors du chargement des niveaux par cycle.')
        );
      } finally {
        this.loading = false;
      }
    },
  },
});
