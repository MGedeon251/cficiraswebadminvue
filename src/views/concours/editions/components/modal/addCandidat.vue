<template>
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <!-- Header -->
        <div class="modal-header bg-primary text-white">
          <h5 class="modal-title" id="exampleModalLabel">Ajouter un candidat</h5>
          <button type="button" class="btn-close btn-close-white" @click="closeDetails"></button>
        </div>

        <!-- Body -->
        <div class="modal-body">
          <a-tabs v-model:activeKey="activeKey">
            <!-- ================= ONGLET 1 ================= -->
            <a-tab-pane key="1" tab="Données personnelles">
              <form @submit.prevent="submitForm">
                <div class="row">
                  <!-- PHOTO -->
                  <div class="col-md-3 text-center mb-4">
                    <label class="form-label fw-semibold">Photo du candidat</label>
                    <div
                      class="avatar bg-light text-secondary d-flex align-items-center justify-content-center mx-auto"
                    >
                      <img
                        v-if="previewImage"
                        :src="previewImage"
                        alt="Photo du candidat"
                        class="avatar-img"
                      />
                      <span v-else class="fs-2">
                        {{ getInitials(candidat.nom, candidat.prenom) }}
                      </span>

                      <input
                        type="file"
                        ref="fileInput"
                        class="d-none"
                        accept="image/*"
                        @change="handleFileUpload"
                      />
                    </div>

                    <button
                      type="button"
                      class="btn btn-sm btn-outline-primary mt-2"
                      @click="triggerFileInput"
                    >
                      {{ candidat.photourl ? 'Changer la photo' : 'Ajouter une photo' }}
                    </button>

                    <small class="text-muted d-block mt-1">
                      Photo format identité (jpg, png)
                    </small>
                  </div>

                  <!-- INFORMATIONS -->
                  <div class="col-md-9">
                    <!-- Nom / Prénom -->
                    <div class="row">
                      <div class="col-md-6 mb-3">
                        <label class="form-label"> Nom <span class="text-danger">*</span> </label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Ex : NGOMA"
                          v-model="candidat.nom"
                          required
                        />
                        <small class="text-muted">Nom de famille officiel</small>
                      </div>

                      <div class="col-md-6 mb-3">
                        <label class="form-label">
                          Prénoms <span class="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Ex : Jean Pierre"
                          v-model="candidat.prenom"
                          required
                        />
                        <small class="text-muted">Tous les prénoms du candidat</small>
                      </div>
                    </div>

                    <!-- Naissance -->
                    <div class="row">
                      <div class="col-md-6 mb-3">
                        <label class="form-label">
                          Date de naissance <span class="text-danger">*</span>
                        </label>
                        <input
                          type="date"
                          class="form-control"
                          v-model="candidat.datenais"
                          :max="maxBirthDate"
                          required
                        />
                      </div>

                      <div class="col-md-6 mb-3">
                        <label class="form-label">
                          Lieu de naissance <span class="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Ex : Brazzaville"
                          v-model="candidat.lieunais"
                          required
                        />
                      </div>
                    </div>

                    <!-- Sexe / Téléphone -->
                    <div class="row">
                      <div class="col-md-6 mb-3">
                        <label class="form-label"> Sexe <span class="text-danger">*</span> </label>
                        <select class="form-select" v-model="candidat.sexe" required>
                          <option value="">-- Sélectionner --</option>
                          <option value="M">Masculin</option>
                          <option value="F">Féminin</option>
                        </select>
                      </div>

                      <div class="col-md-6 mb-3">
                        <label class="form-label">
                          Téléphone <span class="text-danger">*</span>
                        </label>
                        <input
                          type="tel"
                          class="form-control"
                          placeholder="+242 06 603 43 57"
                          v-model="candidat.tel"
                          required
                        />
                        <small class="text-muted">Numéro joignable du candidat</small>
                      </div>
                    </div>

                    <!-- Email / Ville -->
                    <div class="row">
                      <div class="col-md-6 mb-3">
                        <label class="form-label">Email</label>
                        <input
                          type="email"
                          class="form-control"
                          placeholder="exemple@email.com"
                          v-model="candidat.email"
                        />
                      </div>

                      <div class="col-md-6 mb-3">
                        <label class="form-label"> Ville <span class="text-danger">*</span> </label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Ville de résidence"
                          v-model="candidat.ville"
                          required
                        />
                      </div>
                    </div>

                    <!-- Adresse / Filière -->
                    <div class="row">
                      <div class="col-md-6 mb-3">
                        <label class="form-label">Adresse</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Quartier, rue, référence..."
                          v-model="candidat.adresse"
                        />
                      </div>

                      <div class="col-md-6 mb-3">
                        <label class="form-label">
                          Filière choisie <span class="text-danger">*</span>
                        </label>
                        <select class="form-select" v-model="candidat.filiere" required>
                          <option value="">-- Sélectionner une filière --</option>
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

                <!-- Footer -->
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    @click="closeDetails"
                    :disabled="isSubmitting"
                  >
                    Annuler
                  </button>

                  <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
                    <span v-if="isSubmitting" class="spinner-border spinner-border-sm me-2"></span>
                    Enregistrer
                  </button>
                </div>
              </form>
            </a-tab-pane>

            <!-- ================= ONGLET 2 ================= -->
            <a-tab-pane key="2" tab="Dossier" force-render>
              <p class="text-muted mb-3">Déposez les pièces justificatives du candidat</p>

              <div v-for="docType in dossierTypes" :key="docType.key" class="mb-3">
                <label class="form-label">{{ docType.label }}</label>
                <input
                  type="file"
                  class="form-control"
                  :accept="docType.accept"
                  @change="(e) => handleDossierUpload(e, docType.key)"
                />
                <small class="text-muted"> Formats acceptés : {{ docType.accept }} </small>
              </div>

              <ul class="list-group mt-3">
                <li
                  v-for="doc in candidat.dossiers"
                  :key="doc.nom"
                  class="list-group-item d-flex justify-content-between align-items-center"
                >
                  {{ doc.nom }}
                  <span class="badge bg-secondary"> {{ (doc.taille / 1024).toFixed(2) }} KB </span>
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
  { key: 'bac_equivalent', label: 'Bac ou équivalent', accept: 'application/pdf' },
  {
    key: 'arrete_derniere_promotion',
    label: 'Arrêté de dernière promotion',
    accept: 'application/pdf',
  },
  { key: 'autorisation_concourir', label: 'Autorisation de concourir', accept: 'application/pdf' },
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
