<template>
  <div>
    <ul class="nav nav-tabs px-4" role="tablist">
      <li class="nav-item">
        <a
          class="nav-link active"
          id="concours-tab"
          data-bs-toggle="tab"
          href="#concours"
          role="tab"
          aria-controls="concours"
          aria-selected="true"
          >Concours</a
        >
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          id="devoirf-tab"
          data-bs-toggle="tab"
          href="#devoirf"
          role="tab"
          aria-controls="devoirf"
          aria-selected="false"
          >Candidats</a
        >
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          id="sales-tab"
          data-bs-toggle="tab"
          href="#sales"
          role="tab"
          aria-controls="sales"
          aria-selected="false"
          >Etudiants</a
        >
      </li>
        <li class="nav-item">
            <a
            class="nav-link"
            id="purchases-tab"
            data-bs-toggle="tab"
            href="#purchases"
            role="tab"
            aria-controls="purchases"
            aria-selected="false"
            >Exportations</a
            >
        </li>
    </ul>
    <div class="tab-content p-4">
      <div
        class="tab-pane fade show active"
        id="concours"
        role="tabpanel"
        aria-labelledby="concours-tab"
      >
        <concours />
      </div>
      <div class="tab-pane fade" id="devoirf" role="tabpanel" aria-labelledby="devoirf-tab">
        <candidats/>
      </div>
      <div class="tab-pane fade" id="sales" role="tabpanel" aria-labelledby="sales-tab">
        <annee/>
      </div>
      <div class="tab-pane fade" id="purchases" role="tabpanel" aria-labelledby="purchases-tab">
        <StatsRapport />
      </div>
    </div>
  </div>
</template>

<script setup>
import concours from './concours.vue';
import candidats from './candidats.vue';
import annee from './Etudiants.vue';
import StatsRapport from './StatsRapport.vue';


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
