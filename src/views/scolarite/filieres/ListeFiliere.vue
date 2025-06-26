<!-- src/views/scolarite/filieres/ListeFiliere.vue -->
<template>
  <div class="liste">
    <h3>Filières enregistrées</h3>
    <table>
      <thead>
        <tr>
          <th>Nom</th>
          <th>Code</th>
          <th>Niveau</th>
          <th>Cycle</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(filiere, index) in filieres" :key="filiere.id">
          <td>{{ filiere.nom }}</td>
          <td>{{ filiere.codeClasse }}</td>
          <td>{{ filiere.niveau }}</td>
          <td>{{ filiere.cycle }}</td>
          <td>
            <button @click="$emit('supprimerFiliere', index)">Supprimer</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
const props = defineProps({
  filieres: Array,
});
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
th,
td {
  border: 1px solid #ccc;
  padding: 0.5rem;
  text-align: center;
}
th {
  background: #007bff;
  color: white;
}
button {
  background-color: red;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}
</style>
