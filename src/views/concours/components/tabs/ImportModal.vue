<template>
  <div class="modal-backdrop">
    <div class="modal fade show d-block">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title">Importer les notes</h5>
            <button type="button" class="btn-close btn-close-white" @click="$emit('close')"></button>
          </div>
          <div class="modal-body">
            <div class="mb-4">
              <label for="fileInput" class="form-label">Sélectionnez un fichier Excel/CSV</label>
              <input 
                id="fileInput"
                type="file" 
                class="form-control" 
                accept=".xlsx, .xls, .csv" 
                @change="handleFile"
              >
              <div class="form-text">Le fichier doit contenir les colonnes : ID Candidat, ID Epreuve, Note</div>
            </div>

            <div v-if="isLoading" class="text-center py-4">
              <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Chargement...</span>
              </div>
              <p class="mt-2">Importation en cours...</p>
            </div>

            <div v-if="notesData.length > 0" class="notes-table-container">
              <h6>Notes à importer ({{ notesData.length }} au total)</h6>
              <div class="table-responsive">
                <table class="table table-striped table-hover table-sm">
                  <thead>
                    <tr>
                      <th>ID Candidat</th>
                      <th>ID Épreuve</th>
                      <th>Note</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, idx) in notesData" :key="idx">
                      <td>{{ item.candidatId }}</td>
                      <td>{{ item.epreuveId }}</td>
                      <td>{{ item.note }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-outline-secondary" @click="$emit('close')">Annuler</button>
            <button 
              class="btn btn-primary" 
              :disabled="!notesData.length || isLoading"
              @click="submitNotes"
            >
              <span v-if="isLoading" class="spinner-border spinner-border-sm me-1" role="status"></span>
              {{ isLoading ? 'Importation...' : 'Importer' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import * as XLSX from 'xlsx';
import { useConcourStore } from '@/stores/gestionStores/concourStore';

const emit = defineEmits(['close', 'imported']);
const concourStore = useConcourStore();
const notesData = ref([]);
const isLoading = ref(false);
const concoursId = concourStore.concoursDetail?.id;

const normalizeKey = (key) => key?.toString().trim().toLowerCase();

const handleFile = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  const isCSV = file.name.endsWith('.csv');

  reader.onload = (e) => {
    try {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: isCSV ? 'string' : 'binary' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(sheet, { defval: '' });

      // Debug log : voir structure réelle des données
      console.log('Données importées :', rows);

      notesData.value = rows
        .map((row) => {
          const keys = Object.keys(row).reduce((acc, key) => {
            acc[normalizeKey(key)] = row[key];
            return acc;
          }, {});

          return {
            candidatId: keys['id candidat'] || keys['id_candidat'] || keys['candidat'],
            epreuveId: keys['id epreuve'] || keys['id_epreuve'] || keys['epreuve'],
            note: parseFloat(keys['note']) || 0,
          };
        })
        .filter((item) => item.candidatId && item.epreuveId);
    } catch (err) {
      console.error('Erreur de lecture du fichier', err);
      alert('Fichier invalide. Vérifiez le contenu ou le format.');
    }
  };

  // Adapté pour CSV ou Excel
  isCSV ? reader.readAsText(file) : reader.readAsBinaryString(file);
};

const submitNotes = async () => {
  if (!notesData.value.length) return;
  
  isLoading.value = true;
  try {
    await concourStore.importNotes(concoursId, notesData.value);
    emit('imported');
    emit('close');
  } catch (e) {
    console.error('Erreur importation', e);
    alert('Erreur lors de l\'import des notes : ' + (e.message || 'Veuillez réessayer.'));
  } finally {
    isLoading.value = false;
  }
};
</script>


<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1040;
}

.modal {
  z-index: 1050;
}

.modal-content {
  border: none;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.notes-table-container {
  max-height: 400px;
  overflow-y: auto;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  padding: 10px;
}

.table {
  margin-bottom: 0;
}

.table thead th {
  position: sticky;
  top: 0;
  background-color: #f8f9fa;
  z-index: 10;
}

.form-text {
  font-size: 0.85rem;
  color: #6c757d;
}
</style>