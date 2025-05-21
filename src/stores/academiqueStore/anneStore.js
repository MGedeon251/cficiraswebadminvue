import { defineStore } from 'pinia';
import {
  getAnneesAcademiques,
  createAnneeAcademique,
  updateAnneeAcademique,
  deleteAnneeAcademique,
} from '@/api/academique/academiqueApi';
import { useMessageStore } from '@/stores/messages/messageStore';

export const useAnneeStore = defineStore('anneeStore', {
  state: () => ({
    anneesAcademiques: [],
    anneeAcademique: null,
    loading: false,
  }),

  actions: {
    // Récupérer toutes les années académiques
    async fetchAnneesAcademiques() {
      this.loading = true;
      try {
        const response = await getAnneesAcademiques();
        this.anneesAcademiques = response;
      } catch (error) {
        useMessageStore().addError('Erreur lors de la récupération des années académiques.');
      } finally {
        this.loading = false;
      }
    },

    // Ajouter une nouvelle année académique
    async addAnneeAcademique(data) {
      this.loading = true;
      try {
        await createAnneeAcademique(data);
        useMessageStore().addSuccess('Année académique créée avec succès.');
        this.fetchAnneesAcademiques();
      } catch (error) {
        useMessageStore().addError("Erreur lors de la création de l'année académique.");
      } finally {
        this.loading = false;
      }
    },

    // Modifier une année académique existante
    async editAnneeAcademique(id, data) {
      this.loading = true;
      try {
        await updateAnneeAcademique(id, data);
        useMessageStore().addSuccess('Année académique mise à jour avec succès.');
        this.fetchAnneesAcademiques();
      } catch (error) {
        useMessageStore().addError("Erreur lors de la mise à jour de l'année académique.");
      } finally {
        this.loading = false;
      }
    },

    // Supprimer une année académique
    async removeAnneeAcademique(id) {
      this.loading = true;
      try {
        await deleteAnneeAcademique(id);
        useMessageStore().addSuccess('Année académique supprimée avec succès.');
        this.fetchAnneesAcademiques();
      } catch (error) {
        useMessageStore().addError("Erreur lors de la suppression de l'année académique.");
      } finally {
        this.loading = false;
      }
    },
  },
});
