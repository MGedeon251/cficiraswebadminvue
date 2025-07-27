<template>
    <div class="container mt-4">
      <h2>Modifier le Candidat</h2>
      <form @submit.prevent="updateCandidat">
        <div class="form-group mb-3">
          <label>Nom :</label>
          <input v-model="candidat.nom" class="form-control" required />
        </div>
        <div class="form-group mb-3">
          <label>Prénom :</label>
          <input v-model="candidat.prenom" class="form-control" required />
        </div>
        <div class="form-group mb-3">
          <label>Date de naissance :</label>
          <input type="date" v-model="candidat.date_naissance" class="form-control" />
        </div>
        <div class="form-group mb-3">
          <label>Email :</label>
          <input type="email" v-model="candidat.email" class="form-control" />
        </div>
        <div class="form-group mb-3">
          <label>Téléphone :</label>
          <input v-model="candidat.telephone" class="form-control" />
        </div>
        <button type="submit" class="btn btn-primary">Mettre à jour</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  
  const route = useRoute()
  const router = useRouter()
  const id = route.params.id
  const candidat = ref({
    id: '',
    nom: '',
    prenom: '',
    date_naissance: '',
    email: '',
    telephone: ''
  })
  
  onMounted(() => {
    const data = JSON.parse(localStorage.getItem('candidats') || '[]')
    const found = data.find(c => c.id == id)
    if (found) {
      candidat.value = { ...found }
    }
  })
  
  function updateCandidat() {
    const data = JSON.parse(localStorage.getItem('candidats') || '[]')
    const index = data.findIndex(c => c.id == id)
    if (index !== -1) {
      data[index] = { ...candidat.value }
      localStorage.setItem('candidats', JSON.stringify(data))
      alert('Candidat mis à jour avec succès')
      router.push('/home') // redirige vers la liste
    }
  }
  </script>
  