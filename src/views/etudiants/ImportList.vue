<template>
  <div
    class="modal fade"
    id="importListModal"
    tabindex="-1"
    aria-labelledby="importListModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="importListModalLabel">Importer une liste d'étudiants</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div
            class="drag-drop-area"
            @dragover.prevent="dragActive = true"
            @dragleave.prevent="dragActive = false"
            @drop.prevent="handleDrop"
            :class="{ active: dragActive }"
          >
            <div v-if="!file">
              <p>
                Glissez-déposez un fichier Excel ou CSV ici, ou cliquez pour sélectionner un
                fichier.
              </p>
              <input
                type="file"
                ref="fileInput"
                @change="handleFileChange"
                accept=".xlsx,.xls,.csv"
                style="display: none"
              />
              <button class="btn btn-outline-primary mt-2" @click="triggerFileInput">
                Choisir un fichier
              </button>
            </div>
            <div v-else>
              <p>
                Fichier sélectionné : <strong>{{ file.name }}</strong>
              </p>
              <button class="btn btn-danger btn-sm" @click="removeFile">Retirer</button>
            </div>
          </div>
          <div v-if="previewData.length" class="mt-4">
            <h6>Prévisualisation du fichier :</h6>
            <div style="max-height: 300px; overflow: auto">
              <table class="table table-bordered table-sm">
                <thead>
                  <tr>
                    <th v-for="(col, idx) in previewData[0]" :key="'col' + idx">{{ col }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(row, i) in previewData.slice(1, 11)" :key="'row' + i">
                    <td v-for="(cell, j) in row" :key="'cell' + j">{{ cell }}</td>
                  </tr>
                </tbody>
              </table>
              <div v-if="previewData.length > 11" class="text-muted small">
                ... ({{ previewData.length - 1 }} lignes au total)
              </div>
            </div>
            <button class="btn btn-primary mt-2" @click="validerImport">Valider l'import</button>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-success" :disabled="!file" @click="importFile">
            Importer
          </button>
          <button type="button" class="btn btn-light" data-bs-dismiss="modal">Annuler</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import * as XLSX from 'xlsx';

const file = ref(null);
const dragActive = ref(false);
const fileInput = ref(null);
const previewData = ref([]);

function triggerFileInput() {
  fileInput.value.click();
}

function handleFileChange(e) {
  const files = e.target.files;
  if (files && files[0]) file.value = files[0];
}

function handleDrop(e) {
  dragActive.value = false;
  const files = e.dataTransfer.files;
  if (files && files[0]) file.value = files[0];
}

function removeFile() {
  file.value = null;
  previewData.value = [];
  if (fileInput.value) fileInput.value.value = '';
}

function importFile() {
  if (!file.value) return;
  const reader = new FileReader();
  reader.onload = (evt) => {
    const data = new Uint8Array(evt.target.result);
    const workbook = XLSX.read(data, { type: 'array' });
    const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
    const json = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
    previewData.value = json;
  };
  reader.readAsArrayBuffer(file.value);
}

function validerImport() {
  // Traitez ici previewData.value (envoi API, etc.)
  alert('Import validé ! Nombre de lignes : ' + (previewData.value.length - 1));
  removeFile();
}
</script>

<style scoped>
.drag-drop-area {
  border: 2px dashed #007bff;
  border-radius: 8px;
  padding: 40px 20px;
  text-align: center;
  cursor: pointer;
  background: #f8f9fa;
  transition: border-color 0.2s;
}
.drag-drop-area.active {
  border-color: #0056b3;
  background: #e9ecef;
}
</style>
