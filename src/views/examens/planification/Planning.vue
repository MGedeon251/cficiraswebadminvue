<template>
  <div class="row">
    <div class="container my-2">
      <div class="card p-4">
        <div class="card-body dashboard-tabs p-0">
          <h4 class="card-title">Planning & Archivages</h4>
          <p class="text-muted">Creation et édition des planning pour les calendrier d'examens</p>
          <div class="d-flex justify-content-between flex-wrap">
            <div class="col-md-3">
              <select class="form-select">
                <option value="year">2022-2023</option>
                <option value="year">2023-2024</option>
                <option value="year">2024-2025</option>
              </select>
            </div>
            <div class="d-flex justify-content-between align-items-end flex-wrap mb-3">
              <button type="button" class="btn btn-outline-dark btn-icon me-2 d-none d-md-block">
                <i class="mdi mdi-filter"></i>
              </button>
              <button
                type="button"
                class="btn btn-outline-dark btn-icon me-2 d-none d-md-block"
                @click=""
              >
                <i class="mdi mdi-alert-circle"></i>
              </button>
              <div class="btn-group">
                <button
                  type="button"
                  class="btn btn-primary mt-2 mt-xl-0"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  aria-hidden="true"
                  data-bs-backdrop="static"
                  data-bs-keyboard="false"
                >
                  + Ajouter
                </button>
                <button
                  type="button"
                  class="btn btn-primary dropdown-toggle dropdown-toggle-split"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span class="visually-hidden">Toggle Dropdown</span>
                </button>
                <ul class="dropdown-menu">
                  <li>
                    <a class="dropdown-item" href="#drag-drop-area">Importer fichier</a>
                  </li>
                </ul>
              </div>
            </div>
            <addPlanning @examen-ajoute="ajouterExamen" />
          </div>
          <PlanningList />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup="setup">
import addPlanning from './components/modal/AddPlanning.vue';
import PlanningList from './components/tables/PlanningList.vue';

import { ref } from 'vue';
const examens = ref([]);
function ajouterExamen(nouvelExamen) {
  examens.value.push(nouvelExamen);
}
const getStatusClass = (status) => {
  const classes = {
    planifié: 'bg-primary',
    confirmé: 'bg-success',
    annulé: 'bg-danger',
    terminé: 'bg-secondary',
  };
  return classes[status] || 'bg-light text-dark';
};
</script>

<style scoped>
body {
  background-color: #f8f9fa;
  color: #212529;
}
.card {
  background-color: #ffffff;
  border: 1px solid #dee2e6;
  border-radius: 10px;
}
.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
  color: #fff;
}
.btn-primary:hover {
  background-color: #0056b3;
  border-color: #004080;
}
.status-badge {
  padding: 0.5em 1em;
  border-radius: 20px;
  font-size: 0.85rem;
  color: #fff;
}
.status-draft {
  background-color: #6c757d;
}
.status-active {
  background-color: #0d6efd;
}
.table thead th {
  border-bottom: 2px solid #dee2e6;
}
</style>
