<template>
    <div class="container-fluid g-0">
      <!-- Top Navigation -->
      <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container-fluid">
          <a class="navbar-brand fw-bold" href="#">GanaIis School</a>
          <button class="navbar-toggler" type="button" @click="toggleSidebar">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="dropdown ms-auto">
            <button class="btn btn-light dropdown-toggle" type="button" id="anneeDropdown">
              Année scolaire {{ coefficients.annee }}
            </button>
            <ul class="dropdown-menu dropdown-menu-end">
              <li><a class="dropdown-item" href="#">2022-2023</a></li>
              <li><a class="dropdown-item" href="#">2021-2022</a></li>
            </ul>
          </div>
        </div>
      </nav>
  
      <div class="d-flex">
        <!-- Sidebar (à adapter ou masquer si besoin) -->
        <aside :class="['sidebar bg-light border-end p-3', { 'd-none': !sidebarOpen }]">
          <!-- Sidebar content (optionnel ici) -->
          <p class="text-muted">Sidebar (contenu à définir)</p>
        </aside>
  
        <!-- Main Content -->
        <main class="flex-fill">
          <div class="content-header p-3 bg-light border-bottom d-flex justify-content-between align-items-center">
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
  
          <div class="content-body p-4">
            <!-- Filtres -->
            <div class="card mb-4">
              <div class="card-body">
                <div class="row g-3">
                  <div class="col-md-3">
                    <label class="form-label">Section</label>
                    <select class="form-select" v-model="filters.section">
                      <option value="FRANCOPHONE">FRANCOPHONE</option>
                      <option value="ANGLOPHONE">ANGLOPHONE</option>
                    </select>
                  </div>
                  <div class="col-md-3">
                    <label class="form-label">Classe</label>
                    <select class="form-select" v-model="filters.classe">
                      <option v-for="classe in classes" :key="classe" :value="classe">
                        {{ classe }}
                      </option>
                    </select>
                  </div>
                  <div class="col-md-3">
                    <label class="form-label">Matière</label>
                    <select class="form-select" v-model="filters.matiere">
                      <option v-for="matiere in matieres" :key="matiere" :value="matiere">
                        {{ matiere }}
                      </option>
                    </select>
                  </div>
                  <div class="col-md-3">
                    <label class="form-label">Séquence</label>
                    <select class="form-select" v-model="filters.sequence">
                      <option v-for="seq in sequences" :key="seq" :value="seq">
                        {{ seq }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
  
            <!-- Coefficients -->
            <div class="card mb-4">
              <div class="card-header d-flex justify-content-between align-items-center">
                <span>Enregistrement des Coefficients</span>
                <button class="btn btn-sm btn-primary" @click="saveCoefficients">
                  <i class="bi bi-check-circle me-1"></i> Enregistrer
                </button>
              </div>
              <div class="card-body">
                <div class="row g-3">
                  <div class="col-md-4">
                    <label class="form-label">Année</label>
                    <input type="text" class="form-control" v-model="coefficients.annee" readonly />
                  </div>
                  <div class="col-md-4">
                    <label class="form-label">Coef</label>
                    <input type="number" class="form-control" v-model="coefficients.valeur" />
                  </div>
                  <div class="col-md-4">
                    <label class="form-label">Compétence évaluée</label>
                    <input type="text" class="form-control" v-model="coefficients.competence" />
                  </div>
                </div>
              </div>
            </div>
  
            <!-- Notes Table -->
            <div class="card mb-4">
              <div class="card-body p-0">
                <div class="table-responsive">
                  <table class="table table-striped table-hover mb-0">
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
                      <tr v-for="(student, index) in filteredStudents" :key="student.matricule">
                        <td>{{ index + 1 }}</td>
                        <td>{{ student.matricule }}</td>
                        <td>{{ student.nom }}</td>
                        <td>{{ student.prenom }}</td>
                        <td>
                          <input
                            type="number"
                            class="form-control form-control-sm"
                            style="max-width: 100px"
                            v-model="student.note"
                            min="0"
                            max="20"
                            step="0.5"
                            @change="updateGrade(student)"
                          />
                        </td>
                        <td>
                          <span class="badge" :class="gradeClass(student.grade)">
                            {{ student.grade }}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
  
            <!-- Date & Save -->
            <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3">
              <div class="col-md-3">
                <label class="form-label">Date de composition</label>
                <input type="date" class="form-control" v-model="compositionDate" />
              </div>
              <div>
                <button class="btn btn-primary" @click="saveAllGrades" :disabled="saving">
                  <span v-if="saving">
                    <span class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                    Enregistrement...
                  </span>
                  <span v-else>
                    <i class="bi bi-save me-1"></i> Enregistrer toutes les notes
                  </span>
                </button>
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
        saving: false,
        compositionDate: '2023-07-17',
        filters: {
          section: 'FRANCOPHONE',
          classe: '6ème',
          matiere: 'FRANCAIS',
          sequence: '1',
        },
        coefficients: {
          annee: '2022-2023',
          valeur: 5,
          competence: '',
        },
        classes: ['6ème', '5ème', '4ème', '3ème'],
        matieres: ['FRANCAIS', 'MATHEMATIQUES', 'HISTOIRE', 'GEOGRAPHIE'],
        sequences: ['1', '2', '3'],
        students: [
          { matricule: 'FR220009', nom: 'ARNORILD', prenom: 'JOHNSON', note: 10, grade: 'ECA' },
          { matricule: 'FR220020', nom: 'BERTRAND', prenom: '', note: 20, grade: 'E' },
          { matricule: 'FR220012', nom: 'BEYONCE', prenom: '', note: 15, grade: 'A' },
          { matricule: 'FR220007', nom: 'BRUND', prenom: 'PIERRE', note: 14, grade: 'A' },
          { matricule: 'FR220015', nom: 'CHRISTINE', prenom: 'VIOLET', note: 16, grade: 'A' },
          { matricule: 'FR220013', nom: 'HILARY', prenom: 'JOHNSON', note: 14.5, grade: 'A' },
          { matricule: 'FR220001', nom: 'JEAN', prenom: 'PAUL', note: 10, grade: 'ECA' },
          { matricule: 'FR220004', nom: 'JOEL', prenom: 'DANIELLE', note: 5, grade: 'NA' },
          { matricule: 'FR220034', nom: 'JULIE', prenom: 'LOVE', note: 18, grade: 'E' },
          { matricule: 'FR220016', nom: 'JUNIOR', prenom: 'TAIIBE', note: 11, grade: 'ECA' },
        ],
      };
    },
    computed: {
      filteredStudents() {
        return this.students;
      },
    },
    methods: {
      toggleSidebar() {
        this.sidebarOpen = !this.sidebarOpen;
      },
      updateGrade(student) {
        student.grade = this.calculateGrade(student.note);
      },
      calculateGrade(note) {
        if (note === null || note === undefined) return 'NA';
        if (note >= 18) return 'E';
        if (note >= 16) return 'A';
        if (note >= 14) return 'A';
        if (note >= 12) return 'B';
        if (note >= 10) return 'ECA';
        return 'NA';
      },
      gradeClass(grade) {
        switch (grade) {
          case 'E':
            return 'bg-success';
          case 'A':
            return 'bg-primary';
          case 'B':
            return 'bg-info';
          case 'ECA':
            return 'bg-warning text-dark';
          default:
            return 'bg-danger';
        }
      },
      saveCoefficients() {
        alert('Coefficients enregistrés avec succès!');
      },
      async saveAllGrades() {
        this.saving = true;
        try {
          await new Promise((resolve) => setTimeout(resolve, 1500));
          alert('Toutes les notes ont été enregistrées avec succès!');
        } catch (error) {
          alert("Erreur lors de l'enregistrement");
        } finally {
          this.saving = false;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .sidebar {
    width: 240px;
    min-height: 100vh;
  }
  </style>
  