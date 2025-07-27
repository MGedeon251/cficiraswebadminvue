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
            <a-tab-pane key="1" tab="Données personnelles">
              <form @submit.prevent="submitForm">
                <div class="row">
                  <p class="text-muted">Photo format profil</p>
                  <div class="col-md-3 text-center">
                    <div class="avatar bg-warning text-white d-flex align-items-center justify-content-center">
                      <img
                        v-if="previewImage"
                        :src="previewImage"
                        alt="Photo du candidat"
                        class="avatar-img"
                      />
                      <span v-else class="fs-1">{{ getInitials(candidat.nom, candidat.prenom) }}</span>
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
                        <label>Nom</label>
                        <input type="text" class="form-control" v-model="candidat.nom" required />
                      </div>
                      <div class="col-md-6">
                        <label>Prénom</label>
                        <input type="text" class="form-control" v-model="candidat.prenom" required />
                      </div>
                    </div>
                    <div class="row mt-2">
                      <div class="col-md-6">
                        <label>Date de naissance</label>
                        <input type="date" class="form-control" v-model="candidat.datenais" required />
                      </div>
                      <div class="col-md-6">
                        <label>Lieu de naissance</label>
                        <input type="text" class="form-control" v-model="candidat.lieunais" required />
                      </div>
                    </div>
                    <div class="row mt-2">
                      <div class="col-md-6">
                        <label>Sexe</label>
                        <select class="form-select" v-model="candidat.sexe" required>
                          <option value="">Sélectionner</option>
                          <option value="M">Masculin</option>
                          <option value="F">Féminin</option>
                        </select>
                      </div>
                      <div class="col-md-6">
                        <label>Téléphone</label>
                        <input type="tel" class="form-control" v-model="candidat.tel" required />
                      </div>
                    </div>
                    <div class="row mt-2">
                      <div class="col-md-6">
                        <label>Email</label>
                        <input type="email" class="form-control" v-model="candidat.email" />
                      </div>
                      <div class="col-md-6">
                        <label>Ville</label>
                        <input type="text" class="form-control" v-model="candidat.ville" />
                      </div>
                    </div>
                    <div class="row mt-2">
                      <div class="col-md-6">
                        <label>Adresse</label>
                        <input type="text" class="form-control" v-model="candidat.adresse" />
                      </div>
                      <div class="col-md-6">
                        <label>Filière</label>
                        <select class="form-select" v-model="candidat.filiere" required>
                          <option value="">Choisir...</option>
                          <option v-for="f in filieres" :key="f.id" :value="f.id">
                             {{ f.code }} - {{ f.description }}
                          </option>
                        </select>
                      </div>
                    </div>
                    <div class="row mt-2">
                      <div class="col-md-6">
                        <label>Statut</label>
                        <select class="form-select" v-model="candidat.statut" required>
                          <option value="">Sélectionner</option>
                          <option value="bachelier">Bachelier</option>
                          <option value="fonctionnaire">Fonctionnaire</option>
                          <option value="autre">Autre</option>
                        </select>
                      </div>
                      <div class="col-md-6">
                        <label>Nationalité</label>
                        <select class="form-select" v-model="candidat.nationalite" required>
                          <option value="">Sélectionner</option>
                          <option v-for="nat in nationalites" :key="nat.code" :value="nat.code">
                            {{ nat.drapeau }} {{ nat.nom }}
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="submit" class="btn btn-success">Enregistrer</button>
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
import { ref, onMounted } from 'vue';
import { candidatsStore } from '@/stores/scolarite/concours/candidatsStore';
import { filiereStore } from '@/stores/scolarite/concours/filiereStore';
import { dossierStore } from '@/stores/scolarite/concours/dossierStore';

const emit = defineEmits(['submit', 'refresh']);
const activeKey = ref('1');
const fileInput = ref(null);
const previewImage = ref('');
const filieres = ref([]);

