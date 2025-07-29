<template>
  <div class="stats-container">
    <h2>Statistiques du Concours</h2>

    <!-- Chargement -->
    <div v-if="loading" class="loading">
      <p>Chargement des statistiques...</p>
    </div>

    <!-- Erreur -->
    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>

    <!-- Statistiques principales -->
    <div v-if="statsData" class="stats-grid">
      <div class="stat-card">
        <h3>Candidats</h3>
        <div class="stat-value">{{ statsData.total_candidats }}</div>
        <div class="stat-details">
          <span class="male">Hommes: {{ statsData.candidats_homme }}</span>
          <span class="female">Femmes: {{ statsData.candidats_femme }}</span>
        </div>
      </div>

      <div class="stat-card">
        <h3>Épreuves</h3>
        <div class="stat-value">{{ statsData.total_epreuves }}</div>
      </div>

      <div class="stat-card">
        <h3>Notes saisies</h3>
        <div class="stat-value">{{ statsData.notes_saisies }}</div>
      </div>
    </div>

    <!-- Détails des épreuves -->
    <div v-if="statsData?.notes_epreuves?.length" class="epreuves-section">
      <h3>Avancement par épreuve</h3>
      <div class="progress-grid">
        <div
          v-for="epreuve in statsData.notes_epreuves"
          :key="epreuve.epreuve_id"
          class="progress-card"
        >
          <h4>{{ epreuve.intitule }}</h4>
          <div class="progress-container">
            <div class="progress-bar">
              <div
                class="progress-fill"
                :style="{ width: calculatePercentage(epreuve) + '%' }"
              ></div>
            </div>
            <span class="progress-text">
              {{ epreuve.notes_enregistrees }} / {{ epreuve.notes_attendues }} ({{
                calculatePercentage(epreuve)
              }}%)
            </span>
          </div>
        </div>
      </div>
    </div>

    <button @click="refreshStats" class="refresh-button">Actualiser les statistiques</button>
  </div>
</template>

<script setup>
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
