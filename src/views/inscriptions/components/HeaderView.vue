<template>
  <div>
    <div class="row">
      <div class="col-md-12 grid-margin">
        <div class="d-flex justify-content-between flex-wrap">
          <div class="d-flex align-items-end flex-wrap">
            <div class="me-md-3 me-xl-5">
              <h2>Inscriptions</h2>
              <p class="mb-md-0">Inscription examens concours et année academique</p>
            </div>
            <div class="d-flex">
              <i class="mdi mdi-home text-muted hover-cursor"></i>
              <p class="text-muted mb-0 hover-cursor">&nbsp;/&nbsp;Portail&nbsp;/&nbsp;</p>
              <p class="text-primary mb-0 hover-cursor">Inscriptions</p>
            </div>
          </div>
          <div class="d-flex justify-content-between align-items-end aflex-wrap">
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
                  <a class="dropdown-item" href="#inscription-par-classe" data-bs-toggle="modal" data-bs-target="#inscriptionClasseModal">
                    Inscription par classe
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#ajouter-tuteur" data-bs-toggle="modal" data-bs-target="#ajouterTuteurModal">
                    Ajouter tuteur étudiant
                  </a>
                </li>
              </ul>
            </div>
        </div>
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

const triggerFileInput = () => {
  fileInput.value.click();
};

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    candidat.value.photo = file;
    previewImage.value = URL.createObjectURL(file);
  }
};
</script>
