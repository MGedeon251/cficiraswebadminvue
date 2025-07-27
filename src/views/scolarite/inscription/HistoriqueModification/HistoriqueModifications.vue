<template>
    <div>
      <h5>Historique des modifications</h5>
      <ul>
        <li v-for="(modif, index) in historique" :key="index">
          {{ modif.date }} - {{ modif.action }}
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  const props = defineProps({
    matricule: String
  });
  
  const historique = ref([]);
  
  onMounted(() => {
    historique.value = JSON.parse(localStorage.getItem(`historique-${props.matricule}`)) || [];
  });
  </script>
  