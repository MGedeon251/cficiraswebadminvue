import { defineStore } from 'pinia';
import {
  getFilieres,
  createFiliere,
  updateFiliere,
  deleteFiliere,
} from '@/api/academique/academiqueApi';
import { useMessageStore } from '@/stores/messages/messageStore';

export const useFiliereStore = defineStore('filiereStore', {
  state: () => ({
    filieres: [],
    loading: false,
  }),

  actions: {
    // Récupérer toutes les filières
    async fetchFilieres() {
      this.loading = true;
      try {
        const response = await getFilieres();
        this.filieres = response;
      } catch (error) {
        useMessageStore().addError('Erreur lors de la récupération des filières.');
      } finally {
        this.loading = false;
      }
    },

    // Ajouter une nouvelle filière
    async addFiliere(data) {
      this.loading = true;
      try {
        await createFiliere(data);
        useMessageStore().addSuccess('Filière créée avec succès.');
        this.fetchFilieres();
      } catch (error) {
        useMessageStore().addError('Erreur lors de la création de la filière.');
      } finally {
        this.loading = false;
      }
    },

    // Modifier une filière existante
    async editFiliere(id, data) {
      this.loading = true;
      try {
        await updateFiliere(id, data);
        useMessageStore().addSuccess('Filière mise à jour avec succès.');
        this.fetchFilieres();
      } catch (error) {
        useMessageStore().addError('Erreur lors de la mise à jour de la filière.');
      } finally {
        this.loading = false;
      }
    },

    // Supprimer une filière
    async removeFiliere(id) {
      this.loading = true;
      try {
        await deleteFiliere(id);
        useMessageStore().addSuccess('Filière supprimée avec succès.');
        this.fetchFilieres();
      } catch (error) {
        useMessageStore().addError('Erreur lors de la suppression de la filière.');
      } finally {
        this.loading = false;
      }
    },
  },
});
