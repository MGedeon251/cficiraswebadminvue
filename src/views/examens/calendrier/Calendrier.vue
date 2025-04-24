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
            <button type="button" class="btn btn-outline-dark btn-icon me-3 d-none d-md-block">
              <i class="mdi mdi-filter"></i>
            </button>

            <button type="button" class="btn btn-outline-dark btn-icon me-3 mt-2 mt-xl-0">
              <i class="mdi mdi-alert-circle"></i>
            </button>

            <button class="btn btn-primary mt-2 mt-xl-0">
              <span class="">Ajouter</span>
            </button>
          </div>
          <!-- 🔁 Onglets dynamiques : Tout, Semestre 1, Semestre 2 -->
          <Tabs />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Tabs from '@/components/Tabs.vue'; // Assure-toi que le chemin est correct
</script>
