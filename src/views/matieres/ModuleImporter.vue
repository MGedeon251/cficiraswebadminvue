<template>
    <div class="card p-4">
      <div class="card-body dashboard-tabs p-0">
        <p class="text-muted">Importer une liste existante de matieres</p>
      </div>
      <div
        id="drag-drop-area"
        class="drag-drop-area border rounded p-4 text-center"
        @dragover.prevent
        @dragenter.prevent="isDragging = true"
        @dragleave="isDragging = false"
        @drop.prevent="handleDrop"
        :class="{ 'drag-over': isDragging }"
      >
        <p class="text-muted">
          <i class="bi bi-upload text-primary fs-3"></i><br />
          Glissez déposer vos fichiers ici ou
          <span class="text-primary">cliquer pour charger</span>
        </p>
        <input type="file" ref="fileInput" hidden @change="handleFileUpload" accept=".csv,.xlsx" multiple />
        <button class="btn btn-outline-primary mt-2" @click="openFileInput">Select Files</button>
      </div>
  
      <div v-if="uploadedFiles.length" class="mt-3">
        <h5 class="text-dark">Uploaded Files:</h5>
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
        <button class="btn btn-primary mt-2">Upload</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const isDragging = ref(false)
  const uploadedFiles = ref([])
  
  const openFileInput = () => fileInput.value.click()
  const fileInput = ref(null)
  
  const handleDrop = (event) => {
    isDragging.value = false
    processFiles(Array.from(event.dataTransfer.files))
  }
  
  const handleFileUpload = (event) => {
    processFiles(Array.from(event.target.files))
  }
  
  const processFiles = (files) => {
    files.forEach((file) => {
      if (
        file.type === 'application/vnd.ms-excel' ||
        file.type === 'text/csv' ||
        file.name.endsWith('.xlsx')
      ) {
        uploadedFiles.value.push(file)
      }
    })
  }
  
  const removeFile = (index) => {
    uploadedFiles.value.splice(index, 1)
  }
  </script>
  