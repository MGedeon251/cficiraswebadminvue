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
                <option value="ENTRE">ENTRE</option>
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
              <input v-model="form.date_limite_dossier" type="date" class="form-control" required />
            </div>
            <div class="mb-3">
              <label class="form-label">Statut</label>
              <select v-model="form.statut" class="form-select" required>
                <option value="">Sélectionner</option>
                <option value="Ouvert">Ouvert</option>
                <option value="Fermé">Fermé</option>
                <option value="En attente">En attente</option>
              </select>
            </div>
            <div class="mb-3">
              <label class="form-label">Description</label>
              <textarea v-model="form.description" class="form-control" rows="2"></textarea>
            </div>
            <div class="modal-footer">
              <button type="submit" class="btn btn-success">Submit</button>
              <button type="button" class="btn btn-light" data-bs-dismiss="modal">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const form = ref({
  designation: '',
  type_concours: '',
  date_debut: '',
  date_fin: '',
  date_limite_dossier: '',
  statut: '',
  description: '',
});
function submitConcour() {
  // Traitement de soumission ici
  // Par exemple : console.log(form.value)
}
</script>
