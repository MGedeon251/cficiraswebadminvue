<template>
  <tr>
    <td>{{ module.title }}</td>
    <td>
      <span :class="statusClass(module.status)">{{ module.status }}</span>
    </td>
    <td>{{ module.coef }}</td>
    <td>{{ module.hours }}</td>
    <td>{{ module.formateur }}</td>
    <td><button class="btn btn-sm btn-outline-primary">...</button></td>
  </tr>
</template>

<script setup>
defineProps({
  module: Object,
});

function statusClass(status) {
  return {
    'status-badge status-draft': status === 'Inactive',
    'status-badge status-active': status === 'Active',
  };
}
</script>
