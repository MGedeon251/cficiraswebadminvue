import { defineStore } from 'pinia';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const DEFAULT_OPTIONS = {
  autoClose: 3000,
  position: 'top-right',
  theme: 'light',
  pauseOnHover: true,
  closeOnClick: true,
  hideProgressBar: false,
};

const TOAST_TYPES = ['success', 'info', 'warning', 'error'];

export const useMessageStore = defineStore('messageStore', {
  state: () => ({
    messages: [],
  }),

  actions: {
    // ✅ Action centrale — toutes les autres l'appellent
    addMessage(message, type = 'success', options = {}) {
      if (!message) return;

      this.messages.push({ id: Date.now(), message, type });

      const mergedOptions = { ...DEFAULT_OPTIONS, ...options };

      if (TOAST_TYPES.includes(type)) {
        toast[type](message, mergedOptions);
      } else {
        toast(message, { ...mergedOptions, type: 'default' });
      }
    },

    // ✅ Raccourcis expressifs
    notifySuccess(message, options = {}) {
      this.addMessage(message, 'success', options);
    },
    notifyError(message, options = {}) {
      this.addMessage(message, 'error', options);
    },
    notifyWarning(message, options = {}) {
      this.addMessage(message, 'warning', options);
    },
    notifyInfo(message, options = {}) {
      this.addMessage(message, 'info', options);
    },

    // Toast persistant pour les erreurs critiques (ne se ferme pas)
    notifyCritical(message) {
      this.addMessage(message, 'error', { autoClose: false, hideProgressBar: true });
    },

    clearMessages() {
      this.messages = [];
    },
  },
});