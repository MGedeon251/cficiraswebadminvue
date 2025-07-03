<template>
  <div>
    <div class="row">
      <div class="col-md-12 grid-margin">
        <div class="d-flex justify-content-between flex-wrap">
          <div class="d-flex align-items-end flex-wrap">
            <div class="me-md-3 me-xl-5">
              <h2>Gestion des Inscriptions</h2>
              <p class="mb-md-0">Inscriptions et réinscriptions étudiants</p>
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

    <!-- Filtres -->
    <div class="row mb-3">
      <div class="col-md-3">
        <input
          v-model="rechercheNom"
          type="text"
          class="form-control"
          placeholder="Rechercher par nom..."
        />
      </div>
      <div class="col-md-3">
        <input
          v-model="recherchePrenom"
          type="text"
          class="form-control"
          placeholder="Rechercher par prénom..."
        />
      </div>
      <div class="col-md-3">
        <select v-model="selectedYear" class="form-select">
          <option value="">-- Toutes les années --</option>
          <option v-for="year in academicYears" :key="year" :value="year">{{ year }}</option>
        </select>
      </div>
      <div class="col-md-3">
        <select v-model="selectedFiliere" class="form-select">
          <option value="">-- Toutes les filières --</option>
          <option v-for="f in filieresDisponibles" :key="f" :value="f">{{ f }}</option>
        </select>
      </div>
    </div>

    <div class="row mb-3">
      <div class="col-md-12 text-end">
        <button class="btn btn-outline-primary" @click="exportCSV">Exporter en CSV</button>
      </div>
    </div>

    <!-- Liste des candidats non inscrits -->
    <div class="row">
      <div class="container my-2">
        <div class="col-md-12 grid margin stretch-card">
          <div class="card">
            <SkeletonLoader v-if="loading" type="table" :rows="3" :columns="1" />
            <div v-else class="card-body">
              <div class="table-responsive">
                <table class="table table-hover align-middle">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Nom</th>
                      <th>Prénom</th>
                      <th>Sexe</th>
                      <th>Âge</th>
                      <th>Filière</th>
                      <th>Année</th>
                      <th>Statut</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(c, index) in inscriptionsPage" :key="index">
                      <td>{{ (pageCourante - 1) * pageSize + index + 1 }}</td>
                      <td>{{ c.nom }}</td>
                      <td>{{ c.prenom }}</td>
                      <td>{{ c.sexe?.charAt(0).toUpperCase() }}</td>
                      <td>{{ c.age }}</td>
                      <td>{{ c.filiere }}</td>
                      <td>{{ c.concours }}</td>
                      <td>
                        <span :class="['badge', c.inscrit ? 'bg-success' : 'bg-warning']">
                          {{ c.inscrit ? 'Inscrit' : 'Non inscrit' }}
                        </span>
                      </td>
                      <td>
                        <button
                          v-if="!c.inscrit"
                          class="btn btn-sm btn-success"
                          @click="validerInscription(c)"
                        >
                          Valider
                        </button>
                        <button class="btn btn-sm btn-danger" @click="supprimerCandidat(c)">
                          Supprimer
                        </button>
                        <button class="btn btn-sm btn-primary">Modifier</button>
                      </td>
                    </tr>
                    <tr v-if="inscriptionsFiltrees.length === 0">
                      <td colspan="9" class="text-center fst-italic">Aucun candidat trouvé.</td>
                    </tr>
                  </tbody>
                </table>
                <div class="d-flex justify-content-center mt-3">
                  <button
                    class="btn btn-secondary me-2"
                    :disabled="pageCourante === 1"
                    @click="pageCourante--"
                  >
                    Précédent
                  </button>
                  <span>Page {{ pageCourante }} / {{ totalPages }}</span>
                  <button
                    class="btn btn-secondary ms-2"
                    :disabled="pageCourante === totalPages"
                    @click="pageCourante++"
                  >
                    Suivant
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bloc étudiants inscrits -->
    <div class="row mt-5">
      <div class="col-md-12">
        <h4>Liste des étudiants inscrits</h4>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Filière</th>
              <th>Année</th>
              <th>Paiement</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(etudiant, i) in inscrits" :key="i">
              <td>{{ etudiant.nom }}</td>
              <td>{{ etudiant.prenom }}</td>
              <td>{{ etudiant.filiere }}</td>
              <td>{{ etudiant.annee }}</td>
              <td>{{ etudiant.paiement }}</td>
            </tr>
            <tr v-if="inscrits.length === 0">
              <td colspan="5" class="text-center fst-italic">Aucun étudiant inscrit.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import SkeletonLoader from '@/components/SkeletonLoader.vue';
