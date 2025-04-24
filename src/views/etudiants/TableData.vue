<script setup>
import { ref, onMounted, computed } from 'vue';
import {
  getAnneesAcademiques,
  getFilieres,
  getClasses,
} from '@/api/academique/academiqueApi';
import { getEtudiantsByClasseFiliereAnnee } from '@/api/academique/etudiantApi';
import Pagination from '@/components/shared/Pagination.vue';
import ItemActions from '@/components/ItemActions.vue';

// Données principales
const etudiants = ref([]);
const anneesAcademiques = ref([]);
const filieres = ref([]);
const classes = ref([]);// Données principales

const selectedAnnee = ref(null);
const selectedFiliere = ref(null);
const selectedClasse = ref(null);

const isLoading = ref(false);
const error = ref(null);

const currentPage = ref(1);
const itemsPerPage = ref(5);
const totalItems = computed(() => etudiants.value.length);
const paginatedEtudiant = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return etudiants.value.slice(start, end);
});

const editModule = (item) => {
  console.log('Modifier module', item);
};
const confirmDelete = (item) => {
  console.log('Supprimer module', item);
};


const fetchFilterData = async () => {
  isLoading.value = true;
  error.value = null;

  try {
    const responseAnnees = await getAnneesAcademiques();
    anneesAcademiques.value = responseAnnees ; 
    const responseFilieres = await getFilieres();
    filieres.value = responseFilieres ;
    const responseClasses = await getClasses();
    classes.value = responseClasses ;

    console.log('Annee:', anneesAcademiques.value);
    console.log('Filiere:',filieres.value);
    console.log('Classes:', classes.value);

  } catch (err) {
    error.value = 'Erreur lors du chargement des modules';
    console.error(err);
  } finally {
    isLoading.value = false;
  }
};
const fetchEtudiants = async () => {
    isLoading.value = true;
    error.value = null;
  
    try {
      const response = await getEtudiantsByClasseFiliereAnnee(
        selectedClasse,
        selectedFiliere,
        selectedAnnee
      );
      etudiants.value = response ; 
      console.log('Etudiants:',  etudiants.value);
  
    } catch (err) {
      error.value = 'Erreur lors du chargement des modules';
      console.error(err);
    } finally {
      isLoading.value = false;
    }
  };
onMounted(
  fetchFilterData);

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
            <div class="col-md-6">
              <label class="form-label">Année académique</label>
              <select class="form-select" v-model="selectedAnnee">
                <option value="" disabled>Choisir une année</option>
                <option v-for="annee in anneesAcademiques" :key="annee.id" :value="annee.id">
                  {{ annee.code }}
                </option>
              </select>
            </div>

            <!-- Filtre par filière -->
            <div class="col-md-6">
              <label class="form-label">Filière</label>
              <select class="form-select" v-model="selectedFiliere">
                <option value="" disabled>Choisir une filière</option>
                <option v-for="filiere in filieres" :key="filiere.id" :value="filiere.id">
                  {{ filiere.code }}
                </option>
              </select>
            </div>

            <!-- Filtre par classe -->
            <div class="col-md-6">
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
        </tr>
      </thead>
      <tbody>
        <tr v-for="etudiant in paginatedEtudiant" :key="etudiant.id">
          <td>{{ index + 1 }}</td>
          <td>{{ etudiant.matricule }}</td>
          <td>{{ etudiant.nom }}</td>
          <td>{{ etudiant.prenom }}</td>
          <td>{{ etudiant.sexe }}</td>
          <td>{{ etudiant.filiere.nom }}</td>
          <td>{{ etudiant.classe.nom }}</td>
          <td>
            <ItemActions
              :item="module"
              :fields="{
                code: 'Code',
                designation: 'Désignation',
                credit: 'Crédit',
                coefficient: 'Coefficient',
                volume_horaire: 'Volume horaire',
              }"
              :showAdd="false"
              editModalTarget="#editModuleModal"
              @edit="editModule"
              @delete="confirmDelete"
            />
          </td>-
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
</template>

<style scoped></style>
