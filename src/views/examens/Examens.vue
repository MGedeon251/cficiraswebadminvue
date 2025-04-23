<script setup>
import sidebar from '@/components/Header.vue'
</script>

<template>
    <div>
            <div class="row">
                <div class="col-md-12 grid-margin">
                    <div class="d-flex justify-content-between flex-wrap">
                        <div class="d-flex align-items-end flex-wrap">
                            <div class="me-md-3 me-xl-5">
                                <h2>Gestion des Examens</h2>
                                <p class="mb-md-0">Planifications examens et salles de classes</p>
                            </div>
                            <div class="d-flex">
                                <i class="mdi mdi-home text-muted hover-cursor"></i>
                                <p class="text-muted mb-0 hover-cursor">&nbsp;/&nbsp;Portail&nbsp;/&nbsp;</p>
                                <p class="text-primary mb-0 hover-cursor">Examens</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div class="row">
                <div class="container my-2">
                    <!-- Header Section -->
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <h4>Planifications
                        </h4>
                    </div>
                    <div class="row">
                        <div class="col-md-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body dashboard-tabs p-0">
                                    <ul class="nav nav-tabs px-4" role="tablist">
                                        <li class="nav-item">
                                            <a
                                                class="nav-link active"
                                                id="overview-tab"
                                                data-bs-toggle="tab"
                                                href="#overview"
                                                role="tab"
                                                aria-controls="overview"
                                                aria-selected="true">Tout</a>
                                        </li>
                                        <li class="nav-item">
                                            <a
                                                class="nav-link"
                                                id="sales-tab"
                                                data-bs-toggle="tab"
                                                href="#sales"
                                                role="tab"
                                                aria-controls="sales"
                                                aria-selected="false">Semestre 1</a>
                                        </li>
                                        <li class="nav-item">
                                            <a
                                                class="nav-link"
                                                id="purchases-tab"
                                                data-bs-toggle="tab"
                                                href="#purchases"
                                                role="tab"
                                                aria-controls="purchases"
                                                aria-selected="false">Semestre 2</a>
                                        </li>
                                    </ul>
                                    <div class="tab-content py-0 px-0">
                                        <div
                                            class="tab-pane fade show active"
                                            id="overview"
                                            role="tabpanel"
                                            aria-labelledby="overview-tab">
                                            <div class="d-flex flex-wrap justify-content-xl-between">
                                                <div class="card-body">
                                                    <h4 class="card-title">Tout les examens
                                                    </h4>
                                                    <p class="card-description">Liste des examens pour une année académique</p>
                                                    <div class="table-responsive">
                                                        <table class="table table-hover align-middle">
                                                            <thead>
                                                                <tr>
                                                                    <th scope="col">Designation</th>
                                                                    <th scope="col">Etat</th>
                                                                    <th scope="col">Date</th>
                                                                    <th scope="col">Durée</th>
                                                                    <th scope="col">Formateur</th>
                                                                    <th scope="col"></th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>Examen Partiel session de fevrier 2025</td>
                                                                    <td>
                                                                        <span class="status-badge status-draft">Inactive</span>
                                                                    </td>
                                                                    <td>5 Fevrier 2025</td>
                                                                    <td>10j</td>
                                                                    <td>OYERE Morel Garvey</td>
                                                                    <td>
                                                                        <button class="btn btn-sm btn-outline-primary">...</button>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Examen Rappel session de Mars 2025</td>
                                                                    <td>
                                                                        <span class="status-badge status-active">Active</span>
                                                                    </td>
                                                                    <td>24 Mars 2025</td>
                                                                    <td>10j</td>
                                                                    <td>OYERE Morel Garvey</td>
                                                                    <td>
                                                                        <button class="btn btn-sm btn-outline-primary">...</button>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Examen Partiel session de Juin 2025</td>
                                                                    <td>
                                                                        <span class="status-badge status-active">Active</span>
                                                                    </td>
                                                                    <td>5 Juin 2025</td>
                                                                    <td>10j</td>
                                                                    <td>OYERE Morel Garvey</td>
                                                                    <td>
                                                                        <button class="btn btn-sm btn-outline-primary">...</button>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Examen Partiel session de Aout 2025</td>
                                                                    <td>
                                                                        <span class="status-badge status-draft">Inactive</span>
                                                                    </td>
                                                                    <td>3 Aout 2025</td>
                                                                    <td>10j</td>
                                                                    <td>LEKOUNDA Mardochet Gédéon</td>
                                                                    <td>
                                                                        <button class="btn btn-sm btn-outline-primary">...</button>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            class="tab-pane fade"
                                            id="sales"
                                            role="tabpanel"
                                            aria-labelledby="sales-tab">
                                            <div class="d-flex flex-wrap justify-content-xl-between">
                                                <div class="card-body">
                                                    <h4 class="card-title">Examens semestre 1 | 3 | 5
                                                    </h4>
                                                    <p class="card-description"></p>

                                                    <div class="table-responsive">
                                                        <div class="d-flex mb-3">
                                                            <ul class="nav nav-pills nav-pills-custom" id="pills-tab-custom" role="tablist">
                                                                <li class="nav-item">
                                                                    <a
                                                                        class="nav-link active "
                                                                        id="pills-home-tab-custom"
                                                                        data-bs-toggle="pill"
                                                                        href="#pills-health"
                                                                        role="tab"
                                                                        aria-controls="pills-home"
                                                                        aria-selected="true">
                                                                        Partiel
                                                                    </a>
                                                                </li>
                                                                <li class="nav-item">
                                                                    <a
                                                                        class="nav-link"
                                                                        id="pills-profile-tab-custom"
                                                                        data-bs-toggle="pill"
                                                                        href="#pills-career"
                                                                        role="tab"
                                                                        aria-controls="pills-profile"
                                                                        aria-selected="false">
                                                                        Rappel
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div class="tab-content tab-content-custom-pill" id="pills-tabContent-custom">
                                                            <div
                                                                class="tab-pane fade show active"
                                                                id="pills-health"
                                                                role="tabpanel"
                                                                aria-labelledby="pills-home-tab-custom">
                                                                <div class="table-responsive">
                                                                    <table class="table table-hover align-middle">
                                                                        <thead>
                                                                            <tr>
                                                                                <th scope="col">Designation</th>
                                                                                <th scope="col">Etat</th>
                                                                                <th scope="col">Date</th>
                                                                                <th scope="col">Durée</th>
                                                                                <th scope="col">Formateur</th>
                                                                                <th scope="col"></th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            <tr>
                                                                                <td
                                                                                    colspan="9"
                                                                                    class="text-center py-4"
                                                                                    style="width: 1020px; position: sticky; left: 0px; overflow: hidden;">
                                                                                    <div class="d-flex flex-column align-items-center">
                                                                                        <img
                                                                                            src="/img/empty-box.svg"
                                                                                            alt="Aucune donnée"
                                                                                            class="mb-2"
                                                                                            width="64"
                                                                                            height="41"/>
                                                                                    </div>
                                                                                    <div class="text-pr">Aucune donnée</div>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="tab-pane fade"
                                                                id="pills-career"
                                                                role="tabpanel"
                                                                aria-labelledby="pills-profile-tab-custom">
                                                                <div class="table-responsive">
                                                                    <table class="table table-hover align-middle">
                                                                        <thead>
                                                                            <tr>
                                                                                <th scope="col">Designation</th>
                                                                                <th scope="col">Etat</th>
                                                                                <th scope="col">Date</th>
                                                                                <th scope="col">Durée</th>
                                                                                <th scope="col">Formateur</th>
                                                                                <th scope="col"></th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            <tr>
                                                                                <td
                                                                                    colspan="9"
                                                                                    class="text-center py-4"
                                                                                    style="width: 1020px; position: sticky; left: 0px; overflow: hidden;">
                                                                                    <div class="d-flex flex-column align-items-center">
                                                                                        <img
                                                                                            src="/img/empty-box.svg"
                                                                                            alt="Aucune donnée"
                                                                                            class="mb-2"
                                                                                            width="64"
                                                                                            height="41"/>
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
                                            </div>
                                        </div>
                                        <div
                                            class="tab-pane fade"
                                            id="purchases"
                                            role="tabpanel"
                                            aria-labelledby="purchases-tab">
                                            <div class="d-flex flex-wrap justify-content-xl-between">
                                                <div class="card-body">
                                                    <h4 class="card-title">Examens semestre 2 | 4 | 6
                                                    </h4>
                                                    <div class="d-flex mb-3">
                                                        <button class="btn btn-outline-dark me-2">Partiel</button>
                                                        <button class="btn btn-outline-dark me-2">Rappel</button>
                                                    </div>
                                                    <p class="card-description"></p>
                                                    <div class="table-responsive">
                                                        <table class="table table-hover align-middle">
                                                            <thead>
                                                                <tr>
                                                                    <th scope="col">Designation</th>
                                                                    <th scope="col">Etat</th>
                                                                    <th scope="col">Date</th>
                                                                    <th scope="col">Durée</th>
                                                                    <th scope="col">Formateur</th>
                                                                    <th scope="col"></th>
                                                                </tr>
                                                            </thead>
                                                            <tbody></tbody>
                                                        </table>
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
                <!-- Bootstrap JS -->
            </div>
            <div class="row">
                <div class="container my-2">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <h4>Salle d'examens
                        </h4>
                    </div>
                    <div class="card p-4">

                        <div class="card-body dashboard-tabs p-0">
                            <p class="text-muted">Repartition automatiques des salles d'examens
                            </p>
                        </div>
                        <!-- Drag & Drop File Upload -->
                        <div
                            class="drag-drop-area border rounded p-4 text-center"
                            @dragover.prevent
                            @dragenter.prevent="isDragging = true"
                            @dragleave="isDragging = false"
                            @drop.prevent="handleDrop"
                            :class="{ 'drag-over': isDragging }">
                            <p class="text-muted">
                                <i class="bi bi-upload text-primary fs-3"></i><br/>
                                Glissez deposer vos fichier ici ou
                                <span class="text-primary">cliquer pour charger</span>
                            </p>
                            <input
                                type="file"
                                ref="fileInput"
                                hidden="hidden"
                                @change="handleFileUpload"
                                accept=".csv, .xlsx"
                                multiple="multiple"/>
                            <button class="btn btn-outline-primary mt-2" @click="openFileInput">Select Files</button>
                        </div>

                        <!-- Liste des fichiers importés -->
                        <div v-if="uploadedFiles.length" class="mt-3">
                            <h5 class="text-dark">Fichiers chargés:</h5>
                            <ul class="list-group">
                                <li
                                    v-for="(file, index) in uploadedFiles"
                                    :key="index"
                                    class="list-group-item d-flex justify-content-between">
                                    {{ file.name }}
                                    <button class="btn btn-sm btn-danger" @click="removeFile(index)">
                                        <i class="mdi mdi-close-circle-outline"></i>
                                    </button>
                                </li>
                            </ul>
                            <button class="btn btn-outline-primary mt-2">Repartition</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="container my-2">
                    <h4>Calendrier
                    </h4>
                    <p class="text-muted">Planifications et repartitions des salles matieres
                    </p>
                    <div class="card p-4">
                        <div class="card-body dashboard-tabs p-0">
                            <h4 class="card-title">Planification</h4>
                            <p class="card-description"></p>
                            <div class="d-flex gap-2 mb-3">
                                <button
                                    type="button"
                                    class="btn btn-outline-dark btn-icon me-3 d-none d-md-block ">
                                    <i class="mdi mdi-filter"></i>
                                </button>

                                <button type="button" class="btn btn-outline-dark btn-icon me-3 mt-2 mt-xl-0">
                                    <i class="mdi mdi-alert-circle"></i>
                                </button>
                                <button class="btn btn-primary mt-2 mt-xl-0">
                                    <span class="">Ajouter</span>
                                </button>
                            </div>
                            <div class="table-responsive">
                                <table class="table table-hover align-middle">
                                    <thead>
                                        <tr>
                                            <th scope="col">Designation</th>
                                            <th scope="col">Date</th>
                                            <th scope="col">Examens</th>
                                            <th scope="col">Semestre</th>
                                            <th scope="col">Formateur</th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody></tbody>
                                </table>
                            </div>
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