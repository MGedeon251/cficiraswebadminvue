<template>
  <div class="row">
    <div class="container my-2">
      <h4>Calendrier</h4>
      <p class="text-muted">Planifications et repartitions des salles matieres</p>

      <div class="card p-4">
        <div class="card-body dashboard-tabs p-0">
          <h4 class="card-title">Planification</h4>
          <p class="card-description"></p>

          <div class="d-flex gap-2 mb-3">
            <div class="d-flex justify-content-between align-items-end flex-wrap">
                                          <button
                                              type="button"
                                              class="btn btn-outline-dark btn-icon me-2 d-none d-md-block ">
                                              <i class="mdi mdi-filter"></i>
                                          </button>
                                          <button
                                            type="button"
                                            class="btn btn-outline-dark btn-icon me-2 d-none d-md-block"
                                            @click="exportToExcel"
                                          >
                                            <i class="mdi mdi-alert-circle"></i>
                                          </button>
                                          <button
                                              class="btn btn-primary mt-2 mt-xl-0"
                                              data-bs-toggle="modal"
                                              data-bs-target="#addPlanningModal">
                                              + Ajouter
                                          </button>
                                      </div>
                                      <addPlanning/>
          <div class="btn-group">
          </div>
        </div>
          <!-- 🔁 Onglets dynamiques : Tout, Semestre 1, Semestre 2 -->
          <div class="d-flex flex-column flex-md-row gap-2">
            <div class="col-12 col-md-4">
              <Tabs :tabs="['Tout', 'Semestre 1', 'Semestre 2']" />
            </div>  
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script setup>
import Tabs from '../semestres/TabTout.vue'; // Assure-toi que le chemin est correct
import addPlanning from './AddPlanning.vue'; // Assure-toi que le chemin est correct
</script>
