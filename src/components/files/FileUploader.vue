<template>
  <div>
    <input type="file" @change="uploadFile" class="form-control" />
  </div>
</template>

<script>
export default {
  methods: {
    uploadFile(event) {
      const file = event.target.files[0];
      if (file) {
        const newFile = {
          id: Date.now(),
          name: file.name,
          date: new Date().toLocaleDateString(),
          time: new Date().toLocaleTimeString(),
          size: `${(file.size / 1024).toFixed(2)} KB`,
          type: file.type.split('/').pop().toUpperCase(),
        };
        this.$emit('upload', newFile);
      }
    },
  },
};
</script>
