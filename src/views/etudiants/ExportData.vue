
<template>
    
      <h5 class="card-title">EXPORT</h5>
      <hr />
      <div class="mb-3">
        <label for="exportType" class="form-label">Export type</label>
        <div class="col-md-6 grid-margin stretch-card">
            <select v-model="selectedFormat" class="form-select" id="exportType">
                <option value="excel">EXCEL</option>
                <option value="csv">CSV</option>
                <option value="pdf">PDF</option>
            </select>
        </div>
        <div class="col-md-6 grid-margin stretch-card">
            <button @click="exportData" class="btn btn-primary">Export</button>
        </div>
      </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const selectedFormat = ref('excel', 'CSV');
  
  const exportData = () => {
    alert(`Exporting data as: ${selectedFormat.value.toUpperCase()}`);
  };
  </script>
  