<template>
  <div
    class="tab-pane fade show active"
    :id="tabId"
    role="tabpanel"
    :aria-labelledby="tabId + '-tab'"
  >
    <div class="d-flex flex-wrap justify-content-xl-between">
      <slot></slot>
      <!-- Contenu des statistiques dynamiques pour chaque onglet -->
    </div>
  </div>
</template>

<script setup>
defineProps({
  tabId: String, // ID de l'onglet
});
</script>
