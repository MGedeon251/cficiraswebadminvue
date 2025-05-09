<template>
  <div class="app-container">
    <!-- Top Navigation -->
    <nav class="app-navbar">
      <div class="navbar-content">
        <div class="navbar-brand-container">
          <a class="navbar-brand" href="#">
            <i class="bi bi-journal-bookmark-fill"></i>
            <span>CFI-NOTES</span>
          </a>
          <button class="navbar-toggler" type="button" @click="toggleSidebar">
            <i class="bi bi-list"></i>
          </button>
        </div>

        <div class="navbar-controls">
          <div class="academic-year-selector">
            <i class="bi bi-calendar-range"></i>
            <select class="form-select form-select-sm">
              <option>2022-2023</option>
              <option>2021-2022</option>
            </select>
          </div>
          <div class="user-profile">
            <img src="https://via.placeholder.com/32" alt="Profile" class="profile-pic" />
            <span class="username">Admin</span>
          </div>
        </div>
      </div>
    </nav>

    <div class="app-wrapper">
      <!-- Dynamic Sidebar -->
      <aside :class="['app-sidebar', { collapsed: !sidebarOpen }]">
        <div class="sidebar-header">
          <h5 v-if="sidebarOpen">Menu Principal</h5>
          <button class="sidebar-toggle" @click="toggleSidebar">
            <i
              :class="sidebarOpen ? 'bi bi-chevron-double-left' : 'bi bi-chevron-double-right'"
            ></i>
          </button>
        </div>

        <div class="sidebar-menu">
          <div class="menu-group">
            <div class="menu-title" v-if="sidebarOpen">Tableau de bord</div>
            <ul class="nav">
              <li class="nav-item">
                <a class="nav-link active" href="#">
                  <i class="bi bi-journal-text"></i>
                  <span v-if="sidebarOpen">Notes / Bulletins</span>
                  <span v-else class="tooltip">Notes / Bulletins</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  <i class="bi bi-people-fill"></i>
                  <span v-if="sidebarOpen">Gestion des élèves</span>
                  <span v-else class="tooltip">Gestion des élèves</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  <i class="bi bi-journals"></i>
                  <span v-if="sidebarOpen">Matières et enseignants</span>
                  <span v-else class="tooltip">Matières et enseignants</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  <i class="bi bi-building"></i>
                  <span v-if="sidebarOpen">Sections / Classes</span>
                  <span v-else class="tooltip">Sections / Classes</span>
                </a>
              </li>
            </ul>
          </div>

          <div class="menu-group">
            <div class="menu-title" v-if="sidebarOpen">Paramètres</div>
            <ul class="nav">
              <li class="nav-item">
                <a class="nav-link" href="#">
                  <i class="bi bi-gear-fill"></i>
                  <span v-if="sidebarOpen">Paramètres généraux</span>
                  <span v-else class="tooltip">Paramètres généraux</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  <i class="bi bi-box-arrow-right"></i>
                  <span v-if="sidebarOpen">Déconnexion</span>
                  <span v-else class="tooltip">Déconnexion</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="main-content" :class="{ expanded: !sidebarOpen }">
        <div class="content-header">
          <div class="header-content">
            <div class="page-info">
              <h1>Enregistrement des notes</h1>
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item"><a href="#">Tableau de bord</a></li>
                  <li class="breadcrumb-item active" aria-current="page">Notes</li>
                </ol>
              </nav>
            </div>

            <div class="action-buttons">
              <button type="button" class="btn btn-primary btn-sm">
                <i class="bi bi-upload"></i> Importer
              </button>
              <button type="button" class="btn btn-outline-primary btn-sm">
                <i class="bi bi-download"></i> Exporter
              </button>
              <button type="button" class="btn btn-success btn-sm">
                <i class="bi bi-save"></i> Enregistrer
              </button>
            </div>
          </div>
        </div>

        <div class="content-body">
          <!-- Filters -->
          <div class="filters-card">
            <div class="row g-3">
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
          </div>

          <div class="card coefficients-card">
            <div class="card-header">
              <h3 class="card-title">Paramètres d'évaluation</h3>
            </div>
            <div class="card-body">
              <div class="row g-3">
                <div class="col-md-4">
                  <label class="form-label">Année</label>
                  <div class="input-group">
                    <span class="input-group-text"><i class="bi bi-calendar"></i></span>
                    <input type="text" class="form-control" value="2022-2023" readonly />
                  </div>
                </div>
                <div class="col-md-4">
                  <label class="form-label">Coefficient</label>
                  <div class="input-group">
                    <span class="input-group-text"><i class="bi bi-percent"></i></span>
                    <input type="number" class="form-control" value="5" min="1" max="10" />
                  </div>
                </div>
                <div class="col-md-4">
                  <label class="form-label">Compétence évaluée</label>
                  <div class="input-group">
                    <span class="input-group-text"><i class="bi bi-check-circle"></i></span>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Ex: Compréhension écrite"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Notes Table -->
          <div class="notes-table-container">
            <div class="table-actions">
              <div class="search-box">
                <i class="bi bi-search"></i>
                <input type="text" placeholder="Rechercher un élève..." v-model="searchQuery" />
              </div>
              <div class="table-stats">
                <span class="badge bg-info">{{ filteredStudents.length }} élèves</span>
                <span class="badge bg-success">Moyenne: {{ averageGrade.toFixed(2) }}</span>
              </div>
            </div>

            <div class="table-responsive">
              <table class="table notes-table">
                <thead>
                  <tr>
                    <th width="50">#</th>
                    <th width="120">Matricule</th>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th width="150">Note</th>
                    <th width="120">Appréciation</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(student, index) in filteredStudents"
                    :key="student.matricule"
                    :class="{
                      'highlight-row': student.note >= 16,
                      'warning-row': student.note < 10,
                    }"
                  >
                    <td>{{ index + 1 }}</td>
                    <td class="text-muted">{{ student.matricule }}</td>
                    <td>
                      <strong>{{ student.nom }}</strong>
                    </td>
                    <td>{{ student.prenom }}</td>
                    <td>
                      <div class="note-input-container">
                        <input
                          type="number"
                          class="form-control note-input"
                          v-model="student.note"
                          min="0"
                          max="20"
                          step="0.25"
                          @change="validateNote(student)"
                        />
                        <span class="note-max">/20</span>
                      </div>
                    </td>
                    <td>
                      <span class="grade-badge" :class="getGradeClass(student.note)">
                        {{ calculateGrade(student.note) }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="table-footer">
              <div class="showing-entries">
                Affichage de 1 à {{ filteredStudents.length }} sur
                {{ filteredStudents.length }} entrées
              </div>
            </div>
          </div>
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
      searchQuery: '',
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
  computed: {
    filteredStudents() {
      if (!this.searchQuery) return this.students;
      const query = this.searchQuery.toLowerCase();
      return this.students.filter(
        (student) =>
          student.nom.toLowerCase().includes(query) ||
          student.prenom.toLowerCase().includes(query) ||
          student.matricule.toLowerCase().includes(query)
      );
    },
    averageGrade() {
      const validNotes = this.students.filter((s) => s.note !== '' && !isNaN(s.note));
      if (validNotes.length === 0) return 0;
      const sum = validNotes.reduce((total, student) => total + parseFloat(student.note), 0);
      return sum / validNotes.length;
    },
  },
  methods: {
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    },
    calculateGrade(note) {
      if (!note && note !== 0) return '';
      const num = parseFloat(note);
      if (isNaN(num)) return '';
      if (num >= 18) return 'Excellent';
      if (num >= 16) return 'Très Bien';
      if (num >= 14) return 'Bien';
      if (num >= 12) return 'Assez Bien';
      if (num >= 10) return 'Passable';
      return 'Insuffisant';
    },
    getGradeClass(note) {
      if (!note && note !== 0) return '';
      const num = parseFloat(note);
      if (isNaN(num)) return '';
      if (num >= 16) return 'grade-excellent';
      if (num >= 12) return 'grade-good';
      if (num >= 10) return 'grade-average';
      return 'grade-fail';
    },
    validateNote(student) {
      if (student.note === '') return;
      const num = parseFloat(student.note);
      if (isNaN(num)) {
        student.note = '';
        return;
      }
      if (num < 0) student.note = 0;
      if (num > 20) student.note = 20;
    },
  },
};
</script>

