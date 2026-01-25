<template>
  <div class="row">
    <div class="col-12 mb-3 d-flex justify-content-between align-items-center">
      <div>
        <h4>Étudiants par classes</h4>
        <p class="text-muted mb-0">
          Filtrez les étudiants par année académique, filière et classe.
        </p>
      </div>
      <!-- Bouton Export -->
      <div>
        <button class="btn btn-outline-dark me-2" @click="exportExcel" :disabled="!hasData">
          <i class="mdi mdi-file-excel-outline me-1"></i> Exporter Excel
        </button>
        <button class="btn btn-outline-dark" @click="exportPDF" :disabled="!hasData">
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
              <select v-model="selectedAnnee" class="form-select" @change="onAnneeChange">
                <option value="">Toutes</option>
                <option v-for="annee in anneesAcademiques" :key="annee.id" :value="annee.id">
                  {{ annee.code }}
                </option>
              </select>
            </div>

            <!-- Filière -->
            <div class="col-md-3">
              <label class="form-label">Filière</label>
              <select v-model="selectedFiliere" class="form-select" @change="onFiliereChange">
                <option value="">Toutes</option>
                <option v-for="f in filieres" :key="f.id" :value="f.id">
                  {{ f.designation }}
                </option>
              </select>
            </div>

            <!-- Classe -->
            <div class="col-md-3">
              <label class="form-label">Classe</label>
              <select
                v-model="selectedClasse"
                :disabled="!selectedFiliere"
                class="form-select"
                @change="onClasseChange"
              >
                <option value="">Toutes</option>
                <option v-for="c in classes" :key="c.id" :value="c.id">
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

    <!-- Statistiques -->
    <div class="col-12 mb-3" v-if="hasData">
      <div class="card bg-light">
        <div class="card-body py-2">
          <div class="row text-center">
            <div class="col-md-3">
              <strong>Total étudiants :</strong> {{ filteredEtudiants.length }}
            </div>
            <div class="col-md-3"><strong>Hommes :</strong> {{ statsHommes }}</div>
            <div class="col-md-3"><strong>Femmes :</strong> {{ statsFemmes }}</div>
            <div class="col-md-3"><strong>Affichés :</strong> {{ paginatedEtudiants.length }}</div>
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
                  <p class="mb-0">
                    Veuillez sélectionner une année académique, une filière et une classe pour
                    afficher les étudiants.
                  </p>
                </div>
              </td>
            </tr>
            <tr
              v-else-if="paginatedEtudiants.length > 0"
              v-for="(etudiant, index) in paginatedEtudiants"
              :key="etudiant.id"
            >
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
                  <p class="mb-0">Aucun étudiant trouvé avec ces critères</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Pagination -->
        <Pagination
          v-if="filteredEtudiants.length > 0"
          v-model="currentPage"
          :items-per-page="itemsPerPage"
          :total-items="filteredEtudiants.length"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue';
import { useAnneeStore } from '@/stores/academiqueStore/anneStore';
import { useFiliereStore } from '@/stores/academiqueStore/filiereStore';
import { useClasseStore } from '@/stores/academiqueStore/classeStore';
import { useEtudiantStore } from '@/stores/etudiants/etudiantStore';
import Pagination from '@/components/shared/Pagination.vue';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import logoCFI from '@/assets/logoBase64'

