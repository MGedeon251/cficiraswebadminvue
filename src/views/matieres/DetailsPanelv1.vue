<template>
  <div v-if="item" class="mt-4 border-top pt-3">
    <h5 class="mb-3">Détails : {{ item.designation || 'Item sélectionné' }}</h5>
    <ul class="list-unstyled">
      <li><strong>Code :</strong> {{ item.code }}</li>
      <li><strong>Crédit :</strong> {{ item.credit }}</li>
      <li><strong>Coefficient :</strong> {{ item.coefficient }}</li>
      <li><strong>Volume Horaire :</strong> {{ item.volume_horaire }}</li>
      <li><strong>Responsable :</strong> {{ item.responsable_id }}</li>
    </ul>
    <button class="btn btn-sm btn-outline-secondary mt-2" @click="$emit('close')">Fermer</button>
  </div>
</template>

<script setup>
defineProps({
  item: Object,
});

defineEmits(['close']);
</script>
