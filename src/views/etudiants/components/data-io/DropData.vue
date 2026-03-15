<script setup></script>

<template>
  <div class="card-body" id="drop_table">
    <p class="text-muted">Importer une liste existant des etudiants</p>
    <div
      class="drag-drop-area border rounded p-4 text-center"
      @dragover.prevent
      @dragenter.prevent="isDragging = true"
      @dragleave="isDragging = false"
      @drop.prevent="handleDrop"
      :class="{ 'drag-over': isDragging }"
    >
      <p class="text-muted">
        <i class="bi bi-upload text-primary fs-3"></i><br />
        Glissez deposer vos fichier ici ou <span class="text-primary">cliquer pour charger</span>
      </p>
      <input
        type="file"
        ref="fileInput"
        hidden
        @change="handleFileUpload"
        accept=".csv, .xlsx"
        multiple
      />
      <button class="btn btn-outline-primary mt-2" @click="openFileInput">Select Files</button>
    </div>
    <div v-if="uploadedFiles.length" class="mt-3">
      <h5 class="text-dark">Uploaded Files:</h5>
      <ul class="list-group">
        <li
          v-for="(file, index) in uploadedFiles"
          :key="index"
          class="list-group-item d-flex justify-content-between"
        >
          {{ file.name }}
          <button class="btn btn-sm btn-danger" @click="removeFile(index)">
            <i class="mdi mdi-close-circle-outline"></i>
          </button>
        </li>
      </ul>
      <button class="btn btn-primary mt-2">Upload</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',
      isDragging: false,
      uploadedFiles: [],
      tasks: [
        {
          id: 'TASK-7103',
          label: 'Feature',
          title: 'Parse EXE bandwidth!',
          status: 'Canceled',
          priority: 'Low',
        },
        {
          id: 'TASK-4314',
          label: 'Bug',
          title: 'Compress program for XML alarm',
          status: 'In Progress',
          priority: 'High',
        },
        {
          id: 'TASK-3415',
          label: 'Feature',
          title: 'Use cross-platform XML',
          status: 'Todo',
          priority: 'Medium',
        },
        {
          id: 'TASK-4336',
          label: 'Documentation',
          title: 'Synthesize microchip',
          status: 'Done',
          priority: 'Medium',
        },
      ],
    };
  },
  computed: {
    filteredTasks() {
      return this.tasks.filter((task) =>
        task.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    openFileInput() {
      this.$refs.fileInput.click();
    },
    handleDrop(event) {
      this.isDragging = false;
      const files = Array.from(event.dataTransfer.files);
      this.processFiles(files);
    },
    handleFileUpload(event) {
      const files = Array.from(event.target.files);
      this.processFiles(files);
    },
    processFiles(files) {
      files.forEach((file) => {
        if (
          file.type === 'application/vnd.ms-excel' ||
          file.type === 'text/csv' ||
          file.name.endsWith('.xlsx')
        ) {
          this.uploadedFiles.push(file);
        }
      });
    },
    removeFile(index) {
      this.uploadedFiles.splice(index, 1);
    },
    statusClass(status) {
      return {
        'badge bg-danger text-white': status === 'Canceled',
        'badge bg-warning text-dark': status === 'In Progress',
        'badge bg-info text-white': status === 'Todo',
        'badge bg-success text-white': status === 'Done',
      };
    },
    priorityClass(priority) {
      return {
        'text-danger fw-bold': priority === 'High',
        'text-warning fw-bold': priority === 'Medium',
        'text-muted': priority === 'Low',
      };
    },
  },
};
</script>

<style scoped>
.drag-drop-area {
  background: #f8f9fa;
  border: 2px dashed #007bff;
  cursor: pointer;
}
.drag-drop-area.drag-over {
  background: #e9ecef;
}
</style>

<style scoped>
body {
  background-color: #f8f9fa;
  color: #212529;
}
.card {
  background-color: #ffffff;
  border: 1px solid #dee2e6;
  border-radius: 12px;
}
.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
  color: #fff;
}
.btn-primary:hover {
  background-color: #0056b3;
  border-color: #004080;
}
.status-badge {
  padding: 0.5em 1em;
  border-radius: 20px;
  font-size: 0.85rem;
  color: #fff;
}
.status-draft {
  background-color: #6c757d;
}
.status-active {
  background-color: #0d6efd;
}
.table thead th {
  border-bottom: 2px solid #dee2e6;
}
</style>