export default {
  name: 'EtudiantsParClasse',
  components: {
    Pagination,
  },
  setup() {
    // Stores
    const anneeStore = useAnneeStore();
    const filiereStore = useFiliereStore();
    const classeStore = useClasseStore();
    const etudiantStore = useEtudiantStore();

    // Refs pour les filtres
    const selectedAnnee = ref('');
    const selectedFiliere = ref('');
    const selectedClasse = ref('');
    const searchQuery = ref('');

    // Pagination
    const currentPage = ref(1);
    const itemsPerPage = ref(10);

    // Computed
    const anneesAcademiques = computed(() => anneeStore.anneesAcademiques);
    const filieres = computed(() => filiereStore.filieres);
    const classes = computed(() => classeStore.classes);
    const loading = computed(() => etudiantStore.loading);

    // Filtrage des étudiants avec recherche
    const filteredEtudiants = computed(() => {
      let etudiants = etudiantStore.filteredEtudiants || [];

      if (!searchQuery.value) {
        return etudiants;
      }

      const query = searchQuery.value.toLowerCase().trim();
      return etudiants.filter((etudiant) => {
        return (
          etudiant.matricule?.toLowerCase().includes(query) ||
          etudiant.nom?.toLowerCase().includes(query) ||
          etudiant.prenom?.toLowerCase().includes(query)
        );
      });
    });

    // Pagination
    const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage.value);
    const paginatedEtudiants = computed(() => {
      const start = startIndex.value;
      const end = start + itemsPerPage.value;
      return filteredEtudiants.value.slice(start, end);
    });

    // Statistiques
    const statsHommes = computed(() => {
      return filteredEtudiants.value.filter((e) => e.sexe === 'M').length;
    });

    const statsFemmes = computed(() => {
      return filteredEtudiants.value.filter((e) => e.sexe === 'F').length;
    });

    const hasData = computed(() => {
      return (
        selectedAnnee.value &&
        selectedFiliere.value &&
        selectedClasse.value &&
        filteredEtudiants.value.length > 0
      );
    });

    // Methods
    const onAnneeChange = () => {
      // Réinitialiser les données étudiants quand on change d'année
      loadEtudiants();
    };

    const onFiliereChange = async () => {
      selectedClasse.value = '';
      etudiantStore.filteredEtudiants = [];

      if (selectedFiliere.value) {
        await classeStore.fetchClassesByFiliere(selectedFiliere.value);
      } else {
        classeStore.classes = [];
      }
    };

    const onClasseChange = () => {
      loadEtudiants();
    };

    const loadEtudiants = async () => {
      if (selectedAnnee.value && selectedFiliere.value && selectedClasse.value) {
        currentPage.value = 1;
        await etudiantStore.fetchEtudiantsByClasseFiliereAnnee(
          selectedClasse.value,
          selectedFiliere.value,
          selectedAnnee.value
        );
      } else {
        etudiantStore.filteredEtudiants = [];
      }
    };

    const exportExcel = () => {
      const data = filteredEtudiants.value.map((e) => ({
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

      // Dimensions
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      // Image logo occupant toute la largeur
      doc.addImage(logoCFI, 'PNG', 0, 0, pageWidth, 50);
      // === TITRE DU DOCUMENT ===
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.setTextColor(0, 0, 0);
      doc.text('LISTE DES ÉTUDIANTS PAR CLASSE', pageWidth / 2, 60, { align: 'center' });

      // === INFORMATIONS DE FILTRAGE ===
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(80, 80, 80);

      const anneeText =
        anneesAcademiques.value.find((a) => a.id === selectedAnnee.value)?.code || '-';
      const filiereText =
        filieres.value.find((f) => f.id === selectedFiliere.value)?.designation || '-';
      const classeText = classes.value.find((c) => c.id === selectedClasse.value)?.code || '-';

      doc.text(`Année académique: ${anneeText}`, 14, 68);
      doc.text(`Filière: ${filiereText}`, 14, 73);
      doc.text(`Classe: ${classeText}`, 14, 78);
      doc.text(`Total étudiants: ${filteredEtudiants.value.length}`, pageWidth - 14, 68, {
        align: 'right',
      });
      doc.text(`Date d'édition: ${new Date().toLocaleDateString('fr-FR')}`, pageWidth - 14, 73, {
        align: 'right',
      });

      // === TABLEAU ===
      autoTable(doc, {
        startY: 83,
        head: [['N°', 'Matricule', 'Nom', 'Prénom', 'Sexe', 'Année', 'Filière', 'Classe']],
        body: filteredEtudiants.value.map((e, index) => [
          index + 1,
          e.matricule,
          e.nom,
          e.prenom,
          e.sexe,
          e.annee_academique,
          e.filiere,
          e.classe,
        ]),
        headStyles: {
          fillColor: [41, 128, 185],
          textColor: 255,
          fontSize: 9,
          fontStyle: 'bold',
          halign: 'center',
        },
        bodyStyles: {
          fontSize: 8,
          textColor: 50,
        },
        alternateRowStyles: {
          fillColor: [245, 245, 245],
        },
        columnStyles: {
          0: { halign: 'center', cellWidth: 10 },
          1: { halign: 'center', cellWidth: 25 },
          4: { halign: 'center', cellWidth: 15 },
        },
        margin: { top: 83, left: 14, right: 14 },
        didDrawPage: (data) => {
          // Pied de page
          const pageCount = doc.internal.pages.length - 1;
          doc.setFontSize(8);
          doc.setTextColor(128);
          doc.text(
            `Page ${doc.internal.getCurrentPageInfo().pageNumber} / ${pageCount}`,
            pageWidth / 2,
            pageHeight - 10,
            { align: 'center' }
          );
        },
      });

      // Sauvegarde
      const fileName = `etudiants_${classeText}_${anneeText}_${new Date().getTime()}.pdf`;
      doc.save(fileName);
    };

    // Lifecycle
    onMounted(async () => {
      await anneeStore.fetchAnneesAcademiques();
      await filiereStore.fetchFilieres();
    });

    // Watch pour réinitialiser la pagination lors de la recherche
    watch(searchQuery, () => {
      currentPage.value = 1;
    });

    return {
      // Data
      selectedAnnee,
      selectedFiliere,
      selectedClasse,
      searchQuery,
      currentPage,
      itemsPerPage,

      // Computed
      anneesAcademiques,
      filieres,
      classes,
      loading,
      filteredEtudiants,
      paginatedEtudiants,
      startIndex,
      statsHommes,
      statsFemmes,
      hasData,

      // Methods
      onAnneeChange,
      onFiliereChange,
      onClasseChange,
      exportExcel,
      exportPDF,
    };
  },
};
</script>

<style scoped>
.search-bar .input-group-text {
  border-right: none;
}

.search-bar .form-control {
  border-left: none;
}

.search-bar .form-control:focus {
  box-shadow: none;
  border-color: #ced4da;
}

.table th {
  background-color: #f8f9fa;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.85rem;
}

.badge {
  font-size: 0.85rem;
  padding: 0.35em 0.65em;
}
</style>
