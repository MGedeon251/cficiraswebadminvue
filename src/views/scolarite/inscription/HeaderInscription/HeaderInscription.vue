<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light mb-4">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Gestion Scolarité - Inscriptions</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <router-link to="/scolarite/inscription" class="nav-link" exact>Accueil</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/scolarite/inscription/liste" class="nav-link">Liste Inscriptions</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/scolarite/inscription/import" class="nav-link">Importer étudiants</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </template>
  
  <script setup>
  // Pas de logique ici, c'est un header simple
  </script>
  
  <style scoped>
  .navbar {
    border-radius: 8px;
  }
  </style>
  