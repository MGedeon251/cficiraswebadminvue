<template>
  <div>
    <div class="row">
      <div class="col-md-12 grid-margin">
        <div class="d-flex justify-content-between flex-wrap">
          <div class="d-flex align-items-end flex-wrap">
            <div class="me-md-3 me-xl-5">
              <h3>Liste des candidats</h3>
              <p>Détails sur les candidatures</p>
            </div>
          </div>
          <div class="d-flex justify-content-between align-items-end flex-wrap">
            <button class="btn btn-outline-dark me-2">Exporter</button>
            <div class="btn-group">
              <button
                class="btn btn-primary mt-2 mt-xl-0"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                + Ajouter
              </button>
              <button
                class="btn btn-primary dropdown-toggle dropdown-toggle-split"
                data-bs-toggle="dropdown"
              >
                <span class="visually-hidden">Toggle Dropdown</span>
              </button>
              <ul class="dropdown-menu">
                <li>
                  <a class="dropdown-item">Importer fichier</a>
                </li>
              </ul>
            </div>
          </div>
          <AddCandidat @submit="handleSubmit" @close="handleClose"/>
        </div>
        <div v-if="candidats" class="table-responsive mt-3">
          <table class="table table-hover align-middle">
            <thead>
              <tr>
                <th>#</th>
                <th>matricule</th>
                <th>nom</th>
                <th>prenom</th>
                <th>telephone</th>
                <th>date inscription</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(candidat, index) in paginatedCandidats" :key="candidat.id">
                <td>{{ index + 1 }}</td>
                <td>{{ candidat.matricule }}</td>
                <td>{{ candidat.nom }}</td>
                <td>{{ candidat.prenom }}</td>
                <td>{{ candidat.tel }}</td>
                <td>{{ formatDate(candidat.date_inscription) }}</td>
                <td>
                    <ItemActions
                    :item="candidat"
                    concourRoute="/details-candidat/"
                    :showAdd="false"
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
            :total-items="totalItems"
            @update:itemsPerPage="itemsPerPage = $event"
          />
        </div>
        <div v-else class="text-center p-4">
              <span class="text-muted">Chargement des détails du concours...</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup="setup">
import { ref, onMounted, computed } from 'vue';
import { getCandidatures, createCandidature } from '@/api/gestions/gestionApi';
import ItemActions from '../details/ItemActions.vue';
import Pagination from '@/components/shared/Pagination.vue';
import { message } from 'ant-design-vue';
import dayjs from 'dayjs';

import { useRouter } from 'vue-router'
import AddCandidat from '../modal/addCandidat.vue';
const router = useRouter();
const concoursId = router.currentRoute.value.params.id;



const candidats = ref([]);

onMounted(async () => {
    try {
    const response = await getCandidatures(concoursId);
    candidats.value = response.data;
  } catch (e) {
    concours.value = [];
  }
});
const formatDate = (date) => {
  return dayjs(date).format('DD-MM-YYYY');
};

// Pagination
const currentPage = ref(1);
const itemsPerPage = ref(10);
const totalItems = computed(() => candidats.value.length);
const paginatedCandidats = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return candidats.value.slice(start, end);
});

const handleSubmit = async (formData) => {
  try {
    await createCandidature(formData);
    message.success('Candidat ajouté avec succès');
    // TODO: Rafraîchir la liste ou fermer modal
    const modalEl = document.getElementById('exampleModal');
    const modal = bootstrap.Modal.getInstance(modalEl);
    modal?.hide();
  } catch (error) {
    console.error(error);
    message.error("Erreur lors de l'ajout du candidat");
    
  }
};
const handleClose = () => {
  const modalEl = document.getElementById('exampleModal');
  const modal = bootstrap.Modal.getInstance(modalEl);
  modal?.hide();
};

</script>
