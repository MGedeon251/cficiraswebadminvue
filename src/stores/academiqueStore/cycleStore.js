import { defineStore } from 'pinia';
import { getCycles, createCycle, updateCycle, deleteCycle } from '@/api/academique/academiqueApi';
import { useMessageStore } from '@/stores/messages/messageStore';

export const useCycleStore = defineStore('cycleStore', {
  state: () => ({
    cycles: [],
    loading: false,
  }),

  actions: {
    // Récupérer tous les cycles
    async fetchCycles() {
      this.loading = true;
      try {
        const response = await getCycles();
        this.cycles = response.data;
      } catch (error) {
        useMessageStore().addError('Erreur lors de la récupération des cycles.');
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
        this.fetchCycles();
      } catch (error) {
        useMessageStore().addError('Erreur lors de la suppression du cycle.');
      } finally {
        this.loading = false;
      }
    },
  },
});
