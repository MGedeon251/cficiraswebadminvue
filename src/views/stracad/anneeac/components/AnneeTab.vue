<template>
  <div>
    <ul class="nav nav-tabs px-4" role="tablist">
      <li class="nav-item">
        <a
          class="nav-link active"
          id="liste-tab"
          data-bs-toggle="tab"
          href="#liste"
          role="tab"
          aria-controls="liste"
          aria-selected="true"
          >Liste des années</a
        >
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          id="calendrier-tab"
          data-bs-toggle="tab"
          href="#calendrier"
          role="tab"
          aria-controls="calendrier"
          aria-selected="false"
          >Calendrier académique</a
        >
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
      <li class="nav-item">
        <a
          class="nav-link"
          id="historique-tab"
          data-bs-toggle="tab"
          href="#historique"
          role="tab"
          aria-controls="historique"
          aria-selected="false"
        >
          Historique
        </a>
      </li>
    </ul>
    <div class="tab-content p-4">
      <div class="tab-pane fade show active" id="liste" role="tabpanel" aria-labelledby="liste-tab">
        <ListeAnneesContent />
      </div>
      <div class="tab-pane fade" id="calendrier" role="tabpanel" aria-labelledby="calendrier-tab">
        <CalendrierContent />
      </div>
      <div
        class="tab-pane fade"
        id="statistiques"
        role="tabpanel"
        aria-labelledby="statistiques-tab"
      >
        <StatistiquesContent />
      </div>
      <div class="tab-pane fade" id="historique" role="tabpanel" aria-labelledby="historique-tab">
        <HistoriqueContent />
      </div>
    </div>
  </div>
</template>

<script setup>
import ListeAnneesContent from './Tab/ListeAnneesContent.vue';
import CalendrierContent from './Tab/CalendrierContent.vue';
import StatistiquesContent from './Tab/StatistiquesContent.vue';
import HistoriqueContent from './Tab/HistoriqueContent.vue';
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
