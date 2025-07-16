<template>
  <a-modal
    :open="visible"
    :footer="null"
    title="Statistiques du concours"
    @cancel="close"
    width="900px"
  >
    <div class="row">
      <div class="col-md-6">
        <div class="mb-3">
          <h6 class="text-center">Moyennes par épreuve</h6>
          <canvas ref="barChart" height="250" />
        </div>
      </div>
      <div class="col-md-6">
        <div class="mb-3">
          <h6 class="text-center">Taux de réussite</h6>
          <canvas ref="radarChart" height="250" />
        </div>
      </div>
    </div>

    <a-divider />

    <a-table
      :columns="columns"
      :dataSource="statData"
      :pagination="false"
      size="small"
      bordered
      rowKey="epreuve"
    />

    <template #footer>
      <div class="d-flex justify-content-end mt-3">
        <a-button @click="close">Fermer</a-button>
        <a-button type="primary" @click="exportPdf" class="ms-2">
          <i class="mdi mdi-file-pdf me-1"></i> Exporter PDF
        </a-button>
      </div>
    </template>
  </a-modal>
</template>

<script setup>
import { ref, watch, onMounted, nextTick } from 'vue';
import { Chart, registerables } from 'chart.js';
import { useConcourStore } from '@/stores/gestionStores/concourStore';
import { useNotifier } from '@/stores/messages/useNotifier';

Chart.register(...registerables);

const props = defineProps({
  open: Boolean,
  concoursId: {
    type: Number,
    required: true,
  }
});
const emit = defineEmits(['update:open']);

const visible = ref(props.open);
watch(() => props.open, val => visible.value = val);
watch(visible, val => emit('update:open', val));

const concourStore = useConcourStore();
const { notifyError } = useNotifier();

const statData = ref([]);
const columns = [
  { title: 'Épreuve', dataIndex: 'epreuve' },
  { title: 'Moyenne', dataIndex: 'moyenne' },
  { title: 'Max', dataIndex: 'max' },
  { title: 'Min', dataIndex: 'min' },
  { title: 'Écart-type', dataIndex: 'ecartType' },
  { title: 'Taux réussite', dataIndex: 'tauxReussite' },
];

const barChart = ref(null);
const radarChart = ref(null);
let barInstance = null;
let radarInstance = null;

watch(visible, async (val) => {
  if (val && props.concoursId) {
    await loadStats();
  }
});

const loadStats = async () => {
  try {
    const stats = await concourStore.fetchStatistiquesConcours(props.concoursId);

    statData.value = stats.map(s => ({
      epreuve: s.epreuve,
      moyenne: s.moyenne.toFixed(2),
      max: s.max,
      min: s.min,
      ecartType: s.ecartType.toFixed(2),
      tauxReussite: s.tauxReussite.toFixed(2) + '%',
    }));

    await nextTick();
    renderCharts(stats);
  } catch (e) {
    notifyError('Impossible de charger les statistiques.');
  }
};

const renderCharts = (stats) => {
  // Détruire les anciens graphiques
  if (barInstance) barInstance.destroy();
  if (radarInstance) radarInstance.destroy();

  const labels = stats.map(s => s.epreuve);
  const moyennes = stats.map(s => s.moyenne);
  const taux = stats.map(s => s.tauxReussite);

  barInstance = new Chart(barChart.value.getContext('2d'), {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Moyenne',
        data: moyennes,
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      }],
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true, max: 20 },
      },
    },
  });

  radarInstance = new Chart(radarChart.value.getContext('2d'), {
    type: 'radar',
    data: {
      labels,
      datasets: [{
        label: 'Taux de réussite (%)',
        data: taux,
        backgroundColor: 'rgba(40, 167, 69, 0.4)',
        borderColor: 'rgba(40, 167, 69, 1)',
        borderWidth: 2,
      }],
    },
    options: {
      responsive: true,
      scales: {
        r: {
          beginAtZero: true,
          max: 100,
        }
      },
    },
  });
};

const close = () => {
  visible.value = false;
};

const exportPdf = () => {
  // Export PDF : ajouter jsPDF ou envoyer vers backend
  notifyError('Export PDF en cours de développement...');
};
</script>

<style scoped>
.ms-2 {
  margin-left: 8px;
}
.mt-3 {
  margin-top: 1rem;
}
</style>
