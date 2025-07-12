import { defineStore } from 'pinia';
import {
  getConcours,
  getConcoursById,
  createConcours,
  updateConcours,
  deleteConcours,
  getEpreuvesConcours,
  createEpreuves,
  getResultatsConcours,
  getPublicationConcours,
  calculResultatConcour,
} from '@/api/gestions/gestionApi';

import { useMessageStore } from '@/stores/messages/messageStore';

export const useConcourStore = defineStore('concourStore', {
  state: () => ({
    concours: [],
    concoursDetail: null,
    epreuves: [],
    resultats: [],
    publication: null,
    loading: false,
  }),

  actions: {
    // --- Concours ---
    async fetchConcours() {
      this.loading = true;
      try {
        const response = await getConcours();
        this.concours = response.data;
      } catch (e) {
        useMessageStore().addError('Erreur lors de la récupération des concours.');
      } finally {
        this.loading = false;
      }
    },

    async fetchConcoursById(id) {
      this.loading = true;
      try {
        const response = await getConcoursById(id);
        this.concoursDetail = response;
      } catch (e) {
        useMessageStore().addError('Erreur lors de la récupération du concours.');
      } finally {
        this.loading = false;
      }
    },

    async addConcours(data) {
      this.loading = true;
      try {
        await createConcours(data);
        useMessageStore().addSuccess('Concours créé avec succès.');
        await this.fetchConcours();
      } catch (e) {
        useMessageStore().addError('Erreur lors de la création du concours.');
      } finally {
        this.loading = false;
      }
    },

    async editConcours(id, data) {
      this.loading = true;
      try {
        await updateConcours(id, data);
        useMessageStore().addSuccess('Concours mis à jour avec succès.');
        await this.fetchConcours();
      } catch (e) {
        useMessageStore().addError('Erreur lors de la mise à jour du concours.');
      } finally {
        this.loading = false;
      }
    },

    async removeConcours(id) {
      this.loading = true;
      try {
        await deleteConcours(id);
        useMessageStore().addSuccess('Concours supprimé avec succès.');
        await this.fetchConcours();
      } catch (e) {
        useMessageStore().addError('Erreur lors de la suppression du concours.');
      } finally {
        this.loading = false;
      }
    },

    // --- Epreuves ---
    async fetchEpreuvesConcours(concoursId) {
      this.loading = true;
      try {
        const response = await getEpreuvesConcours(concoursId);
        this.epreuves = response.data;
      } catch (e) {
        useMessageStore().addError('Erreur lors de la récupération des épreuves.');
      } finally {
        this.loading = false;
      }
    },

    async addEpreuvesConcours(concoursId, data) {
      this.loading = true;
      try {
        await createEpreuves(concoursId, data);
        useMessageStore().addSuccess('Épreuves ajoutées avec succès.');
        await this.fetchEpreuvesConcours(concoursId);
      } catch (e) {
        useMessageStore().addError("Erreur lors de l'ajout des épreuves.");
      } finally {
        this.loading = false;
      }
    },

    addEpreuveLocally() {
      this.epreuves.push({
        code: '',
        designation: '',
        coefficient: 1,
        heure_debut: '',
        heure_fin: '',
        type_epreuve: 'écrit',
        description: '',
        ordre: 1,
      });
    },

    removeEpreuveLocally(index) {
      this.epreuves.splice(index, 1);
    },

    // --- Résultats et Publication ---
    async fetchResultatsConcours(concoursId) {
      this.loading = true;
      try {
        const response = await getResultatsConcours(concoursId);
        this.resultats = response.data;
      } catch (e) {
        useMessageStore().addError('Erreur lors de la récupération des résultats.');
      } finally {
        this.loading = false;
      }
    },

    async fetchPublicationConcours(concoursId) {
      this.loading = true;
      try {
        const response = await getPublicationConcours(concoursId);
        this.publication = response.data;
      } catch (e) {
        useMessageStore().addError('Erreur lors de la récupération de la publication.');
      } finally {
        this.loading = false;
      }
    },

    async calculerResultatConcour(concoursId, data) {
      this.loading = true;
      try {
        const response = await calculResultatConcour(concoursId, data);
        this.resultats = response.data;
        useMessageStore().addSuccess('Calcul des résultats effectué.');
      } catch (e) {
        useMessageStore().addError('Erreur lors du calcul des résultats.');
      } finally {
        this.loading = false;
      }
    },
  },
});
