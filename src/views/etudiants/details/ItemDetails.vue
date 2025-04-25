<template>
    <div class="dropdown">
      <button class="btn btn-sm btn-outline-primary dropdown-toggle" data-bs-toggle="dropdown">
        ...
      </button>
      <ul class="dropdown-menu dropdown-menu-light">
        <li>
          <RouterLink class="dropdown-item" :to="`/etudiants/${item.etudiant_id}`"> 📄 Détails </RouterLink>
        </li>
        <li>
          <button class="dropdown-item" @click="$emit('edit', item)">✏️ Modifier</button>
        </li>
        <li class="dropdown-divider"></li>
        <li>
          <button class="dropdown-item text-danger" @click="$emit('delete', item)">
            🗑️ Supprimer
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
  