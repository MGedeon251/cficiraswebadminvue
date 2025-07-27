<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useNotifier } from '@/stores/messages/useNotifier';
import { extractErrorMessage } from '@/stores/messages/useErrorMessage';
import { useEpreuvesStore } from '@/stores/scolarite/concours/epreuvesStore';
import * as XLSX from 'xlsx';

const router = useRouter();
const { notifySuccess, notifyError } = useNotifier();
const epreuvesStore = useEpreuvesStore();

const concoursId = router.currentRoute.value.params.id;
const epreuves = ref([]);
const fileInput = ref(null);
const showImportModal = ref(false);
const importedPreview = ref([]);
const existingCodes = ref([]);

const formatDuree = (start, end) => {
  const debut = new Date(`1970-01-01T${start}`);
  const fin = new Date(`1970-01-01T${end}`);
  const diff = (fin - debut) / (1000 * 60);
  const h = Math.floor(diff / 60);
  const m = diff % 60;
  return `${h}H${m.toString().padStart(2, '0')}`;
};

onMounted(() => {
  if (concoursId) {
    epreuves.value = epreuvesStore.getEpreuvesByConcoursId(concoursId);
  }
});

const codeExiste = (code) => {
  return epreuves.value.some(e => e.code.trim().toLowerCase() === code.trim().toLowerCase());
};

