<template>
  <div class="container-fluid p-0">
    <!-- Header avec actions globales -->
    <div class="row mb-4 align-items-center">
      <div class="col">
        <h4 class="fw-bold mb-1 text-dark">Organisation de la Scolarité</h4>
        <p class="text-muted small mb-0">
          Répartition des étudiants dans les groupes pédagogiques et projets.
        </p>
      </div>
      <div class="col-auto">
        <button class="btn btn-primary shadow-sm" @click="creerGroupe">
          <i class="mdi mdi-plus me-1"></i> Nouveau Groupe
        </button>
      </div>
    </div>

    <!-- Zone de Filtres "Flat" -->
    <div class="card border-0 shadow-sm mb-4">
      <div class="card-body bg-light rounded">
        <div class="row g-3">
          <div class="col-md-3">
            <select v-model="selectedAnnee" class="form-select border-0 shadow-sm">
              <option value="">Toutes les Années</option>
              <option v-for="annee in annees" :key="annee" :value="annee">{{ annee }}</option>
            </select>
          </div>
          <div class="col-md-3">
            <select v-model="selectedFiliere" class="form-select border-0 shadow-sm">
              <option value="">Toutes les Filières</option>
              <option v-for="f in filieres" :key="f" :value="f">{{ f }}</option>
            </select>
          </div>
          <div class="col-md-4">
            <div class="input-group shadow-sm">
              <span class="input-group-text bg-white border-0"
                ><i class="mdi mdi-magnify"></i
              ></span>
              <input
                v-model="searchQuery"
                type="text"
                class="form-control border-0"
                placeholder="Rechercher un étudiant..."
              />
            </div>
          </div>
          <div class="col-md-2 text-end">
            <div class="form-check form-switch pt-2">
              <input class="form-check-input" type="checkbox" v-model="showOnlyUnassigned" />
              <label class="form-check-label small fw-bold">Non assignés</label>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row g-4">
      <!-- Colonne de gauche : Vivier d'étudiants -->
      <div class="col-lg-4">
        <div class="card border-0 shadow-sm h-100">
          <div
            class="card-header bg-white py-3 border-bottom d-flex justify-content-between align-items-center"
          >
            <h6 class="mb-0 fw-bold">Étudiants disponibles</h6>
            <span class="badge bg-soft-primary text-primary">{{ filteredEtudiants.length }}</span>
          </div>
          <div class="card-body p-0 scrollable-list" style="max-height: 600px; overflow-y: auto">
            <div v-if="loading" class="text-center p-5">
              <div class="spinner-border spinner-border-sm text-primary"></div>
            </div>
            <div
              v-else
              v-for="e in filteredEtudiants"
              :key="e.id"
              class="p-3 border-bottom student-item transition-all"
            >
              <div class="d-flex align-items-center">
                <div class="avatar-sm bg-info-lighten text-info rounded-circle p-2 me-3">
                  {{ e.prenom[0] }}{{ e.nom[0] }}
                </div>
                <div class="flex-grow-1">
                  <h6 class="mb-0 fs-14 fw-bold">{{ e.prenom }} {{ e.nom }}</h6>
                  <small class="text-muted">{{ e.matricule }} • {{ e.classe }}</small>
                </div>
                <div class="dropdown">
                  <button class="btn btn-sm btn-light dropdown-toggle" data-bs-toggle="dropdown">
                    Assigner
                  </button>
                  <ul class="dropdown-menu shadow border-0">
                    <li v-for="g in groupes" :key="g.id">
                      <a class="dropdown-item" href="#" @click.prevent="ajouterAuGroupe(e, g.id)">
                        {{ g.nom }}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Colonne de droite : Organisation des groupes -->
      <div class="col-lg-8">
        <div class="row g-3">
          <div class="col-md-6" v-for="groupe in groupes" :key="groupe.id">
            <div class="card border-0 shadow-sm h-100">
              <div
                class="card-header bg-white py-3 d-flex justify-content-between align-items-center border-0"
              >
                <div>
                  <h6 class="mb-0 fw-bold text-primary">{{ groupe.nom }}</h6>
                  <small class="text-muted"
                    >{{ etudiantsParGroupe(groupe.id).length }} étudiants</small
                  >
                </div>
                <div class="dropdown">
                  <i class="mdi mdi-dots-vertical cursor-pointer" data-bs-toggle="dropdown"></i>
                  <ul class="dropdown-menu border-0 shadow">
                    <li><a class="dropdown-item text-danger" href="#">Dissoudre le groupe</a></li>
                  </ul>
                </div>
              </div>
              <div class="card-body pt-0">
                <div class="bg-light rounded p-2" style="min-height: 150px">
                  <div
                    v-for="etudiant in etudiantsParGroupe(groupe.id)"
                    :key="etudiant.id"
                    class="d-flex align-items-center bg-white p-2 rounded mb-2 shadow-xs border shadow-sm"
                  >
                    <small class="flex-grow-1 fs-13 fw-semibold"
                      >{{ etudiant.nom }} {{ etudiant.prenom }}</small
                    >
                    <button
                      class="btn btn-link btn-sm text-danger p-0 ms-2"
                      @click="retirerDuGroupe(etudiant.id, groupe.id)"
                    >
                      <i class="mdi mdi-close-circle fs-18"></i>
                    </button>
                  </div>
                  <div
                    v-if="etudiantsParGroupe(groupe.id).length === 0"
                    class="text-center text-muted small py-4"
                  >
                    Aucun étudiant assigné
                  </div>
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
import { ref, computed, onMounted } from 'vue';

