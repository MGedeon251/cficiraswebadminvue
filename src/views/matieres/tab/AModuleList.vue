<template>
  <a-card title="Liste des Modules" bordered>
    <!-- Top actions -->
    <div class="flex flex-wrap justify-between mb-4">
      <a-button-group>
        <a-button @click="exportPDF"><i class="mdi mdi-file-pdf-box" /> PDF</a-button>
        <a-button @click="exportExcel"><i class="mdi mdi-file-excel-box" /> Excel</a-button>
        <a-button @click="exportCSV"><i class="mdi mdi-file-delimited" /> CSV</a-button>
        <a-button @click="print"><i class="mdi mdi-printer" /> Imprimer</a-button>
      </a-button-group>
      <a-button type="default" @click="refreshModules" :loading="isLoading">
        🔄 Rafraîchir
      </a-button>
      <a-input
        v-model:value="searchQuery"
        placeholder="Rechercher..."
        allow-clear
        style="width: 250px"
      >
        <template #prefix>
          <i class="mdi mdi-magnify" />
        </template>
      </a-input>
    </div>

    <!-- Table -->
    <a-table
      :columns="columns"
      :data-source="paginatedModules"
      :loading="isLoading"
      :pagination="false"
      row-key="id"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'coefficient'"> {{ record.coefficient }}.00 </template>
        <template v-else-if="column.key === 'volume_horaire'">
          {{ record.volume_horaire }}h
        </template>
        <template v-else-if="column.key === 'actions'">
          <ItemActions :item="record" moduleRoute="/modules" />
        </template>
      </template>
    </a-table>

    <!-- Pagination -->
    <div class="d-flex justify-content-between align-items-center mt-4">
      <div class="text-muted">
        Affichage de {{ paginatedModules.length }} sur {{ filteredModules.length }} modules
      </div>
      <a-pagination
        size="small"
        v-model:current="currentPage"
        :total="filteredModules.length"
        :pageSize="itemsPerPage"
      />
    </div>
  </a-card>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useModuleStore } from '@/stores/academiqueStore/moduleStore';
import ItemActions from '../details/ItemDetails.vue';

const moduleStore = useModuleStore();

// Data & UI states
const modules = computed(() => moduleStore.modules);
const isLoading = computed(() => moduleStore.loading);
const searchQuery = ref('');
const currentPage = ref(1);
const itemsPerPage = 5;

// Fetch modules on mount
const fetchModules = async () => {
  await moduleStore.fetchModules();
};
onMounted(fetchModules);
const refreshModules = () => fetchModules();

// Columns definition
const columns = [
  { title: 'Code', dataIndex: 'code', key: 'code' },
  { title: 'Désignation', dataIndex: 'designation', key: 'designation' },
  { title: 'Crédit', dataIndex: 'credit', key: 'credit' },
  { title: 'Coefficient', dataIndex: 'coefficient', key: 'coefficient' },
  { title: 'Volume Horaire', dataIndex: 'volume_horaire', key: 'volume_horaire' },
  { title: 'Actions', key: 'actions' },
];

// Recherche
const filteredModules = computed(() => {
  if (!searchQuery.value) return modules.value;
  const q = searchQuery.value.toLowerCase();
  return modules.value.filter(
    (mod) => mod.designation.toLowerCase().includes(q) || mod.code.toLowerCase().includes(q)
  );
});

// Pagination logic
const paginatedModules = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredModules.value.slice(start, start + itemsPerPage);
});

// Reset page on search change
watch(searchQuery, () => {
  currentPage.value = 1;
});

function exportPDF() {
  console.log('Exporter en PDF');
  // TODO: implémenter avec jsPDF ou pdfmake
}

function exportExcel() {
  console.log('Exporter en Excel');
  // TODO: implémenter avec SheetJS (xlsx)
}

function exportCSV() {
  console.log('Exporter en CSV');
  // TODO: convertir et télécharger en format CSV
}

function print() {
  console.log('Imprimer');
  // TODO: ouvrir une fenêtre avec table HTML formatée et lancer window.print()
}
</script>

<style scoped>
.d-flex {
  display: flex;
}
.justify-between {
  justify-content: space-between;
}
.align-items-center {
  align-items: center;
}
.mt-4 {
  margin-top: 1rem;
}
.mb-4 {
  margin-bottom: 1rem;
}
</style>
