import { defineStore } from 'pinia';
import {
  getModules,
  getModuleById,
  createModule,
  updateModule,
  deleteModule,
} from '@/api/academique/moduleApi';
import { useMessageStore } from '@/stores/messages/messageStore';

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
  // TTL par défaut : 5 minutes
  const cached = localStorage.getItem(key);
  if (!cached) return null;

  const parsed = JSON.parse(cached);
  if (Date.now() - parsed.timestamp > ttl) {
    localStorage.removeItem(key);
    return null;
  }
  return parsed.data;
}

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
        const cached = getCache('modules');
        if (cached) {
          this.modules = cached;
        } else {
          const response = await getModules();
          this.modules = response;
          setCache('modules', response);
        }
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
        const cached = getCache(`module_${id}`);
        if (cached) {
          this.module = cached;
        } else {
          const response = await getModuleById(id);
          this.module = response;
          setCache(`module_${id}`, response);
        }
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
        localStorage.removeItem('modules'); // Invalider le cache
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
        localStorage.removeItem('modules'); // Invalider le cache
        localStorage.removeItem(`module_${id}`);
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
        localStorage.removeItem('modules'); // Invalider le cache
        localStorage.removeItem(`module_${id}`);
        this.fetchModules();
      } catch (error) {
        useMessageStore().addError('Erreur lors de la suppression du module.');
      } finally {
        this.loading = false;
      }
    },
  },
});
