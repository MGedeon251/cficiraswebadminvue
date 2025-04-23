<template>

    <div class="row">
        <div class="col-md-12 grid-margin">
            <div class="d-flex justify-content-between flex-wrap">
                <div class="d-flex align-items-end flex-wrap">
                    <div class="me-md-3 me-xl-5">
                        <h2>Gestion des etudiants
                        </h2>
                        <p class="mb-md-0">Gestion des etudiants</p>
                    </div>
                    <div class="d-flex">
                        <i class="mdi mdi-home text-muted hover-cursor"></i>
                        <p class="text-muted mb-0 hover-cursor">&nbsp;/&nbsp;Portail&nbsp;/&nbsp;</p>
                        <p class="text-primary mb-0 hover-cursor">Etudiants</p>
                    </div>
                </div>
                <div class="d-flex justify-content-between align-items-end flex-wrap"></div>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-md-12 grid-margin stretch-card">
            <div class="card">
                <div class="card-body">
                    <h4 class="card-title">Informations & Details
                    </h4>
                    <TableData></TableData>
                </div>
            </div>
        </div>
    </div>

    <div class="row">
      <div class="col-md-12 grid-margin stretch-card">
        <TabContent></TabContent>
      </div>
    </div>

</template>

<script setup>
import { ref, onMounted } from 'vue';
import TableData from './TableData.vue' ; 
import TabContent from './TabContent.vue' ;
</script>

<style scoped>
.drag-drop-area {
  background: #f8f9fa;
  border: 2px dashed #007bff;
  cursor: pointer;
}
.drag-drop-area.drag-over {
  background: #e9ecef;
}
</style>

<style scoped > body {
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