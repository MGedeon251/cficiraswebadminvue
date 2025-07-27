<template>
    <div>
      <HeaderInscription />
      <div class="container py-4">
        <h1>Bienvenue dans le module d'inscription</h1>
        <p>Utilisez le menu pour gérer les inscriptions des étudiants, importer des listes, ou consulter les dossiers.</p>
  
        <div class="d-flex gap-3 mt-4">
          <router-link to="/scolarite/inscription/liste" class="btn btn-primary">
            Voir la liste des inscriptions
          </router-link>
          <router-link to="/scolarite/inscription/import" class="btn btn-secondary">
            Importer des étudiants
          </router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import HeaderInscription from './HeaderInscription/HeaderInscription.vue';
  </script>
  