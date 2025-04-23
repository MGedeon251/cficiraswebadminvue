<script setup>
import { ref, onMounted } from 'vue';
import SkeletonLoader from '@/components/SkeletonLoader.vue';

</script>

<template>
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
                        <div class="col-md-6">
                            <select class="form-select">
                                <option value="informatique" selected="selected">Informatique</option>
                                <option value="administration">Administration</option>
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
                   <th>#</th>
                    <th>Matricule</th>
                    <th>Noms</th>
                    <th>Prenoms</th>
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