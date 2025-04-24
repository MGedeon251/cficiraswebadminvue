<template>
  <div class="card-body dashboard-tabs p-0">
    <ul class="nav nav-tabs px-4" role="tablist">
      <li class="nav-item">
        <a
          class="nav-link active"
          id="overview-tab"
          data-bs-toggle="tab"
          href="#overview"
          role="tab"
          aria-controls="overview"
          aria-selected="true"
          >Vue d'ensembles</a
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
          >Cours</a
        >
      </li>
    </ul>
    <div class="tab-content py-0 px-0">
      <slot></slot>
      <!-- Insertion dynamique du contenu des onglets -->
    </div>
  </div>
</template>

<script setup>
// Pas de logique spécifique, juste la gestion de la structure des onglets
</script>
