<template>
  <div class="modal fade" id="importInscriptionsModal" tabindex="-1">
    <div class="modal-dialog modal-lg">
      <div class="modal-content shadow-lg border-0">
        <!-- HEADER -->
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title">
            <i class="bi bi-file-earmark-excel me-2"></i>
            Importer des inscriptions
          </h5>
          <button class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
        </div>

        <!-- BODY -->
        <div class="modal-body">
          <!-- INFO -->
          <div class="alert alert-light border-start border-4 border-info shadow-sm mb-4">
            <h6 class="fw-bold text-info">Recommandations :</h6>
            <ul class="small mb-0">
              <li>Format : .csv ou .xlsx</li>
              <li>Respectez le modèle</li>
              <li>Année académique valide</li>
            </ul>
          </div>

          <!-- UPLOAD -->
          <div
            class="border rounded p-4 text-center bg-light position-relative"
            style="cursor: pointer"
          >
            <input
              type="file"
              class="position-absolute top-0 start-0 w-100 h-100 opacity-0"
              accept=".xlsx,.xls,.csv"
              @change="handleFileUpload"
            />

            <i class="bi bi-cloud-upload fs-1 text-primary"></i>
            <p class="fw-semibold">Glisser ou cliquer</p>
          </div>

          <div v-if="selectedFile" class="mt-2 text-success small">✔ {{ selectedFile.name }}</div>

          <!-- ERREUR GLOBAL -->
          <div v-if="hasErrors" class="alert alert-danger mt-3">
            Certaines lignes contiennent des erreurs.
          </div>

          <!-- PREVIEW -->
          <div v-if="previewData.length" class="mt-4">
            <table class="table table-sm table-hover">
              <thead>
                <tr>
                  <th>Matricule</th>
                  <th>Nom</th>
                  <th>Sexe</th>
                  <th>Classe</th>
                  <th>Année</th>
                  <th>Statut</th>
                </tr>
              </thead>

              <tbody>
                <tr
                  v-for="(row, index) in previewData.slice(0, 5)"
                  :key="index"
                  :class="{ 'table-danger': row._errors?.length }"
                >
                  <td>
                    <code>{{ row.matricule }}</code>
                  </td>

                  <td>
                    <div>{{ row.nom }}</div>
                    <small>{{ row.prenom }}</small>
                  </td>

                  <td>{{ row.sexe }}</td>
                  <td>{{ row.code_classe }}</td>
                  <td>{{ row.annee_academique }}</td>

                  <td>
                    <span v-if="!row._errors.length" class="badge bg-success">OK</span>

                    <div v-else>
                      <span class="badge bg-danger">Erreur</span>
                      <ul class="small text-danger mb-0">
                        <li v-for="(e, i) in row._errors" :key="i">{{ e }}</li>
                      </ul>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- FOOTER -->
        <div class="modal-footer">
          <button class="btn btn-outline-primary btn-sm me-auto" @click="downloadTemplate">
            Télécharger modèle
          </button>

          <button class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>

          <button
            class="btn btn-primary"
            :disabled="!selectedFile || hasErrors"
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
import { ref, computed } from 'vue';
import { useInscriptionStore } from '@/stores/academiqueStore/inscriptionStore';

const inscriptionStore = useInscriptionStore();

const previewData = ref([]);
const selectedFile = ref(null);

const props = defineProps({
  classe: Object,
});

// VALIDATION
const validateRows = (rows) => {
  return rows.map((row) => {
    const errors = [];

    if (!row.matricule) errors.push('Matricule manquant');
    if (!row.nom) errors.push('Nom manquant');
    if (!row.prenom) errors.push('Prénom manquant');
    if (!row.code_classe) errors.push('Classe manquante');
    if (!row.annee_academique) errors.push('Année manquante');

    return { ...row, _errors: errors };
  });
};

const hasErrors = computed(() => previewData.value.some((r) => r._errors?.length));

// UPLOAD
const handleFileUpload = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  selectedFile.value = file;

  const reader = new FileReader();
  reader.onload = (e) => {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: 'array' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const json = XLSX.utils.sheet_to_json(sheet, { defval: '' });

    previewData.value = validateRows(json);
  };

  reader.readAsArrayBuffer(file);
};

// IMPORT
const confirmImport = async () => {
  if (hasErrors.value) return;

  await inscriptionStore.uploadInscriptions(selectedFile.value);
};

// TEMPLATE
const downloadTemplate = () => {
  const code = props.classe?.classe_code || 'CLASSE';

  const ws = XLSX.utils.aoa_to_sheet([
    ['matricule', 'nom', 'prenom', 'sexe', 'code_classe', 'annee_academique'],
    ['ETU001', 'NOM', 'PRENOM', 'M', code, '2024-2025'],
  ]);

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Modele');
  XLSX.writeFile(wb, `Template_${code}.xlsx`);
};
</script>
