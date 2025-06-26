<!-- src/views/scolarite/inscriptions/Inscript.vue -->
<template>
  <div class="form-container">
    <h3>Nouvelle inscription</h3>
    <form @submit.prevent="inscrireEtudiant" enctype="multipart/form-data">
      <input v-model="etudiant.nom" type="text" placeholder="Nom" required />
      <input v-model="etudiant.prenom" type="text" placeholder="Prénom" required />
      <input v-model="etudiant.age" type="number" placeholder="Âge" required />

      <label>Photo</label>
      <input type="file" @change="handlePhoto" accept="image/*" />

      <input v-model="etudiant.tuteur" type="text" placeholder="Nom du tuteur" required />
      <input v-model="etudiant.telephone" type="text" placeholder="Téléphone du tuteur" required />
      <input v-model="etudiant.sexe" type="text" placeholder="Sexe" required />

      <select v-model="etudiant.filiere">
        <option disabled value="">Choisir la filière</option>
        <option v-for="f in filieres" :key="f">{{ f }}</option>
      </select>

      <select v-model="etudiant.classe">
        <option disabled value="">Choisir la classe</option>
        <option v-for="c in classes" :key="c">{{ c }}</option>
      </select>

      <button type="submit">Valider</button>
    </form>

    <div class="confirmation" v-if="message">{{ message }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const etudiant = ref({
  nom: '',
  prenom: '',
  age: null,
  photo: null,
  tuteur: '',
  telephone: '',
  sexe: '',
  classe: '',
  filiere: '',
});

const message = ref('');
const classes = ref(['L1-INFO-A', 'L1-INFO-B', 'DUT-IG1']); // À dynamiser plus tard
const filieres = ref(['Informatique', 'Biologie', 'Économie']); // À dynamiser plus tard

const handlePhoto = (event) => {
  const file = event.target.files[0];
  if (file) {
    etudiant.value.photo = file;
  }
};

const inscrireEtudiant = () => {
  console.log('📝 Étudiant inscrit :', etudiant.value);
  message.value = `Étudiant(e) ${etudiant.value.prenom} ${etudiant.value.nom} inscrit(e) avec succès !`;
  // Réinitialiser le formulaire
  etudiant.value = {
    nom: '',
    prenom: '',
    age: null,
    photo: null,
    tuteur: '',
    telephone: '',
    sexe: '',
    classe: '',
    filiere: '',
  };
};
</script>

<style scoped>
.form-container {
  background: #f9f9f9;
  padding: 1rem;
  border-radius: 8px;
  max-width: 500px;
  margin: 2rem auto;
}
input,
select {
  width: 100%;
  margin: 0.5rem 0;
  padding: 0.5rem;
}
button {
  background: #28a745;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
}
.confirmation {
  margin-top: 1rem;
  color: green;
  text-align: center;
}
</style>
