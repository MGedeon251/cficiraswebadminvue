<template>
  <div class="validation-candidats">
    <h2>Validation des candidats au concours</h2>

    <!-- Filtres haut -->
    <div class="form-filtres">
      <div class="filtre-item">
        <label for="filtre-filiere">Filière :</label>
        <select id="filtre-filiere" v-model="filiereFiltre">
          <option value="">-- Toutes les filières --</option>
          <option v-for="(filiere, index) in filieresDisponibles" :key="index" :value="filiere">
            {{ filiere }}
          </option>
        </select>
      </div>

      <div class="filtre-item">
        <label>Nom :</label>
        <input type="text" v-model="rechercheNom" placeholder="Rechercher par nom..." />
      </div>

      <div class="filtre-item">
        <label>Prénom :</label>
        <input type="text" v-model="recherchePrenom" placeholder="Rechercher par prénom..." />
      </div>

      <div class="filtre-item">
        <label>Année :</label>
        <select v-model="anneeSelectionnee">
          <option value="">-- Toutes --</option>
          <option v-for="(annee, i) in anneesDisponibles" :key="i" :value="annee">
            {{ annee }}
          </option>
        </select>
      </div>
    </div>

    <!-- Table des candidats à valider -->
    <table class="table">
      <thead>
        <tr>
          <th>Nom</th>
          <th>Prénom</th>
          <th>Sexe</th>
          <th>Âge</th>
          <th>Filière</th>
          <th>Année</th>
          <th>Admis ?</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(c, index) in candidatsFiltres" :key="index" :class="{ admis: estAdmis(c) }">
          <td>{{ c.nom }}</td>
          <td>{{ c.prenom }}</td>
          <td>{{ c.sexe?.charAt(0).toUpperCase() }}</td>
          <td>{{ c.age }}</td>
          <td>{{ c.filiere }}</td>
          <td>{{ c.concours }}</td>
          <td>
            <input
              type="checkbox"
              :disabled="estAdmis(c)"
              v-model="selectionCandidats"
              :value="c"
            />
          </td>
        </tr>
        <tr v-if="candidatsFiltres.length === 0">
          <td colspan="7" style="text-align: center; font-style: italic">
            Aucun candidat trouvé pour ce filtre.
          </td>
        </tr>
      </tbody>
    </table>

    <button class="btn-valider" :disabled="selectionCandidats.length === 0" @click="validerSelection">
      Valider la sélection
    </button>

    <hr style="margin: 2rem 0" />

    <!-- Filtres pour la section admis -->
    <div class="form-filtres">
      <div class="filtre-item">
        <label>Filière :</label>
        <select v-model="filiereAffichage">
          <option value="">-- Toutes --</option>
          <option v-for="(filiere, index) in filieresDisponibles" :key="index" :value="filiere">
            {{ filiere }}
          </option>
        </select>
      </div>

      <div class="filtre-item">
        <label>Nom :</label>
        <input type="text" v-model="rechercheNomAdmis" placeholder="Rechercher par nom..." />
      </div>

      <div class="filtre-item">
        <label>Prénom :</label>
        <input type="text" v-model="recherchePrenomAdmis" placeholder="Rechercher par prénom..." />
      </div>

      <div class="filtre-item">
        <label>Année :</label>
        <select v-model="anneeAdmis">
          <option value="">-- Toutes --</option>
          <option v-for="(annee, i) in anneesDisponibles" :key="i" :value="annee">
            {{ annee }}
          </option>
        </select>
      </div>
    </div>

    <div class="liste-admis">
      <h3>✅ Liste des candidats admis</h3>
      <table class="table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Sexe</th>
            <th>Âge</th>
            <th>Filière</th>
            <th>Année</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="candidat in admisPage" :key="candidat.nom + candidat.prenom">
            <td>{{ candidat.nom }}</td>
            <td>{{ candidat.prenom }}</td>
            <td>{{ candidat.sexe?.charAt(0).toUpperCase() }}</td>
            <td>{{ candidat.age }}</td>
            <td>{{ candidat.filiere }}</td>
            <td>{{ candidat.concours }}</td>
            <td>
              <button @click="candidatActuel = candidat">Détails</button>
              <button @click="supprimerCandidat(candidat)">Supprimer</button>
            </td>
          </tr>
          <tr v-if="admisFiltres.length === 0">
            <td colspan="7" style="text-align: center; font-style: italic">
              Aucun candidat admis trouvé.
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="admisFiltres.length > pageSize" class="pagination">
        <button :disabled="pageCourante === 1" @click="pageCourante--">Précédent</button>
        <span>Page {{ pageCourante }} / {{ totalPages }}</span>
        <button :disabled="pageCourante === totalPages" @click="pageCourante++">Suivant</button>
      </div>
    </div>

    <!-- Modal Détails -->
    <div v-if="candidatActuel" class="modal">
      <div class="modal-content">
        <span class="close" @click="candidatActuel = null">&times;</span>
        <h3>Détails du candidat</h3>
        <div class="details">
          <p><strong>Nom :</strong> {{ candidatActuel.nom }}</p>
          <p><strong>Prénom :</strong> {{ candidatActuel.prenom }}</p>
          <p><strong>Sexe :</strong> {{ candidatActuel.sexe }}</p>
          <p><strong>Âge :</strong> {{ candidatActuel.age }}</p>
          <p><strong>Date de naissance :</strong> {{ candidatActuel.dateNaissance }}</p>
          <p><strong>Lieu de naissance :</strong> {{ candidatActuel.lieuNaissance }}</p>
          <p><strong>Nationalité :</strong> {{ candidatActuel.nationalite }}</p>
          <p><strong>Adresse :</strong> {{ candidatActuel.adresse }}</p>
          <p><strong>Arrondissement :</strong> {{ candidatActuel.arrondissement }}</p>
          <p><strong>Série :</strong> {{ candidatActuel.serie }}</p>
          <p><strong>Catégorie :</strong> {{ candidatActuel.categorie }}</p>
          <p><strong>Email :</strong> {{ candidatActuel.email }}</p>
          <p><strong>Téléphone :</strong> {{ candidatActuel.numero }}</p>
          <p><strong>Nom du tuteur :</strong> {{ candidatActuel.tuteurNom }}</p>
          <p><strong>Téléphone tuteur :</strong> {{ candidatActuel.tuteurNumero }}</p>
          <p><strong>Filière :</strong> {{ candidatActuel.filiere }}</p>
          <p><strong>Année du concours :</strong> {{ candidatActuel.concours }}</p>
          <div v-if="candidatActuel.photo">
            <p><strong>Photo :</strong></p>
            <img :src="candidatActuel.photo" alt="Photo" style="width: 130px; height: 160px; object-fit: cover;" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'

