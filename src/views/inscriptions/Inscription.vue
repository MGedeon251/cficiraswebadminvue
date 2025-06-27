<template>
  <div>
    <div class="row">
      <div class="col-md-12 grid-margin">
        <div class="d-flex justify-content-between flex-wrap">
          <div class="d-flex align-items-end flex-wrap">
            <div class="me-md-3 me-xl-5">
              <h2>Gestion des Inscriptions</h2>
              <p class="mb-md-0">Inscriptions et reinscriptions etudiants</p>
            </div>
            <div class="d-flex">
              <i class="mdi mdi-home text-muted hover-cursor"></i>
              <p class="text-muted mb-0 hover-cursor">&nbsp;/&nbsp;Portail&nbsp;/&nbsp;</p>
              <p class="text-primary mb-0 hover-cursor">Inscriptions</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="container my-2">
        <div class="col-md-12 grid margin stretch-card">
          <div class="card">
            <SkeletonLoader v-if="loading" type="table" :rows="3" :columns="1" />
            <div v-else class="card-body">
              <div class="d-flex justify-content-between flex-wrap">
                <div class="d-flex align-items-end flex-wrap">
                  <div class="me-md-4 me-xl-5">
                    <div class="filters d-flex gap-2 mb-3">
                      <select v-model="selectedYear" class="form-select">
                        <option v-for="year in academicYears" :key="year" :value="year">
                          {{ year }}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="d-flex justify-content-between align-items-end flex-wrap">
                  <button class="btn btn-outline-dark me-2">Exporter</button>
                </div>
              </div>
              <div class="table-responsive">
                <table class="table table-hover align-middle">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Matricule</th>
                      <th>Noms</th>
                      <th>Prénoms</th>
                      <th>Classe</th>
                      <th>Année</th>
                      <th>Paiement</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(etud, index) in inscriptions" :key="index">
                      <td>{{ index + 1 }}</td>
                      <td>{{ etud.matricule || 'N/A' }}</td>
                      <td>{{ etud.nom }}</td>
                      <td>{{ etud.prenom }}</td>
                      <td>{{ etud.filiere || 'N/A' }}</td>
                      <td>{{ selectedYear }}</td>
                      <td><span class="badge bg-warning">Non payé</span></td>
                      <td>
                        <button class="btn btn-sm btn-success" @click="validerInscription(etud)">
                          Valider inscription
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import SkeletonLoader from '@/components/SkeletonLoader.vue';
import { ref, onMounted } from 'vue';

const loading = ref(true);
const academicYears = ref(['2023-2024', '2024-2025']);
const selectedYear = ref('2023-2024');
const inscriptions = ref([]);

onMounted(() => {
  const savedAdmis = localStorage.getItem('admis');
  if (savedAdmis) {
    const admis = JSON.parse(savedAdmis);
    inscriptions.value = admis.filter((c) => c.status === 'valide');
  }
  loading.value = false;
});

function validerInscription(candidat) {
  alert(`Inscription validée pour ${candidat.nom} ${candidat.prenom}`);

  const exist = localStorage.getItem('inscriptionsFinales') || '[]';
  const inscriptionsFinales = JSON.parse(exist);
  inscriptionsFinales.push({
    ...candidat,
    annee: selectedYear.value,
    paiement: 'non',
    inscrit: true,
  });
  localStorage.setItem('inscriptionsFinales', JSON.stringify(inscriptionsFinales));

  // En option : retirer le candidat une fois inscrit
  let admis = JSON.parse(localStorage.getItem('admis') || '[]');
  admis = admis.filter(a => !(a.nom === candidat.nom && a.prenom === candidat.prenom));
  localStorage.setItem('admis', JSON.stringify(admis));
  inscriptions.value = inscriptions.value.filter(i => !(i.nom === candidat.nom && i.prenom === candidat.prenom));
}
</script>

<style scoped>
.badge {
  padding: 0.4rem 0.6rem;
  font-size: 0.75rem;
}
</style>
