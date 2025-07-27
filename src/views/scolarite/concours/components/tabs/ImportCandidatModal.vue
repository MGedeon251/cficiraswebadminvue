<template>
    <div
      class="modal fade"
      id="importModal"
      tabindex="-1"
      aria-labelledby="importModalLabel"
      aria-hidden="true"
      ref="importModalRef"
    >
      <div class="modal-dialog modal-xl modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header d-flex justify-content-between align-items-center">
            <h5 class="modal-title" id="importModalLabel">Importer des candidats - Aperçu</h5>
            <div class="d-flex gap-3 align-items-center">
              <div>
                <strong>{{ importPreviewNonDuplicates.length }}</strong> candidat(s) à importer
              </div>
              <div v-if="importPreviewDuplicates.length > 0" class="text-danger">
                <strong>{{ importPreviewDuplicates.length }}</strong> candidat(s) déjà existant(s)
              </div>
              <button type="button" class="btn-close" @click="closeImportModal"></button>
            </div>
          </div>
          <div class="modal-body">
            <input type="file" accept=".xlsx" @change="handleFileUpload" />
  
            <div v-if="importPreview.length === 0" class="mt-3">
              <p>Aucun fichier chargé.</p>
            </div>
  
            <div
              v-else
              class="table-responsive mt-3"
              style="max-height: 400px; overflow-y: auto;"
            >
              <table class="table table-sm table-bordered">
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Date Naissance</th>
                    <th>Lieu Naissance</th>
                    <th>Sexe</th>
                    <th>Téléphone</th>
                    <th>Email</th>
                    <th>Ville</th>
                    <th>Adresse</th>
                    <th>Filière</th>
                    <th>Statut</th>
                    <th>Nationalité</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(row, idx) in importPreviewPaginated"
                    :key="idx"
                    :class="{
                      'table-danger': row.isDuplicate || erreursParLigne[startIndex + idx]
                    }"
                    :title="row.isDuplicate ? 'Candidat déjà existant' : ''"
                  >
                    <td>{{ row.nom || '' }}</td>
                    <td>{{ row.prenom || '' }}</td>
                    <td>{{ row.datenais || '' }}</td>
                    <td>{{ row.lieunais || '' }}</td>
                    <td>{{ row.sexe || '' }}</td>
                    <td>{{ row.tel || '' }}</td>
                    <td>{{ row.email || '' }}</td>
                    <td>{{ row.ville || '' }}</td>
                    <td>{{ row.adresse || '' }}</td>
                    <td>{{ row.filiere || '' }}</td>
                    <td>{{ row.statut || '' }}</td>
                    <td>{{ row.nationalite || '' }}</td>
                  </tr>
                </tbody>
              </table>
  
              <div
                v-if="importPreview.length > itemsPerPageImport"
                class="d-flex justify-content-center align-items-center mt-2"
              >
                <button
                  class="btn btn-sm btn-outline-primary me-2"
                  :disabled="!canPrevImport"
                  @click="goPrevImport"
                >
                  Précédent
                </button>
                <span>Page {{ currentPageImport }} / {{ totalPagesImport }}</span>
                <button
                  class="btn btn-sm btn-outline-primary ms-2"
                  :disabled="!canNextImport"
                  @click="goNextImport"
                >
                  Suivant
                </button>
              </div>
  
              <div v-if="hasDuplicates" class="alert alert-warning mt-3">
                ⚠️ Certains candidats existent déjà (lignes en rouge) et ne seront pas ré-importés.
              </div>
  
              <div v-if="messagesErreur.length" class="alert alert-danger mt-3">
                <strong>Erreurs détectées :</strong>
                <ul>
                  <li v-for="(msg, i) in messagesErreur" :key="i">{{ msg }}</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" @click="closeImportModal">Annuler</button>
            <button
              class="btn btn-primary"
              :disabled="importPreviewNonDuplicates.length === 0 || messagesErreur.length > 0"
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
  import { ref, computed, nextTick } from 'vue'
  import * as XLSX from 'xlsx'
  import { candidatsStore } from '@/stores/scolarite/concours/candidatsStore'
  import { filiereStore } from '@/stores/scolarite/concours/filiereStore'
  
  // Props
  const props = defineProps({
    concoursId: {
      type: Number,
      required: true
    }
  })
  
  const importPreview = ref([])
  const currentPageImport = ref(1)
  const itemsPerPageImport = 10
  
  const startIndex = computed(() => (currentPageImport.value - 1) * itemsPerPageImport)
  
  const importPreviewPaginated = computed(() =>
    importPreview.value.slice(startIndex.value, startIndex.value + itemsPerPageImport)
  )
  
  const totalPagesImport = computed(() => Math.ceil(importPreview.value.length / itemsPerPageImport) || 1)
  
  const canPrevImport = computed(() => currentPageImport.value > 1)
  const canNextImport = computed(() => currentPageImport.value < totalPagesImport.value)
  
  function goPrevImport() {
    if (canPrevImport.value) currentPageImport.value--
  }
  function goNextImport() {
    if (canNextImport.value) currentPageImport.value++
  }
  
  const existingCandidats = computed(() => {
    return candidatsStore.getAll().filter(c => c.concours_id === props.concoursId)
  })
  
  const filieresCodes = computed(() => filiereStore.getAll().map(f => f.code))
  
  const erreursParLigne = computed(() => {
    const errs = {}
    importPreview.value.forEach((row, idx) => {
      const ligneErrs = []
  
      if (!row.nom || row.nom.trim() === '') ligneErrs.push('Le champ "Nom" est vide.')
      if (!row.prenom || row.prenom.trim() === '') ligneErrs.push('Le champ "Prénom" est vide.')
      if (!row.datenais || row.datenais.toString().trim() === '') ligneErrs.push('Le champ "Date Naissance" est vide.')
      if (!row.email || row.email.trim() === '') ligneErrs.push('Le champ "Email" est vide.')
      if (!row.filiere || row.filiere.trim() === '') {
        ligneErrs.push('Le champ "Filière" est vide.')
      } else if (!filieresCodes.value.includes(row.filiere)) {
        ligneErrs.push(`La filière "${row.filiere}" n'existe pas. Codes valides : ${filieresCodes.value.join(', ')}`)
      }
  
      if (ligneErrs.length) errs[idx] = ligneErrs
    })
    return errs
  })
  
  const messagesErreur = computed(() => {
    const messages = []
    Object.entries(erreursParLigne.value).forEach(([idx, arr]) => {
      const ligneNum = Number(idx) + 2
      arr.forEach(msg => messages.push(`Ligne ${ligneNum} : ${msg}`))
    })
    return messages
  })
  
  const importPreviewDuplicates = computed(() => importPreview.value.filter(r => r.isDuplicate))
  const importPreviewNonDuplicates = computed(() => importPreview.value.filter(r => !r.isDuplicate))
  const hasDuplicates = computed(() => importPreviewDuplicates.value.length > 0)
  
  let importModalInstance = null
  
  function openImportModal() {
    importPreview.value = []
    currentPageImport.value = 1
    nextTick(() => {
      const modalEl = document.getElementById('importModal')
      if (modalEl) {
        importModalInstance = new bootstrap.Modal(modalEl, {
          backdrop: 'static',
          keyboard: false,
        })
        importModalInstance.show()
      }
    })
  }
  
  function closeImportModal() {
    if (importModalInstance) {
      importModalInstance.hide()
      importModalInstance = null
    }
    importPreview.value = []
  
    nextTick(() => {
      const input = document.querySelector('#importModal input[type="file"]')
      if (input) input.value = ''
    })
  }
  
  const handleFileUpload = event => {
    const file = event.target.files[0]
    if (!file) return
  
    const reader = new FileReader()
  
    reader.onload = e => {
      const data = new Uint8Array(e.target.result)
      const workbook = XLSX.read(data, { type: 'array' })
      const worksheet = workbook.Sheets[workbook.SheetNames[0]]
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: '' })
  
      if (jsonData.length === 0) {
        alert('Aucun candidat trouvé dans le fichier.')
        return
      }
  
      jsonData.forEach(row => {
        row.isDuplicate = existingCandidats.value.some(
          c =>
            c.nom?.toLowerCase() === (row.nom || '').toLowerCase() &&
            c.prenom?.toLowerCase() === (row.prenom || '').toLowerCase() &&
            c.datenais === row.datenais
        )
      })
  
      importPreview.value = jsonData
      currentPageImport.value = 1
    }
  
    reader.readAsArrayBuffer(file)
  }
  
  const confirmImport = () => {
    if (importPreviewNonDuplicates.value.length === 0) {
      alert('Aucune donnée valide à importer (doublons exclus).')
      return
    }
    if (messagesErreur.value.length > 0) {
      alert('Veuillez corriger les erreurs avant d\'importer.')
      return
    }
  
    const filieresMap = {}
    filiereStore.getAll().forEach(f => {
      filieresMap[f.code] = f.id
    })
  
    importPreviewNonDuplicates.value.forEach(c => {
      const candidat = { ...c }
  
      if (c.filiere && filieresMap[c.filiere]) {
        candidat.filiere = filieresMap[c.filiere]
      } else {
        candidat.filiere = null
      }
  
      candidat.concours_id = props.concoursId
  
      candidatsStore.add(candidat)
    })
  
    alert(`${importPreviewNonDuplicates.value.length} candidat(s) importé(s) avec succès.`)
    closeImportModal()
    emit('imported')
  }
  
  const emit = defineEmits(['imported'])
  
  defineExpose({
    openImportModal
  })
  </script>
  