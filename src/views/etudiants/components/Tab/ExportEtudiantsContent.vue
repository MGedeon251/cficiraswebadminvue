<template>
  <div class="row">
    <!-- Header avec Stats ou Info rapide -->
    <div class="col-12 mb-4">
      <div class="d-flex align-items-center justify-content-between">
        <div>
          <h4 class="fw-bold mb-1">Exportation des étudiants</h4>
          <p class="text-muted small mb-0">
            Configurez vos critères pour générer un rapport personnalisé.
          </p>
        </div>
        <i class="mdi mdi-file-export-outline h1 text-primary opacity-25"></i>
      </div>
    </div>

    <!-- Section Filtres (Configuration) -->
    <div class="col-12 mb-4">
      <div class="card border-0 shadow-sm">
        <div class="card-header bg-white border-0 py-3">
          <h6 class="mb-0 fw-bold">
            <i class="mdi mdi-filter-variant me-2 text-primary"></i>1. Filtrer les données
          </h6>
        </div>
        <div class="card-body bg-light rounded-bottom">
          <div class="row g-3">
            <div class="col-md-3">
              <label class="small fw-semibold text-muted mb-1">Année</label>
              <select v-model="selectedAnnee" class="form-select border-0 shadow-sm">
                <option value="">Toutes les Années</option>
                <option v-for="annee in annees" :key="annee" :value="annee">{{ annee }}</option>
              </select>
            </div>
            <div class="col-md-3">
              <label class="small fw-semibold text-muted mb-1">Filière</label>
              <select v-model="selectedFiliere" class="form-select border-0 shadow-sm">
                <option value="">Toutes les Filières</option>
                <option v-for="f in filieres" :key="f" :value="f">{{ f }}</option>
              </select>
            </div>
            <div class="col-md-3">
              <label class="small fw-semibold text-muted mb-1">Niveau</label>
              <select v-model="selectedNiveau" class="form-select border-0 shadow-sm">
                <option value="">Tous les Niveaux</option>
                <option v-for="n in niveaux" :key="n" :value="n">{{ n }}</option>
              </select>
            </div>
            <div class="col-md-3">
              <label class="small fw-semibold text-muted mb-1">Classe</label>
              <select v-model="selectedClasse" class="form-select border-0 shadow-sm">
                <option value="">Toutes les Classes</option>
                <option v-for="c in classes" :key="c" :value="c">{{ c }}</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Section Format d'Export (Action) -->
    <div class="col-12">
      <div class="card border-0 shadow-sm">
        <div class="card-header bg-white border-0 py-3">
          <h6 class="mb-0 fw-bold">
            <i class="mdi mdi-file-check me-2 text-primary"></i>2. Choisir le format et exporter
          </h6>
        </div>
        <div class="card-body">
          <div class="row g-3">
            <!-- Option Excel -->
            <div class="col-md-4">
              <div
                @click="exportExcel"
                class="d-flex align-items-center p-3 border rounded cursor-pointer hover-shadow transition-all"
                style="cursor: pointer"
              >
                <div class="icon-box bg-success-lighten text-success p-3 rounded me-3">
                  <i class="mdi mdi-file-excel mdi-24px"></i>
                </div>
                <div>
                  <h6 class="mb-0 fw-bold">Microsoft Excel</h6>
                  <small class="text-muted">Format .xlsx idéal pour analyse</small>
                </div>
              </div>
            </div>

            <!-- Option PDF -->
            <div class="col-md-4">
              <div
                @click="exportPDF"
                class="d-flex align-items-center p-3 border rounded cursor-pointer hover-shadow transition-all"
                style="cursor: pointer"
              >
                <div class="icon-box bg-danger-lighten text-danger p-3 rounded me-3">
                  <i class="mdi mdi-file-pdf-box mdi-24px"></i>
                </div>
                <div>
                  <h6 class="mb-0 fw-bold">Document PDF</h6>
                  <small class="text-muted">Prêt pour l'impression</small>
                </div>
              </div>
            </div>

            <!-- Option CSV -->
            <div class="col-md-4">
              <div
                @click="exportCSV"
                class="d-flex align-items-center p-3 border rounded cursor-pointer hover-shadow transition-all"
                style="cursor: pointer"
              >
                <div class="icon-box bg-primary-lighten text-primary p-3 rounded me-3">
                  <i class="mdi mdi-file-delimited mdi-24px"></i>
                </div>
                <div>
                  <h6 class="mb-0 fw-bold">Fichier CSV</h6>
                  <small class="text-muted">Pour import système tiers</small>
                </div>
              </div>
            </div>
          </div>

          <!-- Alert avec icône -->
          <div
            v-if="successMessage"
            class="alert alert-success mt-4 border-0 shadow-sm d-flex align-items-center"
          >
            <i class="mdi mdi-check-circle me-2"></i>
            {{ successMessage }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const successMessage = ref('');
const etudiants = ref([
  {
    matricule: 'E001',
    nom: 'Diallo',
    prenom: 'Mamadou',
    sexe: 'M',
    annee_academique: '2024-2025',
    filiere: 'Informatique',
    niveau: 'Licence 1',
    classe: 'L1-INFO-A',
  },
  {
    matricule: 'E002',
    nom: 'Ndiaye',
    prenom: 'Awa',
    sexe: 'F',
    annee_academique: '2024-2025',
    filiere: 'Informatique',
    niveau: 'Licence 2',
    classe: 'L2-INFO-B',
  },
  {
    matricule: 'E003',
    nom: 'Kouassi',
    prenom: 'Jean',
    sexe: 'M',
    annee_academique: '2023-2024',
    filiere: 'Administration',
    niveau: 'Master 1',
    classe: 'M1-ADM-A',
  },
]);

// Filtres
const annees = ref(['2023-2024', '2024-2025']);
const filieres = ref(['Informatique', 'Administration']);
const niveaux = ref(['Licence 1', 'Licence 2', 'Master 1']);
const classes = ref(['L1-INFO-A', 'L2-INFO-B', 'M1-ADM-A']);

const selectedAnnee = ref('');
const selectedFiliere = ref('');
const selectedNiveau = ref('');
const selectedClasse = ref('');

// Filtrage
const filteredEtudiants = computed(() => {
  return etudiants.value.filter((e) => {
    const matchAnnee = !selectedAnnee.value || e.annee_academique === selectedAnnee.value;
    const matchFiliere = !selectedFiliere.value || e.filiere === selectedFiliere.value;
    const matchNiveau = !selectedNiveau.value || e.niveau === selectedNiveau.value;
    const matchClasse = !selectedClasse.value || e.classe === selectedClasse.value;
    return matchAnnee && matchFiliere && matchNiveau && matchClasse;
  });
});

// Export Excel
const exportExcel = () => {
  const worksheet = XLSX.utils.json_to_sheet(filteredEtudiants.value);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Étudiants');
  XLSX.writeFile(workbook, 'etudiants.xlsx');
  successMessage.value = 'Export Excel réussi ✅';
};

// Export PDF
const exportPDF = () => {
  const doc = new jsPDF();
  doc.text('Liste des étudiants', 14, 16);

  autoTable(doc, {
    head: [['Matricule', 'Nom', 'Prénom', 'Sexe', 'Année', 'Filière', 'Niveau', 'Classe']],
    body: filteredEtudiants.value.map((e) => [
      e.matricule,
      e.nom,
      e.prenom,
      e.sexe,
      e.annee_academique,
      e.filiere,
      e.niveau,
      e.classe,
    ]),
  });

  doc.save('etudiants.pdf');
  successMessage.value = 'Export PDF réussi ✅';
};

// Export CSV
const exportCSV = () => {
  const headers = ['Matricule', 'Nom', 'Prénom', 'Sexe', 'Année', 'Filière', 'Niveau', 'Classe'];
  const rows = filteredEtudiants.value.map((e) =>
    [e.matricule, e.nom, e.prenom, e.sexe, e.annee_academique, e.filiere, e.niveau, e.classe].join(
      ','
    )
  );
  const csvContent = [headers.join(','), ...rows].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'etudiants.csv';
  link.click();
  successMessage.value = 'Export CSV réussi ✅';
};
</script>

<style scoped>
.hover-shadow:hover {
  background-color: #f8f9fa;
  border-color: var(--bs-primary) !important;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
}
.transition-all {
  transition: all 0.2s ease-in-out;
}
.bg-success-lighten {
  background-color: rgba(25, 135, 84, 0.1);
}
.bg-danger-lighten {
  background-color: rgba(220, 53, 69, 0.1);
}
.bg-primary-lighten {
  background-color: rgba(13, 110, 253, 0.1);
}
</style>
