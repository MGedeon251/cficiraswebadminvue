import { defineStore } from 'pinia';
import {
  getCycles,
  getCycleFiliere,
  createCycle,
  updateCycle,
  deleteCycle,
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

export const useCycleStore = defineStore('cycleStore', {
  state: () => ({
    cycles: [],
    Filierecycles: [],
    loading: false,
  }),

  actions: {
    // Récupérer tous les cycles
    async fetchCycles() {
      const { notifyError } = useNotifier();
      this.loading = true;
      try {
        const cached = getCache('cycles');
        if (cached) {
          this.cycles = cached;
        } else {
          const response = await getCycles();
          this.cycles = response;
          setCache('cycles', response);
        }
      } catch (error) {
        notifyError(extractErrorMessage(error, 'Échec lors du chargement des données.'));
      } finally {
        this.loading = false;
      }
    },

    // Récupérer les cycles par filière
    async fetchFiliereCycle() {
      const { notifyError } = useNotifier();
      this.loading = true;
      try {
        const cached = getCache('filiereCycles');
        if (cached) {
          this.Filierecycles = cached;
        } else {
          const response = await getCycleFiliere();
          this.Filierecycles = response?.[0]?.data?.cycles ?? [];
          setCache('filiereCycles', this.Filierecycles);
        }
      } catch (error) {
        notifyError(extractErrorMessage(error, 'Échec lors du chargement des données.'));
      } finally {
        this.loading = false;
      }
    },

    // Ajouter un nouveau cycle
    async addCycle(data) {
      this.loading = true;
      try {
        await createCycle(data);
        useMessageStore().addSuccess('Cycle créé avec succès.');
        localStorage.removeItem('cycles'); // Invalider le cache
        this.fetchCycles();
      } catch (error) {
        useMessageStore().addError('Erreur lors de la création du cycle.');
      } finally {
        this.loading = false;
      }
    },

    // Modifier un cycle existant
    async editCycle(id, data) {
      this.loading = true;
      try {
        await updateCycle(id, data);
        useMessageStore().addSuccess('Cycle mis à jour avec succès.');
        localStorage.removeItem('cycles'); // Invalider le cache
        this.fetchCycles();
      } catch (error) {
        useMessageStore().addError('Erreur lors de la mise à jour du cycle.');
      } finally {
        this.loading = false;
      }
    },

    // Supprimer un cycle
    async removeCycle(id) {
      this.loading = true;
      try {
        await deleteCycle(id);
        useMessageStore().addSuccess('Cycle supprimé avec succès.');
        localStorage.removeItem('cycles'); // Invalider le cache
        this.fetchCycles();
      } catch (error) {
        useMessageStore().addError('Erreur lors de la suppression du cycle.');
      } finally {
        this.loading = false;
      }
    },
  },
});
