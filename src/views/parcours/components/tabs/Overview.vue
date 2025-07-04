<template>
  <div class="flex flex-wrap justify-between mb-4">
    <a-input
        class="me-1 mt-1 mt-xl-0"
        v-model:value="searchQuery"
        placeholder="Rechercher..."
        allow-clear
        style="width: 250px"
       >
        <template #prefix>
          <i class="mdi mdi-magnify" />
        </template>
      </a-input>
      <a-select
        class="me-1 mt-1 mt-xl-0"
        v-model:value="selectedAnnee"
        placeholder="Année académique"
        style="width: 180px"
        :loading="loadingAnnees"
        allow-clear
      >
        <a-select-option value="lucy">lucy</a-select-option>
      </a-select>
      <a-select
        v-model:value="selectedFiliere"
        placeholder="Filiere"
        style="width: 180px"
        :loading="loadingFilieres"
        allow-clear
      >
        <a-select-option value="lucy">lucy</a-select-option>
      </a-select>
    </div>
  <div class="table-responsive">
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
  </div>
</template>

<script setup>
defineProps(['rows']);

const columns = [
  { title: '#', key: 'index' },
  { title: 'Matricule', dataIndex: 'nom', key: 'nom' },
  { title: 'Nom', dataIndex: 'prenom', key: 'prenom' },
  { title: 'Prenom', dataIndex: 'email', key: 'email' },
  { title: 'Année', dataIndex: 'tel1', key: 'tel1' },
  { title: '', key: 'actions' },
];

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
