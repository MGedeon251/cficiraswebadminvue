<template>
  <div class="row">
    <div class="col-12 mb-2">
      <h4>Organisation des classes</h4>
      <p class="text-muted">Suivi des effectifs et capacités des classes académiques.</p>
    </div>

    <div class="col-12">
      <div class="table-responsive">
        <table class="table table-striped align-middle">
          <thead>
            <tr>
              <th>Classe</th>
              <th>Filière</th>
              <th>Niveau</th>
              <th>Effectif</th>
              <th>Capacité</th>
              <th>Taux de remplissage</th>
              <th>Statut</th>
            </tr>
          </thead>

          <tbody>
            <!-- Chargement -->
            <tr v-if="loading">
              <td colspan="7" class="text-center py-4">Chargement des données...</td>
            </tr>

            <!-- Données -->
            <tr v-for="org in organisations" :key="org.id">
              <td>{{ org.classe }}</td>
              <td>{{ org.filiere }}</td>
              <td>{{ org.niveau }}</td>
              <td>{{ org.effectif }}</td>
              <td>{{ org.capacite }}</td>
              <td>
                <div class="d-flex align-items-center">
                  <div class="progress w-100 me-2" style="height: 8px">
                    <div
                      class="progress-bar"
                      :class="getProgressClass(org.taux)"
                      :style="{ width: org.taux + '%' }"
                    ></div>
                  </div>
                  <small>{{ org.taux }}%</small>
                </div>
              </td>
              <td>
                <span class="badge" :class="getStatusClass(org.taux)">
                  {{ getStatusLabel(org.taux) }}
                </span>
              </td>
            </tr>

            <!-- Vide -->
            <tr v-if="!loading && organisations.length === 0">
              <td colspan="7" class="text-center py-4">
                <div class="d-flex flex-column align-items-center">
                  <img src="/img/empty-box.svg" alt="Aucune donnée" class="mb-2" width="80" />
                  <div class="text-muted">Aucune organisation disponible</div>
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
const organisations = ref([]);

/* =====================
   Méthodes
===================== */
const fetchOrganisationClasses = async () => {
  loading.value = true;

  // Simulation API
  organisations.value = [
    {
      id: 1,
      classe: 'L1-A',
      filiere: 'Informatique',
      niveau: 'Licence 1',
      effectif: 52,
      capacite: 60,
      taux: 87,
    },
    {
      id: 2,
      classe: 'L2-B',
      filiere: 'Informatique',
      niveau: 'Licence 2',
      effectif: 60,
      capacite: 60,
      taux: 100,
    },
    {
      id: 3,
      classe: 'M1-DS',
      filiere: 'Data Science',
      niveau: 'Master 1',
      effectif: 28,
      capacite: 40,
      taux: 70,
    },
  ];

  loading.value = false;
};

const getProgressClass = (taux) => {
  if (taux < 60) return 'bg-success';
  if (taux < 90) return 'bg-warning';
  return 'bg-danger';
};

const getStatusLabel = (taux) => {
  if (taux < 60) return 'Sous-remplie';
  if (taux < 90) return 'Équilibrée';
  return 'Saturée';
};

const getStatusClass = (taux) => {
  if (taux < 60) return 'bg-success';
  if (taux < 90) return 'bg-warning';
  return 'bg-danger';
};

/* =====================
   Lifecycle
===================== */
onMounted(() => {
  fetchOrganisationClasses();
});
</script>
