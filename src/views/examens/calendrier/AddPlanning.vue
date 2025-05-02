<template>
        <!-- Modal -->
        <div class="modal fade" id="addPlanningModal" tabindex="-1" aria-labelledby="addPlanningModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="addPlanningModalLabel">Ajouter un planning</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="submitPlanning">
                            <div class="mb-3">
                                <label for="examName" class="form-label">Nom de l'examen</label>
                                <input type="text" class="form-control" id="examName" v-model="planning.examName" required />
                            </div>
                            <div class="mb-3">
                                <label for="examDate" class="form-label">Date de l'examen</label>
                                <input type="date" class="form-control" id="examDate" v-model="planning.examDate" required />
                            </div>
                            <div class="mb-3">
                                <label for="examTime" class="form-label">Heure de l'examen</label>
                                <input type="time" class="form-control" id="examTime" v-model="planning.examTime" required />
                            </div>
                            <div class="mb-3">
                                <label for="examLocation" class="form-label">Lieu de l'examen</label>
                                <input type="text" class="form-control" id="examLocation" v-model="planning.examLocation" required />
                            </div>
                            <button type="submit" class="btn btn-success">Ajouter</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
</template>

<script setup>
import { ref } from 'vue';
const planning = ref({
  examName: '',
  examDate: '',
  examTime: '',
  examLocation: ''
});

function submitPlanning() {
  console.log('Planning ajouté:', planning.value);

  // Réinitialiser le formulaire
  planning.value = {
    examName: '',
    examDate: '',
    examTime: '',
    examLocation: ''
  };

  // Fermer la modale
  const modal = document.getElementById('addPlanningModal');
  const bootstrapModal = bootstrap.Modal.getInstance(modal);
  bootstrapModal.hide();
}
</script>

<style scoped>
/* Add custom styles here if needed */
</style>
