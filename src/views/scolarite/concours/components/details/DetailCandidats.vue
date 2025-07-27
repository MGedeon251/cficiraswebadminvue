<template>
    <div class="container mt-4">
      <h2>Détails du Candidat</h2>
      <div v-if="candidat">
        <p><strong>Nom :</strong> {{ candidat.nom }}</p>
        <p><strong>Prénom :</strong> {{ candidat.prenom }}</p>
        <p><strong>Date de naissance :</strong> {{ candidat.date_naissance }}</p>
        <p><strong>Email :</strong> {{ candidat.email }}</p>
        <p><strong>Téléphone :</strong> {{ candidat.telephone }}</p>
        <!-- Ajoute d'autres champs si nécessaires -->
      </div>
      <div v-else>
        <p>Aucun candidat trouvé avec cet ID.</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue'
  import { useRoute } from 'vue-router'
  
  const route = useRoute()
  const id = route.params.id
  const candidat = ref(null)
  
  onMounted(() => {
    const data = JSON.parse(localStorage.getItem('candidats') || '[]')
    candidat.value = data.find(c => c.id == id)
  })
  </script>
  