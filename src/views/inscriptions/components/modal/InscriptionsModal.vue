<template>
  <div
    class="modal fade"
    id="importInscriptionsModal"
    tabindex="-1"
    ref="modalRef"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content shadow-lg border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title">
            <i class="bi bi-file-earmark-excel me-2"></i>Importer des inscriptions
          </h5>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
        </div>

        <div class="modal-body">
          <div class="alert alert-light border-start border-4 border-info shadow-sm mb-4">
            <h6 class="fw-bold text-info">Recommandations :</h6>
            <ul class="small mb-0">
              <li>Format requis : <strong>.csv</strong> ou <strong>.xlsx</strong>.</li>
              <li>Utilisez exactement les colonnes du modèle pour éviter les rejets.</li>
              <li>L'<strong>année académique</strong> doit être active dans le système.</li>
            </ul>
          </div>

          <div class="mb-3">
            <label class="form-label fw-semibold">Sélectionner le fichier</label>
            <input
              type="file"
              class="form-control"
              accept=".xlsx,.xls,.csv"
              @change="handleFileUpload"
              :disabled="inscriptionStore.importing"
            />
          </div>

          <div v-if="previewData.length" class="mt-4 animate__animated animate__fadeIn">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <h6 class="mb-0 fw-bold">Aperçu (5 premières lignes) :</h6>
              <span class="badge bg-secondary">{{ previewData.length }} lignes détectées</span>
            </div>
            <div class="table-responsive border rounded">
              <table class="table table-sm table-hover mb-0" style="font-size: 0.85rem;">
                <thead class="table-light">
                  <tr>
                    <th>Matricule</th>
                    <th>Nom & Prénom</th>
                    <th>Sexe</th>
                    <th>Classe</th>
                    <th>Année</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(row, index) in previewData.slice(0, 5)" :key="index">
                    <td><code class="text-primary">{{ row.matricule }}</code></td>
                    <td>{{ row.nom }} {{ row.prenom }}</td>
                    <td>{{ row.sexe }}</td>
                    <td>{{ row.code_classe }}</td>
                    <td>{{ row.annee_academique }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="modal-footer bg-light">
          <button type="button" class="btn btn-link text-decoration-none me-auto" @click="downloadTemplate">
            <i class="bi bi-download me-1"></i> Télécharger modèle
          </button>
          
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" :disabled="inscriptionStore.importing">
            Annuler
          </button>
          
          <button
            type="button"
            class="btn btn-primary px-4"
            :disabled="!selectedFile || inscriptionStore.importing"
            @click="confirmImport"
          >
            <span v-if="inscriptionStore.importing" class="spinner-border spinner-border-sm me-2"></span>
            <i v-else class="bi bi-check-circle me-1"></i>
            {{ inscriptionStore.importing ? 'Importation...' : 'Lancer l\'importation' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import * as XLSX from 'xlsx';
import { ref } from 'vue';
import { useInscriptionStore } from '@/stores/academiqueStore/inscriptionStore'; // Ton store Pinia

const inscriptionStore = useInscriptionStore();
const previewData = ref([]);
const selectedFile = ref(null);
const modalRef = ref(null);

// Propriété de la classe sélectionnée (Passée par le parent ou via une ref globale)
const props = defineProps({
  classe: { type: Object, required: true }
});

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  selectedFile.value = file; // On garde le fichier brut pour l'upload

  // Lecture pour l'aperçu UI uniquement
  const reader = new FileReader();
  reader.onload = (e) => {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: 'array' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: '' });

    previewData.value = jsonData;
  };
  reader.readAsArrayBuffer(file);
};

const confirmImport = async () => {
  if (!selectedFile.value) return;

  try {
    // Appel de l'action du store Pinia
    await inscriptionStore.uploadInscriptions(props.classe, selectedFile.value);
    
    // Si succès, on réinitialise et on ferme le modal via Bootstrap
    previewData.value = [];
    selectedFile.value = null;
    
    const modalElement = document.getElementById('importInscriptionsModal');
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    if (modalInstance) modalInstance.hide();

  } catch (error) {
    // L'erreur est déjà gérée par le notifyError du store
    console.error("Échec de l'import :", error);
  }
};

const downloadTemplate = () => {
  const headers = [
    'matricule', 'nom', 'prenom', 'sexe', 'date_naissance', 
    'lieu_naissance', 'telephone', 'email', 'ville', 
    'filiere', 'code_classe', 'annee_academique'
  ];
  const sampleRow = [
    'ETU001', 'NOM', 'PRENOM', 'M', '2000-01-01', 
    'VILLE', '00000000', 'test@example.com', 'VILLE', 
    'FILIERE_CODE', props.classe.classe_code, '2024-2025'
  ];
  
  const worksheet = XLSX.utils.aoa_to_sheet([headers, sampleRow]);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Modèle');
  XLSX.writeFile(workbook, `Template_Import_${props.classe.classe_code}.xlsx`);
};
</script>