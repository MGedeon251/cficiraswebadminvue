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
            <tr v-for="(epreuve, index) in epreuves" :key="index">
              <td><input v-model="epreuve.code" type="text" class="form-control" placeholder="EX01" /></td>
              <td><input v-model="epreuve.designation" type="text" class="form-control" placeholder="Mathématiques" /></td>
              <td><input v-model.number="epreuve.coefficient" type="number" class="form-control" min="1" /></td>
              <td><input v-model="epreuve.heure_debut" type="time" class="form-control" /></td>
              <td><input v-model="epreuve.heure_fin" type="time" class="form-control" /></td>
              <td>
                <select v-model="epreuve.type_epreuve" class="form-select">
                  <option value="écrit">Écrit</option>
                  <option value="oral">Oral</option>
                  <option value="pratique">Pratique</option>
                </select>
              </td>
              <td>
                <button class="btn btn-sm b me-1" @click="saveEpreuve(epreuve)">
                  <i class="mdi mdi-content-save"></i>
                </button>
                <button class="btn btn-sm" @click="removeEpreuve(index)">
                  <i class="mdi mdi-delete"></i>
                </button>
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
      epreuves.value = [...concourStore.epreuves];
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
    description: 'N/A'
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
    await concourStore.addEpreuvesConcours(concoursId,payload);
    await concourStore.fetchEpreuvesConcours(concoursId);
    epreuves.value = [...concourStore.epreuves];
  } catch (err) {
    notifyError(extractErrorMessage(err, 'Erreur sauvegarde épreuve'));
  }
console.log('Payload envoyé:', payload);
console.log('Concours ID:', concoursId);

};
</script>