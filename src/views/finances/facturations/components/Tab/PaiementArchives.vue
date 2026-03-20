<template>
  <div class="transactions-container">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h4 class="fw-bold">Gestion des Flux Financiers</h4>
        <p class="text-muted small">Suivi des entrées (revenus) et sorties (dépenses) de l'établissement.</p>
      </div>
      <div class="d-flex gap-2">
        <button class="btn btn-outline-dark btn-sm" @click="exportReport">
          <i class="mdi mdi-file-export me-1"></i> Rapport Mensuel
        </button>
        <button class="btn btn-dark btn-sm" data-bs-toggle="modal" data-bs-target="#transactionModal">
          <i class="mdi mdi-plus-circle me-1"></i> Nouvelle Transaction
        </button>
      </div>
    </div>

    <div class="row mb-4 g-3">
      <div class="col-md-4">
        <div class="card border-0 shadow-sm border-start border-success border-4">
          <div class="card-body">
            <h6 class="text-uppercase small fw-bold text-muted">Total Entrées</h6>
            <h3 class="mb-0 fw-bold text-success">+ {{ formatPrice(totalEntrees) }}</h3>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card border-0 shadow-sm border-start border-danger border-4">
          <div class="card-body">
            <h6 class="text-uppercase small fw-bold text-muted">Total Sorties</h6>
            <h3 class="mb-0 fw-bold text-danger">- {{ formatPrice(totalSorties) }}</h3>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card border-0 shadow-sm border-start border-dark border-4">
          <div class="card-body">
            <h6 class="text-uppercase small fw-bold text-muted">Solde Net</h6>
            <h3 class="mb-0 fw-bold text-dark">{{ formatPrice(totalEntrees - totalSorties) }}</h3>
          </div>
        </div>
      </div>
    </div>

    <div class="card shadow-sm border-0">
      <div class="card-header bg-white py-3 border-bottom">
        <div class="row g-2 align-items-center">
          <div class="col-md-4">
            <input v-model="searchQuery" type="text" class="form-control form-control-sm" placeholder="Rechercher un libellé...">
          </div>
          <div class="col-md-3">
            <select v-model="filterCategory" class="form-select form-select-sm">
              <option value="Toutes">Toutes les catégories</option>
              <option value="Revenus">Scolarité / Inscription</option>
              <option value="Salaires">Salaires & Honoraires</option>
              <option value="Opérationnel">Charges Opérationnelles</option>
            </select>
          </div>
          <div class="col-md-3">
             <input type="month" v-model="filterMonth" class="form-control form-control-sm">
          </div>
        </div>
      </div>
      
      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table table-hover align-middle mb-0">
            <thead class="bg-light small fw-bold text-uppercase">
              <tr>
                <th class="ps-4">Date</th>
                <th>Libellé / Référence</th>
                <th>Catégorie</th>
                <th>Flux</th>
                <th>Montant</th>
                <th class="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="t in filteredTransactions" :key="t.id">
                <td class="ps-4">{{ t.date }}</td>
                <td>
                  <div class="fw-bold">{{ t.libelle }}</div>
                  <small class="text-muted text-uppercase">{{ t.reference }}</small>
                </td>
                <td><span class="badge bg-light text-dark border">{{ t.categorie }}</span></td>
                <td>
                  <span :class="t.type === 'Entrée' ? 'text-success' : 'text-danger'">
                    <i :class="t.type === 'Entrée' ? 'mdi mdi-trending-up' : 'mdi mdi-trending-down'"></i>
                    {{ t.type }}
                  </span>
                </td>
                <td :class="t.type === 'Entrée' ? 'text-success fw-bold' : 'text-danger fw-bold'">
                  {{ formatPrice(t.montant) }}
                </td>
                <td class="text-center">
                  <button class="btn btn-sm btn-light border" title="Modifier"><i class="mdi mdi-pencil"></i></button>
                  <button class="btn btn-sm btn-light border text-danger ms-1" title="Supprimer"><i class="mdi mdi-delete"></i></button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="modal fade" id="transactionModal" tabindex="-1">
      <div class="modal-dialog border-0">
        <div class="modal-content border-0">
          <div class="modal-header border-bottom">
            <h5 class="modal-title fw-bold">Nouvelle Opération</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="saveTransaction">
              <div class="mb-4">
                <label class="form-label fw-bold small">Type de flux</label>
                <div class="btn-group w-100" role="group">
                  <input type="radio" class="btn-check" v-model="newT.type" value="Entrée" id="btn-in" checked>
                  <label class="btn btn-outline-success" for="btn-in">Entrée (Revenu)</label>

                  <input type="radio" class="btn-check" v-model="newT.type" value="Sortie" id="btn-out">
                  <label class="btn btn-outline-danger" for="btn-out">Sortie (Dépense)</label>
                </div>
              </div>
              
              <div class="row g-3">
                <div class="col-md-6">
                  <label class="form-label small fw-bold">Date</label>
                  <input type="date" v-model="newT.date" class="form-control" required>
                </div>
                <div class="col-md-6">
                  <label class="form-label small fw-bold">Catégorie</label>
                  <select v-model="newT.categorie" class="form-select">
                    <option value="Administratives">Administratives</option>
                    <option value="Salaires">Salaires</option>
                    <option value="Opérationnelles">Opérationnelles</option>
                  </select>
                </div>
                <div class="col-12">
                  <label class="form-label small fw-bold">Libellé</label>
                  <input type="text" v-model="newT.libelle" class="form-control" placeholder="Désignation de l'opération" required>
                </div>
                <div class="col-12">
                  <label class="form-label small fw-bold">Montant (FCFA)</label>
                  <input type="number" v-model="newT.montant" class="form-control form-control-lg fw-bold" placeholder="0" required>
                </div>
              </div>
              <button type="submit" class="btn btn-dark w-100 mt-4 py-2">Enregistrer</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const filterCategory = ref('Toutes');
