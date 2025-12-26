<template>
  <div
    class="modal fade"
    id="filiereModal"
    tabindex="-1"
    aria-labelledby="filiereModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-md">
      <div class="modal-content">
        <div class="modal-header bg-primary text-white">
          <h5 class="modal-title" id="filiereModalLabel">
            {{ isEdit ? 'Modifier' : 'Ajouter' }} une filière
          </h5>
          <button
            type="button"
            class="btn-close btn-close-white"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>

        <div class="modal-body">
          <form @submit.prevent="submitFiliere">
            <!-- Code -->
            <div class="mb-3">
              <label class="form-label"> Code <span class="text-danger">*</span> </label>
              <input
                v-model="form.code"
                type="text"
                class="form-control"
                placeholder="Ex: INFO, GC, ELEC"
                maxlength="10"
                required
              />
              <small class="text-muted">Code unique de la filière (max 10 caractères)</small>
            </div>

            <!-- Désignation -->
            <div class="mb-3">
              <label class="form-label"> Désignation <span class="text-danger">*</span> </label>
              <input
                v-model="form.designation"
                type="text"
                class="form-control"
                placeholder="Ex: Informatique, Génie Civil"
                maxlength="100"
                required
              />
              <small class="text-muted">Nom complet de la filière</small>
            </div>
            <div class="mb-3">
              <label class="form-label"> Cycle <span class="text-danger">*</span> </label>
              <select v-model="form.cycle_id" class="form-select" required>
                <option value="">-- Sélectionner un cycle --</option>
                <option v-for="cycle in cycles" :key="cycle.id" :value="cycle.id">
                  {{ cycle.code }} - {{ cycle.designation }}
                </option>
              </select>
              <small class="text-muted">Rattacher la filière à un cycle d'études</small>
            </div>
            <!-- Informations supplémentaires (optionnelles) -->
            <div class="p-3 bg-light rounded mb-3">
              <h6 class="mb-3"><i class="mdi mdi-information"></i> Informations complémentaires</h6>
              <div class="row">
                <!-- Crédits totaux -->
                <div class="mb-3">
                  <label class="form-label"> Crédits totaux (ECTS) </label>
                  <input
                    v-model.number="form.credit_total"
                    type="number"
                    class="form-control"
                    placeholder="180"
                    min="0"
                  />
                  <small class="text-muted"
                    >Nombre total de crédits ECTS pour obtenir le diplôme</small
                  >
                </div>

                <div class="col-md-12 mb-3">
                  <label class="form-label">Description</label>
                  <textarea
                    v-model="form.description"
                    class="form-control"
                    rows="3"
                    placeholder="Description de la filière, objectifs, débouchés..."
                  ></textarea>
                </div>
              </div>
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
          <button type="button" class="btn btn-primary" @click="submitFiliere" :disabled="loading">
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
import { ref, watch, onMounted } from 'vue';

// Props
const props = defineProps({
  filiereToEdit: {
    type: Object,
    default: null,
  },
});

// Emits
const emit = defineEmits(['filiereCreated', 'filiereUpdated']);

// État
const form = ref({
  code: '',
  designation: '',
  cycle_id: '',
  credit_total: null,
  departement: '',
  coordonnateur: '',
  capacite: null,
  type_formation: '',
  description: '',
  est_active: true,
});

const cycles = ref([]);
const loading = ref(false);
const errorMessage = ref('');
const successMessage = ref('');
const isEdit = ref(false);

// Charger les cycles disponibles au montage
onMounted(async () => {
  await loadCycles();
});

// Charger la liste des cycles
const loadCycles = async () => {
  try {
    // Simuler un appel API
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Exemple d'appel API réel (décommenter et adapter)
    /*
    const response = await fetch('/api/cycles', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    
    if (!response.ok) throw new Error('Erreur lors du chargement des cycles');
    
    cycles.value = await response.json();
    */

    // Simulation de données
    cycles.value = [
      { id: 1, code: 'L', designation: 'Licence' },
      { id: 2, code: 'M', designation: 'Master' },
      { id: 3, code: 'D', designation: 'Doctorat' },
    ];
  } catch (error) {
    console.error('Erreur lors du chargement des cycles:', error);
    errorMessage.value = 'Impossible de charger les cycles disponibles.';
  }
};

