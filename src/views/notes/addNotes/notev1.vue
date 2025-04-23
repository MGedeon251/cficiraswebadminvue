<template>
  <div class="container-fluid">
    <!-- Header -->
    <header class="d-flex justify-content-between align-items-center py-3 border-bottom">
      <h1 class="h3 mb-0">GanaIis School</h1>
      <div class="dropdown">
        <button
          class="btn btn-secondary dropdown-toggle"
          type="button"
          id="anneeDropdown"
          data-bs-toggle="dropdown"
        >
          Année scolaire 2022-2023
        </button>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" href="#">2022-2023</a></li>
          <li><a class="dropdown-item" href="#">2021-2022</a></li>
        </ul>
      </div>
    </header>

    <div class="row">
      <!-- Sidebar -->
      <div class="col-md-3 col-lg-2 d-md-block sidebar collapse bg-light">
        <div class="position-sticky pt-3">
          <h5 class="sidebar-heading px-3 mt-4 mb-1 text-muted">Tableau de bord</h5>
          <ul class="nav flex-column">
            <li class="nav-item">
              <a class="nav-link active" href="#">
                <i class="bi bi-journal-text me-2"></i> Notes / Bulletins
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                <i class="bi bi-people me-2"></i> Gestion des élèves
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                <i class="bi bi-book me-2"></i> Matières et enseignants
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                <i class="bi bi-building me-2"></i> Sections / Classes
              </a>
            </li>
          </ul>

          <h5 class="sidebar-heading px-3 mt-4 mb-1 text-muted">Paramètres</h5>
          <ul class="nav flex-column mb-2">
            <li class="nav-item">
              <a class="nav-link" href="#"> <i class="bi bi-gear me-2"></i> Paramètres généraux </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Main Content -->
      <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4 py-4">
        <div
          class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
        >
          <h2 class="h4">Enregistrement des notes</h2>
          <div class="btn-toolbar mb-2 mb-md-0">
            <div class="btn-group me-2">
              <button type="button" class="btn btn-sm btn-outline-secondary">
                <i class="bi bi-upload me-1"></i> Importer des notes
              </button>
              <button type="button" class="btn btn-sm btn-outline-secondary">
                <i class="bi bi-download me-1"></i> Exporter les notes
              </button>
            </div>
          </div>
        </div>

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

        <!-- Coefficients -->
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

        <!-- Date and Save Button -->
        <div class="d-flex justify-content-between mt-3">
          <div class="col-md-3">
            <label class="form-label">Date de composition</label>
            <input type="date" class="form-control" value="2023-07-17" />
          </div>
          <button class="btn btn-primary">Enregistrer toutes les notes</button>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
.sidebar {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  padding: 48px 0 0;
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.1);
}

.sidebar .nav-link {
  font-weight: auto;
  color: #333;
}

.sidebar .nav-link.active {
  color: #0d6efd;
}

main {
  padding-top: 1.5rem;
}

.table-responsive {
  max-height: 500px;
  overflow-y: auto;
}

.form-control-sm {
  max-width: 80px;
}

.card-header {
  background-color: #f8f9fa;
}
</style>
