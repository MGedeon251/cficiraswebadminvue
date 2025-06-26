<!-- src/views/scolarite/filieres/Filiere.vue -->
<template>
  <div>
    <HeaderFiliere />
    <div class="container">
      <h2>Gestion des Filières</h2>
      <CreateFiliere @filiereAjoutee="ajouterFiliere" />
      <ListeFiliere :filieres="filieres" @supprimerFiliere="supprimerFiliere" />
    </div>
  </div>
</template>

<script setup>
import HeaderFiliere from './HeaderFiliere.vue';
import CreateFiliere from './CreateFi.vue';
import ListeFiliere from './ListeFiliere.vue';
import { ref, onMounted, watch } from 'vue';

const filieres = ref([]);

onMounted(() => {
  const saved = localStorage.getItem('filieres');
  if (saved) filieres.value = JSON.parse(saved);
});

watch(
  filieres,
  (val) => {
    localStorage.setItem('filieres', JSON.stringify(val));
  },
  { deep: true }
);

function ajouterFiliere(filiere) {
  filieres.value.push(filiere);
}

function supprimerFiliere(index) {
  const filiereASupprimer = filieres.value[index];

  // Récupérer les classes du localStorage
  const classesStr = localStorage.getItem('classes');
  const classes = classesStr ? JSON.parse(classesStr) : [];

  // Vérifier s’il existe une classe liée à cette filière
  const existe = classes.some((classe) => classe.filiere === filiereASupprimer.nom);

  if (existe) {
    alert(
      'Impossible de supprimer cette filière : elle est utilisée par une ou plusieurs classes.'
    );
    return;
  }

  // Si pas utilisée, suppression
  filieres.value.splice(index, 1);
}
</script>

<style scoped>
.container {
  padding: 2rem;
}
</style>
