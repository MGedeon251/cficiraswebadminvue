<template>
    <div class="container py-4">
      <h2>Gestion des Inscriptions</h2>
  
      <!-- Filtrage -->
      <div class="row mb-3">
        <div class="col-md-3">
          <select v-model="selectedAnnee" class="form-select" @change="filterInscriptions">
            <option disabled value="">Année académique</option>
            <option v-for="annee in annees" :key="annee" :value="annee">{{ annee }}</option>
          </select>
        </div>
  
        <div class="col-md-3">
          <select v-model="selectedClasse" class="form-select" @change="filterInscriptions">
            <option disabled value="">Classe</option>
            <option v-for="classe in classes" :key="classe" :value="classe">{{ classe }}</option>
          </select>
        </div>
  
        <div class="col-md-3">
          <select v-model="selectedStatut" class="form-select" @change="filterInscriptions">
            <option value="">Statut paiement</option>
            <option value="payé">Payé</option>
            <option value="non payé">Non payé</option>
            <option value="en attente">En attente</option>
          </select>
        </div>
  
        <div class="col-md-3">
          <input
            type="text"
            class="form-control"
            placeholder="Recherche nom/prénom"
            v-model="searchTerm"
            @input="filterInscriptions"
          />
        </div>
      </div>
  
      <button class="btn btn-success mb-3" @click="showForm = true">+ Ajouter un étudiant</button>
      <button class="btn btn-primary mb-3 ms-2" @click="showImport = true">Importer étudiants</button>
  
      <!-- Liste des étudiants filtrés -->
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Matricule</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Classe</th>
            <th>Filière</th>
            <th>Année académique</th>
            <th>Statut paiement</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="etudiant in filteredInscriptions"
            :key="etudiant.matricule"
            @click="selectEtudiant(etudiant)"
            style="cursor:pointer"
          >
            <td>{{ etudiant.matricule }}</td>
            <td>{{ etudiant.nom }}</td>
            <td>{{ etudiant.prenom }}</td>
            <td>{{ etudiant.classe }}</td>
            <td>{{ etudiant.filiere }}</td>
            <td>{{ etudiant.annee_academique }}</td>
            <td>{{ etudiant.statut_paiement }}</td>
          </tr>
        </tbody>
      </table>
  
      <!-- Formulaire Ajouter/Modifier -->
      <FormInscription v-if="showForm" :etudiant="selectedEtudiant" @close="closeForm" @saved="onSave" />
  
      <!-- Import étudiants -->
      <ImportEtudiants v-if="showImport" @close="showImport = false" @imported="onImport" />
  
      <!-- Fiche dossier étudiant -->
      <DossierEtudiant v-if="showDossier" :etudiant="selectedEtudiant" @close="showDossier = false" @updated="onUpdate" />
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  import FormInscription from '../FormInscription/FormInscription.vue';
  import ImportEtudiants from '../ImportEtudiants/ImportEtudiants.vue';
  import DossierEtudiant from '../DossierEtudiant/DossierEtudiant.vue';
  
  const inscriptions = ref([]);
  
  const annees = ['2022-2023', '2023-2024', '2024-2025'];
  const classes = ['L1', 'L2', 'L3', 'M1', 'M2'];
  
  const selectedAnnee = ref('');
  const selectedClasse = ref('');
  const selectedStatut = ref('');
  const searchTerm = ref('');
  
  const showForm = ref(false);
  const showImport = ref(false);
  const showDossier = ref(false);
  
  const selectedEtudiant = ref(null);
  
  onMounted(() => {
    const saved = localStorage.getItem('inscriptions');
    inscriptions.value = saved ? JSON.parse(saved) : [];
  });
  
  const filteredInscriptions = computed(() => {
    return inscriptions.value.filter((etudiant) => {
      const matchAnnee = selectedAnnee.value ? etudiant.annee_academique === selectedAnnee.value : true;
      const matchClasse = selectedClasse.value ? etudiant.classe === selectedClasse.value : true;
      const matchStatut = selectedStatut.value ? etudiant.statut_paiement.toLowerCase() === selectedStatut.value.toLowerCase() : true;
      const matchSearch =
        searchTerm.value.length > 0
          ? (etudiant.nom.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
            etudiant.prenom.toLowerCase().includes(searchTerm.value.toLowerCase()))
          : true;
      return matchAnnee && matchClasse && matchStatut && matchSearch;
    });
  });
  
  function selectEtudiant(etudiant) {
    selectedEtudiant.value = etudiant;
    showDossier.value = true;
  }
  
  function closeForm() {
    showForm.value = false;
    selectedEtudiant.value = null;
  }
  
  function onSave(etudiant) {
    const index = inscriptions.value.findIndex((e) => e.matricule === etudiant.matricule);
    if (index !== -1) inscriptions.value[index] = etudiant;
    else inscriptions.value.push(etudiant);
    localStorage.setItem('inscriptions', JSON.stringify(inscriptions.value));
    closeForm();
  }
  
  function onImport(newEtudiants) {
    newEtudiants.forEach((e) => {
      if (!inscriptions.value.find((i) => i.matricule === e.matricule)) {
        inscriptions.value.push(e);
      }
    });
    localStorage.setItem('inscriptions', JSON.stringify(inscriptions.value));
    showImport.value = false;
  }
  
  function onUpdate(updatedEtudiant) {
    onSave(updatedEtudiant);
    showDossier.value = false;
  }
  </script>
  