<template>
  <div class="classe-table">
    <h3>Liste des classes</h3>
    <table>
      <thead>
        <tr>
          <th>Nom</th>
          <th>Code</th>
          <th>Niveau</th>
          <th>Filière</th>
          <th>Places</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(classe, index) in classesPaginees" :key="index">
          <td>{{ classe.nom }}</td>
          <td>{{ classe.code }}</td>
          <td>{{ classe.niveau }}</td>
          <td>{{ classe.filiere }}</td>
          <td>{{ classe.places }}</td>
          <td>
            <button @click="$emit('supprimerClasse', getGlobalIndex(index))">🗑 Supprimer</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination -->
    <div class="pagination">
      <button @click="precedent" :disabled="page === 1">Précédent</button>
      <span>Page {{ page }}</span>
      <button @click="suivant" :disabled="page * parPage >= classes.length">Suivant</button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
  classes: Array,
});
const emit = defineEmits(['supprimerClasse']);

const page = ref(1);
const parPage = 5;

const classesPaginees = computed(() =>
  props.classes.slice((page.value - 1) * parPage, page.value * parPage)
);

function suivant() {
  if (page.value * parPage < props.classes.length) page.value++;
}

function precedent() {
  if (page.value > 1) page.value--;
}

function getGlobalIndex(localIndex) {
  return (page.value - 1) * parPage + localIndex;
}
</script>

<style scoped>
.classe-table {
  background: #fff;
  padding: 1rem;
  border-radius: 6px;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th,
td {
  padding: 0.6rem;
  border: 1px solid #ccc;
}
.pagination {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}
button {
  background-color: #dc3545;
  color: white;
  padding: 0.4rem 1rem;
  border: none;
  cursor: pointer;
}
button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
