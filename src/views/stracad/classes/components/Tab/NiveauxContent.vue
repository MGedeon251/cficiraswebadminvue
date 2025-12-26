<template>
  <div class="row">
    <div class="col-12 mb-2">
      <h4>Liste des niveaux</h4>
      <p class="text-muted">
        Niveaux académiques disponibles pour l’organisation des classes.
      </p>
    </div>

    <div class="col-12">
      <div class="table-responsive">
        <table class="table table-striped align-middle">
          <thead>
            <tr>
              <th>#</th>
              <th>Code</th>
              <th>Désignation</th>
              <th>Filière</th>
              <th>Crédits totaux</th>
              <th>Statut</th>
            </tr>
          </thead>

          <tbody>
            <!-- Chargement -->
            <tr v-if="loading">
              <td colspan="6" class="text-center py-4">
                Chargement des niveaux...
              </td>
            </tr>

            <!-- Données -->
            <tr
              v-for="(niveau, index) in niveaux"
              :key="niveau.id"
            >
              <td>{{ index + 1 }}</td>
              <td>{{ niveau.code }}</td>
              <td>{{ niveau.designation }}</td>
              <td>{{ niveau.filiere }}</td>
              <td>{{ niveau.credits }}</td>
              <td>
                <span
                  class="badge"
                  :class="niveau.actif ? 'bg-success' : 'bg-secondary'"
                >
                  {{ niveau.actif ? 'Actif' : 'Inactif' }}
                </span>
              </td>
            </tr>

            <!-- Vide -->
            <tr v-if="!loading && niveaux.length === 0">
              <td colspan="6" class="text-center py-4">
                <div class="d-flex flex-column align-items-center">
                  <img
                    src="/img/empty-box.svg"
                    alt="Aucune donnée"
                    class="mb-2"
                    width="80"
                  />
                  <div class="text-muted">Aucun niveau enregistré</div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'

/* =====================
   États
===================== */
const loading = ref(false)
const niveaux = ref([])

/* =====================
   Méthodes
===================== */
const fetchNiveaux = async () => {
  loading.value = true

  // Simulation API
  niveaux.value = [
    {
      id: 1,
      code: 'L1',
      designation: 'Licence 1',
      filiere: 'Informatique',
      credits: 60,
      actif: true
    },
    {
      id: 2,
      code: 'L2',
      designation: 'Licence 2',
      filiere: 'Informatique',
      credits: 60,
      actif: true
    },
    {
      id: 3,
      code: 'M1',
      designation: 'Master 1',
      filiere: 'Data Science',
      credits: 60,
      actif: true
    }
  ]

  loading.value = false
}

/* =====================
   Lifecycle
===================== */
onMounted(() => {
  fetchNiveaux()
})
</script>
