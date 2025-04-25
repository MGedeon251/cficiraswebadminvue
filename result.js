
import { ref, onMounted, computed } from 'vue';
import {
  getAnneesAcademiques,
  getFilieres,
  getClasses,
} from '@/api/academique/academiqueApi';
import Pagination from '@/components/shared/Pagination.vue';
import ItemActions from '@/components/ItemActions.vue';

const etudiants = ref([]);
const anneesAcademiques = ref([]);
const filieres = ref([]);
const classes = ref([]);// Données principales

const selectedAnnee = ref(null);
const selectedFiliere = ref(null);
const selectedClasse = ref(null);

const loading = ref(true);
const isLoading = ref(false);
const error = ref(null);

const currentPage = ref(1);
const itemsPerPage = ref(5);
const totalItems = computed(() => modules.value.length);
const paginatedModules = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return modules.value.slice(start, end);
});


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
onMounted(fetchFilterData);

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
      console.log('Annee:',etudiants.value);
  
    } catch (err) {
      error.value = 'Erreur lors du chargement des modules';
      console.error(err);
    } finally {
      isLoading.value = false;
    }
  };


onMounted(
    fetchFilterData,
    fetchEtudiants
);
const editModule = (item) => {
  console.log('Modifier module', item);
};
const confirmDelete = (item) => {
  console.log('Supprimer module', item);
};
