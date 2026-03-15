<template>
  <div class="row">
    <div class="col-12 mb-2">
      <h4>Organisation des semestres</h4>
      <p class="text-muted">
        Suivi des crédits, unités d’enseignement et période de chaque semestre.
      </p>
    </div>

    <div class="col-12">
      <div class="table-responsive">
        <table class="table table-striped align-middle">
          <thead>
            <tr>
              <th>#</th>
              <th>Code</th>
              <th>Niveau</th>
              <th>Filière</th>
              <th>Crédits</th>
              <th>UE associées</th>
              <th>Période</th>
              <th>Statut</th>
            </tr>
          </thead>

          <tbody>
            <!-- Chargement -->
            <tr v-if="loading">
              <td colspan="9" class="text-center py-4">Chargement des données...</td>
            </tr>

            <!-- Données -->
            <tr v-for="(semestre, index) in semestres" :key="semestre.id">
              <td>{{ index + 1 }}</td>
              <td>{{ semestre.code }}</td>
              <td>{{ semestre.niveau }}</td>
              <td>{{ semestre.filiere }}</td>
              <td>{{ semestre.credits }}</td>
              <td>{{ semestre.ues.join(', ') }}</td>
              <td>{{ semestre.periode }}</td>
              <td>
                <span class="badge" :class="semestre.actif ? 'bg-success' : 'bg-secondary'">
                  {{ semestre.actif ? 'Actif' : 'Inactif' }}
                </span>
              </td>
            </tr>

            <!-- Vide -->
            <tr v-if="!loading && semestres.length === 0">
              <td colspan="9" class="text-center py-4">
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
const fetchOrganisationSemestres = async () => {
  loading.value = true;

  // Simulation API
  semestres.value = [
    {
      id: 1,
      code: 'S1',
      designation: 'Semestre 1',
      niveau: 'Licence 1',
      filiere: 'Informatique',
      credits: 30,
      ues: ['Maths', 'Informatique générale', 'Anglais'],
      periode: '2025-2026',
      actif: true,
    },
    {
      id: 2,
      code: 'S2',
      designation: 'Semestre 2',
      niveau: 'Licence 1',
      filiere: 'Informatique',
      credits: 30,
      ues: ['Algorithmique', 'Bases de données', 'Physique'],
      periode: '2025-2026',
      actif: true,
    },
    {
      id: 3,
      code: 'S1',
      designation: 'Semestre 1',
      niveau: 'Master 1',
      filiere: 'Data Science',
      credits: 30,
      ues: ['Statistiques', 'Machine Learning', 'Python avancé'],
      periode: '2025-2026',
      actif: false,
    },
  ];

  loading.value = false;
};

/* =====================
   Lifecycle
===================== */
onMounted(() => {
  fetchOrganisationSemestres();
});
</script>
