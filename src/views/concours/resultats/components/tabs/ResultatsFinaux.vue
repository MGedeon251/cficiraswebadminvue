<template>
  <div>
    <h5 class="mb-3">Résultats finaux des candidats</h5>

    <table class="table table-hover table-bordered table-sm">
      <thead class="table-light">
        <tr>
          <th>#</th>
          <th>Matricule</th>
          <th>Nom</th>
          <th>Prénom</th>
          <th>Sexe</th>
          <th>Moyenne</th>
          <th>Rang</th>
          <th>Mention</th>
          <th>Statut</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(candidat, index) in resultats" :key="candidat.candidat_id">
          <td>{{ index + 1 }}</td>
          <td>{{ candidat.matricule }}</td>
          <td>{{ candidat.nom }}</td>
          <td>{{ candidat.prenom }}</td>
          <td>{{ candidat.sexe }}</td>
          <td>{{ candidat.moyenne }}</td>
          <td>{{ candidat.rang }}</td>
          <td>
            <span :class="mentionClass(candidat.observation)">
              {{ candidat.observation }}
            </span>
          </td>
          <td>
            <span :class="statutClass(candidat.statut)">
              {{ candidat.statut }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useConcourStore } from '@/stores/gestionStores/concourStore';
import { useRoute } from 'vue-router';

const route = useRoute();
const concourStore = useConcourStore();
const resultats = ref([]);

const mentionClass = (mention) => {
  switch (mention) {
    case 'Passable':
      return 'badge bg-warning';
    case 'Bien':
      return 'badge bg-info';
    case 'Très bien':
      return 'badge bg-success';
    case 'Échec':
      return 'badge bg-danger';
    default:
      return 'badge bg-secondary';
  }
};

const statutClass = (statut) => {
  return statut === 'admis' ? 'badge bg-success' : 'badge bg-danger';
};

onMounted(async () => {
  const concoursId = route.params.id || 50; // ou passé en prop
  await concourStore.fetchResultatsFinaux(concoursId);
  resultats.value = concourStore.resultats_finaux;
});
</script>
