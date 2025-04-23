import { defineStore } from 'pinia';
import {
  getModules,
  getModuleById,
  createModule,
  updateModule,
  deleteModule,
} from '@/api/gestions/moduleApi';
import { useMessageStore } from '@/stores/messages/messageStore';

export const useModuleStore = defineStore('moduleStore', {
  state: () => ({
    modules: [],
    module: null,
    loading: false,
  }),

  actions: {
    // Récupérer tous les modules
    async fetchModules() {
      this.loading = true;
      try {
        const response = await getModules();
        this.modules = response.data;
      } catch (error) {
        useMessageStore().addError('Erreur lors de la récupération des modules.');
      } finally {
        this.loading = false;
      }
    },

    // Récupérer un module par ID
    async fetchModuleById(id) {
      this.loading = true;
      try {
        const response = await getModuleById(id);
        this.module = response.data;
      } catch (error) {
        useMessageStore().addError('Erreur lors de la récupération du module.');
      } finally {
        this.loading = false;
      }
    },

    // Ajouter un nouveau module
    async addModule(data) {
      this.loading = true;
      try {
        await createModule(data);
        useMessageStore().addSuccess('Module créé avec succès.');
        this.fetchModules();
      } catch (error) {
        useMessageStore().addError('Erreur lors de la création du module.');
      } finally {
        this.loading = false;
      }
    },

    // Modifier un module existant
    async editModule(id, data) {
      this.loading = true;
      try {
        await updateModule(id, data);
        useMessageStore().addSuccess('Module mis à jour avec succès.');
        this.fetchModules();
      } catch (error) {
        useMessageStore().addError('Erreur lors de la mise à jour du module.');
      } finally {
        this.loading = false;
      }
    },

    // Supprimer un module
    async removeModule(id) {
      this.loading = true;
      try {
        await deleteModule(id);
        useMessageStore().addSuccess('Module supprimé avec succès.');
        this.fetchModules();
      } catch (error) {
        useMessageStore().addError('Erreur lors de la suppression du module.');
      } finally {
        this.loading = false;
      }
    },
  },
});
