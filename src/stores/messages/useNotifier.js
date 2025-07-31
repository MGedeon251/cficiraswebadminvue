// /composables/useNotifier.js
import { useMessageStore } from '@/stores/messages/messageStore';

export function useNotifier() {
  const messageStore = useMessageStore();

  const notifySuccess = (message) => {
    messageStore.addMessage(message, 'success');
  };

  const notifyError = (message) => {
    messageStore.addMessage(message, 'error');
  };

  const notifyInfo = (message) => {
    messageStore.addMessage(message, 'info');
  };

  const notifyWarning = (message) => {
    messageStore.addMessage(message, 'warning');
  };

  return {
    notifySuccess,
    notifyError,
    notifyInfo,
    notifyWarning,
  };
}
