import { defineStore } from 'pinia';
import {
  getCreneaux,
  getCreneauById,
  createCreneau,
  updateCreneau,
  deleteCreneau,
} from '@/api/gestions/gestionApi';
import { useMessageStore } from '@/stores/messages/messageStore';

export const useCrenauStore = defineStore('crenauStore', {
  state: () => ({
    creneaux: [],
    creneau: null,
    loading: false,
  }),

  actions: {
    // Récupérer tous les créneaux
    async fetchCreneaux() {
      this.loading = true;
      try {
        const response = await getCreneaux();
        this.creneaux = response.data;
      } catch (error) {
        useMessageStore().addError('Erreur lors de la récupération des créneaux.');
      } finally {
        this.loading = false;
      }
    },

    // Récupérer un créneau par ID
    async fetchCreneauById(id) {
      this.loading = true;
      try {
        const response = await getCreneauById(id);
        this.creneau = response.data;
      } catch (error) {
        useMessageStore().addError('Erreur lors de la récupération du créneau.');
      } finally {
        this.loading = false;
      }
    },

    // Ajouter un nouveau créneau
    async addCreneau(data) {
      this.loading = true;
      try {
        await createCreneau(data);
        useMessageStore().addSuccess('Créneau créé avec succès.');
        this.fetchCreneaux();
      } catch (error) {
        useMessageStore().addError('Erreur lors de la création du créneau.');
      } finally {
        this.loading = false;
      }
    },

    // Modifier un créneau existant
    async editCreneau(id, data) {
      this.loading = true;
      try {
        await updateCreneau(id, data);
        useMessageStore().addSuccess('Créneau mis à jour avec succès.');
        this.fetchCreneaux();
      } catch (error) {
        useMessageStore().addError('Erreur lors de la mise à jour du créneau.');
      } finally {
        this.loading = false;
      }
    },

    // Supprimer un créneau
    async removeCreneau(id) {
      this.loading = true;
      try {
        await deleteCreneau(id);
        useMessageStore().addSuccess('Créneau supprimé avec succès.');
        this.fetchCreneaux();
      } catch (error) {
        useMessageStore().addError('Erreur lors de la suppression du créneau.');
      } finally {
        this.loading = false;
      }
    },
  },
});
