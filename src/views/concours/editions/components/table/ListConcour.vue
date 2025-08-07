<template>
  <div class="table-responsive mt-3">
    <table class="table table-hover align-middle">
      <thead>
        <tr>
          <th>#</th>
          <th>désignation</th>
          <th>type concours</th>
          <th>date de début</th>
          <th>date de fin</th>
          <th>statut</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(concour, index) in paginatedConcours" :key="concour.id">
          <td>{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
          <td>{{ concour.designation }}</td>
          <td>{{ concour.type_code }}</td>
          <td>{{ formatDate(concour.date_debut) }}</td>
          <td>{{ formatDate(concour.date_fin) }}</td>
          <td>
            <span
              class="status-badge"
              :class="concour.statut === 'ouvert' ? 'status-active' : 'status-draft'"
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
    <Pagination
      v-model="currentPage"
      :items-per-page="itemsPerPage"
      :total-items="concours.length"
      @update:itemsPerPage="itemsPerPage = $event"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import dayjs from 'dayjs'; // ici c'est pour gerer les formats des dates
import { getConcours } from '@/api/gestions/gestionApi';
//Ici j'appelle la fonction getconcours qui se trouve dans /api/gestion/gestionApi.js
//pour recuper tout les concours

import ItemActions from '../details/ItemActions.vue';
import Pagination from '@/components/shared/Pagination.vue';

const concours = ref([]); //une variable, un table pour recevoir tout les concours
const currentPage = ref(1);
const itemsPerPage = ref(10);
const paginatedConcours = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return concours.value.slice(start, end);
});

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
