<template>
    <div class="row">
      <div class="col-md-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Liste des Formateurs</h4>
            <p class="card-description">Liste de formateurs actifs</p>
            <div class="table-responsive">
              <div v-if="loading" class="skeleton-loader">
                <div class="skeleton-item" v-for="i in 5" :key="i"></div>
              </div>
              <div v-else class="mt-3">
                <table class="table table-hover align-middle">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Nom</th>
                      <th>Prenom</th>
                      <th>Email</th>
                      <th>Telephone</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colspan="9" class="text-center py-4">
                        <div class="d-flex flex-column align-items-center">
                          <img
                            src="/img/empty-box.svg"
                            alt="Aucune donnée"
                            class="mb-2"
                            width="auto"
                          />
                        </div>
                        <div class="text-pr">Aucune donnée</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
                  <!-- Pagination -->
            <div class="d-flex justify-content-between align-items-center mt-3">
            <div class="text-muted">
                Affichage de
                {{ filteredPlan.length }}
                éléments
            </div>
            <nav aria-label="Page navigation">
                <ul class="pagination pagination-sm">
                <li class="page-item disabled">
                    <a class="page-link" href="#" tabindex="-1">Précédent</a>
                </li>
                <li class="page-item active">
                    <a class="page-link" href="#">1</a>
                </li>
                <li class="page-item">
                    <a class="page-link" href="#">2</a>
                </li>
                <li class="page-item">
                    <a class="page-link" href="#">3</a>
                </li>
                <li class="page-item">
                    <a class="page-link" href="#">Suivant</a>
                </li>
                </ul>
            </nav>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
// États UI
const activeTab = ref('all');
const searchQuery = ref('');
const showFilters = ref(false);
const showModal = ref(false);
const currentExam = ref(null);

const planningData = ref([]);
const loading = ref(false);

// Filtres
const filters = ref({
  session_code: '',
  Date: '',
  endDate: '',
});

// Filtrage des données
const filteredPlan = computed(() => {
  return planningData.value.filter((exam) => {
    // Recherche par matière
    if (
      searchQuery.value &&
      exam.classe_nom &&
      !exam.classe_nom.toLowerCase().includes(searchQuery.value.toLowerCase())
    ) {
      return false;
    }

    // Filtres supplémentaires
    if (filters.value.session && exam.sessionId !== filters.value.session) return false;
    if (filters.value.startDate && exam.date < filters.value.startDate) return false;
    if (filters.value.endDate && exam.date > filters.value.endDate) return false;

    return true;
  });
});
</script>

<style scoped>
.container {
  max-width: 800px;
}
.skeleton-loader {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.skeleton-item {
  height: 20px;
  background: #f3f3f3;
  border-radius: 4px;
  animation: pulse 1.5s infinite ease-in-out;
}
@keyframes pulse {
  0% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.6;
  }
}
</style>