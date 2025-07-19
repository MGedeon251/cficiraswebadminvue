<template>
  <div>
    <ul class="nav nav-tabs px-4" role="tablist">
      <li class="nav-item">
        <a
          class="nav-link active"
          id="details-tab"
          data-bs-toggle="tab"
          href="#details"
          role="tab"
          aria-controls="details"
          aria-selected="true"
          >Details</a
        >
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          id="epreuve-tab"
          data-bs-toggle="tab"
          href="#epreuve"
          role="tab"
          aria-controls="epreuve"
          aria-selected="false"
          >Epreuves</a
        >
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          id="candidat-tab"
          data-bs-toggle="tab"
          href="#candidat"
          role="tab"
          aria-controls="candidat"
          aria-selected="false"
          >Candidats</a
        >
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          id="resultat-tab"
          data-bs-toggle="tab"
          href="#resultat"
          role="tab"
          aria-controls="resultat"
          aria-selected="false"
          >Resultats</a
        >
      </li>
    </ul>
    <div class="tab-content p-4">
      <div
        class="tab-pane fade show active"
        id="details"
        role="tabpanel"
        aria-labelledby="details-tab"
      >
        <DetailsConcours />
      </div>
      <div class="tab-pane fade" id="epreuve" role="tabpanel" aria-labelledby="epreuve-tab">
        <Epreuve />
      </div>
      <div class="tab-pane fade" id="candidat" role="tabpanel" aria-labelledby="candidat-tab">
        <Candidats />
      </div>
      <div class="tab-pane fade" id="resultat" role="tabpanel" aria-labelledby="resultat-tab">
        <Resultat />
      </div>
    </div>
  </div>
</template>

<script setup>
import DetailsConcours from './detail-content.vue';
import Epreuve from './epreuve-content.vue';
import annee from './resultat1-content.vue';
import Resultat from './resultat-content.vue';
import Candidats from './candidat-content.vue';
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
