import { defineStore } from 'pinia';
import {
  getContrats,
  getContratById,
  createContrat,
  updateContrat,
  deleteContrat,
} from '@/api/pedagogies/pedagogieApi';
import { useMessageStore } from '@/stores/messages/messageStore';

export const useContratStore = defineStore('contratStore', {
  state: () => ({
    contrats: [],
    contrat: null,
    loading: false,
  }),

  actions: {
    // Récupérer tous les contrats
    async fetchContrats() {
      this.loading = true;
      try {
        const response = await getContrats();
        this.contrats = response.data;
      } catch (error) {
        useMessageStore().addError('Erreur lors de la récupération des contrats.');
      } finally {
        this.loading = false;
      }
    },

    // Récupérer un contrat par ID
    async fetchContratById(id) {
      this.loading = true;
      try {
        const response = await getContratById(id);
        this.contrat = response.data;
      } catch (error) {
        useMessageStore().addError('Erreur lors de la récupération du contrat.');
      } finally {
        this.loading = false;
      }
    },

    // Ajouter un nouveau contrat
    async addContrat(data) {
      this.loading = true;
      try {
        await createContrat(data);
        useMessageStore().addSuccess('Contrat créé avec succès.');
        this.fetchContrats();
      } catch (error) {
        useMessageStore().addError('Erreur lors de la création du contrat.');
      } finally {
        this.loading = false;
      }
    },

    // Modifier un contrat existant
    async editContrat(id, data) {
      this.loading = true;
      try {
        await updateContrat(id, data);
        useMessageStore().addSuccess('Contrat mis à jour avec succès.');
        this.fetchContrats();
      } catch (error) {
        useMessageStore().addError('Erreur lors de la mise à jour du contrat.');
      } finally {
        this.loading = false;
      }
    },

    // Supprimer un contrat
    async removeContrat(id) {
      this.loading = true;
      try {
        await deleteContrat(id);
        useMessageStore().addSuccess('Contrat supprimé avec succès.');
        this.fetchContrats();
      } catch (error) {
        useMessageStore().addError('Erreur lors de la suppression du contrat.');
      } finally {
        this.loading = false;
      }
    },
  },
});
