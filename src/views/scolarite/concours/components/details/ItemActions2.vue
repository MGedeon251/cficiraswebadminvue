<template>
    <div class="dropdown">
      <button class="btn btn-sm btn-outline-primary dropdown-toggle" data-bs-toggle="dropdown">
        ...
      </button>
      <ul class="dropdown-menu dropdown-menu-light">
        <li>
          <RouterLink
            class="dropdown-item"
            :to="`/details-candidat/${item.id}`"
          >
            <i class="mdi mdi-information-outline me-2"></i> Détails
          </RouterLink>
        </li>
        <li>
          <RouterLink
            class="dropdown-item"
            :to="`/edit-candidat/${item.id}`"
          >
            <i class="mdi mdi-pencil-outline me-2"></i> Modifier
          </RouterLink>
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
  const props = defineProps({
    item: Object,
  });
  </script>
  