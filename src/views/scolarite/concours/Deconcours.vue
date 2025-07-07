<template>
  <div class="">
    <HeaderConcours />

    <div class="deconcours-container">
      <!-- Bloc gauche : Organiser un concours -->
      <div class="bloc bloc-formulaire">
        <h3>Organiser un nouveau concours</h3>

        <button class="btn-valider" @click="afficherFormulaire = !afficherFormulaire">
          {{ afficherFormulaire ? 'Fermer' : 'Organiser un concours' }}
        </button>

        <form v-if="afficherFormulaire" @submit.prevent="enregistrerConcours" class="mt-3">
          <div class="form-group">
            <label for="annee">Année académique :</label>
            <select
              id="annee"
              v-model="nouveauConcours.annee"
              @change="genererDateParDefaut"
              required
            >
              <option disabled value="">-- Sélectionner --</option>
              <option v-for="a in anneesAcademiques" :key="a" :value="a">{{ a }}</option>
            </select>
          </div>

          <div class="form-group">
            <label for="jour">Jour :</label>
            <input type="number" min="1" max="31" v-model="jour" required />
          </div>

          <div class="form-group">
            <label for="mois">Mois :</label>
            <select v-model="mois" required>
              <option disabled value="">-- Mois --</option>
              <option v-for="(m, i) in moisList" :key="i" :value="i + 1">{{ m }}</option>
            </select>
          </div>

          <div class="form-group">
            <button type="submit" class="btn-valider">Valider</button>
          </div>
        </form>

        <div v-if="concours.length" class="mt-4">
          <h4>Concours enregistrés</h4>
          <table class="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Année</th>
                <th>Date</th>
                <th>État</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(c, index) in concoursPagines" :key="index">
                <td>{{ index + 1 + (pageConcours - 1) * perPage }}</td>
                <td>{{ c.annee }}</td>
                <td>{{ formatDate(c.date) }}</td>
                <td :class="{ admis: c.etat === 'En cours', termine: c.etat === 'Terminé' }">
                  {{ c.etat }}
                </td>
                <td>
                  <button
                    class="btn-ter"
                    @click="terminerConcours(c)"
                    :disabled="c.etat === 'Terminé'"
                  >
                    Terminer
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="pagination">
            <button @click="pageConcours--" :disabled="pageConcours === 1">Précédent</button>
            <span>Page {{ pageConcours }} / {{ totalPagesConcours }}</span>
            <button @click="pageConcours++" :disabled="pageConcours === totalPagesConcours">
              Suivant
            </button>
          </div>
        </div>
      </div>

      <!-- Bloc droit : Informations sur les concours -->
      <div class="bloc bloc-informations">
        <h3>Informations sur les concours</h3>

        <div class="form-group">
          <label>Filtrer par année académique :</label>
          <select v-model="anneeSelectionnee">
            <option value="">-- Toutes les années --</option>
            <option v-for="(a, i) in anneesDisponibles" :key="i" :value="a">{{ a }}</option>
          </select>
        </div>

        <table class="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Année</th>
              <th>Date</th>
              <th>État</th>
              <th>Détails</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(c, index) in concoursFiltresPagines" :key="'filtre-' + index">
              <td>{{ index + 1 + (pageFiltres - 1) * perPage }}</td>
              <td>{{ c.annee }}</td>
              <td>{{ formatDate(c.date) }}</td>
              <td :class="{ admis: c.etat === 'En cours', termine: c.etat === 'Terminé' }">
                {{ c.etat }}
              </td>
              <td>
                <button class="btn-valider" @click="voirDetails(c)">Détails</button>
              </td>
            </tr>
            <tr v-if="concoursFiltresPagines.length === 0">
              <td colspan="5" style="text-align: center">Aucun concours trouvé</td>
            </tr>
          </tbody>
        </table>
        <div class="pagination">
          <button @click="pageFiltres--" :disabled="pageFiltres === 1">Précédent</button>
          <span>Page {{ pageFiltres }} / {{ totalPagesFiltres }}</span>
          <button @click="pageFiltres++" :disabled="pageFiltres === totalPagesFiltres">
            Suivant
          </button>
        </div>
      </div>
    </div>

    <!-- SECTION : Gestion des candidats -->
    <div class="bloc bloc-candidats mt-4">
      <h3>Candidats au concours</h3>
      <button
        class="btn-valider"
        @click="modalVisible = true"
        :disabled="concoursEnCours.length === 0"
      >
        Ajouter un candidat
      </button>

      <p v-if="concoursEnCours.length === 0" style="color: red; margin-top: 1rem">
        Aucun concours en cours. Veuillez d'abord organiser un concours.
      </p>

      <Teleport to="body">
        <div v-if="modalVisible" class="modal-overlay" @click.self="modalVisible = false">
          <div class="modal-content">
            <CreateCandidats
              :concours-en-cours="concoursEnCours"
              @candidatAjoute="candidatAjoute"
            />
            <button class="btn-valider mt-3" @click="modalVisible = false">Fermer</button>
          </div>
        </div>
      </Teleport>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import HeaderConcours from './HeaderConcours.vue';
