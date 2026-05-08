import { defineStore } from 'pinia';
import {
  getCycles,
  getCycleFiliere,
  getOrganisation,
  createCycle,
  updateCycle,
  deleteCycle,
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

export const useCycleStore = defineStore('cycleStore', {
  state: () => ({
    cycles: [],
    Filierecycles: [],
    loading: false,
  }),

  actions: {
    // Récupérer tous les cycles
    async fetchCycles() {
      const messageStore = useMessageStore();
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
        messageStore.notifyError(
          extractErrorMessage(error, 'Échec lors du chargement des cycles.')
        );
      } finally {
        this.loading = false;
      }
    },

    // Récupérer les cycles par filière
    async fetchFiliereCycle() {
      const messageStore = useMessageStore();
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
        messageStore.notifyError(
          extractErrorMessage(error, 'Échec lors du chargement des filières.')
        );
      } finally {
        this.loading = false;
      }
    },

    async fetchOrganisation() {
      const messageStore = useMessageStore();
      this.loading = true;
      try {
        const response = await getOrganisation();
        return response;
      } catch (error) {
        messageStore.notifyError(
          extractErrorMessage(error, "Échec lors du chargement de l'organisation.")
        );
      } finally {
        this.loading = false;
      }
    },

    // Ajouter un nouveau cycle
    async addCycle(data) {
      const messageStore = useMessageStore();
      this.loading = true;
      try {
        await createCycle(data);
        messageStore.notifySuccess('Cycle créé avec succès.');
        localStorage.removeItem('cycles');
        localStorage.removeItem('filiereCycles'); // On invalide aussi le cache lié
        await this.fetchCycles();
      } catch (error) {
        messageStore.notifyError(
          extractErrorMessage(error, 'Erreur lors de la création du cycle.')
        );
      } finally {
        this.loading = false;
      }
    },

    // Modifier un cycle existant
    async editCycle(id, data) {
      const messageStore = useMessageStore();
      this.loading = true;
      try {
        await updateCycle(id, data);
        messageStore.notifySuccess('Cycle mis à jour avec succès.');
        localStorage.removeItem('cycles');
        localStorage.removeItem('filiereCycles');
        await this.fetchCycles();
      } catch (error) {
        messageStore.notifyError(
          extractErrorMessage(error, 'Erreur lors de la modification du cycle.')
        );
      } finally {
        this.loading = false;
      }
    },

    // Supprimer un cycle
    async removeCycle(id) {
      const messageStore = useMessageStore();
      this.loading = true;
      try {
        await deleteCycle(id);
        messageStore.notifySuccess('Cycle supprimé avec succès.');
        localStorage.removeItem('cycles');
        localStorage.removeItem('filiereCycles');
        await this.fetchCycles();
      } catch (error) {
        messageStore.notifyError(
          extractErrorMessage(error, 'Erreur lors de la suppression du cycle.')
        );
      } finally {
        this.loading = false;
      }
    },
  },
});
