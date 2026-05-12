<template>
  <div class="facturation-container">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h4 class="fw-bold">Gestion de la Facturation</h4>
        <p class="text-muted small">
          Suivi des soldes, émission de factures et rappels de paiement.
        </p>
      </div>
      <div class="d-flex gap-2">
        <button class="btn btn-outline-primary btn-sm" @click="triggerAutoGeneration">
          <i class="mdi mdi-autorenew me-1"></i> Génération Automatique
        </button>
        <button class="btn btn-secondary btn-sm" @click="openNewFactureModal">
          + Nouvelle Facture
        </button>
      </div>
    </div>

    <div class="row mb-4">
      <div class="col-md-3">
        <div class="card bg-light border-0">
          <div class="card-body p-3">
            <p class="text-muted small mb-1">Total Facturé</p>
            <h5 class="fw-bold mb-0">12.450.000 F</h5>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card bg-soft-warning border-0">
          <div class="card-body p-3">
            <p class="text-warning small mb-1">En attente (Impayés)</p>
            <h5 class="fw-bold mb-0 text-warning">3.200.000 F</h5>
          </div>
        </div>
      </div>
    </div>

    <div class="card mb-4 border-0 shadow-sm">
      <div class="card-body bg-light rounded p-3">
        <div class="row g-2">
          <div class="col-md-6">
            <input
              v-model="searchQuery"
              type="text"
              class="form-control"
              placeholder="Rechercher un étudiant ou N° facture..."
            />
          </div>
          <div class="col-md-3">
            <select v-model="statusFilter" class="form-select">
              <option value="tous">Tous les statuts</option>
              <option value="payé">Payées</option>
              <option value="partiel">Partielles</option>
              <option value="impayé">Impayées</option>
            </select>
          </div>
          <div class="col-md-3 text-end">
            <button class="btn btn-dark w-100" @click="sendBulkReminders">
              <i class="mdi mdi-email-alert me-1"></i> Rappels groupés
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="card shadow-sm border-0">
      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table table-hover mb-0">
            <thead class="bg-white text-uppercase small fw-bold">
              <tr>
                <th class="ps-4">N° Facture</th>
                <th>Étudiant</th>
                <th>Total Dû</th>
                <th>Déjà Payé</th>
                <th>Solde Restant</th>
                <th>Statut</th>
                <th class="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="facture in filteredFactures" :key="facture.id" class="align-middle">
                <td class="ps-4 fw-bold text-primary">#{{ facture.numero }}</td>
                <td>
                  <div class="fw-bold">{{ facture.etudiant }}</div>
                  <div class="text-muted extra-small">{{ facture.matricule }}</div>
                </td>
                <td>{{ formatPrice(facture.totalDu) }}</td>
                <td class="text-success">{{ formatPrice(facture.dejaPaye) }}</td>
                <td :class="facture.solde > 0 ? 'text-danger fw-bold' : 'text-muted'">
                  {{ formatPrice(facture.solde) }}
                </td>
                <td>
                  <span :class="getStatusBadge(facture.statut)">{{ facture.statut }}</span>
                </td>
                <td class="text-center">
                  <div class="btn-group">
                    <button
                      class="btn btn-sm btn-outline-secondary"
                      @click="downloadPDF(facture)"
                      title="Télécharger PDF"
                    >
                      <i class="mdi mdi-download"></i>
                    </button>
                    <button
                      class="btn btn-sm btn-outline-info"
                      @click="sendEmail(facture)"
                      title="Envoyer par Email"
                    >
                      <i class="mdi mdi-send"></i>
                    </button>
                    <button
                      class="btn btn-sm btn-outline-primary"
                      @click="viewDetails(facture)"
                      title="Détails"
                    >
                      <i class="mdi mdi-eye"></i>
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="filteredFactures.length === 0">
                <td colspan="7" class="text-center py-5">
                  <img src="/img/empty-box.svg" alt="Vide" width="60" class="mb-2 opacity-50" />
                  <p class="text-muted">Aucune facture trouvée.</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const searchQuery = ref('');
const statusFilter = ref('tous');

const factures = ref([
  {
    id: 1,
    numero: 'FAC-2024-001',
    etudiant: 'Amath Sarr',
    matricule: 'ETU045',
    totalDu: 500000,
    dejaPaye: 350000,
    solde: 150000,
    statut: 'Partiel',
  },
  {
    id: 2,
    numero: 'FAC-2024-002',
    etudiant: 'Fatima Ndiaye',
    matricule: 'ETU089',
    totalDu: 250000,
    dejaPaye: 250000,
    solde: 0,
    statut: 'Payé',
  },
  {
    id: 3,
    numero: 'FAC-2024-003',
    etudiant: 'Modou Fall',
    matricule: 'ETU112',
    totalDu: 450000,
    dejaPaye: 0,
    solde: 450000,
    statut: 'Impayé',
  },
]);

const filteredFactures = computed(() => {
  return factures.value.filter((f) => {
    const matchesSearch =
      f.etudiant.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      f.numero.includes(searchQuery.value);
    const matchesStatus =
      statusFilter.value === 'tous' || f.statut.toLowerCase() === statusFilter.value;
    return matchesSearch && matchesStatus;
  });
});

const formatPrice = (val) => new Intl.NumberFormat('fr-FR').format(val) + ' F';

const getStatusBadge = (status) => {
  const base = 'badge rounded-pill ';
  if (status === 'Payé') return base + 'bg-success';
  if (status === 'Partiel') return base + 'bg-warning text-dark';
  return base + 'bg-danger';
};

// Logique des actions
const downloadPDF = (f) => alert(`Téléchargement de la facture ${f.numero} au format PDF...`);
const sendEmail = (f) =>
  alert(`Facture envoyée à l'adresse email liée au matricule ${f.matricule}`);
const sendBulkReminders = () =>
  alert('Envoi des emails de rappel pour toutes les factures impayées/partielles...');
const triggerAutoGeneration = () =>
  alert('Génération automatique des factures mensuelles pour le cycle en cours...');
</script>

<style scoped>
.bg-soft-warning {
  background-color: #fff4e5;
}
.extra-small {
  font-size: 0.75rem;
}
.table thead th {
  border: none;
  font-size: 0.7rem;
  color: #888;
}
.badge {
  font-weight: 500;
  font-size: 0.75rem;
}
.btn-group .btn {
  padding: 0.25rem 0.5rem;
}
</style>
