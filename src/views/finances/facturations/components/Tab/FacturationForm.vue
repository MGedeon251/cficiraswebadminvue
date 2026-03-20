<template>
  <div class="honoraires-container">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h4 class="fw-bold">États Honoraires des Formateurs</h4>
        <p class="text-muted small">Suivi des vacations et émoluments par période.</p>
      </div>
      <div class="d-flex gap-2">
        <div class="btn-group btn-group-sm mr-2" role="group">
          <input type="radio" v-model="viewType" value="mois" class="btn-check" id="v-mois" checked>
          <label class="btn btn-outline-primary" for="v-mois">Mensuel</label>

          <input type="radio" v-model="viewType" value="trimestre" class="btn-check" id="v-trim">
          <label class="btn btn-outline-primary" for="v-trim">Trimestriel</label>

          <input type="radio" v-model="viewType" value="annuel" class="btn-check" id="v-ann">
          <label class="btn btn-outline-primary" for="v-ann">Annuel</label>
        </div>

        <button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#importFormateurModal">
          <i class="mdi mdi-upload me-1"></i> Charger Liste (CSV/Excel)
        </button>
      </div>
    </div>

    <div class="row mb-4">
      <div class="col-md-4">
        <div class="card border-0 shadow-sm bg-inverse-primary">
          <div class="card-body">
            <h6 class="text-uppercase small fw-bold">Total Honoraires ({{ viewLabel }})</h6>
            <h3 class="mb-0 fw-bold">{{ formatPrice(totalHonoraires) }}</h3>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card border-0 shadow-sm">
          <div class="card-body">
            <h6 class="text-uppercase small fw-bold text-muted">Nombre de Formateurs</h6>
            <h3 class="mb-0 fw-bold">{{ honoraires.length }}</h3>
          </div>
        </div>
      </div>
    </div>

    <div class="card shadow-sm border-0">
      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table table-striped align-middle mb-0">
            <thead class="bg-white">
              <tr>
                <th class="ps-4">Formateur</th>
                <th>Matières / Modules</th>
                <th>Volume Horaire</th>
                <th>Taux Horaire</th>
                <th>Total Brut</th>
                <th class="text-center">Détails</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in honoraires" :key="item.id">
                <td class="ps-4">
                  <div class="fw-bold">{{ item.nom }} {{ item.prenom }}</div>
                  <span class="badge bg-light text-dark extra-small">{{ item.matricule }}</span>
                </td>
                <td>{{ item.modules }}</td>
                <td>{{ item.heures }} h</td>
                <td>{{ formatPrice(item.taux) }}</td>
                <td class="fw-bold text-success">{{ formatPrice(item.heures * item.taux) }}</td>
                <td class="text-center">
                  <button class="btn btn-sm btn-outline-secondary" @click="viewFiche(item)">
                    <i class="mdi mdi-file-document-outline"></i> Fiche
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="modal fade" id="importFormateurModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content border-0 shadow">
          <div class="modal-header">
            <h5 class="modal-title fw-bold">Importer la liste des vacations</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body text-center">
            <div class="upload-zone p-5 border-dashed rounded mb-3">
              <i class="mdi mdi-file-excel mdi-48px text-success"></i>
              <p class="mt-2">Glissez votre fichier ici ou cliquez pour parcourir</p>
              <input type="file" @change="handleFileChange" class="form-control form-control-sm mt-3" accept=".xlsx, .csv">
            </div>
            <div class="text-start">
              <p class="small text-muted mb-1 fw-bold">Colonnes requises :</p>
              <code class="extra-small">matricule, nom, prenom, heures_faites, taux_horaire, mois</code>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-light" data-bs-dismiss="modal">Annuler</button>
            <button type="button" class="btn btn-primary" @click="processImport">Lancer l'importation</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const viewType = ref('mois');
const honoraires = ref([
  { id: 1, matricule: 'PRF-001', nom: 'BA', prenom: 'Abdoulaye', modules: 'Maths, Algorithmique', heures: 45, taux: 15000 },
  { id: 2, matricule: 'PRF-042', nom: 'FALL', prenom: 'Moussa', modules: 'Base de données', heures: 30, taux: 12000 },
  { id: 3, matricule: 'PRF-009', nom: 'NDIAYE', prenom: 'Astou', modules: 'Comptabilité Générale', heures: 20, taux: 10000 },
]);

const viewLabel = computed(() => {
  if (viewType.value === 'mois') return 'Ce mois-ci';
  if (viewType.value === 'trimestre') return 'Ce trimestre';
  return 'Cette année';
});

const totalHonoraires = computed(() => {
  return honoraires.value.reduce((acc, curr) => acc + (curr.heures * curr.taux), 0);
});

const formatPrice = (val) => new Intl.NumberFormat('fr-FR').format(val) + ' F';

const handleFileChange = (e) => console.log("Fichier prêt :", e.target.files[0].name);
const processImport = () => alert("Analyse du fichier et mise à jour des états honoraires terminée !");
const viewFiche = (item) => alert(`Détail des vacations pour ${item.prenom} ${item.nom}`);
</script>

<style scoped>
.bg-inverse-primary {
  background-color: #f0f0ff;
  color: #4b49ac;
}
.border-dashed {
  border: 2px dashed #dee2e6;
  background-color: #fafafa;
}
.extra-small {
  font-size: 0.7rem;
}
.btn-check:checked + .btn-outline-primary {
  background-color: #4b49ac;
  border-color: #4b49ac;
}
</style>