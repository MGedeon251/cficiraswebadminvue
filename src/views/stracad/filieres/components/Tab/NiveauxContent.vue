<template>
  <div class="row">
    <div class="col-12 d-flex justify-content-between align-items-center mb-3">
      <div>
        <h4>Niveaux de la filière</h4>
        <p class="text-muted">Liste des niveaux académiques associés à cette filière.</p>
      </div>

      <button class="btn btn-outline-dark me-2" @click="openCreateModal">+ Créer un niveau</button>
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

            <tr v-for="(niveau, index) in niveaux" :key="niveau.id">
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
                <button class="btn btn-sm btn-outline-primary me-1" @click="editNiveau(niveau)">
                  Modifier
                </button>
              </td>
            </tr>

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

    <!-- Modal création / édition -->
    <NiveauFormModal
      v-if="showModal"
      :niveau="selectedNiveau"
      @close="closeModal"
      @save="saveNiveau"
    />
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import NiveauFormModal from '../Modal/NiveauFormModal.vue';

/* =====================
   États
===================== */
const loading = ref(false);
const niveaux = ref([]);

const showModal = ref(false);
const selectedNiveau = ref(null);

/* =====================
   Méthodes
===================== */
const fetchNiveaux = async () => {
  loading.value = true;

  // Simulation API
  niveaux.value = [
    {
      id: 1,
      code: 'L1',
      designation: 'Licence 1',
      annee: 1,
      credits: 60,
      actif: true,
    },
    {
      id: 2,
      code: 'L2',
      designation: 'Licence 2',
      annee: 2,
      credits: 60,
      actif: true,
    },
  ];

  loading.value = false;
};

const openCreateModal = () => {
  selectedNiveau.value = null;
  showModal.value = true;
};

const editNiveau = (niveau) => {
  selectedNiveau.value = { ...niveau };
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const saveNiveau = (niveau) => {
  if (niveau.id) {
    const index = niveaux.value.findIndex((n) => n.id === niveau.id);
    niveaux.value[index] = niveau;
  } else {
    niveau.id = Date.now();
    niveau.actif = true;
    niveaux.value.push(niveau);
  }
  closeModal();
};

/* =====================
   Lifecycle
===================== */
onMounted(() => {
  fetchNiveaux();
});
</script>
