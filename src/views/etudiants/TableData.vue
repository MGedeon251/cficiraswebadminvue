<script setup>
import { onMounted, ref, watch } from 'vue';
import {
  getAnneesAcademiques,
  getFilieres,
  getClasses,
  getFilieresByAnnee,
  getClassesByAnnee,
} from '@/api/academique/academiqueApi';
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

    anneesAcademiques.value = anneesResponse.data;
    filieres.value = filieresResponse.data;
    classes.value = classesResponse.data;
  } catch (error) {
    console.error('Erreur lors du chargement des données:', error);
  } finally {
    loading.value = false;
  }
});

// Charger les filières et classes lorsque l'année académique change
watch(selectedAnnee, async (newAnnee) => {
  if (newAnnee) {
    loading.value = true;
    try {
      const [filieresResponse, classesResponse] = await Promise.all([
        getFilieresByAnnee(newAnnee),
        getClassesByAnnee(newAnnee),
      ]);

      filieres.value = filieresResponse.data;
      classes.value = classesResponse.data;

      // Réinitialiser les sélections
      selectedFiliere.value = null;
      selectedClasse.value = null;
    } catch (error) {
      console.error('Erreur lors du chargement des filières/classes:', error);
    } finally {
      loading.value = false;
    }
  } else {
    filieres.value = [];
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
        <tr v-for="(etudiant, index) in etudiants" :key="etudiant.id">
          <td>{{ index + 1 }}</td>
          <td>{{ etudiant.matricule }}</td>
          <td>{{ etudiant.nom }}</td>
          <td>{{ etudiant.prenom }}</td>
          <td>{{ etudiant.sexe }}</td>
          <td>{{ etudiant.filiere.nom }}</td>
          <td>{{ etudiant.classe.nom }}</td>
        </tr>
        <tr v-if="!loading && etudiants.length === 0">
          <td colspan="7" class="text-center py-4">
            <div class="d-flex flex-column align-items-center">
              <img src="/img/empty-box.svg" alt="Aucune donnée" class="mb-2" width="auto" />
            </div>
            <div class="text-pr">Aucune donnée</div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped></style>
