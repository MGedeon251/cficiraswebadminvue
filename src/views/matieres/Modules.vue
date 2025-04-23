<script setup="setup">
import sidebar from '@/components/Header.vue';
</script>

<template>
  <div>
    <div class="row">
      <div class="col-md-12 grid-margin">
        <div class="d-flex justify-content-between flex-wrap">
          <div class="d-flex align-items-end flex-wrap">
            <div class="me-md-3 me-xl-5">
              <h2>Gestions des modules</h2>
              <p class="mb-md-0">Unite d'enseignements, Matiere et cours</p>
            </div>
            <div class="d-flex">
              <i class="mdi mdi-home text-muted hover-cursor"></i>
              <p class="text-muted mb-0 hover-cursor">&nbsp;/&nbsp;Portail&nbsp;/&nbsp;</p>
              <p class="text-primary mb-0 hover-cursor">Modules</p>
            </div>
          </div>
          <div class="d-flex justify-content-between align-items-end flex-wrap">
            <button class="btn btn-outline-dark me-2">Exporter</button>
            <div class="btn-group">
              <button
                type="button"
                class="btn btn-primary mt-2 mt-xl-0"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                aria-hidden="true"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
              >
                + Ajouter
              </button>
              <button
                type="button"
                class="btn btn-primary dropdown-toggle dropdown-toggle-split"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span class="visually-hidden">Toggle Dropdown</span>
              </button>
              <ul class="dropdown-menu">
                <li>
                  <a class="dropdown-item" href="#drag-drop-area">Importer fichier</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="container my-2">
        <!-- Header Section -->
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h4>Liste modules | matieres</h4>
        </div>
        <!-- Product Table -->
        <div class="card p-4">
          <div class="d-flex mb-3">
            <button class="btn btn-outline-dark me-2">Tout</button>
            <button class="btn btn-outline-dark me-2">Actives</button>
            <button class="btn btn-outline-dark me-2">Inactives</button>
            <button class="btn btn-outline-dark">Archivées</button>
          </div>
          <p>Manage your products and view their sales performance.</p>
          <table class="table table-hover align-middle">
            <thead>
              <tr>
                <th scope="col">Designation</th>
                <th scope="col">Etat</th>
                <th scope="col">Coef</th>
                <th scope="col">Nombre Heure</th>
                <th scope="col">Formateur</th>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Algorithme & Programmation</td>
                <td>
                  <span class="status-badge status-draft">Inactive</span>
                </td>
                <td>5</td>
                <td>25h</td>
                <td>OYERE Morel Garvey</td>
                <td>
                  <button class="btn btn-sm btn-outline-primary">...</button>
                </td>
              </tr>
              <tr>
                <td>Hypernova Headphones</td>
                <td>
                  <span class="status-badge status-active">Active</span>
                </td>
                <td>4</td>
                <td>100h</td>
                <td>OYERE Morel Garvey</td>
                <td>
                  <button class="btn btn-sm btn-outline-primary">...</button>
                </td>
              </tr>
              <tr>
                <td>AeroGlow Desk Lamp</td>
                <td>
                  <span class="status-badge status-active">Active</span>
                </td>
                <td>2</td>
                <td>50h</td>
                <td>OYERE Morel Garvey</td>
                <td>
                  <button class="btn btn-sm btn-outline-primary">...</button>
                </td>
              </tr>
              <tr>
                <td>Initiation aux Bases de données</td>
                <td>
                  <span class="status-badge status-draft">Inactive</span>
                </td>
                <td>3</td>
                <td>15h</td>
                <td>LEKOUNDA Mardochet Gédéon</td>
                <td>
                  <button class="btn btn-sm btn-outline-primary">...</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- Bootstrap JS -->
    </div>
    <div class="row">
      <div class="container my-2">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h4>Importer | Export (.csv, .xlsx)</h4>
        </div>
        <div class="card p-4">
          <div class="card-body dashboard-tabs p-0">
            <p class="text-muted">Importer une liste existant de matieres</p>
          </div>
          <!-- Drag & Drop File Upload -->
          <div
            id="drag-drop-area"
            class="drag-drop-area border rounded p-4 text-center"
            @dragover.prevent
            @dragenter.prevent="isDragging = true"
            @dragleave="isDragging = false"
            @drop.prevent="handleDrop"
            :class="{ 'drag-over': isDragging }"
          >
            <p class="text-muted">
              <i class="bi bi-upload text-primary fs-3"></i><br />
              Glissez deposer vos fichier ici ou
              <span class="text-primary">cliquer pour charger</span>
            </p>
            <input
              type="file"
              ref="fileInput"
              hidden="hidden"
              @change="handleFileUpload"
              accept=".csv, .xlsx"
              multiple="multiple"
            />
            <button class="btn btn-outline-primary mt-2" @click="openFileInput">
              Select Files
            </button>
          </div>

          <!-- Liste des fichiers importés -->
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
      </div>
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
