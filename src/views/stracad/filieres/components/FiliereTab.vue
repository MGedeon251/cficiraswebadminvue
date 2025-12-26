<template>
  <div>
    <ul class="nav nav-tabs px-4" role="tablist">
      <li class="nav-item">
        <a
          class="nav-link active"
          id="filieres-tab"
          data-bs-toggle="tab"
          href="#filieres"
          role="tab"
          aria-controls="filieres"
          aria-selected="true"
        >
          Filières
        </a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          id="niveaux-tab"
          data-bs-toggle="tab"
          href="#niveaux"
          role="tab"
          aria-controls="niveaux"
          aria-selected="false"
        >
          Niveaux
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
      <!-- Onglet Filières -->
      <div
        class="tab-pane fade show active"
        id="filieres"
        role="tabpanel"
        aria-labelledby="filieres-tab"
      >
        <FilieresContent />
      </div>

      <!-- Onglet Niveaux -->
      <div
        class="tab-pane fade"
        id="niveaux"
        role="tabpanel"
        aria-labelledby="niveaux-tab"
      >
        <NiveauxContent />
      </div>

      <!-- Onglet Organisation -->
      <div
        class="tab-pane fade"
        id="organisation"
        role="tabpanel"
        aria-labelledby="organisation-tab"
      >
        <OrganisationContent />
      </div>

      <!-- Onglet Statistiques -->
      <div
        class="tab-pane fade"
        id="statistiques"
        role="tabpanel"
        aria-labelledby="statistiques-tab"
      >
        <StatistiquesFilieresContent />
      </div>
    </div>
  </div>
</template>

<script setup>
import FilieresContent from './Tab/FilieresContent.vue';
import NiveauxContent from './Tab/NiveauxContent.vue';
import OrganisationContent from './Tab/OrganisationContent.vue';
import StatistiquesFilieresContent from './Tab/StatistiquesFilieresContent.vue';
</script>
