<template>
  <div class="ant-wrapper">
    <a-card title="Liste des Formateurs" bordered>
      <FiltreFormateur
        :searchQuery="searchQuery"
        :filters="filters"
        :uniqueCycles="uniqueCycles"
        :uniqueNiveaux="uniqueNiveaux"
      />

      <TableFormateur
        :columns="columns"
        :data="paginatedEnseignants"
        :loading="loading"
        :total="filteredEnseignants.length"
        :currentPage="currentPage"
        :itemsPerPage="itemsPerPage"
        @pageChange="changePage"
        @reset="resetFilters"
      />
    </a-card>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useEnseignantStore } from '@/stores/pedagogieStore/enseignantStore';
import FiltreFormateur from './components/FiltreFormateur.vue';
import TableFormateur from './components/TableFormateur.vue';

const enseignantStore = useEnseignantStore();
const enseignants = computed(() => enseignantStore.enseignants);
const loading = computed(() => enseignantStore.loading);

onMounted(() => {
  enseignantStore.fetchEnseignants();
});

const searchQuery = ref('');
const filters = ref({ cycle: '', niveau: '' });
const currentPage = ref(1);
const itemsPerPage = 5;

const columns = [
  { title: '#', key: 'index' },
  { title: 'Nom', dataIndex: 'nom', key: 'nom' },
  { title: 'Prénom', dataIndex: 'prenom', key: 'prenom' },
  { title: 'Email', dataIndex: 'email', key: 'email' },
  { title: 'Téléphone', dataIndex: 'tel1', key: 'tel1' },
  { title: 'Actions', key: 'actions' },
];

const uniqueCycles = computed(() => [
  ...new Set(enseignants.value.map((e) => e.cycle).filter(Boolean)),
]);
const uniqueNiveaux = computed(() => [
  ...new Set(enseignants.value.map((e) => e.niveau).filter(Boolean)),
]);

const filteredEnseignants = computed(() => {
  return enseignants.value.filter((e) => {
    const q = searchQuery.value.toLowerCase();
    const matchQuery = [e.nom, e.prenom, e.email, e.tel1].some((field) =>
      field?.toLowerCase().includes(q)
    );
    const matchCycle = !filters.value.cycle || e.cycle === filters.value.cycle;
    const matchNiveau = !filters.value.niveau || e.niveau === filters.value.niveau;
    return matchQuery && matchCycle && matchNiveau;
  });
});

const paginatedEnseignants = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredEnseignants.value.slice(start, start + itemsPerPage);
});

function changePage(page) {
  currentPage.value = page;
}
function resetFilters() {
  searchQuery.value = '';
  filters.value = { cycle: '', niveau: '' };
  currentPage.value = 1;
}
</script>
