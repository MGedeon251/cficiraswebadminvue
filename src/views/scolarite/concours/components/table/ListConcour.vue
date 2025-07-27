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
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(concour, index) in concours" :key="concour.id">
          <td>{{ index + 1 }}</td>
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
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import dayjs from 'dayjs';
import ItemActions from '../details/ItemActions.vue';
import { concoursStore } from '@/stores/scolarite/concours/concoursStore.js';

const concours = ref([]);

// Charger les concours depuis localStorage
onMounted(() => {
  concours.value = concoursStore.getAll();
});

// Format des dates
const formatDate = (date) => {
  return dayjs(date).format('DD-MM-YYYY');
};

// Placeholders pour l’édition ou suppression si besoin
function editModule(item) {
  console.log('Éditer concours :', item);
}

function confirmDelete(item) {
  if (confirm(`Supprimer le concours "${item.designation}" ?`)) {
    concoursStore.delete(item.id);
    concours.value = concoursStore.getAll(); // Recharger après suppression
  }
}
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
