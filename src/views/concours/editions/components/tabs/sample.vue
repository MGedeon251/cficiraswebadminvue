<template>
  <div class="modal-backdrop">
    <div class="modal fade show d-block">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header bg-success text-white">
            <h5 class="modal-title">Importer les candidats</h5>
            <button
              type="button"
              class="btn-close btn-close-white"
              @click="$emit('close')"
            ></button>
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
              />
              <div class="form-text">
                Le fichier doit contenir les colonnes : nom, prénom, sexe, datenais, lieunais, tel,
                email, adresse, ville, pays, filiere.
              </div>
            </div>

            <!-- Affichage du chargement -->
            <div v-if="isLoading" class="text-center py-4">
              <div class="spinner-border text-success" role="status">
                <span class="visually-hidden">Chargement...</span>
              </div>
              <p class="mt-2">Importation en cours...</p>
            </div>

            <!-- Tableau de prévisualisation -->
            <div v-if="candidatsData.length" class="table-responsive">
              <h6>{{ candidatsData.length }} candidat(s) détecté(s)</h6>
              <table class="table table-bordered table-sm table-hover">
                <thead class="table-light">
                  <tr>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Sexe</th>
                    <th>Date Naissance</th>
                    <th>Ville</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(cand, idx) in candidatsData" :key="idx">
                    <td>{{ cand.nom }}</td>
                    <td>{{ cand.prenom }}</td>
                    <td>{{ cand.sexe }}</td>
                    <td>{{ cand.datenais }}</td>
                    <td>{{ cand.ville }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="modal-footer">
            <button class="btn btn-outline-secondary" @click="$emit('close')">Annuler</button>
            <button
              class="btn btn-success"
              :disabled="!rawFile || isLoading"
              @click="submitCandidats"
            >
              <span v-if="isLoading" class="spinner-border spinner-border-sm me-1"></span>
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
import { useRoute } from 'vue-router';
import * as XLSX from 'xlsx';
import { useCandidatStore } from '@/stores/gestionStores/candidatStore';

const emit = defineEmits(['close', 'imported']);
const candidatStore = useCandidatStore();

const rawFile = ref(null); // Fichier brut à envoyer
const candidatsData = ref([]); // Données lues pour l'affichage
const isLoading = ref(false);

const route = useRoute();
const concoursId = route.params.id;

// Fonction pour formater une date au format yyyy-mm-dd
const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return isNaN(date) ? '' : date.toISOString().split('T')[0];
};

// Lecture du fichier et extraction des données
const handleFile = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  rawFile.value = file;

  const reader = new FileReader();
  const isCSV = file.name.endsWith('.csv');

  reader.onload = (e) => {
    try {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: isCSV ? 'string' : 'binary' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(sheet, { defval: '' });

      // Normalisation des colonnes
      candidatsData.value = rows
        .map((row) => {
          const keys = Object.keys(row).reduce((acc, key) => {
            acc[key.trim().toLowerCase()] = row[key];
            return acc;
          }, {});

          return {
            nom: keys['nom'] || '',
            prenom: keys['prénom'] || keys['prenom'] || '',
            sexe: keys['sexe'] || '',
            datenais: formatDate(keys['datenais'] || keys['date naissance']),
            lieunais: keys['lieunais'] || keys['lieu naissance'] || '',
            tel: keys['tel'] || keys['téléphone'] || '',
            email: keys['email'] || '',
            adresse: keys['adresse'] || '',
            ville: keys['ville'] || '',
            pays: keys['pays'] || '',
            filiere: keys['filiere'] || '',
          };
        })
        .filter((c) => c.nom && c.prenom && c.datenais);
    } catch (err) {
      console.error('Erreur de lecture du fichier:', err);
      alert('Fichier invalide ou colonnes manquantes.');
    }
  };

  isCSV ? reader.readAsText(file) : reader.readAsBinaryString(file);
};

// Envoi du fichier brut au backend
const submitCandidats = async () => {
  if (!rawFile.value || !concoursId) return;

  isLoading.value = true;
  try {
    await candidatStore.importCandidats(rawFile.value, concoursId); // ✅ Bon ordre ici
    emit('imported');
    emit('close');
  } catch (err) {
    console.error("Erreur lors de l'importation:", err);
    alert('Échec de l’import. Vérifiez le fichier et réessayez.');
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
.table thead th {
  position: sticky;
  top: 0;
  background-color: #f8f9fa;
}
</style>
