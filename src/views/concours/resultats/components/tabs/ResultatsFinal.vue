<template>
  <div class="row">
    <div class="col-md-12 grid-margin">
      <div class="d-flex justify-content-between flex-wrap">
        <div class="d-flex align-items-end flex-wrap">
          <div class="flex flex-wrap justify-between mb-4">
            <a-input
              class="me-1 mt-1 mt-xl-0"
              v-model:value="searchQuery"
              placeholder="Rechercher..."
              allow-clear
              style="width: 250px"
            >
              <template #prefix>
                <i class="mdi mdi-magnify" />
              </template>
            </a-input>
          </div>
        </div>
        <div class="d-flex justify-content-between align-items-end flex-wrap">
          <div class="dropdown me-2">
            <button class="btn btn-sm btn-outline-secondary" data-bs-toggle="dropdown">
              <i class="mdi mdi-dots-vertical"></i>
            </button>
            <ul class="dropdown-menu dropdown-menu-end">
              <li>
                <a class="dropdown-item" href="#" @click.prevent="exportToExcel">
                  <i class="mdi mdi-file-excel me-2"></i>Exporter Excel
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#" @click.prevent="printTable">
                  <i class="mdi mdi-printer me-2"></i>Imprimer
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#" @click.prevent="printAnonyme">
                  <i class="mdi mdi-incognito me-2"></i>Anonyme
                </a>
              </li>
              <li><hr class="dropdown-divider" /></li>
              <li>
                <a class="dropdown-item" href="#"><i class="mdi mdi-cog me-2"></i>Paramètres</a>
              </li>
            </ul>
          </div>
          <div class="btn-group">
            <button
              class="btn btn-secondary mt-xl-0"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Generer pdf
            </button>
            <button
              class="btn btn-secondary dropdown-toggle dropdown-toggle-split"
              data-bs-toggle="dropdown"
            >
              <span class="visually-hidden">Toggle Dropdown</span>
            </button>
            <ul class="dropdown-menu">
              <label class="dropdown-item" for="fileUploadInput" @click="showImportModal = true"
                >Importer fichier</label
              >
            </ul>
          </div>
        </div>
      </div>
      <h5 class="mb-3">Résultats final des candidats</h5>
      <p class="text-muted mb-4">
        Les résultats final des candidats sont affichés ci-dessous. Vous pouvez voir le rang, la
        moyenne, la mention et le statut de chaque candidat.
      </p>
      <div class="table-responsive">
        <table class="table table-bordered table-sm">
          <thead class="table-light">
            <tr>
              <th>#</th>
              <th>Matricule</th>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Sexe</th>
              <th>Moyenne</th>
              <th>Rang</th>
              <th>Mention</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(candidat, index) in paginatedResultats" :key="candidat.candidat_id">
              <td>{{ (current - 1) * pageSize + index + 1 }}</td>
              <td>{{ candidat.matricule }}</td>
              <td>{{ candidat.nom }}</td>
              <td>{{ candidat.prenom }}</td>
              <td>{{ candidat.sexe }}</td>
              <td>{{ candidat.moyenne }}</td>
              <td>{{ candidat.rang }}</td>
              <td>
                <span :class="mentionClass(candidat.observation)">
                  {{ candidat.observation }}
                </span>
              </td>
              <td>
                <span :class="statutClass(candidat.statut)">
                  {{ candidat.statut }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- Pagination -->
      <div class="d-flex justify-content-between flex-wrap mt-3">
        <div class="d-flex justify-content-between align-items-end flex-wrap">
          <div class="me-md-3 me-xl-5">
            <a-pagination
              v-model:current="current"
              :total="resultats.length"
              :page-size="pageSize"
              :show-total="showTotal"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useConcourStore } from '@/stores/gestionStores/concourStore';
import { useRoute } from 'vue-router';
import * as XLSX from 'xlsx';

const route = useRoute();
const concourStore = useConcourStore();
const resultats = ref([]);

const current = ref(1);
const pageSize = ref(20); // Résultats par page

