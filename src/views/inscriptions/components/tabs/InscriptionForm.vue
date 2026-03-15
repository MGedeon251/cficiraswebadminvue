<template>
  <div class="row">
    <div class="col-12 grid-margin">

      <!-- Header -->
      <div class="mb-4">
        <h3>Inscription des étudiants</h3>
        <p class="text-muted">
          Gestion des inscriptions et réinscriptions par année académique
        </p>
      </div>

      <!-- Filtres -->
      <div class="card mb-4">
        <div class="card-body">
          <div class="row g-3">

            <div class="col-md-4">
              <label class="form-label">Recherche</label>
              <input
                type="text"
                class="form-control"
                placeholder="Nom, prénom ou matricule..."
                v-model="searchQuery"
              />
            </div>

            <div class="col-md-3">
              <label class="form-label">Année académique</label>
              <select class="form-select" v-model="selectedYear">
                <option value="">Toutes</option>
                <option v-for="year in academicYears" :key="year">
                  {{ year }}
                </option>
              </select>
            </div>

            <div class="col-md-3">
              <label class="form-label">Statut</label>
              <select class="form-select" v-model="selectedStatut">
                <option value="">Tous</option>
                <option value="en attente">En attente</option>
                <option value="validée">Validée</option>
                <option value="annulée">Annulée</option>
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
      <div class="d-flex justify-content-end mb-3 gap-2">
        <InscriptionClasse />
        <AjouterTuteur />
      </div>

      <!-- Table -->
      <div class="table-responsive">
        <table class="table table-hover align-middle">
          <thead>
            <tr>
              <th>#</th>
              <th>Matricule</th>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Classe</th>
              <th>Année</th>
              <th>Statut</th>
              <th class="text-end">Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(inscription, index) in filteredInscriptions" :key="inscription.id">
              <td>{{ index + 1 }}</td>
              <td>{{ inscription.matricule }}</td>
              <td>{{ inscription.nom }}</td>
              <td>{{ inscription.prenom }}</td>
              <td>{{ inscription.classe }}</td>
              <td>{{ inscription.annee }}</td>
              <td>
                <span
                  class="badge"
                  :class="statutClass(inscription.statut)"
                >
                  {{ inscription.statut }}
                </span>
              </td>
              <td class="text-end">
                <button class="btn btn-sm btn-outline-primary me-1">
                  Détails
                </button>
                <button class="btn btn-sm btn-outline-danger">
                  Annuler
                </button>
              </td>
            </tr>

            <tr v-if="filteredInscriptions.length === 0">
              <td colspan="8" class="text-center py-4">
                <img src="/img/empty-box.svg" width="80" class="mb-2" />
                <div class="text-muted">Aucune inscription trouvée</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'

import InscriptionClasse from '../modal/InscriptionClasse.vue'
import AjouterTuteur from '../modal/AddTuteur.vue'

/* =====================
   États
===================== */
const inscriptions = ref([])
const searchQuery = ref('')
const selectedYear = ref('')
const selectedStatut = ref('')

const academicYears = ['2022-2023', '2023-2024', '2024-2025']

/* =====================
   Données simulées (alignées SQL)
===================== */
onMounted(() => {
  inscriptions.value = [
    {
      id: 1,
      matricule: 'ETU2025001',
      nom: 'Kouadio',
      prenom: 'Eric',
      classe: 'L1 Informatique',
      annee: '2024-2025',
      statut: 'validée'
    },
    {
      id: 2,
      matricule: 'ETU2025002',
      nom: 'Yao',
      prenom: 'Marie',
      classe: 'L2 Informatique',
      annee: '2024-2025',
      statut: 'en attente'
    },
    {
      id: 3,
      matricule: 'ETU2025003',
      nom: 'Koffi',
      prenom: 'Serge',
      classe: 'L3 Informatique',
      annee: '2023-2024',
      statut: 'annulée'
    }
  ]
})

/* =====================
   Computed
===================== */
const filteredInscriptions = computed(() => {
  return inscriptions.value.filter(i => {
    const matchSearch =
      i.nom.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      i.prenom.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      i.matricule.toLowerCase().includes(searchQuery.value.toLowerCase())

    const matchYear = !selectedYear.value || i.annee === selectedYear.value
    const matchStatut = !selectedStatut.value || i.statut === selectedStatut.value

    return matchSearch && matchYear && matchStatut
  })
})

/* =====================
   Helpers
===================== */
const statutClass = (statut) => {
  return {
    'bg-success': statut === 'validée',
    'bg-warning text-dark': statut === 'en attente',
    'bg-danger': statut === 'annulée'
  }
}

const resetFilters = () => {
  searchQuery.value = ''
  selectedYear.value = ''
  selectedStatut.value = ''
}
</script>

