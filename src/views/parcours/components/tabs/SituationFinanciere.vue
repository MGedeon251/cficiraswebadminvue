<template>
  <div class="row">
    <!-- Section Haut : Résumé des soldes -->
    <div class="col-12 mb-4">
      <div class="row g-3">
        <div class="col-md-4">
          <div class="card border-0 shadow-sm bg-primary text-white">
            <div class="card-body">
              <h6 class="text-white-50 small text-uppercase">Total Scolarité</h6>
              <h3 class="fw-bold mb-0">1 200 000 FCFA</h3>
              <small>Année académique 2025-2026</small>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card border-0 shadow-sm bg-success text-white">
            <div class="card-body">
              <h6 class="text-white-50 small text-uppercase">Montant Payé</h6>
              <h3 class="fw-bold mb-0">850 000 FCFA</h3>
              <div class="progress mt-2" style="height: 5px; background: rgba(255, 255, 255, 0.2)">
                <div class="progress-bar bg-white" role="progressbar" style="width: 70%"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card border-0 shadow-sm bg-danger text-white">
            <div class="card-body">
              <h6 class="text-white-50 small text-uppercase">Reste à Payer</h6>
              <h3 class="fw-bold mb-0">350 000 FCFA</h3>
              <small>Prochaine échéance : 05 Mai 2026</small>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Section Gauche : Historique des paiements (Recettes) -->
    <div class="col-md-7">
      <div class="card border-0 shadow-sm h-100">
        <div class="card-header bg-white py-3 d-flex justify-content-between align-items-center">
          <h6 class="m-0 fw-bold"><i class="bi bi-receipt me-2"></i>Historique des Versements</h6>
          <button class="btn btn-sm btn-primary">
            <i class="bi bi-plus-circle me-1"></i> Nouveau Reçu
          </button>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-hover align-middle">
              <thead class="table-light">
                <tr>
                  <th>N° Reçu</th>
                  <th>Date</th>
                  <th>Désignation</th>
                  <th class="text-end">Montant</th>
                  <th class="text-center">Mode</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(paiement, index) in paiements" :key="index">
                  <td class="fw-bold text-primary">{{ paiement.numero }}</td>
                  <td>{{ paiement.date }}</td>
                  <td>
                    <small>{{ paiement.libelle }}</small>
                  </td>
                  <td class="text-end fw-bold">{{ paiement.montant.toLocaleString() }}</td>
                  <td class="text-center">
                    <span class="badge bg-light text-dark border">{{ paiement.methode }}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Section Droite : Échéancier (Planning) -->
    <div class="col-md-5">
      <div class="card border-0 shadow-sm h-100">
        <div class="card-header bg-white py-3">
          <h6 class="m-0 fw-bold">
            <i class="bi bi-calendar-check me-2"></i>Échéancier de Paiement
          </h6>
        </div>
        <div class="card-body">
          <div class="list-group list-group-flush">
            <div
              v-for="(echeance, index) in echeancier"
              :key="index"
              class="list-group-item px-0 py-3"
            >
              <div class="d-flex justify-content-between align-items-center">
                <div>
                  <h6 class="mb-0 fw-bold">{{ echeance.mois }}</h6>
                  <small class="text-muted">Limite : {{ echeance.dateLimite }}</small>
                </div>
                <div class="text-end">
                  <span
                    v-if="echeance.statut === 'Payé'"
                    class="badge rounded-pill bg-success-subtle text-success"
                    >Payé</span
                  >
                  <span
                    v-else-if="echeance.statut === 'Partiel'"
                    class="badge rounded-pill bg-warning-subtle text-warning"
                    >Partiel</span
                  >
                  <span v-else class="badge rounded-pill bg-danger-subtle text-danger"
                    >En attente</span
                  >
                  <div class="fw-bold mt-1 small">{{ echeance.montant.toLocaleString() }} FCFA</div>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-3 p-3 bg-light rounded">
            <p class="small text-muted mb-0 italic">
              <i class="bi bi-info-circle me-1"></i> Les frais d'inscription et de bibliothèque sont
              inclus dans le premier versement.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const paiements = ref([
  {
    numero: 'REC-7842',
    date: '05/01/2026',
    libelle: 'Scolarité - Tranche 2',
    montant: 300000,
    methode: 'Virement',
  },
  {
    numero: 'REC-6521',
    date: '12/10/2025',
    libelle: 'Scolarité - Tranche 1',
    montant: 400000,
    methode: 'Espèces',
  },
  {
    numero: 'REC-6100',
    date: '05/09/2025',
    libelle: "Frais d'inscription",
    montant: 150000,
    methode: 'Mobile Money',
  },
]);

const echeancier = ref([
  { mois: 'Septembre', dateLimite: '05/09/2025', montant: 150000, statut: 'Payé' },
  { mois: 'Trimestre 1', dateLimite: '05/10/2025', montant: 400000, statut: 'Payé' },
  { mois: 'Trimestre 2', dateLimite: '05/01/2026', montant: 300000, statut: 'Payé' },
  { mois: 'Trimestre 3', dateLimite: '05/04/2026', montant: 350000, statut: 'En attente' },
]);
</script>

<style scoped>
.progress {
  border-radius: 10px;
}
.list-group-item {
  border-bottom: 1px dashed #dee2e6 !important;
}
.list-group-item:last-child {
  border-bottom: none !important;
}
</style>
