<template>
  <div>
    <!-- Navigation des onglets -->
    <ul class="nav nav-tabs px-4" role="tablist">
      <li class="nav-item">
        <a
          class="nav-link active"
          id="profil-tab"
          data-bs-toggle="tab"
          href="#profil"
          role="tab"
          aria-controls="profil"
          aria-selected="true"
        >
          Profil & Informations
        </a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          id="parcours-tab"
          data-bs-toggle="tab"
          href="#parcours"
          role="tab"
          aria-controls="parcours"
          aria-selected="false"
        >
          Parcours & Notes
        </a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          id="assiduite-tab"
          data-bs-toggle="tab"
          href="#assiduite"
          role="tab"
          aria-controls="assiduite"
          aria-selected="false"
        >
          Assiduité & Discipline
        </a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          id="finance-tab"
          data-bs-toggle="tab"
          href="#finance"
          role="tab"
          aria-controls="finance"
          aria-selected="false"
        >
          Situation Financière
        </a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          id="documents-tab"
          data-bs-toggle="tab"
          href="#documents"
          role="tab"
          aria-controls="documents"
          aria-selected="false"
        >
          Documents & Archives
        </a>
      </li>
    </ul>

    <!-- Contenu des onglets -->
    <div class="tab-content p-4">
      <!-- 1. Profil : Infos personnelles, contacts d'urgence, statut d'inscription actuel -->
      <div
        class="tab-pane fade show active"
        id="profil"
        role="tabpanel"
        aria-labelledby="profil-tab"
      >
        <ProfilEtudiant />
      </div>

      <!-- 2. Parcours : Historique des classes, bulletins, relevés de notes, progression -->
      <div class="tab-pane fade" id="parcours" role="tabpanel" aria-labelledby="parcours-tab">
        <ParcoursAcademique />
      </div>

      <!-- 3. Assiduité : Absences, retards, sanctions disciplinaires -->
      <div class="tab-pane fade" id="assiduite" role="tabpanel" aria-labelledby="assiduite-tab">
        <AssiduiteDiscipline />
      </div>

      <!-- 4. Finance : Suivi des paiements, mensualités, arriérés -->
      <div class="tab-pane fade" id="finance" role="tabpanel" aria-labelledby="finance-tab">
        <SituationFinanciere />
      </div>

      <!-- 5. Documents : Pièces d'identité, certificats médicaux, fiches d'engagement -->
      <div class="tab-pane fade" id="documents" role="tabpanel" aria-labelledby="documents-tab">
        <DocumentsArchives />
      </div>
    </div>
  </div>
</template>

<script setup>
// Importation des sous-composants dédiés à chaque onglet
import ProfilEtudiant from './ProfilEtudiant.vue';
import ParcoursAcademique from './ParcoursAcademique.vue';
import AssiduiteDiscipline from './AssiduiteDiscipline.vue';
import SituationFinanciere from './SituationFinanciere.vue';
import DocumentsArchives from './DocumentsArchives.vue';
</script>
