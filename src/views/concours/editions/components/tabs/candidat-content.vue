<template>
  <div>
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
              <a-button type="default" @click="refreshCandidats" :loading="loading">
                🔄 Rafraîchir
              </a-button>
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
                <li><hr class="dropdown-divider" /></li>
                <li>
                  <a class="dropdown-item" href="#"><i class="mdi mdi-cog me-2"></i>Paramètres</a>
                </li>
              </ul>
            </div>
            <div class="btn-group">
              <button
                class="btn btn-primary mt-2 mt-xl-0"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                + Ajouter
              </button>
              <button
                class="btn btn-primary dropdown-toggle dropdown-toggle-split"
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
            <!-- Modals -->
            <ImportModal
              v-if="showImportModal"
              @close="showImportModal = false"
              @imported="handleImportedNotes"
            />
          </div>
          <AddCandidat @submit="handleSubmit" @close="handleClose" />
        </div>
        <div v-if="!loading" class="table-responsive mt-3">
          <table class="table table-hover align-middle">
            <thead>
              <tr>
                <th>#</th>
                <th>matricule</th>
                <th>nom</th>
                <th>prenom</th>
                <th>telephone</th>
                <th>date inscription</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(candidat, index) in paginatedCandidats" :key="candidat.id">
                <td>{{ index + 1 }}</td>
                <td>{{ candidat.matricule }}</td>
                <td>{{ candidat.nom }}</td>
                <td>{{ candidat.prenom }}</td>
                <td>{{ candidat.tel }}</td>
                <td>{{ formatDate(candidat.date_inscription) }}</td>
                <td>
                  <ItemActions
                    :item="candidat"
                    concourRoute="/details-candidat/"
                    :showAdd="false"
                    editModalTarget="#editModuleModal"
                    @edit="editModule"
                    @delete="confirmDelete"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <Pagination
            v-model="currentPage"
            :items-per-page="itemsPerPage"
            :total-items="totalItems"
            @update:itemsPerPage="itemsPerPage = $event"
          />
        </div>
        <div v-else class="text-center p-4">
          <span class="text-muted">Chargement des détails du concours...</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import dayjs from 'dayjs';
import ItemActions from '../details/ItemActions.vue';
import Pagination from '@/components/shared/Pagination.vue';
import AddCandidat from '../modal/addCandidat.vue';
import ImportModal from './import-candidat.vue';
const showImportModal = ref(false);

//données des candidats
import { useCandidatStore } from '@/stores/gestionStores/candidatStore'; //stores
import { getCandidatures } from '@/api/gestions/gestionApi';

const router = useRouter();
const concoursId = router.currentRoute.value.params.id;

// Store
const candidatStore = useCandidatStore();
const { candidatures, loading } = candidatStore;
const candidats = ref([]);

// Chargement des candidats
onMounted(async () => {
  try {
    const response = await getCandidatures(concoursId);
    candidats.value = response.data;
  } catch (e) {
    concours.value = [];
  }
});
const fetchCandidatures = async () => {
  await getCandidatures(concoursId);
};
const refreshCandidats = () => fetchCandidatures();

const formatDate = (date) => {
  return dayjs(date).format('DD-MM-YYYY');
};

// Pagination
const currentPage = ref(1);
const itemsPerPage = ref(10);
const totalItems = computed(() => candidats.value.length);
const paginatedCandidats = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return candidats.value.slice(start, end);
});

// Ajouter un candidat via le store
const handleSubmit = async (formData) => {
  await candidatStore.addCandidature(formData);
  await candidatStore.fetchCandidatures(concoursId); // rafraîchir
  handleClose(); // fermer modal
};

const handleClose = () => {
  const modalEl = document.getElementById('exampleModal');
  const modal = bootstrap.Modal.getInstance(modalEl);
  modal?.hide();
};

import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
const today = () => dayjs().format('DD/MM/YYYY à HH:mm');

const exportToExcel = () => {
  const data = candidats.value.map((c) => ({
    Matricule: c.matricule,
    Nom: c.nom,
    Prénom: c.prenom,
    Téléphone: c.tel,
    "Date d'inscription": formatDate(c.date_inscription),
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Candidats');

  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
  saveAs(blob, 'liste_candidats.xlsx');
};

const printTable = () => {
  const rows = candidats.value
    .map(
      (c, index) => `
    <tr>
      <td>${index + 1}</td>
      <td>${c.matricule}</td>
      <td>${c.nom}</td>
      <td>${c.prenom}</td>
      <td>${c.tel}</td>
      <td>${formatDate(c.date_inscription)}</td>
    </tr>
  `
    )
    .join('');

  const htmlContent = `
    <html>
      <head>
        <title>Liste des candidats</title>
        <style>
          body { font-family: 'Segoe UI', sans-serif; padding: 10px; }
          h2, h4, h5 { margin-bottom: 5px; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #333; padding: 8px; text-align: left; }
          th { background-color: #f0f0f0; }
          .footer {
            margin-top: 50px;
            display: flex;
            justify-content: space-between;
          }
          .footer .left,
          .footer .right {
            width: 45%;
            font-size: 14px;
            line-height: 1.6;
          }
          .footer .stamp {
            border: 1px dashed #555;
            height: 100px;
            width: 200px;
            margin-top: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #888;
            font-style: italic;
          }
        </style>
      </head>
      <body>
        <h2>Liste des candidats</h2>
        <h4>Concours : ${concours.value?.designation || '---'}</h4>
        <h5>Date d'impression : ${today()}</h5>

        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Matricule</th>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Téléphone</th>
              <th>Date inscription</th>
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>

        <div class="footer">
          <div class="left">
            <strong>Fait à Brazzaville, le ${today()}</strong><br />
            Le responsable examens & concours
            <div class="stamp">Signature & Cachet</div>
          </div>
          <div class="right" style="text-align: right;">
            Nom : ____________________<br />
            Fonction : ____________________<br />
            Signature : ____________________
          </div>
        </div>
      </body>
    </html>
  `;

  const printWindow = window.open('', '', 'width=1000,height=700');
  printWindow.document.write(htmlContent);
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
};
</script>
