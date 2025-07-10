import { defineStore } from 'pinia';
import {
  getConcours,
  getConcoursById,
  createConcours,
  updateConcours,
  deleteConcours,
} from '@/api/gestions/gestionApi';
import { useMessageStore } from '@/stores/messages/messageStore';

export const useConcourStore = defineStore('concourStore', {
  state: () => ({
    concours: [],
    concoursDetail: null,
    loading: false,
  }),

  actions: {
    // Récupérer tous les concours
    async fetchConcours() {
      this.loading = true;
      try {
        const response = await getConcours();
        this.concours = response.data;
      } catch (error) {
        useMessageStore().addError('Erreur lors de la récupération des concours.');
      } finally {
        this.loading = false;
      }
    },

    // Récupérer un concours par ID
    async fetchConcoursById(id) {
      this.loading = true;
      try {
        const response = await getConcoursById(id);
        this.concoursDetail = response;
      } catch (error) {
        useMessageStore().addError('Erreur lors de la récupération du concours.');
      } finally {
        this.loading = false;
      }
    },

    // Ajouter un nouveau concours
    async addConcours(data) {
      this.loading = true;
      try {
        await createConcours(data);
        useMessageStore().addSuccess('Concours créé avec succès.');
        this.fetchConcours();
      } catch (error) {
        useMessageStore().addError('Erreur lors de la création du concours.');
      } finally {
        this.loading = false;
      }
    },

    // Modifier un concours existant
    async editConcours(id, data) {
      this.loading = true;
      try {
        await updateConcours(id, data);
        useMessageStore().addSuccess('Concours mis à jour avec succès.');
        this.fetchConcours();
      } catch (error) {
        useMessageStore().addError('Erreur lors de la mise à jour du concours.');
      } finally {
        this.loading = false;
      }
    },

    // Supprimer un concours
    async removeConcours(id) {
      this.loading = true;
      try {
        await deleteConcours(id);
        useMessageStore().addSuccess('Concours supprimé avec succès.');
        this.fetchConcours();
      } catch (error) {
        useMessageStore().addError('Erreur lors de la suppression du concours.');
      } finally {
        this.loading = false;
      }
    },
  },
});
