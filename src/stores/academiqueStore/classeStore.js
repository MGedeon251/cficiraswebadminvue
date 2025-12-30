import { defineStore } from 'pinia';
import {
  getClasses,
  getClassesDetails,
  createClasse,
  updateClasse,
  deleteClasse,
  getClassesByFiliere,
} from '@/api/academique/academiqueApi';
import { useMessageStore } from '@/stores/messages/messageStore';
import { useNotifier } from '@/stores/messages/useNotifier';
import { extractErrorMessage } from '@/stores/messages/useErrorMessage';

export const useClasseStore = defineStore('classeStore', {
  state: () => ({
    classes: [],
    loading: false,
  }),

  actions: {
    // Récupérer toutes les classes
    async fetchClasses() {
      const { notifyError } = useNotifier();
      this.loading = true;
      try {
        const response = await getClasses();
        this.classes = response.data;
      } catch (error) {
        notifyError(extractErrorMessage(error, 'Échec lors du chargement des données.'));
      } finally {
        this.loading = false;
      }
    },
    async fetchClassesDetails() {
      const { notifyError } = useNotifier();
      this.loading = true;
      try {
        const response = await getClassesDetails();
        this.classes = response;
      } catch (error) {
        notifyError(extractErrorMessage(error, 'Échec lors du chargement des données.'));
      } finally {
        this.loading = false;
      }
    },
    // Récupérer les classes par filière
    async fetchClassesByFiliere(id) {
      const { notifyError } = useNotifier();
      this.loading = true;
      try {
        const response = await getClassesByFiliere(id);
        this.classes = response;
      } catch (error) {
        notifyError(extractErrorMessage(error, 'Échec lors du chargement des données.'));
      } finally {
        this.loading = false;
      }
    },

    // Ajouter une nouvelle classe
    async addClasse(data) {
      const { notifyError } = useNotifier();
      this.loading = true;
      try {
        await createClasse(data);
        useMessageStore().addSuccess('Classe créée avec succès.');
        this.fetchClasses();
      } catch (error) {
        notifyError(extractErrorMessage(error, "Échec lors de l'ajout des données."));
      } finally {
        this.loading = false;
      }
    },

    // Modifier une classe existante
    async editClasse(id, data) {
      const { notifyError } = useNotifier();
      this.loading = true;
      try {
        await updateClasse(id, data);
        useMessageStore().addSuccess('Classe mise à jour avec succès.');
        this.fetchClasses();
      } catch (error) {
        notifyError(extractErrorMessage(error, 'Échec lors du chargement des données.'));
      } finally {
        this.loading = false;
      }
    },

    // Supprimer une classe
    async removeClasse(id) {
      const { notifyError } = useNotifier();
      this.loading = true;
      try {
        await deleteClasse(id);
        useMessageStore().addMessage('Classe supprimée avec succès.');
        this.fetchClasses();
      } catch (error) {
        useMessageStore().addError('Erreur lors de la suppression de la classe.');
      } finally {
        this.loading = false;
      }
    },
  },
});
