<template>
  <div class="table-responsive">
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Matricule</th>
          <th>Nom</th>
          <th>Prenom</th>
          <th>Email</th>
          <th>Telephone</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="student in students" :key="student.id">
          <td>{{ student.matricule }}</td>
          <td>{{ student.nom }}</td>
          <td>{{ student.prenom }}</td>
          <td>{{ student.email }}</td>
          <td>{{ student.telephone }}</td>
          <td>
            <!-- Action boutons ici -->
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
defineProps(['students']);
</script>
