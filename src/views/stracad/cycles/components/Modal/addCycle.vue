<template>
  <div
    class="modal fade"
    id="cycleModal"
    tabindex="-1"
    aria-labelledby="cycleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-md">
      <div class="modal-content">
        <div class="modal-header bg-primary text-white">
          <h5 class="modal-title" id="cycleModalLabel">
            {{ isEdit ? 'Modifier' : 'Ajouter' }} un cycle
          </h5>
          <button
            type="button"
            class="btn-close btn-close-white"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>

        <div class="modal-body">
          <form @submit.prevent="submitCycle">
            <!-- Code -->
            <div class="mb-3">
              <label class="form-label"> Code <span class="text-danger">*</span> </label>
              <input
                v-model="form.code"
                type="text"
                class="form-control"
                placeholder="Ex: L, M, D"
                maxlength="10"
                required
              />
              <small class="text-muted">Code unique du cycle (max 10 caractères)</small>
            </div>

            <!-- Désignation -->
            <div class="mb-3">
              <label class="form-label"> Désignation <span class="text-danger">*</span> </label>
              <input
                v-model="form.designation"
                type="text"
                class="form-control"
                placeholder="Ex: Licence, Master, Doctorat"
                maxlength="100"
                required
              />
              <small class="text-muted">Nom complet du cycle</small>
            </div>

            <!-- Description -->
            <div class="mb-3">
              <label class="form-label">Description (optionnel)</label>
              <textarea
                v-model="form.description"
                class="form-control"
                rows="4"
                placeholder="Description détaillée du cycle d'études..."
              ></textarea>
              <small class="text-muted">
                Ex: Objectifs, durée, diplômes délivrés, conditions d'accès, etc.
              </small>
            </div>

            <!-- Informations supplémentaires (optionnelles) -->
            <div class="p-3 bg-light rounded mb-3">
              <h6 class="mb-3"><i class="mdi mdi-information"></i> Informations complémentaires</h6>
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label class="form-label">Durée (années)</label>
                  <input
                    v-model.number="form.duree_annees"
                    type="number"
                    class="form-control"
                    placeholder="3"
                    min="1"
                    max="10"
                  />
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label">Crédits ECTS</label>
                  <input
                    v-model.number="form.credits_total"
                    type="number"
                    class="form-control"
                    placeholder="180"
                    min="0"
                  />
                </div>
                <div class="col-md-12 mb-3">
                  <label class="form-label">Diplôme délivré</label>
                  <input
                    v-model="form.diplome"
                    type="text"
                    class="form-control"
                    placeholder="Ex: Licence (BAC+3)"
                  />
                </div>
                <div class="col-md-12">
                  <div class="form-check">
                    <input
                      v-model="form.est_actif"
                      type="checkbox"
                      class="form-check-input"
                      id="actifCheck"
                    />
                    <label class="form-check-label" for="actifCheck">
                      <strong>Cycle actif</strong>
                      <small class="text-muted d-block">
                        Permet les inscriptions et la gestion des étudiants
                      </small>
                    </label>
                  </div>
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
          <button type="button" class="btn btn-primary" @click="submitCycle" :disabled="loading">
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
import { ref, watch } from 'vue';
import { useCycleStore } from '@/stores/academiqueStore/cycleStore';

const cycleStore = useCycleStore();


// Props
const props = defineProps({
  cycleToEdit: {
    type: Object,
    default: null,
  },
});

// Emits
const emit = defineEmits(['cycleCreated', 'cycleUpdated']);

// État
const form = ref({
  code: '',
  designation: '',
  description: '',
  duree_annees: '',
  credits_total: '',
  diplome: '',
  est_actif: true,
});

const loading = ref(false);
const errorMessage = ref('');
const successMessage = ref('');
const isEdit = ref(false);

// Watch pour l'édition
watch(
  () => props.cycleToEdit,
  (newVal) => {
    if (!newVal) return;

    isEdit.value = true;
    form.value = {
      id: newVal.id,
      code: newVal.code,
      designation: newVal.designation,
      description: newVal.description ?? '',
      diplome: newVal.diplome ?? '',
      duree_annees: newVal.duree_annees ?? null,
      credits_total: newVal.credits_total ?? null,
      statut: newVal.statut === true || newVal.statut === 'true',
    };
  },
  { immediate: true }
);


// Méthodes
const resetForm = () => {
  form.value = {
    code: '',
    designation: '',
    description: '',
    duree_annees: null,
    credits_total: null,
    diplome: '',
    statut: true,
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

  errorMessage.value = '';
  return true;
};

const submitCycle = async () => {
  errorMessage.value = '';
  successMessage.value = '';

  if (!validateForm()) {
    return;
  }

  loading.value = true;

  try {
    const dataToSend = {
      code: form.value.code.trim().toUpperCase(),
      designation: form.value.designation.trim(),
      description: form.value.description || null,
      diplome: form.value.diplome || null,
      duree_annees: form.value.duree_annees,
      credits_total: form.value.credits_total,
      statut: form.value.statut,
};


    if (isEdit.value) {
      await cycleStore.editCycle(form.value.id, dataToSend);
      successMessage.value = 'Cycle modifié avec succès !';
      emit('cycleUpdated', { ...dataToSend, id: form.value.id });
    } else {
      await cycleStore.addCycle(dataToSend);
      successMessage.value = 'Cycle créé avec succès !';
      emit('cycleCreated', { ...dataToSend });
    }

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
  const modalEl = document.getElementById('cycleModal');
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
  openForEdit: (cycle) => {
    isEdit.value = true;
    form.value = { ...cycle };
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

.form-control:focus {
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
</style>

<!-- Exemple d'utilisation dans le composant parent -->
<!--
<template>
  <div>
    <button 
      class="btn btn-primary" 
      data-bs-toggle="modal" 
      data-bs-target="#cycleModal"
    >
      <i class="mdi mdi-plus"></i> Ajouter un cycle
    </button>

    <AddCycle 
      @cycleCreated="handleCycleCreated"
      @cycleUpdated="handleCycleUpdated"
      :cycleToEdit="selectedCycle"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import AddCycle from './AddCycle.vue';

const selectedCycle = ref(null);

const handleCycleCreated = (newCycle) => {
  console.log('Nouveau cycle créé:', newCycle);
  // Actualiser votre liste de cycles
  // Ex: refreshCyclesList();
};

const handleCycleUpdated = (updatedCycle) => {
  console.log('Cycle modifié:', updatedCycle);
  // Actualiser votre liste de cycles
};

// Pour éditer un cycle
const editCycle = (cycle) => {
  selectedCycle.value = cycle;
  const modalEl = document.getElementById('cycleModal');
  const modal = new bootstrap.Modal(modalEl);
  modal.show();
};
</script>
-->
