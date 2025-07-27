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
                  <td class="w-30 text-uppercase">{{ concours.designation }}</td>
                </tr>
                <tr>
                  <th class="w-70">Type de concours</th>
                  <td class="w-30">{{ concours.type_code }}</td>
                </tr>
                <tr>
                  <th class="w-70">Année académique</th>
                  <td class="w-30">{{ concours.annee_data?.code || '—' }}</td>
                </tr>
                <tr>
                  <th class="w-70">Date limite inscription</th>
                  <td class="w-30">{{ formatDate(concours.date_limite_dossier) }}</td>
                </tr>
                <tr>
                  <th class="w-70">Date début</th>
                  <td class="w-30">{{ formatDate(concours.date_debut) }}</td>
                </tr>
                <tr>
                  <th class="w-70">Date fin</th>
                  <td class="w-30">{{ formatDate(concours.date_fin) }}</td>
                </tr>
                <tr>
                  <th class="w-70">Description</th>
                  <td class="w-30 text-dark">{{ concours.description || '—' }}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr class="bg-light">
                  <th class="text-dark text-uppercase" scope="row">Statut</th>
                  <th :class="statusClass">{{ concours.statut }}</th>
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
import { onMounted, ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';

// ⚠️ Ici on importe depuis le store localStorage (concoursStore.js)
import { concoursStore } from '@/stores/scolarite/concours/concoursStore';

const route = useRoute();
const concours = ref(null);

onMounted(async () => {
  const id = parseInt(route.params.id);
  if (id) {
    concours.value = await concoursStore.fetchConcoursById(id);
  }
});

const formatDate = (date) => {
  return date ? dayjs(date).locale('fr').format('D MMMM YYYY') : '—';
};

const statusClass = computed(() => {
  if (!concours.value || !concours.value.statut) return '';
  const statut = concours.value.statut.toLowerCase();
  if (statut === 'ouvert') return 'text-success font-18';
  if (['clôturé', 'fermé'].includes(statut)) return 'text-danger font-18';
  if (['planifié', 'en attente'].includes(statut)) return 'text-warning font-18';
  return 'text-dark font-18';
});
</script>
