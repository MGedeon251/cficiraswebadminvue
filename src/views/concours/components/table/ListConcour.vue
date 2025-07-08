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
          <td>{{ concour.date_debut }}</td>
          <td>{{ concour.date_fin }}</td>
          <td>{{ concour.statut }}</td>
          <td>
            <ItemActions
              :item="concours"
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
import ItemActions from '../details/ItemActions.vue';
const concours = ref([]);

onMounted(() => {
  concours.value = [
    {
      id: 1,
      designation: 'Concours Médecine',
      type_concours: 'National',
      date_debut: '2025-07-10',
      date_fin: '2025-07-12',
      statut: 'Ouvert',
    },
    {
      id: 2,
      designation: 'Concours Informatique',
      type_concours: 'Régional',
      date_debut: '2025-08-01',
      date_fin: '2025-08-03',
      statut: 'Fermé',
    },
    {
      id: 3,
      designation: 'Concours Droit',
      type_concours: 'National',
      date_debut: '2025-09-15',
      date_fin: '2025-09-17',
      statut: 'En attente',
    },
    {
      id: 4,
      designation: 'Concours Gestion',
      type_concours: 'International',
      date_debut: '2025-10-05',
      date_fin: '2025-10-07',
      statut: 'Ouvert',
    },
    {
      id: 5,
      designation: 'Concours Sciences',
      type_concours: 'Régional',
      date_debut: '2025-11-20',
      date_fin: '2025-11-22',
      statut: 'Fermé',
    },
  ];
});
</script>
