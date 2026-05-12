<template>
  <div class="row">
    <!-- Header -->
    <div class="col-12 mb-4 d-flex justify-content-between align-items-center">
      <div>
        <h3 class="fw-bold mb-1">Gestion des Classes</h3>
        <p class="text-muted small mb-0">
          Configuration académique et suivi des effectifs par section.
        </p>
      </div>
      <div class="d-flex gap-2">
        <button class="btn btn-white shadow-sm border btn-sm px-3">
          <i class="mdi mdi-printer me-1"></i>Imprimer listes
        </button>
        <button class="btn btn-secondary btn-sm px-3 shadow-sm">+ Nouvelle Classe</button>
      </div>
    </div>

    <!-- Statistiques Rapides -->
    <div class="col-12 mb-4">
      <div class="row g-3">
        <div class="col-md-4">
          <div class="stat-card bg-white border-0 shadow-sm p-3 rounded-4">
            <div class="d-flex align-items-center">
              <div class="stat-icon bg-soft-primary text-primary me-3">
                <i class="mdi mdi-google-classroom fs-4"></i>
              </div>
              <div>
                <h4 class="fw-bold mb-0">{{ classes.length }}</h4>
                <p class="text-muted small mb-0 text-uppercase">Classes Actives</p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="stat-card bg-white border-0 shadow-sm p-3 rounded-4">
            <div class="d-flex align-items-center">
              <div class="stat-icon bg-soft-success text-success me-3">
                <i class="mdi mdi-account-group fs-4"></i>
              </div>
              <div>
                <h4 class="fw-bold mb-0">850</h4>
                <p class="text-muted small mb-0 text-uppercase">Capacité Totale</p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="stat-card bg-white border-0 shadow-sm p-3 rounded-4">
            <div class="d-flex align-items-center">
              <div class="stat-icon bg-soft-warning text-warning me-3">
                <i class="mdi mdi-alert-circle-outline fs-4"></i>
              </div>
              <div>
                <h4 class="fw-bold mb-0">12</h4>
                <p class="text-muted small mb-0 text-uppercase">Classes Surchargées</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Barre de recherche "Flat" -->
    <div class="col-12 mb-4">
      <div class="card border-0 shadow-sm bg-light rounded-4">
        <div class="card-body p-3">
          <div class="row g-3 align-items-center">
            <div class="col-md-8">
              <div class="input-group bg-white rounded shadow-sm">
                <span class="input-group-text bg-white border-0"
                  ><i class="mdi mdi-magnify text-primary"></i
                ></span>
                <input
                  type="text"
                  class="form-control border-0"
                  placeholder="Rechercher une classe ou une filière..."
                  v-model="searchQuery"
                />
              </div>
            </div>
            <div class="col-md-4">
              <select class="form-select border-0 shadow-sm" v-model="filterFiliere">
                <option value="">Toutes les filières</option>
                <option v-for="f in filieresUniques" :key="f" :value="f">{{ f }}</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Tableau Principal -->
    <div class="col-12">
      <div class="card border-0 shadow-sm rounded-4 overflow-hidden">
        <div class="card-body p-0">
          <div class="table-responsive">
            <table class="table table-hover align-middle mb-0">
              <thead class="bg-light">
                <tr>
                  <th class="ps-4 py-3">#</th>
                  <th>Identifiant Classe</th>
                  <th>Filière & Spécialité</th>
                  <th class="text-center">Niveau</th>
                  <th class="text-center">Capacité</th>
                  <th class="text-end pe-4">Actions</th>
                </tr>
              </thead>

              <tbody>
                <tr v-if="loading">
                  <td colspan="6" class="text-center py-5">
                    <div class="spinner-border text-primary spinner-border-sm me-2"></div>
                    Chargement des classes...
                  </td>
                </tr>

                <tr
                  v-for="(classe, index) in paginatedClasses"
                  :key="classe.classe_id"
                  class="transition-all"
                >
                  <td class="ps-4 text-muted small">{{ startIndex + index + 1 }}</td>
                  <td>
                    <span class="fw-bold text-dark">{{ classe.classe_code }}</span>
                  </td>
                  <td>
                    <div class="fw-semibold text-dark">{{ classe.filiere_designation }}</div>
                    <small class="text-muted">{{ classe.cycle_code }} • Académique</small>
                  </td>
                  <td class="text-center">
                    <span class="badge bg-soft-info text-info px-3 py-2 rounded-pill">
                      {{ classe.cycle_code }}{{ classe.niveau_ordre }}
                    </span>
                  </td>
                  <td class="text-center">
                    <div class="d-flex align-items-center justify-content-center">
                      <span class="fw-bold me-2">{{ classe.classe_capacite }}</span>
                      <div class="progress w-50" style="height: 4px">
                        <div class="progress-bar bg-success" style="width: 70%"></div>
                      </div>
                    </div>
                  </td>
                  <td class="text-end pe-4">
                    <div class="btn-group shadow-sm" role="group">
                      <button
                        class="btn btn-sm btn-outline-secondary"
                        @click="openModal(inscription)"
                      >
                        <!-- Account Group SVG -->
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="me-1"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M16 11C17.66 11 18.99 9.66 18.99 8S17.66 5 16 5 13 6.34 13 8 14.34 11 16 11M8 11C9.66 11 10.99 9.66 10.99 8S9.66 5 8 5 5 6.34 5 8 6.34 11 8 11M8 13C5.33 13 0 14.34 0 17V19H16V17C16 14.34 10.67 13 8 13M16 13C15.5 13 14.96 13.04 14.39 13.1C15.78 14.03 17 15.35 17 17V19H24V17C24 14.34 18.67 13 16 13Z"
                          />
                        </svg>
                        Etudiants
                      </button>

                      <button
                        class="btn btn-sm btn-outline-success"
                        @click="store.removeInscription(inscription.id)"
                      >
                        <!-- Upload SVG -->
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M5 20H19V18H5V20M19 9H15V3H9V9H5L12 16L19 9Z" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>

                <tr v-if="!loading && classes.length === 0">
                  <td colspan="6" class="text-center py-5">
                    <img src="/img/empty-box.svg" width="100" class="mb-3 opacity-50" />
                    <p class="text-muted">Aucune classe trouvée dans la base de données.</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="card-footer bg-white border-0 py-3">
          <Pagination
            v-model="currentPage"
            :items-per-page="itemsPerPage"
            :total-items="classes.length"
          />
        </div>
      </div>
    </div>

    <!-- Modals (Note: Styles harmonisés pour les Teleports) -->
    <!-- ... Vos Teleports restent fonctionnels mais avec des classes Bootstrap 5 épurées ... -->
  </div>
