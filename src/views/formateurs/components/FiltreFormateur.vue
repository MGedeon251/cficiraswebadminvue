<template>
  <div class="flex flex-wrap gap-3 mb-4">
    <a-input
      :value="searchQuery"
      placeholder="Rechercher..."
      allow-clear
      style="width: 300px"
      @input="onSearchChange"
    >
      <template #prefix><i class="mdi mdi-magnify" /></template>
    </a-input>

    <a-select
      :value="filters.cycle"
      placeholder="Cycle"
      allow-clear
      style="width: 180px"
      @change="(value) => updateFilter('cycle', value)"
    >
      <a-select-option value="">Tous les cycles</a-select-option>
      <a-select-option v-for="cycle in uniqueCycles" :key="cycle" :value="cycle">
        {{ cycle }}
      </a-select-option>
    </a-select>

    <a-select
      :value="filters.niveau"
      placeholder="Niveau"
      allow-clear
      style="width: 180px"
      @change="(value) => updateFilter('niveau', value)"
    >
      <a-select-option value="">Tous les niveaux</a-select-option>
      <a-select-option v-for="niveau in uniqueNiveaux" :key="niveau" :value="niveau">
        {{ niveau }}
      </a-select-option>
    </a-select>
  </div>
</template>

<script setup>
const props = defineProps({
  searchQuery: String,
  filters: Object,
  uniqueCycles: Array,
  uniqueNiveaux: Array,
});

const emit = defineEmits(['update:searchQuery', 'update:filters']);

function onSearchChange(event) {
  emit('update:searchQuery', event.target.value);
}

function updateFilter(key, value) {
  emit('update:filters', { ...props.filters, [key]: value });
}
</script>
