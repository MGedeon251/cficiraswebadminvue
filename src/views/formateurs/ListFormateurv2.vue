<template>
  <div class="container-fluid py-4">
    <!-- Header Page -->
    <div class="d-flex align-items-center justify-content-between mb-4">
      <div>
        <h4 class="fw-bold text-dark mb-1">Liste des Formateurs</h4>
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb mb-0">
            <li class="breadcrumb-item small"><a href="#">Pédagogie</a></li>
            <li class="breadcrumb-item small active" aria-current="page">Enseignants</li>
          </ol>
        </nav>
      </div>
      <button class="btn btn-primary rounded-pill px-4 shadow-sm">
        <i class="mdi mdi-plus me-2"></i>Nouveau Formateur
      </button>
    </div>

    <!-- Carte Principale -->
    <div class="card border-0 shadow-sm rounded-4 overflow-hidden">
      <div class="card-body p-4">
        
        <!-- Barre de Filtres Moderne -->
        <div class="row g-3 mb-4 align-items-center">
          <div class="col-md-4">
            <div class="search-group">
              <i class="mdi mdi-magnify search-icon"></i>
              <input 
                v-model="searchQuery" 
                type="text" 
                class="form-control search-input" 
                placeholder="Rechercher un formateur..."
              >
            </div>
          </div>
          <div class="col-md-2">
            <select v-model="filters.cycle" class="form-select custom-select">
              <option value="">Tous les cycles</option>
              <option v-for="cycle in uniqueCycles" :key="cycle" :value="cycle">{{ cycle }}</option>
            </select>
          </div>
          <div class="col-md-2">
            <select v-model="filters.niveau" class="form-select custom-select">
              <option value="">Tous les niveaux</option>
              <option v-for="niveau in uniqueNiveaux" :key="niveau" :value="niveau">{{ niveau }}</option>
            </select>
          </div>
          <div class="col-md-4 text-md-end">
            <button @click="resetFilters" class="btn btn-light-secondary btn-sm rounded-pill px-3">
              <i class="mdi mdi-refresh me-1"></i> Réinitialiser
            </button>
          </div>
        </div>

        <!-- Table des Formateurs -->
        <div class="table-responsive">
          <table class="table table-hover align-middle custom-table">
            <thead>
              <tr>
                <th class="ps-4">#</th>
                <th>Formateur</th>
                <th>Email</th>
                <th>Téléphone</th>
                <th>Cycle / Niveau</th>
                <th class="text-end pe-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="loading">
                <td colspan="6" class="text-center py-5">
                  <div class="spinner-border text-primary" role="status"></div>
                </td>
              </tr>
              
              <tr v-else-if="paginatedEnseignants.length === 0">
                <td colspan="6" class="text-center py-5">
                  <img src="/img/empty-box.svg" alt="Vide" style="height: 80px" class="opacity-25 mb-3">
                  <p class="text-muted">Aucun formateur ne correspond à vos critères.</p>
                </td>
              </tr>

              <tr v-for="(record, index) in paginatedEnseignants" :key="record.id" v-else>
                <td class="ps-4 text-muted small">
                  {{ index + 1 + (currentPage - 1) * itemsPerPage }}
                </td>
                <td>
                  <div class="d-flex align-items-center">
                    <div class="avatar-squircle me-3 bg-soft-primary text-primary fw-bold">
                      {{ record.nom[0] }}{{ record.prenom[0] }}
                    </div>
                    <div>
                      <div class="fw-bold text-dark">{{ record.nom }} {{ record.prenom }}</div>
                      <div class="text-muted x-small">ID: {{ record.enseignant_id || '---' }}</div>
                    </div>
                  </div>
                </td>
                <td class="text-secondary small">{{ record.email }}</td>
                <td class="text-dark fw-medium small">{{ record.tel1 }}</td>
                <td>
                  <span class="badge bg-soft-info text-info rounded-pill px-2">
                    {{ record.cycle || 'N/A' }}
                  </span>
                  <div class="x-small text-muted mt-1">{{ record.niveau || '' }}</div>
                </td>
                <td class="text-end pe-4">
                  <ItemActions :item="record" moduleRoute="/enseignant" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination Épurée -->
        <div class="d-flex justify-content-between align-items-center mt-4 px-2">
          <span class="text-muted small">
            Affichage de <b>{{ paginatedEnseignants.length }}</b> sur <b>{{ filteredEnseignants.length }}</b>
          </span>
          
          <nav>
            <ul class="pagination pagination-sm mb-0 gap-1">
              <li class="page-item" :class="{ disabled: currentPage === 1 }">
                <button class="page-link shadow-none" @click="changePage(currentPage - 1)">Précédent</button>
              </li>
              <li class="page-item active">
                <span class="page-link">{{ currentPage }}</span>
              </li>
              <li class="page-item" :class="{ disabled: currentPage * itemsPerPage >= filteredEnseignants.length }">
                <button class="page-link shadow-none" @click="changePage(currentPage + 1)">Suivant</button>
              </li>
            </ul>
          </nav>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useEnseignantStore } from '@/stores/pedagogieStore/enseignantStore';
