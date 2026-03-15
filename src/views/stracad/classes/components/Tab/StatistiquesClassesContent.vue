<template>
  <div class="row">
    <div class="col-12 mb-2">
      <h4>Statistiques des classes</h4>
      <p class="text-muted">Indicateurs globaux liés aux classes et à l’activité académique.</p>
    </div>

    <div class="col-12">
      <div class="table-responsive">
        <table class="table table-bordered table-striped mb-5">
          <thead>
            <tr>
              <th>Cycles au total</th>
              <th>Cycles actifs</th>
              <th>Filières associées</th>
              <th>Étudiants inscrits</th>
              <th>Notes saisies</th>
            </tr>
          </thead>

          <tbody>
            <!-- Chargement -->
            <tr v-if="loading">
              <td colspan="5" class="text-center py-4">Chargement des statistiques...</td>
            </tr>

            <!-- Données -->
            <tr v-if="!loading && stats">
              <td class="text-center fw-bold">{{ stats.cyclesTotal }}</td>
              <td class="text-center fw-bold">{{ stats.cyclesActifs }}</td>
              <td class="text-center fw-bold">{{ stats.filieresAssociees }}</td>
              <td class="text-center fw-bold">{{ stats.etudiantsInscrits }}</td>
              <td class="text-center fw-bold">{{ stats.notesSaisies }}</td>
            </tr>

            <!-- Vide -->
            <tr v-if="!loading && !stats">
              <td colspan="5" class="text-center py-4">
                <div class="d-flex flex-column align-items-center">
                  <img src="/img/empty-box.svg" alt="Aucune donnée" class="mb-2" width="80" />
                  <div class="text-muted">Aucune donnée statistique disponible</div>
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
const stats = ref(null);

/* =====================
   Méthodes
===================== */
const fetchStatistiquesClasses = async () => {
  loading.value = true;

  // Simulation API (agrégats globaux)
  stats.value = {
    cyclesTotal: 3,
    cyclesActifs: 2,
    filieresAssociees: 5,
    etudiantsInscrits: 340,
    notesSaisies: 1280,
  };

  loading.value = false;
};

/* =====================
   Lifecycle
===================== */
onMounted(() => {
  fetchStatistiquesClasses();
});
</script>