const searchQuery = ref('');
const filterMonth = ref(new Date().toISOString().slice(0, 7));

const transactions = ref([
  { id: 1, date: '2023-11-01', libelle: 'Scolarité Master 2 Informatique', reference: 'REV-2023-01', categorie: 'Revenus', type: 'Entrée', montant: 450000 },
  { id: 2, date: '2023-11-02', libelle: 'Location Salle Conférence', reference: 'EXP-452', categorie: 'Opérationnel', type: 'Sortie', montant: 150000 },
  { id: 3, date: '2023-11-05', libelle: 'Honoraires Formateur M. Sarr', reference: 'PRF-098', categorie: 'Salaires', type: 'Sortie', montant: 300000 }
]);

const newT = ref({ type: 'Sortie', categorie: 'Administratives', date: '', libelle: '', montant: null });

const filteredTransactions = computed(() => {
  return transactions.value.filter(t => {
    const matchesSearch = t.libelle.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesCat = filterCategory.value === 'Toutes' || t.categorie === filterCategory.value;
    return matchesSearch && matchesCat;
  });
});

const totalEntrees = computed(() => transactions.value.filter(t => t.type === 'Entrée').reduce((a, b) => a + b.montant, 0));
const totalSorties = computed(() => transactions.value.filter(t => t.type === 'Sortie').reduce((a, b) => a + b.montant, 0));

const formatPrice = (v) => new Intl.NumberFormat('fr-FR').format(v) + ' F';
const saveTransaction = () => { alert("Opération enregistrée !"); };
const exportReport = () => { alert("Génération du rapport PDF en cours..."); };
</script>

<style scoped>
.card { border-radius: 8px; }
.btn-dark { background-color: #000; border: none; }
.btn-dark:hover { background-color: #333; }
.form-control, .form-select { border-color: #e9ecef; }
.form-control:focus, .form-select:focus { border-color: #000; box-shadow: none; }
.badge { font-weight: 500; }
.table thead th { border-top: none; color: #6c757d; }
</style>