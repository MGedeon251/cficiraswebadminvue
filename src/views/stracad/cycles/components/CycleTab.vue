<template>
  <div>
    <ul class="nav nav-tabs px-4" role="tablist">
      <li class="nav-item">
        <a
          class="nav-link active"
          id="cycles-tab"
          data-bs-toggle="tab"
          href="#cycles"
          role="tab"
          aria-controls="cycles"
          aria-selected="true"
        >
          Cycles
        </a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          id="filieres-tab"
          data-bs-toggle="tab"
          href="#filieres"
          role="tab"
          aria-controls="filieres"
          aria-selected="false"
        >
          Filières
        </a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          id="organisation-tab"
          data-bs-toggle="tab"
          href="#organisation"
          role="tab"
          aria-controls="organisation"
          aria-selected="false"
        >
          Organisation
        </a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          id="statistiques-tab"
          data-bs-toggle="tab"
          href="#statistiques"
          role="tab"
          aria-controls="statistiques"
          aria-selected="false"
        >
          Statistiques
        </a>
      </li>
    </ul>

    <div class="tab-content p-4">
      <div
        class="tab-pane fade show active"
        id="cycles"
        role="tabpanel"
        aria-labelledby="cycles-tab"
      >
        <CyclesContent />
      </div>
      <div class="tab-pane fade" id="filieres" role="tabpanel" aria-labelledby="filieres-tab">
        <FilieresContent />
      </div>
      <div
        class="tab-pane fade"
        id="organisation"
        role="tabpanel"
        aria-labelledby="organisation-tab"
      >
        <OrganisationContent />
      </div>
      <div
        class="tab-pane fade"
        id="statistiques"
        role="tabpanel"
        aria-labelledby="statistiques-tab"
      >
        <StatistiquesCyclesContent />
      </div>
    </div>
  </div>
</template>

<script setup>
import CyclesContent from './Tab/CyclesContent.vue';
import FilieresContent from './Tab/FilieresContent.vue';
import OrganisationContent from './Tab/OrganisationContent.vue';
import StatistiquesCyclesContent from './Tab/StatistiquesCyclesContent.vue';
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
