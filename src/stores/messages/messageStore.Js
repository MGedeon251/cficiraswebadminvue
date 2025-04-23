import { defineStore } from 'pinia';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const defaultOptions = {
  autoClose: 3000,
  position: 'top-right',
  theme: 'light',
  pauseOnHover: true,
  closeOnClick: true,
  hideProgressBar: false,
};

export const useMessageStore = defineStore('messageStore', {
  state: () => ({
    messages: [],
  }),

  actions: {
    addMessage(message, type = 'success') {
      this.messages.push({ message, type });

      const display = {
        success: toast.success,
        info: toast.info,
        warning: toast.warning,
        error: toast.error,
      };

      (display[type] || toast)(message, defaultOptions);
    },

    clearMessages() {
      this.messages = [];
    },
  },
});
