<template>
  <div>
    <ul class="nav nav-tabs px-4" role="tablist">
      <!-- Onglet Liste -->
      <li class="nav-item">
        <a
          class="nav-link active"
          id="liste-tab"
          data-bs-toggle="tab"
          href="#liste"
          role="tab"
          aria-controls="liste"
          aria-selected="true"
        >
          Liste des étudiants
        </a>
      </li>

      <!-- Onglet Inscriptions -->
      <li class="nav-item">
        <a
          class="nav-link"
          id="inscriptions-tab"
          data-bs-toggle="tab"
          href="#inscriptions"
          role="tab"
          aria-controls="inscriptions"
          aria-selected="false"
        >
          Classes
        </a>
      </li>

      <!-- Onglet Organisation -->
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

      <!-- Onglet Statistiques -->
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

      <!-- Onglet Export -->
      <li class="nav-item">
        <a
          class="nav-link"
          id="export-tab"
          data-bs-toggle="tab"
          href="#export"
          role="tab"
          aria-controls="export"
          aria-selected="false"
        >
          Exportations
        </a>
      </li>
    </ul>

    <div class="tab-content p-4">
      <!-- Liste des étudiants -->
      <div class="tab-pane fade show active" id="liste" role="tabpanel" aria-labelledby="liste-tab">
        <EtudiantsListContent />
      </div>

      <!-- Inscriptions -->
      <div
        class="tab-pane fade"
        id="inscriptions"
        role="tabpanel"
        aria-labelledby="inscriptions-tab"
      >
        <EtudiantsClassesContent />
      </div>

      <!-- Organisation -->
      <div
        class="tab-pane fade"
        id="organisation"
        role="tabpanel"
        aria-labelledby="organisation-tab"
      >
        <OrganisationEtudiantsContent />
      </div>

      <!-- Statistiques -->
      <div
        class="tab-pane fade"
        id="statistiques"
        role="tabpanel"
        aria-labelledby="statistiques-tab"
      >
        <StatistiquesEtudiantsContent />
      </div>

      <!-- Import -->
      <div class="tab-pane fade" id="import" role="tabpanel" aria-labelledby="import-tab">
        <ImportEtudiantsContent />
      </div>

      <!-- Export -->
      <div class="tab-pane fade" id="export" role="tabpanel" aria-labelledby="export-tab">
        <ExportEtudiantsContent />
      </div>
    </div>
  </div>
</template>

<script setup>
import EtudiantsListContent from './Tab/EtudiantsListContent.vue';
import EtudiantsClassesContent from './Tab/EtudiantsClassesContent.vue';
import OrganisationEtudiantsContent from './Tab/OrganisationEtudiantsContent.vue';
import StatistiquesEtudiantsContent from './Tab/StatistiquesEtudiantsContent.vue';
import ImportEtudiantsContent from './Tab/ImportEtudiantsContent.vue';
import ExportEtudiantsContent from './Tab/ExportEtudiantsContent.vue';
</script>
