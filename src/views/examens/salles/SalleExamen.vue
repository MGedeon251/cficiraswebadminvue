<template>
  <div class="row">
    <div class="container my-2">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h4>Salle d'examens</h4>
      </div>

      <div class="card p-4">
        <div class="card-body dashboard-tabs p-0">
          <p class="text-muted">Répartition automatique des salles d'examens</p>
        </div>

        <!-- Configuration des salles -->
        <div class="mb-4">
          <h5 class="text-dark mb-3">Configuration des salles</h5>
          <div class="row">
            <div class="col-md-6">
              <div class="mb-3">
                <label class="form-label">Nombre de salles disponibles</label>
                <input type="number" class="form-control" v-model.number="roomCount" min="1" />
              </div>
            </div>
            <div class="col-md-6">
              <div class="mb-3">
                <label class="form-label">Capacité par salle</label>
                <input
                  type="number"
                  class="form-control"
                  v-model.number="capacityPerRoom"
                  min="1"
                />
              </div>
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label">Mode de répartition</label>
            <select class="form-select" v-model="distributionMode">
              <option value="mixed">Mélanger toutes les classes</option>
              <option value="byClass">Regrouper par classe</option>
              <option value="byClassMixed">Mélanger dans chaque classe</option>
            </select>
          </div>
        </div>

        <!-- Drag & Drop Zone -->
        <div
          class="drag-drop-area border rounded p-4 text-center"
          @dragover.prevent
          @dragenter.prevent="isDragging = true"
          @dragleave="isDragging = false"
          @drop.prevent="handleDrop"
          :class="{ 'drag-over': isDragging }"
        >
          <p class="text-muted">
            <i class="bi bi-upload text-primary fs-3"></i><br />
            Glissez-déposez le fichier des étudiants ici ou
            <span class="text-primary">cliquez pour charger</span>
          </p>

          <input
            type="file"
            ref="fileInput"
            hidden
            @change="handleFileUpload"
            accept=".csv, .xlsx"
          />
          <button class="btn btn-outline-primary mt-2" @click="openFileInput">
            Sélectionner un fichier
          </button>
        </div>

        <!-- Fichier Importé -->
        <div v-if="uploadedFile.length" class="mt-3">
          <h5 class="text-dark">Fichiers chargés :</h5>
          <div class="list-group mb-3">
            <div
              class="list-group-item d-flex justify-content-between align-items-center"
              v-for="(file, index) in uploadedFile"
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
        <div v-if="distributionResults.length > 0" class="mt-4">
          <h5 class="text-dark mb-3">Résultats de la répartition</h5>

          <div class="alert alert-info">
            <strong>Répartition terminée :</strong>
            {{ totalStudents }} étudiants répartis dans {{ distributionResults.length }} salles
          </div>

          <div class="accordion" id="distributionAccordion">
            <div class="accordion-item" v-for="(room, index) in distributionResults" :key="index">
              <h2 class="accordion-header">
                <button
                  class="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  :data-bs-target="'#roomCollapse' + index"
                >
                  Salle {{ index + 1 }} ({{ room.students.length }} étudiants)
                </button>
              </h2>
              <div
                :id="'roomCollapse' + index"
                class="accordion-collapse collapse"
                :class="{ show: index === 0 }"
                data-bs-parent="#distributionAccordion"
              >
                <div class="accordion-body">
                  <table class="table table-striped">
                    <thead>
                      <tr>
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th>Classe</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(student, sIndex) in room.students" :key="sIndex">
                        <td>{{ student.lastName }}</td>
                        <td>{{ student.firstName }}</td>
                        <td>{{ student.class }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <button class="btn btn-outline-success mt-3" @click="exportResults">
            <i class="bi bi-download"></i> Exporter les résultats
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import * as XLSX from 'xlsx';

const fileInput = ref(null);
const uploadedFile = ref([]);
const isDragging = ref(false);
const studentsList = ref([]);
const distributionResults = ref([]);

const roomCount = ref(5);
const capacityPerRoom = ref(20);
const distributionMode = ref('mixed');

const openFileInput = () => fileInput.value.click();

const handleFileUpload = async (event) => {
  const files = event.target.files;
  if (!files.length) return;

  for (const file of files) {
    uploadedFile.value.push(file);
    await parseStudentFile(file);
  }
};

const handleDrop = async (event) => {
  const files = event.dataTransfer.files;
  if (!files.length) return;
  isDragging.value = false;

  for (const file of files) {
    uploadedFile.value.push(file);
    await parseStudentFile(file);
  }
};

const removeFile = (index) => {
  uploadedFile.value.splice(index, 1);
  recalculateStudentList();
};

const recalculateStudentList = async () => {
  studentsList.value = [];
  for (const file of uploadedFiles.value) {
    await parseStudentFile(file, true);
  }
};

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
      studentsList.value = [...studentsList.value, ...parsed];
    }
  } catch (error) {
    console.error('Erreur de lecture du fichier :', error);
    alert('Erreur lors de la lecture du fichier. Vérifiez le format.');
  }
};

const distributeStudents = () => {
  if (studentsList.value.length === 0) return;
  const results = [];
  let currentRoom = { students: [] };
  let studentsToDistribute = [...studentsList.value];

  if (distributionMode.value === 'mixed') {
    studentsToDistribute = shuffleArray(studentsToDistribute);
  } else {
    const classes = {};
    studentsList.value.forEach((s) => {
      if (!classes[s.class]) classes[s.class] = [];
      classes[s.class].push(s);
    });

    if (distributionMode.value === 'byClassMixed') {
      for (let cls in classes) {
        classes[cls] = shuffleArray(classes[cls]);
      }
    }

    studentsToDistribute = [];
    const maxLength = Math.max(...Object.values(classes).map((c) => c.length));
    for (let i = 0; i < maxLength; i++) {
      for (let cls in classes) {
        if (classes[cls][i]) studentsToDistribute.push(classes[cls][i]);
      }
    }
  }

  for (const student of studentsToDistribute) {
    if (currentRoom.students.length >= capacityPerRoom.value) {
      results.push(currentRoom);
      currentRoom = { students: [] };
      if (results.length >= roomCount.value) break;
    }
    currentRoom.students.push(student);
  }

  if (currentRoom.students.length > 0) results.push(currentRoom);
  distributionResults.value = results;
};

const shuffleArray = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const exportResults = () => {
  const exportData = [];
  distributionResults.value.forEach((room, roomIndex) => {
    room.students.forEach((student) => {
      exportData.push({
        Salle: `Salle ${roomIndex + 1}`,
        Nom: student.lastName,
        Prénom: student.firstName,
        Classe: student.class,
      });
    });
  });
  const worksheet = XLSX.utils.json_to_sheet(exportData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Répartition');
  XLSX.writeFile(workbook, 'repartition_salles.xlsx');
};

const canDistribute = computed(() => {
  return studentsList.value.length > 0 && roomCount.value > 0 && capacityPerRoom.value > 0;
});

const totalStudents = computed(() => studentsList.value.length);
</script>
<style scoped></style>
