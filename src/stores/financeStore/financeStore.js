import { defineStore } from 'pinia';
import {
  getFinances,
  getFinanceById,
  createFinance,
  updateFinance,
  deleteFinance,
} from '@/api/finances/financeApi';
import { useMessageStore } from '@/stores/messages/messageStore';

export const useFinanceStore = defineStore('financeStore', {
  state: () => ({
    finances: [],
    finance: null,
    loading: false,
  }),

  actions: {
    async fetchFinances() {
      this.loading = true;
      try {
        const response = await getFinances();
        this.finances = response.data;
      } catch (error) {
        useMessageStore().addError('Erreur lors de la récupération des finances.');
      } finally {
        this.loading = false;
      }
    },

    async fetchFinanceById(id) {
      this.loading = true;
      try {
        const response = await getFinanceById(id);
        this.finance = response.data;
      } catch (error) {
        useMessageStore().addError('Erreur lors de la récupération de la finance.');
      } finally {
        this.loading = false;
      }
    },

    async addFinance(data) {
      this.loading = true;
      try {
        await createFinance(data);
        useMessageStore().addSuccess('Finance créée avec succès.');
        this.fetchFinances();
      } catch (error) {
        useMessageStore().addError('Erreur lors de la création de la finance.');
      } finally {
        this.loading = false;
      }
    },

    async editFinance(id, data) {
      this.loading = true;
      try {
        await updateFinance(id, data);
        useMessageStore().addSuccess('Finance mise à jour avec succès.');
        this.fetchFinances();
      } catch (error) {
        useMessageStore().addError('Erreur lors de la mise à jour de la finance.');
      } finally {
        this.loading = false;
      }
    },

    async removeFinance(id) {
      this.loading = true;
      try {
        await deleteFinance(id);
        useMessageStore().addSuccess('Finance supprimée avec succès.');
        this.fetchFinances();
      } catch (error) {
        useMessageStore().addError('Erreur lors de la suppression de la finance.');
      } finally {
        this.loading = false;
      }
    },
  },
});
