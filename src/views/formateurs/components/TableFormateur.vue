<template>
  <div>
    <a-table
      :columns="columns"
      :data-source="data"
      :loading="loading"
      :pagination="false"
      :row-key="(record) => record.id"
      bordered
    >
      <template #bodyCell="{ column, record, index }">
        <template v-if="column.key === 'index'">
          {{ index + 1 + (currentPage - 1) * itemsPerPage }}
        </template>
        <template v-else-if="column.key === 'actions'">
          <ItemActions :item="record" moduleRoute="/enseignant" />
        </template>
      </template>
    </a-table>

    <!-- Pagination -->
    <div class="d-flex justify-content-between align-items-center mt-4">
      <div class="text-muted">Affichage de {{ data.length }} sur {{ total }} formateurs</div>
      <a-pagination
        size="small"
        :current="currentPage"
        :total="total"
        :pageSize="itemsPerPage"
        @change="onPageChange"
      />
    </div>

    <!-- Aucune donnée -->
    <div v-if="!loading && data.length === 0" class="text-center py-5">
      <img src="/img/empty-box.svg" alt="vide" style="height: 120px" />
      <p class="mt-3">Aucune donnée</p>
      <a-button type="primary" @click="onReset">Réinitialiser les filtres</a-button>
    </div>
  </div>
</template>

<script setup>
import ItemActions from './DetailItemv2.vue';

defineProps({
  columns: Array,
  data: Array,
  loading: Boolean,
  total: Number,
  currentPage: Number,
  itemsPerPage: Number,
});

const emit = defineEmits(['pageChange', 'reset']);

function onPageChange(page) {
  emit('pageChange', page);
}
function onReset() {
  emit('reset');
}
</script>
