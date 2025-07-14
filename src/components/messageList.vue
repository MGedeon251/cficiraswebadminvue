<template>
  <div class="alert-container">
    <div
      v-for="msg in messageStore.messages"
      :key="msg.id"
      class="alert d-flex justify-content-between align-items-center mb-2"
      :class="alertClass(msg.type)"
      role="alert"
    >
      <span>{{ msg.message }}</span>
      <button class="btn-close ms-2" @click="removeMessage(msg.id)"></button>
    </div>

    <button
      v-if="messageStore.messages.length"
      class="btn btn-sm btn-outline-danger mt-2"
      @click="messageStore.clearMessages"
    >
      Vider les messages
    </button>
  </div>
</template>

<script setup>
import { useMessageStore } from '@/stores/messages/messageStore';
const messageStore = useMessageStore();

const removeMessage = (id) => {
  messageStore.messages = messageStore.messages.filter((msg) => msg.id !== id);
};

const alertClass = (type) => {
  switch (type) {
    case 'success':
      return 'alert-success';
    case 'info':
      return 'alert-info';
    case 'warning':
      return 'alert-warning';
    case 'error':
      return 'alert-danger';
    default:
      return 'alert-secondary';
  }
};
</script>

<style scoped>
.alert-container {
  position: fixed;
  top: 70px;
  right: 20px;
  width: 300px;
  z-index: 9999;
}
</style>
