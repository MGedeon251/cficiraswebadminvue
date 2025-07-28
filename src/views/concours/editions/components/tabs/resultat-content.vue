<template>
  <div>
    <div class="row">
      <div class="col-md-12 grid-margin">
        <div class="d-flex justify-content-between flex-wrap">
          <div class="d-flex align-items-end flex-wrap">
            <div class="me-md-3 me-xl-5">
              <h3 v-if="concours">Résultats - {{ concours.designation }}</h3>
              <p>Gestion des notes et statistiques</p>
            </div>
          </div>
          <div class="d-flex align-items-end flex-wrap">
            <button class="btn btn-primary me-2" @click="showImportModal = true">
              <i class="mdi mdi-upload me-1"></i> Importer notes
            </button>
            <button class="btn btn-success me-2" @click="handleCalculate">
              <i class="mdi mdi-calculator me-1"></i> Calculer moyennes
            </button>
            <button class="btn btn-info me-2" @click="showStatsModal = true">
              <i class="mdi mdi-chart-bar me-1"></i> Statistiques
            </button>
            <div class="dropdown">
              <button class="btn btn-sm btn-outline-secondary" data-bs-toggle="dropdown">
                <i class="mdi mdi-dots-vertical"></i>
              </button>
              <ul class="dropdown-menu dropdown-menu-end">
                <li>
                  <a class="dropdown-item" href="#" @click="exportToExcel"
                    ><i class="mdi mdi-file-excel me-2"></i>Exporter Excel</a
                  >
                </li>
                <li>
                  <a class="dropdown-item" href="#" @click="window.print()"
                    ><i class="mdi mdi-printer me-2"></i>Imprimer</a
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Tableau des résultats -->
    <div class="table-responsive">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Candidat</th>
            <th v-for="epreuve in epreuves" :key="epreuve.id">{{ epreuve.designation }}</th>
            <th>Moyenne</th>
            <th>Rang</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(resultat, index) in resultatsTransformes" :key="resultat.candidat.id">
            <td>{{ index + 1 }}</td>
            <td>{{ resultat.candidat.nom }} {{ resultat.candidat.prenom }}</td>
            <td v-for="epreuve in epreuves" :key="epreuve.id">
              <input
                type="number"
                class="form-control form-control-sm"
                v-model.number="resultat.notes[epreuve.id]"
                min="0"
                max="20"
                step="0.01"
                @change="saveNote(resultat.candidat.id, epreuve.id, resultat.notes[epreuve.id])"
              />
            </td>
            <td>{{ resultat.moyenne || '-' }}</td>
            <td>{{ resultat.rang || '-' }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modals -->
    <ImportModal
      v-if="showImportModal"
      @close="showImportModal = false"
      @imported="handleImportedNotes"
    />
    <StatsModal v-model:open="showStatsModal" :concoursId="concoursId" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useConcourStore } from '@/stores/gestionStores/concourStore';
import { useNotifier } from '@/stores/messages/useNotifier';
import * as XLSX from 'xlsx';

import ImportModal from './ImportModal.vue';
import StatsModal from './StatsModal.vue';

const route = useRoute();
const concoursId = route.params.id;
const concourStore = useConcourStore();
const { notifySuccess, notifyError } = useNotifier();

const concours = computed(() => concourStore.concoursDetail);
const epreuves = computed(() => concourStore.epreuves);
const resultatsRaw = computed(() => concourStore.resultats); // structure JSON brute du backend

// ✅ Transformer les résultats pour correspondre au format du tableau
const resultatsTransformes = computed(() => {
  return resultatsRaw.value.map((res) => {
    const notes = {};
    res.epreuves_notes.forEach((ep) => {
      notes[ep.epreuve_id] = ep.note;
    });
    return {
      candidat: {
        id: res.candidat_id,
        nom: res.nom,
        prenom: res.prenom,
        matricule: res.matricule,
      },
      notes,
      moyenne: res.moyenne,
      rang: res.rang,
    };
  });
});

const showImportModal = ref(false);
const showStatsModal = ref(false);

const loadResultats = async () => {
  await concourStore.fetchConcoursById(concoursId);
  await concourStore.fetchEpreuvesConcours(concoursId);
  await concourStore.fetchResultatsConcours(concoursId);
  await concourStore.fetchStatistiqueConcoursGlobal(concoursId);
};

onMounted(() => {
  loadResultats();
});

// ✅ Enregistrement d'une note
const saveNote = async (candidatId, epreuveId, note) => {
  try {
    await concourStore.updateNote({ candidatId, epreuveId, note });
    notifySuccess('Note mise à jour');
  } catch (err) {
    notifyError('Erreur lors de la mise à jour de la note');
  }
};

// ✅ Calcul des moyennes/rangs
const handleCalculate = async () => {
  try {
    await concourStore.calculerResultatConcour(concoursId);
    notifySuccess('Moyennes et rangs calculés');
    await concourStore.fetchResultatsConcours(concoursId); // Refresh
  } catch (e) {
    notifyError('Erreur lors du calcul des moyennes');
  }
};

// ✅ Export Excel
const exportToExcel = () => {
  const data = resultatsTransformes.value.map((res) => {
    const row = {
      Nom: res.candidat.nom,
      Prénom: res.candidat.prenom,
    };
    epreuves.value.forEach((e) => {
      row[e.designation] = res.notes[e.id] ?? '-';
    });
    row['Moyenne'] = res.moyenne?.toFixed(2) ?? '-';
    row['Rang'] = res.rang ?? '-';
    return row;
  });
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Résultats');
  XLSX.writeFile(wb, `resultats_concours_${concoursId}.xlsx`);
};

// ✅ Après importation
const handleImportedNotes = async () => {
  showImportModal.value = false;
  await concourStore.fetchResultatsConcours(concoursId);
  notifySuccess('Notes importées avec succès');
};
</script>

<style scoped>
.table-responsive {
  max-height: 600px;
  overflow-y: auto;
}
input.form-control-sm {
  max-width: 80px;
  display: inline-block;
}
</style>
