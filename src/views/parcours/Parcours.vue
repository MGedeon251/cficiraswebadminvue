<template>
  <div>
    <div class="row">
      <div class="col-md-12 grid-margin">
        <div class="d-flex justify-content-between flex-wrap">
          <div class="d-flex align-items-end flex-wrap">
            <div class="me-md-3 me-xl-5">
              <h2>Historiques & Parcours</h2>
              <p class="mb-md-0">Gestion des etudiants</p>
            </div>
            <div class="d-flex">
              <i class="mdi mdi-home text-muted hover-cursor"></i>
              <p class="text-muted mb-0 hover-cursor">&nbsp;/&nbsp;Portail&nbsp;/&nbsp;</p>
              <p class="text-primary mb-0 hover-cursor">Parcours</p>
            </div>
          </div>
          <div class="d-flex justify-content-between align-items-end flex-wrap"></div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="container my-2">
        <div class="col-md-12 grid margin stretch-card">
          <div class="card">
            <SkeletonLoader v-if="loading" type="card" :rows="3" :columns="1" />
            <div v-else class="card-body">
              <h4 class="card-title">Historiques des parcours</h4>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import SkeletonLoader from '@/components/SkeletonLoader.vue';

const loading = ref(true);
const formateurs = ref([]);

onMounted(() => {
  setTimeout(() => {
    formateurs.value = [
      {
        id: 1,
        matricule: 'F001',
        nom: 'Doe',
        prenom: 'John',
        email: 'john@example.com',
        telephone: '0123456789',
      },
      {
        id: 2,
        matricule: 'F002',
        nom: 'Smith',
        prenom: 'Anna',
        email: 'anna@example.com',
        telephone: '0987654321',
      },
    ];
    loading.value = false;
  }, 3000);
});
</script>
