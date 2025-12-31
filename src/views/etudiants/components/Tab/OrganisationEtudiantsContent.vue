<template>
  <div class="row">
    <div class="col-12 mb-3">
      <h4>Organisation des étudiants</h4>
      <p class="text-muted">Assignez les étudiants à des groupes, clubs ou projets.</p>
    </div>

    <!-- Filtres + Recherche -->
    <div class="col-12 mb-3">
      <div class="card">
        <div class="card-body">
          <div class="row g-3 align-items-end">
            <!-- Année académique -->
            <div class="col-md-3">
              <label class="form-label">Année académique</label>
              <select v-model="selectedAnnee" class="form-select">
                <option value="">Toutes</option>
                <option v-for="annee in annees" :key="annee" :value="annee">{{ annee }}</option>
              </select>
            </div>

            <!-- Filière -->
            <div class="col-md-3">
              <label class="form-label">Filière</label>
              <select v-model="selectedFiliere" class="form-select">
                <option value="">Toutes</option>
                <option v-for="f in filieres" :key="f" :value="f">{{ f }}</option>
              </select>
            </div>

            <!-- Classe -->
            <div class="col-md-3">
              <label class="form-label">Classe</label>
              <select v-model="selectedClasse" class="form-select">
                <option value="">Toutes</option>
                <option v-for="c in classes" :key="c" :value="c">{{ c }}</option>
              </select>
            </div>

            <!-- Recherche -->
            <div class="col-md-3">
              <label class="form-label">Recherche</label>
              <div class="input-group search-bar">
                <span class="input-group-text bg-primary text-white">
                  <i class="mdi mdi-magnify"></i>
                </span>
                <input
                  v-model="searchQuery"
                  type="text"
                  class="form-control"
                  placeholder="Matricule, nom ou prénom..."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Organisation par groupes -->
    <div class="col-12">
      <div class="card">
        <div class="card-body">
          <h5 class="mb-3">Groupes d’étudiants</h5>
          <div class="row">
            <div class="col-md-4" v-for="groupe in groupes" :key="groupe.id">
              <div class="border rounded p-3 mb-3">
                <h6>{{ groupe.nom }}</h6>
                <ul class="list-group list-group-flush">
                  <li
                    v-for="etudiant in etudiantsParGroupe(groupe.id)"
                    :key="etudiant.id"
                    class="list-group-item d-flex justify-content-between align-items-center"
                  >
                    {{ etudiant.nom }} {{ etudiant.prenom }}
                    <button
                      class="btn btn-sm btn-outline-danger"
                      @click="retirerDuGroupe(etudiant.id, groupe.id)"
                    >
                      Retirer
                    </button>
                  </li>
                </ul>
                <div class="mt-2">
                  <button
                    class="btn btn-sm btn-outline-primary w-100"
                    @click="ajouterAuGroupe(groupe.id)"
                  >
                    + Ajouter étudiant
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const loading = ref(false)
const etudiants = ref([])

// Filtres
const annees = ref(['2023-2024', '2024-2025'])
const filieres = ref(['Informatique', 'Administration'])
const classes = ref(['L1-INFO-A', 'L2-INFO-B', 'M1-ADM-A'])

const selectedAnnee = ref('')
const selectedFiliere = ref('')
const selectedClasse = ref('')
const searchQuery = ref('')

// Groupes
const groupes = ref([
  { id: 1, nom: 'Groupe TP1' },
  { id: 2, nom: 'Projet Web' },
  { id: 3, nom: 'Club Robotique' },
])

// Filtrage
const filteredEtudiants = computed(() => {
  return etudiants.value.filter((e) => {
    const matchAnnee = !selectedAnnee.value || e.annee_academique === selectedAnnee.value
    const matchFiliere = !selectedFiliere.value || e.filiere === selectedFiliere.value
    const matchClasse = !selectedClasse.value || e.classe === selectedClasse.value
    const matchSearch =
      !searchQuery.value ||
      [e.matricule, e.nom, e.prenom].join(' ').toLowerCase().includes(searchQuery.value.toLowerCase())
    return matchAnnee && matchFiliere && matchClasse && matchSearch
  })
})

// Organisation
const affectations = ref({}) // { etudiantId: groupeId }

const etudiantsParGroupe = (groupeId) => {
  return etudiants.value.filter((e) => affectations.value[e.id] === groupeId)
}

const ajouterAuGroupe = (groupeId) => {
  const etudiant = filteredEtudiants.value[0] // exemple: premier étudiant filtré
  if (etudiant) affectations.value[etudiant.id] = groupeId
}

const retirerDuGroupe = (etudiantId, groupeId) => {
  if (affectations.value[etudiantId] === groupeId) {
    delete affectations.value[etudiantId]
  }
}

// Simulation API
onMounted(() => {
  loading.value = true
  setTimeout(() => {
    etudiants.value = [
      {
        id: 1,
        matricule: 'E001',
        nom: 'Diallo',
        prenom: 'Mamadou',
        sexe: 'M',
        annee_academique: '2024-2025',
        filiere: 'Informatique',
        classe: 'L1-INFO-A',
      },
      {
        id: 2,
        matricule: 'E002',
        nom: 'Ndiaye',
        prenom: 'Awa',
        sexe: 'F',
        annee_academique: '2024-2025',
        filiere: 'Informatique',
        classe: 'L2-INFO-B',
      },
      {
        id: 3,
        matricule: 'E003',
        nom: 'Kouassi',
        prenom: 'Jean',
        sexe: 'M',
        annee_academique: '2023-2024',
        filiere: 'Administration',
        classe: 'M1-ADM-A',
      },
    ]
    loading.value = false
  }, 2000)
})
</script>

<style scoped>
.search-bar .form-control {
  border-radius: 0 6px 6px 0;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
}
.search-bar .input-group-text {
  border-radius: 6px 0 0 6px;
  font-weight: bold;
}
</style>

