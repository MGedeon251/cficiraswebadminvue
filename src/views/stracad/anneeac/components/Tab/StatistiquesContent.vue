<!-- ListeAnneesContent.vue -->
<template>
  <div>
    <!-- Statistiques rapides -->
    <div class="row mb-4">
      <div class="col-lg-3 col-md-6 mb-3">
        <div class="stat-card">
          <div class="stat-icon bg-primary-soft">
            <i class="mdi mdi-calendar-multiple text-primary"></i>
          </div>
          <div class="stat-content">
            <h3>{{ totalAnnees }}</h3>
            <p>Total années créées</p>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-md-6 mb-3">
        <div class="stat-card">
          <div class="stat-icon bg-success-soft">
            <i class="mdi mdi-calendar-check text-success"></i>
          </div>
          <div class="stat-content">
            <h3>1</h3>
            <p>Année active</p>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-md-6 mb-3">
        <div class="stat-card">
          <div class="stat-icon bg-info-soft">
            <i class="mdi mdi-calendar-clock text-info"></i>
          </div>
          <div class="stat-content">
            <h3>{{ joursRestants }}</h3>
            <p>Jours restants</p>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-md-6 mb-3">
        <div class="stat-card">
          <div class="stat-icon bg-warning-soft">
            <i class="mdi mdi-account-group text-warning"></i>
          </div>
          <div class="stat-content">
            <h3>{{ totalEtudiants }}</h3>
            <p>Étudiants inscrits</p>
          </div>
        </div>
      </div>
    </div>
    <!-- Tableau -->

    <div class="card-body">
      <div class="table-responsive">
        <table class="table table-bordered table-striped mb-5">
  <thead>
    <tr>
      <th>Filière</th>
      <th>Étudiants</th>
      <th>Moyenne générale</th>
      <th>Statut</th>
    </tr>
  </thead>

  <tbody v-if="filieres.length">
    <tr v-for="filiere in filieres" :key="filiere.id">
      <td>{{ filiere.designation }}</td>

      <td class="text-center">
        {{ filiere.nb_etudiants }}
      </td>

      <td class="text-center">
        <span v-if="filiere.moyenne_generale">
          {{ filiere.moyenne_generale }}
        </span>
        <span v-else class="text-muted">—</span>
      </td>

      <td class="text-center">
        <span
          class="badge"
          :class="filiere.moyenne_generale ? 'bg-success' : 'bg-warning'"
        >
          {{ filiere.moyenne_generale ? 'Notes disponibles' : 'Non évaluée' }}
        </span>
      </td>
    </tr>
  </tbody>

  <!-- Aucune donnée -->
  <tbody v-else>
    <tr>
      <td colspan="4" class="text-center py-4">
        <img src="/img/empty-box.svg" alt="Aucune donnée" class="mb-2" />
        <div class="text-muted">Aucune filière disponible</div>
      </td>
    </tr>
  </tbody>
</table>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Simulation réponse backend
const backendData = ref({
  nb_classes: '15',
  nb_etudiants: '30',
  nb_modules: '37',
  nb_semestres: '2',
  reussite: {
    total_notes: '10',
    admis: '8',
    taux_reussite: '80.00',
  },
  filieres: [
    { id: 1, designation: 'Informatique', nb_etudiants: '7', moyenne_generale: '11.49' },
    { id: 2, designation: 'Administration Publique', nb_etudiants: '7', moyenne_generale: '10.83' },
    { id: 3, designation: 'Assistant Manager', nb_etudiants: '7', moyenne_generale: null },
    { id: 4, designation: 'Économie', nb_etudiants: '7', moyenne_generale: null },
    { id: 5, designation: 'Biologie', nb_etudiants: '2', moyenne_generale: null },
  ],
})

// Table
const filieres = computed(() => backendData.value.filieres ?? [])

// Cartes statistiques
const totalAnnees = ref(5)
const joursRestants = ref(245)
const totalEtudiants = computed(() => backendData.value.nb_etudiants)
</script>


<style scoped>
.stat-card {
  background: #fff;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: transform 0.2s;
}

.stat-card:hover {
  transform: translateY(-4px);
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-icon i {
  font-size: 28px;
}

.stat-content h3 {
  margin: 0;
  font-size: 2rem;
  font-weight: 600;
  color: #2c3e50;
}

.stat-content p {
  margin: 0;
  color: #6c757d;
  font-size: 0.9rem;
}

.bg-primary-soft {
  background-color: rgba(0, 123, 255, 0.1);
}
.bg-success-soft {
  background-color: rgba(40, 167, 69, 0.1);
}
.bg-info-soft {
  background-color: rgba(23, 162, 184, 0.1);
}
.bg-warning-soft {
  background-color: rgba(255, 193, 7, 0.1);
}

.table th {
  font-weight: 600;
  color: #495057;
  border-bottom: 2px solid #dee2e6;
}

.btn-group .btn {
  margin: 0 2px;
}
</style>
