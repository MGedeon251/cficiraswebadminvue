<template>
  <div>
    <!-- Header -->
    <div class="row">
      <EtudiantHeader />
    </div>

    <!-- Contenu principal -->
    <div class="row">
      <div class="col-md-12 grid-margin stretch-card">
        <div class="card">
          <!-- Loader -->
          <SkeletonLoader v-if="loading" type="table" :rows="5" :columns="1" />

          <!-- Tabs -->
          <div v-else class="card-body dashboard-tabs p-0">
            <EtudiantTab />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import SkeletonLoader from '@/components/SkeletonLoader.vue';
import EtudiantHeader from './components/EtudiantHeader.vue';
import EtudiantTab from './components/EtudiantTab.vue';
// ⚠️ Prévoir un store Pinia pour gérer les étudiants
// import { useEtudiantStore } from '@/stores/academiqueStore/etudiantStore';

const loading = ref(true);
const etudiants = ref([]);

// Simulation de chargement (à remplacer par store.fetchEtudiants())
onMounted(() => {
  setTimeout(() => {
    etudiants.value = [
      {
        id: 1,
        matricule: 'E001',
        nom: 'Diallo',
        prenom: 'Mamadou',
        email: 'mamadou@example.com',
        telephone: '770000000',
        classe: 'L1-INFO-A',
        filiere: 'Informatique',
      },
      {
        id: 2,
        matricule: 'E002',
        nom: 'Ndiaye',
        prenom: 'Awa',
        email: 'awa@example.com',
        telephone: '780000000',
        classe: 'L2-INFO-B',
        filiere: 'Informatique',
      },
    ];
    loading.value = false;
  }, 2000);
});
</script>

<style scoped>
body {
  background-color: #f8f9fa;
  color: #212529;
}
.card {
  background-color: #ffffff;
  border: 1px solid #dee2e6;
  border-radius: 12px;
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
