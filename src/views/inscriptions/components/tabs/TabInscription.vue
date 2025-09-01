<template>
  <div>
    <!-- Onglets navigation -->
    <ul class="nav nav-tabs px-4" role="tablist">
      <li class="nav-item">
        <a
          class="nav-link active"
          id="inscriptions-tab"
          data-bs-toggle="tab"
          href="#inscriptions"
          role="tab"
          aria-controls="inscriptions"
          aria-selected="true"
        >
          Inscriptions
        </a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          id="paiements-tab"
          data-bs-toggle="tab"
          href="#paiements"
          role="tab"
          aria-controls="paiements"
          aria-selected="false"
        >
          Paiements
        </a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          id="recherche-tab"
          data-bs-toggle="tab"
          href="#recherche"
          role="tab"
          aria-controls="recherche"
          aria-selected="false"
        >
          Reinscriptions
        </a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          id="gestion-tab"
          data-bs-toggle="tab"
          href="#gestion"
          role="tab"
          aria-controls="gestion"
          aria-selected="false"
        >
          Classes & Niveaux
        </a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          id="stats-tab"
          data-bs-toggle="tab"
          href="#stats"
          role="tab"
          aria-controls="stats"
          aria-selected="false"
        >
          Rapports & Stats
        </a>
      </li>
    </ul>

    <!-- Contenu des onglets -->
    <div class="tab-content p-4">
      <div
        class="tab-pane fade show active"
        id="inscriptions"
        role="tabpanel"
        aria-labelledby="inscriptions-tab"
      >
        <inscription-form />
      </div>
      <div class="tab-pane fade" id="paiements" role="tabpanel" aria-labelledby="paiements-tab">
        <paiement-list />
      </div>
      <div class="tab-pane fade" id="recherche" role="tabpanel" aria-labelledby="recherche-tab">
        <recherche-inscriptions />
      </div>
      <div class="tab-pane fade" id="gestion" role="tabpanel" aria-labelledby="gestion-tab">
        <gestion-inscriptions />
      </div>
      <div class="tab-pane fade" id="stats" role="tabpanel" aria-labelledby="stats-tab">
        <stats-rapports />
      </div>
    </div>
  </div>
</template>

<script setup>
import InscriptionForm from './InscriptionForm.vue'; // Cas d’utilisation 1
import PaiementList from './PaiementList.vue'; // Cas d’utilisation 2
import RechercheInscriptions from './Recherche.vue'; // Cas d’utilisation 3
import GestionInscriptions from './GestionInscriptions.vue'; // Cas d’utilisation 4
import StatsRapports from './StatsRapports.vue'; // Cas d’utilisation 5
</script>
