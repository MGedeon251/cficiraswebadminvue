import { defineStore } from 'pinia';
import {
  getInscriptions,
  getInscriptionById,
  createInscription,
  updateInscription,
  deleteInscription,
} from '@/api/gestions/gestionApi';
import { useMessageStore } from '@/stores/messages/messageStore';

export const useInscriptionStore = defineStore('inscriptionStore', {
  state: () => ({
    inscriptions: [],
    inscription: null,
    loading: false,
  }),

  actions: {
    // Récupérer toutes les inscriptions
    async fetchInscriptions() {
      this.loading = true;
      try {
        const response = await getInscriptions();
        this.inscriptions = response.data;
      } catch (error) {
        useMessageStore().addError('Erreur lors de la récupération des inscriptions.');
      } finally {
        this.loading = false;
      }
    },

    // Récupérer une inscription par ID
    async fetchInscriptionById(id) {
      this.loading = true;
      try {
        const response = await getInscriptionById(id);
        this.inscription = response.data;
      } catch (error) {
        useMessageStore().addError("Erreur lors de la récupération de l'inscription.");
      } finally {
        this.loading = false;
      }
    },

    // Ajouter une nouvelle inscription
    async addInscription(data) {
      this.loading = true;
      try {
        await createInscription(data);
        useMessageStore().addSuccess('Inscription créée avec succès.');
        this.fetchInscriptions();
      } catch (error) {
        useMessageStore().addError("Erreur lors de la création de l'inscription.");
      } finally {
        this.loading = false;
      }
    },

    // Modifier une inscription existante
    async editInscription(id, data) {
      this.loading = true;
      try {
        await updateInscription(id, data);
        useMessageStore().addSuccess('Inscription mise à jour avec succès.');
        this.fetchInscriptions();
      } catch (error) {
        useMessageStore().addError("Erreur lors de la mise à jour de l'inscription.");
      } finally {
        this.loading = false;
      }
    },

    // Supprimer une inscription
    async removeInscription(id) {
      this.loading = true;
      try {
        await deleteInscription(id);
        useMessageStore().addSuccess('Inscription supprimée avec succès.');
        this.fetchInscriptions();
      } catch (error) {
        useMessageStore().addError("Erreur lors de la suppression de l'inscription.");
      } finally {
        this.loading = false;
      }
    },
  },
});
