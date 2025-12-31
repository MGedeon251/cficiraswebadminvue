<template>
  <div class="student-profile-container">
    <!-- Breadcrumb et Titre -->
    <div class="row mb-4">
      <div class="col-12">
        <div class="d-flex justify-content-between align-items-center flex-wrap">
          <div>
            <h2 class="page-title">
              <i class="mdi mdi-account-school text-primary me-2"></i>
              Profil Étudiant
            </h2>
            <nav aria-label="breadcrumb" class="custom-breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item">
                  <a href="#"><i class="mdi mdi-home"></i></a>
                </li>
                <li class="breadcrumb-item">Portail</li>
                <li class="breadcrumb-item">Étudiants</li>
                <li class="breadcrumb-item active" aria-current="page">Détails</li>
              </ol>
            </nav>
          </div>
          <div class="d-flex gap-2">
            <button class="btn btn-outline-secondary">
              <i class="mdi mdi-printer me-1"></i> Imprimer
            </button>
            <button class="btn btn-outline-primary">
              <i class="mdi mdi-account-edit me-1"></i> Mode édition
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Carte Principale -->
    <div class="row">
      <div class="col-12">
        <div class="card profile-card">
          <div class="card-header bg-primary text-white">
            <h4 class="card-title mb-0">
              <i class="mdi mdi-card-account-details-outline me-2"></i>
              Fiche d'information de l'étudiant
            </h4>
          </div>
          <div class="card-body">
            <form @submit.prevent="handleSubmit">
              <div class="row">
                <!-- Colonne Informations Personnelles -->
                <div class="col-lg-8">
                  <div class="info-section personal-info">
                    <h5 class="section-title">
                      <i class="mdi mdi-account-circle me-2"></i>
                      Informations Personnelles
                    </h5>

                    <div class="row g-3">
                      <div class="col-md-6">
                        <div class="form-floating">
                          <input
                            type="text"
                            class="form-control"
                            id="matricule"
                            placeholder="Matricule"
                          />
                          <label for="matricule">Matricule</label>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-floating">
                          <input type="text" class="form-control" id="nom" placeholder="Nom" />
                          <label for="nom">Nom</label>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-floating">
                          <input
                            type="text"
                            class="form-control"
                            id="prenom"
                            placeholder="Prénom"
                          />
                          <label for="prenom">Prénom</label>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-floating">
                          <input type="date" class="form-control" id="naissance" />
                          <label for="naissance">Date de naissance</label>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-floating">
                          <input
                            type="text"
                            class="form-control"
                            id="lieu-naissance"
                            placeholder="Lieu de naissance"
                          />
                          <label for="lieu-naissance">Lieu de naissance</label>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-floating">
                          <input
                            type="tel"
                            class="form-control"
                            id="telephone"
                            placeholder="Téléphone"
                          />
                          <label for="telephone">Téléphone</label>
                        </div>
                      </div>
                      <div class="col-12">
                        <div class="form-floating">
                          <input type="text" class="form-control" id="ville" placeholder="Ville" />
                          <label for="ville">Ville</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Colonne Photo et Infos Académiques -->
                <div class="col-lg-4">
                  <!-- Photo de Profil -->
                  <div class="info-section profile-photo-section mb-4">
                    <h5 class="section-title">
                      <i class="mdi mdi-camera me-2"></i>
                      Photo de Profil
                    </h5>
                    <div class="text-center">
                      <div class="profile-photo-container mb-3">
                        <img
                          v-if="previewImage"
                          :src="previewImage"
                          class="profile-photo"
                          alt="Photo étudiant"
                        />
                        <img
                          v-else
                          src="/img/default-profile.png"
                          class="profile-photo"
                          alt="Photo par défaut"
                        />
                        <div class="photo-overlay" @click="triggerFileInput">
                          <i class="mdi mdi-camera"></i>
                        </div>
                      </div>
                      <button
                        type="button"
                        class="btn btn-sm btn-outline-primary"
                        @click="triggerFileInput"
                      >
                        <i class="mdi mdi-upload me-1"></i> Changer la photo
                      </button>
                      <input
                        type="file"
                        ref="fileInput"
                        accept="image/*"
                        class="d-none"
                        @change="handleFileUpload"
                      />
                    </div>
                  </div>

                  <!-- Informations Académiques -->
                  <div class="info-section academic-info">
                    <h5 class="section-title">
                      <i class="mdi mdi-school me-2"></i>
                      Informations Académiques
                    </h5>
                    <div class="form-floating mb-3">
                      <input
                        type="text"
                        class="form-control"
                        id="annee-academique"
                        placeholder="Année académique"
                      />
                      <label for="annee-academique">Année académique</label>
                    </div>
                    <div class="form-floating mb-3">
                      <select class="form-select" id="cycle">
                        <option value="">Sélectionner...</option>
                        <option>Licence</option>
                        <option>Master</option>
                        <option>Doctorat</option>
                      </select>
                      <label for="cycle">Cycle</label>
                    </div>
                    <div class="form-floating mb-3">
                      <input type="text" class="form-control" id="filiere" placeholder="Filière" />
                      <label for="filiere">Filière</label>
                    </div>
                    <div class="form-floating mb-3">
                      <input type="text" class="form-control" id="niveau" placeholder="Niveau" />
                      <label for="niveau">Niveau</label>
                    </div>
                    <div class="form-floating">
                      <input type="text" class="form-control" id="classe" placeholder="Classe" />
                      <label for="classe">Classe</label>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Boutons d'action -->
              <div class="d-flex justify-content-end mt-5 pt-3 border-top">
                <button type="button" class="btn btn-outline-secondary me-3">
                  <i class="mdi mdi-close me-1"></i> Annuler
                </button>
                <button type="submit" class="btn btn-primary">
                  <i class="mdi mdi-content-save me-1"></i> Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const fileInput = ref(null);
