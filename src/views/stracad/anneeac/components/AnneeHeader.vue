<template>
  <div class="row">
    <div class="col-md-12 grid-margin">
      <div class="d-flex justify-content-between flex-wrap">
        <div class="d-flex align-items-end flex-wrap">
          <div class="me-md-3 me-xl-5">
            <h2>Gestion Années Académiques</h2>
            <p class="mb-md-0">Configuration et gestion des années académiques</p>
            <p class="mb-md-0"></p>
          </div>
          <div class="d-flex">
            <i class="mdi mdi-home text-muted hover-cursor"></i>
            <p class="text-muted mb-0 hover-cursor">&nbsp;/&nbsp;structures&nbsp;/&nbsp;</p>
            <p class="text-primary mb-0 hover-cursor">annees</p>
          </div>
        </div>
        <div class="d-flex justify-content-between align-items-end aflex-wrap">
          <button
            type="button"
            @click="exportData"
            class="btn btn-light bg-white btn-icon me-3 d-none d-md-block"
          >
            <i class="mdi mdi-download text-muted"></i>
          </button>
          <button
            type="button"
            @click="printData"
            class="btn btn-light bg-white btn-icon me-3 mt-2 mt-xl-0"
          >
            <i class="mdi mdi-clock-outline text-muted"></i>
          </button>
          <button class="btn btn-primary mt-2 mt-xl-0" @click="openAddModal">
            + Ajouter un nouveau
          </button>
          <AddAnnees
            :anneeToEdit="anneeToEdit"
            @anneeCreated="onAnneeCreated"
            @anneeUpdated="onAnneeUpdated"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAnneeStore } from '@/stores/academiqueStore/anneStore';
import AddAnnees from '../components/Modal/addAnnee.vue';
const exportData = () => {
  console.log('Export des années académiques');
};

const printData = () => {
  window.print();
};

const anneeStore = useAnneeStore();
const anneeToEdit = ref(null);

const openAddModal = () => {
  anneeToEdit.value = null;
  const modal = new bootstrap.Modal(document.getElementById('anneeModal'));
  modal.show();
};

const editAnnee = (annee) => {
  anneeToEdit.value = annee;
  const modal = new bootstrap.Modal(document.getElementById('anneeModal'));
  modal.show();
};

const onAnneeCreated = () => {
  anneeStore.fetchAnneesAcademiques();
};

const onAnneeUpdated = () => {
  anneeStore.fetchAnneesAcademiques();
};
</script>
