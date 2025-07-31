<template>
  <div class="row">
    <div class="col-md-12 grid-margin">
      <div class="d-flex justify-content-between flex-wrap">
        <div class="d-flex align-items-end flex-wrap">
          <div class="me-md-3 me-xl-5">
            <h3>Statistiques détaillées</h3>
            <p>Analyse des résultats du concours</p>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-end mb-2">
        <button class="btn btn-outline-dark me-2" @click="refreshStats">
        Actualiser les statistiques
      </button>
      <button class="btn btn-outline-dark me-2" @click="exportToExcel">
        Exporter en Excel
      </button>
    </div>
      <div v-if="statsData" class="mt-3">
        <table class="table table-bordered table-striped mb-5">
          <thead>
            <tr>
              <th>Total candidats</th>
              <th>Hommes</th>
              <th>Femmes</th>
              <th>Nombre d'épreuves</th>
              <th>Notes saisies</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ statsData.total_candidats }}</td>
              <td>{{ statsData.candidats_homme }}</td>
              <td>{{ statsData.candidats_femme }}</td>
              <td>{{ statsData.total_epreuves }}</td>
              <td>{{ statsData.notes_saisies }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th colspan="5" class="text-center">
                Statistiques au {{ new Date().toLocaleDateString() }}
              </th>
            </tr>
          </tfoot>
        </table>
      </div>
      <div v-if="statsData?.notes_epreuves?.length">
        <h4 class="mb-3">Epreuves et Notes</h4>
        <table class="table table-bordered table-striped mb-5">
          <thead>
            <tr>
              <th>Épreuve</th>
              <th>Notes enregistrées</th>
              <th>Notes attendues</th>
              <th>Progression</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="epreuve in statsData.notes_epreuves" :key="epreuve.epreuve_id">
              <td>{{ epreuve.intitule }}</td>
              <td>{{ epreuve.notes_enregistrees }}</td>
              <td>{{ epreuve.notes_attendues }}</td>
              <td>
                {{ calculatePercentage(epreuve) }}%
                <div class="progress mt-1">
                  <div
                    role="progressbar"
                    :style="{ width: calculatePercentage(epreuve) + '%' }"
                    :aria-valuenow="calculatePercentage(epreuve)"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th colspan="4" class="text-center">Fin des données par épreuve</th>
            </tr>
          </tfoot>
        </table>
      </div>
      <div></div>
    </div>
  </div>
</template>

<script setup>
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useConcourStore } from '@/stores/gestionStores/concourStore';

const route = useRoute();
const concourStore = useConcourStore();

const loading = ref(false);
const errorMessage = ref(null);
const statsData = ref(null);

// Calcul du pourcentage de complétion
const calculatePercentage = (epreuve) => {
  if (!epreuve.notes_attendues || epreuve.notes_attendues === 0) return 0;
  return Math.round((epreuve.notes_enregistrees / epreuve.notes_attendues) * 100);
};

// Charger les statistiques
const loadStats = async () => {
  loading.value = true;
  errorMessage.value = null;
  try {
    await concourStore.fetchStatsConcours(route.params.id);
    statsData.value = concourStore.statistiques[0]; // Prend le premier élément du tableau
  } catch (error) {
    errorMessage.value = 'Erreur lors du chargement des statistiques';
    console.error(error);
  } finally {
    loading.value = false;
  }
};


// Export Excel
const exportToExcel = () => {
  const generalStats = [
    ['Statistique', 'Valeur'],
    ['Total Candidats', statsData.value.total_candidats],
    ['Hommes', statsData.value.candidats_homme],
    ['Femmes', statsData.value.candidats_femme],
    ['Total Épreuves', statsData.value.total_epreuves],
    ['Notes Saisies', statsData.value.notes_saisies]
  ]

  const epreuvesStats = [
    ['Épreuve', 'Notes enregistrées', 'Notes attendues', 'Pourcentage'],
    ...statsData.value.notes_epreuves.map(e => [
      e.intitule,
      e.notes_enregistrees,
      e.notes_attendues,
      `${calculatePercentage(e)}%`
    ])
  ]

  const wb = XLSX.utils.book_new()
  const ws1 = XLSX.utils.aoa_to_sheet(generalStats)
  const ws2 = XLSX.utils.aoa_to_sheet(epreuvesStats)

  XLSX.utils.book_append_sheet(wb, ws1, 'Statistiques Générales')
  XLSX.utils.book_append_sheet(wb, ws2, 'Par Épreuve')

  const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
  saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'statistiques_concours.xlsx')
}

// Actualiser les stats
const refreshStats = () => {
  loadStats();
};

// Charger au montage
onMounted(() => {
  loadStats();
});
</script>

<style scoped>
.stats-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

h2 {
  color: #2c3e50;
  margin-bottom: 30px;
  text-align: center;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.stat-card h3 {
  margin-top: 0;
  color: #555;
}

.stat-value {
  font-size: 2.5rem;
  font-weight: bold;
  color: #3498db;
  margin: 10px 0;
}

.stat-details {
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
}

.male {
  color: #2980b9;
}

.female {
  color: #e91e63;
}

.epreuves-section {
  margin-top: 30px;
}

.epreuves-section h3 {
  color: #2c3e50;
  margin-bottom: 20px;
}

.progress-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.progress-card {
  background: #fff;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.progress-card h4 {
  margin-top: 0;
  color: #555;
}

.progress-container {
  margin-top: 10px;
}

.progress-bar {
  height: 20px;
  background: #ecf0f1;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 5px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #3498db, #2ecc71);
  transition: width 0.5s ease;
}

.progress-text {
  font-size: 0.9rem;
  color: #7f8c8d;
}

.loading {
  text-align: center;
  padding: 20px;
  color: #7f8c8d;
}

.error-message {
  color: #e74c3c;
  background: #fdecea;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;
  text-align: center;
}

.refresh-button {
  display: block;
  margin: 30px auto 0;
  padding: 10px 20px;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
}

.refresh-button:hover {
  background: #2980b9;
}
</style>
