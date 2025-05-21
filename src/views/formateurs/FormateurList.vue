<template>
  <div class="row">
    <div class="col-md-12 grid-margin stretch-card">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title">Liste des Formateurs</h4>
          <p class="card-description">Liste de formateurs actifs</p>

          <!-- Recherche et Filtres -->
          <div class="d-flex flex-wrap gap-3 mb-3 align-items-center">
            <div class="input-group" style="width: 300px">
                    <span class="input-group-text bg-transparent">
                      <i class="mdi mdi-magnify"></i>
                    </span>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Rechercher..."
                      v-model="searchQuery"
                    />
              </div>
            <select v-model="filters.cycle" class="form-select" style="max-width: 180px;">
              <option value="">Tous les cycles</option>
              <option v-for="cycle in uniqueCycles" :key="cycle" :value="cycle">
                {{ cycle }}
              </option>
            </select>
            <select v-model="filters.niveau" class="form-select" style="max-width: 180px;">
              <option value="">Tous les niveaux</option>
              <option v-for="niveau in uniqueNiveaux" :key="niveau" :value="niveau">
                {{ niveau }}
              </option>
            </select>
          </div>

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
                    <th>Prénom</th>
                    <th>Email</th>
                    <th>Téléphone</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="paginatedEnseignants.length === 0">
                    <td colspan="6" class="text-center py-4">
                      <div class="d-flex flex-column align-items-center">
                        <img src="/img/empty-box.svg" alt="Aucune donnée" class="mb-2" width="auto" />
                        <div class="text-pr">Aucune donnée</div>
                        <button class="btn btn-primary mt-2" @click="resetFilters">Réinitialiser les filtres</button>
                      </div>
                    </td>
                  </tr>
                  <tr v-for="(enseignant, index) in paginatedEnseignants" :key="enseignant.id">
                    <td>{{ index + 1 + (currentPage - 1) * itemsPerPage }}</td>
                    <td>{{ enseignant.nom }}</td>
                    <td>{{ enseignant.prenom }}</td>
                    <td>{{ enseignant.email }}</td>
                    <td>{{ enseignant.tel1 }}</td>
                    <td>
                      <ItemActions :item="enseignant" moduleRoute="/enseignant" />
                    </td>
                  </tr>
                </tbody>
              </table>

              <!-- Pagination -->
              <div class="d-flex justify-content-between align-items-center mt-3 mb-3">
                <div class="text-muted">
                  Affichage de {{ paginatedEnseignants.length }} sur {{ filteredEnseignants.length }} formateurs
                </div>
                <nav aria-label="Page navigation">
                  <ul class="pagination pagination-sm mb-0">
                    <li class="page-item" :class="{ disabled: currentPage === 1 }">
                      <a class="page-link" href="#" @click.prevent="prevPage">Précédent</a>
                    </li>
                    <li
                      class="page-item"
                      v-for="page in totalPages"
                      :key="page"
                      :class="{ active: currentPage === page }"
                    >
                      <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
                    </li>
                    <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                      <a class="page-link" href="#" @click.prevent="nextPage">Suivant</a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import ItemActions from './DetailItemv2.vue';
import { useEnseignantStore } from '@/stores/pedagogieStore/enseignantStore';

const enseignantStore = useEnseignantStore();
const enseignants = computed(() => enseignantStore.enseignants);
const loading = computed(() => enseignantStore.loading);

const searchQuery = ref('');
const filters = ref({
  cycle: '',
  niveau: '',
});

const currentPage = ref(1);
const itemsPerPage = 5;

onMounted(() => {
  enseignantStore.fetchEnseignants();
});

// Filtres uniques
const uniqueCycles = computed(() =>
  [...new Set(enseignants.value.map(e => e.cycle).filter(Boolean))]
);
const uniqueNiveaux = computed(() =>
  [...new Set(enseignants.value.map(e => e.niveau).filter(Boolean))]
);

function resetFilters() {
  searchQuery.value = '';
  filters.value = { cycle: '', niveau: '' };
  currentPage.value = 1;
}

const filteredEnseignants = computed(() => {
  return enseignants.value.filter(e => {
    const query = searchQuery.value.toLowerCase();
    const matchQuery =
      e.nom?.toLowerCase().includes(query) ||
      e.prenom?.toLowerCase().includes(query) ||
      e.email?.toLowerCase().includes(query) ||
      e.tel1?.toLowerCase().includes(query);

    const matchCycle = !filters.value.cycle || e.cycle === filters.value.cycle;
    const matchNiveau = !filters.value.niveau || e.niveau === filters.value.niveau;

    return matchQuery && matchCycle && matchNiveau;
  });
});

const totalPages = computed(() => Math.ceil(filteredEnseignants.value.length / itemsPerPage));
const paginatedEnseignants = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredEnseignants.value.slice(start, start + itemsPerPage);
});

function changePage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
}
function prevPage() {
  if (currentPage.value > 1) currentPage.value--;
}
function nextPage() {
  if (currentPage.value < totalPages.value) currentPage.value++;
}
</script>


<style scoped>
/**
 * import { debounce } from 'lodash';
const debouncedSearch = debounce((value) => {
  searchQuery.value = value;
}, 300); */
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
