<template>
  <div class="row">
    <div class="col-12 grid-margin">
      <!-- Header avec Actions -->
      <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 class="fw-bold mb-1">Réinscriptions {{ selectedAnnee || '' }}</h3>
          <p class="text-muted small mb-0">
            Gestion du passage des étudiants vers une nouvelle année académique.
          </p>
        </div>
        <div class="d-flex gap-2">
          <button class="btn btn-white shadow-sm border btn-sm px-3">
            <i class="mdi mdi-export me-1"></i>Exporter
          </button>
          <button
            class="btn btn-primary btn-sm px-3 shadow-sm"
            data-bs-toggle="modal"
            data-bs-target="#importModal"
          >
            <i class="mdi mdi-upload me-1"></i>Importer des listes
          </button>
        </div>
      </div>

      <!-- Filtres "Flat" (UI Harmonisée) -->
      <div class="card border-0 shadow-sm mb-4">
        <div class="card-body bg-light rounded">
          <div class="row g-3">
            <!-- Année Source -->
            <div class="col-md-3">
              <select class="form-select border-0 shadow-sm" v-model="selectedAnnee">
                <option value="">Toutes les années sources</option>
                <option v-for="year in academicYears" :key="year" :value="year">
                  Année source : {{ year }}
                </option>
              </select>
            </div>

            <!-- Filière -->
            <div class="col-md-3">
              <select class="form-select border-0 shadow-sm" v-model="selectedFiliere">
                <option value="">Toutes les filières</option>
                <option v-for="f in filieres" :key="f" :value="f">
                  {{ f }}
                </option>
              </select>
            </div>

            <!-- Recherche Dynamique -->
            <div class="col-md-4">
              <div class="input-group shadow-sm bg-white rounded">
                <span class="input-group-text bg-white border-0">
                  <i class="mdi mdi-magnify text-primary"></i>
                </span>
                <input
                  type="text"
                  class="form-control border-0"
                  v-model="searchQuery"
                  placeholder="Rechercher un étudiant (Nom, matricule...)"
                />
              </div>
            </div>

            <!-- Reset -->
            <div class="col-md-2">
              <button class="btn btn-white w-100 shadow-sm border-0 h-100" @click="resetFilters">
                <i class="mdi mdi-refresh me-1"></i> Reset
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Liste des Candidats à la Réinscription -->
      <div class="card border-0 shadow-sm">
        <div class="card-body p-0">
          <div class="table-responsive">
            <table class="table table-hover align-middle mb-0">
              <thead class="bg-light">
                <tr>
                  <th class="ps-4 border-0">Matricule</th>
                  <th class="border-0">Étudiant</th>
                  <th class="border-0">Parcours Précédent</th>
                  <th class="border-0 text-center">Paiement</th>
                  <th class="border-0 text-end pe-4">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="etudiant in filteredCandidats" :key="etudiant.id" class="transition-all">
                  <td class="ps-4">
                    <span class="fw-bold text-primary">{{ etudiant.matricule }}</span>
                  </td>
                  <td>
                    <div class="d-flex align-items-center">
                      <div class="avatar-soft-primary me-3">
                        {{ etudiant.nom.charAt(0) }}{{ etudiant.prenom.charAt(0) }}
                      </div>
                      <div class="d-flex flex-column">
                        <span class="fw-bold text-dark">{{ etudiant.nom }} {{ etudiant.prenom }}</span>
                        <small class="text-muted">{{ etudiant.telephone }}</small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div class="d-flex flex-column">
                      <span class="text-dark fw-semibold">{{ etudiant.classe }}</span>
                      <small class="text-muted">{{ etudiant.annee }} • {{ etudiant.filiere }}</small>
                    </div>
                  </td>
                  <td class="text-center">
                    <span
                      class="badge rounded-pill px-3 py-2"
                      :class="etudiant.statut === 'Payé' ? 'bg-soft-success text-success' : 'bg-soft-warning text-warning'"
                    >
                      <i class="mdi" :class="etudiant.statut === 'Payé' ? 'mdi-check-circle' : 'mdi-alert-circle'"></i>
                      {{ etudiant.statut }}
                    </span>
                  </td>
                  <td class="text-end pe-4">
                    <button
                      class="btn btn-primary btn-sm px-4 rounded-pill shadow-sm btn-reassign"
                      @click="openReinscriptionModal(etudiant)"
                    >
                      <i class="mdi mdi-account-convert me-1"></i> Réinscrire
                    </button>
                  </td>
                </tr>

                <!-- État Vide -->
                <tr v-if="filteredCandidats.length === 0">
                  <td colspan="5" class="text-center py-5">
                    <div class="py-4">
                      <i class="mdi mdi-account-search-outline display-4 text-muted opacity-25"></i>
                      <p class="text-muted mt-2">Aucun étudiant trouvé pour ces filtres.</p>
                      <button class="btn btn-sm btn-link" @click="resetFilters">Réinitialiser les filtres</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Couleurs Soft et Design Moderne */
