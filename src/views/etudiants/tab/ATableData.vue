<template>
  <SkeletonLoader v-if="loading" type="table" :rows="3" :columns="1" />

  <div v-else class="ant-wrapper">
    <!-- Filtres -->
    <div class="flex flex-wrap gap-4 mb-4">
      <a-select
        class="me-1 mt-1 mt-xl-0"
        v-model:value="selectedAnnee"
        placeholder="Année académique"
        style="width: 180px"
        :loading="loadingAnnees"
        allow-clear
      >
        <a-select-option v-for="annee in anneesAcademiques" :key="annee.id" :value="annee.id">
          {{ annee.code }}
        </a-select-option>
      </a-select>

      <a-select
        class="me-1 mt-1 mt-xl-0"
        v-model:value="selectedFiliere"
        placeholder="Filière"
        style="width: 180px"
        :loading="loadingFilieres"
        allow-clear
      >
        <a-select-option v-for="filiere in filieres" :key="filiere.id" :value="filiere.id">
          {{ filiere.code }}
        </a-select-option>
      </a-select>

      <a-select
        v-model:value="selectedClasse"
        placeholder="Classe"
        style="width: 180px"
        :loading="loadingClasses"
        :disabled="!selectedFiliere"
        allow-clear
      >
        <a-select-option v-for="classe in classes" :key="classe.id" :value="classe.id">
          {{ classe.code }}
        </a-select-option>
      </a-select>
    </div>

    <!-- Boutons d'export -->
    <div class="flex flex-wrap justify-between items-center mb-4">
      <a-button-group>
        <a-button @click="exportPDF"><i class="mdi mdi-file-pdf-box" /> PDF</a-button>
        <a-button @click="exportExcel"><i class="mdi mdi-file-excel-box" /> Excel</a-button>
        <a-button @click="exportCSV"><i class="mdi mdi-file-delimited" /> CSV</a-button>
        <a-button @click="print"><i class="mdi mdi-printer" /> Imprimer</a-button>
      </a-button-group>
    </div>

    <!-- Table -->
    <a-table
      :columns="columns"
      :data-source="paginatedEtudiant"
      :loading="loading"
      row-key="id"
      :pagination="false"
    >
      <template #bodyCell="{ column, record, index }">
        <template v-if="column.key === 'index'">
          {{ index + 1 + (currentPage - 1) * itemsPerPage }}
        </template>
        <template v-else-if="column.key === 'actions'">
          <ItemActions
            :item="record"
            etudiantRoute="/etudiants"
            :showAdd="false"
            editModalTarget="#editModuleModal"
            @edit="editModule"
            @delete="confirmDelete"
          />
        </template>
      </template>
    </a-table>

    <!-- Pagination -->
    <div class="d-flex justify-between items-center mt-4">
      <div class="text-muted">
        Affichage de {{ paginatedEtudiant.length }} sur {{ etudiants.length }} étudiants
      </div>
      <a-pagination
        size="small"
        v-model:current="currentPage"
        :total="etudiants.length"
        :pageSize="itemsPerPage"
      />
    </div>
  </div>
</template>

<script setup>
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { onMounted, ref, watch, computed } from 'vue';

import { storeToRefs } from 'pinia';
import { useAnneeStore } from '@/stores/academiqueStore/anneStore';
import { useFiliereStore } from '@/stores/academiqueStore/filiereStore';
import { useClasseStore } from '@/stores/academiqueStore/classeStore';
import { getEtudiantsByClasseFiliereAnnee } from '@/api/academique/etudiantApi';
import ItemActions from '../details/ItemDetails.vue';
import SkeletonLoader from '@/components/SkeletonLoader.vue';

// Stores
const anneeStore = useAnneeStore();
const filiereStore = useFiliereStore();
const classeStore = useClasseStore();

// Refs depuis les stores
const { anneesAcademiques, loading: loadingAnnees } = storeToRefs(anneeStore);
const { filieres, loading: loadingFilieres } = storeToRefs(filiereStore);
const { classes, loading: loadingClasses } = storeToRefs(classeStore);

// Filtres
const selectedAnnee = ref('');
const selectedFiliere = ref('');
const selectedClasse = ref('');

// Étudiants
const etudiants = ref([]);
const loading = ref(false);

// Pagination
const currentPage = ref(1);
const itemsPerPage = 5;
const paginatedEtudiant = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return etudiants.value.slice(start, start + itemsPerPage);
});

// Colonnes Ant Design
const columns = [
  { title: '#', key: 'index' },
  { title: 'Matricule', dataIndex: 'matricule', key: 'matricule' },
  { title: 'Nom', dataIndex: 'nom', key: 'nom' },
  { title: 'Prénom', dataIndex: 'prenom', key: 'prenom' },
  { title: 'Sexe', dataIndex: 'sexe', key: 'sexe' },
  { title: 'Filière', dataIndex: 'filiere', key: 'filiere' },
  { title: 'Classe', dataIndex: 'classe', key: 'classe' },
  { title: 'Actions', key: 'actions' },
];

// Initialisation
onMounted(async () => {
  await Promise.all([
    anneeStore.fetchAnneesAcademiques(),
    filiereStore.fetchFilieres(),
    classeStore.fetchClasses(),
  ]);
});

