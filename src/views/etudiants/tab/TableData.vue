<script setup>
import { onMounted, ref, watch, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useAnneeStore } from '@/stores/academiqueStore/anneStore';
import { useFiliereStore } from '@/stores/academiqueStore/filiereStore';
import { useClasseStore } from '@/stores/academiqueStore/classeStore';
import { getEtudiantsByClasseFiliereAnnee } from '@/api/academique/etudiantApi';
import Pagination from '@/components/shared/Pagination.vue';
import ItemActions from '../details/ItemDetails.vue';
import SkeletonLoader from '@/components/SkeletonLoader.vue';

// Stores
const anneeStore = useAnneeStore();
const filiereStore = useFiliereStore();
const classeStore = useClasseStore();

// Références depuis les stores
const { anneesAcademiques, loading: loadingAnnees } = storeToRefs(anneeStore);
const { filieres, loading: loadingFilieres } = storeToRefs(filiereStore);
const { classes, loading: loadingClasses } = storeToRefs(classeStore);

// Filtres
const selectedAnnee = ref('');
const selectedFiliere = ref('');
const selectedClasse = ref('');

// Étudiants
const etudiants = ref([]);
const loading = ref(false);

// Pagination
const currentPage = ref(1);
const itemsPerPage = ref(5);
const totalItems = computed(() => etudiants.value.length);
const paginatedEtudiant = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return etudiants.value.slice(start, end);
});

// Initialiser les données
onMounted(async () => {
  await Promise.all([
    anneeStore.fetchAnneesAcademiques(),
    filiereStore.fetchFilieres(),
    classeStore.fetchClasses(),
  ]);
});

// Mettre à jour les classes selon la filière sélectionnée
watch(selectedFiliere, async (newFiliere) => {
  if (newFiliere) {
    await classeStore.fetchClassesByFiliere(newFiliere);
    selectedClasse.value = '';
  } else {
    classeStore.classes = [];
  }
});

// Filtrer les étudiants selon les critères
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

// Observer les changements de filtres
watch([selectedAnnee, selectedFiliere, selectedClasse], fetchFilteredEtudiants);

// Méthode exposée
const getTableData = () => etudiants.value;
defineExpose({ getTableData });
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
              <select class="form-select" v-model="selectedClasse" :disabled="!selectedFiliere">
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
        <tr v-if="!loading && Array.isArray(etudiants) && etudiants.length === 0">
          <td colspan="8" class="text-center py-4">
            <div class="d-flex flex-column align-items-center">
              <img src="/img/empty-box.svg" alt="Aucune donnée" class="mb-2" width="auto" />
            </div>
            <div class="text-pr">Aucune donnée</div>
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
