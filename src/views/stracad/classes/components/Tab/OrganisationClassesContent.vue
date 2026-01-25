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
            <tr v-for="org in paginatedOrganisations" :key="org.id">
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
                <span class="badge" :class="getStatusClass(org.statut)">
                  {{ getStatusLabel(org.statut) }}
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
        <Pagination
          v-model="currentPage"
          :items-per-page="itemsPerPage"
          :total-items="organisations.length"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue';
import { useClasseStore } from '@/stores/academiqueStore/classeStore';

const classeStore = useClasseStore();

/* =====================
   Pagination
===================== */
const currentPage = ref(1);
const itemsPerPage = ref(10);

/* =====================
   Computed
===================== */
const loading = computed(() => classeStore.loading);

const organisations = computed(() =>
  Array.isArray(classeStore.organisationClasses) ? classeStore.organisationClasses : []
);

const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage.value);

const paginatedOrganisations = computed(() =>
  organisations.value.slice(startIndex.value, startIndex.value + itemsPerPage.value)
);

/* =====================
   Lifecycle
===================== */
onMounted(() => {
  classeStore.fetchOrganisationClasses();
});

/* =====================
   Helpers UI
===================== */
const getProgressClass = (taux) => {
  if (taux < 60) return 'bg-success';
  if (taux < 90) return 'bg-warning';
  return 'bg-danger';
};

const getStatusLabel = (statut) => {
  if (statut === 'OUVERTE') return 'Ouverte';
  if (statut === 'COMPLÈTE') return 'Complète';
  return 'Fermée';
};

const getStatusClass = (statut) => {
  if (statut === 'OUVERTE') return 'bg-success';
  if (statut === 'COMPLÈTE') return 'bg-danger';
  return 'bg-secondary';
};
</script>
