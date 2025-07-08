<script setup>
import { ref, computed, onMounted, watch } from 'vue'

// Filtres
const filterNom = ref('')
const filterPrenom = ref('')
const selectedFiliere = ref('')
const selectedClasse = ref('')
const selectedNiveau = ref('')

// Données LocalStorage
const etudiants = ref([])
const classes = ref([])
const filieres = ref([])

// Pagination
const currentPage = ref(1)
const itemsPerPage = ref(5)
const totalItems = computed(() => filteredEtudiants.value.length)

const paginatedEtudiants = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredEtudiants.value.slice(start, end)
})

// Filtrer étudiants
const filteredEtudiants = computed(() => {
  return etudiants.value.filter(e => {
    return (
      (!selectedFiliere.value || e.filiere === selectedFiliere.value) &&
      (!selectedClasse.value || e.classe === selectedClasse.value) &&
      (!selectedNiveau.value || e.niveau === selectedNiveau.value) &&
      (!filterNom.value || e.nom.toLowerCase().includes(filterNom.value.toLowerCase())) &&
      (!filterPrenom.value || e.prenom.toLowerCase().includes(filterPrenom.value.toLowerCase()))
    )
  })
})

// Charger données locales
const chargerDonnees = () => {
  const candidats = JSON.parse(localStorage.getItem('candidats') || '[]')
  const classesLS = JSON.parse(localStorage.getItem('classes') || '[]')
  const filieresLS = JSON.parse(localStorage.getItem('filieres') || '[]')

  // Générer matricule pour chaque candidat
  etudiants.value = candidats.map((c, i) => ({
    ...c,
    matricule: `${(c.nom || '').substring(0, 3).toUpperCase()}${(c.prenom || '').substring(0, 3).toUpperCase()}-${(c.filiere || '').substring(0, 3).toUpperCase()}-${c.niveau || ''}-${i + 1}`,
    photo: c.photo || '/img/default-profile.png'
  }))

  classes.value = classesLS
  filieres.value = filieresLS
}

onMounted(() => {
  chargerDonnees()
})

// Classes filtrées par filière sélectionnée
const classesFiltrees = computed(() => {
  return classes.value.filter(c => c.filiere === selectedFiliere.value)
})

// Attribution aléatoire
const assignerClasseAleatoire = () => {
  if (!selectedFiliere.value || !selectedClasse.value) {
    alert('Sélectionne une filière et une classe cible.')
    return
  }

  const candidatsFiliere = etudiants.value.filter(e => e.filiere === selectedFiliere.value)
  const nouveaux = candidatsFiliere.map(e => ({ ...e, classe: selectedClasse.value }))
  etudiants.value = etudiants.value.map(e => {
    const match = nouveaux.find(n => n.nom === e.nom && n.prenom === e.prenom)
    return match || e
  })

  // Sauvegarder le changement
  localStorage.setItem('candidats', JSON.stringify(etudiants.value))
  alert('Étudiants assignés !')
}
</script>

<template>
  <div class="p-3">
    <h4>🎓 Étudiants Inscrits</h4>

    <!-- Filtres -->
    <div class="row g-2 mb-3">
      <div class="col-md-2">
        <label class="form-label">Filière</label>
        <select class="form-select" v-model="selectedFiliere">
          <option value="">Toutes</option>
          <option v-for="fil in filieres" :key="fil.id" :value="fil.nom">{{ fil.nom }}</option>
        </select>
      </div>

      <div class="col-md-2">
        <label class="form-label">Classe</label>
        <select class="form-select" v-model="selectedClasse">
          <option value="">Toutes</option>
          <option v-for="cls in classesFiltrees" :key="cls.id" :value="cls.nom">{{ cls.nom }}</option>
        </select>
      </div>

      <div class="col-md-2">
        <label class="form-label">Niveau</label>
        <input type="text" class="form-control" v-model="selectedNiveau" placeholder="Ex: L1" />
      </div>

      <div class="col-md-2">
        <label class="form-label">Nom</label>
        <input type="text" class="form-control" v-model="filterNom" placeholder="Nom" />
      </div>

      <div class="col-md-2">
        <label class="form-label">Prénom</label>
        <input type="text" class="form-control" v-model="filterPrenom" placeholder="Prénom" />
      </div>
    </div>

    <!-- Table des étudiants -->
    <table class="table table-hover align-middle">
      <thead>
        <tr>
          <th>#</th>
          <th>Photo</th>
          <th>Matricule</th>
          <th>Nom</th>
          <th>Prénom</th>
          <th>Filière</th>
          <th>Niveau</th>
          <th>Classe</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(e, i) in paginatedEtudiants" :key="i">
          <td>{{ i + 1 }}</td>
          <td><img :src="e.photo" alt="Photo" style="width:40px; height:40px; border-radius:50%;" /></td>
          <td>{{ e.matricule }}</td>
          <td>{{ e.nom }}</td>
          <td>{{ e.prenom }}</td>
          <td>{{ e.filiere }}</td>
          <td>{{ e.niveau }}</td>
          <td>{{ e.classe }}</td>
        </tr>
        <tr v-if="paginatedEtudiants.length === 0">
          <td colspan="8" class="text-center text-muted">Aucun étudiant trouvé.</td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination simple -->
    <div class="d-flex justify-content-between align-items-center">
      <span>Page {{ currentPage }}</span>
      <div class="btn-group">
        <button class="btn btn-sm btn-outline-secondary" :disabled="currentPage === 1" @click="currentPage--">Précédent</button>
        <button class="btn btn-sm btn-outline-secondary" :disabled="currentPage >= Math.ceil(totalItems / itemsPerPage)" @click="currentPage++">Suivant</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
table img {
  object-fit: cover;
}
</style>
