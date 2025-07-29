<template>
  <div class="container my-4">
    <h4 class="mb-3">Détails du Concours</h4>

    <div v-if="concours" class="card mb-4">
      <div class="card-body">
        <p><strong>Intitulé :</strong> {{ concours.intitule }}</p>
        <p><strong>Année :</strong> {{ concours.annee }}</p>
        <p><strong>Date :</strong> {{ concours.date_concours }}</p>
        <p><strong>Nombre de candidats :</strong> {{ concours.total_candidats }}</p>
        <p><strong>Nombre d'épreuves :</strong> {{ concours.total_epreuves }}</p>
      </div>
    </div>

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
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useConcourStore } from '@/stores/gestionStores/concourStore';

const route = useRoute();
const concoursId = route.params.id;

const concourStore = useConcourStore();
const concours = ref(null);
const resultats = ref([]);

const mentionClass = (mention) => {
  switch (mention) {
    case 'Passable': return 'badge bg-warning';
    case 'Bien': return 'badge bg-info';
    case 'Très bien': return 'badge bg-success';
    case 'Échec': return 'badge bg-danger';
    default: return 'badge bg-secondary';
  }
};

const statutClass = (statut) => {
  return statut === 'admis'
    ? 'badge bg-success'
    : 'badge bg-danger';
};

onMounted(async () => {
  await concourStore.fetchConcoursById(concoursId);
  await concourStore.fetchResultatsFinaux(concoursId);

  concours.value = concourStore.concoursDetail;
  resultats.value = concourStore.statistiques;
});
</script>

