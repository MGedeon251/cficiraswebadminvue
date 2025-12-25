<template>
  <div class="container py-4">
    <h2 class="mb-4">Assistant d'inscription</h2>

    <!-- Bouton d’ouverture du wizard -->
    <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#wizardModal">
      Nouvelle inscription
    </button>

    <!-- Modal wizard -->
    <WizardModal id="wizardModal" v-model="workflowData" @finish="submitWorkflow" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import WizardModal from '@/components/wizard/WizardModal.vue';
import api from '@/services/api';

const workflowData = ref({
  candidatId: null,
  etudiant: {},
  inscription: {},
  paiements: [],
});

// Quand l’utilisateur termine le wizard
async function submitWorkflow(data) {
  try {
    // ⚡ API backend → orchestration inscription complète
    const res = await api.post('/api/workflow/inscriptions', data);
    alert('✅ Inscription finalisée avec succès !');
    console.log(res.data);
  } catch (err) {
    console.error(err);
    alert('❌ Erreur : ' + err.message);
  }
}
</script>
