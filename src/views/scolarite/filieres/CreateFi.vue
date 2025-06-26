<!-- src/views/scolarite/filieres/CreateFiliere.vue -->
<template>
  <div class="create-form">
    <h3>Ajouter une filière</h3>
    <form @submit.prevent="ajouter">
      <div class="form-group">
        <label>Nom de la filière</label>
        <input v-model="filiere.nom" placeholder="Ex: Informatique" required />
      </div>

      <div class="form-group">
        <label>Code de la classe</label>
        <input v-model="filiere.codeClasse" placeholder="Ex: INFO1" required />
      </div>

      <div class="form-group">
        <label>Niveau</label>
        <select v-model="filiere.niveau" required>
          <option disabled value="">-- Choisir le niveau --</option>
          <option value="1ère année">1ère année</option>
          <option value="2ème année">2ème année</option>
          <option value="3ème année">3ème année</option>
        </select>
      </div>

      <div class="form-group">
        <label>Cycle</label>
        <select v-model="filiere.cycle" required>
          <option disabled value="">-- Choisir le cycle --</option>
          <option value="Licence">Licence</option>
          <option value="Master">Master</option>
          <option value="Doctorat">Doctorat</option>
        </select>
      </div>

      <button type="submit">Ajouter</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const emit = defineEmits(['filiereAjoutee']);

const filiere = ref({
  nom: '',
  codeClasse: '',
  niveau: '',
  cycle: '',
});

function ajouter() {
  if (
    !filiere.value.nom ||
    !filiere.value.codeClasse ||
    !filiere.value.niveau ||
    !filiere.value.cycle
  )
    return;
  emit('filiereAjoutee', { ...filiere.value, id: Date.now() });
  filiere.value = { nom: '', codeClasse: '', niveau: '', cycle: '' };
}
</script>

<style scoped>
.create-form {
  background: #f5f5f5;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 2rem;
}
.form-group {
  margin-bottom: 1rem;
}
.form-group input,
.form-group select {
  width: 100%;
  padding: 0.5rem;
}
button {
  background: #007bff;
  color: white;
  padding: 0.6rem 1.2rem;
  border: none;
  cursor: pointer;
}
</style>
