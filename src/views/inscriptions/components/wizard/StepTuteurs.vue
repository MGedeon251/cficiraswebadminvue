<template>
  <div>
    <h5>Informations des tuteurs</h5>

    <div v-for="(tuteur, index) in localData.tuteurs" :key="index" class="border rounded p-3 mb-3">
      <div class="row">
        <!-- Nom -->
        <div class="mb-2 col-md-6">
          <label>Nom</label>
          <input v-model="tuteur.nom" type="text" class="form-control" required />
        </div>

        <!-- Prénom -->
        <div class="mb-2 col-md-6">
          <label>Prénom</label>
          <input v-model="tuteur.prenom" type="text" class="form-control" required />
        </div>

        <!-- Téléphone principal -->
        <div class="mb-2 col-md-6">
          <label>Téléphone 1</label>
          <input
            v-model="tuteur.tel1"
            type="tel"
            class="form-control"
            placeholder="+242061234567"
            required
          />
        </div>

        <!-- Téléphone secondaire -->
        <div class="mb-2 col-md-6">
          <label>Téléphone 2 (optionnel)</label>
          <input
            v-model="tuteur.tel2"
            type="tel"
            class="form-control"
            placeholder="+242061234567"
          />
        </div>

        <!-- Email -->
        <div class="mb-2 col-md-6">
          <label>Email</label>
          <input v-model="tuteur.email" type="email" class="form-control" />
        </div>

        <!-- Nationalité -->
        <div class="mb-2 col-md-6">
          <label>Nationalité (code ISO 2)</label>
          <input
            v-model="tuteur.nationalite"
            type="text"
            maxlength="2"
            class="form-control text-uppercase"
            placeholder="FR"
            required
          />
        </div>

        <!-- Adresse -->
        <div class="mb-2 col-md-6">
          <label>Adresse</label>
          <input v-model="tuteur.adresse" type="text" class="form-control" required />
        </div>

        <!-- Ville -->
        <div class="mb-2 col-md-6">
          <label>Ville</label>
          <input v-model="tuteur.ville" type="text" class="form-control" required />
        </div>

        <!-- Lien de parenté -->
        <div class="mb-2 col-md-6">
          <label>Lien de parenté</label>
          <select v-model="tuteur.lien_parente" class="form-control" required>
            <option value="PERE">Père</option>
            <option value="MERE">Mère</option>
            <option value="TUTEUR">Tuteur</option>
            <option value="ONCLE">Oncle</option>
            <option value="TANTE">Tante</option>
            <option value="FRERE">Frère</option>
            <option value="SOEUR">Sœur</option>
            <option value="AUTRE">Autre</option>
          </select>
        </div>
      </div>

      <!-- Bouton suppression -->
      <div class="mt-2">
        <button class="btn btn-danger btn-sm" @click="removeTuteur(index)">Supprimer</button>
      </div>
    </div>

    <!-- Bouton ajout -->
    <button class="btn btn-primary" @click="addTuteur">+ Ajouter un tuteur</button>
  </div>
</template>

<script setup>
import { reactive } from 'vue';

const localData = reactive({
  tuteurs: [
    {
      nom: '',
      prenom: '',
      tel1: '',
      tel2: '',
      email: '',
      nationalite: '',
      adresse: '',
      ville: '',
      lien_parente: '',
    },
  ],
});

function addTuteur() {
  localData.tuteurs.push({
    nom: '',
    prenom: '',
    tel1: '',
    tel2: '',
    email: '',
    nationalite: '',
    adresse: '',
    ville: '',
    lien_parente: '',
  });
}

function removeTuteur(index) {
  localData.tuteurs.splice(index, 1);
}
</script>
