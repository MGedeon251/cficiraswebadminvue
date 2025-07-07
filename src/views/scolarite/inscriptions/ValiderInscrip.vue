<template>
  <div>
    <HeaderInscrip />

    <div class="row">
      <div class="col-md-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Validation des Inscriptions</h4>
            <p class="card-description">Validez les candidatures des étudiants</p>

            <!-- Liste des inscriptions à valider -->
            <ListeInscriptions :inscriptions="inscriptionsAValider" @valider="validerInscription" />

            <!-- Bouton pour valider toutes -->
            <button class="btn btn-primary mt-3" @click="validerToutes">
              Valider toutes les inscriptions
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import HeaderInscrip from './HeaderInscrip.vue';
import ListeInscriptions from './ListeInscriptions.vue';

const inscriptions = ref([]);

onMounted(() => {
  const saved = localStorage.getItem('inscriptions');
  if (saved) inscriptions.value = JSON.parse(saved);
});

const inscriptionsAValider = computed(() => inscriptions.value.filter((i) => !i.valide));

function validerInscription(inscriptionId) {
  const idx = inscriptions.value.findIndex((i) => i.id === inscriptionId);
  if (idx !== -1) {
    inscriptions.value[idx].valide = true;
  }
}

function validerToutes() {
  inscriptions.value.forEach((i) => {
    i.valide = true;
  });
}
</script>

<style scoped>
.btn-primary {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.5rem 1.2rem;
  border-radius: 6px;
  font-size: 0.95rem;
}
.btn-primary:hover {
  background-color: #0069d9;
}
</style>
