<template>
  <div class="container py-4">
    <h3 class="mb-4 text-primary">Répartition automatique des étudiants</h3>

    <!-- Upload area -->
    <div
      class="border border-primary p-4 rounded text-center"
      :class="{ 'bg-light': isDragging }"
      @dragover.prevent="isDragging = true"
      @dragleave.prevent="isDragging = false"
      @drop.prevent="handleDrop"
    >
      <p class="text-secondary">Glissez et déposez les fichiers Excel ou CSV ici, ou</p>
      <button class="btn btn-outline-primary" @click="browseFile">Choisir des fichiers</button>
      <input
        type="file"
        ref="fileInput"
        hidden
        multiple
        @change="handleFileUpload"
        accept=".csv, .xlsx"
      />
    </div>

    <!-- Liste des fichiers chargés -->
    <div v-if="uploadedFiles.length" class="mt-3">
      <h5 class="text-dark">Fichiers chargés :</h5>
      <div class="list-group mb-3">
        <div
          class="list-group-item d-flex justify-content-between align-items-center"
          v-for="(file, index) in uploadedFiles"
          :key="index"
        >
          {{ file.name }}
          <button class="btn btn-sm btn-danger" @click="removeFile(index)">
            <i class="mdi mdi-close-circle-outline"></i>
          </button>
        </div>
      </div>
      <button class="btn btn-primary" @click="distributeStudents" :disabled="!canDistribute">
        Répartir les étudiants
      </button>
    </div>

    <!-- Résultats de la répartition -->
    <div v-if="distributionResult.length" class="mt-4">
      <h5 class="text-success">Résultats de la répartition :</h5>
      <div v-for="(salle, index) in distributionResult" :key="index" class="card my-2">
        <div class="card-header bg-primary text-white">Salle {{ index + 1 }}</div>
        <ul class="list-group list-group-flush">
          <li v-for="(etudiant, idx) in salle" :key="idx" class="list-group-item">
            {{ etudiant.lastName }} {{ etudiant.firstName }} ({{ etudiant.class }})
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import * as XLSX from 'xlsx';

const uploadedFiles = ref([]);
const studentsList = ref([]);
const distributionResult = ref([]);
const isDragging = ref(false);
const fileInput = ref(null);
const salleCapacity = 12; // Capacité d'une salle (modifiable)

// Ouvrir la boîte de sélection
const browseFile = () => {
  fileInput.value.click();
};

// Gestion du téléchargement manuel
const handleFileUpload = async (event) => {
  const files = event.target.files;
  if (!files.length) return;

  for (const file of files) {
    uploadedFiles.value.push(file);
    await parseStudentFile(file, true);
  }
};

// Gestion du glisser-déposer
const handleDrop = async (event) => {
  const files = event.dataTransfer.files;
  if (!files.length) return;
  isDragging.value = false;

  for (const file of files) {
    uploadedFiles.value.push(file);
    await parseStudentFile(file, true);
  }
};

// Lire et parser un fichier
const parseStudentFile = async (file, append = false) => {
  try {
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);
    const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(firstSheet);

    const parsed = jsonData.map((row) => ({
      lastName: row['Nom'] || row['nom'] || row['LASTNAME'] || '',
      firstName: row['Prénom'] || row['prenom'] || row['FIRSTNAME'] || '',
      class: row['Classe'] || row['classe'] || row['CLASS'] || '',
    }));

    if (append) {
      studentsList.value.push(...parsed);
    } else {
      studentsList.value = [...parsed];
    }
  } catch (error) {
    console.error('Erreur lors de la lecture du fichier :', error);
    alert('Erreur lors de la lecture du fichier. Assurez-vous que le format est correct.');
  }
};

// Supprimer un fichier chargé
const removeFile = (index) => {
  uploadedFiles.value.splice(index, 1);
  recalculateStudentList();
};

// Reconstruire la liste des étudiants si un fichier est supprimé
const recalculateStudentList = async () => {
  studentsList.value = [];
  for (const file of uploadedFiles.value) {
    await parseStudentFile(file, true);
  }
};

// Répartir les étudiants dans les salles
const distributeStudents = () => {
  const total = studentsList.value.length;
  const numRooms = Math.ceil(total / salleCapacity);
  const shuffled = [...studentsList.value].sort(() => Math.random() - 0.5);
  distributionResult.value = [];

  for (let i = 0; i < numRooms; i++) {
    const salle = shuffled.slice(i * salleCapacity, (i + 1) * salleCapacity);
    distributionResult.value.push(salle);
  }
};

const canDistribute = computed(() => studentsList.value.length > 0);
</script>

<style scoped>
.bg-light {
  background-color: #f8f9fa;
}
</style>
