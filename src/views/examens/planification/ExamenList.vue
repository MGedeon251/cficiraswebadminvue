<template>
  <div class="d-flex flex-wrap justify-content-xl-between">
    <div class="card-body">
      <h4 class="card-title">Examens semestre {{ semestreLabel }}</h4>
      <p class="card-description">
        Liste des examens pour {{ semestre === 0 ? "tous les semestres" : `le semestre ${semestre}` }}
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

      <div class="table-responsive">
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
            <tr v-for="exam in filteredExams" :key="exam.id">
              <td>{{ exam.designation }}</td>
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
                <button class="btn btn-sm btn-outline-primary">...</button>
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

<script>
import { onMounted, ref, computed } from "vue";
import { getSessions } from "@/api/evaluations/evaluationApi";

export default {
  props: {
    semestre: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const exams = ref([]);
    const types = ref(["Partiel", "Rattrapage"]); 
    const selectedType = ref("Partiel");
    const loading = ref(true);

    const fetchSessions = async () => {
      loading.value = true;
      try {
        const response = await getSessions();
        exams.value = response.map((exam) => ({
          ...exam,
          date_debut: new Date(exam.date_debut).toLocaleDateString(),
          date_fin: new Date(exam.date_fin).toLocaleDateString(),
          // Ajout d'un champ type dérivé du code
          type: exam.code.includes("PARTIEL") ? "Partiel" : "Rattrapage"
        }));
      } catch (error) {
        console.error("Erreur lors de la récupération des sessions :", error);
      } finally {
        loading.value = false;
      }
    };
    const filteredExams = computed(() =>
      exams.value.filter(
        (exam) => 
          exam.semestre === `S${props.semestre}` && // Comparaison avec "S1" ou "S2"
          exam.type.includes(selectedType.value) // Filtre sur le type calculé
      )
    );

    const setType = (type) => {
      selectedType.value = type;
    };

    onMounted(fetchSessions);

    return {
      exams,
      types,
      selectedType,
      filteredExams,
      setType,
      loading,
    };
  },
};
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
