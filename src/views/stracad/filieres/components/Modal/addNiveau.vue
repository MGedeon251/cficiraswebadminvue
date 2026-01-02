<template>
  <div
    class="modal fade"
    id="niveauModal"
    tabindex="-1"
    aria-labelledby="niveauModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-md">
      <div class="modal-content">
        <!-- Header -->
        <div class="modal-header bg-secondary text-white">
          <h5 class="modal-title" id="niveauModalLabel">
            {{ isEdit ? 'Modifier' : 'Ajouter' }} un niveau
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
          <form @submit.prevent="submitNiveau">
            <!-- Cycle -->
            <div class="mb-3">
              <label class="form-label"> Cycle <span class="text-danger">*</span> </label>
              <select v-model="form.cycle_id" class="form-select" required>
                <option value="">-- Sélectionner un cycle --</option>
                <option v-for="cycle in cycles" :key="cycle.id" :value="cycle.id">
                  {{ cycle.code }} - {{ cycle.designation }}
                </option>
              </select>
              <small class="text-muted"> Cycle auquel appartient le niveau </small>
            </div>

            <!-- Code -->
            <div class="mb-3">
              <label class="form-label"> Code du niveau <span class="text-danger">*</span> </label>
              <input
                v-model="form.code"
                type="text"
                class="form-control"
                placeholder="Ex: L1, L2, M1"
                maxlength="10"
                required
              />
              <small class="text-muted"> Code unique par cycle (max 10 caractères) </small>
            </div>

            <!-- Ordre -->
            <div class="mb-3">
              <label class="form-label"> Ordre <span class="text-danger">*</span> </label>
              <input
                v-model.number="form.ordre"
                type="number"
                class="form-control"
                min="1"
                placeholder="Ex: 1"
                required
              />
              <small class="text-muted"> Utilisé pour le tri des niveaux </small>
            </div>

            <!-- Frais -->
            <div class="mb-3">
              <label class="form-label"> Frais de scolarité </label>
              <input
                v-model.number="form.frais_scolarite"
                type="number"
                class="form-control"
                min="0"
                step="0.01"
                placeholder="Ex: 500000"
              />
              <small class="text-muted"> Montant en devise locale (optionnel) </small>
            </div>

            <!-- Aperçu -->
            <div v-if="form.cycle_id && form.code" class="alert alert-info">
              <strong>Aperçu :</strong> {{ getPreview() }}
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

          <button type="button" class="btn btn-primary" @click="submitNiveau" :disabled="loading">
            <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
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
import { useNiveauStore } from '@/stores/academiqueStore/niveauStore';
import { useCycleStore } from '@/stores/academiqueStore/cycleStore';
import { useNotifier } from '@/stores/messages/useNotifier';

/* Props & Emits */
const props = defineProps({ niveauToEdit: { type: Object, default: null } });
const emit = defineEmits(['niveauCreated', 'niveauUpdated']);

/* Stores */
const niveauStore = useNiveauStore();
const cycleStore = useCycleStore();
const { notifyError } = useNotifier();

/* State */
const form = ref({
  cycle_id: '',
  code: '',
  ordre: '',
  frais_scolarite: null,
});
const cycles = ref([]);
const loading = ref(false);
const errorMessage = ref('');
const successMessage = ref('');
const isEdit = ref(false);

/* Lifecycle */
onMounted(async () => {
  await loadCycles();
});

/* Charger cycles depuis le store */
const loadCycles = async () => {
  loading.value = true;
  try {
    await cycleStore.fetchCycles();
    cycles.value = cycleStore.cycles || [];
  } catch (error) {
    errorMessage.value = 'Impossible de charger les cycles.';
    notifyError(errorMessage.value);
  } finally {
    loading.value = false;
  }
};

/* Watch edit */
watch(
  () => props.niveauToEdit,
  (val) => {
    if (val) {
      isEdit.value = true;
      form.value = { ...val };
    }
  },
  { immediate: true }
);

/* Helpers */
const getPreview = () => {
  const cycle = cycles.value.find((c) => c.id === form.value.cycle_id);
  return cycle ? `${form.value.code} (${cycle.code})` : '';
};

/* Validation */
const validateForm = () => {
  if (!form.value.cycle_id) { errorMessage.value = 'Le cycle est obligatoire.'; return false; }
  if (!form.value.code.trim()) { errorMessage.value = 'Le code est obligatoire.'; return false; }
  if (!form.value.ordre || form.value.ordre < 1) { errorMessage.value = 'L’ordre doit être supérieur à 0.'; return false; }
  errorMessage.value = '';
  return true;
};

/* Submit */
const submitNiveau = async () => {
  errorMessage.value = '';
  successMessage.value = '';

  if (!validateForm()) return;

  loading.value = true;

  const payload = {
    cycle_id: parseInt(form.value.cycle_id),
    code: form.value.code.trim().toUpperCase(),
    ordre: parseInt(form.value.ordre),
    frais_scolarite: form.value.frais_scolarite ?? null,
  };

  try {
    if (isEdit.value) {
      await niveauStore.editNiveau(form.value.id, payload);
      successMessage.value = 'Niveau modifié avec succès.';
      emit('niveauUpdated', { id: form.value.id, ...payload });
    } else {
      await niveauStore.addNiveau(payload);
      successMessage.value = 'Niveau créé avec succès.';
      emit('niveauCreated', payload);
    }

    setTimeout(closeModal, 1000);
  } catch (error) {
    errorMessage.value = error.message || 'Erreur lors de l’enregistrement.';
    notifyError(errorMessage.value);
  } finally {
    loading.value = false;
  }
};

/* Modal control */
const closeModal = () => {
  const el = document.getElementById('niveauModal');
  const modal = bootstrap.Modal.getInstance(el) || new bootstrap.Modal(el);
  modal.hide();
  resetForm();
};

const resetForm = () => {
  form.value = {
    cycle_id: '',
    code: '',
    ordre: '',
    frais_scolarite: null,
  };
  isEdit.value = false;
  errorMessage.value = '';
  successMessage.value = '';
};

/* Expose */
defineExpose({
  resetForm,
  openForEdit: (niveau) => {
    isEdit.value = true;
    form.value = { ...niveau };
  },
});
</script>
