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
          <h5 class="modal-title" id="exampleModalLabel">Ouverture d'un concour</h5>
          <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
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
                <option value="ENTREE">ENTRE</option>
                <option value="PASSERELLE">PASSERELLE</option>
                <option value="SPECIAL">SPECIAL</option>
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
              <input v-model="form.date_limite_inscription" type="date" class="form-control" required />
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
              <button type="submit" class="btn btn-success" :disabled="loading">
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
import { ref, onMounted } from 'vue';
import { useConcourStore } from '@/stores/gestionStores/concourStore';
import { useAnneeStore } from '@/stores/academiqueStore/anneStore';

const concourStore = useConcourStore();
const anneeStore = useAnneeStore();

const loading = ref(false);
const anneesAcademiques = ref([]);

const form = ref({
  designation: '',
  type_concours: '',
  date_debut: '',
  date_fin: '',
  date_limite_dossier: '',
  annee_academique_id: '',
  statut: '',
  description: '',
});

// Charger les années académiques au montage du composant
onMounted(async () => {
  try {
    await anneeStore.fetchAnneesAcademiques();
    anneesAcademiques.value = anneeStore.anneesAcademiques;
  } catch (error) {
    console.error("Erreur lors du chargement des années académiques", error);
  }
});

async function submitConcour() {
  loading.value = true;
  try {
    await concourStore.addConcours(form.value);
    // Réinitialiser le formulaire après succès
    form.value = {
      designation: '',
      type_concours: '',
      date_debut: '',
      date_fin: '',
      date_limite_dossier: '',
      annee_academique_id: '',
      statut: '',
      description: '',
    };
    
    // Fermer le modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('exampleModal'));
    modal.hide();
    
  } catch (error) {
    console.error("Erreur lors de l'ajout du concours", error);
  } finally {
    loading.value = false;
  }
}
</script>