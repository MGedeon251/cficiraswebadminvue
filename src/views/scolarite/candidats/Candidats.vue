<template>
  <div>
    <HeaderCandidats />
    <div class="container">
      <!-- Formulaire d’ajout -->
      <CreateCandidat @candidatAjoute="ajouterCandidat" />

      <!-- Barre de recherche et filtre -->
      <FiltreRecherche
        :filieresDisponibles="filieresDisponibles"
        @filtreChange="mettreAJourFiltres"
      />

      <!-- Liste filtrée -->
      <ListeCandidats :candidats="candidatsFiltres" />
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, computed } from 'vue';
import HeaderCandidats from './HeaderCandidat.vue';
import CreateCandidat from './CreateCandidat.vue';
import FiltreRecherche from './FiltreRecherche.vue';
import ListeCandidats from './ListeCandidats.vue';

const candidats = ref([]);
const filtres = ref({ recherche: '', filiere: '' });

// Charger depuis localStorage
onMounted(() => {
  const saved = localStorage.getItem('candidats');
  if (saved) candidats.value = JSON.parse(saved);
});

// Sauvegarder à chaque changement
watch(
  candidats,
  (nv) => {
    localStorage.setItem('candidats', JSON.stringify(nv));
  },
  { deep: true }
);

// Ajouter un candidat
function ajouterCandidat(candidat) {
  candidats.value.push({ ...candidat });
}

// Mettre à jour les filtres depuis FiltreRecherche.vue
function mettreAJourFiltres(nouveauxFiltres) {
  filtres.value = nouveauxFiltres;
}

// Liste des filières existantes dans les candidats
const filieresDisponibles = computed(() =>
  [...new Set(candidats.value.map((c) => c.filiere))].filter(Boolean)
);

// Liste filtrée selon recherche et filière
const candidatsFiltres = computed(() => {
  return candidats.value.filter((c) => {
    const r = filtres.value.recherche.toLowerCase();
    const nomMatch = c.nom?.toLowerCase().includes(r);
    const prenomMatch = c.prenom?.toLowerCase().includes(r);
    const filiereMatch = !filtres.value.filiere || c.filiere === filtres.value.filiere;
    return (nomMatch || prenomMatch) && filiereMatch;
  });
});
</script>

<style scoped>
.container {
  padding: 1rem;
}
</style>
