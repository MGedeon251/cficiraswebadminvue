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
import { useNotifier } from '@/stores/messages/useNotifier';
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
    importing: false, // État spécifique pour ne pas bloquer toute l'UI pendant l'import
  }),

  actions: {
    // Récupérer toutes les inscriptions
    async fetchInscriptions() {
      const { notifyError } = useNotifier();
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
        notifyError(extractErrorMessage(error, 'Erreur lors de la récupération des inscriptions.'));
      } finally {
        this.loading = false;
      }
    },
    
    // Récupérer une inscription par ID
    async fetchInscriptionById(id) {
      const { notifyError } = useNotifier();
      this.loading = true;
      try {
        const response = await getInscriptionById(id);
        this.inscription = response.data;
      } catch (error) {
        notifyError(extractErrorMessage(error, "Erreur lors de la récupération de l'inscription."));
      } finally {
        this.loading = false;
      }
    },

    // Ajouter une nouvelle inscription
    async addInscription(data) {
      const { notifyError } = useNotifier();
      this.loading = true;
      try {
        await createInscription(data);
        useMessageStore().addSuccess('Inscription créée avec succès.');
        localStorage.removeItem('inscriptions'); // Invalider le cache
        this.fetchInscriptions();
      } catch (error) {
        notifyError(extractErrorMessage(error, "Erreur lors de la création de l'inscription."));
      } finally {
        this.loading = false;
      }
    },

    // Modifier une inscription existante
    async editInscription(id, data) {
      const { notifyError } = useNotifier();
      this.loading = true;
      try {
        await updateInscription(id, data);
        useMessageStore().addMessage('Inscription mise à jour avec succès.');
        localStorage.removeItem('inscriptions'); // Invalider le cache
        this.fetchInscriptions();
      } catch (error) {
        notifyError(extractErrorMessage(error, "Erreur lors de la mise à jour de l'inscription."));
      } finally {
        this.loading = false;
      }
    },
    /**
 * Importer des inscriptions via un fichier CSV/Excel
 * @param {File} fichier - Le fichier brut issu de l'input
 */
async uploadInscriptions(fichier) {
  const { notifyError } = useNotifier();
  const messageStore = useMessageStore();
  
  // On utilise 'importing' pour le spinner du bouton et 'loading' pour le skeleton de la liste
  this.importing = true; 
  this.loading = true;

  try {
    // Idéalement, récupérez ceci depuis votre store d'authentification (ex: authStore.user.id)
    const gestionnaireId = 1; 

    // Note : On n'envoie plus 'classe' ici, le backend extrait tout du fichier
    const response = await importInscriptions(fichier, gestionnaireId);

    // Notification de succès avec le message dynamique du backend 
    // (ex: "45 étudiants importés avec succès")
    messageStore.addMessage(response.message || 'Importation réussie.');
    // Invalidation du cache pour forcer la mise à jour des données
    localStorage.removeItem('inscriptions');

    // Rafraîchir la liste locale pour voir les nouveaux inscrits immédiatement
    await this.fetchInscriptions();

    return response; 
  } catch (error) {
    // Extraction du message d'erreur (ex: "Colonne matricule manquante")
    const msg = extractErrorMessage(error, "Erreur lors de l'importation du fichier.");
    notifyError(msg);
    throw error; 
  } finally {
    this.importing = false;
    this.loading = false;
  }
  },
    // Supprimer une inscription
    async removeInscription(id) {
      const { notifyError } = useNotifier();
      this.loading = true;
      try {
        await deleteInscription(id);
        useMessageStore().addSuccess('Inscription supprimée avec succès.');
        localStorage.removeItem('inscriptions'); // Invalider le cache
        this.fetchInscriptions();
      } catch (error) {
        notifyError(extractErrorMessage(error, "Erreur lors de la suppression de l'inscription."));
      } finally {
        this.loading = false;
      }
    },
  },
});