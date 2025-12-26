
<!-- AnneeAcademiqueHeader.vue -->
<template>
  <div class="row">
    <div class="col-md-12 grid-margin">
      <div class="d-flex justify-content-between flex-wrap">
        <div class="d-flex align-items-end flex-wrap">
          <div class="me-md-3 me-xl-5">
            <h2>Gestion des Années Académiques</h2>
            <p class="mb-md-0">Configuration et gestion des années académiques</p>
          </div>
          <div class="d-flex">
            <i class="mdi mdi-home text-muted hover-cursor"></i>
            <p class="text-muted mb-0 hover-cursor">&nbsp;/&nbsp;Structure Académique&nbsp;/&nbsp;</p>
            <p class="text-primary mb-0 hover-cursor">Années académiques</p>
          </div>
        </div>
        <div class="d-flex justify-content-between align-items-end flex-wrap gap-2">
          <button 
            type="button" 
            class="btn btn-light bg-white btn-icon me-2"
            @click="exportData"
            title="Exporter"
          >
            <i class="mdi mdi-download text-muted"></i>
          </button>
          <button 
            type="button" 
            class="btn btn-light bg-white btn-icon me-2"
            @click="printData"
            title="Imprimer"
          >
            <i class="mdi mdi-printer text-muted"></i>
          </button>
          <button 
            type="button" 
            class="btn btn-light bg-white btn-icon me-2"
            @click="refreshData"
            title="Actualiser"
          >
            <i class="mdi mdi-refresh text-muted"></i>
          </button>
          <button 
            class="btn btn-primary mt-2 mt-xl-0"
            data-bs-toggle="modal"
            data-bs-target="#addAnneeModal"
          >
            <i class="mdi mdi-plus"></i> Nouvelle année académique
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const exportData = () => {
  console.log('Export des années académiques');
};

const printData = () => {
  window.print();
};

const refreshData = () => {
  window.location.reload();
};
</script>