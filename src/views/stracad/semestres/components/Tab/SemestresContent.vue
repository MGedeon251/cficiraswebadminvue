<template>
  <div class="row">
    <div class="col-12 mb-2">
      <h4>Liste des semestres</h4>
      <p class="text-muted">Liste de tous les semestres académiques enregistrés.</p>
    </div>

    <div class="col-12">
      <div class="table-responsive">
        <table class="table table-striped align-middle">
          <thead>
            <tr>
              <th>#</th>
              <th>Code</th>
              <th>Annee</th>
              <th>Niveau</th>
              <th>date debut</th>
              <th>date fin</th>
              <th>statut</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            <!-- Chargement -->
            <tr v-if="loading">
              <td colspan="8" class="text-center py-4">Chargement des semestres...</td>
            </tr>

            <!-- Données -->
            <tr v-for="(semestre, index) in semestres" :key="semestre.id">
              <td>{{ index + 1 }}</td>
              <td>{{ semestre.code }}</td>
              <td>{{ semestre.annee }}</td>
              <td>{{ semestre.niveau }}</td>
              <td>{{ semestre.dateDebut }}</td>
              <td>{{ semestre.dateFin }}</td>
              <td>
                <span class="badge" :class="semestre.actif ? 'bg-success' : 'bg-secondary'">
                  {{ semestre.actif ? 'Actif' : 'Inactif' }}
                </span>
              </td>
              <td>
                <button class="btn btn-sm btn-outline-primary" @click="editSemestre(semestre)">
                  Modifier
                </button>
              </td>
            </tr>

            <!-- Vide -->
            <tr v-if="!loading && semestres.length === 0">
              <td colspan="8" class="text-center py-4">
                <div class="d-flex flex-column align-items-center">
                  <img src="/img/empty-box.svg" alt="Aucune donnée" class="mb-2" width="80" />
                  <div class="text-muted">Aucun semestre enregistré</div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';

/* =====================
   États
===================== */
const loading = ref(false);
const semestres = ref([]);

/* =====================
   Méthodes
===================== */
const fetchSemestres = async () => {
  loading.value = true;

  // Simulation API
  semestres.value = [
    {
      id: 1,
      annee: '2025-2026',
      code: 'S1',
      designation: 'Semestre 1',
      niveau: 'Licence 1',
      dateDebut: '01/09/2025',
      dateFin: '31/01/2026',
      actif: true,
    },
    {
      id: 2,
      annee: '2025-2026',
      code: 'S2',
      designation: 'Semestre 2',
      niveau: 'Licence 1',
      dateDebut: '01/02/2026',
      dateFin: '30/06/2026',
      actif: true,
    },
    {
      id: 3,
      annee: '2025-2026',
      code: 'S1',
      designation: 'Semestre 1',
      niveau: 'Master 1',
      dateDebut: '01/09/2025',
      dateFin: '31/01/2026',
      actif: false,
    },
  ];
  loading.value = false;
};

const editSemestre = (semestre) => {
  // Prévu pour l'ouverture d'un modal de modification
  console.log('Édition du semestre :', semestre);
};

/* =====================
   Lifecycle
===================== */
onMounted(() => {
  fetchSemestres();
});
</script>
<style scoped></style>