// Watch pour l'édition
watch(
  () => props.filiereToEdit,
  (newVal) => {
    if (newVal) {
      isEdit.value = true;
      form.value = {
        id: newVal.id,
        code: newVal.code,
        designation: newVal.designation,
        cycle_id: newVal.cycle_id,
        credit_total: newVal.credit_total || null,
        departement: newVal.departement || '',
        coordonnateur: newVal.coordonnateur || '',
        capacite: newVal.capacite || null,
        type_formation: newVal.type_formation || '',
        description: newVal.description || '',
        est_active: newVal.est_active !== undefined ? newVal.est_active : true,
      };
    }
  }
);

// Méthodes
const resetForm = () => {
  form.value = {
    code: '',
    designation: '',
    cycle_id: '',
    credit_total: null,
    departement: '',
    coordonnateur: '',
    capacite: null,
    type_formation: '',
    description: '',
    est_active: true,
  };
  errorMessage.value = '';
  successMessage.value = '';
  isEdit.value = false;
};

const validateForm = () => {
  // Vérifier les champs obligatoires
  if (!form.value.code.trim()) {
    errorMessage.value = 'Le code est obligatoire.';
    return false;
  }

  if (!form.value.designation.trim()) {
    errorMessage.value = 'La désignation est obligatoire.';
    return false;
  }

  if (!form.value.cycle_id) {
    errorMessage.value = 'Veuillez sélectionner un cycle.';
    return false;
  }

  // Vérifier la longueur du code
  if (form.value.code.length > 10) {
    errorMessage.value = 'Le code ne doit pas dépasser 10 caractères.';
    return false;
  }

  // Vérifier la longueur de la désignation
  if (form.value.designation.length > 100) {
    errorMessage.value = 'La désignation ne doit pas dépasser 100 caractères.';
    return false;
  }

  // Vérifier que les crédits sont positifs si renseignés
  if (form.value.credit_total && form.value.credit_total < 0) {
    errorMessage.value = 'Les crédits totaux doivent être positifs.';
    return false;
  }

  errorMessage.value = '';
  return true;
};

const submitFiliere = async () => {
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
      designation: form.value.designation.trim(),
      cycle_id: parseInt(form.value.cycle_id),
      credit_total: form.value.credit_total || null,
    };

    // Ajouter les champs optionnels s'ils sont renseignés
    if (form.value.departement) dataToSend.departement = form.value.departement.trim();
    if (form.value.coordonnateur) dataToSend.coordonnateur = form.value.coordonnateur.trim();
    if (form.value.capacite) dataToSend.capacite = form.value.capacite;
    if (form.value.type_formation) dataToSend.type_formation = form.value.type_formation;
    if (form.value.description) dataToSend.description = form.value.description.trim();
    if (form.value.est_active !== undefined) dataToSend.est_active = form.value.est_active;

    // Simuler un appel API
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Exemple d'appel API réel (décommenter et adapter)
    /*
    const url = isEdit.value 
      ? `/api/filieres/${form.value.id}` 
      : '/api/filieres';
    
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
      ? 'Filière modifiée avec succès !'
      : 'Filière créée avec succès !';

    // Émettre l'événement
    if (isEdit.value) {
      emit('filiereUpdated', result);
    } else {
      emit('filiereCreated', result);
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
  const modalEl = document.getElementById('filiereModal');
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
  openForEdit: (filiere) => {
    isEdit.value = true;
    form.value = { ...filiere };
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
</style>

<!-- Exemple d'utilisation dans le composant parent -->
<!--
<template>
  <div>
    <button 
      class="btn btn-primary" 
      data-bs-toggle="modal" 
      data-bs-target="#filiereModal"
    >
      <i class="mdi mdi-plus"></i> Ajouter une filière
    </button>

    <AddFiliere 
      @filiereCreated="handleFiliereCreated"
      @filiereUpdated="handleFiliereUpdated"
      :filiereToEdit="selectedFiliere"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import AddFiliere from './AddFiliere.vue';

const selectedFiliere = ref(null);

const handleFiliereCreated = (newFiliere) => {
  console.log('Nouvelle filière créée:', newFiliere);
  // Actualiser votre liste de filières
  // Ex: refreshFilieresList();
};

const handleFiliereUpdated = (updatedFiliere) => {
  console.log('Filière modifiée:', updatedFiliere);
  // Actualiser votre liste de filières
};

// Pour éditer une filière
const editFiliere = (filiere) => {
  selectedFiliere.value = filiere;
  const modalEl = document.getElementById('filiereModal');
  const modal = new bootstrap.Modal(modalEl);
  modal.show();
};
</script>
-->