// Update classes si filière change
watch(selectedFiliere, async (newFiliere) => {
  if (newFiliere) {
    await classeStore.fetchClassesByFiliere(newFiliere);
    selectedClasse.value = '';
  } else {
    classeStore.classes = [];
  }
});

// Charger étudiants
const fetchFilteredEtudiants = async () => {
  if (selectedAnnee.value && selectedFiliere.value && selectedClasse.value) {
    loading.value = true;
    try {
      const response = await getEtudiantsByClasseFiliereAnnee(
        selectedClasse.value,
        selectedFiliere.value,
        selectedAnnee.value
      );
      etudiants.value = response.data;
    } catch (error) {
      console.error('Erreur lors du chargement des étudiants:', error);
      etudiants.value = [];
    } finally {
      loading.value = false;
    }
  }
};
watch([selectedAnnee, selectedFiliere, selectedClasse], fetchFilteredEtudiants);

// Méthode exposée
const getTableData = () => etudiants.value;
defineExpose({ getTableData });

function exportCSV() {
  const headers = ['Matricule', 'Nom', 'Prénom', 'Sexe', 'Filière', 'Classe'];
  const rows = etudiants.value.map((e) => [
    e.matricule,
    e.nom,
    e.prenom,
    e.sexe,
    e.filiere,
    e.classe,
  ]);

  let csvContent = 'data:text/csv;charset=utf-8,';
  csvContent += headers.join(',') + '\n';
  rows.forEach((row) => {
    csvContent += row.join(',') + '\n';
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', 'etudiants.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function exportExcel() {
  const headers = ['Matricule', 'Nom', 'Prénom', 'Sexe', 'Filière', 'Classe'];
  const rows = etudiants.value.map((e) => [
    e.matricule,
    e.nom,
    e.prenom,
    e.sexe,
    e.filiere,
    e.classe,
  ]);

  let csvContent = 'data:text/csv;charset=utf-8,';
  csvContent += headers.join(',') + '\n';
  rows.forEach((row) => {
    csvContent += row.join(',') + '\n';
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', 'etudiants.xlsx');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function exportPDF() {
  const logoBase64 =
    'data:image/png;base64,QzpcVXNlcnNcZ2VkZW9cRG9jdW1lbnRzXGNmaXByb2plY3RzXGNmaWNpcmFzd2ViYWRtaW5ccHVibGljXGltZ1xwaG90by1mb3JtYXQuaWNv'; // à remplacer par ton logo
  const currentDate = new Date().toLocaleDateString();

  const header = [
    [
      { text: '#', style: 'tableHeader' },
      { text: 'Matricule', style: 'tableHeader' },
      { text: 'Nom', style: 'tableHeader' },
      { text: 'Prénom', style: 'tableHeader' },
      { text: 'Sexe', style: 'tableHeader' },
      { text: 'Filière', style: 'tableHeader' },
      { text: 'Classe', style: 'tableHeader' },
    ],
  ];

  const body = etudiants.value.map((e, i) => [
    i + 1,
    e.matricule,
    e.nom,
    e.prenom,
    e.sexe,
    e.filiere,
    e.classe,
  ]);

  const docDefinition = {
    pageSize: 'A4',
    pageMargins: [40, 100, 40, 60],
    header: {
      margin: [40, 20, 40, 0],
      columns: [
        {
          image: logoBase64,
          width: 60,
        },
        {
          text: 'Liste des Étudiants Inscrits',
          style: 'title',
          alignment: 'center',
          margin: [0, 15, 0, 0],
          width: '*',
        },
        {
          text: currentDate,
          alignment: 'right',
          margin: [0, 15, 0, 0],
          width: 80,
        },
      ],
    },
    content: [
      {
        text: `Total étudiants : ${etudiants.value.length}`,
        margin: [0, 0, 0, 10],
        bold: true,
      },
      {
        table: {
          headerRows: 1,
          widths: ['auto', '*', '*', '*', 'auto', '*', '*'],
          body: [...header, ...body],
        },
        layout: {
          fillColor: (rowIndex) => (rowIndex === 0 ? '#f0f0f0' : null),
          hLineWidth: () => 0.5,
          vLineWidth: () => 0.5,
          hLineColor: () => '#ccc',
          vLineColor: () => '#ccc',
          paddingLeft: () => 5,
          paddingRight: () => 5,
          paddingTop: () => 4,
          paddingBottom: () => 4,
        },
      },
    ],
    styles: {
      title: {
        fontSize: 16,
        bold: true,
      },
      tableHeader: {
        bold: true,
        fontSize: 11,
        color: '#333',
      },
    },
  };

  pdfMake.createPdf(docDefinition).download(`liste_etudiants_${currentDate}.pdf`);
}
</script>

<style scoped>
.ant-wrapper {
  all: unset;
  font-family: inherit;
}
.d-flex {
  display: flex;
}
.justify-between {
  justify-content: space-between;
}
.items-center {
  align-items: center;
}
.mt-4 {
  margin-top: 1rem;
}
.mb-4 {
  margin-bottom: 1rem;
}
.gap-4 {
  gap: 1rem;
}
</style>