import { ref, computed, onMounted } from 'vue';

const loading = ref(true);
const academicYears = ref([]);
const selectedYear = ref('');
const selectedFiliere = ref('');
const rechercheNom = ref('');
const recherchePrenom = ref('');
const inscriptions = ref([]);
const inscrits = ref([]);
const pageCourante = ref(1);
const pageSize = 5;

const filieresDisponibles = computed(() => {
  const set = new Set(inscriptions.value.map((c) => c.filiere).filter(Boolean));
  return Array.from(set);
});

onMounted(() => {
  const savedAdmis = localStorage.getItem('admis');
  if (savedAdmis) {
    const admis = JSON.parse(savedAdmis);
    inscriptions.value = admis.map((c) => ({ ...c, inscrit: false }));
    const annees = new Set(admis.map((c) => c.concours).filter(Boolean));
    academicYears.value = Array.from(annees).sort();
  }

  const savedFinal = localStorage.getItem('inscriptionsFinales');
  if (savedFinal) {
    inscrits.value = JSON.parse(savedFinal);
  }

  loading.value = false;
});

function validerInscription(candidat) {
  candidat.inscrit = true;
  const inscription = {
    ...candidat,
    annee: candidat.concours,
    paiement: 'non',
  };
  inscrits.value.push(inscription);
  localStorage.setItem('inscriptionsFinales', JSON.stringify(inscrits.value));
  inscriptions.value = inscriptions.value.filter(
    (c) => !(c.nom === candidat.nom && c.prenom === candidat.prenom)
  );
  let admis = JSON.parse(localStorage.getItem('admis') || '[]');
  admis = admis.filter((a) => !(a.nom === candidat.nom && a.prenom === candidat.prenom));
  localStorage.setItem('admis', JSON.stringify(admis));
}

function supprimerCandidat(candidat) {
  inscriptions.value = inscriptions.value.filter(
    (c) => !(c.nom === candidat.nom && c.prenom === candidat.prenom)
  );
  let admis = JSON.parse(localStorage.getItem('admis') || '[]');
  admis = admis.filter((a) => !(a.nom === candidat.nom && a.prenom === candidat.prenom));
  localStorage.setItem('admis', JSON.stringify(admis));
}

const inscriptionsFiltrees = computed(() => {
  return inscriptions.value.filter((c) => {
    const matchNom = c.nom.toLowerCase().includes(rechercheNom.value.toLowerCase());
    const matchPrenom = c.prenom.toLowerCase().includes(recherchePrenom.value.toLowerCase());
    const matchFiliere = !selectedFiliere.value || c.filiere === selectedFiliere.value;
    const matchAnnee = !selectedYear.value || c.concours === selectedYear.value;
    return matchNom && matchPrenom && matchFiliere && matchAnnee;
  });
});

const totalPages = computed(() => Math.ceil(inscriptionsFiltrees.value.length / pageSize));
const inscriptionsPage = computed(() => {
  const start = (pageCourante.value - 1) * pageSize;
  return inscriptionsFiltrees.value.slice(start, start + pageSize);
});

function exportCSV() {
  const rows = [
    ['Nom', 'Prénom', 'Sexe', 'Âge', 'Filière', 'Année'],
    ...inscriptionsFiltrees.value.map((c) => [
      c.nom,
      c.prenom,
      c.sexe,
      c.age,
      c.filiere,
      c.concours,
    ]),
  ];
  const csvContent = rows.map((e) => e.join(',')).join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', 'candidats_non_inscrits.csv');
  link.click();
}
</script>

<style scoped>
.badge {
  padding: 0.4rem 0.6rem;
  font-size: 0.75rem;
}
</style>
