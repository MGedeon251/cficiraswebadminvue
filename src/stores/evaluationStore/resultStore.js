import { defineStore } from 'pinia';
import {
  getResultatsTousEtudiants,
  getResultatsParClasse,
  getStatistiques,
} from '@/api/evaluations/evaluationApi';
import { useMessageStore } from '@/stores/messages/messageStore';

export const useResultStore = defineStore('resultStore', {
  state: () => ({
    resultats: [],
    statistiques: null,
    loading: false,
  }),

  actions: {
    // Récupérer les résultats de tous les étudiants
    async fetchResultatsTousEtudiants() {
      this.loading = true;
      try {
        const response = await getResultatsTousEtudiants();
        this.resultats = response.data;
      } catch (error) {
        useMessageStore().addError(
          'Erreur lors de la récupération des résultats de tous les étudiants.'
        );
      } finally {
        this.loading = false;
      }
    },

    // Récupérer les résultats par classe
    async fetchResultatsParClasse(classeId) {
      this.loading = true;
      try {
        const response = await getResultatsParClasse(classeId);
        this.resultats = response.data;
      } catch (error) {
        useMessageStore().addError('Erreur lors de la récupération des résultats par classe.');
      } finally {
        this.loading = false;
      }
    },

    // Récupérer les statistiques
    async fetchStatistiques() {
      this.loading = true;
      try {
        const response = await getStatistiques();
        this.statistiques = response.data;
      } catch (error) {
        useMessageStore().addError('Erreur lors de la récupération des statistiques.');
      } finally {
        this.loading = false;
      }
    },
  },
});
