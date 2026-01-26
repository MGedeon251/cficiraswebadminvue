import { defineStore } from 'pinia';
import {
  getClasses,
  getClassesDetails,
  getOrganisationClasses,
  createClasse,
  updateClasse,
  deleteClasse,
  getClassesByFiliere,
} from '@/api/academique/academiqueApi';
import { useMessageStore } from '@/stores/messages/messageStore';
import { useNotifier } from '@/stores/messages/useNotifier';
import { extractErrorMessage } from '@/stores/messages/useErrorMessage';

// Helpers pour gérer le cache
function setCache(key, data) {
  localStorage.setItem(
    key,
    JSON.stringify({
      data,
      timestamp: Date.now(),
    })
  );
}

function getCache(key, ttl = 5 * 60 * 1000) {
  // TTL par défaut : 5 minutes
  const cached = localStorage.getItem(key);
  if (!cached) return null;

  const parsed = JSON.parse(cached);
  if (Date.now() - parsed.timestamp > ttl) {
    localStorage.removeItem(key);
    return null;
  }
  return parsed.data;
}

export const useClasseStore = defineStore('classeStore', {
  state: () => ({
    classes: [],
    organisationClasses: [],
    loading: false,
  }),

  actions: {
    // Récupérer toutes les classes
    async fetchClasses() {
      const { notifyError } = useNotifier();
      this.loading = true;
      try {
        const cached = getCache('classes');
        if (cached) {
          this.classes = cached;
        } else {
          const response = await getClasses();
          this.classes = response.data;
          setCache('classes', response.data);
        }
      } catch (error) {
        notifyError(extractErrorMessage(error, 'Échec lors du chargement des données.'));
      } finally {
        this.loading = false;
      }
    },

    // Récupérer les détails des classes
    async fetchClassesDetails() {
      const { notifyError } = useNotifier();
      this.loading = true;
      try {
        const cached = getCache('classesDetails');
        if (cached) {
          this.classes = cached;
        } else {
          const response = await getClassesDetails();
          this.classes = response;
          setCache('classesDetails', response);
        }
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
      const cacheKey = `classes_filiere_${id}`;
      try {
        const cached = getCache(cacheKey);
        if (cached) {
          this.classes = cached;
        } else {
          const response = await getClassesByFiliere(id);
          this.classes = response;
          setCache(cacheKey, response);
        }
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
        localStorage.removeItem('classes'); // Invalider le cache
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
        localStorage.removeItem('classes'); // Invalider le cache
        localStorage.removeItem(`classes_filiere_${id}`);
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
        localStorage.removeItem('classes'); // Invalider le cache
        localStorage.removeItem(`classes_filiere_${id}`);
        this.fetchClasses();
      } catch (error) {
        useMessageStore().addError('Erreur lors de la suppression de la classe.');
      } finally {
        this.loading = false;
      }
    },
    async fetchOrganisationClasses() {
      const { notifyError } = useNotifier();
      this.loading = true;
      try {
        const cached = getCache('organisation_classes');
        if (cached) {
          this.organisationClasses = cached;
        } else {
          const response = await getOrganisationClasses();
          this.organisationClasses = response;
          setCache('organisation_classes', response);
        }
      } catch (error) {
        notifyError(extractErrorMessage(error, 'Échec lors du chargement des données.'));
      } finally {
        this.loading = false;
      }
    },
  },
});
