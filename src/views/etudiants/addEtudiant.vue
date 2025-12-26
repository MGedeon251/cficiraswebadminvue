<template>
  <div class="modal-content">
    <div class="modal-header bg-primary text-white">
      <h5 class="modal-title" id="exampleModalLabel">Ajouter etudiant</h5>
      <button type="button" class="btn-close btn-close-white" @click="closeDetails"></button>
    </div>
    <div class="modal-body">
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
                <label for="exampleInputName1">Noms<span class="text-danger">*</span></label>
                <input type="text" class="form-control" />
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label class="form-label">Prenoms <span class="text-danger">*</span></label>
                <input type="text" class="form-control" />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label for="exampleInputName1"
                  >Date de naissance<span class="text-danger">*</span></label
                >
                <input type="text" class="form-control" />
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label class="form-label"
                  >Lieu de naissance<span class="text-danger">*</span></label
                >
                <input type="text" class="form-control" />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label for="exampleInputName1">Sexe<span class="text-danger">*</span></label>
                <input type="text" class="form-control" />
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label class="form-label">Adresse<span class="text-danger">*</span></label>
                <input type="text" class="form-control" />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label for="exampleInputName1">Telephone<span class="text-danger">*</span></label>
                <input type="text" class="form-control" placeholder="+242 066034357 " />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button type="submit" class="btn btn-success">Enregistrer</button>
      <button type="button" class="btn btn-light" data-bs-dismiss="modal">Annuler</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
const etudiant = ref({});

// Gestion de l'upload de la photo
const handleFileUpload = (event) => {
  newPersonnel.value.photo = event.target.files[0];
  personnel.value.photo = file;
};
const isDetailsVisible = ref(false);

const closeDetails = () => {
  isDetailsVisible.value = false;
};
// Fonction d'envoi du formulaire
// Fonction pour obtenir l'URL de l'image du etudiant
const getImageUrl = (photoPath) => {
  return `http://localhost:3500${photoPath}`; // Remplace cette URL par celle de ton backend
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
.modal-content {
  border: none;
  border-radius: 10px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
}

.info-card {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 15px;
  height: 100%;
}

.info-title {
  color: #495057;
  font-weight: 600;
  margin-bottom: 15px;
  padding-bottom: 8px;
  border-bottom: 1px solid #dee2e6;
}

.info-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.info-label {
  font-weight: 500;
  color: #6c757d;
}

.info-value {
  font-weight: 400;
  color: #212529;
  text-align: right;
}

.badge {
  padding: 5px 10px;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 500;
}

.progress {
  border-radius: 5px;
  background-color: #e9ecef;
}

.btn-close:focus {
  box-shadow: none;
}

.modal-header {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.modal-footer {
  border-top: 1px solid #dee2e6;
}
</style>
