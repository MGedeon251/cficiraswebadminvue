<template>
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header bg-primary text-white">
          <h5 class="modal-title" id="exampleModalLabel">Ajouter candidat</h5>
          <button type="button" class="btn-close btn-close-white" @click="closeDetails"></button>
        </div>
        <div class="modal-body">
          <a-tabs v-model:activeKey="activeKey">
            <a-tab-pane key="1" tab="Donnees personnelles">
              <form @submit.prevent="submitForm">
                <div class="row">
                  <p class="text-muted">Photo format profil</p>
                  <div class="col-md-3 text-center">
                    <div
                      class="avatar bg-warning text-white d-flex align-items-center justify-content-center"
                    >
                      <!-- Si la photo existe, on l'affiche, sinon on montre les initiales -->
                      <img
                        v-if="previewImage"
                        :src="previewImage"
                        alt="Photo du candidat"
                        class="avatar-img"
                      />
                      <span v-else class="fs-1">{{
                        getInitials(candidat.nom, candidat.prenom)
                      }}</span>
                      <input
                        type="file"
                        ref="fileInput"
                        @change="handleFileUpload"
                        accept="image/*"
                        class="d-none"
                      />
                    </div>
                    <button
                      type="button"
                      class="btn btn-sm btn-outline-primary mt-2"
                      @click="triggerFileInput"
                    >
                      {{ candidat.photourl ? 'Changer' : 'Ajouter' }} photo
                    </button>
                  </div>
                  <div class="col-md-9">
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">
                          <label for="nom">Noms</label>
                          <input
                            type="text"
                            class="form-control"
                            id="nom"
                            v-model="candidat.nom"
                            required
                          />
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label for="prenom">Prénoms</label>
                          <input
                            type="text"
                            class="form-control"
                            id="prenom"
                            v-model="candidat.prenom"
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
                            v-model="candidat.datenais"
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
                            v-model="candidat.lieunais"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">
                          <label for="sexe">Sexe</label>
                          <select class="form-select" id="sexe" v-model="candidat.sexe" required>
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
                            v-model="candidat.tel"
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
                          <input
                            type="email"
                            class="form-control"
                            id="email"
                            v-model="candidat.email"
                          />
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label for="ville">Ville</label>
                          <input
                            type="text"
                            class="form-control"
                            id="ville"
                            v-model="candidat.ville"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">
                          <label for="adresse">Adresse</label>
                          <input
                            class="form-control"
                            id="adresse"
                            v-model="candidat.adresse"
                            rows="2"
                          />
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label for="filiere">Filière</label>
                          <select
                            class="form-select"
                            id="filiere"
                            v-model="candidat.filiere"
                            required
                          >
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
                <div class="modal-footer">
                  <button type="submit" class="btn btn-success" :disabled="isSubmitting">
                    <span v-if="isSubmitting" class="spinner-border spinner-border-sm me-2"></span>
                    Enregistrer
                  </button>
                  <button type="button" class="btn btn-light" @click="closeDetails">Annuler</button>
                </div>
              </form>
            </a-tab-pane>
            <a-tab-pane key="2" tab="Dossier" force-render>
              <p class="text-muted">Déposer les pièces justificatives</p>
              <div v-for="docType in dossierTypes" :key="docType.key" class="mb-3">
                <label class="form-label">{{ docType.label }}</label>
                <input
                  type="file"
                  class="form-control"
                  :accept="docType.accept"
                  @change="(e) => handleDossierUpload(e, docType.key)"
                />
              </div>

              <ul class="list-group">
                <li
                  v-for="doc in candidat.dossiers"
                  :key="doc.nom"
                  class="list-group-item d-flex justify-content-between align-items-center"
                >
                  {{ doc.nom }}
                  <span class="badge bg-secondary">{{ (doc.taille / 1024).toFixed(2) }} KB</span>
                </li>
              </ul>
            </a-tab-pane>
          </a-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const concoursId = router.currentRoute.value.params.id;

const emit = defineEmits(['close', 'submit']);

const activeKey = ref('1');

const fileInput = ref(null);
const previewImage = ref('');

const candidat = ref(getEmptyCandidat());

const maxBirthDate = computed(() => {
  const today = new Date();
  return today.toISOString().split('T')[0];
});

function getEmptyCandidat() {
  return {
    concours_id: concoursId,
    filiere: '',
    nom: '',
    prenom: '',
    datenais: '',
    lieunais: '',
    tel: '',
    email: '',
    adresse: '',
    ville: '',
    pays: 'CG-BZV',
    photo: null,
    photourl: '',
  };
}
const dossierTypes = [
  { key: 'extrait_naissance', label: "Extrait d'acte de naissance", accept: 'application/pdf' },
  { key: 'bac_equivalent', label: "Bac ou équivalent", accept: 'application/pdf' },
  { key: 'arrete_derniere_promotion', label: "Arrêté de dernière promotion", accept: 'application/pdf' },
  { key: 'autorisation_concourir', label: "Autorisation de concourir", accept: 'application/pdf' },
];

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

const resetForm = () => {
  candidat.value = getEmptyCandidat();
  previewImage.value = '';
};

const submitForm = () => {
  const formData = new FormData();

  Object.keys(candidat.value).forEach((key) => {
    if (key !== 'photourl') {
      formData.append(key, candidat.value[key]);
    }
  });

  emit('submit', formData);
  resetForm();
};

const closeDetails = () => {
  emit('close');
  resetForm();
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

.modal-content {
  border: none;
  border-radius: 10px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
}

/* ... autres styles ... */
</style>