import ItemActions from './components/DetailItemv2.vue';

const enseignantStore = useEnseignantStore();
const enseignants = computed(() => enseignantStore.enseignants);
const loading = computed(() => enseignantStore.loading);

onMounted(() => {
  enseignantStore.fetchEnseignants();
});

const searchQuery = ref('');
const filters = ref({ cycle: '', niveau: '' });
const currentPage = ref(1);
const itemsPerPage = 10;

// Filtres uniques pour les selects
const uniqueCycles = computed(() => [...new Set(enseignants.value.map((e) => e.cycle).filter(Boolean))]);
const uniqueNiveaux = computed(() => [...new Set(enseignants.value.map((e) => e.niveau).filter(Boolean))]);

// Logique de filtrage
const filteredEnseignants = computed(() => {
  return enseignants.value.filter((e) => {
    const q = searchQuery.value.toLowerCase();
    const matchQuery = [e.nom, e.prenom, e.email, e.tel1].some((field) =>
      field?.toLowerCase().includes(q)
    );
    const matchCycle = !filters.value.cycle || e.cycle === filters.value.cycle;
    const matchNiveau = !filters.value.niveau || e.niveau === filters.value.niveau;
    return matchQuery && matchCycle && matchNiveau;
  });
});

// Logique de pagination
const paginatedEnseignants = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredEnseignants.value.slice(start, start + itemsPerPage);
});

function changePage(page) {
  if (page > 0 && page <= Math.ceil(filteredEnseignants.value.length / itemsPerPage)) {
    currentPage.value = page;
  }
}

function resetFilters() {
  searchQuery.value = '';
  filters.value = { cycle: '', niveau: '' };
  currentPage.value = 1;
}
</script>

<style scoped>
/* Conteneur de recherche */
.search-group {
  position: relative;
  display: flex;
  align-items: center;
}
.search-icon {
  position: absolute;
  left: 15px;
  color: #94a3b8;
  font-size: 1.1rem;
}
.search-input {
  padding-left: 45px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  background-color: #f8fafc;
  height: 42px;
}
.search-input:focus {
  background-color: #fff;
  border-color: #4b49ac;
  box-shadow: 0 0 0 3px rgba(75, 73, 172, 0.1);
}

/* Selects custom */
.custom-select {
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  height: 42px;
  font-size: 0.9rem;
  background-color: #f8fafc;
}

/* Table Design */
.custom-table thead th {
  background: #f8faff;
  color: #64748b;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 700;
  border-bottom: 1px solid #edf2f9;
  padding: 15px 10px;
}
.custom-table tbody td {
  padding: 16px 10px;
  border-bottom: 1px solid #f1f5f9;
}
.custom-table tbody tr:hover {
  background-color: #fcfdff;
}

/* Avatar Squircle */
.avatar-squircle {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
}

/* Badges & Text */
.bg-soft-primary { background: rgba(75, 73, 172, 0.1); }
.bg-soft-info { background: rgba(13, 202, 240, 0.1); }
.x-small { font-size: 0.75rem; }
.btn-light-secondary { background: #f1f5f9; color: #475569; border: none; }

/* Pagination */
.page-link {
  border: none;
  background: #f1f5f9;
  color: #475569;
  border-radius: 8px !important;
  margin: 0 2px;
  padding: 6px 12px;
}
.page-item.active .page-link {
  background: #4b49ac;
  color: #fff;
}
</style>