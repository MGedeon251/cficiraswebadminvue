<template>
  <div class="row">
    <div class="col-12 d-flex justify-content-between align-items-center mb-3">
      <div>
        <h4>Niveaux de la filière</h4>
        <p class="text-muted">Liste des niveaux académiques associés à cette filière.</p>
      </div>

      <div class="d-flex">
        <!-- Bouton Filtrer par cycle -->
        <div class="dropdown">
          <button
            class="btn btn-outline-primary dropdown-toggle me-2"
            type="button"
            id="filterCycleBtn"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
          Filtrer par cycle
          </button>
          <ul class="dropdown-menu" aria-labelledby="filterCycleBtn">
            <li>
              <button class="dropdown-item" @click="filterByCycle(null)">
                Tous les cycles
              </button>
            </li>
            <li v-for="cycle in cycles" :key="cycle.id">
              <button class="dropdown-item" @click="filterByCycle(cycle.id)">
                {{ cycle.designation }}
              </button>
            </li>
          </ul>
          <!-- Bouton Créer -->
          <button
          class="btn btn-outline-dark me-2"
          data-bs-toggle="modal"
          data-bs-target="#niveauModal"
        >
          + Créer un niveau
        </button>
        </div>
      </div>

      <NiveauFormModal />
    </div>

    <div class="col-12">
      <div class="table-responsive">
        <table class="table table-striped align-middle">
          <thead>
            <tr>
              <th>#</th>
              <th>Code</th>
              <th>Désignation</th>
              <th>Année</th>
              <th>Crédits totaux</th>
              <th>Statut</th>
              <th width="120"></th>
            </tr>
          </thead>

          <tbody>
            <tr v-if="loading">
              <td colspan="7" class="text-center py-4">Chargement des niveaux...</td>
            </tr>

            <tr v-for="(niveau, index) in filteredNiveaux" :key="niveau.id">
              <td>{{ index + 1 }}</td>
              <td>{{ niveau.code }}</td>
              <td>{{ niveau.designation }}</td>
              <td>{{ niveau.annee }}</td>
              <td>{{ niveau.credits }}</td>
              <td>
                <span class="badge" :class="niveau.actif ? 'bg-success' : 'bg-secondary'">
                  {{ niveau.actif ? 'Actif' : 'Inactif' }}
                </span>
              </td>
              <td>
                <ItemActions
                  :item="niveau"
                  concourRoute="/edition-concours/"
                  :showAdd="false"
                  editModalTarget="#editModuleModal"
                  @edit="editModule"
                  @delete="confirmDelete"
                />
              </td>
            </tr>

            <tr v-if="!loading && filteredNiveaux.length === 0">
              <td colspan="7" class="text-center py-4">
                <div class="d-flex flex-column align-items-center">
                  <img src="/img/empty-box.svg" alt="Aucune donnée" class="mb-2" width="80" />
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
import { ref, computed, onMounted } from 'vue';
import NiveauFormModal from '../Modal/addNiveau.vue';
import ItemActions from '../details/ItemActions.vue';

/* =====================
   États
===================== */
const loading = ref(false);
const niveaux = ref([]);
const cycles = ref([
  { id: 1, designation: 'Licence' },
  { id: 2, designation: 'Master' },
  { id: 3, designation: 'Doctorat' },
]);

const selectedCycle = ref(null);

/* =====================
   Méthodes
===================== */
const fetchNiveaux = async () => {
  loading.value = true;

  // Simulation API
  niveaux.value = [
    { id: 1, code: 'L1', designation: 'Licence 1', annee: 1, credits: 60, actif: true, cycle_id: 1 },
    { id: 2, code: 'M1', designation: 'Master 1', annee: 1, credits: 60, actif: true, cycle_id: 2 },
    { id: 3, code: 'D1', designation: 'Doctorat 1', annee: 1, credits: 60, actif: false, cycle_id: 3 },
  ];

  loading.value = false;
};

const filterByCycle = (cycleId) => {
  selectedCycle.value = cycleId;
};

/* =====================
   Computed
===================== */
const filteredNiveaux = computed(() => {
  if (!selectedCycle.value) return niveaux.value;
  return niveaux.value.filter((n) => n.cycle_id === selectedCycle.value);
});

/* =====================
   Lifecycle
===================== */
onMounted(() => {
  fetchNiveaux();
});
</script>
