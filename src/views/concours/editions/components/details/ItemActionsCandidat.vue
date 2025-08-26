<template>

      <div class="dropdown">
    <button class="btn btn-sm btn-outline-primary dropdown-toggle" data-bs-toggle="dropdown">
      ...
    </button>
    <ul class="dropdown-menu dropdown-menu-light">
      <li>
        <button class="dropdown-item" @click="showDetails = true">
          <i class="mdi mdi-information-outline me-2"></i> Détails
        </button>
      </li>
      <li v-if="showAdd">
        <RouterLink
          class="dropdown-item"
          :to="`/edition-concours/edit/${item.concours_id}`"
          @click="$emit('add', item)"
        >
          <i class="mdi mdi mdi-launch me-2"></i> Editer
        </RouterLink>
      </li>
      <li>
        <button
          class="dropdown-item"
          data-bs-toggle="modal"
          :data-bs-target="editModalTarget"
          @click="$emit('edit', item)"
        >
          <i class="mdi mdi-pencil-outline me-2"></i> Modifier
        </button>
      </li>
      <li class="dropdown-divider"></li>
      <li>
        <button class="dropdown-item text-danger" @click="$emit('delete', item)">
          <i class="mdi mdi-delete-outline me-2"></i> Supprimer
        </button>
      </li>
    </ul>
  </div>

    <teleport to="body">
  <div
    v-if="showDetails"
    class="modal fade show d-block"
    tabindex="-1"
    style="background: rgba(0, 0, 0, 0.3)"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Détails du candidat</h5>
          <button type="button" class="btn-close" @click="showDetails = false"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <!-- Colonne image (photo identité) -->
            <div class="col-md-4 text-center mb-3">
              <img
                :src="item.photo || 'https://static-cse.canva.com/blob/996499/Sanstitre.jpg'"
                alt="Photo du candidat"
                class="img-thumbnail"
                style="max-width: 150px; max-height: 300px;"
              />
            </div>

            <!-- Colonne infos personnelles -->
            <div class="col-md-8">
              <p><strong>Matricule :</strong> {{ item.matricule }}</p>
              <p><strong>Nom :</strong> {{ item.nom }}</p>
              <p><strong>Prénom :</strong> {{ item.prenom }}</p>
              <p><strong>Téléphone :</strong> {{ item.tel }}</p>
              <p><strong>Date inscription :</strong> {{ formatDate(item.date_inscription) }}</p>
              <!-- Ajoute ici d'autres infos si besoin -->
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" @click="showDetails = false">Fermer</button>
        </div>
      </div>
    </div>
  </div>
</teleport>

</template>

<script setup>
import { ref } from 'vue';
import dayjs from 'dayjs';
const props = defineProps({ item: Object });
const emit = defineEmits(['edit', 'delete']);
const showDetails = ref(false);

const formatDate = (date) => date ? dayjs(date).format('DD-MM-YYYY') : '';
</script>