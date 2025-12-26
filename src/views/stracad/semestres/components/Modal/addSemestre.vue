<template>
  <div
    class="modal fade"
    id="semestreModal"
    tabindex="-1"
    aria-labelledby="semestreModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-md">
      <div class="modal-content">
        <!-- Header -->
        <div class="modal-header bg-primary text-white">
          <h5 class="modal-title" id="semestreModalLabel">
            {{ isEdit ? 'Modifier' : 'Ajouter' }} un semestre
          </h5>
          <button
            type="button"
            class="btn-close btn-close-white"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>

        <!-- Body -->
        <div class="modal-body">
          <form @submit.prevent="submitSemestre">
            <!-- Année académique -->
            <div class="mb-3">
              <label class="form-label">
                Année académique <span class="text-danger">*</span>
              </label>
              <select
                v-model="form.annee_id"
                class="form-select"
                required
              >
                <option value="">-- Sélectionner une année --</option>
                <option
                  v-for="annee in anneesAcademiques"
                  :key="annee.id"
                  :value="annee.id"
                >
                  {{ annee.code }}
                  <span v-if="annee.est_active"> (active)</span>
                </option>
              </select>
              <small class="text-muted">
                Année académique du semestre
              </small>
            </div>

            <!-- Code -->
            <div class="mb-3">
              <label class="form-label">
                Code du semestre <span class="text-danger">*</span>
              </label>
              <input
                v-model="form.code"
                type="text"
                class="form-control"
                placeholder="Ex: S1, S2"
                maxlength="10"
                required
              />
              <small class="text-muted">
                Code unique par année académique
              </small>
            </div>

            <!-- Dates -->
            <div class="row">
              <div class="col-md-6 mb-3">
                <label class="form-label">Date de début</label>
                <input
                  v-model="form.date_debut"
                  type="date"
                  class="form-control"
                />
              </div>

              <div class="col-md-6 mb-3">
                <label class="form-label">Date de fin</label>
                <input
                  v-model="form.date_fin"
                  type="date"
                  class="form-control"
                />
              </div>
            </div>

            <!-- Actif -->
            <div class="mb-3">
              <div class="d-flex align-items-start">
                <input
                  v-model="form.est_actif"
                  type="checkbox"
                  class="form-check-input mt-1 me-2"
                  id="actifCheck"
                />
                <label class="form-check-label" for="actifCheck">
                  <strong>Définir comme semestre actif</strong><br />
                  <small class="text-muted">
                    Un seul semestre actif par année académique
                  </small>
                </label>
              </div>
            </div>

            <!-- Aperçu -->
            <div v-if="form.annee_id && form.code" class="alert alert-info">
              <strong>Aperçu :</strong>
              {{ getPreview() }}
            </div>

            <!-- Erreur -->
            <div v-if="errorMessage" class="alert alert-danger">
              <i class="mdi mdi-alert-circle"></i> {{ errorMessage }}
            </div>

            <!-- Succès -->
            <div v-if="successMessage" class="alert alert-success">
              <i class="mdi mdi-check-circle"></i> {{ successMessage }}
            </div>
          </form>
        </div>

        <!-- Footer -->
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
            :disabled="loading"
          >
            <i class="mdi mdi-close"></i> Annuler
          </button>

          <button
            type="button"
            class="btn btn-primary"
            @click="submitSemestre"
            :disabled="loading"
          >
            <span
              v-if="loading"
              class="spinner-border spinner-border-sm me-2"
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
import { ref, onMounted, watch } from 'vue';

/* Props */
const props = defineProps({
  semestreToEdit: {
    type: Object,
    default: null
  }
});

/* Emits */
const emit = defineEmits(['semestreCreated', 'semestreUpdated']);

/* State */
const form = ref({
  annee_id: '',
  code: '',
  date_debut: '',
  date_fin: '',
  est_actif: false,
});

const anneesAcademiques = ref([]);
const loading = ref(false);
const errorMessage = ref('');
const successMessage = ref('');
const isEdit = ref(false);

/* Lifecycle */
onMounted(async () => {
  await loadAnneesAcademiques();
});

/* Load années */
const loadAnneesAcademiques = async () => {
  try {
    await new Promise(r => setTimeout(r, 400));

    anneesAcademiques.value = [
      { id: 1, code: '2024-2025', est_active: true },
      { id: 2, code: '2023-2024', est_active: false },
    ];
  } catch {
    errorMessage.value = 'Impossible de charger les années académiques.';
  }
};

/* Watch edit */
watch(() => props.semestreToEdit, (val) => {
  if (val) {
    isEdit.value = true;
    form.value = { ...val };
  }
});

/* Helpers */
const getPreview = () => {
  const annee = anneesAcademiques.value.find(a => a.id === form.value.annee_id);
  return annee ? `${form.value.code} - ${annee.code}` : '';
};

const validateForm = () => {
  if (!form.value.annee_id) {
    errorMessage.value = 'Veuillez sélectionner une année académique.';
    return false;
  }

  if (!form.value.code.trim()) {
    errorMessage.value = 'Le code du semestre est obligatoire.';
    return false;
  }

  if (form.value.date_debut && form.value.date_fin) {
    if (new Date(form.value.date_fin) <= new Date(form.value.date_debut)) {
      errorMessage.value = 'La date de fin doit être supérieure à la date de début.';
      return false;
    }
  }

  return true;
};

/* Submit */
const submitSemestre = async () => {
  errorMessage.value = '';
  successMessage.value = '';

  if (!validateForm()) return;

  loading.value = true;

  try {
    const payload = {
      annee_id: parseInt(form.value.annee_id),
      code: form.value.code.trim().toUpperCase(),
      date_debut: form.value.date_debut || null,
      date_fin: form.value.date_fin || null,
      est_actif: form.value.est_actif,
    };

    await new Promise(r => setTimeout(r, 1200));

    const result = {
      ...payload,
      id: isEdit.value ? form.value.id : Date.now(),
    };

    successMessage.value = isEdit.value
      ? 'Semestre modifié avec succès.'
      : 'Semestre créé avec succès.';

    emit(isEdit.value ? 'semestreUpdated' : 'semestreCreated', result);

    setTimeout(closeModal, 1000);

  } catch (e) {
    errorMessage.value = 'Erreur lors de l’enregistrement.';
  } finally {
    loading.value = false;
  }
};

/* Modal control */
const closeModal = () => {
  const el = document.getElementById('semestreModal');
  const modal = bootstrap.Modal.getInstance(el) || new bootstrap.Modal(el);
  modal.hide();
  resetForm();
};

const resetForm = () => {
  form.value = {
    annee_id: '',
    code: '',
    date_debut: '',
    date_fin: '',
    est_actif: false,
  };
  isEdit.value = false;
  errorMessage.value = '';
  successMessage.value = '';
};

/* Expose */
defineExpose({
  resetForm,
  openForEdit: (semestre) => {
    isEdit.value = true;
    form.value = { ...semestre };
  }
});
</script>
