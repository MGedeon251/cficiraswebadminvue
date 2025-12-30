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
        const response = await getNiveaux();
        this.niveaux = response;
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
        useMessageStore().addSuccess('Niveau créé avec succès.');
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
        this.fetchNiveaux();
      } catch (error) {
        notifyError(extractErrorMessage(error, 'Échec lors du chargement des données.'));
      } finally {
        this.loading = false;
      }
    },
   async getNiveauByCycle(id) {
      const { notifyError } = useNotifier();
      this.loading = true;
      try {
        const response = await getCycleNiveau(id);
        this.niveaux = response;
      } catch (error) {
        notifyError(extractErrorMessage(error, 'Échec lors du chargement des données.'));
      } finally {
        this.loading = false;
      }
    }
  },
});