const loading = ref(false);
const etudiants = ref([]);

// Filtres
const annees = ref(['2023-2024', '2024-2025']);
const filieres = ref(['Informatique', 'Administration']);
const classes = ref(['L1-INFO-A', 'L2-INFO-B', 'M1-ADM-A']);

const selectedAnnee = ref('');
const selectedFiliere = ref('');
const selectedClasse = ref('');
const searchQuery = ref('');

// Groupes
const groupes = ref([
  { id: 1, nom: 'Groupe TP1' },
  { id: 2, nom: 'Projet Web' },
  { id: 3, nom: 'Club Robotique' },
]);

// Filtrage
const filteredEtudiants = computed(() => {
  return etudiants.value.filter((e) => {
    const matchAnnee = !selectedAnnee.value || e.annee_academique === selectedAnnee.value;
    const matchFiliere = !selectedFiliere.value || e.filiere === selectedFiliere.value;
    const matchClasse = !selectedClasse.value || e.classe === selectedClasse.value;
    const matchSearch =
      !searchQuery.value ||
      [e.matricule, e.nom, e.prenom]
        .join(' ')
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase());
    return matchAnnee && matchFiliere && matchClasse && matchSearch;
  });
});

// Organisation
const affectations = ref({}); // { etudiantId: groupeId }

const etudiantsParGroupe = (groupeId) => {
  return etudiants.value.filter((e) => affectations.value[e.id] === groupeId);
};

const ajouterAuGroupe = (groupeId) => {
  const etudiant = filteredEtudiants.value[0]; // exemple: premier étudiant filtré
  if (etudiant) affectations.value[etudiant.id] = groupeId;
};

const retirerDuGroupe = (etudiantId, groupeId) => {
  if (affectations.value[etudiantId] === groupeId) {
    delete affectations.value[etudiantId];
  }
};

// Simulation API
onMounted(() => {
  loading.value = true;
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
    ];
    loading.value = false;
  }, 2000);
});
</script>

<style scoped>
.fs-14 {
  font-size: 14px;
}
.fs-13 {
  font-size: 13px;
}
.bg-info-lighten {
  background-color: rgba(49, 191, 191, 0.15);
}
.student-item:hover {
  background-color: #fcfcfc;
}
.cursor-pointer {
  cursor: pointer;
}
.shadow-xs {
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.05);
}

/* Animation simple */
.transition-all {
  transition: all 0.2s ease-in-out;
}

/* Scrollbar personnalisée */
.scrollable-list::-webkit-scrollbar {
  width: 4px;
}
.scrollable-list::-webkit-scrollbar-thumb {
  background: #e3e3e3;
  border-radius: 10px;
}
</style>
