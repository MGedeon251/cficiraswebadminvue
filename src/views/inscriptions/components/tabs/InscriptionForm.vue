<template>
  <div>
    <div class="row">
      <div class="col-md-12 grid-margin">
        <div class="d-flex align-items-end flex-wrap">
          <div class="me-md-3 me-xl-5">
            <h3>Inscription des etudiants</h3>
            <p>Inscription & reinscription pour une année académique</p>
          </div>
        </div>
        <div class="d-flex justify-content-between flex-wrap">
          <div class="d-flex align-items-end flex-wrap">
            <div class="me-md-4 me-xl-5">
              <div class="filters d-flex gap-2 mb-3">
                <a-input
                  class="me-1 mt-1 mt-xl-0"
                  v-model:value="searchQuery"
                  placeholder="Rechercher..."
                  allow-clear
                  style="width: 180px"
                >
                  <template #prefix>
                    <i class="mdi mdi-magnify" />
                  </template>
                </a-input>
                <a-select
                  class="me-1 mt-1 mt-xl-0"
                  v-model:value="selectedAnnee"
                  placeholder="Année académique"
                  style="width: 180px"
                  :loading="loadingAnnees"
                  allow-clear
                >
                  <a-select-option value="lucy">lucy</a-select-option>
                </a-select>
                <a-select
                  v-model:value="selectedFiliere"
                  placeholder="Filiere"
                  style="width: 180px"
                  :loading="loadingFilieres"
                  allow-clear
                >
                  <a-select-option value="lucy">lucy</a-select-option>
                </a-select>
              </div>
            </div>
          </div>
          <div class="d-flex justify-content-between align-items-end flex-wrap">
            <button class="btn btn-outline-dark me-2">Exporter</button>
            <div class="btn-group">
              <button
                class="btn btn-primary mt-2 mt-xl-0"
                data-bs-toggle="modal"
                data-bs-target="#wizardModal"
              >
                + Inscription
              </button>
              <button
                class="btn btn-primary dropdown-toggle dropdown-toggle-split"
                data-bs-toggle="dropdown"
              >
                <span class="visually-hidden">Toggle Dropdown</span>
              </button>
              <ul class="dropdown-menu">
                <li>
                  <a class="dropdown-item" href="#drag-drop-area">Importer fichier</a>
                </li>
              </ul>
            </div>
          </div>
          <WizardModal id="wizardModal" v-model="workflowData" @finish="submitWorkflow" />
        </div>
        <div class="table-responsive mt-3">
          <table class="table table-hover align-middle">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col"></th>
                <th scope="col">noms</th>
                <th scope="col">prenoms</th>
                <th scope="col">classe</th>
                <th scope="col">paiement</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colspan="9" class="text-center py-4">
                  <div class="d-flex flex-column align-items-center">
                    <img src="/img/empty-box.svg" alt="Aucune donnée" class="mb-2" />
                  </div>
                  <div class="text-pr">Aucune donnée</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup="setup">
import { ref, onMounted } from 'vue';
const candidats = ref([]);
const academicYears = ref(['2022-2023', '2023-2024', '2024-2025']);
const classes = ref(['L1', 'L2', 'L3', 'M1', 'M2']);
const selectedYear = ref('2024-2025');
const selectedClass = ref('L1');
const selectedPaymentStatus = ref('all');

import WizardModal from '../wizard/WizarModal.vue';

const workflowData = ref({});

async function submitWorkflow(data) {
  try {
    //const res = await api.post("/api/workflow/inscriptions", data);
    alert('✅ Inscription créée !');
    //console.log(res.data);
  } catch (err) {
    alert('❌ Erreur : ' + err.message);
  }
}

onMounted(() => {
  candidats.value = [
    {
      id: 1,
      matricule: 'ETU2025001',
      nom: 'Kouadio',
      prenom: 'Eric',
      telephone: '0102030405',
      statut: 'Payé',
      annee: '2024-2025',
      classe: 'L1',
    },
    {
      id: 2,
      matricule: 'ETU2025002',
      nom: 'Yao',
      prenom: 'Marie',
      telephone: '0605040302',
      statut: 'Non payé',
      annee: '2024-2025',
      classe: 'L2',
    },
    {
      id: 3,
      matricule: 'ETU2025003',
      nom: 'Koffi',
      prenom: 'Serge',
      telephone: '0708091011',
      statut: 'Payé',
      annee: '2023-2024',
      classe: 'L3',
    },
    {
      id: 4,
      matricule: 'ETU2025004',
      nom: 'N’Guessan',
      prenom: 'Aline',
      telephone: '0203040506',
      statut: 'Non payé',
      annee: '2022-2023',
      classe: 'M1',
    },
    {
      id: 5,
      matricule: 'ETU2025005',
      nom: 'Bamba',
      prenom: 'Moussa',
      telephone: '0807060504',
      statut: 'Payé',
      annee: '2024-2025',
      classe: 'M2',
    },
    {
      id: 6,
      matricule: 'ETU2025006',
      nom: 'Coulibaly',
      prenom: 'Fatou',
      telephone: '0908070605',
      statut: 'Non payé',
      annee: '2023-2024',
      classe: 'L1',
    },
    {
      id: 7,
      matricule: 'ETU2025007',
      nom: 'Fofana',
      prenom: 'Salif',
      telephone: '0302010405',
      statut: 'Payé',
      annee: '2022-2023',
      classe: 'L2',
    },
    {
      id: 8,
      matricule: 'ETU2025008',
      nom: 'Cissé',
      prenom: 'Awa',
      telephone: '0504030201',
      statut: 'Non payé',
      annee: '2024-2025',
      classe: 'L3',
    },
    {
      id: 9,
      matricule: 'ETU2025009',
      nom: 'Sangaré',
      prenom: 'Kader',
      telephone: '0607080910',
      statut: 'Payé',
      annee: '2023-2024',
      classe: 'M1',
    },
    {
      id: 10,
      matricule: 'ETU2025010',
      nom: 'Diabaté',
      prenom: 'Aminata',
      telephone: '0105060708',
      statut: 'Non payé',
      annee: '2022-2023',
      classe: 'M2',
    },
  ];
});
</script>
