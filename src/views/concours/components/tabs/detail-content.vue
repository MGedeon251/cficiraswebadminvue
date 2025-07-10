<template>
  <div>
    <div class="row">
      <div class="col-md-12 grid-margin">
        <div class="table-wrap">
          <div class="table-responsive">
            <table v-if="concours" class="table table-sm mb-0">
              <tbody>
                <tr>
                  <th class="w-70" scope="row">Désignation</th>
                  <td class="w-30 text-uppercase" scope="row">{{ concours.designation }}</td>
                </tr>
                <tr>
                  <th class="w-70" >Type de concours</th>
                  <td class="w-30">{{ concours.type_code}}</td>
                </tr>
                <tr>
                  <td class="w-70" scope="row">Année académique</td>
                  <td class="w-30">{{ concours.annee_code }}</td>
                </tr>
                <tr>
                  <td class="w-70" scope="row">Date limite inscription</td>
                  <td class="w-30">{{ formatDate(concours.date_limite_inscription) }}</td>
                </tr>
                <tr>
                  <td class="w-70" scope="row">Date début</td>
                  <td class="w-30">{{ formatDate(concours.date_debut) }}</td>
                </tr>
                <tr>
                  <td class="w-70" scope="row">Date fin</td>
                  <td class="w-30">{{ formatDate(concours.date_fin) }}</td>
                </tr>
                <tr>
                  <td class="w-70" scope="row">Description</td>
                  <td class="w-30 text-dark">
                    {{ concours.description || '—' }}
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr class="bg-light">
                  <th class="text-dark text-uppercase" scope="row">Statut</th>
                  <th :class="statusClass" scope="row">
                    {{ concours.statut }}
                  </th>
                </tr>
              </tfoot>
            </table>

            <div v-else class="text-center p-4">
              <span class="text-muted">Chargement des détails du concours...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useConcourStore } from '@/stores/gestionStores/concourStore';
import { useRouter } from 'vue-router';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';

const router = useRouter();
const concourStore = useConcourStore();

const concours = computed(() => concourStore.concoursDetail);

const formatDate = (date) => {
  return date ? dayjs(date).locale('fr').format('D MMMM YYYY') : '—';
};

onMounted(async () => {
  const id = router.currentRoute.value.params.id;
  if (id) {
    await concourStore.fetchConcoursById(id);
  }
});

const statusClass = computed(() => {
  if (!concours.value || !concours.value.statut) return '';
  if (concours.value.statut.toLowerCase() === 'ouvert') return 'text-success font-18';
  if (['clôturé', 'fermé'].includes(concours.value.statut.toLowerCase())) return 'text-danger font-18';
  if (['planifié', 'en attente'].includes(concours.value.statut.toLowerCase())) return 'text-warning font-18';
  return 'text-dark font-18';
});
</script>