<template>
    <div class="card p-4">
      <h3>Dossier étudiant</h3>
      <button class="btn btn-danger float-end" @click="$emit('close')">Fermer</button>
  
      <div v-if="etudiant">
        <p><strong>Matricule :</strong> {{ etudiant.matricule }}</p>
        <p><strong>Nom :</strong> {{ etudiant.nom }}</p>
        <p><strong>Prénom :</strong> {{ etudiant.prenom }}</p>
        <p><strong>Classe :</strong> {{ etudiant.classe }}</p>
        <p><strong>Filière :</strong> {{ etudiant.filiere }}</p>
        <p><strong>Année académique :</strong> {{ etudiant.annee_academique }}</p>
        <p><strong>Statut paiement :</strong> {{ etudiant.statut_paiement }}</p>
  
        <button class="btn btn-warning me-2" @click="startEdit">Modifier</button>
        <button class="btn btn-danger" @click="annulerInscription">Annuler inscription</button>
  
        <div v-if="editing" class="mt-4">
          <FormInscription :etudiant="etudiant" @saved="saveChanges" @close="cancelEdit" />
        </div>
  
        <HistoriqueModifications :matricule="etudiant.matricule" />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import FormInscription from '../FormInscription/FormInscription.vue';
  import HistoriqueModifications from '../HistoriqueModifications/HistoriqueModifications.vue';
  
  const props = defineProps({
    etudiant: Object
  });
  
  const emit = defineEmits(['close', 'updated']);
  
  const editing = ref(false);
  
  const startEdit = () => {
    editing.value = true;
  };
  
  const cancelEdit = () => {
    editing.value = false;
  };
  
  const saveChanges = (etudiantModifie) => {
    emit('updated', etudiantModifie);
    editing.value = false;
  };
  
  const annulerInscription = () => {
    if (confirm('Confirmez-vous l\'annulation de cette inscription ?')) {
      const etu = { ...props.etudiant, inscrit: false, statut_paiement: 'annulé' };
      emit('updated', etu);
      emit('close');
    }
  };
  </script>
  