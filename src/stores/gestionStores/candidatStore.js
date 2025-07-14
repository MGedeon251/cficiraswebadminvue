import { defineStore } from 'pinia';
import {
  getCandidatures,
  getCandidatureById,
  createCandidature,
  updateCandidature,
  deleteCandidature,
} from '@/api/gestions/gestionApi';

import { useNotifier } from '@/stores/messages/useNotifier';
import { extractErrorMessage } from '@/stores/messages/useErrorMessage';

export const useCandidatStore = defineStore('candidatStore', {
  state: () => ({
    candidatures: [],
    candidatureDetail: null,
    loading: false,
  }),

  actions: {
    async fetchCandidatures(concoursId) {
      const { notifyError } = useNotifier();
      this.loading = true;
      try {
        const response = await getCandidatures(concoursId);
        this.candidatures = response.data;
      } catch (e) {
        notifyError(extractErrorMessage(e, 'Erreur lors de la récupération des candidatures.'));
      } finally {
        this.loading = false;
      }
    },

    async fetchCandidatureById(id) {
      const { notifyError } = useNotifier();
      this.loading = true;
      try {
        const response = await getCandidatureById(id);
        this.candidatureDetail = response;
      } catch (e) {
        notifyError(extractErrorMessage(e, 'Erreur lors de la récupération du candidat.'));
      } finally {
        this.loading = false;
      }
    },

    async addCandidature(data) {
      const { notifySuccess, notifyError } = useNotifier();
      this.loading = true;
      try {
        const response = await createCandidature(data);
        notifySuccess(response?.message || 'Candidat ajouté avec succès.');
        // Optionnel : actualiser la liste si nécessaire
        //await this.fetchCandidatures(data.concoursId);
      } catch (e) {
        notifyError(extractErrorMessage(e, 'Erreur lors de l’ajout du candidat.'));
      } finally {
        this.loading = false;
      }
    },

    async editCandidature(id, data) {
      const { notifySuccess, notifyError } = useNotifier();
      this.loading = true;
      try {
        const response = await updateCandidature(id, data);
        notifySuccess(response?.message || 'Candidature mise à jour avec succès.');
        // Optionnel : actualiser les données si besoin
      } catch (e) {
        notifyError(extractErrorMessage(e, 'Erreur lors de la mise à jour de la candidature.'));
      } finally {
        this.loading = false;
      }
    },

    async removeCandidature(id) {
      const { notifySuccess, notifyError } = useNotifier();
      this.loading = true;
      try {
        const response = await deleteCandidature(id);
        notifySuccess(response?.message || 'Candidat supprimé avec succès.');
        // Optionnel : actualiser la liste
        // await this.fetchCandidatures(...);
      } catch (e) {
        notifyError(extractErrorMessage(e, 'Erreur lors de la suppression du candidat.'));
      } finally {
        this.loading = false;
      }
    },
  },
});
