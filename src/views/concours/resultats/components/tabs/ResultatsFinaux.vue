<template>
  <div class="row">
    <div class="col-md-12 grid-margin">
      <div class="d-flex justify-content-between flex-wrap">
        <div class="d-flex align-items-end flex-wrap">
          <div class="flex flex-wrap justify-between mb-4">
            <a-input
              class="me-1 mt-1 mt-xl-0"
              v-model:value="searchQuery"
              placeholder="Rechercher..."
              allow-clear
              style="width: 250px"
            >
              <template #prefix>
                <i class="mdi mdi-magnify" />
              </template>
            </a-input>
          </div>
        </div>
        <div class="d-flex justify-content-between align-items-end flex-wrap">
          <div class="dropdown me-2">
            <button class="btn btn-sm btn-outline-secondary" data-bs-toggle="dropdown">
              <i class="mdi mdi-dots-vertical"></i>
            </button>
            <ul class="dropdown-menu dropdown-menu-end">
              <li>
                <a class="dropdown-item" href="#" @click.prevent="exportToExcel">
                  <i class="mdi mdi-file-excel me-2"></i>Exporter Excel
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#" @click.prevent="printTable">
                  <i class="mdi mdi-printer me-2"></i>Imprimer
                </a>
              </li>
              <li><hr class="dropdown-divider" /></li>
              <li>
                <a class="dropdown-item" href="#"><i class="mdi mdi-cog me-2"></i>Paramètres</a>
              </li>
            </ul>
          </div>
          <div class="btn-group">
            <button
              class="btn btn-success mt-2 mt-xl-0"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              + Publier pdf
            </button>
            <button
              class="btn btn-success dropdown-toggle dropdown-toggle-split"
              data-bs-toggle="dropdown"
            >
              <span class="visually-hidden">Toggle Dropdown</span>
            </button>
            <ul class="dropdown-menu">
              <label class="dropdown-item" for="fileUploadInput" @click="showImportModal = true"
                >Importer fichier</label
              >
            </ul>
          </div>
        </div>
      </div>
      <h5 class="mb-3">Résultats finaux des candidats</h5>
      <p class="text-muted mb-4">
        Les résultats finaux des candidats sont affichés ci-dessous. Vous pouvez voir le rang, la
        moyenne, la mention et le statut de chaque candidat.
      </p>
      <div class="table-responsive">
        <table class="table table-bordered table-sm">
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

<style scoped>
.table-responsive {
  max-height: 600px;
  overflow-y: auto;
}
input.form-control-sm {
  max-width: 80px;
  display: inline-block;
}
</style>
