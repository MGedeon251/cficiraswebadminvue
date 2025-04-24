<!-- components/TabSemestre2.vue -->
<template>
  <div class="mt-3">
    <h5>Modules du Semestre 2</h5>
    <ul>
      <li v-for="module in modulesS2" :key="module.id">{{ module.nom }}</li>
    </ul>
  </div>
</template>

<script setup>
const modulesS2 = [
  { id: 1, nom: 'Programmation Web' },
  { id: 2, nom: 'Systèmes d’exploitation' },
  { id: 3, nom: 'Sécurité informatique' },
];
</script>
