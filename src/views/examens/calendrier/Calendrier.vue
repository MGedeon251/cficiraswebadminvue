<template>
  <div class="row">
    <div class="container my-2">
      <h4>Calendrier</h4>
      <div class="card p-4">
        <div class="card-body dashboard-tabs p-0">
          <h4 class="card-title">Planification</h4>
          <p class="text-muted">Planning et calendrier des deroulement des examens</p>
          <div class="d-flex gap-2 mb-3">
            <div class="d-flex justify-content-between align-items-end flex-wrap">
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
              <button
                class="btn btn-primary mt-2 mt-xl-0"
                data-bs-toggle="modal"
                data-bs-target="#addPlanningModal"
              >
                + Ajouter
              </button>
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
import addPlanning from './modal/AddPlanning.vue'; // Assure-toi que le chemin est correct
import PlanningList from './tab/PlanningList.vue';

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
<style>
.badge {
  padding: 0.35em 0.65em;
  font-size: 0.75em;
  font-weight: 500;
  border-radius: 50rem;
}
</style>
