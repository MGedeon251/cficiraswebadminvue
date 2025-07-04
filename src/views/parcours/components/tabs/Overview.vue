<template>
  <div class="table-responsive">
    <a-table
        :columns="columns"
        :data-source="paginatedEnseignants"
        :loading="loading"
        :pagination="false"
        :row-key="(record) => record.id"
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
  </div>
</template>

<script setup>
defineProps(['rows']);
</script>
