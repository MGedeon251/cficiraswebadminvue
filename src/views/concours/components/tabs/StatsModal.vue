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
      id="stat-table"
      :columns="columns"
      :dataSource="statData"
      :pagination="false"
      size="small"
      bordered
      rowKey="epreuve"
    />
<!-- Footer personnalisé -->
  <template #footer>
    <div class="d-flex justify-content-end mt-3">
      <a-button @click="close">Fermer</a-button>
      <a-button type="default" @click="exportToPDF">
        <DownloadOutlined />
        Exporter PDF
      </a-button>
    </div>
  </template>
  </a-modal>
</template>

<script setup>
import { ref, watch, onMounted, nextTick } from 'vue';
import { Chart, registerables } from 'chart.js';
import { DownloadOutlined } from '@ant-design/icons-vue';
import { useConcourStore } from '@/stores/gestionStores/concourStore';
import { useNotifier } from '@/stores/messages/useNotifier';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

Chart.register(...registerables);

const props = defineProps({
  open: Boolean,
  concoursId : {
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
    const stats = await concourStore.fetchStatistiqueConcoursGlobal(props.concoursId);

    statData.value = stats.map(s => ({
      epreuve: s.epreuve,
      moyenne: parseFloat(s.moyenne).toFixed(2),
      max: parseFloat(s.max_note),
      min: parseFloat(s.min_note),
      ecartType: parseFloat(s.ecart_type).toFixed(2),
      tauxReussite: parseFloat(s.taux_reussite).toFixed(2) + '%',
    }));
    console.log("statistiques : ", stats) ;

    await nextTick(); // Pour s'assurer que le DOM est prêt pour les canvas
    renderCharts(stats);
  } catch (e) {
    console.error("ID renvoyé : ", props.concoursId);
    notifyError('Impossible de charger les statistiques.');
  }
};


const renderCharts = (stats) => {
  if (barInstance) barInstance.destroy();
  if (radarInstance) radarInstance.destroy();

  const labels = stats.map(s => s.epreuve);
  const moyennes = stats.map(s => parseFloat(s.moyenne));
  const taux = stats.map(s => parseFloat(s.taux_reussite));

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

const exportToPDF = async () => {
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pdfWidth = 210;
  const margin = 15;
  let y = 20;

  // ✅ 1. Logo (optionnel)
  const logoUrl = '/img/logo-cfi-icon.png'; // chemin vers ton logo (dans public/)
  const logoImg = new Image();
  logoImg.src = logoUrl;

  await new Promise((resolve) => {
    logoImg.onload = () => {
      pdf.addImage(logoImg, 'PNG', margin, 10, 30, 15);
      resolve();
    };
  });

  // ✅ 2. Titre du document
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Statistiques des résultats du concours', margin + 35, 20);

  y = 35;

  // ✅ 3. Tableau HTML
  const tableEl = document.getElementById('stat-table');
  if (tableEl) {
    const canvas = await html2canvas(tableEl);
    const imgData = canvas.toDataURL('image/png');
    const imgProps = pdf.getImageProperties(imgData);
    const tableHeight = (imgProps.height * (pdfWidth - 2 * margin)) / imgProps.width;

    pdf.addImage(imgData, 'PNG', margin, y, pdfWidth - 2 * margin, tableHeight);
    y += tableHeight + 10;
  }

  // ✅ 4. Graphique bar (page 2)
  const barCanvas = barChart.value;
  if (barCanvas) {
    pdf.addPage();
    pdf.setFontSize(14);
    pdf.text('Moyennes par épreuve', margin, 20);

    const canvas = await html2canvas(barCanvas);
    const imgData = canvas.toDataURL('image/png');
    pdf.addImage(imgData, 'PNG', margin, 30, pdfWidth - 2 * margin, 100);
  }

  // ✅ 5. Graphique radar (page 3)
  const radarCanvas = radarChart.value;
  if (radarCanvas) {
    pdf.addPage();
    pdf.setFontSize(14);
    pdf.text('Taux de réussite (%)', margin, 20);

    const canvas = await html2canvas(radarCanvas);
    const imgData = canvas.toDataURL('image/png');
    pdf.addImage(imgData, 'PNG', margin, 30, pdfWidth - 2 * margin, 100);
  }

  // ✅ 6. Signature + date en bas de chaque page
  const totalPages = pdf.internal.getNumberOfPages();
  const date = new Date().toLocaleDateString('fr-FR');
  for (let i = 1; i <= totalPages; i++) {
    pdf.setPage(i);
    pdf.setFontSize(10);
    pdf.setTextColor(100);
    pdf.text(`Généré le : ${date}`, margin, 290);
    pdf.text(`Signature : ______________________`, pdfWidth - 100, 290);
  }

  // ✅ 7. Sauvegarde
  pdf.save('statistiques_concours.pdf');
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
