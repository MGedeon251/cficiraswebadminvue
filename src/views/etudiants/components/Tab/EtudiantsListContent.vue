<template>
  <div class="row">
    <div class="col-12 mb-3">
      <h4>Liste des étudiants</h4>
      <p class="text-muted">
        Tous les étudiants inscrits avec leurs filières, classes et années académiques.
      </p>
    </div>

    <div class="col-12">
      <div class="table-responsive">
        <table class="table table-striped align-middle">
          <thead>
            <tr>
              <th>#</th>
              <th>Matricule</th>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Sexe</th>
              <th>Année académique</th>
              <th>Filière</th>
              <th>Classe</th>
              <th width="120"></th>
            </tr>
          </thead>

          <tbody>
            <!-- Loader -->
            <tr v-if="store.loading">
              <td colspan="9" class="text-center py-4">Chargement des étudiants...</td>
            </tr>

            <!-- Données -->
            <tr v-for="(etudiant, index) in paginatedEtudiants" :key="etudiant.id">
              <td>{{ startIndex + index + 1 }}</td>
              <td class="fw-bold">{{ etudiant.matricule }}</td>
              <td>{{ etudiant.nom }}</td>
              <td>{{ etudiant.prenom }}</td>
              <td>
                <span
                  class="badge"
                  :class="etudiant.sexe === 'M' ? 'bg-info' : 'bg-warning text-dark'"
                >
                  {{ etudiant.sexe }}
                </span>
              </td>
              <td>{{ etudiant.annee_academique }}</td>
              <td>{{ etudiant.filiere }}</td>
              <td>{{ etudiant.classe }}</td>
              <td>
                <ItemActions
                  :item="etudiant"
                  :showAdd="false"
                  editModalTarget="#editEtudiantModal"
                  @edit="editEtudiant"
                  @delete="confirmDelete"
                />
              </td>
            </tr>

            <!-- Vide -->
            <tr v-if="!store.loading && store.etudiants.length === 0">
              <td colspan="9" class="text-center py-4">
                <div class="d-flex flex-column align-items-center">
                  <img src="/img/empty-box.svg" alt="Aucune donnée" class="mb-2" width="80" />
                  <div class="text-muted">Aucun étudiant enregistré</div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Pagination -->
        <Pagination
          v-model="currentPage"
          :items-per-page="itemsPerPage"
          :total-items="store.etudiants.length"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import ItemActions from '../details/ItemActions.vue'
import Pagination from '@/components/shared/Pagination.vue'
import { useEtudiantStore } from '@/stores/etudiants/etudiantStore' 

const store = useEtudiantStore()
console.log('data :', store.etudiants)

// Pagination
const currentPage = ref(1)
const itemsPerPage = ref(10)

const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage.value)
const paginatedEtudiants = computed(() =>
  store.etudiants.slice(startIndex.value, startIndex.value + itemsPerPage.value)
)

// Actions
const editEtudiant = (etudiant) => {
  store.fetchEtudiantById(etudiant.id)
  // ouvrir modal édition par exemple
}
const confirmDelete = (etudiant) => {
  store.removeEtudiant(etudiant.id)
}

// Charger les étudiants au montage
onMounted(() => {
  store.fetchEtudiants()
})
</script>
