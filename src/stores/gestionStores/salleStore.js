import { defineStore } from 'pinia';
import {
  getSalles,
  getSalleById,
  createSalle,
  updateSalle,
  deleteSalle,
} from '@/api/gestions/gestionApi';
import { useMessageStore } from '@/stores/messages/messageStore';

export const useSalleStore = defineStore('salleStore', {
  state: () => ({
    salles: [],
    salle: null,
    loading: false,
  }),

  actions: {
    // Récupérer toutes les salles
    async fetchSalles() {
      this.loading = true;
      try {
        const response = await getSalles();
        this.salles = response.data;
      } catch (error) {
        useMessageStore().addError('Erreur lors de la récupération des salles.');
      } finally {
        this.loading = false;
      }
    },

    // Récupérer une salle par ID
    async fetchSalleById(id) {
      this.loading = true;
      try {
        const response = await getSalleById(id);
        this.salle = response.data;
      } catch (error) {
        useMessageStore().addError('Erreur lors de la récupération de la salle.');
      } finally {
        this.loading = false;
      }
    },

    // Ajouter une nouvelle salle
    async addSalle(data) {
      this.loading = true;
      try {
        await createSalle(data);
        useMessageStore().addSuccess('Salle créée avec succès.');
        this.fetchSalles();
      } catch (error) {
        useMessageStore().addError('Erreur lors de la création de la salle.');
      } finally {
        this.loading = false;
      }
    },

    // Modifier une salle existante
    async editSalle(id, data) {
      this.loading = true;
      try {
        await updateSalle(id, data);
        useMessageStore().addSuccess('Salle mise à jour avec succès.');
        this.fetchSalles();
      } catch (error) {
        useMessageStore().addError('Erreur lors de la mise à jour de la salle.');
      } finally {
        this.loading = false;
      }
    },

    // Supprimer une salle
    async removeSalle(id) {
      this.loading = true;
      try {
        await deleteSalle(id);
        useMessageStore().addSuccess('Salle supprimée avec succès.');
        this.fetchSalles();
      } catch (error) {
        useMessageStore().addError('Erreur lors de la suppression de la salle.');
      } finally {
        this.loading = false;
      }
    },
  },
});
