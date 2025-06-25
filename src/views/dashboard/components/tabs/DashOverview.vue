<template>
  <div class="d-flex flex-wrap justify-content-xl-between">
    <div
      class="d-flex border-md-right flex-grow-1 align-items-center justify-content-center p-3 item"
    >
      <i class="mdi mdi-account-settings icon-lg me-3 text-primary"></i>
      <div class="d-flex flex-column justify-content-around">
        <small class="mb-1 text-muted">Etudiants</small>
        <div class="dropdown">
          <a
            class="btn btn-secondary dropdown-toggle p-0 bg-transparent border-0 text-dark shadow-none font-weight-medium"
            href="#"
            role="button"
            id="dropdownMenuLinkA"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <h5 class="mb-0 d-inline-block">Chiffre total : 10</h5>
          </a>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuLinkA">
            <a class="dropdown-item" href="#">LIC INFO : 400</a>
            <a class="dropdown-item" href="#">LAP : 400</a>
            <a class="dropdown-item" href="#">DUT AM : 20</a>
          </div>
        </div>
      </div>
    </div>
    <!-- Ajouter ici les autres cartes de statistiques avec le même modèle -->
  </div>
</template>

<script setup>
// Pas de logique spécifique, ce composant est pour afficher des statistiques.
</script>
