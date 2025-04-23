import { defineStore } from 'pinia';
import {
  getNiveaux,
  createNiveau,
  updateNiveau,
  deleteNiveau,
} from '@/api/academique/academiqueApi';
import { useMessageStore } from '@/stores/messages/messageStore';

export const useNiveauStore = defineStore('niveauStore', {
  state: () => ({
    niveaux: [],
    loading: false,
  }),

  actions: {
    // Récupérer tous les niveaux
    async fetchNiveaux() {
      this.loading = true;
      try {
        const response = await getNiveaux();
        this.niveaux = response.data;
      } catch (error) {
        useMessageStore().addError('Erreur lors de la récupération des niveaux.');
      } finally {
        this.loading = false;
      }
    },

    // Ajouter un nouveau niveau
    async addNiveau(data) {
      this.loading = true;
      try {
        await createNiveau(data);
        useMessageStore().addSuccess('Niveau créé avec succès.');
        this.fetchNiveaux();
      } catch (error) {
        useMessageStore().addError('Erreur lors de la création du niveau.');
      } finally {
        this.loading = false;
      }
    },

    // Modifier un niveau existant
    async editNiveau(id, data) {
      this.loading = true;
      try {
        await updateNiveau(id, data);
        useMessageStore().addSuccess('Niveau mis à jour avec succès.');
        this.fetchNiveaux();
      } catch (error) {
        useMessageStore().addError('Erreur lors de la mise à jour du niveau.');
      } finally {
        this.loading = false;
      }
    },

    // Supprimer un niveau
    async removeNiveau(id) {
      this.loading = true;
      try {
        await deleteNiveau(id);
        useMessageStore().addSuccess('Niveau supprimé avec succès.');
        this.fetchNiveaux();
      } catch (error) {
        useMessageStore().addError('Erreur lors de la suppression du niveau.');
      } finally {
        this.loading = false;
      }
    },
  },
});
