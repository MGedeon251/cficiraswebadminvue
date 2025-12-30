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
              <th>Niveau</th>
              <th>Cycle</th>
              <th>Frais scolarité</th>
              <th>Nombre de classes</th>
              <th width="120"></th>
            </tr>
          </thead>

          <tbody>
            <!-- Loader -->
            <tr v-if="loading">
              <td colspan="7" class="text-center py-4">Chargement des niveaux...</td>
            </tr>

            <!-- Liste des niveaux -->
            <tr v-for="(niveau, index) in niveaux" :key="niveau.id">
              <td>{{ index + 1 }}</td>
              <td>{{ niveau.code }}</td>
              <td>{{ niveau.ordre }}</td>
              <td>{{ niveau.cycle_designation }}</td>
              <td>{{ formatMoney(niveau.frais_scolarite )}}</td>
              <td>
                <span class="badge" :class="niveau.nb_classes > 0 ? 'bg-success' : 'bg-secondary'">
                  {{ niveau.nb_classes }}
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

            <!-- Cas vide -->
            <tr v-if="!loading && niveaux.length === 0">
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
import { ref, onMounted, computed } from 'vue';
import { useNiveauStore } from '@/stores/academiqueStore/niveauStore';
import { useCycleStore } from '@/stores/academiqueStore/cycleStore'; // <-- ton store des cycles
import NiveauFormModal from '../Modal/addNiveau.vue';
import ItemActions from '../details/ItemActions2.vue';


const niveauStore = useNiveauStore();
const cycleStore = useCycleStore();


const selectedCycle = ref(null);

/* =====================
   Méthodes
===================== */
const filterByCycle = async (cycleId) => {
  selectedCycle.value = cycleId;
  if (cycleId) {
    await niveauStore.getNiveauByCycle(cycleId);
  } else {
    await niveauStore.fetchNiveaux();
  }
};

/* =====================
   Computed
===================== */
const niveaux = computed(() => niveauStore.niveaux);
const cycles = computed(() => cycleStore.cycles);
const loading = computed(() => niveauStore.loading || cycleStore.loading);

/* =====================
   Lifecycle
===================== */
onMounted(() => {
  niveauStore.fetchNiveaux();
  cycleStore.fetchCycles(); // 🔥 récupère les cycles depuis l’API
});
const formatMoney = (value) => {
  if (!value) return '0 FCFA';
  return new Intl.NumberFormat('fr-FR').format(Number(value)) + ' FCFA';
};
</script>


