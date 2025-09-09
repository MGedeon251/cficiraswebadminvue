<template>
  <div class="modal fade" id="inscriptionClasseModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Inscription par classe</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="submitForm">
            <div class="mb-3">
              <label for="classe" class="form-label">Classe</label>
              <select v-model="classe" id="classe" class="form-select" required>
                <option value="">Sélectionnez la classe</option>
                <option v-for="c in classes" :key="c" :value="c">{{ c }}</option>
              </select>
            </div>
            <div class="mb-3">
              <label for="etudiant" class="form-label">Nom de l'étudiant</label>
              <input type="text" v-model="etudiant" id="etudiant" class="form-control" required />
            </div>
            <button type="submit" class="btn btn-primary">Enregistrer</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InscriptionClasseModal",
  data() {
    return {
      classe: "",
      etudiant: "",
      classes: ["CP", "CE1", "CE2", "CM1", "CM2"], // Exemple de classes
    };
  },
  methods: {
    submitForm() {
      console.log("Classe:", this.classe);
      console.log("Étudiant:", this.etudiant);
      // Ici, envoyer les données vers l'API ou state management
      this.classe = "";
      this.etudiant = "";
      // Fermer la modal
      const modal = bootstrap.Modal.getInstance(document.getElementById("inscriptionClasseModal"));
      modal.hide();
    },
  },
};
</script>
