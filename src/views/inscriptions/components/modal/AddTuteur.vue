<template>
  <div class="modal fade" id="ajouterTuteurModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <!-- Header -->
        <div class="modal-header bg-primary text-white">
          <h5 class="modal-title">Ajouter tuteurs étudiants</h5>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
        </div>

        <!-- Body -->
        <div class="modal-body">
          <!-- Zone Drag & Drop -->
          <div
            class="drag-drop-zone"
            @dragover.prevent
            @dragenter.prevent
            @drop.prevent="handleDrop"
            @click="$refs.fileInput.click()"
          >
            <p class="text-muted mb-1">Glissez-déposez votre fichier ici</p>
            <p class="fw-bold">ou cliquez pour sélectionner</p>
            <input
              type="file"
              ref="fileInput"
              class="d-none"
              accept=".xlsx, .xls, .csv"
              @change="handleFile"
            />
          </div>

          <div class="form-text mt-2">
            Le fichier doit contenir les colonnes suivantes :
            <strong>etudiant, tuteur, tel, email, adresse</strong>
          </div>

          <!-- Spinner -->
          <div v-if="isLoading" class="text-center py-4">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Chargement...</span>
            </div>
            <p class="mt-2">Lecture du fichier en cours...</p>
          </div>

          <!-- Aperçu des données -->
          <div v-if="tuteursData.length > 0" class="table-responsive mt-3">
            <h6>Tuteurs détectés ({{ tuteursData.length }} lignes)</h6>
            <table class="table table-striped table-hover table-sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Étudiant</th>
                  <th>Tuteur</th>
                  <th>Téléphone</th>
                  <th>Email</th>
                  <th>Adresse</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, idx) in tuteursData" :key="idx">
                  <td>{{ idx + 1 }}</td>
                  <td>{{ item.etudiant }}</td>
                  <td>{{ item.tuteur }}</td>
                  <td>{{ item.tel }}</td>
                  <td>{{ item.email }}</td>
                  <td>{{ item.adresse }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Footer -->
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Annuler</button>
          <button
            class="btn btn-primary"
            :disabled="!tuteursData.length || isLoading"
            @click="submitTuteurs"
          >
            <span v-if="isLoading" class="spinner-border spinner-border-sm me-1" role="status"></span>
            {{ isLoading ? 'Importation...' : 'Importer' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import * as XLSX from "xlsx";

const tuteursData = ref([]);
const isLoading = ref(false);
const fileInput = ref(null);

const handleDrop = (event) => {
  const file = event.dataTransfer.files[0];
  if (file) processFile(file);
};

const handleFile = (event) => {
  const file = event.target.files[0];
  if (file) processFile(file);
};

const processFile = (file) => {
  isLoading.value = true;
  const reader = new FileReader();
  reader.onload = (e) => {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: "array" });
    const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(firstSheet);

    // Mapping des colonnes
    tuteursData.value = jsonData.map((row) => ({
      etudiant: row.etudiant || "",
      tuteur: row.tuteur || "",
      tel: row.tel || "",
      email: row.email || "",
      adresse: row.adresse || "",
    }));

    isLoading.value = false;
  };
  reader.readAsArrayBuffer(file);
};

const submitTuteurs = () => {
  console.log("Tuteurs importés:", tuteursData.value);
  // Envoie vers API ici

  // Reset
  tuteursData.value = [];
  if (fileInput.value) fileInput.value.value = "";
};
</script>

<style scoped>
.drag-drop-zone {
  border: 2px dashed #6c757d;
  border-radius: 8px;
  padding: 40px;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s;
}
.drag-drop-zone:hover {
  background-color: #f8f9fa;
}
</style>
