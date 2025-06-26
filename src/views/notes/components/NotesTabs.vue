<template>
  <ul class="nav nav-tabs px-4" role="tablist">
    <li class="nav-item" v-for="(tab, index) in tabs" :key="index">
      <a
        class="nav-link"
        :class="{ active: index === 0 }"
        :id="`${tab.id}-tab`"
        data-bs-toggle="tab"
        :href="`#${tab.id}`"
        role="tab"
        :aria-controls="tab.id"
        :aria-selected="index === 0"
      >
        {{ tab.label }}
      </a>
    </li>
  </ul>
</template>

<script setup>
const tabs = [
  { id: 'overview', label: 'Tout' },
  { id: 'devoirf', label: 'Devoirs' },
  { id: 'sales', label: 'Sessions ordinaires' },
  { id: 'purchases', label: 'Sessions de rappels' },
];
</script>
