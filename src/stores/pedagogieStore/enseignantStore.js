import { defineStore } from 'pinia';
import {
  getEnseignants,
  getEnseignantById,
  createEnseignant,
  updateEnseignant,
  deleteEnseignant,
} from '@/api/pedagogies/pedagogieApi';
import { useMessageStore } from '@/stores/messages/messageStore';

export const useEnseignantStore = defineStore('enseignantStore', {
  state: () => ({
    enseignants: [],
    enseignant: null,
    loading: false,
  }),

  actions: {
    // Récupérer tous les enseignants
    async fetchEnseignants() {
      this.loading = true;
      try {
        const response = await getEnseignants();
        this.enseignants = response.data;
      } catch (error) {
        useMessageStore().addError('Erreur lors de la récupération des enseignants.');
      } finally {
        this.loading = false;
      }
    },

    // Récupérer un enseignant par ID
    async fetchEnseignantById(id) {
      this.loading = true;
      try {
        const response = await getEnseignantById(id);
        this.enseignant = response.data;
      } catch (error) {
        useMessageStore().addError("Erreur lors de la récupération de l'enseignant.");
      } finally {
        this.loading = false;
      }
    },

    // Ajouter un nouvel enseignant
    async addEnseignant(data) {
      this.loading = true;
      try {
        await createEnseignant(data);
        useMessageStore().addSuccess('Enseignant créé avec succès.');
        this.fetchEnseignants();
      } catch (error) {
        useMessageStore().addError("Erreur lors de la création de l'enseignant.");
      } finally {
        this.loading = false;
      }
    },

    // Modifier un enseignant existant
    async editEnseignant(id, data) {
      this.loading = true;
      try {
        await updateEnseignant(id, data);
        useMessageStore().addSuccess('Enseignant mis à jour avec succès.');
        this.fetchEnseignants();
      } catch (error) {
        useMessageStore().addError("Erreur lors de la mise à jour de l'enseignant.");
      } finally {
        this.loading = false;
      }
    },

    // Supprimer un enseignant
    async removeEnseignant(id) {
      this.loading = true;
      try {
        await deleteEnseignant(id);
        useMessageStore().addSuccess('Enseignant supprimé avec succès.');
        this.fetchEnseignants();
      } catch (error) {
        useMessageStore().addError("Erreur lors de la suppression de l'enseignant.");
      } finally {
        this.loading = false;
      }
    },
  },
});
