<template>
  <div class="row">
    <div class="col-12 mb-3 d-flex justify-content-between align-items-center">
      <div>
        <h4>Étudiants par classes</h4>
        <p class="text-muted mb-0">Filtrez les étudiants par année académique, filière et classe.</p>
      </div>
      <!-- Bouton Export -->
      <div>
        <button class="btn btn-outline-dark me-2" @click="exportExcel">
          <i class="mdi mdi-file-excel-outline me-1"></i> Exporter Excel
        </button>
        <button class="btn btn-outline-dark" @click="exportPDF">
          <i class="mdi mdi-file-pdf-box me-1"></i> Exporter PDF
        </button>
      </div>
    </div>

    <!-- Filtres + Recherche -->
    <div class="col-12 mb-3">
      <div class="card">
        <div class="card-body">
          <div class="row g-3 align-items-end">
            <!-- Année académique -->
            <div class="col-md-3">
              <label class="form-label">Année académique</label>
              <select v-model="selectedAnnee" class="form-select">
                <option value="">Toutes</option>
                <option
                  v-for="annee in anneesAcademiques"
                  :key="annee.id"
                  :value="annee.id"
                >
                  {{ annee.code }}
                </option>
              </select>

            </div>

            <!-- Filière -->
            <div class="col-md-3">
              <label class="form-label">Filière</label>
              <select v-model="selectedFiliere" class="form-select">
                <option value="">Toutes</option>
                <option
                  v-for="f in filieres"
                  :key="f.id"
                  :value="f.id"
                >
                  {{ f.designation }}
                </option>
              </select>

            </div>

            <!-- Classe -->
            <div class="col-md-3">
              <label class="form-label">Classe</label>
              <select v-model="selectedClasse"
              :disabled="!selectedFiliere"
              class="form-select">
                <option value="">Toutes</option>
                <option
                  v-for="c in classes"
                  :key="c.id"
                  :value="c.id"
                  
                >
                  {{ c.code }}
                </option>
              </select>

            </div>

            <!-- Barre de recherche -->
            <div class="col-md-3">
              <label class="form-label">Recherche</label>
              <div class="input-group search-bar">
                <span class="input-group-text bg-primary text-white">
                  <i class="mdi mdi-magnify"></i>
                </span>
                <input
                  v-model="searchQuery"
                  type="text"
                  class="form-control"
                  placeholder="Matricule, nom ou prénom..."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Tableau -->
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
            </tr>
          </thead>
          <tbody>
            <tr v-if="loading">
              <td colspan="8" class="text-center py-4">
                <div class="spinner-border spinner-border-sm me-2" role="status">
                  <span class="visually-hidden">Chargement...</span>
                </div>
                Chargement des étudiants...
              </td>
            </tr>
            <tr v-else-if="!selectedAnnee || !selectedFiliere || !selectedClasse">
              <td colspan="8" class="text-center py-4">
                <div class="text-muted">
                  <i class="mdi mdi-filter-outline mdi-24px mb-2"></i>
                  <p>Veuillez sélectionner une année académique, une filière et une classe pour afficher les étudiants.</p>
                </div>
              </td>
            </tr>
            <tr v-else-if="paginatedEtudiants.length > 0" v-for="(etudiant, index) in paginatedEtudiants" :key="etudiant.id">
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
            </tr>
            <tr v-else>
              <td colspan="8" class="text-center py-4">
                <div class="text-muted">
                  <i class="mdi mdi-alert-circle-outline mdi-24px mb-2"></i>
                  <p>Aucun étudiant trouvé avec ces critères</p>
                </div>
              </td>
            </tr>

          </tbody>
        </table>

        <!-- Pagination -->
        <Pagination
          v-model="currentPage"
          :items-per-page="itemsPerPage"
          :total-items="filteredEtudiants.length"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useEtudiantStore } from '@/stores/etudiants/etudiantStore';
import Pagination from '@/components/shared/Pagination.vue';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

/* =========================
   STORE
========================= */
const etudiantStore = useEtudiantStore();
const {
  filteredEtudiants,
  anneesAcademiques,
  filieres,
  classes,
  loading
} = storeToRefs(etudiantStore);

/* =========================
   FILTRES
========================= */
const selectedAnnee = ref('');
const selectedFiliere = ref('');
const selectedClasse = ref('');
const searchQuery = ref('');

/* =========================
   PAGINATION
========================= */
const currentPage = ref(1);
const itemsPerPage = ref(10);
const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage.value);

/* =========================
   APPEL API SELON FILTRES
========================= */
watch([selectedAnnee, selectedFiliere, selectedClasse], async ([annee, filiere, classe]) => {
  currentPage.value = 1;

  if (annee && filiere && classe) {
    loading.value = true;
    try {
      const response = await etudiantStore.fetchEtudiantsByClasseFiliereAnnee(classe, filiere, annee);
      filteredEtudiants.value = response.data; // ⚡ utiliser .value
    } catch (error) {
      console.error('Erreur chargement étudiants:', error);
      filteredEtudiants.value = [];
    } finally {
      loading.value = false;
    }
  } else {
    filteredEtudiants.value = [];
  }
});

// Mettre à jour les classes quand la filière change
watch(selectedFiliere, async (newFiliere) => {
  if (newFiliere) {
    await etudiantStore.fetchClassesByFiliere(newFiliere);
    selectedClasse.value = '';
  } else {
    etudiantStore.classes.value = [];
  }
});


/* =========================
   RECHERCHE (client-side)
========================= */
const searchedEtudiants = computed(() => {
  if (!searchQuery.value) return filteredEtudiants.value;

  return filteredEtudiants.value.filter(e =>
    [e.matricule, e.nom, e.prenom]
      .join(' ')
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase())
  );
});

/* =========================
   PAGINATION APPLIQUÉE
========================= */
const paginatedEtudiants = computed(() =>
  searchedEtudiants.value.slice(
    startIndex.value,
    startIndex.value + itemsPerPage.value
  )
);

/* =========================
   EXPORTS
========================= */
const exportExcel = () => {
  const data = searchedEtudiants.value.map(e => ({
    Matricule: e.matricule,
    Nom: e.nom,
    Prénom: e.prenom,
    Sexe: e.sexe,
    Année: e.annee_academique,
    Filière: e.filiere,
    Classe: e.classe,
  }));

  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Étudiants');
  XLSX.writeFile(wb, 'etudiants_par_classes.xlsx');
};

const exportPDF = () => {
  const doc = new jsPDF();
  doc.text('Liste des étudiants par classes', 14, 16);

  autoTable(doc, {
    startY: 20,
    head: [['Matricule', 'Nom', 'Prénom', 'Sexe', 'Année', 'Filière', 'Classe']],
    body: searchedEtudiants.value.map(e => [
      e.matricule,
      e.nom,
      e.prenom,
      e.sexe,
      e.annee_academique,
      e.filiere,
      e.classe,
    ]),
  });

  doc.save('etudiants_par_classes.pdf');
};

/* =========================
   INIT
========================= */
onMounted(async () => {
  await Promise.all([
    etudiantStore.fetchAnneesAcademiques(),
    etudiantStore.fetchFilieres(),
    etudiantStore.fetchClasses()
  ]);
});
</script>


<style scoped>
.search-bar .form-control {
  border-radius: 0 6px 6px 0;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
}
.search-bar .input-group-text {
  border-radius: 6px 0 0 6px;
  font-weight: bold;
}
</style>
