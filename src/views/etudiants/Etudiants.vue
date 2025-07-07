<template>
  <EtudiantHeader></EtudiantHeader>
  <div class="row">
    <div class="col-md-12 grid-margin stretch-card">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title">Informations & Details</h4>
          <!-- ici le composant des tables -->
          <TableData ref="tableDataRef"></TableData>
        </div>
      </div>
    </div>
  </div>

  <div class="row">
    <div class="col-md-12 grid-margin stretch-card">
      <!-- ici une nav tabs -->
      <TabContent></TabContent>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import TableData from './components/table/TableDataView.vue';
import TabContent from './components/nav-tab/TabView.vue';
import EtudiantHeader from './components/EtudiantHeader.vue';
const tableDataRef = ref(null);
</script>
