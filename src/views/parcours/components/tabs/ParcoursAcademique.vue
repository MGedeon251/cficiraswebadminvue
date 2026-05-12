<template>
  <div class="row">
    <!-- Section Gauche : Chronologie du Parcours -->
    <div class="col-md-4">
      <div class="card border-0 shadow-sm mb-4">
        <div class="card-header bg-white py-3">
          <h6 class="m-0 fw-bold"><i class="bi bi-clock-history me-2"></i>Historique des Années</h6>
        </div>
        <div class="card-body">
          <div class="timeline">
            <div
              v-for="(annee, index) in historique"
              :key="index"
              class="timeline-item pb-3 border-start ps-3 position-relative"
              :class="{ 'border-primary': index === 0, 'border-light-subtle': index !== 0 }"
            >
              <div
                class="dot position-absolute start-0 translate-middle-x rounded-circle"
                :class="index === 0 ? 'bg-primary' : 'bg-secondary'"
                style="width: 12px; height: 12px; margin-left: -1px; margin-top: 6px"
              ></div>
              <div class="mb-1">
                <span
                  class="badge"
                  :class="index === 0 ? 'bg-primary-subtle text-primary' : 'bg-light text-muted'"
                >
                  {{ annee.periode }}
                </span>
              </div>
              <h6 class="fw-bold mb-0">{{ annee.classe }}</h6>
              <p class="text-muted small mb-0">
                {{ annee.resultat }} • Moyenne: {{ annee.moyenne }}/20
              </p>
              <button
                class="btn btn-link btn-sm p-0 text-decoration-none mt-1"
                @click="selectionnerAnnee(annee)"
              >
                Voir détails
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Section Droite : Détails des Notes de l'année sélectionnée -->
    <div class="col-md-8">
      <div class="card border-0 shadow-sm">
        <div class="card-header bg-white py-3 d-flex justify-content-between align-items-center">
          <div>
            <h6 class="m-0 fw-bold">Résultats détaillés : {{ anneeSelectionnee.classe }}</h6>
            <small class="text-muted">Année Académique {{ anneeSelectionnee.periode }}</small>
          </div>
          <div class="btn-group">
            <button class="btn btn-sm btn-outline-secondary">
              <i class="bi bi-printer me-1"></i> Bulletin
            </button>
            <button class="btn btn-sm btn-outline-secondary">
              <i class="bi bi-download me-1"></i> Relevé
            </button>
          </div>
        </div>
        <div class="card-body">
          <!-- Résumé des performances -->
          <div class="row g-3 mb-4">
            <div class="col-md-4">
              <div class="p-3 bg-light rounded text-center">
                <p class="small text-muted mb-1">Moyenne Générale</p>
                <h4 class="fw-bold mb-0 text-primary">{{ anneeSelectionnee.moyenne }}</h4>
              </div>
            </div>
            <div class="col-md-4">
              <div class="p-3 bg-light rounded text-center">
                <p class="small text-muted mb-1">Crédits Validés</p>
                <h4 class="fw-bold mb-0">54 / 60</h4>
              </div>
            </div>
            <div class="col-md-4">
              <div class="p-3 bg-light rounded text-center">
                <p class="small text-muted mb-1">Rang</p>
                <h4 class="fw-bold mb-0">5ème / 32</h4>
              </div>
            </div>
          </div>

          <!-- Tableau des matières -->
          <div class="table-responsive">
            <table class="table table-hover align-middle">
              <thead class="table-light">
                <tr>
                  <th>Matière</th>
                  <th class="text-center">Crédits</th>
                  <th class="text-center">Note CC</th>
                  <th class="text-center">Note Exam</th>
                  <th class="text-center">Moyenne</th>
                  <th class="text-center">Statut</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(matiere, idx) in anneeSelectionnee.matieres" :key="idx">
                  <td>
                    <span class="fw-medium d-block">{{ matiere.nom }}</span>
                    <small class="text-muted">{{ matiere.code }}</small>
                  </td>
                  <td class="text-center">{{ matiere.credits }}</td>
                  <td class="text-center text-muted">{{ matiere.cc }}</td>
                  <td class="text-center text-muted">{{ matiere.exam }}</td>
                  <td
                    class="text-center fw-bold"
                    :class="matiere.moyenne < 10 ? 'text-danger' : 'text-success'"
                  >
                    {{ matiere.moyenne }}
                  </td>
                  <td class="text-center">
                    <i
                      v-if="matiere.moyenne >= 10"
                      class="bi bi-check-circle-fill text-success"
                    ></i>
                    <i v-else class="bi bi-exclamation-triangle-fill text-danger"></i>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const historique = ref([
  {
    periode: '2025-2026',
    classe: 'Licence 3 - Génie Logiciel',
    moyenne: '14.50',
    resultat: 'En cours',
    matieres: [
      {
        nom: 'Architecture Microservices',
        code: 'CS-401',
        credits: 6,
        cc: 14,
        exam: 15,
        moyenne: 14.6,
      },
      {
        nom: 'Deep Learning & Vision',
        code: 'AI-402',
        credits: 6,
        cc: 16,
        exam: 12,
        moyenne: 13.6,
      },
      { nom: 'Base de données NoSQL', code: 'DB-403', credits: 4, cc: 18, exam: 17, moyenne: 17.4 },
      { nom: 'Anglais Technique', code: 'LAN-401', credits: 2, cc: 8, exam: 9, moyenne: 8.6 },
    ],
  },
  {
    periode: '2024-2025',
    classe: 'Licence 2 - Informatique',
    moyenne: '13.85',
    resultat: 'Admis',
    matieres: [
      { nom: 'Algorithmique Avancée', code: 'CS-301', credits: 6, cc: 12, exam: 14, moyenne: 13.2 },
      {
        nom: "Systèmes d'exploitation",
        code: 'OS-302',
        credits: 6,
        cc: 13,
        exam: 11,
        moyenne: 11.8,
      },
    ],
  },
  {
    periode: '2023-2024',
    classe: 'Licence 1 - Tronc Commun',
    moyenne: '12.20',
    resultat: 'Admis',
    matieres: [],
  },
]);

const anneeSelectionnee = ref(historique.value[0]);

const selectionnerAnnee = (annee) => {
  anneeSelectionnee.value = annee;
};
</script>

<style scoped>
.timeline-item {
  border-left-width: 2px !important;
}
.dot {
  z-index: 1;
}
.table thead th {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
</style>
