<template>
  <div class="row">
    <div class="col-12 mb-2">
      <h4>Statistiques des semestres</h4>
      <p class="text-muted">Vue globale des indicateurs liés aux semestres.</p>
    </div>

    <div class="col-12">
      <div class="table-responsive">
        <table class="table table-bordered table-striped mb-5">
          <thead>
            <tr>
              <th>Semestres au total</th>
              <th>Semestres actifs</th>
              <th>UE associées</th>
              <th>Étudiants inscrits</th>
            </tr>
          </thead>

          <tbody>
            <!-- Chargement -->
            <tr v-if="loading">
              <td colspan="5" class="text-center py-4">Chargement des statistiques...</td>
            </tr>

            <!-- Données -->
            <tr v-if="!loading && stats">
              <td class="text-center fw-bold">{{ stats.semestresTotal }}</td>
              <td class="text-center fw-bold">{{ stats.semestresActifs }}</td>
              <td class="text-center fw-bold">{{ stats.uesAssociees }}</td>
              <td class="text-center fw-bold">{{ stats.etudiantsInscrits }}</td>
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
const fetchStatistiquesSemestres = async () => {
  loading.value = true;

  // Simulation API
  stats.value = {
    semestresTotal: 6,
    semestresActifs: 5,
    uesAssociees: 18,
    creditsTotaux: 180,
    etudiantsInscrits: 340,
  };

  loading.value = false;
};

/* =====================
   Lifecycle
===================== */
onMounted(() => {
  fetchStatistiquesSemestres();
});
</script>
