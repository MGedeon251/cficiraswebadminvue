<!-- FileGrid.vue -->
<template>
    <div class="grid-container">
      <div class="file-card" v-for="file in files" :key="file.id">
        <div class="file-icon">📄</div>
        <div class="file-name">{{ file.name }}</div>
        <button @click="$emit('download', file)">⬇️</button>
      </div>
    </div>
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