const dossierTypes = [
  { key: 'extrait_naissance', label: "Extrait d'acte de naissance", accept: 'application/pdf' },
  { key: 'bac_equivalent', label: "Bac ou équivalent", accept: 'application/pdf' },
  { key: 'arrete_derniere_promotion', label: "Arrêté de dernière promotion", accept: 'application/pdf' },
  { key: 'autorisation_concourir', label: "Autorisation de concourir", accept: 'application/pdf' },
];

const nationalites = [
  { code: 'CG', nom: 'Congo', drapeau: '🇨🇬' },
  { code: 'FR', nom: 'France', drapeau: '🇫🇷' },
  { code: 'CM', nom: 'Cameroun', drapeau: '🇨🇲' },
  { code: 'CD', nom: 'RDC', drapeau: '🇨🇩' },
  { code: 'GA', nom: 'Gabon', drapeau: '🇬🇦' },
  { code: 'CI', nom: 'Côte d’Ivoire', drapeau: '🇨🇮' },
  { code: 'SN', nom: 'Sénégal', drapeau: '🇸🇳' },
];

const candidat = ref({
  nom: '', prenom: '', datenais: '', lieunais: '', sexe: '', tel: '', email: '',
  ville: '', adresse: '', filiere: '', concours_id: 1,
  statut: '', nationalite: '',
  photo: null, photourl: '', dossiers: [],
});

const triggerFileInput = () => fileInput.value?.click();
const getInitials = (n, p) => `${n?.[0] || ''}${p?.[0] || ''}`.toUpperCase();

const handleFileUpload = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    const url = URL.createObjectURL(file);
    previewImage.value = url;

    const photoDossier = {
      nom: file.name,
      type: file.type,
      taille: file.size,
      contenu: reader.result,
      url,
      candidatId: 'temp',
    };

    dossierStore.add(photoDossier);
    candidat.value.photo = reader.result;
    candidat.value.photourl = url;
  };
  reader.readAsDataURL(file);
};

const handleDossierUpload = (event, type) => {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    const dossierData = {
      nom: `${type}_${file.name}`,
      type: file.type,
      taille: file.size,
      contenu: reader.result,
      url: URL.createObjectURL(file),
      candidatId: 'temp',
    };
    dossierStore.add(dossierData);
    candidat.value.dossiers.push(dossierData);
  };
  reader.readAsDataURL(file);
};

const submitForm = () => {
  const formDataObj = new FormData();

  formDataObj.append('nom', candidat.value.nom);
  formDataObj.append('prenom', candidat.value.prenom);
  formDataObj.append('datenais', candidat.value.datenais);
  formDataObj.append('lieunais', candidat.value.lieunais);
  formDataObj.append('sexe', candidat.value.sexe);
  formDataObj.append('tel', candidat.value.tel);
  formDataObj.append('email', candidat.value.email);
  formDataObj.append('ville', candidat.value.ville);
  formDataObj.append('adresse', candidat.value.adresse);
  formDataObj.append('filiere', candidat.value.filiere);
  formDataObj.append('statut', candidat.value.statut);
  formDataObj.append('nationalite', candidat.value.nationalite);
  formDataObj.append('photo', candidat.value.photo || '');
  formDataObj.append('photourl', candidat.value.photourl || '');
  formDataObj.append('dossiers', JSON.stringify(candidat.value.dossiers || []));
  formDataObj.append('concours_id', candidat.value.concours_id || 1);

  emit('submit', formDataObj);

  const modal = bootstrap.Modal.getInstance(document.getElementById('exampleModal'));
  modal?.hide();
  resetForm();
};

const closeDetails = () => {
  const modal = bootstrap.Modal.getInstance(document.getElementById('exampleModal'));
  modal?.hide();
  resetForm();
};

const resetForm = () => {
  candidat.value = {
    nom: '', prenom: '', datenais: '', lieunais: '', sexe: '', tel: '', email: '',
    ville: '', adresse: '', filiere: '', statut: '', nationalite: '',
    photo: null, photourl: '', dossiers: [],
  };
  previewImage.value = '';
};

onMounted(() => {
  filieres.value = filiereStore.getAll();
});
</script>

<style scoped>
.avatar {
  width: 150px;
  height: 150px;
  border-radius: 8px;
  border: 2px solid antiquewhite;
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
