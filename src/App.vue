<script setup>
import DefaultLayout from '@/layouts/DefaultLayout.vue'
</script>

<template>
  <!-- Utilise DefaultLayout comme wrapper autour du router-view -->
  <DefaultLayout>
    <router-view />
  </DefaultLayout>
</template>

