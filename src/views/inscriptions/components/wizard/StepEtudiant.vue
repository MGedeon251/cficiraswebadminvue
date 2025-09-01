<template>
  <form @submit.prevent="$emit('next')">
    <div class="row">
      <p class="text-muted">Photo format profil</p>
      <div class="col-md-3 text-center">
        <div class="avatar bg-warning text-white d-flex align-items-center justify-content-center">
          <!-- Si la photo existe, on l'affiche, sinon on montre les initiales -->
          <img v-if="previewImage" :src="previewImage" alt="Photo du candidat" class="avatar-img" />
          <span v-else class="fs-1">{{ getInitials(localData.nom, localData.prenom) }}</span>
          <input
            type="file"
            ref="fileInput"
            @change="handleFileUpload"
            accept="image/*"
            class="d-none"
          />
        </div>
        <button type="button" class="btn btn-sm btn-outline-primary mt-2" @click="triggerFileInput">
          {{ localData.photourl ? 'Changer' : 'Ajouter' }} photo
        </button>
      </div>
      <div class="col-md-9">
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label for="nom">Noms</label>
              <input type="text" class="form-control" id="nom" v-model="localData.nom" required />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label for="prenom">Prénoms</label>
              <input
                type="text"
                class="form-control"
                id="prenom"
                v-model="localData.prenom"
                required
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label for="datenais">Date de naissance</label>
              <input
                type="date"
                class="form-control"
                id="datenais"
                v-model="localData.datenais"
                required
                :max="maxBirthDate"
              />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label for="lieunais">Lieu de naissance</label>
              <input
                type="text"
                class="form-control"
                id="lieunais"
                v-model="localData.lieunais"
                required
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label for="sexe">Sexe</label>
              <select class="form-select" id="sexe" v-model="localData.sexe" required>
                <option value="">Sélectionner</option>
                <option value="M">Masculin</option>
                <option value="F">Féminin</option>
              </select>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label for="tel">Téléphone</label>
              <input
                type="tel"
                class="form-control"
                id="tel"
                v-model="localData.tel"
                placeholder="+242066034357"
                required
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" class="form-control" id="email" v-model="localData.email" />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label for="ville">Ville</label>
              <input
                type="text"
                class="form-control"
                id="ville"
                v-model="localData.ville"
                required
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label for="adresse">Adresse</label>
              <input class="form-control" id="adresse" v-model="localData.adresse" rows="2" />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label for="filiere">Filière</label>
              <select class="form-select" id="filiere" v-model="localData.filiere" required>
                <option value="">Sélectionner une filière</option>
                <option value="LAP">ADMINISTRATION PUBLIQUE</option>
                <option value="INF">INFORMATIQUE</option>
                <option value="DUT">DUT</option>
                <option value="AM">AM</option>
                <option value="MT">MT</option>
                <option value="ING">ING</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script setup>
import { reactive, watch } from 'vue';

const props = defineProps({ modelValue: Object });
const emit = defineEmits(['update:modelValue', 'next', 'prev']);

const localData = reactive(props.modelValue.etudiant || {});

watch(
  localData,
  (val) => {
    emit('update:modelValue', { ...props.modelValue, etudiant: val });
  },
  { deep: true }
);

const getInitials = (nom, prenom) => {
  if (!nom && !prenom) return 'N/A';
  return `${nom?.charAt(0) || ''}${prenom?.charAt(0) || ''}`.toUpperCase();
};

const triggerFileInput = () => {
  fileInput.value.click();
};

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    candidat.value.photo = file;
    previewImage.value = URL.createObjectURL(file);
  }
};
</script>

<style scoped>
/* Vos styles existants restent inchangés */
.avatar {
  width: 150px;
  height: 150px;
  border-radius: 8px;
  border-color: antiquewhite;
  border-style: solid;
  font-weight: bold;
  font-size: 2rem;
  overflow: hidden;
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
