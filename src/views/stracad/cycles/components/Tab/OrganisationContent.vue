<template>
  <div class="row">
    <h4>Vue d'ensemble</h4>
    <p>Vous pouvez consulter les détails de chaque examen en cliquant sur le lien correspondant.</p>

    <div class="table-responsive">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Cycle</th>
            <th>Filiere disponible</th>
            <th>Effectifs</th>
            <th>Capacités</th>
            <th>Taux remplissage</th>
            <th>Statut</th>
          </tr>
        </thead>
        <tbody>
  <tr v-if="loading">
    <td colspan="6" class="text-center py-4">
      Chargement en cours...
    </td>
  </tr>

  <tr v-else-if="organisations.length === 0">
    <td colspan="6" class="text-center py-4">
      <div class="d-flex flex-column align-items-center">
        <img src="/img/empty-box.svg" alt="Aucune donnée" class="mb-2" />
        <div class="text-pr">Aucune donnée</div>
      </div>
    </td>
  </tr>

  <tr v-else v-for="item in organisations" :key="item.cycle_id">
    <td>{{ item.cycle_designation }}</td>
    <td>{{ item.filieres_disponibles }}</td>
    <td>{{ item.effectifs }}</td>
    <td>{{ item.capacite_totale }}</td>
    <td>
      <span v-if="item.capacite_totale > 0">
        {{ item.taux_remplissage }} %
      </span>
      <span v-else>-</span>
    </td>
    <td>
      <span
        class="badge"
        :class="{
          'bg-success': item.statut === 'Complet',
          'bg-warning': item.statut === 'Partiel',
          'bg-secondary': item.statut === 'Vide' || item.statut === 'Aucune capacité'
        }"
      >
        {{ item.statut }}
      </span>
    </td>
  </tr>
</tbody>

      </table>
    </div>
  </div>

  <div class="row"></div>
</template>
<script setup>
import { ref, onMounted, computed } from 'vue';
import { useCycleStore } from '@/stores/academiqueStore/cycleStore';
import { useNotifier } from '@/stores/messages/useNotifier';

const cycleStore = useCycleStore();
const messageStore = useNotifier();

const organisations = ref([]);
const loading = computed(() => cycleStore.loading);

const loadOrganisation = async () => {
  organisations.value = await cycleStore.fetchOrganisation();
};

onMounted(() => {
  loadOrganisation();
});
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
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
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

.cycle-icon {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 123, 255, 0.1);
}

.cycle-icon i {
  font-size: 20px;
}
</style>
