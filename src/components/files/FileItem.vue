<template>
  <tr>
    <td>{{ file.name }}</td>
    <td>{{ file.date }} {{ file.time }}</td>
    <td>{{ file.size }}</td>
    <td>{{ file.type }}</td>
    <td>
      <button class="btn btn-sm btn-link text-primary" @click="$emit('download', file)">
        ⬇️ Download
      </button>
      <button class="btn btn-sm btn-link text-danger" @click="$emit('delete', file.id)">
        ❌ Delete
      </button>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    file: Object,
  },
};
</script>
