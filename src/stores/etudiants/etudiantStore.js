import { defineStore } from "pinia";
import {
  getEtudiants,
  getEtudiantById,
  createEtudiant,
  updateEtudiant,
  deleteEtudiant,
} from "@/api/academique/etudiantApi";
import {
  getAnneesAcademiques,
  getFilieres,
  getClasses,
} from "@/api/academique/academiqueApi";
import { useMessageStore } from "@/stores/messages/messageStore";

export const useEtudiantStore = defineStore("etudiantStore", {
  state: () => ({
    etudiants: [],
    etudiant: null,
    anneesAcademiques: [],
    filieres: [],
    classes: [],
    loading: false,
  }),

  actions: {
    // Récupérer tous les étudiants
    async fetchEtudiants() {
      this.loading = true;
      try {
        const response = await getEtudiants();
        this.etudiants = response.data;
      } catch (error) {
        useMessageStore().addError("Erreur lors de la récupération des étudiants.");
      } finally {
        this.loading = false;
      }
    },

    // Récupérer un étudiant par ID
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

    // Ajouter un nouvel étudiant
    async addEtudiant(data) {
      this.loading = true;
      try {
        await createEtudiant(data);
        useMessageStore().addSuccess("Étudiant créé avec succès.");
        this.fetchEtudiants();
      } catch (error) {
        useMessageStore().addError("Erreur lors de la création de l'étudiant.");
      } finally {
        this.loading = false;
      }
    },

    // Modifier un étudiant existant
    async editEtudiant(id, data) {
      this.loading = true;
      try {
        await updateEtudiant(id, data);
        useMessageStore().addSuccess("Étudiant mis à jour avec succès.");
        this.fetchEtudiants();
      } catch (error) {
        useMessageStore().addError("Erreur lors de la mise à jour de l'étudiant.");
      } finally {
        this.loading = false;
      }
    },

    // Supprimer un étudiant
    async removeEtudiant(id) {
      this.loading = true;
      try {
        await deleteEtudiant(id);
        useMessageStore().addSuccess("Étudiant supprimé avec succès.");
        this.fetchEtudiants();
      } catch (error) {
        useMessageStore().addError("Erreur lors de la suppression de l'étudiant.");
      } finally {
        this.loading = false;
      }
    },

    // Récupérer toutes les années académiques
    async fetchAnneesAcademiques() {
      this.loading = true;
      try {
        const response = await getAnneesAcademiques();
        this.anneesAcademiques = response.data;
      } catch (error) {
        useMessageStore().addError("Erreur lors de la récupération des années académiques.");
      } finally {
        this.loading = false;
      }
    },

    // Récupérer toutes les filières
    async fetchFilieres() {
      this.loading = true;
      try {
        const response = await getFilieres();
        this.filieres = response.data;
      } catch (error) {
        useMessageStore().addError("Erreur lors de la récupération des filières.");
      } finally {
        this.loading = false;
      }
    },

    // Récupérer toutes les classes
    async fetchClasses() {
      this.loading = true;
      try {
        const response = await getClasses();
        this.classes = response.data;
      } catch (error) {
        useMessageStore().addError("Erreur lors de la récupération des classes.");
      } finally {
        this.loading = false;
      }
    },
  },
});
