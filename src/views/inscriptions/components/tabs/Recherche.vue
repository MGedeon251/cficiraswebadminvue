<template>
  <div class="row">
    <div class="col-12 grid-margin">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 class="fw-bold">Réinscriptions {{ selectedAnnee || '' }}</h3>
          <p class="text-muted">
            Gestion du passage des étudiants vers une nouvelle année académique.
          </p>
        </div>
        <div class="d-flex gap-2">
          <button class="btn btn-outline-dark btn-sm">
            <i class="mdi mdi-export me-1"></i>Exporter
          </button>
          <button
            class="btn btn-primary btn-sm"
            data-bs-toggle="modal"
            data-bs-target="#importModal"
          >
            <i class="mdi mdi-upload me-1"></i>Importer
          </button>
        </div>
      </div>

      <div class="card mb-4 border-0 shadow-sm bg-light">
        <div class="card-body">
          <div class="row g-3">
            <div class="col-md-3">
              <label class="form-label small fw-bold text-muted text-uppercase">Année Source</label>
              <select class="form-select border-0 shadow-sm" v-model="selectedAnnee">
                <option value="">Toutes les années</option>
                <option v-for="year in academicYears" :key="year" :value="year">
                  {{ year }}
                </option>
              </select>
            </div>

            <div class="col-md-3">
              <label class="form-label small fw-bold text-muted text-uppercase">Filière</label>
              <select class="form-select border-0 shadow-sm" v-model="selectedFiliere">
                <option value="">Toutes les filières</option>
                <option v-for="f in filieres" :key="f" :value="f">
                  {{ f }}
                </option>
              </select>
            </div>

            <div class="col-md-4">
              <label class="form-label small fw-bold text-muted text-uppercase">Recherche</label>
              <div class="input-group shadow-sm">
                <span class="input-group-text bg-white border-0">
                  <i class="mdi mdi-magnify text-muted"></i>
                </span>
                <input
                  type="text"
                  class="form-control border-0"
                  v-model="searchQuery"
                  placeholder="Nom, prénom ou matricule..."
                />
              </div>
            </div>

            <div class="col-md-2 d-flex align-items-end">
              <button class="btn btn-dark w-100 shadow-sm" @click="resetFilters">
                Réinitialiser
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="table-responsive">
        <table class="table table-hover align-middle">
          <thead class="table-light">
            <tr>
              <th class="border-0">Matricule</th>
              <th class="border-0">Étudiant</th>
              <th class="border-0">Dernière Classe</th>
              <th class="border-0">Paiement</th>
              <th class="border-0 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="etudiant in filteredCandidats" :key="etudiant.id">
              <td>
                <span class="fw-bold text-primary">{{ etudiant.matricule }}</span>
              </td>
              <td>
                <div class="d-flex align-items-center">
                  <div class="avatar-soft-primary me-2">
                    {{ etudiant.nom.charAt(0) }}
                  </div>
                  <div class="d-flex flex-column">
                    <span class="fw-bold">{{ etudiant.nom }} {{ etudiant.prenom }}</span>
                    <small class="text-muted">{{ etudiant.telephone }}</small>
                  </div>
                </div>
              </td>
              <td>
                <span class="text-dark">{{ etudiant.classe }}</span>
                <div class="small text-muted">{{ etudiant.annee }}</div>
              </td>
              <td>
                <span
                  class="badge rounded-pill"
                  :class="
                    etudiant.statut === 'Payé'
                      ? 'bg-soft-success text-success'
                      : 'bg-soft-warning text-warning'
                  "
                >
                  {{ etudiant.statut }}
                </span>
              </td>
              <td class="text-center">
                <button
                  class="btn btn-sm btn-primary px-3 rounded-pill shadow-sm"
                  @click="openReinscriptionModal(etudiant)"
                >
                  Réinscrire
                </button>
              </td>
            </tr>

            <tr v-if="filteredCandidats.length === 0">
              <td colspan="5" class="text-center py-5">
                <p class="text-muted mb-0">Aucun étudiant ne correspond à ces critères.</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

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

<style scoped>
/* Effet "Soft" sur les badges et avatars */
.bg-soft-success {
  background-color: rgba(40, 167, 69, 0.1);
}
.bg-soft-warning {
  background-color: rgba(255, 193, 7, 0.1);
}
.text-success {
  color: #28a745 !important;
}
.text-warning {
  color: #ffc107 !important;
}

.avatar-soft-primary {
  width: 32px;
  height: 32px;
  background-color: rgba(75, 73, 172, 0.1);
  color: #4b49ac;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-weight: bold;
}

.form-select,
.form-control {
  padding: 0.6rem 1rem;
  font-size: 0.9rem;
}

.card {
  border-radius: 15px;
}
</style>
