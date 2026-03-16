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
              <th></th>
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
                <div class="d-flex gap-2 align-items-center">
                  <!-- Bouton importer étudiants -->
                  <button
                    class="btn btn-sm btn-outline-secondary"
                    title="Importer des étudiants"
                    @click="openImport(classe)"
                  >
                    <i class="bi bi-upload me-1"></i> Importer
                  </button>

                  <!-- Bouton lister étudiants -->
                  <button
                    class="btn btn-sm btn-outline-primary"
                    title="Voir les étudiants"
                    @click="voirEtudiants(classe)"
                  >
                    <i class="bi bi-people me-1"></i> Views
                  </button>
                </div>
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

    <!-- ===================== Modal Import ===================== -->
    <div class="d-flex gap-2 align-items-center">
      <button class="btn btn-sm btn-outline-success" @click="openImport(classe)">
        <i class="bi bi-upload me-1"></i> Importer
      </button>
      <button class="btn btn-sm btn-outline-primary" @click="voirEtudiants(classe)">
        <i class="bi bi-people me-1"></i> Étudiants
      </button>
      <ItemActions :item="classe" concourRoute="/edition-concours/"
        :showAdd="false" @edit="editClasse" @delete="confirmDelete" />
    </div>

    <!-- ===== Modal Import ===== -->
    <Teleport to="body">
      <div v-if="showModalImport" class="modal d-block" tabindex="-1" style="background:rgba(0,0,0,.5)">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">
                <i class="bi bi-upload me-2 text-success"></i>
                Importer — <strong>{{ classeSelectionnee?.classe_code }}</strong>
              </h5>
              <button type="button" class="btn-close" @click="closeImport"></button>
            </div>
            <div class="modal-body">
              <p class="text-muted small">
                Importez un fichier Excel (.xlsx) ou CSV contenant la liste des étudiants.
              </p>
              <div class="mb-3">
                <label class="form-label fw-semibold">Fichier à importer</label>
                <input type="file" class="form-control" accept=".xlsx,.csv"
                  ref="fileInput" @change="onFileChange" />
              </div>
              <div v-if="fichierSelectionne" class="alert alert-info py-2 small">
                <i class="bi bi-file-earmark-check me-1"></i>
                {{ fichierSelectionne.name }} ({{ (fichierSelectionne.size / 1024).toFixed(1) }} Ko)
              </div>
              <div v-if="importErreur" class="alert alert-danger py-2 small">
                <i class="bi bi-exclamation-triangle me-1"></i>{{ importErreur }}
              </div>
            </div>
            <div class="modal-footer">
              <button class="btn btn-secondary btn-sm" @click="closeImport">Annuler</button>
              <button class="btn btn-success btn-sm"
                :disabled="!fichierSelectionne || importEnCours" @click="confirmerImport">
                <span v-if="importEnCours" class="spinner-border spinner-border-sm me-1"></span>
                <i v-else class="bi bi-upload me-1"></i>
                {{ importEnCours ? 'Importation...' : 'Importer' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- ===== Modal Étudiants ===== -->
    <Teleport to="body">
      <div v-if="showModalEtudiants" class="modal d-block" tabindex="-1" style="background:rgba(0,0,0,.5)">
        <div class="modal-dialog modal-xl">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">
                <i class="bi bi-people me-2 text-primary"></i>
                Étudiants — <strong>{{ classeSelectionnee?.classe_code }}</strong>
                <span class="badge bg-primary ms-2">{{ classeSelectionnee?.filiere_designation }}</span>
                <span class="badge bg-secondary ms-1">{{ classeSelectionnee?.niveau_code }}</span>
              </h5>
              <button type="button" class="btn-close" @click="closeEtudiants"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <input v-model="rechercheEtudiant" type="text" class="form-control"
                  placeholder="Rechercher un étudiant..." />
              </div>
              <div v-if="loadingEtudiants" class="text-center py-4">
                <div class="spinner-border text-primary" role="status"></div>
                <div class="text-muted mt-2">Chargement des étudiants...</div>
              </div>
              <div v-else class="table-responsive">
                <table class="table table-sm table-hover align-middle">
                  <thead class="table-light">
                    <tr>
                      <th>#</th>
                      <th>Matricule</th>
                      <th>Nom complet</th>
                      <th>Email</th>
                      <th>Téléphone</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(etudiant, i) in etudiantsFiltres" :key="etudiant.etudiant_id">
                      <td>{{ i + 1 }}</td>
                      <td><span class="badge bg-light text-dark border">{{ etudiant.matricule }}</span></td>
                      <td>{{ etudiant.prenom }} {{ etudiant.nom }}</td>
                      <td>{{ etudiant.email ?? '—' }}</td>
                      <td>{{ etudiant.telephone ?? '—' }}</td>
                    </tr>
                    <tr v-if="etudiantsFiltres.length === 0">
                      <td colspan="5" class="text-center text-muted py-4">Aucun étudiant trouvé</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="modal-footer">
              <span class="text-muted small me-auto">{{ etudiantsFiltres.length }} étudiant(s)</span>
              <button class="btn btn-secondary btn-sm" @click="closeEtudiants">Fermer</button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useClasseStore } from '@/stores/academiqueStore/classeStore';
import ItemActions from '../details/ItemActions.vue';

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

const closeImport = () => { showModalImport.value = false; };

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

const closeEtudiants = () => { showModalEtudiants.value = false; };

/* ===================== Actions existantes ===================== */
const editClasse = (classe) => { console.log('Édition :', classe); };
const confirmDelete = (classe) => { console.log('Suppression :', classe); };

/* ===================== Lifecycle ===================== */
onMounted(() => { classeStore.fetchClassesDetails(); });
</script>