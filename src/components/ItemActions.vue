<template>
  <div class="dropdown">
    <button class="btn btn-sm btn-outline-primary dropdown-toggle" data-bs-toggle="dropdown">
      ...
    </button>
    <ul class="dropdown-menu dropdown-menu-light">
      <li>
        <button class="dropdown-item" @click="isDetailsVisible = true">📝 Détails</button>
      </li>
      <li v-if="showAdd">
        <button class="dropdown-item" @click="$emit('add', item)">➕ Ajouter</button>
      </li>
      <li>
        <button
          class="dropdown-item"
          data-bs-toggle="modal"
          :data-bs-target="editModalTarget"
          @click="$emit('edit', item)"
        >
          ✏️ Modifier
        </button>
      </li>
      <li class="dropdown-divider"></li>
      <li>
        <button class="dropdown-item text-danger" @click="$emit('delete', item)">
          🗑️ Supprimer
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
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Détails</h5>
            <button type="button" class="btn-close" @click="closeDetails"></button>
          </div>
          <div class="modal-body">
            <p><strong>Code:</strong> {{ item.code }}</p>
            <p><strong>Désignation:</strong> {{ item.designation }}</p>
            <p><strong>Crédit:</strong> {{ item.credit }}</p>
            <p><strong>Volume horaire:</strong> {{ item.volume_horaire }}</p>
            <!-- Ajoute d'autres champs si nécessaire -->
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" @click="closeDetails">Fermer</button>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
  item: Object,
  showAdd: {
    type: Boolean,
    default: false,
  },
  editModalTarget: {
    type: String,
    default: '#exampleModal-edit',
  },
});

const isDetailsVisible = ref(false);

const closeDetails = () => {
  isDetailsVisible.value = false;
};
</script>
