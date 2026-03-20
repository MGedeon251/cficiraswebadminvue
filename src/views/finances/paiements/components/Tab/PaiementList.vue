<template>
  <div class="paiement-list-container">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h4 class="fw-bold">Gestion des Paiements</h4>
        <p class="text-muted small">Consultez, filtrez et exportez les rapports de paiement des étudiants.</p>
      </div>
      
      <div class="btn-group">
        <button @click="exportData('csv')" class="btn btn-sm btn-outline-dark">
          <i class="mdi mdi-file-csv"></i> CSV
        </button>
        <button @click="exportData('excel')" class="btn btn-sm btn-outline-success mx-1">
          <i class="mdi mdi-file-excel"></i> Excel
        </button>
        <button @click="exportData('pdf')" class="btn btn-sm btn-outline-danger">
          <i class="mdi mdi-file-pdf"></i> PDF
        </button>
      </div>
    </div>

    <div class="card mb-4 border-0 shadow-sm">
      <div class="card-body bg-light rounded">
        <div class="row g-3">
          <div class="col-md-3">
            <select v-model="filters.cycle" class="form-select">
              <option value="">Tous les Cycles</option>
              <option v-for="c in cycles" :key="c" :value="c">{{ c }}</option>
            </select>
          </div>
          <div class="col-md-3">
            <select v-model="filters.filiere" class="form-select">
              <option value="">Toutes les Filières</option>
              <option v-for="f in filieres" :key="f" :value="f">{{ f }}</option>
            </select>
          </div>
          <div class="col-md-3">
            <select v-model="filters.niveau" class="form-select">
              <option value="">Tous les Niveaux</option>
              <option v-for="n in niveaux" :key="n" :value="n">Niveau {{ n }}</option>
            </select>
          </div>
          <div class="col-md-3">
            <select v-model="filters.classe" class="form-select">
              <option value="">Toutes les Classes</option>
              <option v-for="cl in classes" :key="cl" :value="cl">{{ cl }}</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <div class="card mb-4 shadow-sm">
      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table table-striped mb-0">
            <thead class="bg-white">
              <tr>
                <th class="ps-4">Matricule</th>
                <th>Nom & Prénom</th>
                <th>Montant</th>
                <th>Type de frais</th>
                <th>Statut</th>
                <th>Date</th>
                <th>Mode</th>
                <th class="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="paiement in filteredPaiements" :key="paiement.id">
                <td class="ps-4 fw-bold">{{ paiement.matricule }}</td>
                <td>{{ paiement.nom }} {{ paiement.prenom }}</td>
                <td>{{ formatCurrency(paiement.montant) }}</td>
                <td>{{ paiement.type }}</td>
                <td>
                  <span :class="paiement.statut === 'Payé' ? 'text-success fw-bold' : 'text-warning fw-bold'">
                    <i class="mdi" :class="paiement.statut === 'Payé' ? 'mdi-check-circle' : 'mdi-clock-outline'"></i>
                    {{ paiement.statut }}
                  </span>
                </td>
                <td>{{ paiement.date }}</td>
                <td>{{ paiement.mode }}</td>
                <td class="text-center">
                  <button @click="generateReceipt(paiement)" class="btn btn-inverse-primary btn-icon btn-sm" title="Imprimer le reçu">
                    <i class="mdi mdi-printer"></i>
                  </button>
                </td>
              </tr>

              <tr v-if="filteredPaiements.length === 0">
                <td colspan="8" class="text-center py-5">
                  <div class="text-muted">
                    <i class="mdi mdi-database-off mdi-36px"></i>
                    <p>Aucun paiement ne correspond à ces critères.</p>
                  </div>
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

// Listes pour les filtres (Peuvent être chargées via API)
const cycles = ['Licence', 'Master', 'Doctorat'];
const filieres = ['Informatique', 'Génie Civil', 'Management', 'Droit'];
const niveaux = ['1', '2', '3'];
const classes = ['L1-A', 'L1-B', 'M1-JV', 'M2-FI'];

// État des filtres
const filters = ref({
  cycle: '',
  filiere: '',
  niveau: '',
  classe: ''
});

// Données fictives
const paiements = ref([
  { 
    id: 1, matricule: 'ETU-2024-001', nom: 'DIOP', prenom: 'Moussa', 
    montant: 150000, type: 'Scolarité', statut: 'Payé', 
    date: '20/10/2023', mode: 'Wave', cycle: 'Licence', filiere: 'Informatique', classe: 'L1-A' 
  },
  { 
    id: 2, matricule: 'ETU-2024-042', nom: 'SOW', prenom: 'Fatou', 
    montant: 75000, type: 'Inscription', statut: 'Partiel', 
    date: '22/10/2023', mode: 'Espèces', cycle: 'Master', filiere: 'Management', classe: 'M1-JV' 
  },
  // Ajouter d'autres données ici...
]);

// Logique de filtrage
const filteredPaiements = computed(() => {
  return paiements.value.filter(p => {
    return (filters.value.cycle === '' || p.cycle === filters.value.cycle) &&
           (filters.value.filiere === '' || p.filiere === filters.value.filiere) &&
           (filters.value.niveau === '' || p.classe.includes(filters.value.niveau)) &&
           (filters.value.classe === '' || p.classe === filters.value.classe);
  });
});

// Formattage monétaire
const formatCurrency = (value) => {
  return new Intl.NumberFormat('fr-FR').format(value) + ' FCFA';
};

// Actions
const generateReceipt = (p) => {
  console.log("Impression du reçu pour:", p.matricule);
  // Logique d'impression (ex: window.print() ou génération PDF dédiée)
  alert(`Génération du reçu pour ${p.prenom} ${p.nom} en cours...`);
};

const exportData = (format) => {
  console.log(`Exportation au format ${format} des données filtrées...`);
  // Ici vous intégrerez vos outils d'exportation (ex: ExcelJS, jsPDF)
};
</script>

<style scoped>


.btn-inverse-primary {
  background-color: rgba(75, 73, 172, 0.1);
  color: #4b49ac;
  border: none;
}

.btn-inverse-primary:hover {
  background-color: #4b49ac;
  color: white;
}

.form-select {
  border-color: #e8eff9;
  font-size: 0.9rem;
}

.form-select:focus {
  border-color: #4b49ac;
  box-shadow: none;
}
</style>