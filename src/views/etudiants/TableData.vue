<script setup>
import { onMounted, ref, watch , computed } from 'vue';
import {
  getAnneesAcademiques,
  getFilieres,
  getClasses,
  getClassesByFiliere 
} from '@/api/academique/academiqueApi';
import Pagination from '@/components/shared/Pagination.vue';
import ItemActions from './ItemDetails.vue';
import { getEtudiantsByClasseFiliereAnnee } from '@/api/academique/etudiantApi';
import SkeletonLoader from '@/components/SkeletonLoader.vue';

// Références pour les données
const etudiants = ref([]);
const anneesAcademiques = ref([]);
const filieres = ref([]);
const classes = ref([]);

const selectedAnnee = ref(null);
const selectedFiliere = ref(null);
const selectedClasse = ref(null);
const loading = ref(true);

const currentPage = ref(1);
const itemsPerPage = ref(5);
const totalItems = computed(() => etudiants.value.length);
const paginatedEtudiant = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return etudiants.value.slice(start, end);
});

// Charger les données au montage du composant
onMounted(async () => {
  loading.value = true;
  try {
    // Récupérer les données directement depuis les API
    const [anneesResponse, filieresResponse, classesResponse] = await Promise.all([
      getAnneesAcademiques(),
      getFilieres(),
      getClasses(),
    ]);

    anneesAcademiques.value = anneesResponse;
    filieres.value = filieresResponse;
    classes.value = classesResponse;
  } catch (error) {
    console.error('Erreur lors du chargement des données:', error);
  } finally {
    loading.value = false;
  }
});

// Charger les classes lorsque la filiere change
watch(selectedFiliere, async (newFiliere) => {
  if (newFiliere) {
    loading.value = true;
    try {
      const [classesResponse] = await Promise.all([
        getClassesByFiliere(newFiliere)
      ]);
      classes.value = classesResponse;
      // Réinitialiser les sélections
      selectedClasse.value = null;
    } catch (error) {
      console.error('Erreur lors du chargement des filières/classes:', error);
    } finally {
      loading.value = false;
    }
  } else {
    classes.value = [];
  }
});

// Fonction pour filtrer les étudiants
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

// Surveiller les changements des filtres et mettre à jour les étudiants
watch([selectedAnnee, selectedFiliere, selectedClasse], fetchFilteredEtudiants);
</script>

<template>
  <SkeletonLoader v-if="loading" type="table" :rows="3" :columns="1" />
  <div v-else class="table-responsive">
    <p class="card-description">Liste des étudiants inscrits</p>
    <div class="d-flex justify-content-between flex-wrap">
      <div class="d-flex align-items-end flex-wrap">
        <div class="me-md-4 me-xl-5">
          <div class="filters d-flex gap-2 mb-2">
            <!-- Filtre par année académique -->
            <div class="col-md-4">
              <label class="form-label">Année académique</label>
              <select class="form-select" v-model="selectedAnnee">
                <option value="" disabled>Choisir une année</option>
                <option v-for="annee in anneesAcademiques" :key="annee.id" :value="annee.id">
                  {{ annee.code }}
                </option>
              </select>
            </div>

            <!-- Filtre par filière (sert uniquement à charger les classes) -->
            <div class="col-md-4">
              <label class="form-label">Filière</label>
              <select class="form-select" v-model="selectedFiliere">
                <option value="" disabled>Choisir une filière</option>
                <option v-for="filiere in filieres" :key="filiere.id" :value="filiere.id">
                  {{ filiere.code }}
                </option>
              </select>
            </div>

            <!-- Filtre par classe -->
            <div class="col-md-4">
              <label class="form-label">Classe</label>
              <select class="form-select" v-model="selectedClasse">
                <option value="" disabled>Choisir une classe</option>
                <option v-for="classe in classes" :key="classe.id" :value="classe.id">
                  {{ classe.code }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Table des étudiants -->
    <table class="table table-hover align-middle">
      <thead>
        <tr>
          <th>#</th>
          <th>Matricule</th>
          <th>Noms</th>
          <th>Prénoms</th>
          <th>Sexe</th>
          <th>Filière</th>
          <th>Classe</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(etudiant, index) in paginatedEtudiant" :key="etudiant.id">
          <td>{{ index + 1 }}</td>
          <td>{{ etudiant.matricule }}</td>
          <td>{{ etudiant.nom }}</td>
          <td>{{ etudiant.prenom }}</td>
          <td>{{ etudiant.sexe }}</td>
          <td>{{ etudiant.filiere }}</td>
          <td>{{ etudiant.classe }}</td>
          <td>
            <ItemActions :item="etudiant" etudiantRoute="/etudiant" />
          </td>
        </tr>
        <tr v-if="!loading && etudiants.length === 0">
          <td colspan="8" class="text-center py-4">
            <div class="d-flex flex-column align-items-center">
              <img src="/img/empty-box.svg" alt="Aucune donnée" class="mb-2" width="auto" />
              <div class="text-pr">Aucune donnée</div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination -->
    <Pagination
      v-model="currentPage"
      :items-per-page="itemsPerPage"
      :total-items="totalItems"
      @update:itemsPerPage="itemsPerPage = $event"
    />
  </div>
</template>
