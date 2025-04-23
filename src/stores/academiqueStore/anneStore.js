import { defineStore } from 'pinia';

export const useAnneStore = defineStore('anneStore', {
  state: () => ({
    annees: [], // Liste des années académiques
    selectedAnnee: null, // Année académique sélectionnée
    loading: false, // Indicateur de chargement
    error: null, // Gestion des erreurs
  }),

  getters: {
    getAnneeById: (state) => (id) => state.annees.find((annee) => annee.id === id),
  },

  actions: {
    async fetchAnnees() {
      this.loading = true;
      this.error = null;
      try {
        // Remplacez par un appel API réel
        const response = await fetch('/api/annees');
        const data = await response.json();
        this.annees = data;
      } catch (err) {
        this.error = 'Erreur lors du chargement des années académiques';
      } finally {
        this.loading = false;
      }
    },

    async addAnnee(newAnnee) {
      try {
        // Remplacez par un appel API réel
        const response = await fetch('/api/annees', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newAnnee),
        });
        const createdAnnee = await response.json();
        this.annees.push(createdAnnee);
      } catch (err) {
        this.error = "Erreur lors de l'ajout de l'année académique";
      }
    },

    async updateAnnee(updatedAnnee) {
      try {
        // Remplacez par un appel API réel
        const response = await fetch(`/api/annees/${updatedAnnee.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedAnnee),
        });
        const data = await response.json();
        const index = this.annees.findIndex((annee) => annee.id === updatedAnnee.id);
        if (index !== -1) {
          this.annees[index] = data;
        }
      } catch (err) {
        this.error = "Erreur lors de la mise à jour de l'année académique";
      }
    },

    async deleteAnnee(id) {
      try {
        // Remplacez par un appel API réel
        await fetch(`/api/annees/${id}`, { method: 'DELETE' });
        this.annees = this.annees.filter((annee) => annee.id !== id);
      } catch (err) {
        this.error = "Erreur lors de la suppression de l'année académique";
      }
    },

    selectAnnee(id) {
      this.selectedAnnee = this.annees.find((annee) => annee.id === id) || null;
    },
  },
});
