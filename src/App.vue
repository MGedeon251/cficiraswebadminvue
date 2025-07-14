<script setup>
import MessageList from '@/components/messageList.vue';
import frFR from 'ant-design-vue/es/locale/fr_FR';
</script>

<template>
  <a-config-provider :locale="frFR">
    <MessageList />
    <router-view />
  </a-config-provider>
</template>
