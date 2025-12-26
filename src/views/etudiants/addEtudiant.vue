<template>
  <div class="modal-content">
    <!-- Header -->
            <div class="modal-header bg-primary text-white">
          <h5 class="modal-title" id="filiereModalLabel">
            {{ isEdit ? 'Modifier' : 'Ajouter' }} un etudiant
          </h5>
          <button
            type="button"
            class="btn-close btn-close-white"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>

        <!-- Body -->
        <div class="modal-body">
          <form @submit.prevent="submitEtudiant">
            <div class="row">
    <div class="col-md-3 text-center mb-4">
      <div class="avatar bg-warning text-white mx-auto mb-2">
        <img
          v-if="form.photoPreview"
          :src="form.photoPreview"
          alt="Photo étudiant"
          class="avatar-img"
        />
        <span v-else class="fs-1">N/A</span>
      </div>

      <!-- Input file caché -->
      <input
        ref="photoInput"
        type="file"
        class="d-none"
        accept="image/*"
        @change="handlePhotoUpload"
      />

      <!-- Bouton upload -->
      <button
        type="button"
        class="btn btn-outline-primary btn-sm w-70"
        @click="triggerPhotoInput"
      > Charger une photo
      </button>

  <small class="text-muted d-block mt-2">
    Photo récente (JPG ou PNG, max 2 Mo)
  </small>
</div>


          <!-- Informations personnelles -->
          <div class="col-md-9">
            <div class="row">
              <!-- Noms -->
              <div class="col-md-6 mb-3">
                <label class="form-label">
                  Noms <span class="text-danger">*</span>
                </label>
                <input
                  v-model="form.nom"
                  type="text"
                  class="form-control"
                  placeholder="Ex : NDZIE, KOUASSI"
                  required
                />
                <small class="text-muted">
                  Nom de famille tel qu’indiqué sur les documents officiels
                </small>
              </div>

              <!-- Prénoms -->
              <div class="col-md-6 mb-3">
                <label class="form-label">
                  Prénoms <span class="text-danger">*</span>
                </label>
                <input
                  v-model="form.prenom"
                  type="text"
                  class="form-control"
                  placeholder="Ex : Jean Marc"
                  required
                />
                <small class="text-muted">
                  Tous les prénoms de l’étudiant
                </small>
              </div>
            </div>

            <div class="row">
              <!-- Date de naissance -->
              <div class="col-md-6 mb-3">
                <label class="form-label">
                  Date de naissance <span class="text-danger">*</span>
                </label>
                <input
                  v-model="form.date_naissance"
                  type="date"
                  class="form-control"
                  required
                />
                <small class="text-muted">
                  Format : JJ/MM/AAAA
                </small>
              </div>

              <!-- Lieu de naissance -->
              <div class="col-md-6 mb-3">
                <label class="form-label">
                  Lieu de naissance <span class="text-danger">*</span>
                </label>
                <input
                  v-model="form.lieu_naissance"
                  type="text"
                  class="form-control"
                  placeholder="Ex : Brazzaville"
                  required
                />
                <small class="text-muted">
                  Ville ou localité de naissance
                </small>
              </div>
            </div>

            <div class="row">
              <!-- Sexe -->
              <div class="col-md-6 mb-3">
                <label class="form-label">
                  Sexe <span class="text-danger">*</span>
                </label>
                <select
                  v-model="form.sexe"
                  class="form-select"
                  required
                >
                  <option value="">-- Sélectionner le sexe --</option>
                  <option value="M">Masculin</option>
                  <option value="F">Féminin</option>
                </select>
                <small class="text-muted">
                  Sexe tel que déclaré à l’état civil
                </small>
              </div>

              <!-- Adresse -->
              <div class="col-md-6 mb-3">
                <label class="form-label">
                  Adresse <span class="text-danger">*</span>
                </label>
                <input
                  v-model="form.adresse"
                  type="text"
                  class="form-control"
                  placeholder="Quartier, rue, ville"
                  required
                />
                <small class="text-muted">
                  Adresse actuelle de résidence
                </small>
              </div>
            </div>

            <div class="row">
              <!-- Téléphone -->
              <div class="col-md-6 mb-3">
                <label class="form-label">
                  Téléphone <span class="text-danger">*</span>
                </label>
                <input
                  v-model="form.telephone"
                  type="text"
                  class="form-control"
                  placeholder="+242 06 603 43 57"
                  required
                />
                <small class="text-muted">
                  Numéro joignable (indicatif pays inclus)
                </small>
              </div>
            </div>
          </div>
        </div>

        <!-- Messages -->
        <div v-if="errorMessage" class="alert alert-danger mt-3">
          {{ errorMessage }}
        </div>

        <div v-if="successMessage" class="alert alert-success mt-3">
          {{ successMessage }}
        </div>
      </form>
    </div>

    <!-- Footer -->
    <div class="modal-footer">
      <button
        type="button"
        class="btn btn-secondary"
        @click="closeDetails"
      >
        Annuler
      </button>
      <button
        type="button"
        class="btn btn-primary"
        @click="submitEtudiant"
      >
        Enregistrer
      </button>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue';

const photoInput = ref(null);

const form = ref({
  photoFile: null,
  photoPreview: null,
});

// Ouvrir le sélecteur de fichiers
const triggerPhotoInput = () => {
  photoInput.value.click();
};

// Upload + preview
const handlePhotoUpload = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  // Validation taille
  if (file.size > 2 * 1024 * 1024) {
    errorMessage.value = 'La photo ne doit pas dépasser 2 Mo.';
    return;
  }

  // Validation type
  if (!file.type.startsWith('image/')) {
    errorMessage.value = 'Veuillez sélectionner une image valide.';
    return;
  }

  form.value.photoFile = file;
  form.value.photoPreview = URL.createObjectURL(file);
};

const errorMessage = ref('');
const successMessage = ref('');

const submitEtudiant = () => {
  errorMessage.value = '';
  successMessage.value = '';

  if (!form.value.nom || !form.value.prenom) {
    errorMessage.value = 'Veuillez remplir tous les champs obligatoires.';
    return;
  }

  successMessage.value = 'Étudiant enregistré avec succès.';
};

const closeDetails = () => {
  // fermeture du modal
};

const getImageUrl = (path) => `http://localhost:3500${path}`;
</script>


<style scoped>
.modal-content {
  border-radius: 12px;
  border: none;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
}

.modal-header {
  border-bottom: 2px solid #e9ecef;
}

.modal-footer {
  border-top: 2px solid #e9ecef;
}

.form-label {
  font-weight: 500;
}

.avatar {
  width: 140px;
  height: 140px;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>

