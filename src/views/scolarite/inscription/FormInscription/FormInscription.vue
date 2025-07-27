<template>
    <div class="card p-4 mb-4">
      <h4>{{ etudiant ? 'Modifier' : 'Ajouter' }} un étudiant</h4>
  
      <form @submit.prevent="save">
        <div class="mb-3">
          <label class="form-label">Matricule *</label>
          <input v-model="localEtudiant.matricule" class="form-control" :readonly="etudiant" required />
        </div>
  
        <div class="mb-3">
          <label class="form-label">Nom *</label>
          <input v-model="localEtudiant.nom" class="form-control" required />
        </div>
  
        <div class="mb-3">
          <label class="form-label">Prénom *</label>
          <input v-model="localEtudiant.prenom" class="form-control" required />
        </div>
  
        <div class="mb-3">
          <label class="form-label">Année académique *</label>
          <select v-model="localEtudiant.annee_academique" class="form-select" required>
            <option disabled value="">Sélectionnez une année</option>
            <option v-for="annee in annees" :key="annee" :value="annee">{{ annee }}</option>
          </select>
        </div>
  
        <div class="mb-3">
          <label class="form-label">Classe *</label>
          <select v-model="localEtudiant.classe" class="form-select" required>
            <option disabled value="">Sélectionnez une classe</option>
            <option v-for="classe in classes" :key="classe" :value="classe">{{ classe }}</option>
          </select>
        </div>
  
        <div class="mb-3">
          <label class="form-label">Filière *</label>
          <input v-model="localEtudiant.filiere" class="form-control" required />
        </div>
  
        <div class="mb-3">
          <label class="form-label">Statut de paiement *</label>
          <select v-model="localEtudiant.statut_paiement" class="form-select" required>
            <option disabled value="">Sélectionnez un statut</option>
            <option value="payé">Payé</option>
            <option value="non payé">Non payé</option>
            <option value="en attente">En attente</option>
          </select>
        </div>
  
        <button type="submit" class="btn btn-primary me-2">Enregistrer</button>
        <button type="button" class="btn btn-secondary" @click="$emit('close')">Annuler</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { reactive, watch } from 'vue';
  
  const props = defineProps({
    etudiant: {
      type: Object,
      default: null
    }
  });
  
  const emit = defineEmits(['close', 'saved']);
  
  const annees = ['2022-2023', '2023-2024', '2024-2025'];
  const classes = ['L1', 'L2', 'L3', 'M1', 'M2'];
  
  const localEtudiant = reactive({
    matricule: '',
    nom: '',
    prenom: '',
    annee_academique: '',
    classe: '',
    filiere: '',
    statut_paiement: ''
  });
  
  watch(
    () => props.etudiant,
    (newVal) => {
      if (newVal) {
        Object.assign(localEtudiant, newVal);
      } else {
        Object.assign(localEtudiant, {
          matricule: '',
          nom: '',
          prenom: '',
          annee_academique: '',
          classe: '',
          filiere: '',
          statut_paiement: ''
        });
      }
    },
    { immediate: true }
  );
  
  const save = () => {
    if (
      !localEtudiant.matricule ||
      !localEtudiant.nom ||
      !localEtudiant.prenom ||
      !localEtudiant.annee_academique ||
      !localEtudiant.classe ||
      !localEtudiant.filiere ||
      !localEtudiant.statut_paiement
    ) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }
    emit('saved', { ...localEtudiant });
  };
  </script>
  