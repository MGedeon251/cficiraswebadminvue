<template>
    <div class="row">
      <div class="col-md-12 grid-margin">
        <div class="d-flex justify-content-between align-items-center flex-wrap">
          <!-- Gauche : titre + sous-titre -->
          <div>
            <h2>Bienvenue !</h2>
            <p>Espace d'administration de la scolarité CFI-CIRAS</p>
          </div>
  
          <!-- Droite : bouton -->
          <div>
            <button class="btn btn-primary mt-2 mt-xl-0">Générer un rapport</button>
          </div>
        </div>
  
        <!-- Fil d'ariane centré en dessous -->
        <div class="d-flex justify-content-center align-items-center mt-2">
          <i class="mdi mdi-home text-muted hover-cursor"></i>
          <p class="text-muted mb-0 mx-1 hover-cursor">/</p>
          <p class="text-muted mb-0 hover-cursor">Tableau de Bord</p>
          <p class="text-muted mb-0 mx-1 hover-cursor">/</p>
          <p class="text-primary mb-0 hover-cursor">Accueil</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  // Pas de script spécifique ici
  </script>
  