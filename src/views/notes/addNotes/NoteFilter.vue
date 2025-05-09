--- NoteFilter.vue ---
<template>
  <div class="row mb-3">
    <div class="col"><strong>Année académique : </strong>{{ annee }}</div>
    <div class="col"><strong>Classe : </strong>{{ classe }}</div>
    <div class="col"><strong>Module : </strong>{{ module }}</div>
  </div>
</template>
<script setup>
defineProps({
  annee: String,
  classe: String,
  module: String,
});
</script>
