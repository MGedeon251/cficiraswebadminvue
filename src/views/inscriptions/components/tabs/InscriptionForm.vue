<template>
  <div class="row">
    <div class="col-12 grid-margin">

      <!-- Header -->
      <div class="mb-4">
        <h3>Inscription des étudiants</h3>
        <p class="text-muted">
          Gestion des inscriptions et réinscriptions par filière
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

            <div class="col-md-4">
              <label class="form-label">Filière</label>
              <select class="form-select" v-model="selectedFiliere">
                <option value="">Toutes</option>
                <option v-for="filiere in filieres" :key="filiere">
                  {{ filiere }}
                </option>
              </select>
            </div>

            <div class="col-md-4">
              <label class="form-label">Statut</label>
              <select class="form-select" v-model="selectedStatut">
                <option value="">Tous</option>
                <option value="en attente">En attente</option>
                <option value="validée">Validée</option>
                <option value="annulée">Annulée</option>
              </select>
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
              <th>Filière</th>
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
              <td>{{ inscription.filiere }}</td>
              <td>
                <span class="badge" :class="statutClass(inscription.statut)">
                  {{ inscription.statut }}
                </span>
              </td>
              <td class="text-end">
                <button class="btn btn-sm btn-outline-primary me-1">
                  Détails
                </button>
                <button class="btn btn-sm btn-outline-danger" @click="store.removeInscription(inscription.id)">
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
import { useInscriptionStore } from '@/stores/gestionStores/inscriptionStore'

/* =====================
   Store
===================== */
const store = useInscriptionStore()

onMounted(() => {
  store.fetchInscriptions()
})

/* =====================
   États
===================== */
const searchQuery = ref('')
const selectedFiliere = ref('')
const selectedStatut = ref('')

const filieres = ['Informatique', 'Mathématiques', 'Gestion']

/* =====================
   Computed
===================== */
const filteredInscriptions = computed(() => {
  return store.inscriptions.filter(i => {
    const matchSearch =
      i.nom.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      i.prenom.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      i.matricule.toLowerCase().includes(searchQuery.value.toLowerCase())

    const matchFiliere = !selectedFiliere.value || i.filiere === selectedFiliere.value
    const matchStatut = !selectedStatut.value || i.statut === selectedStatut.value

    return matchSearch && matchFiliere && matchStatut
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
</script>