const addEpreuve = () => {
  epreuves.value.push({
    id: null,
    concours_id: concoursId,
    code: '', // Laisse vide au début
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
  if (!confirm("Voulez-vous vraiment supprimer cette épreuve ?")) return;
  const epreuve = epreuves.value[index];
  if (epreuve.id) {
    epreuvesStore.removeEpreuveById(epreuve.id);
  }
  epreuves.value.splice(index, 1);
};

const validateEpreuve = (epreuve) => {
  if (!epreuve.code || !epreuve.designation) return 'Code et intitulé requis';
  if (!epreuve.heure_debut || !epreuve.heure_fin) return 'Heures requises';
  if (epreuve.heure_debut >= epreuve.heure_fin) return 'Heure fin doit être après début';
  if (!epreuve.coefficient || epreuve.coefficient <= 0) return 'Coefficient invalide';

  // 🟡 Vérification du chevauchement
  const start1 = new Date(`1970-01-01T${epreuve.heure_debut}`);
  const end1 = new Date(`1970-01-01T${epreuve.heure_fin}`);

  const chevauchement = epreuves.value.some(e => {
    if (e.id === epreuve.id) return false; // Ignorer l'épreuve elle-même
    const start2 = new Date(`1970-01-01T${e.heure_debut}`);
    const end2 = new Date(`1970-01-01T${e.heure_fin}`);

    // Si les plages horaires se croisent
    return start1 < end2 && start2 < end1;
  });

  if (chevauchement) return 'Une autre épreuve se déroule déjà à cet horaire.';

  // 🔄 Vérifier si le code existe déjà (mais seulement pour les nouvelles épreuves)
  if (!epreuve.id && epreuves.value.filter(e => e.code.trim().toLowerCase() === epreuve.code.trim().toLowerCase()).length > 1) {
    return 'Code déjà utilisé';
  }

  return null;
};

const saveEpreuve = (epreuve) => {
  const error = validateEpreuve(epreuve);
  if (error) return notifyError(error);
  epreuvesStore.addOrUpdateEpreuve(epreuve);
  epreuves.value = epreuvesStore.getEpreuvesByConcoursId(concoursId);
  notifySuccess('Épreuve enregistrée');
};

const exportEpreuves = () => {
  const data = epreuves.value.map(e => ({
    Code: e.code,
    Intitulé: e.designation,
    Coefficient: e.coefficient,
    'Heure début': e.heure_debut,
    'Heure fin': e.heure_fin,
    Durée: formatDuree(e.heure_debut, e.heure_fin),
    Type: e.type_epreuve,
  }));
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Epreuves');
  XLSX.writeFile(wb, 'epreuves.xlsx');
};

const importEpreuves = (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = (e) => {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: 'array' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const json = XLSX.utils.sheet_to_json(sheet);

    const preview = [];
    const duplicates = [];

    json.forEach((row, index) => {
      if (row.Code && row.Intitulé) {
        const newEpreuve = {
          id: null,
          concours_id: concoursId,
          code: row.Code,
          designation: row.Intitulé,
          coefficient: row.Coefficient || 1,
          heure_debut: row['Heure début'] || '',
          heure_fin: row['Heure fin'] || '',
          type_epreuve: row.Type || 'écrit',
          ordre: epreuves.value.length + index + 1,
          description: 'N/A'
        };

        if (codeExiste(newEpreuve.code)) {
          duplicates.push(newEpreuve);
        } else {
          preview.push(newEpreuve);
        }
      }
    });

    if (duplicates.length > 0) {
      notifyError(`Certains codes existent déjà et seront ignorés.`);
    }

    importedPreview.value = [...preview];
    existingCodes.value = [...duplicates];
    showImportModal.value = true;
  };
  reader.readAsArrayBuffer(file);
};

const confirmImport = () => {
  if (importedPreview.value.length > 0) {
    importedPreview.value.forEach(ep => {
      epreuvesStore.addOrUpdateEpreuve(ep);
    });
    notifySuccess('Importation effectuée avec succès.');
  }
  if (existingCodes.value.length > 0) {
    notifyError(`${existingCodes.value.length} épreuve(s) déjà existante(s) ont été ignorées.`);
  }

  epreuves.value = epreuvesStore.getEpreuvesByConcoursId(concoursId);
  importedPreview.value = [];
  existingCodes.value = [];
  showImportModal.value = false;
};

const cancelImport = () => {
  importedPreview.value = [];
  existingCodes.value = [];
  showImportModal.value = false;
};
</script>


<template>
  <div class="row">
    <div class="col-md-12 grid-margin">
      <h3 v-if="epreuves.length">Épreuves - Concours {{ concoursId }}</h3>
      <p>Détails sur les épreuves</p>

      <div class="d-flex gap-2 mb-3">
        <button class="btn btn-outline-primary" @click="addEpreuve">
          + Ajouter une épreuve
        </button>
        <button class="btn btn-success" @click="exportEpreuves">
          Exporter Excel
        </button>
        <label class="btn btn-info text-white">
          Importer Excel
          <input type="file" ref="fileInput" class="d-none" accept=".xlsx" @change="importEpreuves" />
        </label>
      </div>

      <div class="table-responsive mt-3">
        <table class="table table-hover align-middle">
          <thead class="table-light">
            <tr>
              <th style="min-width: 120px;">Code</th>
              <th style="min-width: 200px;">Intitulé</th>
              <th>Coefficient</th>
              <th>Heure début</th>
              <th>Heure fin</th>
              <th>Durée</th>
              <th style="min-width: 160px;">Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(epreuve, index) in epreuves" :key="epreuve.id || index">
              <td>
                <input
                  v-model="epreuve.code"
                  type="text"
                  class="form-control"
                  placeholder="EX01"
                  :disabled="epreuve.id"
                />
              </td>
              <td>
                <input
                  v-model="epreuve.designation"
                  type="text"
                  class="form-control"
                  placeholder="Mathématiques"
                  :disabled="epreuve.id"
                />
              </td>
              <td>
                <input
                  v-model.number="epreuve.coefficient"
                  type="number"
                  class="form-control"
                  min="1"
                  :disabled="epreuve.id"
                />
              </td>
              <td>
                <input
                  v-model="epreuve.heure_debut"
                  type="time"
                  class="form-control"
                  :disabled="epreuve.id"
                />
              </td>
              <td>
                <input
                  v-model="epreuve.heure_fin"
                  type="time"
                  class="form-control"
                  :disabled="epreuve.id"
                />
              </td>
              <td>
                <span v-if="epreuve.heure_debut && epreuve.heure_fin && epreuve.heure_fin > epreuve.heure_debut">
                  {{ formatDuree(epreuve.heure_debut, epreuve.heure_fin) }}
                </span>
                <span v-else class="text-muted">N/A</span>
              </td>
              <td>
                <select
                  v-model="epreuve.type_epreuve"
                  class="form-select"
                  :disabled="epreuve.id"
                >
                  <option value="écrit">Écrit</option>
                  <option value="oral">Oral</option>
                  <option value="pratique">Pratique</option>
                </select>
              </td>
              <td>
                <button
                  class="btn btn-sm me-1"
                  @click="saveEpreuve(epreuve)"
                  v-if="!epreuve.id"
                >
                  <i class="mdi mdi-content-save"></i>
                </button>
                <button class="btn btn-sm btn-danger" @click="removeEpreuve(index)">
                  <i class="mdi mdi-delete"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

<!-- Modal d'importation corrigé -->
<div v-if="showImportModal" class="custom-import-modal-overlay">
  <div class="modal d-block" tabindex="-1">
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content bg-white shadow-lg rounded">
        <div class="modal-header">
          <h5 class="modal-title">Aperçu des épreuves importées</h5>
          <button type="button" class="btn-close" @click="cancelImport"></button>
        </div>
        <div class="modal-body">
          <table class="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Code</th>
                <th>Intitulé</th>
                <th>Coefficient</th>
                <th>Heure début</th>
                <th>Heure fin</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(ep, i) in importedPreview" :key="i">
                <td>{{ ep.code }}</td>
                <td>{{ ep.designation }}</td>
                <td>{{ ep.coefficient }}</td>
                <td>{{ ep.heure_debut }}</td>
                <td>{{ ep.heure_fin }}</td>
                <td>{{ ep.type_epreuve }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" @click="cancelImport">Annuler</button>
          <button class="btn btn-primary" @click="confirmImport">Confirmer l'importation</button>
        </div>
      </div>
    </div>
  </div>
</div>

</template>

<style scoped>
tr.disabled-row {
  opacity: 0.6;
  pointer-events: none;
}
.custom-import-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3); /* fond semi-transparent */
  z-index: 1050;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: none; /* supprime le flou */
}

.modal-content {
  background-color: #ffffff;
  border-radius: 8px;
  max-height: 90vh;
  overflow-y: auto;
}

</style>
