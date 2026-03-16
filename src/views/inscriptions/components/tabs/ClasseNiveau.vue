<template>
  <div class="row">
    <div class="col-12 mb-2 d-flex justify-content-between align-items-center">
      <div>
        <h4>Liste des classes</h4>
        <p class="text-muted">Liste de toutes les classes académiques enregistrées.</p>
      </div>
    </div>

    <div class="col-12">
      <div class="table-responsive">
        <table class="table table-striped align-middle">
          <thead>
            <tr>
              <th>#</th>
              <th>Code</th>
              <th>Filière</th>
              <th>Niveau</th>
              <th>Étudiants actuels</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            <!-- Chargement -->
            <tr v-if="loading">
              <td colspan="6" class="text-center py-4">Chargement des classes...</td>
            </tr>

            <!-- Données paginées -->
            <tr v-for="(classe, index) in paginatedClasses" :key="classe.classe_id">
              <td>{{ startIndex + index + 1 }}</td>
              <td>{{ classe.classe_code }}</td>
              <td>{{ classe.filiere_designation }}</td>
              <td>
                <span class="badge bg-secondary">{{ classe.niveau_code }}</span>
              </td>
              <td>
                <span class="badge bg-info">{{ classe.nombre_etudiants }}</span>
              </td>
              <td>
                <!-- Bouton importer -->
                <button
                  class="btn btn-sm btn-primary me-2"
                  @click="importEtudiants(classe)"
                >
                  Importer étudiants
                </button>

                <!-- Bouton lister -->
                <button
                  class="btn btn-sm btn-outline-secondary"
                  @click="listerEtudiants(classe)"
                >
                  Voir étudiants
                </button>
              </td>
            </tr>

            <!-- Vide -->
            <tr v-if="!loading && classes.length === 0">
              <td colspan="6" class="text-center py-4">
                <div class="d-flex flex-column align-items-center">
                  <img src="/img/empty-box.svg" alt="Aucune donnée" class="mb-2" width="80" />
                  <div class="text-muted">Aucune classe enregistrée</div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Pagination -->
        <Pagination
          v-model="currentPage"
          :items-per-page="itemsPerPage"
          :total-items="classes.length"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useClasseStore } from '@/stores/academiqueStore/classeStore';

const classeStore = useClasseStore();

/* =====================
   États pagination
===================== */
const currentPage = ref(1);
const itemsPerPage = ref(10);

/* =====================
   Computed
===================== */
const loading = computed(() => classeStore.loading);

const classes = computed(() => (Array.isArray(classeStore.classes) ? classeStore.classes : []));

const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage.value);

const paginatedClasses = computed(() =>
  classes.value.slice(startIndex.value, startIndex.value + itemsPerPage.value)
);

/* =====================
   Actions
===================== */
const importEtudiants = (classe) => {
  console.log('Importer des étudiants pour la classe :', classe);
  // Ici tu peux ouvrir un modal ou déclencher un upload CSV
};

const listerEtudiants = (classe) => {
  console.log('Lister les étudiants de la classe :', classe);
  // Ici tu peux rediriger vers une page /etudiants/:classe_id
};

/* =====================
   Lifecycle
===================== */
onMounted(() => {
  classeStore.fetchClassesDetails();
});
</script>
