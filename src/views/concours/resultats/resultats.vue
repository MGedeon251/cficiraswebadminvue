<template>
  <div>
    <HeaderView />
    <div class="row">
      <div class="container my-2">
        <div class="col-md-12 grid margin stretch-card">
          <div class="card">
            <div class="card-body">
              <SkeletonLoader v-if="concourStore.loading" type="table" :rows="3" :columns="1" />
              <table v-else class="table table-striped">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Désignation</th>
                    <th>Date publication</th>
                    <th>Statut</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(resultat, index) in concourStore.publication" :key="resultat.id">
                    <td>{{ index + 1 }}</td>
                    <td>{{ resultat.designation }}</td>
                    <td>{{ formatDate(resultat.date_publication) ?? 'Non publié' }}</td>
                    <td>
                      <span
                        :class="[
                          'badge',
                          {
                            'bg-success': resultat.statut === 'validé',
                            'bg-warning': resultat.statut === 'en attente',
                            'bg-danger': resultat.statut === 'rejeté',
                          },
                        ]"
                      >
                        {{ resultat.statut }}
                      </span>
                    </td>
                    <td>
                      <a
                        :href="`/resultats-concours/${resultat.concours_id}`"
                        rel="noopener noreferrer"
                      >
                        <i class="mdi mdi-launch me-2"></i>
                      </a>
                    </td>
                  </tr>
                  <tr v-if="concourStore.publication.length === 0">
                    <td colspan="5" class="text-center">Aucun résultat publié</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useConcourStore } from '@/stores/gestionStores/concourStore';
import HeaderView from './components/HeaderResultat.vue';
import SkeletonLoader from '@/components/SkeletonLoader.vue';
import dayjs from 'dayjs'; // ici c'est pour gerer les formats des dates

const concourStore = useConcourStore();

onMounted(() => {
  concourStore.fetchResultatsPubliee();
});

const formatDate = (date) => {
  return date ? dayjs(date).format('DD/MM/YYYY') : 'Non spécifiée';
};
</script>
