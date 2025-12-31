<template>
  <div class="row">
    <div class="col-12 mb-3">
      <h4>Statistiques des étudiants</h4>
      <p class="text-muted">Vue d’ensemble des étudiants par filière, classe et année académique.</p>
    </div>

    <!-- Cartes résumé -->
    <div class="row mb-4">
      <div class="col-md-4">
        <div class="card text-center shadow-sm">
          <div class="card-body">
            <h5 class="card-title">Total Étudiants</h5>
            <h2>{{ totalEtudiants }}</h2>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card text-center shadow-sm">
          <div class="card-body">
            <h5 class="card-title">Filières</h5>
            <h2>{{ totalFilieres }}</h2>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card text-center shadow-sm">
          <div class="card-body">
            <h5 class="card-title">Classes</h5>
            <h2>{{ totalClasses }}</h2>
          </div>
        </div>
      </div>
    </div>

    <!-- Graphiques -->
    <div class="row">
      <div class="col-md-6 mb-4">
        <div class="card shadow-sm">
          <div class="card-body">
            <h5 class="card-title">Répartition par filière</h5>
            <canvas id="chartFiliere"></canvas>
          </div>
        </div>
      </div>
      <div class="col-md-6 mb-4">
        <div class="card shadow-sm">
          <div class="card-body">
            <h5 class="card-title">Répartition par année académique</h5>
            <canvas id="chartAnnee"></canvas>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Chart from 'chart.js/auto'

const etudiants = ref([])

// Totaux
const totalEtudiants = ref(0)
const totalFilieres = ref(0)
const totalClasses = ref(0)

onMounted(() => {
  // Simulation API
  etudiants.value = [
    { id: 1, nom: 'Diallo', prenom: 'Mamadou', filiere: 'Informatique', classe: 'L1-INFO-A', annee_academique: '2024-2025' },
    { id: 2, nom: 'Ndiaye', prenom: 'Awa', filiere: 'Informatique', classe: 'L2-INFO-B', annee_academique: '2024-2025' },
    { id: 3, nom: 'Kouassi', prenom: 'Jean', filiere: 'Administration', classe: 'M1-ADM-A', annee_academique: '2023-2024' },
    { id: 4, nom: 'Ba', prenom: 'Fatou', filiere: 'Administration', classe: 'M1-ADM-B', annee_academique: '2024-2025' },
  ]

  totalEtudiants.value = etudiants.value.length
  totalFilieres.value = new Set(etudiants.value.map(e => e.filiere)).size
  totalClasses.value = new Set(etudiants.value.map(e => e.classe)).size

  // Données par filière
  const filiereCounts = {}
  etudiants.value.forEach(e => {
    filiereCounts[e.filiere] = (filiereCounts[e.filiere] || 0) + 1
  })

  new Chart(document.getElementById('chartFiliere'), {
    type: 'pie',
    data: {
      labels: Object.keys(filiereCounts),
      datasets: [{
        data: Object.values(filiereCounts),
        backgroundColor: ['#007bff', '#ffc107', '#28a745', '#dc3545']
      }]
    }
  })

  // Données par année académique
  const anneeCounts = {}
  etudiants.value.forEach(e => {
    anneeCounts[e.annee_academique] = (anneeCounts[e.annee_academique] || 0) + 1
  })

  new Chart(document.getElementById('chartAnnee'), {
    type: 'bar',
    data: {
      labels: Object.keys(anneeCounts),
      datasets: [{
        label: 'Nombre d’étudiants',
        data: Object.values(anneeCounts),
        backgroundColor: '#17a2b8'
      }]
    }
  })
})
</script>

<style scoped>
.card {
  border-radius: 12px;
}
.card-title {
  font-weight: 600;
}
</style>

