<template>
  <div class="row">
    <div class="col-12 mb-3">
      <h4>Étudiants par classes</h4>
      <p class="text-muted">Filtrez les étudiants par année académique, filière et classe.</p>
    </div>

    <!-- Filtres -->
    <div class="col-12 mb-3">
      <div class="row g-3">
        <div class="col-md-4">
          <label class="form-label">Année académique</label>
          <select v-model="selectedAnnee" class="form-select">
            <option value="">Toutes</option>
            <option v-for="annee in annees" :key="annee" :value="annee">{{ annee }}</option>
          </select>
        </div>
        <div class="col-md-4">
          <label class="form-label">Filière</label>
          <select v-model="selectedFiliere" class="form-select">
            <option value="">Toutes</option>
            <option v-for="f in filieres" :key="f" :value="f">{{ f }}</option>
          </select>
        </div>
        <div class="col-md-4">
          <label class="form-label">Classe</label>
          <select v-model="selectedClasse" class="form-select">
            <option value="">Toutes</option>
            <option v-for="c in classes" :key="c" :value="c">{{ c }}</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Barre de recherche -->
    <div class="col-12 mb-3">
      <div class="input-group">
        <span class="input-group-text"><i class="mdi mdi-magnify"></i></span>
        <input
          v-model="searchQuery"
          type="text"
          class="form-control"
          placeholder="Rechercher par matricule, nom ou prénom..."
        />
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
              <td colspan="8" class="text-center py-4">Chargement des étudiants...</td>
            </tr>

            <tr v-for="(etudiant, index) in paginatedEtudiants" :key="etudiant.id">
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

            <tr v-if="!loading && filteredEtudiants.length === 0">
              <td colspan="8" class="text-center py-4">
                <div class="text-muted">Aucun étudiant trouvé</div>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Pagination -->
        <Pagination
          v-model="currentPage"
          :items-per-page="itemsPerPage"
          :total-items="filteredEtudiants.length"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import Pagination from '@/components/shared/Pagination.vue';

const loading = ref(false);
const etudiants = ref([]);

// Filtres
const annees = ref(['2023-2024', '2024-2025']);
const filieres = ref(['Informatique', 'Administration']);
const classes = ref(['L1-INFO-A', 'L2-INFO-B', 'M1-ADM-A']);

const selectedAnnee = ref('');
const selectedFiliere = ref('');
const selectedClasse = ref('');
const searchQuery = ref('');

// Pagination
const currentPage = ref(1);
const itemsPerPage = ref(10);
const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage.value);

// Filtrage
const filteredEtudiants = computed(() => {
  return etudiants.value.filter((e) => {
    const matchAnnee = !selectedAnnee.value || e.annee_academique === selectedAnnee.value;
    const matchFiliere = !selectedFiliere.value || e.filiere === selectedFiliere.value;
    const matchClasse = !selectedClasse.value || e.classe === selectedClasse.value;
    const matchSearch =
      !searchQuery.value ||
      [e.matricule, e.nom, e.prenom]
        .join(' ')
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase());
    return matchAnnee && matchFiliere && matchClasse && matchSearch;
  });
});

// Pagination appliquée
const paginatedEtudiants = computed(() =>
  filteredEtudiants.value.slice(startIndex.value, startIndex.value + itemsPerPage.value)
);

// Simulation API
onMounted(() => {
  loading.value = true;
  setTimeout(() => {
    etudiants.value = [
      {
        id: 1,
        matricule: 'E001',
        nom: 'Diallo',
        prenom: 'Mamadou',
        sexe: 'M',
        annee_academique: '2024-2025',
        filiere: 'Informatique',
        classe: 'L1-INFO-A',
      },
      {
        id: 2,
        matricule: 'E002',
        nom: 'Ndiaye',
        prenom: 'Awa',
        sexe: 'F',
        annee_academique: '2024-2025',
        filiere: 'Informatique',
        classe: 'L2-INFO-B',
      },
      {
        id: 3,
        matricule: 'E003',
        nom: 'Kouassi',
        prenom: 'Jean',
        sexe: 'M',
        annee_academique: '2023-2024',
        filiere: 'Administration',
        classe: 'M1-ADM-A',
      },
    ];
    loading.value = false;
  }, 2000);
});
</script>
