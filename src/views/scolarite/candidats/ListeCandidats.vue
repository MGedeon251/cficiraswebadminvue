<template>
  <div class="liste-candidats">
    <h2>Liste des candidats inscrits</h2>

    <table class="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Nom</th>
          <th>Prénom</th>
          <th>Sexe</th>
          <th>Filière</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(c, index) in candidats" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ c.nom }}</td>
          <td>{{ c.prenom }}</td>
          <td>{{ c.sexe?.substring(0, 1).toUpperCase() }}</td>
          <td>{{ c.filiere }}</td>
          <td>
            <router-link :to="`/scolarite/candidats/${index}`">
              <button class="btn-edit">Modifier</button>
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const candidats = ref([]);

onMounted(() => {
  const saved = localStorage.getItem('candidats');
  if (saved) {
    candidats.value = JSON.parse(saved);
  }
});
</script>

<style scoped>
.liste-candidats {
  padding: 1rem;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-weight: 600;
  color: #333;
}

.table-wrapper {
  overflow-x: auto;
}

.table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
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

.btn-edit {
  background-color: #007bff;
  color: white;
  padding: 0.35rem 0.75rem;
  border: none;
  border-radius: 4px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-edit:hover {
  background-color: #0056b3;
}
</style>
