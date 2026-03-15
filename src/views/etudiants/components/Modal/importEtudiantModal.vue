<template>
  <!-- Modal Import -->
  <div
    class="modal fade"
    id="importModal"
    tabindex="-1"
    aria-labelledby="importModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <!-- Header -->
        <div class="modal-header bg-secondary text-white">
          <h5 class="modal-title" id="importModalLabel">Importer des étudiants</h5>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
        </div>

        <!-- Body -->
        <div class="modal-body">
          <div class="mb-3">
            <label class="form-label">Sélectionner un fichier Excel ou CSV</label>
            <input
              type="file"
              class="form-control"
              accept=".xlsx,.xls,.csv"
              @change="handleFileUpload"
            />
            <small class="text-muted">Formats acceptés : .xlsx, .xls, .csv</small>
          </div>

          <!-- Aperçu -->
          <div v-if="previewData.length" class="mt-4">
            <h6>Aperçu des données importées :</h6>
            <div class="table-responsive">
              <table class="table table-sm table-bordered">
                <thead>
                  <tr>
                    <th>Matricule</th>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Sexe</th>
                    <th>Classe</th>
                    <th>Filière</th>
                    <th>Année académique</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(row, index) in previewData.slice(0, 5)" :key="index">
                    <td>{{ row.Matricule }}</td>
                    <td>{{ row.Nom }}</td>
                    <td>{{ row.Prénom }}</td>
                    <td>{{ row.Sexe }}</td>
                    <td>{{ row.Classe }}</td>
                    <td>{{ row.Filière }}</td>
                    <td>{{ row.Annee }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <small class="text-muted">Affichage limité aux 5 premières lignes</small>
          </div>
        </div>

        <!-- Footer -->
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" @click="downloadTemplate">
            Télécharger modèle
          </button>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
          <button
            type="button"
            class="btn btn-primary"
            :disabled="!previewData.length"
            @click="confirmImport"
          >
            Importer
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import * as XLSX from 'xlsx';
import { ref } from 'vue';

const previewData = ref([]);
const emit = defineEmits(['import-complete']);

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: 'array' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: '' });

    previewData.value = jsonData.map((row) => ({
      Matricule: row.Matricule || '',
      Nom: row.Nom || '',
      Prénom: row.Prénom || '',
      Sexe: row.Sexe || '',
      Classe: row.Classe || '',
      Filière: row.Filière || '',
      Annee: row.Annee || '',
    }));
  };
  reader.readAsArrayBuffer(file);
};

const confirmImport = () => {
  emit('import-complete', previewData.value);
  previewData.value = [];
  alert('Importation réussie !');
};

const downloadTemplate = () => {
  const headers = ['Matricule', 'Nom', 'Prénom', 'Sexe', 'Classe', 'Filière', 'Annee'];
  const worksheet = XLSX.utils.aoa_to_sheet([headers]);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Modèle Étudiants');
  XLSX.writeFile(workbook, 'modele_etudiants.xlsx');
};
</script>
