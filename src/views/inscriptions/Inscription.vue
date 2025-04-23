<template>
  <div>
    <div class="row">
      <div class="col-md-12 grid-margin">
        <div class="d-flex justify-content-between flex-wrap">
          <div class="d-flex align-items-end flex-wrap">
            <div class="me-md-3 me-xl-5">
              <h2>Gestion des Inscriptions</h2>
              <p class="mb-md-0">Inscriptions et reinscriptions etudiants</p>
            </div>
            <div class="d-flex">
              <i class="mdi mdi-home text-muted hover-cursor"></i>
              <p class="text-muted mb-0 hover-cursor">&nbsp;/&nbsp;Portail&nbsp;/&nbsp;</p>
              <p class="text-primary mb-0 hover-cursor">Inscriptions</p>
            </div>
          </div>
          <div class="d-flex justify-content-between align-items-end flex-wrap"></div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="row">
        <div class="container my-2">
          <div class="col-md-12 grid margin stretch-card">
            <div class="card">
              <SkeletonLoader v-if="loading" type="table" :rows="3" :columns="1" />
              <div v-else class="card-body">
                <div class="d-flex justify-content-between flex-wrap">
                  <div class="d-flex align-items-end flex-wrap">
                    <div class="me-md-4 me-xl-5">
                      <div class="filters d-flex gap-2 mb-3">
                        <select v-model="selectedYear" class="form-select">
                          <option v-for="year in academicYears" :key="year" :value="year">
                            {{ year }}
                          </option>
                        </select>
                        <select v-model="selectedClass" class="form-select">
                          <option v-for="classItem in classes" :key="classItem" :value="classItem">
                            {{ classItem }}
                          </option>
                        </select>
                        <select v-model="selectedPaymentStatus" class="form-select">
                          <option value="all">Tous</option>
                          <option value="paid">Payé</option>
                          <option value="unpaid">Non payé</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div class="d-flex justify-content-between align-items-end flex-wrap">
                    <button class="btn btn-outline-dark me-2">Exporter</button>
                    <button
                      class="btn btn-primary mt-2 mt-xl-0"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                    >
                      Nouvelle inscription
                    </button>
                  </div>
                  <div
                    class="modal fade"
                    id="exampleModal"
                    tabindex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div class="modal-dialog modal-lg" role="document">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" id="exampleModalLabel">Inscription</h5>
                          <button
                            type="button"
                            class="close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div class="modal-body">
                          <p>Données vides</p>
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-success">Submit</button>
                          <button type="button" class="btn btn-light" data-bs-dismiss="modal">
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="table-responsive">
                  <table class="table table-hover align-middle">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Matricule</th>
                        <th scope="col">Noms</th>
                        <th scope="col">Prenoms</th>
                        <th scope="col">Classe</th>
                        <th scope="col">Année</th>
                        <th scope="col">Paiement</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                          <div class="dropdown">
                            <button
                              class="btn btn-sm btn-outline-primary dropdown-toggle"
                              data-bs-toggle="dropdown"
                            >
                              ...
                            </button>
                            <div class="dropdown-menu">
                              <a class="dropdown-item" href="#detail">Details</a>
                              <a class="dropdown-item" href="#update">Modifier</a>
                              <a class="dropdown-item" href="#validate">Valider paiement</a>
                              <li class="dropdown-divider"></li>
                              <a class="dropdown-item text-danger" href="#delete">Supprimer</a>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="container my-2">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h4>Importer | Exporter liste(s)</h4>
        </div>
        <SkeletonLoader v-if="loading" type="card" :rows="3" :columns="1" />
        <div v-else class="card p-4">
          <div class="card-body dashboard-tabs p-0">
            <p class="text-muted">
              Importer une liste existant des etudiant en format .csv et .xlsx
            </p>
          </div>
          <!-- Drag & Drop File Upload -->
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

<script setup>
import SkeletonLoader from '@/components/SkeletonLoader.vue';
import sidebar from '@/components/Header.vue';
import { ref, computed, onMounted } from 'vue';

const loading = ref(true);
const formateurs = ref([]);
const academicYears = ref(['2023-2024', '2024-2025']);
const classes = ref(['Licence 1', 'Licence 2', 'Master 1']);
const selectedYear = ref('2023-2024');
const selectedClass = ref('Licence 1');
const selectedPaymentStatus = ref('all');

onMounted(() => {
  setTimeout(() => {
    formateurs.value = [
      {
        id: 1,
        matricule: 'F001',
        nom: 'Doe',
        prenom: 'John',
        email: 'john@example.com',
        telephone: '0123456789',
      },
      {
        id: 2,
        matricule: 'F002',
        nom: 'Smith',
        prenom: 'Anna',
        email: 'anna@example.com',
        telephone: '0987654321',
      },
    ];
    loading.value = false;
  }, 3000);
});
</script>

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

<style scoped="scoped">
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
}
</style>
