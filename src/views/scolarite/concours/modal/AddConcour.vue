<template>
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Nouveau concours</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitConcour">
              <div class="mb-3">
                <label class="form-label">Désignation</label>
                <input v-model="form.designation" type="text" class="form-control" required />
              </div>
              <div class="mb-3">
                <label class="form-label">Type</label>
                <select v-model="form.type_concours" class="form-select" required>
                  <option value="">Sélectionner</option>
                  <option value="ENTREE">ENTREE</option>
                  <option value="PASSERELLE">PASSERELLE</option>
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
                <label class="form-label">Date limite</label>
                <input v-model="form.date_limite_dossier" type="date" class="form-control" required />
              </div>
              <div class="mb-3">
                <label class="form-label">Statut</label>
                <select v-model="form.statut" class="form-select" required>
                  <option value="">Sélectionner</option>
                  <option value="Ouvert">Ouvert</option>
                  <option value="Fermé">Fermé</option>
                </select>
              </div>
              <div class="mb-3">
                <label class="form-label">Description</label>
                <textarea v-model="form.description" class="form-control"></textarea>
              </div>
              <div class="modal-footer">
                <button type="submit" class="btn btn-success">Créer</button>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { createConcours } from '@/api/gestions/gestionApi'
  
  const emit = defineEmits(['concours-cree'])
  
  const form = ref({
    designation: '',
    type_concours: '',
    date_debut: '',
    date_fin: '',
    date_limite_dossier: '',
    statut: '',
    description: '',
  })
  
  async function submitConcour() {
    try {
      await createConcours(form.value)
      emit('concours-cree')
      const modalEl = document.getElementById('exampleModal')
      const modal = bootstrap.Modal.getInstance(modalEl)
      if (modal) modal.hide()
    } catch (error) {
      console.error(error)
    }
  }
  </script>
  