<template>
  <div class="validation-candidats">
    <h2>Organiser un nouveau concours</h2>

    <!-- Bouton pour afficher le formulaire -->
    <button class="btn-valider" @click="afficherFormulaire = !afficherFormulaire">
      {{ afficherFormulaire ? 'Fermer' : 'Organiser un concours' }}
    </button>

    <!-- Formulaire de création -->
    <form v-if="afficherFormulaire" @submit.prevent="enregistrerConcours" class="mt-3">
      <div class="form-group">
        <label for="annee">Année académique :</label>
        <select id="annee" v-model="nouveauConcours.annee" required>
          <option disabled value="">-- Sélectionner --</option>
          <option v-for="a in anneesAcademiques" :key="a" :value="a">{{ a }}</option>
        </select>
      </div>

      <div class="form-group">
        <label for="date">Date du concours :</label>
        <input type="date" id="date" v-model="nouveauConcours.date" required />
      </div>

      <div class="form-group">
        <button type="submit" class="btn-valider">Valider</button>
      </div>
    </form>

    <!-- Liste des concours créés -->
    <div v-if="concours.length" class="mt-4">
      <h3>Concours enregistrés</h3>
      <table class="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Année académique</th>
            <th>Date</th>
            <th>État</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(c, index) in concours" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ c.annee }}</td>
            <td>{{ c.date }}</td>
            <td>{{ c.etat }}</td>
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

const anneesAcademiques = ['2022-2023', '2023-2024', '2024-2025', '2025-2026'];

const nouveauConcours = ref({
  annee: '',
  date: '',
  etat: 'En cours',
});

// Charger les concours enregistrés
onMounted(() => {
  const saved = localStorage.getItem('concours');
  if (saved) concours.value = JSON.parse(saved);
});

// Sauvegarder à chaque modification
watch(
  concours,
  (nv) => {
    localStorage.setItem('concours', JSON.stringify(nv));
  },
  { deep: true }
);

// Enregistrer un concours
function enregistrerConcours() {
  concours.value.push({ ...nouveauConcours.value });
  // Réinitialiser le formulaire
  nouveauConcours.value = { annee: '', date: '', etat: 'En cours' };
  afficherFormulaire.value = false;
}
</script>

<style scoped>
.validation-candidats {
  max-width: 700px;
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
input[type='date'] {
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
}

.table thead {
  background-color: #f0f0f0;
}
</style>
