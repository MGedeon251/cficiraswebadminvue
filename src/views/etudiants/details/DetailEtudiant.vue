<template>
  <div>
    <div class="row">
      <div class="col-md-12 grid-margin">
        <div class="d-flex justify-content-between flex-wrap">
          <div class="d-flex align-items-end flex-wrap">
            <div class="me-md-3 me-xl-5">
              <h2>Profil Étudiant</h2>
              <p class="mb-md-0">Informations de l'étudiant</p>
            </div>
            <div class="d-flex">
              <i class="mdi mdi-home text-muted hover-cursor"></i>
              <p class="text-muted mb-0 hover-cursor">&nbsp;/&nbsp;Étudiants&nbsp;/&nbsp;</p>
              <p class="text-primary mb-0 hover-cursor">Profil</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Formulaire de profil étudiant -->
    <div class="row">
      <div class="col-md-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Informations Étudiant</h4>
            <form @submit.prevent>
              <div class="row">

                <!-- Informations Personnelles -->
                <div class="col-md-8">
                  <div class="card p-3">
                    <h5 class="mb-3">Informations Personnelles</h5>
                    
                    <div class="mb-3">
                      <label class="form-label">Matricule</label>
                      <input type="text" class="form-control" placeholder="Ex: ETD001">
                    </div>
                    <div class="mb-3">
                      <label class="form-label">Nom</label>
                      <input type="text" class="form-control" placeholder="Ex: Mavoungou">
                    </div>
                    <div class="mb-3">
                      <label class="form-label">Prénom</label>
                      <input type="text" class="form-control" placeholder="Ex: Jean-Paul">
                    </div>
                    <div class="mb-3">
                      <label class="form-label">Date de naissance</label>
                      <input type="date" class="form-control">
                    </div>
                    <div class="mb-3">
                      <label class="form-label">Lieu de naissance</label>
                      <input type="text" class="form-control" placeholder="Ex: Brazzaville">
                    </div>
                    <div class="mb-3">
                      <label class="form-label">Téléphone</label>
                      <input type="text" class="form-control" placeholder="Ex: +242 06 123 4567">
                    </div>
                    <div class="mb-3">
                      <label class="form-label">Ville</label>
                      <input type="text" class="form-control" placeholder="Ex: Pointe-Noire">
                    </div>
                  </div>
                </div>

                <!-- Photo + Académique -->
                <div class="col-md-4">
                  <div class="card p-3 mb-4">
                    <h5 class="mb-3">Photo de Profil</h5>
                    <div class="text-center">
                      <img v-if="previewImage" :src="previewImage" class="rounded-circle mb-2 img-preview" alt="Aperçu">
                      <img v-else src="/img/faces/face29.png" class="rounded-circle mb-2 img-preview" alt="Profil">
                      <p class="text-primary small" @click="triggerFileInput" style="cursor: pointer;">Modifier photo</p>
                    </div>
                    <div class="dropzone text-center"
                         @dragover.prevent 
                         @drop="handleDrop"
                         @click="triggerFileInput">
                      <input type="file" ref="fileInput" accept="image/*" class="d-none" @change="handleFileUpload">
                      <div v-if="!previewImage">
                        <div class="upload-icon">
                          <i class="mdi mdi-upload text-primary"></i>
                        </div>
                        <p class="text-primary mb-1">Cliquer pour charger</p>
                        <p class="small text-muted">ou glisser-déposer</p>
                        <p class="small text-muted">PNG, JPG, GIF</p>
                      </div>
                    </div>
                  </div>

                  <div class="card p-3">
                    <h5 class="mb-3">Informations Académiques</h5>
                    <div class="mb-3">
                      <label class="form-label">Année Académique</label>
                      <input type="text" class="form-control" placeholder="Ex: 2024-2025">
                    </div>
                    <div class="mb-3">
                      <label class="form-label">Cycle</label>
                      <select class="form-control">
                        <option>Licence</option>
                        <option>Master</option>
                        <option>Doctorat</option>
                      </select>
                    </div>
                    <div class="mb-3">
                      <label class="form-label">Filière</label>
                      <input type="text" class="form-control" placeholder="Ex: Informatique">
                    </div>
                    <div class="mb-3">
                      <label class="form-label">Niveau</label>
                      <input type="text" class="form-control" placeholder="Ex: L2">
                    </div>
                    <div class="mb-3">
                      <label class="form-label">Classe</label>
                      <input type="text" class="form-control" placeholder="Ex: L2A">
                    </div>
                  </div>
                </div>
              </div>

              <div class="d-flex justify-content-end mt-4">
                <button type="button" class="btn btn-light me-2">Annuler</button>
                <button type="submit" class="btn btn-primary">Enregistrer</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const fileInput = ref(null);
const previewImage = ref(null);

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    previewImage.value = URL.createObjectURL(file);
  }
};

const handleDrop = (event) => {
  const file = event.dataTransfer.files[0];
  if (file) {
    previewImage.value = URL.createObjectURL(file);
  }
};

const triggerFileInput = () => {
  fileInput.value.click();
};
</script>

<style scoped>
.dropzone {
  border: 2px dashed #4C74F4;
  background-color: #F8FAFC;
  padding: 40px;
  cursor: pointer;
  transition: border 0.3s ease-in-out;
  border-radius: 8px;
}
.dropzone:hover {
  border-color: #1E40AF;
}
.upload-icon {
  font-size: 24px;
  background: #E8F0FE;
  display: inline-block;
  padding: 10px;
  border-radius: 50%;
}
.img-preview {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
}
</style>
