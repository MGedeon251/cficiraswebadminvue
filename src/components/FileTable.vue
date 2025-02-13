<template>
    <table class="table table-striped table-hover">
      <thead class="table-dark">
        <tr>
          <th>Name</th>
          <th>Modified</th>
          <th>Size</th>
          <th>Type</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <FileItem
          v-for="file in files"
          :key="file.id"
          :file="file"
          @download="$emit('download', file)"
          @delete="$emit('delete', file.id)"
        />
      </tbody>
    </table>
  </template>
  
  <script>
  import FileItem from "./FileItem.vue";
  
  export default {
    components: { FileItem },
    props: {
      files: Array
    }
  };
  </script>
  