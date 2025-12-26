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
              <th>Total candidats</th>
              <th>Hommes</th>
              <th>Femmes</th>
              <th>Nombre d'épreuves</th>
              <th>Notes saisies</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colspan="9" class="text-center py-4">
                <div class="d-flex flex-column align-items-center">
                  <img src="/img/empty-box.svg" alt="Aucune donnée" class="mb-2" />
                </div>
                <div class="text-pr">Aucune donnée</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// Données
const totalAnnees = ref(5);
const joursRestants = ref(245);
const totalEtudiants = ref(1250);
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
