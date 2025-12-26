<template>
  <div>
    <div class="row">
      <AnneeAcademiqueHeader />
    </div>
    <div class="row">
      <div class="col-md-12 grid-margin stretch-card">
        <div class="card">
          <SkeletonLoader v-if="loading" type="table" :rows="3" :columns="1" />
          <div v-else class="card-body dashboard-tabs p-0">
            <AnneeAcademiqueTab />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import SkeletonLoader from '@/components/SkeletonLoader.vue';
import AnneeAcademiqueHeader from './components/AnneeAcademiqueHeader.vue';
import AnneeAcademiqueTab from './components/AnneeAcademiqueTab.vue';

const loading = ref(true);
const anneesAcademiques = ref([]);

onMounted(() => {
  setTimeout(() => {
    anneesAcademiques.value = [
      {
        id: 1,
        code: '2023-2024',
        libelle: 'Année Académique 2023-2024',
        dateDebut: '2023-09-01',
        dateFin: '2024-07-31',
        statut: 'terminee',
        estActive: false,
      },
      {
        id: 2,
        code: '2024-2025',
        libelle: 'Année Académique 2024-2025',
        dateDebut: '2024-09-01',
        dateFin: '2025-07-31',
        statut: 'active',
        estActive: true,
      },
    ];
    loading.value = false;
  }, 1500);
});
</script>

<style scoped>
.card {
  background-color: #ffffff;
  border: 1px solid #dee2e6;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
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
</style>



