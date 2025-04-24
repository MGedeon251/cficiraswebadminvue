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
            Glissez-déposez vos fichiers ici ou
            <span class="text-primary">cliquez pour charger</span>
          </p>

          <input
            type="file"
            ref="fileInput"
            hidden
            @change="handleFileUpload"
            accept=".csv, .xlsx"
            multiple
          />
          <button class="btn btn-outline-primary mt-2" @click="openFileInput">
            Sélectionner des fichiers
          </button>
        </div>

        <!-- Fichiers Importés -->
        <div v-if="uploadedFiles.length" class="mt-3">
          <h5 class="text-dark">Fichiers chargés :</h5>
          <ul class="list-group">
            <li
              v-for="(file, index) in uploadedFiles"
              :key="index"
              class="list-group-item d-flex justify-content-between"
            >
              {{ file.name }}
              <button class="btn btn-sm btn-danger" @click="removeFile(index)">
                <i class="mdi mdi-close-circle-outline"></i>
              </button>
            </li>
          </ul>
          <button class="btn btn-outline-primary mt-2">Répartir</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const fileInput = ref(null);
const uploadedFiles = ref([]);
const isDragging = ref(false);

const openFileInput = () => {
  fileInput.value.click();
};

const handleFileUpload = (event) => {
  const files = Array.from(event.target.files);
  uploadedFiles.value.push(...files);
};

const handleDrop = (event) => {
  const files = Array.from(event.dataTransfer.files);
  uploadedFiles.value.push(...files);
  isDragging.value = false;
};

const removeFile = (index) => {
  uploadedFiles.value.splice(index, 1);
};
</script>

<style scoped>
.drag-drop-area {
  transition: background-color 0.2s ease-in-out;
}
.drag-over {
  background-color: #f0f8ff;
}
</style>
