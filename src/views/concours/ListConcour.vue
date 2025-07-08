<template>
  <div class="table-responsive mt-3">
    <table class="table table-hover align-middle">
      <thead>
        <tr>
          <th>#</th>
          <th>Désignation</th>
          <th>Type de Concours</th>
          <th>Date de Début</th>
          <th>Date de Fin</th>
          <th>Statut</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="concour in concours" :key="concour.id">
          <td>{{ concour.id }}</td>
          <td>{{ concour.designation }}</td>
          <td>{{ concour.type_concours }}</td>
          <td>{{ formatDate(concour.date_debut) }}</td>
          <td>{{ formatDate(concour.date_fin) }}</td>
          <td>
            <span
              class="status-badge"
              :class="concour.statut === 'active' ? 'status-active' : 'status-draft'"
            >
              {{ concour.statut }}
            </span>
          </td>
          <td>
            <ItemActions
              :item="concour"
              concourRoute="/edition-concours/"
              :showAdd="true"
              editModalTarget="#editModuleModal"
              @edit="editModule"
              @delete="confirmDelete"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import dayjs from 'dayjs'; // ici c'est pour gerer les formats des dates
import { getConcours } from '@/api/gestions/gestionApi';
//Ici j'appelle la fonction getconcours qui se trouve dans /api/gestion/gestionApi.js
//pour recuper tout les concours

import ItemActions from './details/ItemActions.vue';
const concours = ref([]); //une variable, un table pour recevoir tout les concours

//Une fois les données recuper l'afficher sur la page, on fait ce script et partout ce sera comme ca.
onMounted(async () => {
  try {
    const response = await getConcours();
    concours.value = response.data;
  } catch (e) {
    concours.value = [];
  }
});

const formatDate = (date) => {
  return dayjs(date).format('DD-MM-YYYY');
};
</script>

<style scoped>
.status-badge {
  padding: 0.5em 1em;
  border-radius: 20px;
  font-size: 0.85rem;
  color: #fff;
}
.status-draft {
  background-color: #c34f49;
}
.status-active {
  background-color: #0d6efd;
}
</style>
