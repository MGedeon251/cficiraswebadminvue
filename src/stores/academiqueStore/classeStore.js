import { defineStore } from 'pinia';
import {
  getClasses,
  createClasse,
  updateClasse,
  deleteClasse,
  getClassesByFiliere,
} from '@/api/academique/academiqueApi';
import { useMessageStore } from '@/stores/messages/messageStore';

export const useClasseStore = defineStore('classeStore', {
  state: () => ({
    classes: [],
    loading: false,
  }),

  actions: {
    // Récupérer toutes les classes
    async fetchClasses() {
      this.loading = true;
      try {
        const response = await getClasses();
        this.classes = response.data;
      } catch (error) {
        useMessageStore().addError('Erreur lors de la récupération des classes.');
      } finally {
        this.loading = false;
      }
    },
    // Récupérer les classes par filière
    async fetchClassesByFiliere(id) {
      this.loading = true;
      try {
        const response = await getClassesByFiliere(id);
        this.classes = response;
      } catch (error) {
        useMessageStore().addError('Erreur lors de la récupération des classes par filière.');
      } finally {
        this.loading = false;
      }
    },

    // Ajouter une nouvelle classe
    async addClasse(data) {
      this.loading = true;
      try {
        await createClasse(data);
        useMessageStore().addSuccess('Classe créée avec succès.');
        this.fetchClasses();
      } catch (error) {
        useMessageStore().addError('Erreur lors de la création de la classe.');
      } finally {
        this.loading = false;
      }
    },

    // Modifier une classe existante
    async editClasse(id, data) {
      this.loading = true;
      try {
        await updateClasse(id, data);
        useMessageStore().addSuccess('Classe mise à jour avec succès.');
        this.fetchClasses();
      } catch (error) {
        useMessageStore().addError('Erreur lors de la mise à jour de la classe.');
      } finally {
        this.loading = false;
      }
    },

    // Supprimer une classe
    async removeClasse(id) {
      this.loading = true;
      try {
        await deleteClasse(id);
        useMessageStore().addSuccess('Classe supprimée avec succès.');
        this.fetchClasses();
      } catch (error) {
        useMessageStore().addError('Erreur lors de la suppression de la classe.');
      } finally {
        this.loading = false;
      }
    },
  },
});
