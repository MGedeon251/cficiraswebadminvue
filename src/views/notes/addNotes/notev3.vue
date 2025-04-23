<template>
  <div class="container-fluid g-0">
    <!-- Top Navigation -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container-fluid">
        <a class="navbar-brand fw-bold" href="#">CFI-NOTES</a>
        <button class="navbar-toggler" type="button" @click="toggleSidebar">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="dropdown ms-auto">
          <button class="btn btn-light dropdown-toggle" type="button" id="anneeDropdown">
            Année scolaire 2022-2023
          </button>
          <ul class="dropdown-menu dropdown-menu-end">
            <li><a class="dropdown-item" href="#">2022-2023</a></li>
            <li><a class="dropdown-item" href="#">2021-2022</a></li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="wrapper">
      <!-- Dynamic Sidebar -->
      <aside :class="['sidebar', { collapsed: !sidebarOpen }]">
        <div class="sidebar-header d-flex justify-content-between align-items-center p-3">
          <h5 v-if="sidebarOpen" class="mb-0">Menu Principal</h5>
          <button class="btn btn-sm btn-outline-secondary" @click="toggleSidebar">
            <i :class="sidebarOpen ? 'bi bi-chevron-left' : 'bi bi-chevron-right'"></i>
          </button>
        </div>

        <div class="sidebar-menu">
          <div class="menu-group">
            <div class="menu-title" v-if="sidebarOpen">Tableau de bord</div>
            <ul class="nav flex-column">
              <li class="nav-item">
                <a class="nav-link active" href="#" title="Notes / Bulletins">
                  <i class="bi bi-journal-text"></i>
                  <span v-if="sidebarOpen">Notes / Bulletins</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" title="Gestion des élèves">
                  <i class="bi bi-people"></i>
                  <span v-if="sidebarOpen">Gestion des élèves</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" title="Matières et enseignants">
                  <i class="bi bi-book"></i>
                  <span v-if="sidebarOpen">Matières et enseignants</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" title="Sections / Classes">
                  <i class="bi bi-building"></i>
                  <span v-if="sidebarOpen">Sections / Classes</span>
                </a>
              </li>
            </ul>
          </div>

          <div class="menu-group">
            <div class="menu-title" v-if="sidebarOpen">Paramètres</div>
            <ul class="nav flex-column">
              <li class="nav-item">
                <a class="nav-link" href="#" title="Paramètres généraux">
                  <i class="bi bi-gear"></i>
                  <span v-if="sidebarOpen">Paramètres généraux</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="main-content" :class="{ expanded: !sidebarOpen }">
        <div class="content-header p-3 bg-light border-bottom">
          <div class="d-flex justify-content-between align-items-center">
            <h2 class="h4 mb-0">Enregistrement des notes</h2>
            <div class="btn-group">
              <button type="button" class="btn btn-sm btn-outline-primary">
                <i class="bi bi-upload me-1"></i> Importer
              </button>
              <button type="button" class="btn btn-sm btn-outline-primary">
                <i class="bi bi-download me-1"></i> Exporter
              </button>
            </div>
          </div>
        </div>

        <div class="content-body p-3">
          <!-- Le reste de votre contenu (filtres, tableau, etc.) reste identique -->
          <!-- Filters -->
          <div class="row mb-4 g-3">
            <div class="col-md-3">
              <label class="form-label">Section</label>
              <select class="form-select">
                <option>FRANCOPHONE</option>
                <option>ANGLOPHONE</option>
              </select>
            </div>
            <div class="col-md-3">
              <label class="form-label">Classe</label>
              <select class="form-select">
                <option>6ème</option>
                <option>5ème</option>
              </select>
            </div>
            <div class="col-md-3">
              <label class="form-label">Matière</label>
              <select class="form-select">
                <option>FRANCAIS</option>
                <option>MATHEMATIQUES</option>
              </select>
            </div>
            <div class="col-md-3">
              <label class="form-label">Séquence</label>
              <select class="form-select">
                <option>1</option>
                <option>2</option>
              </select>
            </div>
          </div>

          <div class="card mb-4">
            <div class="card-header d-flex justify-content-between align-items-center">
              <span>Enregistrement des Coefficients</span>
              <button class="btn btn-sm btn-primary">Enregistrer</button>
            </div>
            <div class="card-body">
              <div class="row g-3">
                <div class="col-md-4">
                  <label class="form-label">Année</label>
                  <input type="text" class="form-control" value="2022-2023" readonly />
                </div>
                <div class="col-md-4">
                  <label class="form-label">Coef</label>
                  <input type="number" class="form-control" value="5" />
                </div>
                <div class="col-md-4">
                  <label class="form-label">Compétence évaluée</label>
                  <input type="text" class="form-control" />
                </div>
              </div>
            </div>
          </div>

          <!-- Notes Table -->
          <div class="table-responsive">
            <table class="table table-striped table-hover">
              <thead class="table-light">
                <tr>
                  <th>#</th>
                  <th>Matricule</th>
                  <th>Nom</th>
                  <th>Prénom</th>
                  <th>Note</th>
                  <th>Grade</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(student, index) in students" :key="student.matricule">
                  <td>{{ index + 1 }}</td>
                  <td>{{ student.matricule }}</td>
                  <td>{{ student.nom }}</td>
                  <td>{{ student.prenom }}</td>
                  <td>
                    <input
                      type="number"
                      class="form-control form-control-sm"
                      v-model="student.note"
                      min="0"
                      max="20"
                      step="0.5"
                    />
                  </td>
                  <td>{{ calculateGrade(student.note) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- ... -->
        </div>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sidebarOpen: true,
      students: [
        { matricule: 'FR220009', nom: 'ARNORILD', prenom: 'JOHNSON', note: 10 },
        { matricule: 'FR220020', nom: 'BERTRAND', prenom: '', note: 20 },
        { matricule: 'FR220012', nom: 'BEYONCE', prenom: '', note: 15 },
        { matricule: 'FR220007', nom: 'BRUND', prenom: 'PIERRE', note: 14 },
        { matricule: 'FR220015', nom: 'CHRISTINE', prenom: 'VIOLET', note: 16 },
        { matricule: 'FR220013', nom: 'HILARY', prenom: 'JOHNSON', note: 14.5 },
        { matricule: 'FR220001', nom: 'JEAN', prenom: 'PAUL', note: 10 },
        { matricule: 'FR220004', nom: 'JOEL', prenom: 'DANIELLE', note: 5 },
        { matricule: 'FR220034', nom: 'JULIE', prenom: 'LOVE', note: 18 },
        { matricule: 'FR220016', nom: 'JUNIOR', prenom: 'TAIIBE', note: 11 },
      ],
    };
  },
  methods: {
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    },
    calculateGrade(note) {
      if (!note) return '';
      if (note >= 18) return 'E';
      if (note >= 16) return 'A';
      if (note >= 14) return 'A';
      if (note >= 12) return 'B';
      if (note >= 10) return 'ECA';
      return 'NA';
    },
  },
};
</script>

