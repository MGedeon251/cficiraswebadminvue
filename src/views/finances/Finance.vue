<template>
  <div>
      <div class="row">
          <div class="col-md-12 grid-margin">
              <div class="d-flex justify-content-between flex-wrap">
                  <div class="d-flex align-items-end flex-wrap">
                      <div class="me-md-3 me-xl-5">
                          <h2>Planification calendrier</h2>
                          <p class="mb-md-0">Gestion des finances</p>
                      </div>
                  
                  </div>
                  <div class="d-flex justify-content-between align-items-end flex-wrap">
                    <div class="d-flex gap-2">
                <button class="btn btn-sm btn-outline-primary" @click="toggleFilters">
                  <i class="mdi mdi-filter me-1"></i>
                </button>
                <div class="dropdown">
                  <button class="btn btn-sm btn-outline-secondary" data-bs-toggle="dropdown">
                    <i class="mdi mdi-dots-vertical"></i>
                  </button>
                  <ul class="dropdown-menu dropdown-menu-end">
                    <li><a class="dropdown-item" href="#"><i class="mdi mdi-file-excel me-2"></i> Exporter Excel</a></li>
                    <li><a class="dropdown-item" href="#"><i class="mdi mdi-printer me-2"></i> Imprimer</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" href="#"><i class="mdi mdi-cog me-2"></i> Paramètres</a></li>
                  </ul>
                </div>
                <div class="btn-group">
            <button
              type="button"
              class="btn btn-primary mt-2 mt-xl-0"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              aria-hidden="true"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
            >
              + Ajouter
            </button>
            <button
              type="button"
              class="btn btn-primary dropdown-toggle dropdown-toggle-split"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span class="visually-hidden">Toggle Dropdown</span>
            </button>
            <ul class="dropdown-menu">
              <li>
                <a class="dropdown-item" href="#drop_table">Importer fichier</a>
              </li>
            </ul>
          </div>
              </div>
                  </div>
              </div>
          </div>
      </div>
      <div class="row">
          <div class="container my-2">
              <div class="col-md-12 grid margin stretch-card">
                  <div class="card">
                      <div class="card-body">
                          <div>
                              <h5 class="mb-3">Calendrier des épreuves -
                                  {{ 'LIC-INFO-A' }}</h5>

                              <div class="table-responsive">
                                  <table class="table table-bordered">
                                      <thead class="table-light">
                                          <tr>
                                              <th>Module</th>
                                              <th>Date</th>
                                              <th>Heure début</th>
                                              <th>Heure fin</th>
                                              <th>Type</th>
                                              <th>Statut</th>
                                              <th>Action</th>
                                          </tr>
                                      </thead>
                                      <tbody>
                                          <tr v-for="(epreuve, index) in epreuves" :key="epreuve.id || index">
                                              <td><input v-model="epreuve.module" class="form-control"/></td>
                                              <td><input type="date" v-model="epreuve.date_epreuve" class="form-control"/></td>
                                              <td><input type="time" v-model="epreuve.heure_debut" class="form-control"/></td>
                                              <td><input type="time" v-model="epreuve.heure_fin" class="form-control"/></td>
                                              <td>
                                                  <select v-model="epreuve.type_epreuve" class="form-select">
                                                      <option value="écrit">Écrit</option>
                                                      <option value="oral">Oral</option>
                                                      <option value="pratique">Pratique</option>
                                                  </select>
                                              </td>
                                              <td>
                                                  <span class="badge bg-info">{{ epreuve.statut }}</span>
                                              </td>
                                              <td>
                                                  <button class="btn btn-success btn-sm" @click="saveEpreuve(epreuve)">
                                                      <i class="mdi mdi-content-save"></i>
                                                  </button>
                                              </td>
                                          </tr>
                                      </tbody>
                                  </table>
                              </div>

                              <button class="btn btn-outline-primary mt-3" @click="addEpreuve">+ Ajouter une épreuve</button>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'

const props = defineProps({
  examenId: Number, // id de examens_planifies
  classe: Object, // info sur la classe (optionnel)
})

const epreuves = ref([
  // à remplacer par un fetch si besoin
  // Exemple vide initial
])

// Simule un ajout d’épreuve
const addEpreuve = () => {
  epreuves.value.push({
    module: '',
    enseignant: '',
    date_epreuve: '',
    heure_debut: '',
    heure_fin: '',
    salle: '',
    type_epreuve: 'écrit',
    statut: 'prévu',
  })
}

// Simule une sauvegarde (à remplacer par un appel API)
const saveEpreuve = async (epreuve) => {
  try {
    if (epreuve.id) {
      // Mettre à jour
      console.log('Update epreuve :', epreuve)
    } else {
      // Créer
      console.log('Create epreuve :', epreuve)
    }
    alert('Epreuve sauvegardée avec succès')
  } catch (err) {
    console.error(err)
    alert("Erreur lors de la sauvegarde")
  }
}
</script>

<style scoped>
.badge {
  font-size: 0.8rem;
}
</style>