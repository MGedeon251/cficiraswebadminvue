<template>
  <div>
    <HeaderCandidats />

    <div class="row">
      <div class="col-md-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Liste des Candidats</h4>
            <p class="card-description">Liste des candidats actifs</p>
            <p class="text-muted mb-4">Vous pouvez ajouter, modifier ou supprimer des candidats.</p>

            <!-- Liste filtrée -->
            <ListeCandidats :candidats="candidatsFiltres" />
            <!-- Bouton pour accéder à la page de validation -->
            <div class="mb-4 d-flex justify-content-end">
              <router-link to="/candidats/validation">
                <button class="btn btn-success">Valider les candidats</button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container"></div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, computed } from 'vue';
import HeaderCandidats from './HeaderCandidat.vue';
import ListeCandidats from './ListeCandidats.vue';

const candidats = ref([]);
const filtres = ref({ recherche: '', filiere: '' });

onMounted(() => {
  const saved = localStorage.getItem('candidats');
  if (saved) candidats.value = JSON.parse(saved);
});

watch(
  candidats,
  (nv) => {
    localStorage.setItem('candidats', JSON.stringify(nv));
  },
  { deep: true }
);

function ajouterCandidat(candidat) {
  candidats.value.push({ ...candidat });
}

function mettreAJourFiltres(nouveauxFiltres) {
  filtres.value = nouveauxFiltres;
}

const filieresDisponibles = computed(() =>
  [...new Set(candidats.value.map((c) => c.filiere))].filter(Boolean)
);

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
.btn-success {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 0.5rem 1.2rem;
  border-radius: 6px;
  font-size: 0.95rem;
}
.btn-success:hover {
  background-color: #218838;
}
</style>
