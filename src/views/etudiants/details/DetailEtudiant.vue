<template>
    <div>
        <div class="row">
          <div class="col-md-12 grid-margin">
            <div class="d-flex justify-content-between flex-wrap">
              <div class="d-flex align-items-end flex-wrap">
                <div class="me-md-3 me-xl-5">
                  <h2>Gestion Profile Utilisateur</h2>
                  <p class="mb-md-0">Profile utilisateur</p>
                </div>
                <div class="d-flex">
                  <i class="mdi mdi-home text-muted hover-cursor"></i>
                  <p class="text-muted mb-0 hover-cursor">&nbsp;/&nbsp;Compte&nbsp;/&nbsp;</p>
                  <p class="text-primary mb-0 hover-cursor">Profile</p>
                </div>
              </div>
              
            </div>
          </div>
        </div>
  
        <!-- Formulaire de gestion du profil -->
        <div class="row">
          <div class="col-md-12 grid-margin stretch-card">
            <div class="card">
              <div class="card-body">
                
                <h4 class="card-title">Paramètres du Profil</h4>
                <form>
                  <div class="row">
                    <!-- Informations Personnelles -->
                    <div class="col-md-8">
                      <div class="card p-3">
                        <h5 class="mb-3">Informations Personnelles</h5>
                        <div class="mb-3">
                          <label class="form-label">Nom Complet</label>
                          <input type="text" class="form-control" value="Devid Jhon">
                        </div>
                        <div class="mb-3">
                          <label class="form-label">Numéro de Téléphone</label>
                          <input type="text" class="form-control" value="+990 3343 7865">
                        </div>
                        <div class="mb-3">
                          <label class="form-label">Adresse Email</label>
                          <input type="email" class="form-control" value="devidjond45@gmail.com">
                        </div>
                        <div class="mb-3">
                          <label class="form-label">Nom d'utilisateur</label>
                          <input type="text" class="form-control" value="devidjhon24">
                        </div>
                        <div class="mb-3">
                          <label class="form-label">Bio</label>
                          <textarea class="form-control" rows="3">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</textarea>
                        </div>
                        <div class="d-flex justify-content-end">
                          <button type="button" class="btn btn-light me-2">Annuler</button>
                          <button type="submit" class="btn btn-primary">Enregistrer</button>
                        </div>
                      </div>
                    </div>
  
                    <!-- Upload de Photo -->
                    <div class="col-md-4">
                      <div class="card p-3">
                        <h5 class="mb-3">Photo de Profil</h5>
                        <div class="text-center">
                          <img src="/img/faces/face29.png" class="rounded-circle mb-2" alt="Profile Image">
                          <p class="text-primary small">Modifier photo</p>
                        </div>
                                <div class="dropzone text-center" 
                                            @dragover.prevent 
                                            @drop="handleDrop"
                                            @click="triggerFileInput">
                                            
                                            <input type="file" ref="fileInput" accept="image/*" class="d-none" @change="handleFileUpload">
                                            
                                            <div v-if="previewImage">
                                            <img :src="previewImage" class="img-preview mb-2" alt="Aperçu de l'image">
                                            <p class="text-primary small" @click.stop="removeImage" style="cursor: pointer;">Changer l'image</p>
                                            </div>
                                            
                                            <div v-else>
                                            <div class="upload-icon">
                                                <i class="mdi mdi-upload text-primary"></i>
                                            </div>
                                            <p class="text-primary mb-1">Cliquer pour charger </p>
                                            <p class="small text-muted">ou glisser deposer</p>
                                            <p class="small text-muted">SVG, PNG, JPG or GIF</p>
                                            <p class="small text-muted">(max, 800 x 800px)</p>
                                            </div>
                                </div>

                        <div class="d-flex justify-content-end mt-3">
                          <button type="button" class="btn btn-light me-2">Annuler</button>
                          <button type="submit" class="btn btn-primary">Enregistrer</button>
                        </div>
                      </div>
                    </div>
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
  event.preventDefault();
  const file = event.dataTransfer.files[0];
  if (file) {
    previewImage.value = URL.createObjectURL(file);
  }
};

const triggerFileInput = () => {
  fileInput.value.click();
};

const removeImage = () => {
  previewImage.value = null;
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
    border-radius: 50%;
    object-fit: cover;
  }
  </style>


<style scoped>
.container {
  max-width: 800px;
}
</style>