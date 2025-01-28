<script setup>
import sidebar from '@/components/Header.vue'
</script>

<template>
    <div>
        <sidebar>
            <div class="row">
                <div class="col-md-12 grid-margin">
                    <div class="d-flex justify-content-between flex-wrap">
                        <div class="d-flex align-items-end flex-wrap">
                            <div class="me-md-3 me-xl-5">
                                <h2>Portails Etudiants</h2>
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
                
            </div>

            
        </sidebar>
    </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: "",
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
/* Styles spécifiques */
.dropdown-submenu {
  position: relative;
}

.dropdown-submenu .dropdown-menu {
  top: 0;
  left: 100%;
  margin-top: -6px;
}
</style>