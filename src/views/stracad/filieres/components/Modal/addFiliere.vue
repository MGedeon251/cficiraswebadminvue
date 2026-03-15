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
import { useFiliereStore } from '@/stores/academiqueStore/filiereStore';
import { useCycleStore } from '@/stores/academiqueStore/cycleStore';
import { useNotifier } from '@/stores/messages/useNotifier';

// Props & Emits
const props = defineProps({
  filiereToEdit: { type: Object, default: null },
});
const emit = defineEmits(['filiereCreated', 'filiereUpdated']);

// Stores
const filiereStore = useFiliereStore();
const cycleStore = useCycleStore();
const { notifyError } = useNotifier();

// États
const form = ref({
  code: '',
  designation: '',
  cycle_id: '',
  credit_total: '',
  description: '',
});
const cycles = ref([]);
const loading = ref(false);
const errorMessage = ref('');
const successMessage = ref('');
const isEdit = ref(false);

// Charger les cycles depuis le store
onMounted(async () => {
  await loadCycles();
});

// Fonction pour charger les cycles
const loadCycles = async () => {
  try {
    await cycleStore.fetchCycles();
    cycles.value = cycleStore.cycles; // récupérer la liste du store
  } catch (error) {
    notifyError('Impossible de charger les cycles disponibles.');
  }
};

// Watch pour l'édition
watch(
  () => props.filiereToEdit,
  (newVal) => {
    if (newVal) {
      isEdit.value = true;
      form.value = {
        code: newVal.code,
        designation: newVal.designation,
        cycle_id: newVal.cycle_id,
        credit_total: newVal.credit_total || null,
        description: newVal.description || null,
      };
    }
  },
  { immediate: true }
);

// Reset du formulaire
const resetForm = () => {
  form.value = { code: '', designation: '', cycle_id: '', credit_total: '' };
  errorMessage.value = '';
  successMessage.value = '';
  isEdit.value = false;
};

// Validation
const validateForm = () => {
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
  if (form.value.code.length > 10) {
    errorMessage.value = 'Le code ne doit pas dépasser 10 caractères.';
    return false;
  }
  if (form.value.designation.length > 100) {
    errorMessage.value = 'La désignation ne doit pas dépasser 100 caractères.';
    return false;
  }
  if (form.value.credit_total && form.value.credit_total < 0) {
    errorMessage.value = 'Les crédits totaux doivent être positifs.';
    return false;
  }

  errorMessage.value = '';
  return true;
};

// Soumission du formulaire
const submitFiliere = async () => {
  errorMessage.value = '';
  successMessage.value = '';

  if (!validateForm()) return;

  loading.value = true;

  const dataToSend = {
    code: form.value.code.trim().toUpperCase(),
    designation: form.value.designation.trim(),
    cycle_id: parseInt(form.value.cycle_id),
    credit_total: form.value.credit_total || null,
    description: form.value.description || null,
  };

  try {
    if (isEdit.value) {
      await filiereStore.editFiliere(props.filiereToEdit.id, dataToSend);
      successMessage.value = 'Filière modifiée avec succès !';
      emit('filiereUpdated', { id: props.filiereToEdit.id, ...dataToSend });
    } else {
      await filiereStore.addFiliere(dataToSend);
      successMessage.value = 'Filière créée avec succès !';
      emit('filiereCreated', dataToSend);
    }

    setTimeout(() => closeModal(), 1000);
  } catch (error) {
    errorMessage.value = error.message || "Erreur lors de l'enregistrement.";
    notifyError(errorMessage.value);
  } finally {
    loading.value = false;
  }
};

// Fermeture du modal
const closeModal = () => {
  const modalEl = document.getElementById('filiereModal');
  const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
  modal.hide();

  setTimeout(() => resetForm(), 300);
};

// Exposer méthodes
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
