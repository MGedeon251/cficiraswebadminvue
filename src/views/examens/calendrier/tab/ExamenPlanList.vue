<template>
    <div class="tab-content">
        <!-- Tableau des examens -->
        <div class="table-responsive">
            <table class="table table-hover align-middle">
                <thead class="table-light">
                    <tr>
                        <th>Session</th>
                        <th>Planifiéé le</th>
                        <th>Filiere</th>
                        <th>Classes</th>
                        <th>Étudiants</th>
                        <th>Statut</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(plan, index) in filteredPlan" :key="index.id">
                        <td>{{ plan.code_session }}</td>
                        <td>{{ formatDate(plan.examen_date_planification) }}</td>
                        <td>{{ plan.designation_filiere }}</td>
                        <td>{{ plan.classe_nom}}</td>
                        <td>{{  45 }}</td>
                        <td>
                          <span class="badge" :class="getStatusClass(plan.examen_statut)">
                                {{ getStatusLabel(plan.examen_statut) }}
                            </span>
                        </td>
                        <td>
                            <div class="d-flex gap-2">
                                <button class="btn btn-sm btn-outline-primary" @click="editExam(plan)">
                                    <i class="mdi mdi-pencil"></i>
                                </button>
                                <button class="btn btn-sm btn-outline-danger" @click="confirmDelete(plan)">
                                    <i class="mdi mdi-delete"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                    <tr v-if="filteredPlan.length === 0">
                        <td colspan="8" class="text-center py-5 text-muted">
                            Aucune planification trouvée
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
</template>
<script setup>
import { ref, computed, onMounted } from 'vue';
import { getExamenByPlanning } from "@/api/evaluations/evaluationApi";
import { useRoute } from 'vue-router';
const route = useRoute();

// Données principales
const planningData = ref([]);
const loading = ref(false);

// États UI
const activeTab = ref('all');
const searchQuery = ref('');
const showFilters = ref(false);
const showModal = ref(false);
const currentExam = ref(null);

// Filtres
const filters = ref({
  session_code: '',
  Date: '',
  endDate: ''
});

// Récupération des données depuis l’API
const fetchPlanning = async () => {
  loading.value = true;
  try {
    const response = await getExamenByPlanning();
    planningData.value = response;
    console.log("Planning récupéré :", planningData.value);
  } catch (error) {
    console.error("Erreur lors de la récupération des sessions :", error);
  } finally {
    loading.value = false;
  }
};

// Filtrage des données
const filteredPlan = computed(() => {
  return planningData.value.filter(exam => {
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

// Méthodes
const toggleFilters = () => {
  showFilters.value = !showFilters.value;
};

const applyFilters = () => {
  showFilters.value = false;
};

const refreshData = () => {
  fetchPlanning();
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
  if (confirm(`Supprimer la planification pour ${exam.matiere || 'cet examen'} ?`)) {
    // À compléter : logique de suppression
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
        'planifiée': 'bg-primary',
        'en_attente': 'bg-warning', 
        'annulé': 'bg-danger',
        'terminé': 'bg-success'
    };
    return classes[status] || 'bg-light text-dark';
};
const getStatusLabel = (status) => {
    if (status === 'planifiée') return 'Planifiée';
    if (status === 'en_attente') return 'En attente';
    if (status === 'annulé') return 'Annulé';
    if (status === 'terminé') return 'Terminé';
    return status;
};

onMounted(async () => {
  const id = route.params.id;
  try {
    const response = await getExamenByPlanning(id);
    planningData.value = response;
  } catch (error) {
    console.error('Erreur lors du chargement du module :', error);
  }
});
</script>
