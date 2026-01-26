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
          <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="submitConcour">
            <!-- Champs du concours existants... -->

            <div class="mb-3">
              <label class="form-label">Année académique</label>
              <div class="d-flex gap-2">
                <select v-model="form.annee_id" class="form-select" required>
                  <option value="">Sélectionner</option>
                  <option v-for="annee in anneesAcademiques" :key="annee.id" :value="annee.id">
                    {{ annee.code }}
                  </option>
                </select>
                <button
                  type="button"
                  class="btn btn-outline-primary"
                  @click="showAnneeForm = !showAnneeForm"
                >
                  Ajouter
                </button>
              </div>
            </div>

            <!-- Formulaire d'ajout d'année académique -->
            <div v-if="showAnneeForm" class="border p-3 mb-3 rounded">
              <h6>Nouvelle année académique</h6>
              <div class="mb-2">
                <input
                  v-model="newAnnee.code"
                  type="text"
                  placeholder="Ex: 2025-2026"
                  class="form-control"
                />
              </div>
              <div class="mb-2">
                <label>Date début</label>
                <input v-model="newAnnee.date_debut" type="date" class="form-control" />
              </div>
              <div class="mb-2">
                <label>Date fin</label>
                <input v-model="newAnnee.date_fin" type="date" class="form-control" />
              </div>
              <div class="form-check mb-2">
                <input
                  v-model="newAnnee.est_active"
                  type="checkbox"
                  class="form-check-input"
                  id="activeCheck"
                />
                <label class="form-check-label" for="activeCheck">Est active</label>
              </div>
              <button type="button" class="btn btn-success btn-sm" @click="addAnnee">
                Enregistrer l'année académique
              </button>
            </div>

            <!-- Champs restants du concours... -->

            <div class="modal-footer">
              <button type="submit" class="btn btn-success" :disabled="loading">
                <span
                  v-if="loading"
                  class="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                {{ loading ? 'En cours...' : 'Enregistrer' }}
              </button>
              <button type="button" class="btn btn-light" data-bs-dismiss="modal">Annuler</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        designation: '',
        type_concours: '',
        date_debut: '',
        date_fin: '',
        date_limite_inscription: '',
        annee_id: '',
        statut: '',
        description: '',
      },
      anneesAcademiques: [], // Récupérer depuis API
      showAnneeForm: false,
      newAnnee: {
        code: '',
        date_debut: '',
        date_fin: '',
        est_active: false,
      },
      loading: false,
    };
  },
  methods: {
    submitConcour() {
      // Envoyer le concours au backend
    },
    addAnnee() {
      if (!this.newAnnee.code || !this.newAnnee.date_debut || !this.newAnnee.date_fin) {
        alert("Veuillez remplir tous les champs de l'année académique");
        return;
      }

      // Simuler un appel API pour créer l'année académique
      const newId = Date.now(); // remplacer par l'ID retourné par l'API
      const annee = { id: newId, ...this.newAnnee };
      this.anneesAcademiques.push(annee);

      // Sélectionner automatiquement la nouvelle année
      this.form.annee_id = newId;

      // Réinitialiser le formulaire d'année
      this.newAnnee = { code: '', date_debut: '', date_fin: '', est_active: false };
      this.showAnneeForm = false;
    },
  },
};
</script>
