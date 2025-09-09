<template>
  <div class="modal fade" id="ajouterTuteurModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Ajouter tuteur étudiant</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="submitForm">
            <div class="mb-3">
              <label for="etudiantTuteur" class="form-label">Étudiant</label>
              <input type="text" v-model="etudiant" id="etudiantTuteur" class="form-control" required />
            </div>
            <div class="mb-3">
              <label for="tuteur" class="form-label">Nom du tuteur</label>
              <input type="text" v-model="tuteur" id="tuteur" class="form-control" required />
            </div>
            <button type="submit" class="btn btn-primary">Ajouter</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AjouterTuteurModal",
  data() {
    return {
      etudiant: "",
      tuteur: "",
    };
  },
  methods: {
    submitForm() {
      console.log("Étudiant:", this.etudiant);
      console.log("Tuteur:", this.tuteur);
      // Ici, envoyer les données vers l'API ou state management
      this.etudiant = "";
      this.tuteur = "";
      // Fermer la modal
      const modal = bootstrap.Modal.getInstance(document.getElementById("ajouterTuteurModal"));
      modal.hide();
    },
  },
};
</script>
