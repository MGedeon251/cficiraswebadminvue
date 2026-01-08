<template>
  <div class="row">
    <div class="col-12 mb-3">
      <h4>Organisation des filières</h4>
      <p class="text-muted">
        Vue d’ensemble des filières par cycle avec suivi des capacités et des effectifs.
      </p>
    </div>

    <div class="col-12">
      <div class="table-responsive">
        <table class="table table-striped align-middle">
          <thead class="table-light">
            <tr>
              <th>Filière</th>
              <th>Responsable</th>
              <th>Effectifs</th>
              <th>Capacité</th>
              <th>Taux de remplissage</th>
              <th>Statut</th>
            </tr>
          </thead>

          <tbody>
            <tr v-if="loading">
              <td colspan="7" class="text-center py-4">Chargement des données...</td>
            </tr>

            <tr v-for="org in organisationFilieres" :key="org.id">
              <td>{{ org.filiere }}</td>
              <td>{{ org.responsable }}</td>
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
                <span
                  class="badge"
                  :class="org.statut === 'OUVERTE' ? 'bg-success' : 'bg-secondary'"
                >
                  {{ org.statut }}
                </span>
              </td>
            </tr>
            <tr v-if="loading">
            <td colspan="6" class="text-center py-4">
              Chargement en cours...
            </td>
          </tr>

          <tr v-else-if="organisationFilieres.length === 0">
            <td colspan="6" class="text-center py-4">
              <div class="d-flex flex-column align-items-center">
                <img src="/img/empty-box.svg" alt="Aucune donnée" class="mb-2" />
                <div class="text-pr">Aucune donnée</div>
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
import { ref, onMounted, computed } from 'vue';
import { useFiliereStore } from '@/stores/academiqueStore/filiereStore';
import { useNotifier } from '@/stores/messages/useNotifier';

const filiereStore = useFiliereStore();
const messageStore = useNotifier();

const organisationFilieres = ref([]);
const loading = computed(() => filiereStore.loading);
const loadOrganisation = async () => {
  organisationFilieres.value = await filiereStore.organisationFilieres();
};
const getProgressClass = (taux) => {
  if (taux < 60) return 'bg-success';
  if (taux < 90) return 'bg-warning';
  return 'bg-danger';
};

onMounted(() => {
  loadOrganisation();
});
</script>
