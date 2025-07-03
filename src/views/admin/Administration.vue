<template>
  <div class="admin-font">
    <div class="row">
      <div class="col-md-12 grid-margin">
        <div class="d-flex justify-content-between flex-wrap">
          <div class="d-flex align-items-end flex-wrap">
            <div class="me-md-3 me-xl-5">
              <h2>Administration SSE</h2>
              <p class="mb-md-0">Gestion des formateurs et enseignant</p>
            </div>
            <div class="d-flex">
              <i class="mdi mdi-home text-muted hover-cursor"></i>
              <p class="text-muted mb-0 hover-cursor">&nbsp;/&nbsp;Formateur&nbsp;/&nbsp;</p>
              <p class="text-primary mb-0 hover-cursor">Analytics</p>
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
            <div class="card-body">
              <a-tabs v-model:activeKey="activeKey">
                <a-tab-pane key="1" tab="Vue d'ensemble"> Contenu du premier onglet </a-tab-pane>
                <a-tab-pane key="2" tab="Étudiants"> Contenu du deuxième onglet </a-tab-pane>
                <a-tab-pane key="3" tab="Statistiques"> Contenu du troisième onglet </a-tab-pane>
              </a-tabs>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Liste des Formateurs</h4>
            <p class="card-description">Liste de formateurs actifs</p>
            <ATable />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import ATable from './ATable.vue';

import { ref } from 'vue';

const activeKey = ref('1');
</script>
<style scoped>
.admin-font {
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans',
    sans-serif;
}
</style>
