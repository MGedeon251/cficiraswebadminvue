<template>
  <div>
    <!-- Button to trigger modal -->
    <button
      type="button"
      class="btn btn-primary"
      data-bs-toggle="modal"
      data-bs-target="#addCalendrierModal"
    >
      Ajouter Calendrier
    </button>

    <!-- Modal -->
    <div
      class="modal fade"
      id="addCalendrierModal"
      tabindex="-1"
      aria-labelledby="addCalendrierModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addCalendrierModalLabel">Ajouter un Calendrier</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitForm">
              <div class="mb-3">
                <label for="title" class="form-label">Titre</label>
                <input
                  type="text"
                  class="form-control"
                  id="title"
                  v-model="form.title"
                  required="required"
                />
              </div>
              <div class="mb-3">
                <label for="date" class="form-label">Date</label>
                <input
                  type="date"
                  class="form-control"
                  id="date"
                  v-model="form.date"
                  required="required"
                />
              </div>
              <div class="mb-3">
                <label for="description" class="form-label">Description</label>
                <textarea
                  class="form-control"
                  id="description"
                  v-model="form.description"
                  rows="3"
                ></textarea>
              </div>
              <button type="submit" class="btn btn-primary">Enregistrer</button>
            </form>
          </div>
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
        title: '',
        date: '',
        description: '',
      },
    };
  },
  methods: {
    submitForm() {
      console.log('Form submitted:', this.form);
      // Add your logic to handle form submission here
      this.resetForm();
    },
    resetForm() {
      this.form = {
        title: '',
        date: '',
        description: '',
      };
    },
  },
};
</script>

<style scoped>
/* Add custom styles here if needed */
</style>
