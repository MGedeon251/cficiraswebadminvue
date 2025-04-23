import { defineStore } from 'pinia';
import {
  getDiplomes,
  getDiplomeById,
  createDiplome,
  updateDiplome,
  deleteDiplome,
} from '@/api/pedagogies/pedagogieApi';
import { useMessageStore } from '@/stores/messages/messageStore';

export const useDiplomeStore = defineStore('diplomeStore', {
  state: () => ({
    diplomes: [],
    diplome: null,
    loading: false,
  }),

  actions: {
    // Récupérer tous les diplômes
    async fetchDiplomes() {
      this.loading = true;
      try {
        const response = await getDiplomes();
        this.diplomes = response.data;
      } catch (error) {
        useMessageStore().addError('Erreur lors de la récupération des diplômes.');
      } finally {
        this.loading = false;
      }
    },

    // Récupérer un diplôme par ID
    async fetchDiplomeById(id) {
      this.loading = true;
      try {
        const response = await getDiplomeById(id);
        this.diplome = response.data;
      } catch (error) {
        useMessageStore().addError('Erreur lors de la récupération du diplôme.');
      } finally {
        this.loading = false;
      }
    },

    // Ajouter un nouveau diplôme
    async addDiplome(data) {
      this.loading = true;
      try {
        await createDiplome(data);
        useMessageStore().addSuccess('Diplôme créé avec succès.');
        this.fetchDiplomes();
      } catch (error) {
        useMessageStore().addError('Erreur lors de la création du diplôme.');
      } finally {
        this.loading = false;
      }
    },

    // Modifier un diplôme existant
    async editDiplome(id, data) {
      this.loading = true;
      try {
        await updateDiplome(id, data);
        useMessageStore().addSuccess('Diplôme mis à jour avec succès.');
        this.fetchDiplomes();
      } catch (error) {
        useMessageStore().addError('Erreur lors de la mise à jour du diplôme.');
      } finally {
        this.loading = false;
      }
    },

    // Supprimer un diplôme
    async removeDiplome(id) {
      this.loading = true;
      try {
        await deleteDiplome(id);
        useMessageStore().addSuccess('Diplôme supprimé avec succès.');
        this.fetchDiplomes();
      } catch (error) {
        useMessageStore().addError('Erreur lors de la suppression du diplôme.');
      } finally {
        this.loading = false;
      }
    },
  },
});
