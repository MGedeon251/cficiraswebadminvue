<template>
  <div class="d-flex flex-wrap justify-content-xl-between">
    <div class="card-body">
      <h4 class="card-title">
        Examens {{ semestre === 0 ? 'tous les semestres' : `semestre ${semestre}` }}
      </h4>
      <p class="card-description">
        Liste des examens
        {{ semestre === 0 ? 'tous semestres confondus' : `pour le semestre ${semestre}` }}
      </p>

      <div class="d-flex mb-3">
        <button
          v-for="type in types"
          :key="type"
          @click="setType(type)"
          :class="['btn', type === selectedType ? 'btn-primary' : 'btn-outline-dark', 'me-2']"
        >
          {{ type }}
        </button>
      </div>

      <div class="table-scrollable">
        <table class="table table-hover align-middle">
          <thead>
            <tr>
              <th>Designation</th>
              <th>État</th>
              <th>Date début</th>
              <th>Date fin</th>
              <th>Responsable</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="exam in filteredExams" :key="exam.session_id">
              <td>{{ exam.nom_session }}</td>
              <td>
                <span
                  class="status-badge"
                  :class="exam.etat === 'active' ? 'status-active' : 'status-draft'"
                >
                  {{ exam.etat }}
                </span>
              </td>
              <td>{{ exam.date_debut }}</td>
              <td>{{ exam.date_fin }}</td>
              <td>{{ exam.responsable }}</td>
              <td>
                <ItemActions
                  :item="exam"
                  moduleRoute="/examens"
                  :showAdd="false"
                  editModalTarget="#editExamModal"
                  @edit="editExam"
                  @delete="confirmDelete"
                />
              </td>
            </tr>
            <tr v-if="!loading && filteredExams.length === 0">
              <td colspan="6" class="text-center py-4">
                <div class="d-flex flex-column align-items-center">
                  <img src="/img/empty-box.svg" alt="Aucune donnée" class="mb-2" width="auto" />
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
import { onMounted, ref, computed } from 'vue';
import { getSessions } from '@/api/evaluations/evaluationApi';
import ItemActions from '../details/DetailsItem.vue';

// Props (avec defineProps pour <script setup>)
const props = defineProps({
  semestre: {
    type: Number,
    required: true,
  },
});

// Références et état local
const exams = ref([]);
const types = ref(['Partiel', 'Rattrapage']);
const selectedType = ref('Partiel');
const loading = ref(true);

// Méthode de récupération des examens
const fetchSessions = async () => {
  loading.value = true;
  try {
    const response = await getSessions();
    exams.value = response.map((exam) => ({
      ...exam,
      date_debut: new Date(exam.date_debut).toLocaleDateString(),
      date_fin: new Date(exam.date_fin).toLocaleDateString(),
      type: exam.code_session.includes('PARTIEL') ? 'Partiel' : 'Rattrapage',
    }));
  } catch (error) {
    console.error('Erreur lors de la récupération des sessions :', error);
  } finally {
    loading.value = false;
  }
};

// Filtrage dynamique
const filteredExams = computed(() => {
  const bySemestre =
    props.semestre === 0
      ? exams.value
      : exams.value.filter((exam) => exam.semestre === `S${props.semestre}`);
  return bySemestre.filter((exam) => exam.type.includes(selectedType.value));
});

// Action pour changer de type
const setType = (type) => {
  selectedType.value = type;
};
const formatDate = (dateString) => {
  if (!dateString) return 'Non défini';
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('fr-FR', options);
};

// Appel lors du montage
onMounted(fetchSessions);
</script>

<style scoped>
.status-badge {
  padding: 0.5em 1em;
  border-radius: 20px;
  font-size: 0.85rem;
  color: #fff;
}
.status-draft {
  background-color: #6c757d;
}
.status-active {
  background-color: #0d6efd;
}
</style>
