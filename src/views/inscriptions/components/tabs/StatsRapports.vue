<template>
  <div class="statistics-dashboard">
    <!-- Header -->
    <div class="row">
      <div class="col-md-12 grid-margin">
        <div class="d-flex justify-content-between flex-wrap align-items-center">
          <div class="d-flex align-items-end flex-wrap">
            <div class="me-md-3 me-xl-5">
              <h2 class="fw-bold text-dark">Statistiques et Rapports</h2>
              <p class="mb-md-0 text-muted">Analyse en temps réel des inscriptions et performances financières</p>
            </div>
          </div>
          <div class="d-flex gap-2 pt-3 pt-md-0">
            <button class="btn btn-white shadow-sm border-0 px-3">
              <i class="mdi mdi-calendar me-1"></i> {{ currentYear }}
            </button>
            <button class="btn btn-primary shadow-sm px-3" @click="downloadReport">
              <i class="mdi mdi-download me-1"></i> Générer PDF
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- KPI Cards (Indicateurs Clés) -->
    <div class="row mb-4">
      <div class="col-md-3">
        <div class="stat-card border-0 shadow-sm bg-white p-3">
          <div class="d-flex justify-content-between align-items-start">
            <div class="stat-icon bg-soft-primary text-primary">
              <i class="mdi mdi-account-multiple-outline"></i>
            </div>
            <span class="badge bg-soft-success text-success text-xs">+12%</span>
          </div>
          <div class="mt-3">
            <h3 class="fw-bold mb-0">1,284</h3>
            <p class="text-muted small text-uppercase fw-semibold mb-0">Inscriptions Totales</p>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="stat-card border-0 shadow-sm bg-white p-3">
          <div class="d-flex justify-content-between align-items-start">
            <div class="stat-icon bg-soft-success text-success">
              <i class="mdi mdi-cash-multiple"></i>
            </div>
            <span class="badge bg-soft-primary text-primary text-xs">Objectif: 80%</span>
          </div>
          <div class="mt-3">
            <h3 class="fw-bold mb-0">12.5M <small class="fs-6">FCFA</small></h3>
            <p class="text-muted small text-uppercase fw-semibold mb-0">Recettes Encaissées</p>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="stat-card border-0 shadow-sm bg-white p-3">
          <div class="d-flex justify-content-between align-items-start">
            <div class="stat-icon bg-soft-warning text-warning">
              <i class="mdi mdi-clock-alert-outline"></i>
            </div>
            <span class="badge bg-soft-danger text-danger text-xs">-5%</span>
          </div>
          <div class="mt-3">
            <h3 class="fw-bold mb-0">45</h3>
            <p class="text-muted small text-uppercase fw-semibold mb-0">Dossiers en attente</p>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="stat-card border-0 shadow-sm bg-white p-3">
          <div class="d-flex justify-content-between align-items-start">
            <div class="stat-icon bg-soft-info text-info">
              <i class="mdi mdi-chart-line"></i>
            </div>
            <span class="badge bg-soft-info text-info text-xs">Stable</span>
          </div>
          <div class="mt-3">
            <h3 class="fw-bold mb-0">94.2%</h3>
            <p class="text-muted small text-uppercase fw-semibold mb-0">Taux de Rétention</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Charts & Analytics Section -->
    <div class="row g-4">
      <!-- Graphique Principal -->
      <div class="col-lg-8">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-header bg-white border-0 py-3 d-flex justify-content-between align-items-center">
            <h5 class="fw-bold mb-0">Flux des Inscriptions</h5>
            <div class="dropdown">
              <button class="btn btn-sm btn-light border-0" type="button">Mensuel <i class="mdi mdi-chevron-down"></i></button>
            </div>
          </div>
          <div class="card-body">
            <!-- Placeholder pour un graphique (ex: Chart.js ou ApexCharts) -->
            <div class="chart-container d-flex align-items-end justify-content-between px-2" style="height: 250px;">
              <div v-for="h in [40, 60, 45, 90, 65, 85, 100]" :key="h" 
                   class="bg-soft-primary rounded-top" 
                   :style="{ height: h + '%', width: '12%' }"
                   v-tooltip="'Mois: ' + h + ' inscrits'">
              </div>
            </div>
            <div class="d-flex justify-content-between mt-3 text-muted small px-1">
              <span>Jan</span><span>Fév</span><span>Mar</span><span>Avr</span><span>Mai</span><span>Juin</span><span>Juil</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Répartition par Filière -->
      <div class="col-lg-4">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-header bg-white border-0 py-3">
            <h5 class="fw-bold mb-0">Top Filières</h5>
          </div>
          <div class="card-body">
            <div v-for="filiere in topFilieres" :key="filiere.name" class="mb-4">
              <div class="d-flex justify-content-between mb-1">
                <span class="fw-bold small text-dark">{{ filiere.name }}</span>
                <span class="small fw-bold text-primary">{{ filiere.count }}</span>
              </div>
              <div class="progress rounded-pill" style="height: 8px;">
                <div class="progress-bar bg-primary rounded-pill" :style="{ width: filiere.percent + '%' }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const currentYear = "Année Académique 2024-2025";

const topFilieres = [
  { name: "Informatique de Gestion", count: 450, percent: 85 },
  { name: "Génie Logiciel", count: 320, percent: 65 },
  { name: "Ressources Humaines", count: 210, percent: 45 },
  { name: "Communication", count: 180, percent: 35 }
];

const downloadReport = () => {
  console.log("Génération du rapport...");
};
</script>

<style scoped>
.statistics-dashboard {
  padding: 10px;
}

/* KPI Cards */
.stat-card {
  border-radius: 16px;
  transition: transform 0.2s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.text-xs {
  font-size: 0.7rem;
  font-weight: 700;
}

/* Chart Placeholder */
.bg-soft-primary {
  background-color: rgba(75, 73, 172, 0.15);
  transition: background 0.3s;
}
.bg-soft-primary:hover {
  background-color: #4b49ac;
}

/* Progress Bars */
.progress {
  background-color: #f0f2f8;
}

/* Buttons */
.btn-white {
  background: #fff;
  color: #444;
}

/* Couleurs Soft */
.bg-soft-success { background-color: rgba(25, 135, 84, 0.12); }
.bg-soft-warning { background-color: rgba(255, 193, 7, 0.12); }
.bg-soft-danger  { background-color: rgba(220, 53, 69, 0.12); }
.bg-soft-info    { background-color: rgba(13, 202, 240, 0.12); }
</style>
