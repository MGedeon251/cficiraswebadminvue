<template>
  <div>
    <div class="row">
      <div class="col-md-12 grid-margin">
        <div class="d-flex justify-content-between flex-wrap">
          <div class="d-flex align-items-end flex-wrap">
            <div class="me-md-3 me-xl-5">
              <h2>Notes & Resultats</h2>
              <p class="mb-md-0">Attributions des notes de devoir et examens</p>
              <p class="mb-md-0"></p>
            </div>
            <div class="d-flex">
              <i class="mdi mdi-home text-muted hover-cursor"></i>
              <p class="text-muted mb-0 hover-cursor">&nbsp;/&nbsp;Portail&nbsp;/&nbsp;</p>
              <p class="text-primary mb-0 hover-cursor">Notes</p>
            </div>
          </div>
          <div class="d-flex justify-content-between align-items-end flex-wrap"></div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 grid-margin stretch-card">
        <div class="card">
          <SkeletonLoader v-if="loading" type="table" :rows="3" :columns="1" />
          <div v-else class="card-body dashboard-tabs p-0">
            <ul class="nav nav-tabs px-4" role="tablist">
              <li class="nav-item">
                <a
                  class="nav-link active"
                  id="overview-tab"
                  data-bs-toggle="tab"
                  href="#overview"
                  role="tab"
                  aria-controls="overview"
                  aria-selected="true"
                  >Tout</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  id="devoirf-tab"
                  data-bs-toggle="tab"
                  href="#devoirf"
                  role="tab"
                  aria-controls="devoirf"
                  aria-selected="false"
                  >Devoirs</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  id="sales-tab"
                  data-bs-toggle="tab"
                  href="#sales"
                  role="tab"
                  aria-controls="sales"
                  aria-selected="false"
                  >Sessions ordinaires</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  id="purchases-tab"
                  data-bs-toggle="tab"
                  href="#purchases"
                  role="tab"
                  aria-controls="purchases"
                  aria-selected="false"
                  >Sessions de rappels</a
                >
              </li>
            </ul>
            <div class="tab-content py-0 px-0">
              <div
                class="tab-pane fade show active"
                id="overview"
                role="tabpanel"
                aria-labelledby="overview-tab"
              >
                <div class="d-flex flex-wrap justify-content-xl-between">
                  <div class="card-body">
                    <h4 class="card-title">Liste des Etudiants</h4>
                    <p class="card-description">Liste des etudiants inscrits</p>
                    <div class="d-flex gap-2 mb-3">
                      <button
                        type="button"
                        class="btn btn-light bg-white btn-icon me-3 d-none d-md-block"
                      >
                        <i class="mdi mdi-filter text-muted"></i>
                      </button>

                      <button
                        type="button"
                        class="btn btn-light bg-white btn-icon me-3 mt-2 mt-xl-0"
                      >
                        <i class="mdi mdi-file-export text-muted"></i>
                      </button>
                      <a href="/addNotes" target="_blank" rel="noopener noreferrer">
                        <button class="btn btn-primary mt-2 mt-xl-0">
                          <span class="">Attribuer des notes</span>
                        </button>
                      </a>
                    </div>
                    <div class="table-responsive">
                      <table class="table table-striped">
                        <thead>
                          <tr>
                            <th>Matricule</th>
                            <th>Nom</th>
                            <th>Prenom</th>
                            <th>Email</th>
                            <th>Telephone</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>DOE</td>
                            <td>John</td>
                            <td>Johdoe@gmail.com</td>
                            <td>+242066034357</td>
                            <td></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              <div class="tab-pane fade" id="devoirf" role="tabpanel" aria-labelledby="devoirf-tab">
                <div class="d-flex flex-wrap justify-content-xl-between">
                  <div class="card-body">
                    <div class="d-flex mb-3">
                      <button class="btn btn-outline-dark me-2">Semestre 1</button>
                      <button class="btn btn-outline-dark me-2">Semestre 2</button>
                    </div>
                    <h4 class="card-title">Classes et parcours</h4>
                    <p class="card-description">Liste des differentes classes</p>
                    <div class="table-responsive">
                      <table class="table table-striped">
                        <thead>
                          <tr>
                            <th>N°</th>
                            <th>Designation</th>
                            <th>Niveau</th>
                            <th>Examen</th>
                            <th>Valider</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              <div class="tab-pane fade" id="sales" role="tabpanel" aria-labelledby="sales-tab">
                <div class="d-flex flex-wrap justify-content-xl-between">
                  <div class="card-body">
                    <div class="d-flex mb-3">
                      <button class="btn btn-outline-dark me-2">Semestre 1</button>
                      <button class="btn btn-outline-dark me-2">Semestre 2</button>
                    </div>
                    <h4 class="card-title">Classes et parcours</h4>
                    <p class="card-description">Liste des differentes classes</p>
                    <div class="table-responsive">
                      <table class="table table-striped">
                        <thead>
                          <tr>
                            <th>N°</th>
                            <th>Designation</th>
                            <th>Niveau</th>
                            <th>Examen</th>
                            <th>Valider</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>LIC A1</td>
                            <td>1ere année</td>
                            <td>Partiel</td>
                            <td>
                              <span class="status-badge status-active">Complet</span>
                            </td>
                            <td>
                              <div class="dropdown">
                                <button
                                  class="btn btn-sm btn-outline-primary dropdown-toggle"
                                  data-bs-toggle="dropdown"
                                >
                                  ...
                                </button>
                                <ul class="dropdown-menu dropdown-menu-light">
                                  <li>
                                    <a class="dropdown-item" href="#">Details</a>
                                  </li>
                                  <li>
                                    <a class="dropdown-item" href="#">Ajouter</a>
                                  </li>
                                  <li>
                                    <a class="dropdown-item" href="#">Modifier</a>
                                  </li>
                                  <li class="dropdown-divider"></li>
                                  <li class="dropdown-submenu">
                                    <a class="dropdown-item dropdown-toggle" href="#">Labels</a>
                                    <ul class="dropdown-menu">
                                      <li>
                                        <a class="dropdown-item" href="#">Bug</a>
                                      </li>
                                      <li>
                                        <a class="dropdown-item" href="#">Feature</a>
                                      </li>
                                      <li>
                                        <a class="dropdown-item" href="#">Documentation</a>
                                      </li>
                                    </ul>
                                  </li>
                                  <li>
                                    <a class="dropdown-item text-danger" href="#">Supprimer</a>
                                  </li>
                                </ul>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>2</td>
                            <td>LIC B1</td>
                            <td>1ere année</td>
                            <td>Partiel</td>
                            <td>
                              <span class="status-badge status-draft">N/A</span>
                            </td>
                            <td>
                              <button class="btn btn-sm btn-outline-primary">...</button>
                            </td>
                          </tr>
                          <tr>
                            <td>3</td>
                            <td>LIC A2</td>
                            <td>2e année</td>
                            <td>Partiel</td>
                            <td>
                              <span class="status-badge status-active">Complet</span>
                            </td>
                            <td>
                              <button class="btn btn-sm btn-outline-primary">...</button>
                            </td>
                          </tr>
                          <tr>
                            <td>4</td>
                            <td>LIC A2</td>
                            <td>2e année</td>
                            <td>Partiel</td>
                            <td>
                              <span class="status-badge status-draft">N/A</span>
                            </td>
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
                id="purchases"
                role="tabpanel"
                aria-labelledby="purchases-tab"
              >
                <div class="d-flex flex-wrap justify-content-xl-between">
                  <div class="card-body">
                    <div class="d-flex mb-3">
                      <button class="btn btn-outline-dark me-2">Semestre 1</button>
                      <button class="btn btn-outline-dark me-2">Semestre 2</button>
                    </div>
                    <h4 class="card-title">Classes et parcours</h4>
                    <p class="card-description">Liste des differentes classes</p>
                    <div class="table-responsive">
                      <table class="table table-striped">
                        <thead>
                          <tr>
                            <th>N°</th>
                            <th>Designation</th>
                            <th>Niveau</th>
                            <th>Examen</th>
                            <th>Valider</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
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
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import sidebar from '@/components/Header.vue';
import SkeletonLoader from '@/components/SkeletonLoader.vue';

const loading = ref(true);
const formateurs = ref([]);

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
