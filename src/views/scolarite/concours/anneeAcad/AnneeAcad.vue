<!-- src/views/scolarite/concours/anneeAcad/AnneeAcad.vue -->
<template>
    <div class="container my-4">
      <h2>Gestion des Années Académiques</h2>
  
      <!-- Formulaire ajout / modification -->
      <form @submit.prevent="onSubmit" class="mb-4">
        <div class="mb-3">
          <label for="code" class="form-label">Code Année (ex: 2024-2025)</label>
          <input
            v-model="form.code"
            id="code"
            type="text"
            class="form-control"
            placeholder="Entrez le code"
            required
          />
        </div>
        <div class="mb-3">
          <label for="debut" class="form-label">Début de l'année</label>
          <input
            v-model="form.debut"
            id="debut"
            type="date"
            class="form-control"
            required
          />
        </div>
        <div class="mb-3">
          <label for="fin" class="form-label">Fin de l'année</label>
          <input
            v-model="form.fin"
            id="fin"
            type="date"
            class="form-control"
            required
          />
        </div>
        <div class="form-check mb-3">
          <input
            v-model="form.active"
            class="form-check-input"
            type="checkbox"
            id="active"
          />
          <label class="form-check-label" for="active">Année active</label>
        </div>
  
        <button type="submit" class="btn btn-primary me-2">
          {{ editMode ? 'Modifier' : 'Ajouter' }}
        </button>
        <button type="button" class="btn btn-secondary" @click="resetForm" v-if="editMode">
          Annuler
        </button>
      </form>
  
      <!-- Liste des années -->
      <table class="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Code</th>
            <th>Début</th>
            <th>Fin</th>
            <th>Active</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(annee, index) in annees" :key="annee.id">
            <td>{{ index + 1 }}</td>
            <td>{{ annee.code }}</td>
            <td>{{ formatDate(annee.debut) }}</td>
            <td>{{ formatDate(annee.fin) }}</td>
            <td>
              <span :class="annee.active ? 'text-success' : 'text-secondary'">
                {{ annee.active ? 'Oui' : 'Non' }}
              </span>
            </td>
            <td>
              <button class="btn btn-sm btn-warning me-2" @click="editAnnee(annee)">Modifier</button>
              <button class="btn btn-sm btn-danger" @click="deleteAnnee(annee.id)">Supprimer</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { anneeStore } from '@/stores/scolarite/concours/anneeStore.js';
  import { formatDate as formatDateUtil } from '@/stores/scolarite/concours/utils.js';
  
  const annees = ref([]);
  const form = ref({
    id: null,
    code: '',
    debut: '',
    fin: '',
    active: false,
  });
  const editMode = ref(false);
  
  // Charger les années au montage
  function loadAnnees() {
    annees.value = anneeStore.getAll();
  }
  onMounted(() => {
    loadAnnees();
  });
  
  // Formater la date pour l'affichage
  const formatDate = (date) => {
    if (!date) return '';
    return formatDateUtil(date);
  };
  
  // Soumission formulaire ajout/modification
  function onSubmit() {
    if (editMode.value) {
      anneeStore.update(form.value.id, {
        code: form.value.code,
        debut: form.value.debut,
        fin: form.value.fin,
        active: form.value.active,
      });
    } else {
      anneeStore.add({
        code: form.value.code,
        debut: form.value.debut,
        fin: form.value.fin,
        active: form.value.active,
      });
    }
    resetForm();
    loadAnnees();
  }
  
  // Réinitialiser le formulaire
  function resetForm() {
    form.value = {
      id: null,
      code: '',
      debut: '',
      fin: '',
      active: false,
    };
    editMode.value = false;
  }
  
  // Modifier une année
  function editAnnee(annee) {
    form.value = { ...annee };
    editMode.value = true;
  }
  
  // Supprimer une année
  function deleteAnnee(id) {
    if (confirm('Voulez-vous vraiment supprimer cette année académique ?')) {
      anneeStore.delete(id);
      loadAnnees();
    }
  }
  </script>
  
  <style scoped>
  .text-success {
    font-weight: bold;
  }
  
  .text-secondary {
    color: gray;
  }
  </style>
  