.bg-soft-success { background-color: rgba(25, 135, 84, 0.12); color: #198754 !important; }
.bg-soft-warning { background-color: rgba(255, 193, 7, 0.12); color: #997404 !important; }

.avatar-soft-primary {
  width: 40px;
  height: 40px;
  background-color: rgba(75, 73, 172, 0.1);
  color: #4b49ac;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  font-weight: 700;
  font-size: 0.85rem;
}

.btn-white { background-color: #fff; border: 1px solid #e9ecef; }
.btn-white:hover { background-color: #f8f9fa; }

.btn-reassign {
  transition: all 0.3s ease;
}
.btn-reassign:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(75, 73, 172, 0.2);
}

.table thead th {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: #6c757d;
  padding-top: 15px;
  padding-bottom: 15px;
}

.transition-all {
  transition: background 0.2s ease;
}

.table tbody tr:hover {
  background-color: #fcfdfe !important;
}
</style>

<script setup>
import { ref, computed, onMounted } from 'vue';

// États des filtres
const selectedAnnee = ref('2023-2024'); // On cherche les anciens de l'année passée
const selectedFiliere = ref(null);
const searchQuery = ref('');

// Données Mock (À remplacer par vos appels API)
const academicYears = ref(['2022-2023', '2023-2024', '2024-2025']);
const filieres = ref(['Informatique', 'Gestion', 'Ressources Humaines']);
const candidats = ref([]);

// Filtrage intelligent
const filteredCandidats = computed(() => {
  return candidats.value.filter((c) => {
    const matchYear = !selectedAnnee.value || c.annee === selectedAnnee.value;
    const matchFiliere = !selectedFiliere.value || c.filiere === selectedFiliere.value;
    const matchSearch =
      !searchQuery.value ||
      c.nom.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      c.matricule.toLowerCase().includes(searchQuery.value.toLowerCase());
    return matchYear && matchFiliere && matchSearch;
  });
});

const openReinscriptionModal = (etudiant) => {
  console.log('Ouverture modal pour réinscrire:', etudiant.nom);
  // Ici vous appelleriez votre modal qui contient le formulaire
  // pour choisir la NOUVELLE classe et valider l'inscription.
};

onMounted(() => {
  // Simulation de chargement
  candidats.value = [
    {
      id: 1,
      matricule: 'ETU2024001',
      nom: 'Kouadio',
      prenom: 'Eric',
      telephone: '0102030405',
      statut: 'Payé',
      annee: '2023-2024',
      classe: 'L1',
      filiere: 'Informatique',
    },
    {
      id: 2,
      matricule: 'ETU2024002',
      nom: 'Yao',
      prenom: 'Marie',
      telephone: '0605040302',
      statut: 'Non payé',
      annee: '2023-2024',
      classe: 'L1',
      filiere: 'Gestion',
    },
    {
      id: 3,
      matricule: 'ETU2024008',
      nom: 'Cissé',
      prenom: 'Awa',
      telephone: '0504030201',
      statut: 'Payé',
      annee: '2022-2023',
      classe: 'L2',
      filiere: 'Informatique',
    },
  ];
});
</script>


