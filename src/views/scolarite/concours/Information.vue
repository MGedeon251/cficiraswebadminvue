<template>
  <div class="validation-candidats">
    <h2>Informations sur les concours</h2>

    <!-- Filtre par année académique -->
    <div class="form-group">
      <label>Filtrer par année académique :</label>
      <select v-model="anneeSelectionnee">
        <option value="">-- Toutes les années --</option>
        <option v-for="(a, i) in anneesDisponibles" :key="i" :value="a">{{ a }}</option>
      </select>
    </div>

    <!-- Tableau des concours -->
    <table class="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Année académique</th>
          <th>Date du concours</th>
          <th>État</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(concours, index) in concoursFiltres" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ concours.annee }}</td>
          <td>{{ formatDate(concours.date) }}</td>
          <td :class="{ admis: concours.etat === 'En cours' }">{{ concours.etat }}</td>
          <td>
            <button class="btn-valider" @click="voirDetails(concours)">
              Détails
            </button>
          </td>
        </tr>
        <tr v-if="concoursFiltres.length === 0">
          <td colspan="5" style="text-align: center">Aucun concours trouvé</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const concours = ref([]);
const anneeSelectionnee = ref('');

// Charger les concours depuis localStorage
onMounted(() => {
  const saved = localStorage.getItem('concours');
  if (saved) concours.value = JSON.parse(saved);
});

// Liste unique des années académiques disponibles
const anneesDisponibles = computed(() => {
  return [...new Set(concours.value.map((c) => c.annee))];
});

// Appliquer le filtre
const concoursFiltres = computed(() => {
  if (!anneeSelectionnee.value) return concours.value;
  return concours.value.filter((c) => c.annee === anneeSelectionnee.value);
});

// Format date : 15 juillet 2025
function formatDate(dateStr) {
  const mois = [
    'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
    'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'
  ];
  const d = new Date(dateStr);
  const jour = d.getDate();
  const moisNom = mois[d.getMonth()];
  const annee = d.getFullYear();
  return `${jour} ${moisNom} ${annee}`;
}

// Détails fictifs (à améliorer plus tard)
function voirDetails(concours) {
  alert(`Concours ${concours.annee} le ${formatDate(concours.date)} — État : ${concours.etat}`);
}
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

h2 {
  font-weight: 600;
  margin-bottom: 1rem;
  color: #333;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  font-weight: 500;
  margin-right: 0.5rem;
}

select {
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  min-width: 160px;
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
  vertical-align: middle;
}

.table td {
  background-color: #fafafa;
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
}
</style>
