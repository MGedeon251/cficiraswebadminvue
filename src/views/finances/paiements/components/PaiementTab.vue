<template>
  <div>
    <ul class="nav nav-tabs px-4" role="tablist">
      <li class="nav-item">
        <a
          class="nav-link active"
          id="paiement-tab"
          data-bs-toggle="tab"
          href="#paiement"
          role="tab"
          aria-controls="paiement"
          aria-selected="true"
        >
          Paiements
        </a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          id="nouveau-tab"
          data-bs-toggle="tab"
          href="#nouveau"
          role="tab"
          aria-controls="nouveau"
          aria-selected="false"
        >
          Nouveau Paiement
        </a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          id="archives-tab"
          data-bs-toggle="tab"
          href="#archives"
          role="tab"
          aria-controls="archives"
          aria-selected="false"
        >
          Archives
        </a>
      </li>
    </ul>

    <div class="tab-content p-4">
      <!-- Liste des paiements -->
      <div
        class="tab-pane fade show active"
        id="paiement"
        role="tabpanel"
        aria-labelledby="paiement-tab"
      >
        <PaiementList />
      </div>

      <!-- Formulaire d'ajout -->
      <div class="tab-pane fade" id="nouveau" role="tabpanel" aria-labelledby="nouveau-tab">
        <PaiementForm />
      </div>

      <!-- Historique / Archives -->
      <div class="tab-pane fade" id="archives" role="tabpanel" aria-labelledby="archives-tab">
        <PaiementArchives />
      </div>
    </div>
  </div>
</template>

<script setup>
import PaiementList from './Tab/PaiementList.vue';
import PaiementForm from './Tab/PaiementForm.vue';
import PaiementArchives from './Tab/PaiementArchives.vue';
</script>

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
