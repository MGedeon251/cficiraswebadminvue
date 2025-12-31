<template>
  <div class="row">
    <div class="col-12 mb-3">
      <h4>Exportation des étudiants</h4>
      <p class="text-muted">Choisissez les filtres et le format pour exporter la liste des étudiants.</p>
    </div>

    <!-- Filtres -->
    <div class="col-12 mb-3">
      <div class="card">
        <div class="card-body">
          <div class="row g-3">
            <!-- Année académique -->
            <div class="col-md-3">
              <label class="form-label">Année académique</label>
              <select v-model="selectedAnnee" class="form-select">
                <option value="">Toutes</option>
                <option v-for="annee in annees" :key="annee" :value="annee">{{ annee }}</option>
              </select>
            </div>

            <!-- Filière -->
            <div class="col-md-3">
              <label class="form-label">Filière</label>
              <select v-model="selectedFiliere" class="form-select">
                <option value="">Toutes</option>
                <option v-for="f in filieres" :key="f" :value="f">{{ f }}</option>
              </select>
            </div>

            <!-- Niveau -->
            <div class="col-md-3">
              <label class="form-label">Niveau</label>
              <select v-model="selectedNiveau" class="form-select">
                <option value="">Tous</option>
                <option v-for="n in niveaux" :key="n" :value="n">{{ n }}</option>
              </select>
            </div>

            <!-- Classe -->
            <div class="col-md-3">
              <label class="form-label">Classe</label>
              <select v-model="selectedClasse" class="form-select">
                <option value="">Toutes</option>
                <option v-for="c in classes" :key="c" :value="c">{{ c }}</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Boutons Export -->
    <div class="col-12">
      <div class="card shadow-sm">
        <div class="card-body">
          <div class="d-flex flex-wrap gap-3">
            <button class="btn btn-outline-success" @click="exportExcel">
              <i class="mdi mdi-file-excel-outline me-1"></i> Exporter Excel
            </button>
            <button class="btn btn-outline-danger" @click="exportPDF">
              <i class="mdi mdi-file-pdf-box me-1"></i> Exporter PDF
            </button>
            <button class="btn btn-outline-primary" @click="exportCSV">
              <i class="mdi mdi-file-delimited-outline me-1"></i> Exporter CSV
            </button>
          </div>

          <div v-if="successMessage" class="alert alert-success mt-3">
            {{ successMessage }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import * as XLSX from 'xlsx'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

const successMessage = ref('')
const etudiants = ref([
  { matricule: 'E001', nom: 'Diallo', prenom: 'Mamadou', sexe: 'M', annee_academique: '2024-2025', filiere: 'Informatique', niveau: 'Licence 1', classe: 'L1-INFO-A' },
  { matricule: 'E002', nom: 'Ndiaye', prenom: 'Awa', sexe: 'F', annee_academique: '2024-2025', filiere: 'Informatique', niveau: 'Licence 2', classe: 'L2-INFO-B' },
  { matricule: 'E003', nom: 'Kouassi', prenom: 'Jean', sexe: 'M', annee_academique: '2023-2024', filiere: 'Administration', niveau: 'Master 1', classe: 'M1-ADM-A' },
])

// Filtres
const annees = ref(['2023-2024', '2024-2025'])
const filieres = ref(['Informatique', 'Administration'])
const niveaux = ref(['Licence 1', 'Licence 2', 'Master 1'])
const classes = ref(['L1-INFO-A', 'L2-INFO-B', 'M1-ADM-A'])

const selectedAnnee = ref('')
const selectedFiliere = ref('')
const selectedNiveau = ref('')
const selectedClasse = ref('')

// Filtrage
const filteredEtudiants = computed(() => {
  return etudiants.value.filter((e) => {
    const matchAnnee = !selectedAnnee.value || e.annee_academique === selectedAnnee.value
    const matchFiliere = !selectedFiliere.value || e.filiere === selectedFiliere.value
    const matchNiveau = !selectedNiveau.value || e.niveau === selectedNiveau.value
    const matchClasse = !selectedClasse.value || e.classe === selectedClasse.value
    return matchAnnee && matchFiliere && matchNiveau && matchClasse
  })
})

// Export Excel
const exportExcel = () => {
  const worksheet = XLSX.utils.json_to_sheet(filteredEtudiants.value)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Étudiants')
  XLSX.writeFile(workbook, 'etudiants.xlsx')
  successMessage.value = 'Export Excel réussi ✅'
}

// Export PDF
const exportPDF = () => {
  const doc = new jsPDF()
  doc.text('Liste des étudiants', 14, 16)

  autoTable(doc, {
    head: [['Matricule', 'Nom', 'Prénom', 'Sexe', 'Année', 'Filière', 'Niveau', 'Classe']],
    body: filteredEtudiants.value.map((e) => [
      e.matricule,
      e.nom,
      e.prenom,
      e.sexe,
      e.annee_academique,
      e.filiere,
      e.niveau,
      e.classe,
    ]),
  })

  doc.save('etudiants.pdf')
  successMessage.value = 'Export PDF réussi ✅'
}

// Export CSV
const exportCSV = () => {
  const headers = ['Matricule', 'Nom', 'Prénom', 'Sexe', 'Année', 'Filière', 'Niveau', 'Classe']
  const rows = filteredEtudiants.value.map((e) =>
    [e.matricule, e.nom, e.prenom, e.sexe, e.annee_academique, e.filiere, e.niveau, e.classe].join(',')
  )
  const csvContent = [headers.join(','), ...rows].join('\n')
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = 'etudiants.csv'
  link.click()
  successMessage.value = 'Export CSV réussi ✅'
}
</script>

<style scoped>
.card {
  border-radius: 12px;
}
.btn {
  min-width: 160px;
}
</style>