const previewImage = ref(null);

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file && file.type.match('image.*')) {
    previewImage.value = URL.createObjectURL(file);
  }
};

const triggerFileInput = () => {
  fileInput.value.click();
};

const handleSubmit = () => {
  // Logique de soumission du formulaire
  console.log('Formulaire soumis');
};
</script>

<style scoped>
.student-profile-container {
  padding: 20px;
}

.page-title {
  font-weight: 600;
  color: #2c3e50;
}

.custom-breadcrumb {
  background-color: transparent;
  padding: 0;
  margin-top: 8px;
}

.custom-breadcrumb .breadcrumb-item a {
  color: #6c757d;
  text-decoration: none;
}

.custom-breadcrumb .breadcrumb-item.active {
  color: #4c74f4;
  font-weight: 500;
}

.profile-card {
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.card-header {
  padding: 1.25rem 1.5rem;
}

.info-section {
  background-color: #fff;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid #e9ecef;
}

.section-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #e9ecef;
}

.profile-photo-container {
  position: relative;
  width: 150px;
  height: 150px;
  margin: 0 auto;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid #f1f3f5;
}

.profile-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.photo-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  cursor: pointer;
}

.photo-overlay i {
  color: white;
  font-size: 2rem;
}

.profile-photo-container:hover .photo-overlay {
  opacity: 1;
}

.form-floating label {
  color: #6c757d;
}

.form-control,
.form-select {
  border-radius: 8px;
  padding: 16px 12px;
  border: 1px solid #e0e0e0;
}

.form-control:focus,
.form-select:focus {
  border-color: #4c74f4;
  box-shadow: 0 0 0 0.25rem rgba(76, 116, 244, 0.25);
}

.btn {
  border-radius: 8px;
  padding: 10px 20px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-primary {
  background-color: #4c74f4;
  border-color: #4c74f4;
}

.btn-primary:hover {
  background-color: #3a5bd9;
  border-color: #3a5bd9;
}

.btn-outline-primary {
  color: #4c74f4;
  border-color: #4c74f4;
}

.btn-outline-primary:hover {
  background-color: #4c74f4;
  color: white;
}
</style>
