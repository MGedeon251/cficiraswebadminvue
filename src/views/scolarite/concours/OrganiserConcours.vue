<template>
  <div class="validation-candidats">
    <h2>Organiser un nouveau concours</h2>

    <button class="btn-valider" @click="afficherFormulaire = !afficherFormulaire">
      {{ afficherFormulaire ? 'Fermer' : 'Organiser un concours' }}
    </button>

    <!-- Formulaire -->
    <form v-if="afficherFormulaire" @submit.prevent="enregistrerConcours" class="mt-3">
      <div class="form-group">
        <label for="annee">Année académique :</label>
        <select id="annee" v-model="nouveauConcours.annee" @change="genererDateParDefaut" required>
          <option disabled value="">-- Sélectionner --</option>
          <option v-for="a in anneesAcademiques" :key="a" :value="a">{{ a }}</option>
        </select>
      </div>

      <div class="form-group">
        <label for="mois">Jour :</label>
        <input type="number" min="1" max="31" v-model="jour" required />
      </div>

      <div class="form-group">
        <label for="mois">Mois :</label>
        <select v-model="mois" required>
          <option disabled value="">-- Mois --</option>
          <option v-for="(m, i) in moisList" :key="i" :value="i + 1">
            {{ m }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <button type="submit" class="btn-valider">Valider</button>
      </div>
    </form>

    <!-- Liste des concours -->
    <div v-if="concours.length" class="mt-4">
      <h3>Concours enregistrés</h3>
      <table class="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Année académique</th>
            <th>Date</th>
            <th>État</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(c, index) in concours" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ c.annee }}</td>
            <td>{{ formatDate(c.date) }}</td>
            <td :class="{ admis: c.etat === 'En cours' }">{{ c.etat }}</td>
            <td>
              <button
                class="btn-ter"
                @click="terminerConcours(index)"
                :disabled="c.etat === 'Terminé'"
              >
                Concours terminé
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';

const afficherFormulaire = ref(false);
const concours = ref([]);
const anneesAcademiques = ref([]);
const moisList = [
  'janvier',
  'février',
  'mars',
  'avril',
  'mai',
  'juin',
  'juillet',
  'août',
  'septembre',
  'octobre',
  'novembre',
  'décembre',
];

const jour = ref('');
const mois = ref('');

const nouveauConcours = ref({
  annee: '',
  date: '',
  etat: 'En cours',
});

// Charger les concours
onMounted(() => {
  const saved = localStorage.getItem('concours');
  if (saved) concours.value = JSON.parse(saved);

  genererAnneesAcademiques();
});

// Générer les années disponibles
function genererAnneesAcademiques() {
  const existantes = concours.value.map((c) => c.annee);
  if (existantes.length === 0) {
    anneesAcademiques.value = ['2024-2025'];
    return;
  }

  const dernier = existantes.sort().at(-1);
  const debut = parseInt(dernier.split('-')[0]);
  const suivante = `${debut + 1}-${debut + 2}`;
  anneesAcademiques.value = [...new Set([...existantes, suivante])];
}

// Génère une date automatiquement quand l’année est choisie
function genererDateParDefaut() {
  jour.value = 15;
  mois.value = 7;
}

// Empêche doublons et état En cours multiples
function enregistrerConcours() {
  if (concours.value.some((c) => c.annee === nouveauConcours.value.annee)) {
    alert(`Un concours existe déjà pour l’année ${nouveauConcours.value.annee}`);
    return;
  }

  if (concours.value.some((c) => c.etat === 'En cours')) {
    alert('Un concours est déjà en cours. Terminez-le avant d’en créer un nouveau.');
    return;
  }

  if (!jour.value || !mois.value) {
    alert('Veuillez saisir le jour et le mois.');
    return;
  }

  const annee = nouveauConcours.value.annee.split('-')[0];
  const jourStr = jour.value.toString().padStart(2, '0');
  const moisStr = mois.value.toString().padStart(2, '0');
  const dateFinale = `${annee}-${moisStr}-${jourStr}`;

  concours.value.push({
    annee: nouveauConcours.value.annee,
    date: dateFinale,
    etat: 'En cours',
  });

  nouveauConcours.value.annee = '';
  jour.value = '';
  mois.value = '';
  afficherFormulaire.value = false;
}

// Marquer terminé
function terminerConcours(index) {
  concours.value[index].etat = 'Terminé';
}

// Format de la date
function formatDate(dateStr) {
  const mois = [
    'janvier',
    'février',
    'mars',
    'avril',
    'mai',
    'juin',
    'juillet',
    'août',
    'septembre',
    'octobre',
    'novembre',
    'décembre',
  ];
  const d = new Date(dateStr);
  return `${d.getDate()} ${mois[d.getMonth()]} ${d.getFullYear()}`;
}

// Sauvegarde dans localStorage
watch(
  concours,
  (nv) => {
    localStorage.setItem('concours', JSON.stringify(nv));
    genererAnneesAcademiques();
  },
  { deep: true }
);
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

h2,
h3 {
  font-weight: 600;
  margin-bottom: 1rem;
  color: #333;
}

.form-group {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
}

label {
  font-weight: 500;
  margin-bottom: 0.3rem;
}

select,
input[type='number'] {
  padding: 0.4rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 0.9rem;
}

.btn-valider {
  background-color: #007bff;
  color: white;
  padding: 0.5rem 1.2rem;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-weight: 600;
}

.btn-ter {
  background-color: #28a745;
  color: white;
  padding: 0.4rem 1rem;
  border: none;
  border-radius: 5px;
  font-size: 0.85rem;
  cursor: pointer;
}

.btn-ter:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
  margin-top: 1rem;
}

.table th,
.table td {
  border: 1px solid #ddd;
  padding: 0.6rem;
  text-align: left;
  vertical-align: middle;
}

.table thead {
  background-color: #f0f0f0;
}

.admis {
  color: green;
  font-weight: 600;
}
</style>
