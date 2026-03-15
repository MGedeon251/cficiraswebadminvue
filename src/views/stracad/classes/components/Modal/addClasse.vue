<template>
  <div
    class="modal fade"
    id="classeModal"
    tabindex="-1"
    aria-labelledby="classeModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-md">
      <div class="modal-content">
        <div class="modal-header bg-primary text-white">
          <h5 class="modal-title" id="classeModalLabel">
            {{ isEdit ? 'Modifier' : 'Ajouter' }} une classe
          </h5>
          <button
            type="button"
            class="btn-close btn-close-white"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>

        <div class="modal-body">
          <form @submit.prevent="submitClasse">
            <!-- Code -->
            <div class="mb-3">
              <label class="form-label">
                Code de la classe <span class="text-danger">*</span>
              </label>
              <input
                v-model="form.code"
                type="text"
                class="form-control"
                placeholder="Ex: L1-INFO, M2-GC"
                maxlength="10"
                required
              />
              <small class="text-muted">Code unique de la classe (max 10 caractères)</small>
            </div>

            <!-- Filière -->
            <div class="mb-3">
              <label class="form-label"> Filière <span class="text-danger">*</span> </label>
              <select
                v-model="form.filiere_id"
                class="form-select"
                @change="onFiliereChange"
                required
              >
                <option value="">-- Sélectionner une filière --</option>
                <option v-for="filiere in filieres" :key="filiere.id" :value="filiere.id">
                  {{ filiere.code }} - {{ filiere.designation }}
                  <span v-if="filiere.cycle">({{ filiere.cycle.code }})</span>
                </option>
              </select>
              <small class="text-muted">Choisir la filière à laquelle appartient la classe</small>
            </div>

            <!-- Niveau -->
            <div class="mb-3">
              <label class="form-label"> Niveau <span class="text-danger">*</span> </label>
              <select
                v-model="form.niveau_id"
                class="form-select"
                :disabled="!form.filiere_id"
                required
              >
                <option value="">-- Sélectionner un niveau --</option>
                <option v-for="niveau in filteredNiveaux" :key="niveau.id" :value="niveau.id">
                  {{ niveau.code }} - {{ niveau.designation }}
                </option>
              </select>
              <small class="text-muted">
                {{
                  form.filiere_id
                    ? 'Choisir le niveau de la classe'
                    : "Sélectionnez d'abord une filière"
                }}
              </small>
            </div>

            <!-- Capacité maximale -->
            <div class="mb-3">
              <label class="form-label"> Capacité maximale </label>
              <input
                v-model.number="form.capacite_max"
                type="number"
                class="form-control"
                placeholder="50"
                min="1"
              />
              <small class="text-muted">Nombre maximum d'étudiants pour cette classe</small>
            </div>
            <!-- Aperçu de la classe -->
            <div v-if="form.filiere_id && form.niveau_id" class="alert alert-info">
              <i class="mdi mdi-information-outline"></i>
              <strong>Aperçu :</strong>
              {{ getClassePreview() }}
            </div>

            <!-- Message d'erreur -->
            <div v-if="errorMessage" class="alert alert-danger" role="alert">
              <i class="mdi mdi-alert-circle"></i> {{ errorMessage }}
            </div>

            <!-- Message de succès -->
            <div v-if="successMessage" class="alert alert-success" role="alert">
              <i class="mdi mdi-check-circle"></i> {{ successMessage }}
            </div>
          </form>
        </div>

        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
            :disabled="loading"
          >
            <i class="mdi mdi-close"></i> Annuler
          </button>
          <button type="button" class="btn btn-primary" @click="submitClasse" :disabled="loading">
            <span
              v-if="loading"
              class="spinner-border spinner-border-sm me-2"
              role="status"
              aria-hidden="true"
            ></span>
            <i v-else class="mdi mdi-content-save"></i>
            {{ loading ? 'Enregistrement...' : 'Enregistrer' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';

// Props
const props = defineProps({
  classeToEdit: {
    type: Object,
    default: null,
  },
});

// Emits
const emit = defineEmits(['classeCreated', 'classeUpdated']);

// État
const form = ref({
  code: '',
  niveau_id: '',
  filiere_id: '',
  capacite_max: null,
  annee_academique_id: '',
  responsable: '',
  salle: '',
  effectif_actuel: 0,
  observations: '',
  est_active: true,
});

const filieres = ref([]);
const niveaux = ref([]);
const anneesAcademiques = ref([]);
const loading = ref(false);
const errorMessage = ref('');
const successMessage = ref('');
const isEdit = ref(false);

// Computed - Filtrer les niveaux selon la filière sélectionnée
const filteredNiveaux = computed(() => {
  if (!form.value.filiere_id) return [];

  // Trouver la filière sélectionnée
  const selectedFiliere = filieres.value.find((f) => f.id === form.value.filiere_id);
  if (!selectedFiliere || !selectedFiliere.cycle) return niveaux.value;

  // Filtrer les niveaux du même cycle
  return niveaux.value.filter((n) => n.cycle_id === selectedFiliere.cycle.id);
});

// Charger les données au montage
onMounted(async () => {
  await Promise.all([loadFilieres(), loadNiveaux(), loadAnneesAcademiques()]);
});

// Charger la liste des filières
const loadFilieres = async () => {
  try {
    // Simuler un appel API
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Exemple d'appel API réel (décommenter et adapter)
    /*
    const response = await fetch('/api/filieres', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    
    if (!response.ok) throw new Error('Erreur lors du chargement des filières');
    
    filieres.value = await response.json();
    */

    // Simulation de données
    filieres.value = [
      {
        id: 1,
        code: 'INFO',
        designation: 'Informatique',
        cycle: { id: 1, code: 'L', designation: 'Licence' },
      },
      {
        id: 2,
        code: 'GC',
        designation: 'Génie Civil',
        cycle: { id: 1, code: 'L', designation: 'Licence' },
      },
      {
        id: 3,
        code: 'IA',
        designation: 'Intelligence Artificielle',
        cycle: { id: 2, code: 'M', designation: 'Master' },
      },
    ];
  } catch (error) {
    console.error('Erreur lors du chargement des filières:', error);
    errorMessage.value = 'Impossible de charger les filières disponibles.';
  }
};

// Charger la liste des niveaux
const loadNiveaux = async () => {
  try {
    // Simuler un appel API
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Simulation de données
    niveaux.value = [
      { id: 1, code: 'L1', designation: 'Première année Licence', cycle_id: 1 },
      { id: 2, code: 'L2', designation: 'Deuxième année Licence', cycle_id: 1 },
      { id: 3, code: 'L3', designation: 'Troisième année Licence', cycle_id: 1 },
      { id: 4, code: 'M1', designation: 'Première année Master', cycle_id: 2 },
      { id: 5, code: 'M2', designation: 'Deuxième année Master', cycle_id: 2 },
    ];
  } catch (error) {
    console.error('Erreur lors du chargement des niveaux:', error);
    errorMessage.value = 'Impossible de charger les niveaux disponibles.';
  }
};

// Charger les années académiques
const loadAnneesAcademiques = async () => {
  try {
    // Simuler un appel API
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Simulation de données
    anneesAcademiques.value = [
      { id: 1, code: '2024-2025', est_active: true },
      { id: 2, code: '2023-2024', est_active: false },
    ];
  } catch (error) {
    console.error('Erreur lors du chargement des années académiques:', error);
  }
};

// Watch pour l'édition
watch(
  () => props.classeToEdit,
  (newVal) => {
    if (newVal) {
      isEdit.value = true;
      form.value = {
        id: newVal.id,
        code: newVal.code,
        niveau_id: newVal.niveau_id,
        filiere_id: newVal.filiere_id,
        capacite_max: newVal.capacite_max || null,
        annee_academique_id: newVal.annee_academique_id || '',
        responsable: newVal.responsable || '',
        salle: newVal.salle || '',
        effectif_actuel: newVal.effectif_actuel || 0,
        observations: newVal.observations || '',
        est_active: newVal.est_active !== undefined ? newVal.est_active : true,
      };
    }
  }
);

// Méthodes
const resetForm = () => {
  form.value = {
    code: '',
    niveau_id: '',
    filiere_id: '',
    capacite_max: null,
    annee_academique_id: '',
    responsable: '',
    salle: '',
    effectif_actuel: 0,
    observations: '',
    est_active: true,
  };
  errorMessage.value = '';
  successMessage.value = '';
  isEdit.value = false;
};

const onFiliereChange = () => {
  // Réinitialiser le niveau si la filière change
  form.value.niveau_id = '';
};

const getClassePreview = () => {
  const filiere = filieres.value.find((f) => f.id === form.value.filiere_id);
  const niveau = niveaux.value.find((n) => n.id === form.value.niveau_id);

  if (filiere && niveau) {
    return `${niveau.code} ${filiere.designation} (${filiere.cycle?.code || ''})`;
  }
  return '';
};

const validateForm = () => {
  // Vérifier les champs obligatoires
  if (!form.value.code.trim()) {
    errorMessage.value = 'Le code est obligatoire.';
    return false;
  }

  if (!form.value.filiere_id) {
    errorMessage.value = 'Veuillez sélectionner une filière.';
    return false;
  }

  if (!form.value.niveau_id) {
    errorMessage.value = 'Veuillez sélectionner un niveau.';
    return false;
  }

  // Vérifier la longueur du code
  if (form.value.code.length > 10) {
    errorMessage.value = 'Le code ne doit pas dépasser 10 caractères.';
    return false;
  }

  // Vérifier la capacité si renseignée
  if (form.value.capacite_max && form.value.capacite_max < 1) {
    errorMessage.value = 'La capacité maximale doit être supérieure à 0.';
    return false;
  }

  errorMessage.value = '';
  return true;
};

const submitClasse = async () => {
  // Réinitialiser les messages
  errorMessage.value = '';
  successMessage.value = '';

  // Validation
  if (!validateForm()) {
    return;
  }

  loading.value = true;

  try {
    // Préparer les données pour l'API (selon le schéma SQL)
    const dataToSend = {
      code: form.value.code.trim().toUpperCase(), // Normaliser en majuscules
      niveau_id: parseInt(form.value.niveau_id),
      filiere_id: parseInt(form.value.filiere_id),
      capacite_max: form.value.capacite_max || null,
    };

    // Ajouter les champs optionnels s'ils sont renseignés
    if (form.value.annee_academique_id)
      dataToSend.annee_academique_id = parseInt(form.value.annee_academique_id);
    if (form.value.responsable) dataToSend.responsable = form.value.responsable.trim();
    if (form.value.salle) dataToSend.salle = form.value.salle.trim();
    if (form.value.effectif_actuel) dataToSend.effectif_actuel = form.value.effectif_actuel;
    if (form.value.observations) dataToSend.observations = form.value.observations.trim();
    if (form.value.est_active !== undefined) dataToSend.est_active = form.value.est_active;

    // Simuler un appel API
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Exemple d'appel API réel (décommenter et adapter)
    /*
    const url = isEdit.value 
      ? `/api/classes/${form.value.id}` 
      : '/api/classes';
    
    const method = isEdit.value ? 'PUT' : 'POST';
    
    const response = await fetch(url, {
      method: method,
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(dataToSend),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erreur lors de l\'enregistrement');
    }

    const result = await response.json();
    */

    // Simulation de réponse
    const result = {
      ...dataToSend,
      id: isEdit.value ? form.value.id : Date.now(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    successMessage.value = isEdit.value
      ? 'Classe modifiée avec succès !'
      : 'Classe créée avec succès !';

    // Émettre l'événement
    if (isEdit.value) {
      emit('classeUpdated', result);
    } else {
      emit('classeCreated', result);
    }

    // Fermer le modal après 1 seconde
    setTimeout(() => {
      closeModal();
    }, 1000);
  } catch (error) {
    console.error('Erreur:', error);
    errorMessage.value = error.message || "Une erreur est survenue lors de l'enregistrement.";
  } finally {
    loading.value = false;
  }
};

const closeModal = () => {
  const modalEl = document.getElementById('classeModal');
  const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
  modal.hide();

  // Réinitialiser le formulaire après fermeture
  setTimeout(() => {
    resetForm();
  }, 300);
};

// Exposer les méthodes pour utilisation externe
defineExpose({
  resetForm,
  openForEdit: (classe) => {
    isEdit.value = true;
    form.value = { ...classe };
  },
});
</script>

<style scoped>
.modal-header.bg-primary {
  background-color: #007bff !important;
}

.modal-content {
  border-radius: 12px;
  border: none;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
}

.modal-header {
  border-bottom: 2px solid #e9ecef;
  padding: 1.25rem 1.5rem;
}

.modal-body {
  padding: 1.5rem;
  max-height: 70vh;
  overflow-y: auto;
}

.modal-footer {
  border-top: 2px solid #e9ecef;
  padding: 1rem 1.5rem;
}

.form-label {
  font-weight: 500;
  color: #495057;
  margin-bottom: 0.5rem;
}

.form-control:focus,
.form-select:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.form-check-input:checked {
  background-color: #007bff;
  border-color: #007bff;
}

.alert {
  border-radius: 8px;
  border: none;
}

.btn {
  border-radius: 6px;
  padding: 0.5rem 1.25rem;
  font-weight: 500;
}

.btn i {
  margin-right: 0.5rem;
}

.text-danger {
  color: #dc3545 !important;
}

.spinner-border-sm {
  width: 1rem;
  height: 1rem;
}

.bg-light {
  background-color: #f8f9fa !important;
}

h6 i {
  color: #007bff;
  margin-right: 0.5rem;
}

.form-select {
  cursor: pointer;
}

.form-select:disabled {
  background-color: #e9ecef;
  cursor: not-allowed;
}
</style>

<!-- Exemple d'utilisation dans le composant parent -->
<!--
<template>
  <div>
    <button 
      class="btn btn-primary" 
      data-bs-toggle="modal" 
      data-bs-target="#classeModal"
    >
      <i class="mdi mdi-plus"></i> Ajouter une classe
    </button>

    <AddClasse 
      @classeCreated="handleClasseCreated"
      @classeUpdated="handleClasseUpdated"
      :classeToEdit="selectedClasse"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import AddClasse from './AddClasse.vue';

const selectedClasse = ref(null);

const handleClasseCreated = (newClasse) => {
  console.log('Nouvelle classe créée:', newClasse);
  // Actualiser votre liste de classes
};

const handleClasseUpdated = (updatedClasse) => {
  console.log('Classe modifiée:', updatedClasse);
  // Actualiser votre liste de classes
};
</script>
-->
