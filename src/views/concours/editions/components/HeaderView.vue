<template>
  <div class="row">
    <div class="col-md-12 grid-margin">
      <div class="d-flex justify-content-between flex-wrap">
        <div class="d-flex align-items-end flex-wrap">
          <div class="me-md-3 me-xl-5">
            <h2>Editions de concours</h2>
            <p class="mb-md-0">
              Ouverture d'un concours et inscription des candidats année academique
            </p>
          </div>
          <div class="d-flex">
            <i class="mdi mdi-home text-muted hover-cursor"></i>
            <p class="text-muted mb-0 hover-cursor">&nbsp;/&nbsp;Concours&nbsp;/&nbsp;</p>
            <p class="text-primary mb-0 hover-cursor">Editions</p>
          </div>
        </div>
        <div class="d-flex justify-content-between align-items-end flex-wrap">
          <button class="btn btn-outline-dark me-2">Exporter</button>
          <div class="btn-group">
            <button
              class="btn btn-primary mt-2 mt-xl-0"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              + Nouveau
            </button>
            <button
              class="btn btn-primary dropdown-toggle dropdown-toggle-split"
              data-bs-toggle="dropdown"
            >
              <span class="visually-hidden">Toggle Dropdown</span>
            </button>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#drag-drop-area">Importer fichier</a></li>
            </ul>
          </div>
          <AddConcour />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import AddConcour from './modal/AddConcour.vue';
</script>
