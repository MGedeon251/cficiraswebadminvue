import { defineStore } from 'pinia';
import {
  getNiveaux,
  getCycleNiveau,
  createNiveau,
  updateNiveau,
  deleteNiveau,
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

export const useNiveauStore = defineStore('niveauStore', {
  state: () => ({
    niveaux: [],
    loading: false,
  }),

  actions: {
    // Récupérer tous les niveaux
    async fetchNiveaux() {
      const { notifyError } = useNotifier();
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
        notifyError(extractErrorMessage(error, 'Échec lors du chargement des données.'));
      } finally {
        this.loading = false;
      }
    },

    // Ajouter un nouveau niveau
    async addNiveau(data) {
      const { notifyError } = useNotifier();
      this.loading = true;
      try {
        await createNiveau(data);
        useMessageStore().addMessage('Niveau créé avec succès.');
        localStorage.removeItem('niveaux'); // Invalider le cache
        this.fetchNiveaux();
      } catch (error) {
        notifyError(extractErrorMessage(error, 'Échec lors du chargement des données.'));
      } finally {
        this.loading = false;
      }
    },

    // Modifier un niveau existant
    async editNiveau(id, data) {
      const { notifyError } = useNotifier();
      this.loading = true;
      try {
        await updateNiveau(id, data);
        useMessageStore().addSuccess('Niveau mis à jour avec succès.');
        localStorage.removeItem('niveaux'); // Invalider le cache
        this.fetchNiveaux();
      } catch (error) {
        notifyError(extractErrorMessage(error, 'Échec lors du chargement des données.'));
      } finally {
        this.loading = false;
      }
    },

    // Supprimer un niveau
    async removeNiveau(id) {
      const { notifyError } = useNotifier();
      this.loading = true;
      try {
        await deleteNiveau(id);
        useMessageStore().addSuccess('Niveau supprimé avec succès.');
        localStorage.removeItem('niveaux'); // Invalider le cache
        this.fetchNiveaux();
      } catch (error) {
        notifyError(extractErrorMessage(error, 'Échec lors du chargement des données.'));
      } finally {
        this.loading = false;
      }
    },

    // Récupérer les niveaux par cycle
    async getNiveauByCycle(id) {
      const { notifyError } = useNotifier();
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
        notifyError(extractErrorMessage(error, 'Échec lors du chargement des données.'));
      } finally {
        this.loading = false;
      }
    },
  },
});
