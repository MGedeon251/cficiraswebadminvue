import { defineStore } from 'pinia';
import {
  getFactures,
  getFactureById,
  createFacture,
  updateFacture,
  deleteFacture,
} from '@/api/finances/financeApi';
import { useMessageStore } from '@/stores/messages/messageStore';

export const useFactureStore = defineStore('factureStore', {
  state: () => ({
    factures: [],
    facture: null,
    loading: false,
  }),

  actions: {
    // Récupérer toutes les factures
    async fetchFactures() {
      this.loading = true;
      try {
        const response = await getFactures();
        this.factures = response.data;
      } catch (error) {
        useMessageStore().addError('Erreur lors de la récupération des factures.');
      } finally {
        this.loading = false;
      }
    },

    // Récupérer une facture par ID
    async fetchFactureById(id) {
      this.loading = true;
      try {
        const response = await getFactureById(id);
        this.facture = response.data;
      } catch (error) {
        useMessageStore().addError('Erreur lors de la récupération de la facture.');
      } finally {
        this.loading = false;
      }
    },

    // Ajouter une nouvelle facture
    async addFacture(data) {
      this.loading = true;
      try {
        await createFacture(data);
        useMessageStore().addSuccess('Facture créée avec succès.');
        this.fetchFactures();
      } catch (error) {
        useMessageStore().addError('Erreur lors de la création de la facture.');
      } finally {
        this.loading = false;
      }
    },

    // Modifier une facture existante
    async editFacture(id, data) {
      this.loading = true;
      try {
        await updateFacture(id, data);
        useMessageStore().addSuccess('Facture mise à jour avec succès.');
        this.fetchFactures();
      } catch (error) {
        useMessageStore().addError('Erreur lors de la mise à jour de la facture.');
      } finally {
        this.loading = false;
      }
    },

    // Supprimer une facture
    async removeFacture(id) {
      this.loading = true;
      try {
        await deleteFacture(id);
        useMessageStore().addSuccess('Facture supprimée avec succès.');
        this.fetchFactures();
      } catch (error) {
        useMessageStore().addError('Erreur lors de la suppression de la facture.');
      } finally {
        this.loading = false;
      }
    },
  },
});
