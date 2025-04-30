--- NoteTable.vue ---
<template>
  <div class="table-responsive">
    <table class="table table-striped table-bordered">
      <thead>
        <tr>
          <th>#</th>
          <th>Matricule</th>
          <th>Nom et prénom</th>
          <th>Note 1</th>
          <th>Note 2</th>
          <th>Note 3</th>
          <th>Moyenne</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(etudiant, index) in etudiants" :key="etudiant.id">
          <td>{{ index + 1 }}</td>
          <td>{{ etudiant.matricule }}</td>
          <td>{{ etudiant.nom }}</td>
          <td><input type="number" class="form-control" v-model.number="etudiant.note1" @input="calculerMoyenne(etudiant)" /></td>
          <td><input type="number" class="form-control" v-model.number="etudiant.note2" @input="calculerMoyenne(etudiant)" /></td>
          <td><input type="number" class="form-control" v-model.number="etudiant.note3" @input="calculerMoyenne(etudiant)" /></td>
          <td><strong>{{ etudiant.moyenne?.toFixed(2) || '0.00' }}</strong></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
const props = defineProps({
  etudiants: Array
});

const calculerMoyenne = (etudiant) => {
  const { note1 = 0, note2 = 0, note3 = 0 } = etudiant;
  etudiant.moyenne = (note1 + note2 + note3) / 3;
};
</script>