<style scoped>
/* Layout */
.wrapper {
  display: flex;
  min-height: calc(100vh - 56px); /* 56px = hauteur navbar */
}

.sidebar {
  width: 250px;
  height: 100%;
  background: #fff;
  border-right: 1px solid #dee2e6;
  transition: all 0.3s ease;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.sidebar.collapsed {
  width: 60px;
}

.main-content {
  flex: 1;
  transition: all 0.3s ease;
  overflow-x: hidden;
}

.main-content.expanded {
  margin-left: 60px;
}

/* Sidebar styles */
.sidebar-header {
  border-bottom: 1px solid #dee2e6;
}

.menu-group {
  margin-bottom: 1rem;
}

.menu-title {
  padding: 0.5rem 1rem;
  font-size: 0.75rem;
  text-transform: uppercase;
  color: #6c757d;
  font-weight: 600;
}

.nav-link {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  color: #495057;
  white-space: nowrap;
}

.nav-link:hover {
  background-color: #f8f9fa;
  color: #0d6efd;
}

.nav-link.active {
  color: #0d6efd;
  background-color: rgba(13, 110, 253, 0.1);
  border-left: 3px solid #0d6efd;
}

.nav-link i {
  margin-right: 0.75rem;
  font-size: 1.1rem;
  min-width: 20px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    z-index: 1000;
    height: 100vh;
    left: 0;
    top: 56px;
    transform: translateX(-100%);
  }

  .sidebar.collapsed {
    transform: translateX(-100%);
  }

  .sidebar.open {
    transform: translateX(0);
  }

  .main-content {
    margin-left: 0 !important;
  }
}
</style>
