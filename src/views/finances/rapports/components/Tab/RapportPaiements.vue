<template>
  <div>
    <h3 class="mb-4">Rapport des Paiements</h3>

    <!-- Tableau des paiements -->
    <div class="card mb-4">
      <div class="card-body">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Matricule</th>
              <th>Nom</th>
              <th>Montant</th>
              <th>Type de frais</th>
              <th>Statut</th>
              <th>Date</th>
              <th>Mode</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="paiement in paiements" :key="paiement.id">
              <td>{{ paiement.matricule }}</td>
              <td>{{ paiement.nom }} {{ paiement.prenom }}</td>
              <td>{{ paiement.montant }} FCFA</td>
              <td>{{ paiement.type }}</td>
              <td>
                <span :class="paiement.statut === 'Payé' ? 'text-success' : 'text-warning'">
                  {{ paiement.statut }}
                </span>
              </td>
              <td>{{ paiement.date }}</td>
              <td>{{ paiement.mode }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Graphiques -->
      <div>
          <h3 class="mb-4">Rapport des Paiements</h3>

          <!-- Graphiques -->
          <div class="row">
            <!-- Camembert : répartition par mode de paiement -->
            <div class="col-md-6">
              <canvas id="chartModePaiement"></canvas>
            </div>

            <!-- Histogramme : montants encaissés par mois -->
            <div class="col-md-6">
              <canvas id="chartMontants"></canvas>
            </div>
          </div>
      </div>
      </div>
</template>

<<script setup>
import { ref, onMounted } from 'vue';
import Chart from 'chart.js/auto';

const paiements = ref([]);

onMounted(() => {
  // Simulation API
  paiements.value = [
    {
      id: 1,
      matricule: 'E001',
      nom: 'Diallo',
      prenom: 'Moussa',
      montant: 50000,
      type: 'Inscription',
      statut: 'Payé',
      date: '2026-01-15',
      mode: 'Mobile Money',
    },
    {
      id: 2,
      matricule: 'E002',
      nom: 'Ndiaye',
      prenom: 'Awa',
      montant: 30000,
      type: 'Cours',
      statut: 'Payé',
      date: '2026-02-10',
      mode: 'Espèces',
    },
    {
      id: 3,
      matricule: 'E003',
      nom: 'Kouassi',
      prenom: 'Jean',
      montant: 45000,
      type: 'Logement',
      statut: 'En attente',
      date: '2026-03-05',
      mode: 'Virement',
    },
  ];

  // Répartition par mode de paiement
  const modeCounts = {};
  paiements.value.forEach((p) => {
    modeCounts[p.mode] = (modeCounts[p.mode] || 0) + 1;
  });

  new Chart(document.getElementById('chartModePaiement'), {
    type: 'pie',
    data: {
      labels: Object.keys(modeCounts),
      datasets: [
        {
          data: Object.values(modeCounts),
          backgroundColor: ['#007bff', '#ffc107', '#28a745', '#dc3545'],
        },
      ],
    },
  });

  // Montants encaissés par mois
  const moisCounts = {};
  paiements.value.forEach((p) => {
    const mois = new Date(p.date).toLocaleString('fr-FR', { month: 'long' });
    moisCounts[mois] = (moisCounts[mois] || 0) + p.montant;
  });

  new Chart(document.getElementById('chartMontants'), {
    type: 'bar',
    data: {
      labels: Object.keys(moisCounts),
      datasets: [
        {
          label: 'Montants encaissés (FCFA)',
          data: Object.values(moisCounts),
          backgroundColor: '#17a2b8',
        },
      ],
    },
  });
});
</script>
