<template>
  <div class="filtre-recherche">
    <input type="text" v-model="recherche" placeholder="🔍 Rechercher par nom ou prénom" />

    <select v-model="filiere">
      <option value="">-- Toutes les filières --</option>
      <option v-for="(f, i) in filieresDisponibles" :key="i" :value="f">
        {{ f }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch } from 'vue';

const props = defineProps({
  filieresDisponibles: Array,
});

const emit = defineEmits(['filtreChange']);

const recherche = ref('');
const filiere = ref('');

// On émet à chaque changement de champ
watch([recherche, filiere], () => {
  emit('filtreChange', {
    recherche: recherche.value,
    filiere: filiere.value,
  });
});
</script>

<style scoped>
.filtre-recherche {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 1rem 0;
}
input,
select {
  padding: 0.5rem;
  font-size: 0.9rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  min-width: 220px;
}
</style>
