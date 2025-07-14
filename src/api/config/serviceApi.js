import { useErrorStore } from '@/stores/messages/errorStore';
import { useMessageStore } from '@/stores/messages/messageStore';

// Fonction de traitement des erreurs
function handleApiError(error) {
  // Stocker dans Pinia
  try {
    const errorStore = useErrorStore();
    errorStore.addError(error);
  } catch (e) {
    console.warn('Erreur non traitée dans errorStore', error);
  }

  throw error; // Re-propagation pour traitement dans le composant si nécessaire
}

const buildService = (client) => ({
  get: async (url, params = {}) => {
    try {
      const response = await client.get(url, { params });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  post: async (url, data, showMessage = true) => {
    try {
      const response = await client.post(url, data);

      // Message de confirmation automatique (optionnel)
      if (showMessage) {
        try {
          const messageStore = useMessageStore();
          messageStore.addMessage('Création réussie');
        } catch (e) {
          console.warn('Erreur dans messageStore');
        }
      }
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  put: async (url, data, showMessage = true) => {
    try {
      const response = await client.put(url, data);

      if (showMessage) {
        try {
          const messageStore = useMessageStore();
          messageStore.addMessage('Mise à jour réussie');
        } catch (e) {}
      }

      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  delete: async (url, showMessage = true) => {
    try {
      const response = await client.delete(url);
      if (showMessage) {
        try {
          const messageStore = useMessageStore();
          messageStore.addMessage('Suppression réussie');
        } catch (e) {}
      }
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },
});

export default buildService;
