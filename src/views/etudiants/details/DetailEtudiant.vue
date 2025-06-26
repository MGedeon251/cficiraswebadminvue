<template>
  <div>
    <sidebar>
      <div class="row">
        <div class="col-md-12 grid-margin">
          <div class="d-flex justify-content-between flex-wrap">
            <div class="d-flex align-items-end flex-wrap">
              <div class="me-md-3 me-xl-5">
                <h2>Informations Personnel</h2>
                <p class="mb-md-0">Gestion des etudiant administrateurs et utilisateurs</p>
              </div>
              <div class="d-flex">
                <i class="mdi mdi-home text-muted hover-cursor"></i>
                <p class="text-muted mb-0 hover-cursor">&nbsp;/&nbsp;Scolarité&nbsp;/&nbsp;</p>
                <p class="text-muted mb-0 hover-cursor">etudiants&nbsp;/&nbsp;</p>
                <p class="text-primary mb-0 hover-cursor">Details</p>
              </div>
            </div>
            <div class="d-flex justify-content-between align-items-end flex-wrap">
              <a href="#" class="text-secondary me-2"
                ><span class="feather-icon"
                  ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-printer"
                  >
                    <polyline points="6 9 6 2 18 2 18 9"></polyline>
                    <path
                      d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"
                    ></path>
                    <rect x="6" y="14" width="12" height="8"></rect></svg></span
              ></a>
              <a href="#" class="text-secondary me-2"
                ><span class="feather-icon"
                  ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-download"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line></svg></span
              ></a>
              <router-link class="btn btn-outline-secondary" to="/etudiants">⬅ Retour</router-link>
            </div>
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
                    >Information personnel</a
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
                    >Fiche academique</a
                  >
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    id="sales-tab"
                    data-bs-toggle="tab"
                    href="#sales2"
                    role="tab"
                    aria-controls="sales"
                    aria-selected="false"
                    >Tuteur</a
                  >
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    id="sales-tab"
                    data-bs-toggle="tab"
                    href="#sales2"
                    role="tab"
                    aria-controls="sales"
                    aria-selected="false"
                    >Dossier complet</a
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
                      <div class="row">
                        <p class="text-muted">Photo format profil</p>
                        <div class="col-md-3 text-center">
                          <div
                            class="avatar bg-warning text-white d-flex align-items-center justify-content-center"
                          >
                            <!-- Si la photo existe, on l'affiche, sinon on montre les initiales -->
                            <img
                              v-if="etudiant.photourl"
                              :src="getImageUrl(etudiant.photourl)"
                              alt="Photo du etudiant"
                              class="avatar-img"
                            />
                            <span v-else class="fs-1">{{ 'N/A' }}</span>
                          </div>
                        </div>
                        <div class="col-md-9">
                          <div class="row">
                            <div class="col-md-6">
                              <div class="form-group">
                                <label for="exampleInputName1">Noms</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="etudiant.nom"
                                  readonly
                                  v-if="etudiant.nom"
                                />
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div class="form-group">
                                <label class="form-label">Prenoms</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="etudiant.prenom"
                                  readonly
                                  v-if="etudiant.prenom"
                                />
                              </div>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-md-6">
                              <div class="form-group">
                                <label for="exampleInputName1">Date de naissance</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  :value="formatDate(etudiant.date_naissance)"
                                  readonly
                                  v-if="etudiant.date_naissance"
                                />
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div class="form-group">
                                <label class="form-label">Lieu de naissance</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="etudiant.lieu_naissance"
                                  readonly
                                  v-if="etudiant.lieunaissance"
                                />
                              </div>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-md-6">
                              <div class="form-group">
                                <label for="exampleInputName1">Sexe</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="etudiant.sexe"
                                  readonly
                                  v-if="etudiant.genre"
                                />
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div class="form-group">
                                <label class="form-label">Adresse</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="etudiant.adresse"
                                  readonly
                                  v-if="etudiant.telephone"
                                />
                              </div>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-md-6">
                              <div class="form-group">
                                <label for="exampleInputName1">Telephone</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="etudiant.telephone"
                                  placeholder="+242 066034357 "
                                  readonly
                                  v-if="etudiant.telephone"
                                />
                              </div>
                            </div>
                          </div>

                          <div class="d-flex">
                            <button class="btn btn-primary me-2">Save</button>
                            <button class="btn btn-light">Cancel</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="tab-pane fade" id="sales" role="tabpanel" aria-labelledby="sales-tab">
                  <div class="d-flex flex-wrap justify-content-xl-between">
                    <div class="card-body">
                      <p class="text-muted">Photo professionnel</p>
                      <div class="row">
                        <div class="col-md-3 text-center">
                          <div
                            class="avatar bg-warning text-white d-flex align-items-center justify-content-center"
                          >
                            <!-- Si la photo existe, on l'affiche, sinon on montre les initiales -->
                            <img
                              v-if="etudiant.photourl"
                              :src="getImageUrl(etudiant.photourl)"
                              alt="Photo du etudiant"
                              class="avatar-img"
                            />
                            <span v-else class="fs-1">{{ 'N/A' }}</span>
                          </div>
                        </div>
                        <div class="col-md-9">
                          <div class="row">
                            <div class="col-md-6">
                              <div class="form-group">
                                <label for="exampleInputName1">Email Professionnel</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  placeholder="example@middl.org"
                                  v-model="etudiant.email"
                                  readonly
                                  v-if="etudiant.email"
                                />
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div class="form-group">
                                <label class="form-label">Departements</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="etudiant.departement"
                                  readonly
                                  v-if="etudiant.departement"
                                />
                              </div>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-md-6">
                              <div class="form-group">
                                <label for="exampleInputName1">Unité de service</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="etudiant.unite_service"
                                  placeholder="Commandement de police"
                                  readonly
                                  v-if="etudiant.unite_service"
                                />
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div class="form-group">
                                <label class="form-label">Fonctions</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="etudiant.fonction"
                                  v-if="etudiant.fonction"
                                  readonly
                                />
                              </div>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-md-6">
                              <div class="form-group">
                                <label for="exampleInputName1">Diplôme</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="etudiant.diplome"
                                  placeholder="Commandement de police"
                                  readonly
                                  v-if="etudiant.diplome"
                                />
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div class="form-group">
                                <label class="form-label">Specialisation</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="etudiant.specialisation"
                                  readonly
                                  v-if="etudiant.specialisation"
                                />
                              </div>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-md-6">
                              <div class="form-group">
                                <label class="form-label">Grade</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="etudiant.grade"
                                  readonly
                                  v-if="etudiant.grade"
                                />
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
          </div>
        </div>
      </div>
    </sidebar>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import dayjs from 'dayjs';

import { getEtudiantById } from '@/api/academique/etudiantApi';
import SkeletonLoader from '@/components/SkeletonLoader.vue';

const route = useRoute();
const etudiant = ref({});
const loading = ref(true); // Indicateur de chargement
const error = ref(null); // Gestion des erreurs
onMounted(async () => {
  try {
    const response = await getEtudiantById(route.params.id);
    etudiant.value = response;
  } catch (error) {
    console.error('Erreur lors du chargement des détails :', error);
  } finally {
    loading.value = false;
  }
});
// Fonction pour obtenir l'URL de l'image du etudiant
const getImageUrl = (photoPath) => {
  return `http://localhost:3500${photoPath}`; // Remplace cette URL par celle de ton backend
};
const formatDate = (date) => {
  return dayjs(date).format('DD-MM-YYYY');
};
</script>
<style scoped>
.avatar {
  width: 150px;
  height: 150px;
  border-radius: 8px;
  border-color: antiquewhite;
  border-style: solid;
  font-weight: bold;
  font-size: 2rem;
  overflow: hidden; /* Masque l'excédent d'image */
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Permet à l'image de couvrir l'espace sans déformation */
}
</style>
