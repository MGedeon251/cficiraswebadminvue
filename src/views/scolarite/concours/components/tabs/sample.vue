<template>
    <div class="row">
      <div class="col-md-12 grid-margin">
        <div class="d-flex justify-content-between flex-wrap">
          <div class="d-flex align-items-end flex-wrap">
            <div class="me-md-3 me-xl-5">
              <h3 v-if="concours && concours.designation">Épreuves - {{ concours.designation }}</h3>
              <h3 v-else>Chargement du concours...</h3>
              <p>Détails sur les épreuves</p>
            </div>
          </div>
          <div class="d-flex justify-content-between align-items-end flex-wrap">
            <div class="dropdown me-2">
              <button class="btn btn-sm btn-outline-secondary" data-bs-toggle="dropdown">
                <i class="mdi mdi-dots-vertical"></i>
              </button>
              <ul class="dropdown-menu dropdown-menu-end">
                <li><a class="dropdown-item" href="#"><i class="mdi mdi-file-excel me-2"></i>Exporter Excel</a></li>
                <li><a class="dropdown-item" href="#"><i class="mdi mdi-printer me-2"></i>Imprimer</a></li>
                <li><hr class="dropdown-divider" /></li>
                <li><a class="dropdown-item" href="#"><i class="mdi mdi-cog me-2"></i>Paramètres</a></li>
              </ul>
            </div>
            <button class="btn btn-outline-dark me-2">PDF</button>
          </div>
        </div>
  
        <div class="table-responsive mt-3">
          <table class="table table-hover align-middle">
            <thead class="table-light">
              <tr>
                <th>Code</th>
                <th>Intitulé</th>
                <th>Coefficient</th>
                <th>Heure début</th>
                <th>Heure fin</th>
                <th>Type</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(epreuve, index) in epreuves" :key="index" :class="{ 'disabled-row': !epreuve.editable }">
                <td><input v-model="epreuve.code" :disabled="!epreuve.editable" type="text" class="form-control" placeholder="EX01" /></td>
                <td><input v-model="epreuve.designation" :disabled="!epreuve.editable" type="text" class="form-control" placeholder="Mathématiques" /></td>
                <td><input v-model.number="epreuve.coefficient" :disabled="!epreuve.editable" type="number" class="form-control" min="1" /></td>
                <td><input v-model="epreuve.heure_debut" :disabled="!epreuve.editable" type="time" class="form-control" /></td>
                <td><input v-model="epreuve.heure_fin" :disabled="!epreuve.editable" type="time" class="form-control" /></td>
                <td>
                  <select v-model="epreuve.type_epreuve" :disabled="!epreuve.editable" class="form-select">
                    <option value="écrit">Écrit</option>
                    <option value="oral">Oral</option>
                    <option value="pratique">Pratique</option>
                  </select>
                </td>
                <td>
                  <div class="d-flex gap-1">
                    <button v-if="!epreuve.editable" class="btn btn-sm btn-outline-primary" @click="epreuve.editable = true">
                      <i class="mdi mdi-pencil"></i>
                    </button>
                    <button v-else class="btn btn-sm btn-outline-success" @click="saveEpreuve(epreuve)">
                      <i class="mdi mdi-content-save"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger" @click="removeEpreuve(index)">
                      <i class="mdi mdi-delete"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <button class="btn btn-outline-primary mt-3" @click="addEpreuve">
            + Ajouter une épreuve
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue';
  import { useRouter } from 'vue-router';
  import { useConcourStore } from '@/stores/gestionStores/concourStore';
  import { useNotifier } from '@/stores/messages/useNotifier';
  import { extractErrorMessage } from '@/stores/messages/useErrorMessage';
  
  const router = useRouter();
  const concourStore = useConcourStore();
  const concoursId = router.currentRoute.value.params.id;
  
  const { notifySuccess, notifyError } = useNotifier();
  
  const concours = computed(() => concourStore.concoursDetail);
  const epreuves = ref([]);
  
  onMounted(async () => {
    try {
      if (concoursId) {
        await concourStore.fetchConcoursById(concoursId);
        await concourStore.fetchEpreuvesConcours(concoursId);
  
        // Ajoute la propriété editable = false aux épreuves déjà sauvegardées
        epreuves.value = concourStore.epreuves.map((e) => ({
          ...e,
          editable: false,
          saved: true
        }));
      }
    } catch (err) {
      notifyError(extractErrorMessage(err, 'Échec lors du chargement des données.'));
    }
  });
  
  const addEpreuve = () => {
    epreuves.value.push({
      code: '',
      designation: '',
      coefficient: 1,
      heure_debut: '',
      heure_fin: '',
      type_epreuve: 'écrit',
      ordre: epreuves.value.length + 1,
      description: 'N/A',
      editable: true,
      saved: false
    });
  };
  
  const removeEpreuve = (index) => {
    epreuves.value.splice(index, 1);
  };
  
  const validateEpreuve = (epreuve) => {
    if (!epreuve.code || !epreuve.designation) return 'Code et intitulé requis';
    if (!epreuve.heure_debut || !epreuve.heure_fin) return 'Heures requises';
    if (epreuve.heure_debut >= epreuve.heure_fin) return 'Heure fin doit être après début';
    if (!epreuve.coefficient || epreuve.coefficient <= 0) return 'Coefficient invalide';
    return null;
  };
  
  const saveEpreuve = async (epreuve) => {
    const error = validateEpreuve(epreuve);
    if (error) return notifyError(error);
  
    const payload = { ...epreuve, concours_id: concoursId };
  
    try {
      await concourStore.addEpreuvesConcours(concoursId, payload);
      notifySuccess('Épreuve sauvegardée');
  
      epreuve.editable = false;
      epreuve.saved = true;
  
      // rafraîchir toutes les épreuves depuis le backend
      await concourStore.fetchEpreuvesConcours(concoursId);
      epreuves.value = concourStore.epreuves.map((e) => ({
        ...e,
        editable: false,
        saved: true
      }));
    } catch (err) {
      notifyError(extractErrorMessage(err, 'Erreur sauvegarde épreuve'));
    }
  };
  </script>
  
  <style scoped>
  .disabled-row {
    opacity: 0.6;
  }
  </style>
  