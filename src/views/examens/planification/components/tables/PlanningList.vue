<template>
  <table class="table table-hover table-nowrap mb-0">
    <thead>
      <tr>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(plan, index) in planning" :key="planning.planification_id">
        <td>{{ plan.designation }}</td>
        <td>{{ plan.designation_filiere }}</td>
        <td>{{ plan.code_annee_academique }}</td>
        <td>
          <span class="badge" :class="getStatusClass(plan.statut)">
            {{ getStatusLabel(plan.statut) }}
          </span>
        </td>
        <td>
          <ItemActions
            :item="plan"
            moduleRoute="/planning"
            :showAdd="true"
            editModalTarget="#editExamModal"
            @edit="editExam"
            @delete="confirmDelete"
          />
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script setup="setup">
import ItemActions from '../details/DetailPlan.vue'; // Assure-toi que le chemin est correct
import { getPlanning } from '@/api/evaluations/evaluationApi';
import { ref, onMounted } from 'vue';
const planning = ref([]);
const loading = ref(false);

const fetchPlanning = async () => {
  loading.value = true;
  try {
    const response = await getPlanning();
    planning.value = response;
    console.log('Planning récupéré :', planning.value);
  } catch (error) {
    console.error('Erreur lors de la récupération des sessions :', error);
  } finally {
    loading.value = false;
  }
};
const getStatusClass = (status) => {
  const classes = {
    planifiée: 'bg-primary',
    en_attente: 'bg-warning',
    annulé: 'bg-danger',
    terminé: 'bg-success',
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

const editExam = (exam) => {
  // Logique pour éditer l'examen
  console.log("Éditer l'examen :", exam);
};
const confirmDelete = (exam) => {
  // Logique pour confirmer la suppression de l'examen
  console.log("Confirmer la suppression de l'examen :", exam);
};
// Appel lors du montage
onMounted(fetchPlanning);
</script>

<style>
.badge {
  padding: 0.35em 0.65em;
  font-size: 0.75em;
  font-weight: 500;
  border-radius: 50rem;
}
</style>
