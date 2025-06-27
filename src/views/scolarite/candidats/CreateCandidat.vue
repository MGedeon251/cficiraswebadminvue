<template>
  <div class="formulaire">
    <form @submit.prevent="enregistrerCandidat">
      <div class="form-bloc">
        <!-- Zone des champs -->
        <div class="zone-champs">
          <!-- Champ Concours -->
          <div class="champ-full">
            <label for="concours">Concours en cours</label>
            <select id="concours" v-model="candidat.concours" :disabled="!concoursEnCours.length" required>
              <option disabled value="">-- Choisir un concours --</option>
              <option v-for="(c, i) in concoursEnCours" :key="i" :value="c.annee">
                {{ c.annee }}
              </option>
            </select>
            <p v-if="!concoursEnCours.length" style="color: red; font-size: 0.9rem; margin-top: 0.3rem;">
              Aucun concours en cours. Veuillez d’abord organiser un concours.
            </p>
          </div>

          <div class="ligne-champs" v-for="(ligne, i) in lignesChamps" :key="i">
            <div class="champ" v-for="champ in ligne" :key="champ.name">
              <label :for="champ.name">{{ champ.label }}</label>
              <input
                v-if="champ.type !== 'select'"
                :id="champ.name"
                :type="champ.type"
                v-model="candidat[champ.name]"
                :placeholder="champ.placeholder"
                required
              />
              <select v-else :id="champ.name" v-model="candidat[champ.name]" required>
                <option disabled value="">-- Choisir --</option>
                <option v-for="option in champ.options" :key="option" :value="option">
                  {{ option }}
                </option>
              </select>
            </div>
          </div>

          <!-- Filière -->
          <div class="champ-full">
            <label>Filière souhaitée</label>
            <select v-model="candidat.filiere" required>
              <option disabled value="">-- Choisir une filière --</option>
              <option
                v-for="(filiere, index) in filieresPremiereAnnee"
                :key="index"
                :value="filiere.nom"
              >
                {{ filiere.nom }} ({{ filiere.cycle }})
              </option>
            </select>
          </div>
        </div>

        <!-- Zone de photo -->
        <div class="zone-photo">
          <label>Photo d'identité</label>
          <input type="file" @change="chargerPhoto" accept="image/*" />
          <div v-if="candidat.photo" class="aperçu-photo">
            <img :src="candidat.photo" alt="Photo du candidat" />
          </div>
        </div>
      </div>

      <div class="pied-formulaire">
        <button type="submit" :disabled="!concoursEnCours.length">Enregistrer</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Données du candidat
const candidat = ref({
  concours: '',
  nom: '',
  prenom: '',
  age: '',
  sexe: '',
  dateNaissance: '',
  lieuNaissance: '',
  nationalite: '',
  adresse: '',
  arrondissement: '',
  serie: '',
  categorie: '',
  email: '',
  numero: '+242 ',
  tuteurNom: '',
  tuteurNumero: '+242 ',
  photo: null,
  filiere: ''
})

const concoursEnCours = ref([])
const filieres = ref([])

// Charger les données au montage
onMounted(() => {
  const savedFilieres = localStorage.getItem('filieres')
  if (savedFilieres) filieres.value = JSON.parse(savedFilieres)

  const savedConcours = localStorage.getItem('concours')
  if (savedConcours) {
    const tous = JSON.parse(savedConcours)
    concoursEnCours.value = tous.filter(c => c.etat.toLowerCase() === 'en cours')
  }
})

const filieresPremiereAnnee = computed(() =>
  filieres.value.filter(f => f.niveau?.toLowerCase().includes('1'))
)

