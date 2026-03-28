import { defineStore } from 'pinia';
import {
  getInscriptions,
  getInscriptionById,
  importInscriptions,
  createInscription,
  updateInscription,
  deleteInscription,
} from '@/api/academique/academiqueApi';
import { useMessageStore } from '@/stores/messages/messageStore';
import { extractErrorMessage } from '@/stores/messages/useErrorMessage';

/* =====================
   Helpers cache
===================== */
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

export const useInscriptionStore = defineStore('inscriptionStore', {
  state: () => ({
    inscriptions: [],
    inscription: null,
    loading: false,
    importing: false,
  }),

  actions: {
    // Récupérer toutes les inscriptions
    async fetchInscriptions() {
      const messageStore = useMessageStore();
      this.loading = true;
      try {
        const cached = getCache('inscriptions');
        if (cached) {
          this.inscriptions = cached;
        } else {
          const response = await getInscriptions();
          this.inscriptions = response.data;
          setCache('inscriptions', response.data);
        }
      } catch (error) {
        messageStore.notifyError(
          extractErrorMessage(error, 'Erreur lors de la récupération des inscriptions.')
        );
      } finally {
        this.loading = false;
      }
    },

    // Récupérer une inscription par ID
    async fetchInscriptionById(id) {
      const messageStore = useMessageStore();
      this.loading = true;
      try {
        const response = await getInscriptionById(id);
        this.inscription = response.data;
      } catch (error) {
        messageStore.notifyError(
          extractErrorMessage(error, "Erreur lors de la récupération de l'inscription.")
        );
      } finally {
        this.loading = false;
      }
    },

    // Ajouter une nouvelle inscription
    async addInscription(data) {
      const messageStore = useMessageStore();
      this.loading = true;
      try {
        await createInscription(data);
        messageStore.notifySuccess('Inscription créée avec succès.');
        localStorage.removeItem('inscriptions');
        await this.fetchInscriptions();
      } catch (error) {
        messageStore.notifyError(
          extractErrorMessage(error, "Erreur lors de la création de l'inscription.")
        );
      } finally {
        this.loading = false;
      }
    },

    // Modifier une inscription existante
    async editInscription(id, data) {
      const messageStore = useMessageStore();
      this.loading = true;
      try {
        await updateInscription(id, data);
        messageStore.notifySuccess('Inscription mise à jour avec succès.');
        localStorage.removeItem('inscriptions');
        await this.fetchInscriptions();
      } catch (error) {
        messageStore.notifyError(
          extractErrorMessage(error, "Erreur lors de la mise à jour de l'inscription.")
        );
      } finally {
        this.loading = false;
      }
    },

    /**
     * Importer des inscriptions via un fichier CSV/Excel
     */
    async uploadInscriptions(fichier) {
      const messageStore = useMessageStore();
      this.importing = true;
      this.loading = true;

      try {
        // Idéalement, récupérez ceci depuis votre store d'authentification
        const gestionnaireId = 1;

        const response = await importInscriptions(fichier, gestionnaireId);

        messageStore.notifySuccess(response.message || 'Importation réussie.');
        localStorage.removeItem('inscriptions');

        await this.fetchInscriptions();
        return response;
      } catch (error) {
        const msg = extractErrorMessage(error, "Erreur lors de l'importation du fichier.");
        messageStore.notifyError(msg);
        throw error;
      } finally {
        this.importing = false;
        this.loading = false;
      }
    },

    // Supprimer une inscription
    async removeInscription(id) {
      const messageStore = useMessageStore();
      this.loading = true;
      try {
        await deleteInscription(id);
        messageStore.notifySuccess('Inscription supprimée avec succès.');
        localStorage.removeItem('inscriptions');
        await this.fetchInscriptions();
      } catch (error) {
        messageStore.notifyError(
          extractErrorMessage(error, "Erreur lors de la suppression de l'inscription.")
        );
      } finally {
        this.loading = false;
      }
    },
  },
});
