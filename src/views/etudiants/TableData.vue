<script setup>
import { onMounted, ref } from "vue";
import { useEtudiantStore } from "@/stores/etudiants/etudiantStore";
import SkeletonLoader from "@/components/SkeletonLoader.vue";

// Initialisation du store
const etudiantStore = useEtudiantStore();

// Références pour les données
const etudiants = ref([]);
const anneesAcademiques = ref([]);
const filieres = ref([]);
const classes = ref([]);
const loading = ref(false);

// Charger les données au montage du composant
onMounted(async () => {
  loading.value = true;
  try {
    await etudiantStore.fetchEtudiants();
    await etudiantStore.fetchAnneesAcademiques();
    await etudiantStore.fetchFilieres();
    await etudiantStore.fetchClasses();

    // Assignation des données du store aux références locales
    etudiants.value = etudiantStore.etudiants;
    anneesAcademiques.value = etudiantStore.anneesAcademiques;
    filieres.value = etudiantStore.filieres;
    classes.value = etudiantStore.classes;
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <SkeletonLoader v-if="loading" type="table" :rows="3" :columns="1" />
  <div v-else class="table-responsive">
    <p class="card-description">Liste des etudiants inscrits</p>
    <div class="d-flex justify-content-between flex-wrap">
      <div class="d-flex align-items-end flex-wrap">
        <div class="me-md-4 me-xl-5">
          <div class="filters d-flex gap-2 mb-2">
            <div class="col-md-6">
              <label class="form-label">Année academique</label>
              <select class="form-select">
                <option v-for="annee in anneesAcademiques" :key="annee.id" :value="annee.id">
                  {{ annee.nom }}
                </option>
              </select>
            </div>
            <div class="col-md-6">
              <label class="form-label">Filiere</label>
              <select class="form-select">
                <option v-for="filiere in filieres" :key="filiere.id" :value="filiere.id">
                  {{ filiere.nom }}
                </option>
              </select>
            </div>
            <div class="col-md-6">
              <label class="form-label">Classe</label>
              <select class="form-select">
                <option v-for="classe in classes" :key="classe.id" :value="classe.id">
                  {{ classe.nom }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
    <table class="table table-hover align-middle">
      <thead>
        <tr>
          <th>#</th>
          <th>Matricule</th>
          <th>Noms</th>
          <th>Prenoms</th>
          <th>sexe</th>
          <th>filiere</th>
          <th>niveau</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(etudiant, index) in etudiants" :key="etudiant.id">
          <td>{{ index + 1 }}</td>
          <td>{{ etudiant.matricule }}</td>
          <td>{{ etudiant.nom }}</td>
          <td>{{ etudiant.prenom }}</td>
          <td>{{ etudiant.sexe }}</td>
          <td>{{ etudiant.filiere.nom }}</td>
          <td>{{ etudiant.classe.nom }}</td>
        </tr>
        <tr v-if="etudiants.length === 0">
          <td colspan="7" class="text-center py-4">
            <div class="d-flex flex-column align-items-center">
              <img src="/img/empty-box.svg" alt="Aucune donnée" class="mb-2" width="auto" />
            </div>
            <div class="text-pr">Aucune donnée</div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref, computed } from 'vue';

const searchQuery = ref('');
const isDragging = ref(false);
const uploadedFiles = ref([]);
const tasks = ref([
  {
    id: 'TASK-7103',
    label: 'Feature',
    title: 'Parse EXE bandwidth!',
    status: 'Canceled',
    priority: 'Low',
  },
  {
    id: 'TASK-4314',
    label: 'Bug',
    title: 'Compress program for XML alarm',
    status: 'In Progress',
    priority: 'High',
  },
  {
    id: 'TASK-3415',
    label: 'Feature',
    title: 'Use cross-platform XML',
    status: 'Todo',
    priority: 'Medium',
  },
  {
    id: 'TASK-4336',
    label: 'Documentation',
    title: 'Synthesize microchip',
    status: 'Done',
    priority: 'Medium',
  },
]);

const filteredTasks = computed(() =>
  tasks.value.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
);

function openFileInput() {
  const fileInput = document.querySelector('#fileInput');
  fileInput.click();
}

function handleDrop(event) {
  isDragging.value = false;
  const files = Array.from(event.dataTransfer.files);
  processFiles(files);
}

function handleFileUpload(event) {
  const files = Array.from(event.target.files);
  processFiles(files);
}

function processFiles(files) {
  files.forEach((file) => {
    if (
      file.type === 'application/vnd.ms-excel' ||
      file.type === 'text/csv' ||
      file.name.endsWith('.xlsx')
    ) {
      uploadedFiles.value.push(file);
    }
  });
}

function removeFile(index) {
  uploadedFiles.value.splice(index, 1);
}

function statusClass(status) {
  const statusClasses = {
    'Canceled': 'badge bg-danger text-white',
    'In Progress': 'badge bg-warning text-dark',
    'Todo': 'badge bg-info text-white',
    'Done': 'badge bg-success text-white',
  };
  return statusClasses[status] || '';
}

function priorityClass(priority) {
  const priorityClasses = {
    'High': 'text-danger fw-bold',
    'Medium': 'text-warning fw-bold',
    'Low': 'text-muted',
  };
  return priorityClasses[priority] || '';
}
</script>
<style scoped>

</style>