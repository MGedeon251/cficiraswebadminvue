<template>
  <div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title">Importer la liste des étudiants</h5>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>

    <div class="modal-body">
      <div
        class="drop-zone"
        @dragover.prevent
        @drop.prevent="handleDrop"
        @click="fileInput.click()"
      >
        <p class="text-center text-muted">
          Glissez-déposez un fichier ici ou cliquez pour sélectionner un fichier .xlsx ou .csv
        </p>
        <input
          type="file"
          ref="fileInput"
          accept=".xlsx,.csv"
          @change="handleFileChange"
          class="d-none"
        />
      </div>

      <div v-if="fileName" class="mt-3"><strong>Fichier sélectionné :</strong> {{ fileName }}</div>

      <!-- Tableau de prévisualisation -->
      <div v-if="previewData.length" class="table-responsive mt-4">
        <table class="table table-bordered table-sm">
          <thead class="table-light">
            <tr>
              <th v-for="(col, index) in columns" :key="index">{{ col }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, rowIndex) in previewData.slice(0, 10)" :key="rowIndex">
              <td v-for="(col, colIndex) in columns" :key="colIndex">
                {{ row[col] }}
              </td>
            </tr>
          </tbody>
        </table>
        <small class="text-muted">Affichage des 10 premières lignes</small>
      </div>
    </div>

    <div class="modal-footer">
      <button class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
      <button class="btn btn-primary" :disabled="!previewData.length" @click="validerImport">
        Valider l'import
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import * as XLSX from 'xlsx';

const emit = defineEmits(['import-complete']);
const file = ref(null);
const fileName = ref('');
const fileInput = ref(null);
const previewData = ref([]);
const columns = ref([]);

const handleDrop = (e) => {
  const droppedFile = e.dataTransfer.files[0];
  processFile(droppedFile);
};

const handleFileChange = (e) => {
  const selectedFile = e.target.files[0];
  processFile(selectedFile);
};

const processFile = (selectedFile) => {
  if (!validateFile(selectedFile)) return;
  file.value = selectedFile;
  fileName.value = selectedFile.name;

  const reader = new FileReader();
  reader.onload = (e) => {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: 'array' });
    const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(firstSheet);

    previewData.value = jsonData;
    columns.value = jsonData.length > 0 ? Object.keys(jsonData[0]) : [];
  };
  reader.readAsArrayBuffer(selectedFile);
};

const validateFile = (f) => {
  const validTypes = [
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'text/csv',
    'application/vnd.ms-excel',
  ];
  if (!validTypes.includes(f.type)) {
    alert('Fichier non supporté. Veuillez sélectionner un fichier .xlsx ou .csv');
    return false;
  }
  return true;
};

const validerImport = () => {
  emit('import-complete', previewData.value);
  alert('Importation confirmée !');
  // Réinitialiser après import si souhaité
  file.value = null;
  fileName.value = '';
  previewData.value = [];
};
</script>

<style scoped>
.drop-zone {
  border: 2px dashed #aaa;
  border-radius: 10px;
  padding: 40px;
  text-align: center;
  cursor: pointer;
  transition: 0.3s ease;
}
.drop-zone:hover {
  background-color: #f8f9fa;
}
</style>
