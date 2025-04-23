import { defineStore } from 'pinia';
import {
  getEvaluations,
  getEvaluationById,
  createEvaluation,
  updateEvaluation,
  deleteEvaluation,
} from '@/api/evaluations/evaluationApi';
import { useMessageStore } from '@/stores/messages/messageStore';

export const useEvalStore = defineStore('evalStore', {
  state: () => ({
    evaluations: [],
    evaluation: null,
    loading: false,
  }),

  actions: {
    // Récupérer toutes les évaluations
    async fetchEvaluations() {
      this.loading = true;
      try {
        const response = await getEvaluations();
        this.evaluations = response.data;
      } catch (error) {
        useMessageStore().addError('Erreur lors de la récupération des évaluations.');
      } finally {
        this.loading = false;
      }
    },

    // Récupérer une évaluation par ID
    async fetchEvaluationById(id) {
      this.loading = true;
      try {
        const response = await getEvaluationById(id);
        this.evaluation = response.data;
      } catch (error) {
        useMessageStore().addError("Erreur lors de la récupération de l'évaluation.");
      } finally {
        this.loading = false;
      }
    },

    // Ajouter une nouvelle évaluation
    async addEvaluation(data) {
      this.loading = true;
      try {
        await createEvaluation(data);
        useMessageStore().addSuccess('Évaluation créée avec succès.');
        this.fetchEvaluations();
      } catch (error) {
        useMessageStore().addError("Erreur lors de la création de l'évaluation.");
      } finally {
        this.loading = false;
      }
    },

    // Modifier une évaluation existante
    async editEvaluation(id, data) {
      this.loading = true;
      try {
        await updateEvaluation(id, data);
        useMessageStore().addSuccess('Évaluation mise à jour avec succès.');
        this.fetchEvaluations();
      } catch (error) {
        useMessageStore().addError("Erreur lors de la mise à jour de l'évaluation.");
      } finally {
        this.loading = false;
      }
    },

    // Supprimer une évaluation
    async removeEvaluation(id) {
      this.loading = true;
      try {
        await deleteEvaluation(id);
        useMessageStore().addSuccess('Évaluation supprimée avec succès.');
        this.fetchEvaluations();
      } catch (error) {
        useMessageStore().addError("Erreur lors de la suppression de l'évaluation.");
      } finally {
        this.loading = false;
      }
    },
  },
});