const candidats = ref([])
const admis = ref([])
const selectionCandidats = ref([])
const candidatActuel = ref(null)

const filiereFiltre = ref('')
const filiereAffichage = ref('')
const anneeSelectionnee = ref('')
const anneeAdmis = ref('')
const rechercheNom = ref('')
const recherchePrenom = ref('')
const rechercheNomAdmis = ref('')
const recherchePrenomAdmis = ref('')

const pageCourante = ref(1)
const pageSize = 15

onMounted(() => {
  const savedCandidats = localStorage.getItem('candidats')
  if (savedCandidats) candidats.value = JSON.parse(savedCandidats)

  const savedAdmis = localStorage.getItem('admis')
  if (savedAdmis) admis.value = JSON.parse(savedAdmis)
})

watch(admis, (nv) => {
  localStorage.setItem('admis', JSON.stringify(nv))
}, { deep: true })

const filieresDisponibles = computed(() =>
  [...new Set(candidats.value.map((c) => c.filiere))].filter(Boolean)
)

const anneesDisponibles = computed(() =>
  [...new Set(candidats.value.map((c) => c.concours))].filter(Boolean).sort()
)

function estAdmis(c) {
  return admis.value.some((a) => a.nom === c.nom && a.prenom === c.prenom)
}

function validerSelection() {
  selectionCandidats.value.forEach((c) => {
    if (!estAdmis(c)) admis.value.push(c)
  })
  selectionCandidats.value = []
}

function supprimerCandidat(candidat) {
  admis.value = admis.value.filter(a => !(a.nom === candidat.nom && a.prenom === candidat.prenom))
}

const candidatsFiltres = computed(() =>
  candidats.value.filter((c) => {
    const matchFiliere = !filiereFiltre.value || c.filiere === filiereFiltre.value
    const matchNom = c.nom?.toLowerCase().includes(rechercheNom.value.toLowerCase())
    const matchPrenom = c.prenom?.toLowerCase().includes(recherchePrenom.value.toLowerCase())
    const matchAnnee = !anneeSelectionnee.value || c.concours === anneeSelectionnee.value
    return matchFiliere && matchNom && matchPrenom && matchAnnee && !estAdmis(c)
  })
)

const admisFiltres = computed(() =>
  admis.value.filter((c) => {
    const matchFiliere = !filiereAffichage.value || c.filiere === filiereAffichage.value
    const matchNom = c.nom?.toLowerCase().includes(rechercheNomAdmis.value.toLowerCase())
    const matchPrenom = c.prenom?.toLowerCase().includes(recherchePrenomAdmis.value.toLowerCase())
    const matchAnnee = !anneeAdmis.value || c.concours === anneeAdmis.value
    return matchFiliere && matchNom && matchPrenom && matchAnnee
  })
)

const totalPages = computed(() => Math.ceil(admisFiltres.value.length / pageSize))
const admisPage = computed(() => {
  const start = (pageCourante.value - 1) * pageSize
  return admisFiltres.value.slice(start, start + pageSize)
})

watch([filiereAffichage, admisFiltres], () => {
  pageCourante.value = 1
})
</script>


<style scoped>
.validation-candidats {
  max-width: 1100px;
  margin: auto;
  padding: 1rem;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
}
h2, h3 {
  font-weight: 600;
  margin-bottom: 1rem;
  color: #333;
}
.form-filtres {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
}
.filtre-item {
  display: flex;
  flex-direction: column;
}
.filtre-item input,
.filtre-item select {
  padding: 0.4rem;
  font-size: 0.85rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  min-width: 150px;
}
.table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}
.table thead {
  background-color: #f0f0f0;
}
.table th,
.table td {
  padding: 0.6rem 0.8rem;
  border: 1px solid #ddd;
  text-align: left;
}
.admis {
  color: green;
  font-weight: 600;
}
.btn-valider {
  background-color: #007bff;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  margin-bottom: 2rem;
}
.btn-valider:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
}
.pagination button {
  padding: 0.4rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
}
.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal-content {
  background: white;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
}
.close {
  float: right;
  font-size: 1.5rem;
  cursor: pointer;
}
.details p {
  margin-bottom: 0.4rem;
}

</style>
