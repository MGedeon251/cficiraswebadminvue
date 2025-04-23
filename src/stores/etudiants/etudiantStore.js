import { defineStore } from 'pinia';
import {
  getEtudiants,
  getEtudiantById,
  createEtudiant,
  updateEtudiant,
  deleteEtudiant,
  getResultatsByEtudiant,
  getNotesByEtudiant,
  getMoyenneByEtudiant,
  getEvaluationsByEtudiant,
  createEvaluationForEtudiant,
  updateEvaluationForEtudiant,
  deleteEvaluationForEtudiant,
} from '@/api/academique/etudiantApi';
import { useMessageStore } from '@/stores/messages/messageStore';

export const useEtudiantStore = defineStore('etudiantStore', {
  state: () => ({
    etudiants: [],
    etudiant: null,
    resultats: [],
    notes: [],
    moyenne: null,
    evaluations: [],
    loading: false,
  }),

  actions: {
    async fetchEtudiants() {
      this.loading = true;
      try {
        const response = await getEtudiants();
        this.etudiants = response.data;
      } catch (error) {
        useMessageStore().addError('Erreur lors de la récupération des étudiants.');
      } finally {
        this.loading = false;
      }
    },

    async fetchEtudiantById(id) {
      this.loading = true;
      try {
        const response = await getEtudiantById(id);
        this.etudiant = response.data;
      } catch (error) {
        useMessageStore().addError("Erreur lors de la récupération de l'étudiant.");
      } finally {
        this.loading = false;
      }
    },

    async addEtudiant(data) {
      this.loading = true;
      try {
        await createEtudiant(data);
        useMessageStore().addSuccess('Étudiant créé avec succès.');
        this.fetchEtudiants();
      } catch (error) {
        useMessageStore().addError("Erreur lors de la création de l'étudiant.");
      } finally {
        this.loading = false;
      }
    },

    async editEtudiant(id, data) {
      this.loading = true;
      try {
        await updateEtudiant(id, data);
        useMessageStore().addSuccess('Étudiant mis à jour avec succès.');
        this.fetchEtudiants();
      } catch (error) {
        useMessageStore().addError("Erreur lors de la mise à jour de l'étudiant.");
      } finally {
        this.loading = false;
      }
    },

    async removeEtudiant(id) {
      this.loading = true;
      try {
        await deleteEtudiant(id);
        useMessageStore().addSuccess('Étudiant supprimé avec succès.');
        this.fetchEtudiants();
      } catch (error) {
        useMessageStore().addError("Erreur lors de la suppression de l'étudiant.");
      } finally {
        this.loading = false;
      }
    },

    async fetchResultatsByEtudiant(etudiantId) {
      this.loading = true;
      try {
        const response = await getResultatsByEtudiant(etudiantId);
        this.resultats = response.data;
      } catch (error) {
        useMessageStore().addError('Erreur lors de la récupération des résultats.');
      } finally {
        this.loading = false;
      }
    },

    async fetchNotesByEtudiant(etudiantId) {
      this.loading = true;
      try {
        const response = await getNotesByEtudiant(etudiantId);
        this.notes = response.data;
      } catch (error) {
        useMessageStore().addError('Erreur lors de la récupération des notes.');
      } finally {
        this.loading = false;
      }
    },

    async fetchMoyenneByEtudiant(etudiantId) {
      this.loading = true;
      try {
        const response = await getMoyenneByEtudiant(etudiantId);
        this.moyenne = response.data;
      } catch (error) {
        useMessageStore().addError('Erreur lors de la récupération de la moyenne.');
      } finally {
        this.loading = false;
      }
    },

    async fetchEvaluationsByEtudiant(etudiantId) {
      this.loading = true;
      try {
        const response = await getEvaluationsByEtudiant(etudiantId);
        this.evaluations = response.data;
      } catch (error) {
        useMessageStore().addError('Erreur lors de la récupération des évaluations.');
      } finally {
        this.loading = false;
      }
    },

    async addEvaluationForEtudiant(etudiantId, data) {
      this.loading = true;
      try {
        await createEvaluationForEtudiant(etudiantId, data);
        useMessageStore().addSuccess('Évaluation ajoutée avec succès.');
        this.fetchEvaluationsByEtudiant(etudiantId);
      } catch (error) {
        useMessageStore().addError("Erreur lors de l'ajout de l'évaluation.");
      } finally {
        this.loading = false;
      }
    },

    async editEvaluationForEtudiant(etudiantId, evaluationId, data) {
      this.loading = true;
      try {
        await updateEvaluationForEtudiant(etudiantId, evaluationId, data);
        useMessageStore().addSuccess('Évaluation mise à jour avec succès.');
        this.fetchEvaluationsByEtudiant(etudiantId);
      } catch (error) {
        useMessageStore().addError("Erreur lors de la mise à jour de l'évaluation.");
      } finally {
        this.loading = false;
      }
    },

    async removeEvaluationForEtudiant(etudiantId, evaluationId) {
      this.loading = true;
      try {
        await deleteEvaluationForEtudiant(etudiantId, evaluationId);
        useMessageStore().addSuccess('Évaluation supprimée avec succès.');
        this.fetchEvaluationsByEtudiant(etudiantId);
      } catch (error) {
        useMessageStore().addError("Erreur lors de la suppression de l'évaluation.");
      } finally {
        this.loading = false;
      }
    },
  },
});
