<script setup>
import { onMounted, ref } from "vue";
import { useEtudiantStore } from "@/stores/etudiants/etudiantStore";
import SkeletonLoader from "@/components/SkeletonLoader.vue";

// Initialisation du store
const etudiantStore = useEtudiantStore();

// Références pour les données
const etudiants = ref([]);
const anneesAcademiques = ref([]);
const filieres = ref([]);
const classes = ref([]);
const loading = ref(false);

// Charger les données au montage du composant
onMounted(async () => {
  loading.value = true;
  try {
    await etudiantStore.fetchEtudiants();
    await etudiantStore.fetchAnneesAcademiques();
    await etudiantStore.fetchFilieres();
    await etudiantStore.fetchClasses();

    // Assignation des données du store aux références locales
    etudiants.value = etudiantStore.etudiants;
    anneesAcademiques.value = etudiantStore.anneesAcademiques;
    filieres.value = etudiantStore.filieres;
    classes.value = etudiantStore.classes;
  } finally {
    loading.value = false;
  }
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
              <label class="form-label">Année</label>
              <select class="form-select">
                <option v-for="annee in anneesAcademiques" :key="annee.id" :value="annee.id">
                  {{ annee.nom }}
                </option>
              </select>
            </div>

            <!-- Filtre par filière -->
            <div class="col-md-6">
              <label class="form-label">Filière</label>
              <select class="form-select">
                <option v-for="filiere in filieres" :key="filiere.id" :value="filiere.id">
                  {{ filiere.nom }}
                </option>
              </select>
            </div>

            <!-- Filtre par classe -->
            <div class="col-md-6">
              <label class="form-label">Classe</label>
              <select class="form-select">
                <option v-for="classe in classes" :key="classe.id" :value="classe.id">
                  {{ classe.nom }}
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
        <tr v-if="etudiants.length === 0">
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

<style scoped>

</style>