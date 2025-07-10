<template>
  <div class="dropdown">
    <button class="btn btn-sm btn-outline-primary dropdown-toggle" data-bs-toggle="dropdown">
      ...
    </button>
    <ul class="dropdown-menu dropdown-menu-light">
      <li>
        <RouterLink
          class="dropdown-item"
          :to="`/modules/${item.id}`"
          @click="isDetailsVisible = true"
        >
          <i class="mdi mdi-information-outline me-2"></i> Détails
        </RouterLink>
      </li>
      <li v-if="showAdd">
        <RouterLink class="dropdown-item" @click="$emit('add', item)">
          <i class="mdi mdi-plus-circle-outline me-2"></i> Ajouter
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
</template>

<script setup>
defineProps({
  item: Object,
});
defineEmits(['view-details', 'edit', 'delete']);
</script>
