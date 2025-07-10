<template>
  <div>
    <div class="row">
      <div class="col-md-12 grid-margin">
        <div class="d-flex justify-content-between flex-wrap">
          <div class="d-flex align-items-end flex-wrap">
            <div class="me-md-3 me-xl-5">
              <h2>Progression académique</h2>
              <p class="mb-md-0">Progression</p>
            </div>
            <div class="d-flex">
              <i class="mdi mdi-home text-muted hover-cursor"></i>
              <p class="text-muted mb-0 hover-cursor">&nbsp;/&nbsp;Scolarité&nbsp;/&nbsp;</p>
              <p class="text-primary mb-0 hover-cursor">parcours</p>
            </div>
          </div>
          <div class="d-flex justify-content-between align-items-end flex-wrap"></div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 grid-margin stretch-card">
        <div class="card">
          <SkeletonLoader v-if="loading" type="table" :rows="3" :columns="1" />
          <div v-else class="card-body dashboard-tabs p-0">
            <ParcourTab />
          </div>
        </div>
      </div>
    </div>
    <!-- Modal détails étudiant -->
    <teleport to="body">
      <div
        v-if="showDetails"
        class="modal fade show d-block"
        tabindex="-1"
        style="background: rgba(0, 0, 0, 0.3)"
      >
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">
                Fiche académique de {{ selectedEtudiant.nom }} {{ selectedEtudiant.prenom }}
              </h5>
              <button type="button" class="btn-close" @click="showDetails = false"></button>
            </div>
            <div class="modal-body">
              <!-- TODO: Afficher les infos détaillées ici -->
              <p><strong>Matricule :</strong> {{ selectedEtudiant.matricule }}</p>
              <p><strong>Promotion :</strong> {{ selectedEtudiant.promotion || '-' }}</p>
              <p><strong>Années d'inscription :</strong> ...</p>
              <p><strong>Classes fréquentées :</strong> ...</p>
              <p><strong>Modules suivis :</strong> ...</p>
              <p><strong>Enseignants responsables :</strong> ...</p>
              <p><strong>Notes obtenues :</strong> ...</p>
              <p><strong>Statut paiement :</strong> ...</p>
            </div>
            <div class="modal-footer">
              <button class="btn btn-secondary" @click="showDetails = false">Fermer</button>
            </div>
          </div>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import SkeletonLoader from '@/components/SkeletonLoader.vue';
import ParcourTab from './components/tabs/ParcourTab.vue';
const loading = ref(true);
const formateurs = ref([]);
const searchQuery = ref('');
const showDetails = ref(false);
const selectedEtudiant = ref({});

const filteredFormateurs = computed(() => {
  if (!searchQuery.value) return formateurs.value;
  return formateurs.value.filter(
    (f) =>
      (f.nom && f.nom.toLowerCase().includes(searchQuery.value.toLowerCase())) ||
      (f.matricule && f.matricule.toLowerCase().includes(searchQuery.value.toLowerCase())) ||
      (f.promotion && f.promotion.toLowerCase().includes(searchQuery.value.toLowerCase()))
  );
});

onMounted(() => {
  setTimeout(() => {
    formateurs.value = [
      {
        id: 1,
        matricule: 'F001',
        nom: 'Doe',
        prenom: 'John',
        email: 'john@example.com',
        telephone: '0123456789',
        promotion: '2023',
      },
      {
        id: 2,
        matricule: 'F002',
        nom: 'Smith',
        prenom: 'Anna',
        email: 'anna@example.com',
        telephone: '0987654321',
        promotion: '2024',
      },
    ];
    loading.value = false;
  }, 3000);
});

function openDetails(etudiant) {
  selectedEtudiant.value = etudiant;
  showDetails.value = true;
}
</script>
