import { defineStore } from 'pinia';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export const useErrorStore = defineStore('errorStore', {
  state: () => ({
    errors: [],
  }),

  actions: {
    addError(error) {
      let message = 'Une erreur est survenue.';
      if (error.response) {
        message =
          typeof error.response.data === 'string'
            ? error.response.data
            : error.response.data?.message || `Erreur ${error.response.status}`;
      } else if (error.request) {
        message = 'Impossible de se connecter au serveur.';
      }
      this.errors.push(message);
      toast.error(message, {
        autoClose: 5000,
        position: 'top-right',
        theme: 'colored', // optionnel, pour plus de contraste
      });

      // Optionnel : log en dev
      if (import.meta.env.DEV) {
        console.error('Erreur capturée :', error);
      }
    },

    clearErrors() {
      this.errors = [];
    },
  },
});
