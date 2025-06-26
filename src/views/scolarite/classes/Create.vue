<!-- src/views/scolarite/classes/Create.vue -->
<template>
  <div class="create-form">
    <h3>Ajouter une classe</h3>
    <form @submit.prevent="submitClasse">
      <!-- Nom de la classe -->
      <div class="form-group">
        <label>Nom de la classe</label>
        <input v-model="nouvelleClasse.nom" required />
      </div>

      <!-- Code de classe (choisi depuis la filière) -->
      <div class="form-group">
        <label>Code de la classe</label>
        <select v-model="nouvelleClasse.code" required @change="remplirInfosDepuisCode">
          <option disabled value="">-- Choisir un code --</option>
          <option v-for="filiere in filieres" :key="filiere.id" :value="filiere.codeClasse">
            {{ filiere.codeClasse }}
          </option>
        </select>
      </div>

      <!-- Les champs remplis automatiquement -->
      <div class="form-group">
        <label>Filière</label>
        <input v-model="nouvelleClasse.filiere" disabled />
      </div>

      <div class="form-group">
        <label>Niveau</label>
        <input v-model="nouvelleClasse.niveau" disabled />
      </div>

      <div class="form-group">
        <label>Cycle</label>
        <input v-model="nouvelleClasse.cycle" disabled />
      </div>

      <!-- Nombre de places -->
      <div class="form-group">
        <label>Nombre de places</label>
        <input type="number" v-model.number="nouvelleClasse.places" min="1" required />
      </div>

      <button type="submit">Créer la classe</button>
    </form>
  </div>
</template>

<script setup>
import { reactive } from 'vue';

const props = defineProps({
  filieres: Array,
  classes: Array, // 👈 on reçoit la liste des classes déjà existantes
});

const emit = defineEmits(['classeAjoutee']);

const nouvelleClasse = reactive({
  nom: '',
  code: '',
  niveau: '',
  filiere: '',
  cycle: '',
  places: null,
});

// Quand un code est choisi, on remplit automatiquement les infos associées
function remplirInfosDepuisCode() {
  const filiereTrouvee = props.filieres.find((f) => f.codeClasse === nouvelleClasse.code);
  if (filiereTrouvee) {
    nouvelleClasse.filiere = filiereTrouvee.nom;
    nouvelleClasse.niveau = filiereTrouvee.niveau;
    nouvelleClasse.cycle = filiereTrouvee.cycle;
  } else {
    nouvelleClasse.filiere = '';
    nouvelleClasse.niveau = '';
    nouvelleClasse.cycle = '';
  }
}

function submitClasse() {
  // Vérifier les doublons : même code + même niveau
  const doublon = props.classes.find(
    (c) => c.code === nouvelleClasse.code && c.niveau === nouvelleClasse.niveau
  );

  if (doublon) {
    alert('Une classe avec ce code et ce niveau existe déjà.');
    return;
  }

  emit('classeAjoutee', { ...nouvelleClasse });
  Object.assign(nouvelleClasse, {
    nom: '',
    code: '',
    niveau: '',
    filiere: '',
    cycle: '',
    places: null,
  });
}
</script>

<style scoped>
.create-form {
  background: #f9f9f9;
  padding: 1rem;
  border-radius: 6px;
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
