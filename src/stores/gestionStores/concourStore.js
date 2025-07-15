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

import { useNotifier } from '@/stores/messages/useNotifier';
import { extractErrorMessage } from '@/stores/messages/useErrorMessage';

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
    async fetchConcours() {
      const { notifyError } = useNotifier();
      this.loading = true;
      try {
        const response = await getConcours();
        this.concours = response.data;
      } catch (e) {
        notifyError('Erreur lors de la récupération des concours.');
      } finally {
        this.loading = false;
      }
    },

    async fetchConcoursById(id) {
      const { notifyError } = useNotifier();
      this.loading = true;
      try {
        const response = await getConcoursById(id);
        this.concoursDetail = response;
      } catch (e) {
        notifyError(e, 'Erreur lors de la récupération du concours.');
      } finally {
        this.loading = false;
      }
    },

    async addConcours(data) {
      const { notifySuccess, notifyError } = useNotifier();
      this.loading = true;
      try {
        const response = await createConcours(data);
        notifySuccess(response?.message || 'Concours créé avec succès.');
        await this.fetchConcours();
      } catch (e) {
        notifyError(extractErrorMessage(e, 'Erreur lors de la création du concours.'));
      } finally {
        this.loading = false;
      }
    },

    async editConcours(id, data) {
      const { notifySuccess, notifyError } = useNotifier();
      this.loading = true;
      try {
        const response = await updateConcours(id, data);
        notifySuccess(response?.message || 'Concours mis à jour avec succès.');
        await this.fetchConcours();
      } catch (e) {
        notifyError('Erreur lors de la mise à jour du concours.');
      } finally {
        this.loading = false;
      }
    },

    async removeConcours(id) {
      const { notifySuccess, notifyError } = useNotifier();
      this.loading = true;
      try {
        const response = await deleteConcours(id);
        notifySuccess(response?.message || 'Concours supprimé avec succès.');
        await this.fetchConcours();
      } catch (e) {
        notifyError('Erreur lors de la suppression du concours.');
      } finally {
        this.loading = false;
      }
    },

    async fetchEpreuvesConcours(concoursId) {
      const { notifyError } = useNotifier();
      this.loading = true;
      try {
        const response = await getEpreuvesConcours(concoursId);
        this.epreuves = response.data;
      } catch (e) {
        notifyError('Erreur lors de la récupération des épreuves.');
      } finally {
        this.loading = false;
      }
    },

    async addEpreuvesConcours(concoursId, data) {
      const { notifySuccess, notifyError } = useNotifier();
      this.loading = true;
      try {
        const response = await createEpreuves(concoursId, data);
        notifySuccess(response?.message || 'Épreuves ajoutées avec succès.');
        await this.fetchEpreuvesConcours(concoursId);
      } catch (e) {
        notifyError(extractErrorMessage(e, "Erreur lors de l'ajout des épreuves."));
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

    async fetchResultatsConcours(concoursId) {
      const { notifyError } = useNotifier();
      this.loading = true;
      try {
        const response = await getResultatsConcours(concoursId);
        this.resultats = response.data;
      } catch (e) {
        notifyError('Erreur lors de la récupération des résultats.');
      } finally {
        this.loading = false;
      }
    },

    async fetchPublicationConcours(concoursId) {
      const { notifyError } = useNotifier();
      this.loading = true;
      try {
        const response = await getPublicationConcours(concoursId);
        this.publication = response.data;
      } catch (e) {
        notifyError('Erreur lors de la récupération de la publication.');
      } finally {
        this.loading = false;
      }
    },

    async calculerResultatConcour(concoursId, data) {
      const { notifySuccess, notifyError } = useNotifier();
      this.loading = true;
      try {
        const response = await calculResultatConcour(concoursId, data);
        this.resultats = response.data;
        notifySuccess(response?.message || 'Calcul des résultats effectué.');
      } catch (e) {
        notifyError('Erreur lors du calcul des résultats.');
      } finally {
        this.loading = false;
      }
    },
  },
});