<style scoped>
/* Base Styles */
:root {
  --primary-color: #4361ee;
  --secondary-color: #3f37c9;
  --success-color: #4cc9f0;
  --danger-color: #f72585;
  --warning-color: #f8961e;
  --info-color: #4895ef;
  --light-color: #f8f9fa;
  --dark-color: #212529;
  --sidebar-width: 250px;
  --sidebar-collapsed-width: 70px;
  --navbar-height: 60px;
}

* {
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f5f7fa;
}

/* Layout */
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-wrapper {
  display: flex;
  flex: 1;
  margin-top: var(--navbar-height);
}

/* Navbar Styles */
.app-navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--navbar-height);
  background-color: var(--primary-color);
  color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.navbar-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 0 20px;
}

.navbar-brand-container {
  display: flex;
  align-items: center;
  gap: 15px;
}

.navbar-brand {
  color: white;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  gap: 10px;
}

.navbar-brand i {
  font-size: 1.5rem;
}

.navbar-toggler {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  display: none;
}

.navbar-controls {
  display: flex;
  align-items: center;
  gap: 20px;
}

.academic-year-selector {
  display: flex;
  align-items: center;
  gap: 8px;
  color: white;
}

.academic-year-selector select {
  width: 120px;
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.academic-year-selector select option {
  color: var(--dark-color);
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

.profile-pic {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(255, 255, 255, 0.5);
}

.username {
  font-weight: 500;
}

/* Sidebar Styles */
.app-sidebar {
  width: var(--sidebar-width);
  background-color: white;
  height: calc(100vh - var(--navbar-height));
  position: fixed;
  left: 0;
  top: var(--navbar-height);
  transition: all 0.3s ease;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  z-index: 900;
}

.app-sidebar.collapsed {
  width: var(--sidebar-collapsed-width);
}

.sidebar-header {
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
}

.sidebar-header h5 {
  margin: 0;
  font-size: 1rem;
  color: var(--dark-color);
}

.sidebar-toggle {
  background: none;
  border: none;
  color: #6c757d;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s;
}

.sidebar-toggle:hover {
  color: var(--primary-color);
}

.sidebar-menu {
  flex: 1;
  overflow-y: auto;
  padding: 15px 0;
}

.menu-group {
  margin-bottom: 20px;
}

.menu-title {
  padding: 8px 20px;
  font-size: 0.75rem;
  text-transform: uppercase;
  color: #6c757d;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.nav {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-item {
  margin: 5px 0;
}

.nav-link {
  display: flex;
  align-items: center;
  padding: 10px 20px;
  color: #495057;
  text-decoration: none;
  transition: all 0.2s;
  position: relative;
  white-space: nowrap;
  overflow: hidden;
}

.nav-link i {
  font-size: 1.1rem;
  min-width: 24px;
  text-align: center;
  color: #6c757d;
}

.nav-link span {
  margin-left: 10px;
  transition: all 0.2s;
}

.nav-link:hover {
  background-color: #f8f9fa;
  color: var(--primary-color);
}

.nav-link:hover i {
  color: var(--primary-color);
}

.nav-link.active {
  background-color: rgba(67, 97, 238, 0.1);
  color: var(--primary-color);
  border-left: 3px solid var(--primary-color);
}

.nav-link.active i {
  color: var(--primary-color);
}

/* Tooltip for collapsed sidebar */
.tooltip {
  position: absolute;
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  background-color: var(--dark-color);
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 0.8rem;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s;
  pointer-events: none;
  z-index: 999;
}

.collapsed .nav-link:hover .tooltip {
  opacity: 1;
  visibility: visible;
  left: calc(100% + 15px);
}

/* Main Content Styles */
.main-content {
  flex: 1;
  margin-left: var(--sidebar-width);
  transition: all 0.3s ease;
  background-color: #f5f7fa;
  min-height: calc(100vh - var(--navbar-height));
}

.main-content.expanded {
  margin-left: var(--sidebar-collapsed-width);
}

.content-header {
  background-color: white;
  padding: 20px;
  border-bottom: 1px solid #eee;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

.page-info h1 {
  font-size: 1.5rem;
  margin: 0;
  color: var(--dark-color);
}

.breadcrumb {
  padding: 0;
  margin: 5px 0 0;
  background: none;
  font-size: 0.85rem;
}

.breadcrumb-item a {
  color: #6c757d;
  text-decoration: none;
}

.breadcrumb-item.active {
  color: var(--primary-color);
}

.action-buttons {
  display: flex;
  gap: 10px;
}

.content-body {
  padding: 20px;
}

/* Cards */
.filters-card {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.coefficients-card {
  margin-bottom: 20px;
  border: none;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.coefficients-card .card-header {
  background-color: white;
  border-bottom: 1px solid #eee;
  padding: 15px 20px;
}

.coefficients-card .card-title {
  margin: 0;
  font-size: 1.1rem;
  color: var(--dark-color);
}

.coefficients-card .card-body {
  padding: 20px;
}

.input-group-text {
  background-color: #f8f9fa;
}

/* Table Styles */
.notes-table-container {
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.table-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid #eee;
}

.search-box {
  position: relative;
  width: 300px;
}

.search-box i {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #6c757d;
}

.search-box input {
  padding-left: 35px;
  border-radius: 20px;
  border: 1px solid #ddd;
  width: 100%;
  height: 36px;
}

.table-stats {
  display: flex;
  gap: 10px;
}

.notes-table {
  margin: 0;
}

.notes-table thead th {
  background-color: #f8f9fa;
  color: #495057;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.5px;
  padding: 12px 15px;
  border-bottom: 1px solid #eee;
}

.notes-table tbody td {
  padding: 12px 15px;
  vertical-align: middle;
  border-bottom: 1px solid #eee;
}

.note-input-container {
  position: relative;
  display: flex;
  align-items: center;
}

.note-input {
  padding-right: 40px;
  text-align: center;
}

.note-max {
  position: absolute;
  right: 10px;
  color: #6c757d;
  font-size: 0.8rem;
}

.grade-badge {
  display: inline-block;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
}

.grade-excellent {
  background-color: rgba(67, 97, 238, 0.1);
  color: var(--primary-color);
}

.grade-good {
  background-color: rgba(72, 149, 239, 0.1);
  color: var(--info-color);
}

.grade-average {
  background-color: rgba(76, 201, 240, 0.1);
  color: var(--success-color);
}

.grade-fail {
  background-color: rgba(248, 37, 133, 0.1);
  color: var(--danger-color);
}

.highlight-row {
  background-color: rgba(67, 97, 238, 0.05);
}

.warning-row {
  background-color: rgba(248, 37, 133, 0.05);
}

.table-footer {
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #eee;
  font-size: 0.85rem;
  color: #6c757d;
}

/* Responsive Adjustments */
@media (max-width: 992px) {
  .app-sidebar {
    transform: translateX(-100%);
  }

  .app-sidebar.collapsed {
    transform: translateX(-100%);
  }

  .app-sidebar.open {
    transform: translateX(0);
  }

  .main-content {
    margin-left: 0 !important;
  }

  .navbar-toggler {
    display: block;
  }

  .header-content {
    flex-direction: column;
    align-items: flex-start;
  }

  .action-buttons {
    width: 100%;
    justify-content: flex-end;
  }
}

@media (max-width: 768px) {
  .search-box {
    width: 100%;
  }

  .table-actions {
    flex-direction: column;
    gap: 15px;
    align-items: flex-start;
  }

  .table-stats {
    width: 100%;
    justify-content: space-between;
  }

  .notes-table thead {
    display: none;
  }

  .notes-table tbody tr {
    display: block;
    margin-bottom: 15px;
    border: 1px solid #eee;
    border-radius: 8px;
  }

  .notes-table tbody td {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #eee;
  }

  .notes-table tbody td::before {
    content: attr(data-label);
    font-weight: 600;
    margin-right: 15px;
    color: #6c757d;
  }

  .notes-table tbody td:last-child {
    border-bottom: none;
  }
}
</style>
