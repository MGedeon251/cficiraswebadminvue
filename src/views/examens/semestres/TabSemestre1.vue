<!-- components/TabSemestre1.vue -->
<template>
  <div class="mt-3">
    <h5>Modules du Semestre 1</h5>
    <ul>
      <li v-for="module in modulesS1" :key="module.id">{{ module.nom }}</li>
    </ul>
  </div>
</template>

<script setup>
const modulesS1 = [
  { id: 1, nom: 'Algorithmique' },
  { id: 2, nom: 'Base de données' },
  { id: 3, nom: 'Réseaux' },
];
</script>
