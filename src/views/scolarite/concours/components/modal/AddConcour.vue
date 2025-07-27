<template>
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Ouverture d'un concours</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="submitConcour">
            <div class="mb-3">
              <label class="form-label">Désignation</label>
              <input v-model="form.designation" type="text" class="form-control" required />
            </div>

            <div class="mb-3">
              <label class="form-label">Type concours</label>
              <select v-model="form.type_concours" class="form-select" required>
                <option value="">Sélectionner</option>
                <option v-for="type in typesConcours" :key="type.id" :value="type.code">
                  {{ type.libelle }}
                </option>
              </select>
            </div>

            <div class="mb-3">
              <label class="form-label">Date début</label>
              <input v-model="form.date_debut" type="date" class="form-control" required />
            </div>

            <div class="mb-3">
              <label class="form-label">Date fin</label>
              <input v-model="form.date_fin" type="date" class="form-control" required />
            </div>

            <div class="mb-3">
              <label class="form-label">Date limite dossier</label>
              <input
                v-model="form.date_limite_dossier"
                type="date"
                class="form-control"
                required
              />
              <div v-if="dateLimiteError" class="text-danger mt-1">
                La date limite de dossier doit être strictement avant la date début et la date fin du concours.
              </div>
            </div>

            <div class="mb-3">
              <label class="form-label">Année académique</label>
              <select v-model="form.annee_id" class="form-select" required>
                <option value="">Sélectionner</option>
                <option v-for="annee in anneesAcademiques" :key="annee.id" :value="annee.id">
                  {{ annee.code }}
                </option>
              </select>
            </div>

            <div class="mb-3">
              <label class="form-label">Dossier requis</label>
              <select v-model="form.dossier_requis" class="form-select" required>
                <option value="">Sélectionner</option>
                <option value="oui">Oui</option>
                <option value="non">Non</option>
              </select>
            </div>

            <div class="mb-3">
              <label class="form-label">Statut</label>
              <select v-model="form.statut" class="form-select" required>
                <option value="">Sélectionner</option>
                <option value="ouvert">Ouvert</option>
                <option value="fermé">Fermé</option>
                <option value="planifie">En attente</option>
              </select>
            </div>

            <div class="mb-3">
              <label class="form-label">Description</label>
              <textarea v-model="form.description" class="form-control" rows="2"></textarea>
            </div>

            <div class="modal-footer">
              <button type="submit" class="btn btn-success" :disabled="loading || dateLimiteError">
                <span v-if="loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                {{ loading ? 'En cours...' : 'Submit' }}
              </button>
              <button type="button" class="btn btn-light" data-bs-dismiss="modal">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, computed } from 'vue';
import { concoursStore } from '@/stores/scolarite/concours/concoursStore.js';
import { anneeStore } from '@/stores/scolarite/concours/anneeStore.js';
import { typesConcoursStore } from '@/stores/scolarite/concours/typesConcoursStore.js';
import { generateId } from '@/stores/scolarite/concours/utils.js';

const loading = ref(false);
const anneesAcademiques = ref([]);
const typesConcours = ref([]);

const form = ref({
  designation: '',
  type_concours: '',
  date_debut: '',
  date_fin: '',
  date_limite_dossier: '',
  annee_id: '',
  dossier_requis: '',
  statut: '',
  description: '',
});

const dateLimiteError = ref(false);

onMounted(() => {
  anneesAcademiques.value = anneeStore.getAll();
  typesConcours.value = typesConcoursStore.getAll();
});

watch(
  () => [form.value.date_limite_dossier, form.value.date_debut, form.value.date_fin],
  ([limite, debut, fin]) => {
    if (limite && debut && fin) {
      dateLimiteError.value = !(
        limite < debut && limite < fin && limite !== debut && limite !== fin
      );
    } else {
      dateLimiteError.value = false;
    }
  }
);

const selectedAnnee = computed(() => {
  return anneesAcademiques.value.find(a => a.id === form.value.annee_id) || {};
});

async function submitConcour() {
  if (dateLimiteError.value) return;
  loading.value = true;

  try {
    const newConcours = {
      id: generateId(),
      designation: form.value.designation,
      type_code: form.value.type_concours,
      date_debut: form.value.date_debut,
      date_fin: form.value.date_fin,
      date_limite_dossier: form.value.date_limite_dossier,
      annee_id: form.value.annee_id,
      annee_data: selectedAnnee.value,
      dossier_requis: form.value.dossier_requis,
      statut: form.value.statut,
      description: form.value.description,
    };

    concoursStore.add(newConcours);

    form.value = {
      designation: '',
      type_concours: '',
      date_debut: '',
      date_fin: '',
      date_limite_dossier: '',
      annee_id: '',
      dossier_requis: '',
      statut: '',
      description: '',
    };

    const modal = bootstrap.Modal.getInstance(document.getElementById('exampleModal'));
    if (modal) modal.hide();

    alert('Concours ajouté avec succès !');
  } catch (error) {
    console.error("Erreur lors de l'ajout du concours :", error);
  } finally {
    loading.value = false;
  }
}
</script>
