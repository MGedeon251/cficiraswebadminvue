<script setup>
import HeaderClass from './HeaderClass.vue';
import CreateClasse from './Create.vue';
import ListeClasse from './ListeClasse.vue';
import { ref, onMounted, watch } from 'vue';

const filieres = ref([]);
const classes = ref([]);

onMounted(() => {
  // Charger les filières
  const savedFilieres = localStorage.getItem('filieres');
  if (savedFilieres) {
    filieres.value = JSON.parse(savedFilieres);
  }

  // Charger les classes
  const savedClasses = localStorage.getItem('classes');
  if (savedClasses) {
    classes.value = JSON.parse(savedClasses);
  }
});

// Sauvegarde automatique des classes
watch(
  classes,
  (nv) => {
    localStorage.setItem('classes', JSON.stringify(nv));
  },
  { deep: true }
);

function ajouterClasse(nouvelleClasse) {
  classes.value.push({ ...nouvelleClasse });
}

function supprimerClasse(index) {
  classes.value.splice(index, 1);
}
</script>

<template>
  <div>
    <HeaderClass />
    <div class="container">
      <h2>Gestion des classes</h2>
      <!-- 💡 On transmet les filières à Create.vue -->
      <CreateClasse :filieres="filieres" :classes="classes" @classeAjoutee="ajouterClasse" />
      <ListeClasse :classes="classes" :filieres="filieres" @supprimerClasse="supprimerClasse" />
    </div>
  </div>
</template>
