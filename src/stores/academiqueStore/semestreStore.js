import { defineStore } from 'pinia';
import {
  getSemestres,
  createSemestre,
  updateSemestre,
  deleteSemestre,
} from '@/api/academique/academiqueApi';
import { useMessageStore } from '@/stores/messages/messageStore';
import { useNotifier } from '@/stores/messages/useNotifier';
import { extractErrorMessage } from '@/stores/messages/useErrorMessage';

export const useSemestreStore = defineStore('semestreStore', {
  state: () => ({
    semestres: [],
    loading: false,
  }),

  actions: {
    // Récupérer tous les semestres
    async fetchSemestres() {
      const { notifyError } = useNotifier();
      this.loading = true;
      try {
        const response = await getSemestres();
        this.semestres = response; // ou response.data selon ton backend
      } catch (error) {
        notifyError(extractErrorMessage(error, 'Échec lors du chargement des semestres.'));
      } finally {
        this.loading = false;
      }
    },

    // Créer un semestre
    async addSemestre(data) {
      const { notifyError } = useNotifier();
      this.loading = true;
      try {
        await createSemestre(data);
        useMessageStore().addMessage('Semestre créé avec succès.');
        await this.fetchSemestres();
      } catch (error) {
        notifyError(extractErrorMessage(error, 'Échec lors de la création du semestre.'));
      } finally {
        this.loading = false;
      }
    },

    // Modifier un semestre
    async editSemestre(id, data) {
      const { notifyError } = useNotifier();
      this.loading = true;
      try {
        await updateSemestre(id, data);
        useMessageStore().addMessage('Semestre mis à jour avec succès.');
        await this.fetchSemestres();
      } catch (error) {
        notifyError(extractErrorMessage(error, 'Échec lors de la mise à jour du semestre.'));
      } finally {
        this.loading = false;
      }
    },

    // Supprimer un semestre
    async removeSemestre(id) {
      const { notifyError } = useNotifier();
      this.loading = true;
      try {
        await deleteSemestre(id);
        useMessageStore().addMessage('Semestre supprimé avec succès.');
        await this.fetchSemestres();
      } catch (error) {
        notifyError(extractErrorMessage(error, 'Échec lors de la suppression du semestre.'));
      } finally {
        this.loading = false;
      }
    },
  },
});