const mentionClass = (mention) => {
  switch (mention) {
    case 'Passable':
      return 'badge bg-warning';
    case 'Bien':
      return 'badge bg-info';
    case 'Très bien':
      return 'badge bg-success';
    case 'Échec':
      return 'badge bg-danger';
    default:
      return 'badge bg-secondary';
  }
};

const statutClass = (statut) => {
  return statut === 'admis' ? 'badge bg-success' : 'badge bg-danger';
};
const showTotal = (total) => `Total ${total} résultats`;
onMounted(async () => {
  const concoursId = route.params.id || 50; // ou passé en prop
  await concourStore.fetchResultatsFinaux(concoursId);
  resultats.value = concourStore.resultats_finaux;
});

// Fonction pour gérer la pagination
const paginatedResultats = computed(() => {
  const start = (current.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return resultats.value.slice(start, end);
});

const exportToExcel = () => {
  const data = resultats.value.map((candidat, index) => ({
    '#': index + 1,
    Matricule: candidat.matricule,
    Nom: candidat.nom,
    Prénom: candidat.prenom,
    Sexe: candidat.sexe,
    Moyenne: candidat.moyenne,
    Rang: candidat.rang,
    Mention: candidat.observation,
    Statut: candidat.statut,
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Résultats');

  XLSX.writeFile(workbook, 'resultats_final_concours.xlsx');
};
const printTable = () => {
  const printContent = document.querySelector('.table-responsive').innerHTML;
  const originalContent = document.body.innerHTML;

  const style = `
    <style>
      table {
        width: 100%;
        border-collapse: collapse;
        font-size: 12px;
      }
      th, td {
        border: 1px solid #ccc;
        padding: 6px;
        text-align: left;
      }
      thead {
        background-color: #f2f2f2;
      }
      .badge {
        padding: 2px 6px;
        font-size: 10px;
        border-radius: 4px;
        color: white;
      }
      .bg-warning { background-color: #f0ad4e !important; }
      .bg-info { background-color: #5bc0de !important; }
      .bg-success { background-color: #5cb85c !important; }
      .bg-danger { background-color: #d9534f !important; }
      .bg-secondary { background-color: #6c757d !important; }
    </style>
  `;

  const win = window.open('', '', 'width=900,height=700');
  win.document.write('<html><head><title>Impression Résultats</title>');
  win.document.write(style);
  win.document.write('</head><body>');
  win.document.write('<h2>Résultats finaux des candidats</h2>');
  win.document.write(printContent);
  win.document.write('</body></html>');
  win.document.close();
  win.focus();
  win.print();
  win.close();
};
const printAnonyme = () => {
  const table = document.querySelector('.table-responsive table');
  if (!table) return;

  // Clone le tableau original
  const clone = table.cloneNode(true);

  // Remplace la première colonne (nom) par "Candidat X"
  const rows = clone.querySelectorAll('tbody tr');
  rows.forEach((row, index) => {
    const firstCell = row.querySelector('td');
    if (firstCell) {
      firstCell.textContent = `Candidat ${index + 1}`;
    }
  });

  // Remplace le titre de colonne "Nom" par "Code"
  const headerCell = clone.querySelector('thead tr th:first-child');
  if (headerCell) {
    headerCell.textContent = 'Code';
  }

  const style = `
    <style>
      table {
        width: 100%;
        border-collapse: collapse;
        font-size: 12px;
      }
      th, td {
        border: 1px solid #ccc;
        padding: 6px;
        text-align: left;
      }
      thead {
        background-color: #f2f2f2;
      }
    </style>
  `;

  const win = window.open('', '', 'width=900,height=700');
  win.document.write('<html><head><title>Liste Anonyme</title>');
  win.document.write(style);
  win.document.write('</head><body>');
  win.document.write('<h2>Liste Anonyme des candidats</h2>');
  win.document.write('<div>' + clone.outerHTML + '</div>');
  win.document.write('</body></html>');
  win.document.close();
  win.focus();
  win.print();
  win.close();
};
</script>

<style scoped>
.table-responsive {
  max-height: 600px;
  overflow-y: auto;
}
input.form-control-sm {
  max-width: 80px;
  display: inline-block;
}
</style>
