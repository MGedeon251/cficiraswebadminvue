<template>
  <div class="modal-backdrop show">
    <div class="modal fade show d-block" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Importer les notes</h5>
            <button type="button" class="btn-close" @click="$emit('close')"></button>
          </div>
          <div class="modal-body">
            <input type="file" class="form-control" accept=".xlsx, .xls, .csv" @change="handleFile">
            <div class="mt-3" v-if="preview.length">
              <h6>Aperçu :</h6>
              <ul>
                <li v-for="(item, idx) in preview.slice(0, 5)" :key="idx">
                  Candidat: {{ item.candidatId }}, Épreuve: {{ item.epreuveId }}, Note: {{ item.note }}
                </li>
              </ul>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" @click="$emit('close')">Annuler</button>
            <button class="btn btn-primary" :disabled="!preview.length" @click="submitNotes">Importer</button>
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
const preview = ref([]);
const concoursId = concourStore.concoursDetail?.id;

const handleFile = (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = (e) => {
    const workbook = XLSX.read(e.target.result, { type: 'binary' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet);
    preview.value = rows.map(row => ({
      candidatId: row['ID Candidat'],
      epreuveId: row['ID Epreuve'],
      note: parseFloat(row['Note']),
    }));
  };
  reader.readAsBinaryString(file);
};

const submitNotes = async () => {
  try {
    await concourStore.importNotes(concoursId, preview.value); // Appel à la méthode d'importation des notes du store
    emit('imported');
    emit('close');
  } catch (e) {
    console.error('Erreur importation', e);
    alert('Erreur lors de l’import des notes.');
  }
};
</script>

<style scoped>
.modal-backdrop {
  z-index: 1040;
  background-color: rgb(0, 0, 0);
}
.modal {
  z-index: 1050;
}
</style>
