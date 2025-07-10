<template>
  <div>
    <div class="row">
      <div class="col-md-12 grid-margin">
        <div class="table-wrap">
          <div class="table-responsive">
            <table class="table table-sm mb-0">
              <tbody>
                <tr>
                  <th class="w-70" scope="row">Designation</th>
                  <th class="w-30" scope="row">Concours Informatique 2024</th>
                </tr>
                <tr>
                  <td class="w-70">Type de concours</td>
                  <td class="w-30">ENTREE</td>
                </tr>
                <tr>
                  <td class="w-70">Année académique</td>
                  <td class="w-30">2024-2025</td>
                </tr>
                <tr>
                  <td class="w-70">Date limite inscription</td>
                  <td class="w-30">2023-05-31</td>
                </tr>
                <tr>
                  <td class="w-70">Date début</td>
                  <td class="w-30">2023-05-31</td>
                </tr>
                <tr>
                  <td class="w-70">Date fin</td>
                  <td class="w-30">2023-05-31</td>
                </tr>
                <tr>
                  <td class="w-70">Description</td>
                  <td class="w-30 text-success"></td>
                </tr>
              </tbody>
              <tfoot>
                <tr class="bg-light">
                  <th class="text-dark text-uppercase" scope="row">Etat</th>
                  <th class="text-success font-18" scope="row">Ouvert</th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup="setup">
import { ref, onMounted } from 'vue';
import AddConcour from '../modal/AddConcour.vue';
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
