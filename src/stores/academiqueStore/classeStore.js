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
      const messageStore = useMessageStore();
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
        messageStore.notifyError(
          extractErrorMessage(error, 'Échec lors du chargement des classes.')
        );
      } finally {
        this.loading = false;
      }
    },

    // Récupérer les détails des classes
    async fetchClassesDetails() {
      const messageStore = useMessageStore();
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
        messageStore.notifyError(
          extractErrorMessage(error, 'Échec lors du chargement des détails.')
        );
      } finally {
        this.loading = false;
      }
    },

    // Récupérer les classes par filière
    async fetchClassesByFiliere(id) {
      const messageStore = useMessageStore();
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
        messageStore.notifyError(
          extractErrorMessage(error, 'Échec lors du chargement des classes par filière.')
        );
      } finally {
        this.loading = false;
      }
    },

    // Ajouter une nouvelle classe
    async addClasse(data) {
      const messageStore = useMessageStore();
      this.loading = true;
      try {
        await createClasse(data);
        messageStore.notifySuccess('Classe créée avec succès.');
        localStorage.removeItem('classes');
        await this.fetchClasses();
      } catch (error) {
        messageStore.notifyError(extractErrorMessage(error, "Échec lors de l'ajout de la classe."));
      } finally {
        this.loading = false;
      }
    },

    // Modifier une classe existante
    async editClasse(id, data) {
      const messageStore = useMessageStore();
      this.loading = true;
      try {
        await updateClasse(id, data);
        messageStore.notifySuccess('Classe mise à jour avec succès.');
        localStorage.removeItem('classes');
        localStorage.removeItem(`classes_filiere_${id}`);
        await this.fetchClasses();
      } catch (error) {
        messageStore.notifyError(extractErrorMessage(error, 'Échec lors de la mise à jour.'));
      } finally {
        this.loading = false;
      }
    },

    // Supprimer une classe
    async removeClasse(id) {
      const messageStore = useMessageStore();
      this.loading = true;
      try {
        await deleteClasse(id);
        messageStore.notifySuccess('Classe supprimée avec succès.');
        localStorage.removeItem('classes');
        localStorage.removeItem(`classes_filiere_${id}`);
        await this.fetchClasses();
      } catch (error) {
        messageStore.notifyError(
          extractErrorMessage(error, 'Erreur lors de la suppression de la classe.')
        );
      } finally {
        this.loading = false;
      }
    },

    async fetchOrganisationClasses() {
      const messageStore = useMessageStore();
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
        messageStore.notifyError(
          extractErrorMessage(error, "Échec lors du chargement de l'organisation.")
        );
      } finally {
        this.loading = false;
      }
    },
  },
});
