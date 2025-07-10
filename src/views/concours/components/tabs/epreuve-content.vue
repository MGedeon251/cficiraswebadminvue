<template>
  <div class="row">
    <div class="col-md-12 grid-margin">
      <div class="d-flex justify-content-between flex-wrap">
        <div class="d-flex align-items-end flex-wrap">
          <div class="me-md-3 me-xl-5">
            <h3>Epreuves - {{'Concours Informatique 2024'}}</h3>
            <p>Détails sur les épreuves</p>
          </div>
        </div>
        <div class="d-flex justify-content-between align-items-end flex-wrap">
          <div class="dropdown me-2">
            <button class="btn btn-sm btn-outline-secondary" data-bs-toggle="dropdown">
              <i class="mdi mdi-dots-vertical"></i>
            </button>
            <ul class="dropdown-menu dropdown-menu-end">
              <li><a class="dropdown-item" href="#"><i class="mdi mdi-file-excel me-2"></i>Exporter Excel</a></li>
              <li><a class="dropdown-item" href="#"><i class="mdi mdi-printer me-2"></i>Imprimer</a></li>
              <li><hr class="dropdown-divider" /></li>
              <li><a class="dropdown-item" href="#"><i class="mdi mdi-cog me-2"></i>Paramètres</a></li>
            </ul>
          </div>
          <button class="btn btn-outline-dark me-2">PDF</button>
        </div>
      </div>

      <div class="table-responsive mt-3">
        <table class="table table-hover align-middle">
          <thead class="table-light">
            <tr>
              <th>Code</th>
              <th>Intitulé</th>
              <th>Coefficient</th>
              <th>Heure début</th>
              <th>Heure fin</th>
              <th>Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(epreuve, index) in epreuves" :key="index">
              <td><input v-model="epreuve.code" type="text" class="form-control" placeholder="EX01" /></td>
              <td><input v-model="epreuve.designation" type="text" class="form-control" placeholder="Mathématiques" /></td>
              <td><input v-model.number="epreuve.coefficient" type="number" class="form-control" min="1" /></td>
              <td><input v-model="epreuve.heure_debut" type="time" class="form-control" /></td>
              <td><input v-model="epreuve.heure_fin" type="time" class="form-control" /></td>
              <td>
                <select v-model="epreuve.type_epreuve" class="form-select">
                  <option value="écrit">Écrit</option>
                  <option value="oral">Oral</option>
                  <option value="pratique">Pratique</option>
                </select>
              </td>
              <td>
                <button class="btn btn-sm b me-1" @click="saveEpreuve(epreuve)">
                  <i class="mdi mdi-content-save"></i>
                </button>
                <button class="btn btn-sm " @click="removeEpreuve(index)">
                  <i class="mdi mdi-delete"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <button class="btn btn-outline-primary mt-3" @click="addEpreuve">
          + Ajouter une épreuve
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const epreuves = ref([])

const addEpreuve = () => {
  epreuves.value.push({
    code: '',
    designation: '',
    coefficient: 1,
    heure_debut: '',
    heure_fin: '',
    type_epreuve: 'écrit',
    ordre: 1,
    description: 'N/A'
  })
}

const removeEpreuve = (index) => {
  epreuves.value.splice(index, 1)
}

const saveEpreuve = async (epreuve) => {
  try {
    // Ajouter ici l’appel à l’API backend ou la logique de persistance
    if (epreuve.id) {
      console.log('Mise à jour de :', epreuve)
    } else {
      console.log('Création de :', epreuve)
    }
    alert('Épreuve sauvegardée avec succès !')
  } catch (err) {
    console.error(err)
    alert('Erreur lors de la sauvegarde')
  }
}
</script>
