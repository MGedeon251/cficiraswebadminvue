<template>
  <DefaultLayout>
    
  </DefaultLayout>
    <div>
            <div class="row">
                <div class="col-md-12 grid-margin">
                    <div class="d-flex justify-content-between flex-wrap">
                        <div class="d-flex align-items-end flex-wrap">
                            <div class="me-md-3 me-xl-5">
                                <h2>Gestion des etudiants </h2>
                                <p class="mb-md-0">Gestion des etudiants</p>
                            </div>
                        <div class="d-flex">
                            <i class="mdi mdi-home text-muted hover-cursor"></i>
                            <p class="text-muted mb-0 hover-cursor">&nbsp;/&nbsp;Portail&nbsp;/&nbsp;</p>
                            <p class="text-primary mb-0 hover-cursor">Etudiants</p>
                        </div>
                        </div>
                        <div class="d-flex justify-content-between align-items-end flex-wrap">
                        </div>
                    </div>
                </div>
            </div>
  
        <div class="row">
            <div class="col-md-12 grid-margin stretch-card">
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title">Informations & Details </h4>
                        <SkeletonLoader v-if="loading" type="table" :rows="3" :columns="1"/>
                        <div v-else class="table-responsive">
                            <p class="card-description">Liste des etudiants inscrits</p>
                            <div class="d-flex justify-content-between flex-wrap">
                                            <div class="d-flex align-items-end flex-wrap">
                                              <div class="me-md-4 me-xl-5">
                                                <div class="filters d-flex gap-2 mb-2">
                                                    <div class="col-md-4">
                                                        <select class="form-select">
                                                            <option value="year">2022-2023</option>
                                                            <option value="year">2023-2024</option>
                                                            <option value="year">2024-2025</option>
                                                        </select>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <select class="form-select">
                                                            <option key="classItem" value="classItem">LAP 1
                                                            </option>
                                                            <option key="classItem" value="classItem">LAP 2
                                                            </option>
                                                            <option key="classItem" value="classItem">LAP 3
                                                            </option>
                                                        </select>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <select class="form-select">
                                                            <option value="all" selected>Tout</option>
                                                            <option value="paid">Informatique</option>
                                                            <option value="unpaid">Administration</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            </div>

                                            <div class="d-flex justify-content-between align-items-end flex-wrap">
                                                <button class="btn btn-outline-dark me-2">Actualiser</button>
                                                <button class="btn btn-outline-dark me-2">Exporter</button>
                                                <button
                                                    class="btn btn-primary mt-2 me-2 mt-xl-0"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#exampleModal">
                                                    + Ajouter
                                                </button>
                                              </div>
                                          </div>
                            
                            <table class="table table-hover align-middle">
                                    <thead>
                                    <tr>
                                        <th>Matricule</th>
                                        <th>Nom</th>
                                        <th>Prenom</th>
                                        <th>Email</th>
                                        <th>Telephone</th>
                                        <th>Filiere</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                      <td colspan="9" class="text-center py-4">
                                          <div class="d-flex flex-column align-items-center">
                                            <img src="/img/empty-box.svg" alt="Aucune donnée" class="mb-2" width="auto"/>
                                          </div>
                                          <div class="text-pr">Aucune donnée</div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="row">
            <h4>Listes etudiants </h4>
            <div class="col-md-12 grid-margin stretch-card">
             <div class="card">
                <SkeletonLoader v-if="loading" type="card" :rows="3" :columns="1"/>
                <div v-else class="card-body dashboard-tabs p-0">
                  <ul class="nav nav-tabs px-4" role="tablist">
                    <li class="nav-item">
                      <a class="nav-link active" id="overview-tab" data-bs-toggle="tab" href="#overview" role="tab" aria-controls="overview" aria-selected="true">Importer</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" id="sales-tab" data-bs-toggle="tab" href="#sales" role="tab" aria-controls="sales" aria-selected="false">Exporter</a>
                    </li>
                  </ul>
                  <div class="tab-content py-0 px-0">
                    <div class="tab-pane fade show active" id="overview" role="tabpanel" aria-labelledby="overview-tab">
                        <div class="d-flex flex-wrap justify-content-xl-between">
                            <div class="card-body">
                           
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
                                <input type="file" ref="fileInput" hidden @change="handleFileUpload" accept=".csv, .xlsx" multiple />
                                <button class="btn btn-outline-primary mt-2" @click="openFileInput">Select Files</button>
                            </div>
                            <div v-if="uploadedFiles.length" class="mt-3">
                                <h5 class="text-dark">Uploaded Files:</h5>
                                    <ul class="list-group">
                                        <li v-for="(file, index) in uploadedFiles" :key="index" class="list-group-item d-flex justify-content-between">
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
                    <div class="tab-pane fade" id="sales" role="tabpanel" aria-labelledby="sales-tab">
                        <div class="d-flex flex-wrap justify-content-xl-between">
                            <div class="card-body">
                                <h4 class="card-title"> </h4>
                                <p class="card-description"></p>
                            </div>
                        </div>
                    </div>
                  </div>
                </div>
            </div>
         </div>
        </div>
    </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import SkeletonLoader from '@/components/SkeletonLoader.vue';
  
  const loading = ref(true);
  const formateurs = ref([]);
  const academicYears = ref(["2023-2024", "2024-2025"]);
  const classes = ref(["Licence 1", "Licence 2", "Master 1"]);
  const selectedYear = ref("2023-2024");
  const selectedClass = ref("Licence 1");
  const selectedPaymentStatus = ref("all");
  onMounted(() => {
    setTimeout(() => {
      formateurs.value = [
        { id: 1, matricule: 'F001', nom: 'Doe', prenom: 'John', email: 'john@example.com', telephone: '0123456789' },
        { id: 2, matricule: 'F002', nom: 'Smith', prenom: 'Anna', email: 'anna@example.com', telephone: '0987654321' },
      ];
      loading.value = false;
    }, 3000);
  });
</script>
<script>
export default {
  data() {
    return {
      searchQuery: "",
      isDragging: false,
      uploadedFiles: [],
      tasks: [
        { id: "TASK-7103", label: "Feature", title: "Parse EXE bandwidth!", status: "Canceled", priority: "Low" },
        { id: "TASK-4314", label: "Bug", title: "Compress program for XML alarm", status: "In Progress", priority: "High" },
        { id: "TASK-3415", label: "Feature", title: "Use cross-platform XML", status: "Todo", priority: "Medium" },
        { id: "TASK-4336", label: "Documentation", title: "Synthesize microchip", status: "Done", priority: "Medium" },
      ],
    };
  },
  computed: {
    filteredTasks() {
      return this.tasks.filter(task => task.title.toLowerCase().includes(this.searchQuery.toLowerCase()));
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
      files.forEach(file => {
        if (file.type === "application/vnd.ms-excel" || file.type === "text/csv" || file.name.endsWith(".xlsx")) {
          this.uploadedFiles.push(file);
        }
      });
    },
    removeFile(index) {
      this.uploadedFiles.splice(index, 1);
    },
    statusClass(status) {
      return {
        "badge bg-danger text-white": status === "Canceled",
        "badge bg-warning text-dark": status === "In Progress",
        "badge bg-info text-white": status === "Todo",
        "badge bg-success text-white": status === "Done",
      };
    },
    priorityClass(priority) {
      return {
        "text-danger fw-bold": priority === "High",
        "text-warning fw-bold": priority === "Medium",
        "text-muted": priority === "Low",
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

<style scoped > body {
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