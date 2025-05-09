<template>
  <div class="planification-container">
    <div class="row">
      <div class="col-12">
        <!-- En-tête -->
        <div class="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 class="page-title">
              <i class="mdi mdi-calendar-edit text-primary me-2"></i>
              Planification des Examens
            </h2>
            <p class="page-subtitle text-muted">
              Gestion des sessions d'examen et répartition des salles/matières
            </p>
          </div>
          <div class="d-flex gap-2">
            <button class="btn btn-outline-dark me-2" @click="exportToExcel">Exporter</button>
            <div class="btn-group">
              <button
                type="button"
                class="btn btn-primary mt-2 mt-xl-0"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                aria-hidden="true"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
              >
                + Ajouter
              </button>
              <button
                type="button"
                class="btn btn-primary dropdown-toggle dropdown-toggle-split"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span class="visually-hidden">Toggle Dropdown</span>
              </button>
              <ul class="dropdown-menu">
                <li>
                  <a class="dropdown-item" href="#drop_table">Importer fichier</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Carte Principale -->
        <div class="card">
          <div class="card-body">
            <!-- Barre d'outils -->
            <div class="d-flex justify-content-between align-items-center mb-4 flex-wrap">
              <div class="d-flex mb-3">
                <div class="d-flex gap-2 mb-2">
                  <div class="input-group" style="width: 250px">
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

                  <button
                    @click="refreshModules"
                    class="btn btn-outline-dark me-2"
                    :disabled="isLoading"
                  >
                    <i class="mdi mdi-cached"></i>
                  </button>
                </div>
              </div>

              <div class="d-flex gap-2">
                <button class="btn btn-sm btn-outline-primary" @click="toggleFilters">
                  <i class="mdi mdi-filter me-1"></i>
                </button>
                <div class="dropdown">
                  <button class="btn btn-sm btn-outline-secondary" data-bs-toggle="dropdown">
                    <i class="mdi mdi-dots-vertical"></i>
                  </button>
                  <ul class="dropdown-menu dropdown-menu-end">
                    <li>
                      <a class="dropdown-item" href="#"
                        ><i class="mdi mdi-file-excel me-2"></i> Exporter Excel</a
                      >
                    </li>
                    <li>
                      <a class="dropdown-item" href="#"
                        ><i class="mdi mdi-printer me-2"></i> Imprimer</a
                      >
                    </li>
                    <li><hr class="dropdown-divider" /></li>
                    <li>
                      <a class="dropdown-item" href="#"
                        ><i class="mdi mdi-cog me-2"></i> Paramètres</a
                      >
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- Filtres (optionnel) -->
            <div v-if="showFilters" class="filter-section mb-4 p-3 bg-light rounded">
              <div class="row g-3">
                <div class="col-md-3">
                  <label class="form-label">Session</label>
                  <select class="form-select" v-model="filters.session">
                    <option value="">Toutes</option>
                    <option v-for="session in activeSessions" :value="session.id">
                      {{ session.designation }}
                    </option>
                  </select>
                </div>
                <div class="col-md-3">
                  <label class="form-label">Date de début</label>
                  <input type="date" class="form-control" v-model="filters.startDate" />
                </div>
                <div class="col-md-3">
                  <label class="form-label">Date de fin</label>
                  <input type="date" class="form-control" v-model="filters.endDate" />
                </div>
                <div class="col-md-3 d-flex align-items-end">
                  <button class="btn btn-primary w-100" @click="applyFilters">
                    <i class="mdi mdi-check me-1"></i> Appliquer
                  </button>
                </div>
              </div>
            </div>

            <!-- Onglets -->

            <!-- Contenu des onglets -->
            <ExamenPlanList />
          </div>
        </div>
      </div>
    </div>

    <!-- Modal d'ajout/modification -->
    <ExamPlanningModal v-if="showModal" :exam="currentExam" @close="closeModal" @save="saveExam" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import ExamPlanningModal from './modal/ExamPlanningModal.vue';
import ExamenPlanList from './tab/ExamenPlanList.vue';

// Données simulées
const activeSessions = ref([
  { id: 1, designation: 'Session Partiel S1', semestre: 'S1' },
  { id: 2, designation: 'Session Rattrapage S1', semestre: 'S1' },
  { id: 3, designation: 'Session Partiel S2', semestre: 'S2' },
]);

const examsData = ref([
  {
    id: 1,
    session: 'Partiel S1',
    date: '2024-12-10',
    matiere: 'Mathématiques',
    salle: 'A101',
    surveillants: ['Prof. Dupont', 'Prof. Martin'],
    etudiants: 45,
    statut: 'planifié',
    semestre: 'S1',
  },
  // ... autres données
]);

// États
const activeTab = ref('all');
const searchQuery = ref('');
const showFilters = ref(false);
const showModal = ref(false);
const currentExam = ref(null);

// Filtres
const filters = ref({
  session: '',
  startDate: '',
  endDate: '',
});

// Computed
const filteredExams = computed(() => {
  return examsData.value.filter((exam) => {
    // Filtre par onglet
    if (activeTab.value === 's1' && exam.semestre !== 'S1') return false;
    if (activeTab.value === 's2' && exam.semestre !== 'S2') return false;

    // Filtre par recherche
    if (
      searchQuery.value &&
      !exam.matiere.toLowerCase().includes(searchQuery.value.toLowerCase())
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

// Méthodes
const toggleFilters = () => {
  showFilters.value = !showFilters.value;
};

const applyFilters = () => {
  // Logique d'application des filtres
  showFilters.value = false;
};

const refreshData = () => {
  // Logique de rafraîchissement
};

const openAddModal = () => {
  currentExam.value = null;
  showModal.value = true;
};

const editExam = (exam) => {
  currentExam.value = { ...exam };
  showModal.value = true;
};

const confirmDelete = (exam) => {
  if (confirm(`Supprimer la planification pour ${exam.matiere} ?`)) {
    // Logique de suppression
  }
};

const closeModal = () => {
  showModal.value = false;
};

const saveExam = (examData) => {
  if (examData.id) {
    // Mise à jour
  } else {
    // Ajout
  }
  closeModal();
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('fr-FR');
};

const getStatusClass = (status) => {
  const classes = {
    planifié: 'bg-primary',
    confirmé: 'bg-success',
    annulé: 'bg-danger',
    terminé: 'bg-secondary',
  };
  return classes[status] || 'bg-light text-dark';
};

onMounted(() => {
  // Charger les données initiales
});
</script>

<style scoped>
.planification-container {
  padding: 20px;
}

.page-title {
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0;
}

.page-subtitle {
  font-size: 0.9rem;
}

.filter-section {
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;
}

.nav-tabs .nav-link {
  color: #495057;
  font-weight: 500;
  border: none;
  padding: 0.75rem 1.5rem;
}

.nav-tabs .nav-link.active {
  color: #4c74f4;
  border-bottom: 3px solid #4c74f4;
  background-color: transparent;
}

.table th {
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.8rem;
  color: #6c757d;
}

.badge {
  padding: 0.35em 0.65em;
  font-size: 0.75em;
  font-weight: 500;
  border-radius: 50rem;
}
</style>