</template>

<style scoped>
/* Design Cards & Icons */
.stat-icon {
  width: 45px;
  height: 45px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bg-soft-primary {
  background: rgba(13, 110, 253, 0.1);
}
.bg-soft-success {
  background: rgba(25, 135, 84, 0.1);
}
.bg-soft-warning {
  background: rgba(255, 193, 7, 0.1);
}
.bg-soft-info {
  background: rgba(13, 202, 240, 0.1);
}

.btn-white {
  background: #fff;
  border: none;
}
.btn-white:hover {
  background: #f8f9fa;
}

/* Table Design */
.table thead th {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: #6c757d;
  border: none;
}

.table tbody tr {
  transition: all 0.2s ease;
}

.table tbody tr:hover {
  background-color: #fcfdfe !important;
  transform: scale(1.001);
}

.transition-all {
  transition: all 0.3s ease;
}

.rounded-4 {
  border-radius: 0.4rem !important;
}

/* Custom Modals Animation */
.modal.d-block {
  backdrop-filter: blur(4px);
}

.icon {
  width: 16px;
  height: 16px;
  object-fit: contain;
  vertical-align: middle;
}
</style>
<script setup>
import { ref, computed, onMounted } from 'vue';
import { useClasseStore } from '@/stores/academiqueStore/classeStore';

const classeStore = useClasseStore();

/* ===================== Pagination ===================== */
const currentPage = ref(1);
const itemsPerPage = ref(10);

/* ===================== Computed classes ===================== */
const loading = computed(() => classeStore.loading);
const classes = computed(() => (Array.isArray(classeStore.classes) ? classeStore.classes : []));
const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage.value);
const paginatedClasses = computed(() =>
  classes.value.slice(startIndex.value, startIndex.value + itemsPerPage.value)
);

/* ===================== Classe sélectionnée ===================== */
const classeSelectionnee = ref(null);

/* ===================== Import ===================== */
const fileInput = ref(null);
const fichierSelectionne = ref(null);
const importEnCours = ref(false);
const importErreur = ref('');
const showModalImport = ref(false);

const openImport = (classe) => {
  classeSelectionnee.value = classe;
  fichierSelectionne.value = null;
  importErreur.value = '';
  if (fileInput.value) fileInput.value.value = '';
  showModalImport.value = true;
};

const closeImport = () => {
  showModalImport.value = false;
};

const onFileChange = (e) => {
  fichierSelectionne.value = e.target.files[0] ?? null;
  importErreur.value = '';
};

const confirmerImport = async () => {
  if (!fichierSelectionne.value) return;
  importEnCours.value = true;
  importErreur.value = '';
  try {
    // TODO: await classeStore.importerEtudiants(classeSelectionnee.value.classe_id, fichierSelectionne.value);
    await new Promise((r) => setTimeout(r, 1000));
    closeImport();
    classeStore.fetchClassesDetails();
  } catch (e) {
    importErreur.value = e?.message ?? "Une erreur est survenue lors de l'importation.";
  } finally {
    importEnCours.value = false;
  }
};

/* ===================== Liste étudiants ===================== */
const etudiants = ref([]);
const loadingEtudiants = ref(false);
const rechercheEtudiant = ref('');
const showModalEtudiants = ref(false);

const etudiantsFiltres = computed(() => {
  const q = rechercheEtudiant.value.toLowerCase();
  if (!q) return etudiants.value;
  return etudiants.value.filter((e) =>
    `${e.prenom} ${e.nom} ${e.matricule}`.toLowerCase().includes(q)
  );
});

const voirEtudiants = async (classe) => {
  classeSelectionnee.value = classe;
  rechercheEtudiant.value = '';
  etudiants.value = [];
  showModalEtudiants.value = true;
  loadingEtudiants.value = true;
  try {
    // TODO: etudiants.value = await classeStore.fetchEtudiantsByClasse(classe.classe_id);
    await new Promise((r) => setTimeout(r, 800));
    etudiants.value = [];
  } finally {
    loadingEtudiants.value = false;
  }
};

const closeEtudiants = () => {
  showModalEtudiants.value = false;
};

/* ===================== Actions existantes ===================== */
const editClasse = (classe) => {
  console.log('Édition :', classe);
};
const confirmDelete = (classe) => {
  console.log('Suppression :', classe);
};

/* ===================== Lifecycle ===================== */
onMounted(() => {
  classeStore.fetchClassesDetails();
});
</script>
