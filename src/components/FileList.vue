// FileList.vue
<template>
  <table class="table table-striped">
    <thead>
      <tr>
        <th>Name</th>
        <th>Modified</th>
        <th>Size</th>
        <th>Type</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="file in files" :key="file.id">
        <td>{{ file.name }}</td>
        <td>{{ file.modified }}</td>
        <td>{{ file.size }}</td>
        <td>{{ file.type }}</td>
        <td>
          <button @click="$emit('download', file)">⬇️</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: ['files'],
};
</script>

<style scoped>
table {
  width: 100%;
}
</style>
<script>
export default {
  props: ['files'],
};
</script>

<style scoped>
.grid-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.file-card {
  width: 150px;
  padding: 10px;
  border: 1px solid #ddd;
  text-align: center;
}
.file-icon {
  font-size: 30px;
}
</style>
