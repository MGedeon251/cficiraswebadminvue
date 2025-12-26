<template>
  <div class="row">
    <div class="col-12 grid-margin">

      <!-- Header -->
      <div class="mb-4">
        <h3>Suivi des paiements</h3>
        <p class="text-muted">Gestion des paiements pour les inscriptions académiques</p>
      </div>

      <!-- Filtres -->
      <div class="card mb-3">
        <div class="card-body">
          <div class="row g-3">

            <div class="col-md-4">
              <label class="form-label">Rechercher</label>
              <input
                type="text"
                class="form-control"
                placeholder="Nom, matricule ou classe..."
                v-model="searchQuery"
              />
            </div>

            <div class="col-md-3">
              <label class="form-label">Année académique</label>
              <select class="form-select" v-model="selectedAnnee">
                <option value="">Toutes</option>
                <option v-for="year in academicYears" :key="year">{{ year }}</option>
              </select>
            </div>

            <div class="col-md-3">
              <label class="form-label">Filière</label>
              <select class="form-select" v-model="selectedFiliere">
                <option value="">Toutes</option>
                <option v-for="f in filieres" :key="f">{{ f }}</option>
              </select>
            </div>

            <div class="col-md-2 d-flex align-items-end">
              <button class="btn btn-outline-secondary w-100" @click="resetFilters">
                Réinitialiser
              </button>
            </div>

          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="d-flex justify-content-end mb-3">
        <button class="btn btn-outline-dark">+ Ajouter un paiement</button>
      </div>

      <!-- Table -->
      <div class="table-responsive">
        <table class="table table-hover align-middle">
          <thead>
            <tr>
              <th><input type="checkbox" v-model="selectAll" @change="toggleAll" /></th>
              <th>Étudiant</th>
              <th>Classe</th>
              <th>Montant</th>
              <th>Mode paiement</th>
              <th>Statut</th>
              <th class="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="p in filteredPaiements" :key="p.id">
              <td><input type="checkbox" :value="p.id" v-model="selectedIds" /></td>
              <td>{{ p.nom }}</td>
              <td>{{ p.classe }}</td>
              <td>{{ p.montant.toLocaleString() }} FCFA</td>
              <td>{{ p.mode }}</td>
              <td>
                <span :class="['status-badge', statutClass(p.statut)]">{{ p.statut }}</span>
              </td>
              <td class="text-end">
                <button class="btn btn-sm btn-outline-primary me-1">Détails</button>
                <button class="btn btn-sm btn-outline-danger" @click="deletePaiement(p.id)">Supprimer</button>
              </td>
            </tr>

            <tr v-if="filteredPaiements.length === 0">
              <td colspan="7" class="text-center py-4">
                <img src="/img/empty-box.svg" width="80" class="mb-2"/>
                <div class="text-muted">Aucun paiement trouvé</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Barre d'actions flottante -->
      <div v-if="selectedIds.length > 0" class="bulk-actions-bar">
        <div><strong>{{ selectedIds.length }}</strong> paiement(s) sélectionné(s)</div>
        <div class="btn-group">
          <button class="btn btn-success btn-sm" @click="validerSelection">✅ Valider</button>
          <button class="btn btn-warning btn-sm" @click="exporterSelection">📤 Exporter</button>
          <button class="btn btn-danger btn-sm" @click="deleteSelected">🗑 Supprimer</button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

/* =====================
   États
===================== */
const paiements = ref([
  { id: 1, nom: 'Dupont Jean', classe: 'L1 Info', montant: 20000, statut: 'confirmé', mode: 'espece', annee: '2024-2025', filiere: 'Informatique' },
  { id: 2, nom: 'Mbala Marie', classe: 'L2 Math', montant: 0, statut: 'en attente', mode: 'mobile money', annee: '2024-2025', filiere: 'Mathématiques' },
  { id: 3, nom: 'Kouadio Alain', classe: 'L1 Info', montant: 10000, statut: 'échoué', mode: 'virement', annee: '2023-2024', filiere: 'Informatique' },
])

const selectedIds = ref([])
const selectAll = ref(false)

const searchQuery = ref('')
const selectedAnnee = ref('')
const selectedFiliere = ref('')

const academicYears = ['2022-2023', '2023-2024', '2024-2025']
const filieres = ['Informatique', 'Mathématiques', 'Physique']

/* =====================
   Filtrage
===================== */
const filteredPaiements = computed(() => {
  return paiements.value.filter(p => {
    const matchSearch = p.nom.toLowerCase().includes(searchQuery.value.toLowerCase()) || p.classe.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchYear = !selectedAnnee.value || p.annee === selectedAnnee.value
    const matchFiliere = !selectedFiliere.value || p.filiere === selectedFiliere.value
    return matchSearch && matchYear && matchFiliere
  })
})

/* =====================
   Helpers
===================== */
const statutClass = (statut) => {
  return {
    'bg-success': statut === 'confirmé',
    'bg-warning text-dark': statut === 'en attente',
    'bg-danger': statut === 'échoué'
  }[statut] || 'bg-secondary'
}

const toggleAll = () => {
  selectedIds.value = selectAll.value ? filteredPaiements.value.map(p => p.id) : []
}

watch(selectedIds, (newVal) => {
  selectAll.value = newVal.length === filteredPaiements.value.length
})

const resetFilters = () => {
  searchQuery.value = ''
  selectedAnnee.value = ''
  selectedFiliere.value = ''
}

/* =====================
   Actions groupées
===================== */
const deleteSelected = () => {
  paiements.value = paiements.value.filter(p => !selectedIds.value.includes(p.id))
  selectedIds.value = []
}

const validerSelection = () => console.log('Valider IDs :', selectedIds.value)
const exporterSelection = () => console.log('Exporter IDs :', selectedIds.value)
const deletePaiement = (id) => paiements.value = paiements.value.filter(p => p.id !== id)
</script>

<style scoped>
.status-badge {
  padding: 0.3em 0.8em;
  border-radius: 20px;
  color: #fff;
}
.bg-success { background-color: #28a745; }
.bg-warning { background-color: #ffc107; color: #212529; }
.bg-danger { background-color: #dc3545; }
.bg-secondary { background-color: #6c757d; }

/* Barre flottante */
.bulk-actions-bar {
  position: fixed;
  bottom: 0; left: 0; right: 0;
  background: #fff;
  border-top: 2px solid #007bff;
  padding: 0.8rem 1.2rem;
  display: flex; justify-content: space-between; align-items: center;
  box-shadow: 0 -2px 6px rgba(0,0,0,0.1);
  z-index: 1050;
}
</style>
