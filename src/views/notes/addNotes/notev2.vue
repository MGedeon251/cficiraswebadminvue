<template>
    <div class="container-fluid g-0">
      <!-- Top Navigation -->
      <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container-fluid">
          <a class="navbar-brand fw-bold" href="#">GanaIis School</a>
          <button 
            class="navbar-toggler" 
            type="button" 
            @click="toggleSidebar"
          >
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
        <aside :class="['sidebar', { 'collapsed': !sidebarOpen }]">
          <!-- ... (le code précédent de la sidebar reste inchangé) ... -->
        </aside>
  
        <!-- Main Content -->
        <main class="main-content" :class="{ 'expanded': !sidebarOpen }">
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
                      <option v-for="classe in classes" :value="classe" :key="classe">
                        {{ classe }}
                      </option>
                    </select>
                  </div>
                  <div class="col-md-3">
                    <label class="form-label">Matière</label>
                    <select class="form-select" v-model="filters.matiere">
                      <option v-for="matiere in matieres" :value="matiere" :key="matiere">
                        {{ matiere }}
                      </option>
                    </select>
                  </div>
                  <div class="col-md-3">
                    <label class="form-label">Séquence</label>
                    <select class="form-select" v-model="filters.sequence">
                      <option v-for="seq in sequences" :value="seq" :key="seq">
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
                  Enregistrer
                </button>
              </div>
              <div class="card-body">
                <div class="row g-3">
                  <div class="col-md-4">
                    <label class="form-label">Année</label>
                    <input type="text" class="form-control" v-model="coefficients.annee" readonly>
                  </div>
                  <div class="col-md-4">
                    <label class="form-label">Coef</label>
                    <input type="number" class="form-control" v-model="coefficients.valeur">
                  </div>
                  <div class="col-md-4">
                    <label class="form-label">Compétence évaluée</label>
                    <input type="text" class="form-control" v-model="coefficients.competence">
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
                        <th width="50">#</th>
                        <th width="120">Matricule</th>
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th width="150">Note</th>
                        <th width="100">Grade</th>
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
                            class="form-control form-control-sm d-inline-block" 
                            style="width: 80px;"
                            v-model="student.note" 
                            min="0" 
                            max="20" 
                            step="0.5"
                            @change="updateGrade(student)"
                          >
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
  
            <!-- Date and Save Button -->
            <div class="d-flex justify-content-between align-items-center">
              <div class="col-md-3">
                <label class="form-label">Date de composition</label>
                <input 
                  type="date" 
                  class="form-control" 
                  v-model="compositionDate"
                >
              </div>
              <button 
                class="btn btn-primary"
                @click="saveAllGrades"
                :disabled="saving"
              >
                <span v-if="saving">
                  <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  Enregistrement...
                </span>
                <span v-else>
                  <i class="bi bi-save me-1"></i> Enregistrer toutes les notes
                </span>
              </button>
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
          sequence: '1'
        },
        coefficients: {
          annee: '2022-2023',
          valeur: 5,
          competence: ''
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
          { matricule: 'FR220016', nom: 'JUNIOR', prenom: 'TAIIBE', note: 11, grade: 'ECA' }
        ]
      }
    },
    computed: {
      filteredStudents() {
        // Filtrage des étudiants selon les critères sélectionnés
        // (à adapter selon vos besoins réels)
        return this.students;
      }
    },
    methods: {
      toggleSidebar() {
        this.sidebarOpen = !this.sidebarOpen
      },
      updateGrade(student) {
        // Mise à jour du grade quand la note change
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
        // Classes CSS pour les badges de grade
        switch(grade) {
          case 'E': return 'bg-success';
          case 'A': return 'bg-primary';
          case 'B': return 'bg-info';
          case 'ECA': return 'bg-warning text-dark';
          default: return 'bg-danger';
        }
      },
      saveCoefficients() {
        // Enregistrement des coefficients
        console.log('Coefficients enregistrés:', this.coefficients);
        alert('Coefficients enregistrés avec succès!');
      },
      async saveAllGrades() {
        // Enregistrement de toutes les notes
        this.saving = true;
        try {
          // Simulation d'un appel API
          await new Promise(resolve => setTimeout(resolve, 1500));
          console.log('Notes enregistrées:', this.students);
          alert('Toutes les notes ont été enregistrées avec succès!');
        } catch (error) {
          console.error('Erreur lors de l\'enregistrement:', error);
          alert('Une erreur est survenue lors de l\'enregistrement');
        } finally {
          this.saving = false;
        }
      }
    }
  }
  </script>
  
  <style scoped>
  /* ... (les styles précédents restent inchangés) ... */
  
  /* Styles supplémentaires pour les nouvelles parties */
  .table-responsive {
    max-height: 500px;
    overflow-y: auto;
  }
  
  .badge {
    font-size: 0.85em;
    padding: 0.35em 0.65em;
  }
  
  .card {
    border: none;
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  }
  
  .card-header {
    background-color: #f8f9fa;
    border-bottom: 1px solid rgba(0, 0, 0, 0.125);
  }
  
  .form-control-sm {
    height: calc(1.5em + 0.5rem + 2px);
    padding: 0.25rem 0.5rem;
  }
  
  /* Amélioration du responsive */
  @media (max-width: 768px) {
    .content-body .row > div {
      margin-bottom: 1rem;
    }
    
    .d-flex.justify-content-between {
      flex-direction: column;
      gap: 1rem;
    }
    
    .d-flex.justify-content-between > * {
      width: 100%;
    }
  }
  </style>