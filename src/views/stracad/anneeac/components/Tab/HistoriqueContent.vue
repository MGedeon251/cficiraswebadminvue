<template>
  <div class="row">
    <!-- Filtres -->
    <div class="card mb-4">
      <div class="card-body">
        <div class="row g-3">
          <div class="col-md-4">
            <label class="form-label">Rechercher</label>
            <div class="input-group">
              <span class="input-group-text"><i class="mdi mdi-magnify"></i></span>
              <input
                type="text"
                class="form-control"
                placeholder="Rechercher une année..."
                v-model="searchQuery"
              />
            </div>
          </div>
          <div class="col-md-3">
            <label class="form-label">Statut</label>
            <select class="form-select" v-model="filterStatut">
              <option value="">Tous les statuts</option>
              <option value="active">Active</option>
              <option value="en_preparation">En préparation</option>
              <option value="terminee">Terminée</option>
              <option value="archivee">Archivée</option>
            </select>
          </div>
          <div class="col-md-3">
            <label class="form-label">Période</label>
            <select class="form-select" v-model="filterPeriode">
              <option value="">Toutes les périodes</option>
              <option value="current">Année en cours</option>
              <option value="previous">Années précédentes</option>
              <option value="upcoming">Années à venir</option>
            </select>
          </div>
          <div class="col-md-2 d-flex align-items-end">
            <button class="btn btn-outline-secondary w-100" @click="resetFilters">
              <i class="mdi mdi-refresh"></i> Réinitialiser
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="table-responsive">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>code</th>
            <th>debut</th>
            <th>fin</th>
            <th>statut</th>
            <th></th>
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
</template>
<script setup>
import { ref, computed } from 'vue';

// Données
const totalAnnees = ref(5);
const joursRestants = ref(245);
const totalEtudiants = ref(1250);

const searchQuery = ref('');
const filterStatut = ref('');
const filterPeriode = ref('');

const anneesAcademiques = ref([
  {
    id: 1,
    code: '2022-2023',
    libelle: 'Année Académique 2022-2023',
    dateDebut: '2022-09-01',
    dateFin: '2023-07-31',
    statut: 'archivee',
    estActive: false,
  },
  {
    id: 2,
    code: '2023-2024',
    libelle: 'Année Académique 2023-2024',
    dateDebut: '2023-09-01',
    dateFin: '2024-07-31',
    statut: 'terminee',
    estActive: false,
  },
  {
    id: 3,
    code: '2024-2025',
    libelle: 'Année Académique 2024-2025',
    dateDebut: '2024-09-01',
    dateFin: '2025-07-31',
    statut: 'active',
    estActive: true,
  },
]);

const formData = ref({
  code: '',
  libelle: '',
  dateDebut: '',
  dateFin: '',
  description: '',
  estActive: false,
});

// Computed
const filteredAnnees = computed(() => {
  return anneesAcademiques.value.filter((annee) => {
    const matchSearch =
      annee.code.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      annee.libelle.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchStatut = !filterStatut.value || annee.statut === filterStatut.value;
    return matchSearch && matchStatut;
  });
});

// Méthodes
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
};

const calculerDuree = (debut, fin) => {
  const d1 = new Date(debut);
  const d2 = new Date(fin);
  return Math.floor((d2 - d1) / (1000 * 60 * 60 * 24));
};

const getStatutClass = (statut) => {
  const classes = {
    active: 'badge bg-success',
    en_preparation: 'badge bg-info',
    terminee: 'badge bg-warning',
    archivee: 'badge bg-secondary',
  };
  return classes[statut] || 'badge bg-secondary';
};

const getStatutLabel = (statut) => {
  const labels = {
    active: 'Active',
    en_preparation: 'En préparation',
    terminee: 'Terminée',
    archivee: 'Archivée',
  };
  return labels[statut] || statut;
};

const resetFilters = () => {
  searchQuery.value = '';
  filterStatut.value = '';
  filterPeriode.value = '';
};

const voirDetails = (annee) => {
  console.log('Voir détails:', annee);
};

const modifierAnnee = (annee) => {
  console.log('Modifier:', annee);
};

const activerAnnee = (annee) => {
  console.log('Activer:', annee);
};

const archiverAnnee = (annee) => {
  console.log('Archiver:', annee);
};

const supprimerAnnee = (annee) => {
  if (confirm(`Êtes-vous sûr de vouloir supprimer l'année ${annee.code} ?`)) {
    console.log('Supprimer:', annee);
  }
};

const enregistrerAnnee = () => {
  console.log('Enregistrer:', formData.value);
};
</script>
