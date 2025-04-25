<script setup>
import { ref, onMounted, computed, watch } from 'vue';
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
const classes = ref([]);

const selectedAnnee = ref('');
const selectedFiliere = ref('');
const selectedClasse = ref('');

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

// Chargement initial
const fetchFilterData = async () => {
  isLoading.value = true;
  error.value = null;
  try {
    const responseAnnees = await getAnneesAcademiques();
    anneesAcademiques.value = responseAnnees;
  } catch (err) {
    error.value = 'Erreur lors du chargement des données';
    console.error(err);
  } finally {
    isLoading.value = false;
  }
};

// Chargement des filières selon l'année sélectionnée
const fetchFilieresByAnnee = async (anneeId) => {
  try {
    const response = await getFilieres(anneeId);
    filieres.value = response;
  } catch (err) {
    console.error('Erreur lors du chargement des filières', err);
  }
};

// Chargement des classes selon l'année et la filière sélectionnées
const fetchClassesByFiliereAndAnnee = async (filiereId, anneeId) => {
  try {
    const response = await getClasses(filiereId, anneeId);
    classes.value = response;
  } catch (err) {
    console.error('Erreur lors du chargement des classes', err);
  }
};

// Chargement des étudiants
const fetchEtudiants = async () => {
  isLoading.value = true;
  error.value = null;

  try {
    const response = await getEtudiantsByClasseFiliereAnnee(
      selectedClasse.value,
      selectedFiliere.value,
      selectedAnnee.value
    );
    etudiants.value = response;
  } catch (err) {
    error.value = 'Erreur lors du chargement des étudiants';
    console.error(err);
  } finally {
    isLoading.value = false;
  }
};

// Watchers
watch(selectedAnnee, async (newAnnee) => {
  if (newAnnee) {
    await fetchFilieresByAnnee(newAnnee);
    filieres.value = [];
    classes.value = [];
    selectedFiliere.value = '';
    selectedClasse.value = '';
    etudiants.value = [];
  }
});

watch(selectedFiliere, async (newFiliere) => {
  if (newFiliere && selectedAnnee.value) {
    await fetchClassesByFiliereAndAnnee(newFiliere, selectedAnnee.value);
    classes.value = [];
    selectedClasse.value = '';
    etudiants.value = [];
  }
});

watch([selectedClasse, selectedFiliere, selectedAnnee], () => {
  if (selectedClasse.value && selectedFiliere.value && selectedAnnee.value) {
    fetchEtudiants();
  }
});

onMounted(() => {
  fetchFilterData();
});
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
                <option
                  v-for="annee in anneesAcademiques"
                  :key="annee.id"
                  :value="annee.id"
                >
                  {{ annee.code }}
                </option>
              </select>
            </div>

            <!-- Filtre par filière -->
            <div class="col-md-6">
              <label class="form-label">Filière</label>
              <select class="form-select" v-model="selectedFiliere">
                <option value="" disabled>Choisir une filière</option>
                <option
                  v-for="filiere in filieres"
                  :key="filiere.id"
                  :value="filiere.id"
                >
                  {{ filiere.code }}
                </option>
              </select>
            </div>

            <!-- Filtre par classe -->
            <div class="col-md-6">
              <label class="form-label">Classe</label>
              <select class="form-select" v-model="selectedClasse">
                <option value="" disabled>Choisir une classe</option>
                <option
                  v-for="classe in classes"
                  :key="classe.id"
                  :value="classe.id"
                >
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
        <tr v-for="(etudiant, index) in paginatedEtudiant" :key="etudiant.id">
          <td>{{ index + 1 }}</td>
          <td>{{ etudiant.matricule }}</td>
          <td>{{ etudiant.nom }}</td>
          <td>{{ etudiant.prenom }}</td>
          <td>{{ etudiant.sexe }}</td>
          <td>{{ etudiant.filiere }}</td>
          <td>{{ etudiant.classe }}</td>
          <td>
            <ItemActions
              :item="etudiant"
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
</template>
