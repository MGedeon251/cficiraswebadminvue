<template>
  <div class="d-flex flex-wrap justify-content-xl-between">
    <div class="card-body">
      <h4 class="card-title">Examens semestre {{ semestre }}</h4>
      <p class="card-description">Liste des examens pour le semestre {{ semestre }}</p>

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
              <th scope="col">Designation</th>
              <th scope="col">Etat</th>
              <th scope="col">Date</th>
              <th scope="col">Durée</th>
              <th scope="col">Formateur</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="exam in filteredExams" :key="exam.id">
              <td>{{ exam.designation }}</td>
              <td>
                <span
                  class="status-badge"
                  :class="exam.status === 'active' ? 'status-active' : 'status-draft'"
                  >{{ exam.status }}</span
                >
              </td>
              <td>{{ exam.date }}</td>
              <td>{{ exam.duree }} jours</td>
              <td>{{ exam.formateur }}</td>
              <td><button class="btn btn-sm btn-outline-primary">...</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    semestre: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      types: ['Partiel', 'Rappel'],
      selectedType: 'Partiel',
      exams: [
        {
          id: 1,
          designation: 'Examen Partiel session de février 2025',
          status: 'inactive',
          date: '5 Février 2025',
          duree: 10,
          formateur: 'OYERE Morel Garvey',
          semestre: 1,
          type: 'Partiel',
        },
        {
          id: 2,
          designation: 'Examen Rappel session de Mars 2025',
          status: 'active',
          date: '24 Mars 2025',
          duree: 10,
          formateur: 'OYERE Morel Garvey',
          semestre: 1,
          type: 'Rappel',
        },
        {
          id: 3,
          designation: 'Examen Partiel session de Juin 2025',
          status: 'active',
          date: '5 Juin 2025',
          duree: 10,
          formateur: 'OYERE Morel Garvey',
          semestre: 2,
          type: 'Partiel',
        },
        {
          id: 4,
          designation: 'Examen Partiel session de Aout 2025',
          status: 'inactive',
          date: '3 Aout 2025',
          duree: 10,
          formateur: 'LEKOUNDA Mardochet Gédéon',
          semestre: 2,
          type: 'Partiel',
        },
      ],
    };
  },
  computed: {
    filteredExams() {
      return this.exams.filter(
        (exam) => exam.semestre === this.semestre && exam.type === this.selectedType
      );
    },
  },
  methods: {
    setType(type) {
      this.selectedType = type;
    },
  },
};
</script>

<style scoped>
/* Your styles here */
</style>
