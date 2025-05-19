<template>
<div class="row">
    <div class="col-md-12 grid-margin stretch-card">
      <div class="card">
        <div class="card-body">
        <div
            class="drop-zone border border-dashed border-2 rounded p-4 text-center"
            @dragover.prevent
            @drop.prevent="handleDrop"
          >
            <p class="text-muted mb-2">Glissez un fichier Excel (.xlsx/.csv) ici ou</p>
            <input type="file" ref="fileInput" class="d-none" @change="handleFileUpload" accept=".xlsx,.csv" />
            <button class="btn btn-primary btn-sm" @click="fileInput.click()">Choisir un fichier</button>
        </div>
        <!-- Prévisualisation des données -->
        <div v-if="previewData.length" class="table-responsive mt-4">
          <table class="table table-bordered table-sm">
            <thead>
              <tr>
                <th v-for="(header, index) in previewData[0]" :key="index">{{ header }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, i) in previewData.slice(1)" :key="i">
                <td v-for="(cell, j) in row" :key="j">{{ cell }}</td>
              </tr>
            </tbody>
          </table>
          <button class="btn btn-success btn-sm mt-2" @click="importData">Importer</button>
        </div>
        </div>
      </div>
    </div>
 </div>
</template>

<script setup>
import { ref } from 'vue';
import * as XLSX from 'xlsx';
// import { importEnseignants } from '@/api/pedagogies/pedagogieApi'; // à créer côté backend

const fileInput = ref(null);
const previewData = ref([]); // tableau 2D : [[entête], [row1], [row2], ...]

function handleDrop(e) {
  const file = e.dataTransfer.files[0];
  if (file) readFile(file);
}

function handleFileUpload(e) {
  const file = e.target.files[0];
  if (file) readFile(file);
}

function readFile(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: 'array' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const json = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    previewData.value = json;
  };
  reader.readAsArrayBuffer(file);
}

function importData() {
  const [headers, ...rows] = previewData.value;

  const enseignants = rows.map((row) => {
    const enseignant = {};
    headers.forEach((key, index) => {
      enseignant[key] = row[index] ?? '';
    });
    return enseignant;
  });

  console.log('Enseignants à importer :', enseignants);
  // Appelle ici ton API :
  // importEnseignants(enseignants)
  //   .then(() => alert("Importation réussie"))
  //   .catch(err => alert("Erreur d'importation : " + err.message));
}
</script>

<style scoped>
.drop-zone {
  background: #f9f9f9;
  cursor: pointer;
  transition: background 0.3s;
}
.drop-zone:hover {
  background: #eef;
}
</style>
