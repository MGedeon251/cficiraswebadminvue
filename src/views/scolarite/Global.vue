<template>
  <div>
    <HeaderSco />

    <h2 class="my-4">Vue Globale</h2>

    <section class="stats-top">
      <div class="stat-block">
        <div class="icon">
          <i class="mdi mdi-school"></i>
        </div>
        <h3>Classes</h3>
        <p>
          <strong>{{ classes.length }}</strong> classes créées
        </p>
        <ul>
          <li v-for="classe in classes" :key="classe.id">
            {{ classe.nom }} - {{ classe.nbEtudiants }} étudiants
          </li>
        </ul>
      </div>

      <div class="stat-block">
        <div class="icon">
          <i class="mdi mdi-account-group"></i>
        </div>
        <h3>Étudiants</h3>
        <p>
          Nombre total : <strong>{{ totalEtudiants }}</strong>
        </p>
        <p>
          Hommes : <strong>{{ nbHommes }}</strong>
        </p>
        <p>
          Femmes : <strong>{{ nbFemmes }}</strong>
        </p>
      </div>

      <div class="stat-block">
        <div class="icon">
          <i class="mdi mdi-chart-pie"></i>
        </div>
        <h3>Répartition par sexe</h3>
        <p>
          Hommes : <strong>{{ pourcentageHommes.toFixed(1) }}%</strong>
        </p>
        <p>
          Femmes : <strong>{{ pourcentageFemmes.toFixed(1) }}%</strong>
        </p>
      </div>
    </section>

    <section class="stats-bottom">
      <h3>Détail des classes</h3>
      <table class="table">
        <thead>
          <tr>
            <th><i class="mdi mdi-school"></i> Classe</th>
            <th><i class="mdi mdi-chair-school"></i> Nombre de places</th>
            <th><i class="mdi mdi-gender-male"></i> Garçons</th>
            <th><i class="mdi mdi-gender-female"></i> Filles</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="classe in classes" :key="classe.id">
            <td>{{ classe.nom }}</td>
            <td>{{ classe.nbPlaces }}</td>
            <td>{{ classe.nbGarcons }}</td>
            <td>{{ classe.nbFilles }}</td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { getGlobalesStat } from '@/api/statistiques/statistiqueApi';

const classes = ref([]);
const totalEtudiants = ref(0);
const nbHommes = ref(0);
const nbFemmes = ref(0);
const pourcentageHommes = ref(0);
const pourcentageFemmes = ref(0);

onMounted(async () => {
  try {
    const response = getGlobalesStat();

    const data = response;
    console.log(data);

    classes.value = data.classes;
    totalEtudiants.value = data.etudiants.total;
    nbHommes.value = data.etudiants.hommes;
    nbFemmes.value = data.etudiants.femmes;

    pourcentageHommes.value = (nbHommes.value / totalEtudiants.value) * 100;
    pourcentageFemmes.value = (nbFemmes.value / totalEtudiants.value) * 100;
  } catch (error) {
    console.error('Erreur chargement données :', error);
  }
});
</script>

<style scoped>
.stats-top {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
}

.stat-block {
  flex: 1;
  background: #f0f4f8;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgb(0 0 0 / 0.05);
  text-align: center;
  position: relative;
}

.stat-block .icon {
  font-size: 2.5rem;
  color: #007bff;
  margin-bottom: 1rem;
}

.stats-bottom h3 {
  margin-bottom: 1rem;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table thead th {
  border-bottom: 2px solid #007bff;
  padding: 0.5rem;
  text-align: left;
}

.table tbody td {
  padding: 0.5rem;
  border-bottom: 1px solid #ddd;
}

.mdi {
  vertical-align: middle;
  margin-right: 0.5rem;
  color: #007bff;
}
</style>
