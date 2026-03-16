<template>
  <!-- Modal Import -->
  <div
    class="modal fade"
    id="importInscriptionsModal"
    tabindex="-1"
    aria-labelledby="importInscriptionsLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <!-- Header -->
        <div class="modal-header bg-secondary text-white">
          <h5 class="modal-title" id="importInscriptionsLabel">Importer des inscriptions</h5>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
        </div>

        <!-- Body -->
        <div class="modal-body">
          <!-- Recommandations -->
        <div class="alert alert-info">
          <h6>Recommandations :</h6>
          <ul>
            <li>Le fichier doit être au format <strong>.csv</strong> ou <strong>.xlsx</strong>.</li>
            <li>
              Colonnes doivent être les mêmes que celui du <code>modele</code> à telecharger.
            </li>
            <li>Chaque ligne correspond à un enregistrement unique.</li>
            <li>L'<strong>année academique</strong> doit etre une année en cours  et <strong>active</strong>.</li>
          </ul>
        </div>
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
                    <th>Date Naissance</th>
                    <th>Lieu Naissance</th>
                    <th>Téléphone</th>
                    <th>Email</th>
                    <th>Ville</th>
                    <th>Filiere ID</th>
                    <th>Code Classe</th>
                    <th>Année Académique</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(row, index) in previewData.slice(0, 5)" :key="index">
                    <td>{{ row.matricule }}</td>
                    <td>{{ row.nom }}</td>
                    <td>{{ row.prenom }}</td>
                    <td>{{ row.sexe }}</td>
                    <td>{{ row.date_naissance }}</td>
                    <td>{{ row.lieu_naissance }}</td>
                    <td>{{ row.telephone }}</td>
                    <td>{{ row.email }}</td>
                    <td>{{ row.ville }}</td>
                    <td>{{ row.filiere_id }}</td>
                    <td>{{ row.code_classe }}</td>
                    <td>{{ row.annee_academique }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <small class="text-muted">Affichage limité aux 5 premières lignes</small>
          </div>
        </div>

        <!-- Footer -->
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-success" @click="downloadTemplate">
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
import * as XLSX from 'xlsx'
import { ref } from 'vue'

const previewData = ref([])
const emit = defineEmits(['import-complete'])

const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = (e) => {
    const data = new Uint8Array(e.target.result)
    const workbook = XLSX.read(data, { type: 'array' })
    const sheetName = workbook.SheetNames[0]
    const worksheet = workbook.Sheets[sheetName]
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: '' })

    previewData.value = jsonData.map((row) => ({
      matricule: row.matricule || '',
      nom: row.nom || '',
      prenom: row.prenom || '',
      sexe: row.sexe || '',
      date_naissance: row.date_naissance || '',
      lieu_naissance: row.lieu_naissance || '',
      telephone: row.telephone || '',
      email: row.email || '',
      ville: row.ville || '',
      filiere_id: row.filiere_id || '',
      code_classe: row.code_classe || '',
      annee_academique: row.annee_academique || ''
    }))
  }
  reader.readAsArrayBuffer(file)
}

const confirmImport = () => {
  emit('import-complete', previewData.value)
  previewData.value = []
  alert('Importation réussie !')
}

const downloadTemplate = () => {
  const headers = [
    'matricule',
    'nom',
    'prenom',
    'sexe',
    'date_naissance',
    'lieu_naissance',
    'telephone',
    'email',
    'ville',
    'filiere',
    'code_classe',
    'annee_academique'
  ]
  const sampleRow = [
    'ETU001',
    'Jean',
    'Dupont',
    'Homme',
    '1999-05-12',
    'Dakar',
    '770000000',
    'jean.dupont@example.com',
    'Dakar',
    'informatique',
    'L1-MATH',
    '2024-2025'
  ]
  const worksheet = XLSX.utils.aoa_to_sheet([headers, sampleRow])
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Modèle Inscriptions')
  XLSX.writeFile(workbook, 'modele_inscriptions.xlsx')
}
</script>