function enregistrerCandidat() {
  if (!concoursEnCours.value.length) {
    alert("Aucun concours en cours. Veuillez organiser un concours avant d'enregistrer un candidat.")
    return
  }

  if (!candidat.value.concours) {
    alert("Veuillez sélectionner une année de concours.")
    return
  }

  // Sauvegarde dans le localStorage
  const anciens = JSON.parse(localStorage.getItem('candidats') || '[]')
  anciens.push({ ...candidat.value })
  localStorage.setItem('candidats', JSON.stringify(anciens))

  // Redirection vers la liste des candidats
  router.push('scolarite/candidats/candidats')
}

function chargerPhoto(e) {
  const file = e.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = () => (candidat.value.photo = reader.result)
    reader.readAsDataURL(file)
  }
}

const seriesBAC = ['A', 'B', 'C', 'D', 'E', 'F1', 'F2', 'G1', 'G2', 'H']
const nationalites = [
  '🇨🇬 Congolaise', '🇫🇷 Française', '🇨🇲 Camerounaise', '🇳🇬 Nigériane', '🇲🇱 Malienne',
  '🇸🇳 Sénégalaise', '🇨🇮 Ivoirienne', '🇷🇼 Rwandaise', '🇩🇿 Algérienne', '🇧🇫 Burkinabè',
  '🇹🇬 Togolaise', '🇨🇩 Congolaise (RDC)', '🇲🇦 Marocaine', '🇬🇭 Ghanéenne',
  '🇧🇮 Burundaise', '🇺🇬 Ougandaise', 'Autre'
]
const categories = ['Fonctionnaire', 'Bachelier']
const sexes = ['Masculin', 'Féminin']

const lignesChamps = [
  [
    { name: 'nom', label: 'Nom', type: 'text', placeholder: 'Nom' },
    { name: 'prenom', label: 'Prénom', type: 'text', placeholder: 'Prénom' },
    { name: 'age', label: 'Âge', type: 'number', placeholder: '18' },
    { name: 'sexe', label: 'Sexe', type: 'select', options: sexes }
  ],
  [
    { name: 'dateNaissance', label: 'Date de naissance', type: 'date' },
    { name: 'lieuNaissance', label: 'Lieu de naissance', type: 'text', placeholder: 'Ville' },
    { name: 'nationalite', label: 'Nationalité', type: 'select', options: nationalites },
    { name: 'adresse', label: 'Adresse', type: 'text', placeholder: 'Adresse' }
  ],
  [
    { name: 'arrondissement', label: 'Arrondissement', type: 'text', placeholder: 'Ex: Moungali' },
    { name: 'serie', label: 'Série BAC', type: 'select', options: seriesBAC },
    { name: 'categorie', label: 'Catégorie', type: 'select', options: categories },
    { name: 'email', label: 'Email', type: 'email', placeholder: 'email@example.com' }
  ],
  [
    { name: 'numero', label: 'Téléphone', type: 'text' },
    { name: 'tuteurNom', label: 'Nom du tuteur', type: 'text', placeholder: 'Parent' },
    { name: 'tuteurNumero', label: 'Téléphone tuteur', type: 'text' }
  ]
]
</script>

<style scoped>
.formulaire {
  background: #fff;
  max-width: 1100px;
  margin: auto;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 0 10px #ccc;
}
.form-bloc {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
}
.zone-champs {
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.ligne-champs {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
.champ {
  flex: 1 1 22%;
  display: flex;
  flex-direction: column;
}
.champ-full {
  margin-top: 1rem;
}
input,
select {
  padding: 0.4rem;
  font-size: 0.9rem;
  border-radius: 4px;
  border: 1px solid #ccc;
}
.zone-photo {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.zone-photo input {
  margin-bottom: 1rem;
}
.aperçu-photo img {
  width: 130px;
  height: 160px;
  object-fit: cover;
  border: 1px solid #ccc;
  box-shadow: 0 0 4px #aaa;
  border-radius: 4px;
}
.pied-formulaire {
  margin-top: 1.5rem;
  text-align: center;
}
button {
  padding: 0.6rem 2rem;
  background: #007bff;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
}
</style>