import CreateCandidats from '@/views/scolarite/candidats/CreateCandidat.vue';

const afficherFormulaire = ref(false);
const concours = ref([]);
const anneesAcademiques = ref([]);
const jour = ref('');
const mois = ref('');
const anneeSelectionnee = ref('');
const pageConcours = ref(1);
const pageFiltres = ref(1);
const perPage = 3;
const modalVisible = ref(false);

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

const nouveauConcours = ref({
  annee: '',
  date: '',
  etat: 'En cours',
});

onMounted(() => {
  const saved = localStorage.getItem('concours');
  if (saved) concours.value = JSON.parse(saved);
  genererAnneesAcademiques();
});

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

function genererDateParDefaut() {
  jour.value = 15;
  mois.value = 7;
}

function enregistrerConcours() {
  if (!nouveauConcours.value.annee || !jour.value || !mois.value) {
    return alert('Veuillez remplir tous les champs.');
  }

  if (concours.value.some((c) => c.annee === nouveauConcours.value.annee)) {
    return alert(`Un concours existe déjà pour l’année ${nouveauConcours.value.annee}`);
  }

  if (concours.value.some((c) => c.etat === 'En cours')) {
    return alert('Un concours est déjà en cours.');
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

function terminerConcours(concoursObj) {
  concoursObj.etat = 'Terminé';
  localStorage.setItem('concours', JSON.stringify(concours.value));
  alert(`Le concours ${concoursObj.annee} est maintenant terminé.`);
}

function voirDetails(c) {
  alert(`Concours ${c.annee} : ${formatDate(c.date)} — État : ${c.etat}`);
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  const m = moisList[d.getMonth()];
  return `${d.getDate()} ${m} ${d.getFullYear()}`;
}

function candidatAjoute(candidat) {
  const candidats = JSON.parse(localStorage.getItem('candidats') || '[]');
  candidats.push(candidat);
  localStorage.setItem('candidats', JSON.stringify(candidats));
  alert('Candidat ajouté avec succès.');
}

const anneesDisponibles = computed(() => [...new Set(concours.value.map((c) => c.annee))]);

const concoursEnCours = computed(() => concours.value.filter((c) => c.etat === 'En cours'));

const concoursFiltres = computed(() => {
  if (!anneeSelectionnee.value) return concours.value;
  return concours.value.filter((c) => c.annee === anneeSelectionnee.value);
});

const concoursPagines = computed(() => {
  const start = (pageConcours.value - 1) * perPage;
  return [...concours.value]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(start, start + perPage);
});
const totalPagesConcours = computed(() => Math.ceil(concours.value.length / perPage));

const concoursFiltresPagines = computed(() => {
  const sorted = [...concoursFiltres.value].sort((a, b) => new Date(b.date) - new Date(a.date));
  const start = (pageFiltres.value - 1) * perPage;
  return sorted.slice(start, start + perPage);
});
const totalPagesFiltres = computed(() => Math.ceil(concoursFiltres.value.length / perPage));

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
.termine {
  color: red;
  font-weight: 600;
}
.deconcours-section {
  background: #f9f9f9;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.04);
  margin: 2rem auto;
  max-width: 1300px;
}

.deconcours-container {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
}

.bloc {
  flex: 1 1 48%;
  min-width: 320px;
  background: #fff;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
}

@media screen and (max-width: 768px) {
  .bloc {
    flex: 1 1 100%;
  }
}

h3,
h4 {
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

.pagination {
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pagination button {
  padding: 0.4rem 0.8rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
