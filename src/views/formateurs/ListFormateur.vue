<template>
  <div class="ant-wrapper">
    <a-card title="Liste des Formateurs" bordered>
      <!-- Recherche et Filtres -->
      <div class="flex flex-wrap gap-3 mb-4">
        <a-input
          v-model:value="searchQuery"
          placeholder="Rechercher..."
          allow-clear
          style="width: 300px"
        >
          <template #prefix><i class="mdi mdi-magnify" /></template>
        </a-input>

        <a-select
          v-model:value="filters.cycle"
          placeholder="Cycle"
          allow-clear
          style="width: 180px"
        >
          <a-select-option value="">Tous les cycles</a-select-option>
          <a-select-option v-for="cycle in uniqueCycles" :key="cycle" :value="cycle">
            {{ cycle }}
          </a-select-option>
        </a-select>

        <a-select
          v-model:value="filters.niveau"
          placeholder="Niveau"
          allow-clear
          style="width: 180px"
        >
          <a-select-option value="">Tous les niveaux</a-select-option>
          <a-select-option v-for="niveau in uniqueNiveaux" :key="niveau" :value="niveau">
            {{ niveau }}
          </a-select-option>
        </a-select>
      </div>

      <!-- Table -->
      <a-table
        :columns="columns"
        :data-source="paginatedEnseignants"
        :loading="loading"
        :pagination="false"
        :row-key="(record) => record.id"
      >
        <template #bodyCell="{ column, record, index }">
          <template v-if="column.key === 'index'">
            {{ index + 1 + (currentPage - 1) * itemsPerPage }}
          </template>
          <template v-else-if="column.key === 'actions'">
            <ItemActions :item="record" moduleRoute="/enseignant" />
          </template>
        </template>
      </a-table>

      <!-- Pagination -->
      <div class="d-flex justify-content-between align-items-center mt-4">
        <div class="text-muted">
          Affichage de {{ paginatedEnseignants.length }} sur
          {{ filteredEnseignants.length }} formateurs
        </div>
        <a-pagination
          :current="currentPage"
          :total="filteredEnseignants.length"
          :pageSize="itemsPerPage"
          @change="changePage"
        />
      </div>
    </a-card>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useEnseignantStore } from '@/stores/pedagogieStore/enseignantStore';
import ItemActions from './components/DetailItemv2.vue';

const enseignantStore = useEnseignantStore();
const enseignants = computed(() => enseignantStore.enseignants);
const loading = computed(() => enseignantStore.loading);

onMounted(() => {
  enseignantStore.fetchEnseignants();
});

const searchQuery = ref('');
const filters = ref({ cycle: '', niveau: '' });
const currentPage = ref(1);
const itemsPerPage = 10;

// Colonnes du tableau
const columns = [
  { title: '#', key: 'index' },
  { title: 'Nom', dataIndex: 'nom', key: 'nom' },
  { title: 'Prénom', dataIndex: 'prenom', key: 'prenom' },
  { title: 'Email', dataIndex: 'email', key: 'email' },
  { title: 'Téléphone', dataIndex: 'tel1', key: 'tel1' },
  { title: 'Actions', key: 'actions' },
];

// Filtres uniques
const uniqueCycles = computed(() => [
  ...new Set(enseignants.value.map((e) => e.cycle).filter(Boolean)),
]);
const uniqueNiveaux = computed(() => [
  ...new Set(enseignants.value.map((e) => e.niveau).filter(Boolean)),
]);

// Filtrage
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

// Pagination
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

<style scoped>
.ant-wrapper {
  all: unset;
  font-family: inherit;
}
</style>
