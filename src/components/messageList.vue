<template>
  <div v-if="messages.length" class="p-3">
    <div
      v-for="(msg, index) in messages"
      :key="index"
      :class="[
        'alert',
        'mb-2',
        {
          'alert-success': msg.type === 'success',
          'alert-info': msg.type === 'info',
          'alert-warning': msg.type === 'warning',
          'alert-danger': msg.type === 'error',
        },
      ]"
    >
      <strong class="me-2 text-capitalize">{{ msg.type }}:</strong>
      {{ msg.message }}
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useMessageStore } from '@/stores/messages/messageStore';

const messageStore = useMessageStore();
const { messages } = storeToRefs(messageStore);

// watch(messages, (newMessages) => {
//   if (newMessages.length) {
//     setTimeout(() => {
//       messageStore.clearMessages()
//     }, 3000)
//   }
// })

// watchEffect(() => {
//   if (messages.value.length) {
//     setTimeout(() => {
//       messageStore.clearMessages()
//     }, 3000)
//   }
// })
</script>

<style scoped>
.alert {
  border-radius: 8px;
  padding: 12px 16px;
}
</style>
