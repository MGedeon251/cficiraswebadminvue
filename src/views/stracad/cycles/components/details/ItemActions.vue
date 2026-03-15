<template>
  <div class="dropdown">
    <button class="btn btn-sm btn-outline-primary dropdown-toggle" data-bs-toggle="dropdown">
      ...
    </button>
    <ul class="dropdown-menu dropdown-menu-light">
      <li>
        <button class="dropdown-item" @click="isDetailsVisible = true">
          <i class="mdi mdi-information-outline me-2"></i> Détails
        </button>
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
        <button class="dropdown-item text-danger" @click="isDeleteConfirmVisible = true">
          <i class="mdi mdi-delete-outline me-2"></i> Supprimer
        </button>
      </li>
    </ul>
  </div>

  <!-- Modal pour les détails -->
  <teleport to="body">
    <div
      v-if="isDetailsVisible"
      class="modal fade show d-block"
      tabindex="-1"
      role="dialog"
      style="background-color: rgba(0, 0, 0, 0.5)"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content shadow-lg">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title">Détails du cycle</h5>
            <button type="button" class="btn-close btn-close-white" @click="closeDetails"></button>
          </div>

          <div class="modal-body">
            <ul class="list-group list-group-flush">
              <li class="list-group-item d-flex justify-content-between">
                <strong>Code :</strong>
                <span class="fw-bold text-primary">{{ item.code }}</span>
              </li>
              <li class="list-group-item d-flex justify-content-between">
                <strong>Désignation :</strong>
                <span>{{ item.designation }}</span>
              </li>
              <li class="list-group-item d-flex justify-content-between">
                <strong>Description :</strong>
                <span>{{ item.description || '—' }}</span>
              </li>
              <li class="list-group-item d-flex justify-content-between">
                <strong>Durée (années) :</strong>
                <span class="badge bg-info">{{ item.duree_annees }}</span>
              </li>
              <li class="list-group-item d-flex justify-content-between">
                <strong>Crédits ECTS :</strong>
                <span class="badge bg-secondary">{{ item.credits_total }}</span>
              </li>
              <li class="list-group-item d-flex justify-content-between">
                <strong>Diplôme délivré :</strong>
                <span>{{ item.diplome }}</span>
              </li>
              <li class="list-group-item d-flex justify-content-between">
                <strong>Statut :</strong>
                <span :class="item.est_actif ? 'text-success' : 'text-danger'">
                  {{ item.statut ? 'Actif' : 'Inactif' }}
                </span>
              </li>
            </ul>
          </div>

          <div class="modal-footer">
            <button class="btn btn-secondary" @click="closeDetails">Fermer</button>
          </div>
        </div>
      </div>
    </div>
  </teleport>

  <!-- Modal de confirmation de suppression -->
  <teleport to="body">
    <div
      v-if="isDeleteConfirmVisible"
      class="modal fade show d-block"
      tabindex="-1"
      role="dialog"
      style="background-color: rgba(0, 0, 0, 0.5)"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content shadow-lg">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title">Confirmation de suppression</h5>
            <button
              type="button"
              class="btn-close btn-close-white"
              @click="closeDeleteConfirm"
            ></button>
          </div>

          <div class="modal-body">
            <p>
              Voulez-vous vraiment supprimer le cycle <strong>{{ item.designation }}</strong> ?
            </p>
          </div>

          <div class="modal-footer">
            <button class="btn btn-secondary" @click="closeDeleteConfirm">Annuler</button>
            <button class="btn btn-danger" @click="confirmDelete">Supprimer</button>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  editModalTarget: {
    type: String,
    default: '#cycleModal',
  },
});

const emit = defineEmits(['edit', 'delete']);

const isDetailsVisible = ref(false);
const isDeleteConfirmVisible = ref(false);

const closeDetails = () => {
  isDetailsVisible.value = false;
};

const closeDeleteConfirm = () => {
  isDeleteConfirmVisible.value = false;
};

const confirmDelete = () => {
  emit('delete', props.item.id); // ✅ ID uniquement
  isDeleteConfirmVisible.value = false;
};
</script>
