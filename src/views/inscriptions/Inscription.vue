<template>
  <div>
    <!-- Titre -->
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
        <input v-model="rechercheNom" type="text" class="form-control" placeholder="Rechercher par nom...">
      </div>
      <div class="col-md-3">
        <input v-model="recherchePrenom" type="text" class="form-control" placeholder="Rechercher par prénom...">
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

    <!-- Export -->
    <div class="row mb-3">
      <div class="col-md-12 text-end">
        <button class="btn btn-outline-primary" @click="exportCSV(inscriptionsFiltrees)">Exporter Candidats (CSV)</button>
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
                      <td>{{ c.sexe }}</td>
                      <td>{{ c.age }}</td>
                      <td>{{ c.filiere }}</td>
                      <td>{{ c.concours }}</td>
                      <td>
                        <span :class="['badge', c.inscrit ? 'bg-success' : 'bg-warning']">
                          {{ c.inscrit ? 'Inscrit' : 'Non inscrit' }}
                        </span>
                      </td>
                      <td>
                        <button class="btn btn-sm btn-success" @click="validerInscription(c)">Valider</button>
                      </td>
                    </tr>
                    <tr v-if="inscriptionsFiltrees.length === 0">
                      <td colspan="9" class="text-center fst-italic">Aucun candidat trouvé.</td>
                    </tr>
                  </tbody>
                </table>
                <div class="d-flex justify-content-center mt-3">
                  <button class="btn btn-secondary me-2" :disabled="pageCourante === 1" @click="pageCourante--">Précédent</button>
                  <span>Page {{ pageCourante }} / {{ totalPages }}</span>
                  <button class="btn btn-secondary ms-2" :disabled="pageCourante === totalPages" @click="pageCourante++">Suivant</button>
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

        <!-- Filtres inscrits -->
        <div class="row mb-3">
          <div class="col-md-3">
            <input v-model="filtreInscritsNom" type="text" class="form-control" placeholder="Rechercher nom...">
          </div>
          <div class="col-md-3">
            <input v-model="filtreInscritsPrenom" type="text" class="form-control" placeholder="Rechercher prénom...">
          </div>
          <div class="col-md-3">
            <select v-model="filtreInscritsYear" class="form-select">
              <option value="">-- Toutes les années --</option>
              <option v-for="year in academicYears" :key="year" :value="year">{{ year }}</option>
            </select>
          </div>
          <div class="col-md-3">
            <select v-model="filtreInscritsFiliere" class="form-select">
              <option value="">-- Toutes les filières --</option>
              <option v-for="f in filieresDisponibles" :key="f" :value="f">{{ f }}</option>
            </select>
          </div>
        </div>

        <div class="text-end mb-2">
          <button class="btn btn-outline-success" @click="exportCSV(inscritsFiltrees)">Exporter Inscrits (CSV)</button>
        </div>

        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Sexe</th>
              <th>Âge</th>
              <th>Filière</th>
              <th>Année</th>
              <th>Photo</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(etudiant, i) in inscritsFiltrees" :key="i">
              <td>{{ etudiant.nom }}</td>
              <td>{{ etudiant.prenom }}</td>
              <td>{{ etudiant.sexe }}</td>
              <td>{{ etudiant.age }}</td>
              <td>{{ etudiant.filiere }}</td>
              <td>{{ etudiant.annee }}</td>
              <td>
                <img v-if="etudiant.photo" :src="etudiant.photo" alt="Photo" style="width: 50px; height: 50px; object-fit: cover;" />
                <span v-else>Aucune</span>
              </td>
            </tr>
            <tr v-if="inscritsFiltrees.length === 0">
              <td colspan="7" class="text-center fst-italic">Aucun étudiant inscrit.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import SkeletonLoader from '@/components/SkeletonLoader.vue'
import { ref, computed, onMounted } from 'vue'

const loading = ref(true)
const academicYears = ref([])
const selectedYear = ref('')
const selectedFiliere = ref('')
const rechercheNom = ref('')
const recherchePrenom = ref('')
const inscriptions = ref([])
const inscrits = ref([])
const pageCourante = ref(1)
const pageSize = 5

const filtreInscritsNom = ref('')
const filtreInscritsPrenom = ref('')
const filtreInscritsYear = ref('')
const filtreInscritsFiliere = ref('')

const filieresDisponibles = computed(() => {
  const all = [...inscriptions.value, ...inscrits.value]
  const set = new Set(all.map(c => c.filiere).filter(Boolean))
  return Array.from(set)
})

onMounted(() => {
  const savedAdmis = localStorage.getItem('admis')
  const savedFinal = localStorage.getItem('inscriptionsFinales')
  inscriptions.value = []
  if (savedAdmis) {
    const admis = JSON.parse(savedAdmis)
    inscriptions.value = admis.map(c => ({ ...c, inscrit: false }))
  }
  if (savedFinal) {
    inscrits.value = JSON.parse(savedFinal)
  }
  const annees = new Set([...inscriptions.value, ...inscrits.value].map(c => c.concours || c.annee))
  academicYears.value = Array.from(annees).sort()
  loading.value = false
})

function validerInscription(c) {
  c.inscrit = true
  const newInscrit = { ...c, annee: c.concours, paiement: 'non' }
  inscrits.value.push(newInscrit)
  inscriptions.value = inscriptions.value.filter(i => i !== c)
  localStorage.setItem('inscriptionsFinales', JSON.stringify(inscrits.value))
  const admis = JSON.parse(localStorage.getItem('admis') || '[]')
  const newAdmis = admis.filter(a => !(a.nom === c.nom && a.prenom === c.prenom))
  localStorage.setItem('admis', JSON.stringify(newAdmis))
}

const inscriptionsFiltrees = computed(() =>
  inscriptions.value.filter(c =>
    c.nom.toLowerCase().includes(rechercheNom.value.toLowerCase()) &&
    c.prenom.toLowerCase().includes(recherchePrenom.value.toLowerCase()) &&
    (!selectedFiliere.value || c.filiere === selectedFiliere.value) &&
    (!selectedYear.value || c.concours === selectedYear.value)
  )
)

const inscritsFiltrees = computed(() =>
  inscrits.value.filter(c =>
    c.nom.toLowerCase().includes(filtreInscritsNom.value.toLowerCase()) &&
    c.prenom.toLowerCase().includes(filtreInscritsPrenom.value.toLowerCase()) &&
    (!filtreInscritsFiliere.value || c.filiere === filtreInscritsFiliere.value) &&
    (!filtreInscritsYear.value || c.annee === filtreInscritsYear.value)
  )
)

const totalPages = computed(() => Math.ceil(inscriptionsFiltrees.value.length / pageSize))
const inscriptionsPage = computed(() => {
  const start = (pageCourante.value - 1) * pageSize
  return inscriptionsFiltrees.value.slice(start, start + pageSize)
})

function exportCSV(data) {
  const rows = [
    ['Nom', 'Prénom', 'Sexe', 'Âge', 'Filière', 'Année', 'Photo'],
    ...data.map(c => [c.nom, c.prenom, c.sexe, c.age, c.filiere, c.concours || c.annee, c.photo || ''])
  ]
  const csvContent = rows.map(e => e.join(",")).join("\n")
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.setAttribute('download', 'export.csv')
  link.click()
}
</script>

<style scoped>
.badge {
  padding: 0.4rem 0.6rem;
  font-size: 0.75rem;
}
</style>
