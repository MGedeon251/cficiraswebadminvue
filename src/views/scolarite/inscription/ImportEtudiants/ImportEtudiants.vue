<template>
    <div class="card p-4 mb-4">
      <h4>Importer des étudiants (Excel ou CSV)</h4>
      <input type="file" @change="handleFileUpload" accept=".xlsx,.csv" />
      <button class="btn btn-secondary mt-3" @click="$emit('close')">Fermer</button>
    </div>
  </template>
  
  <script setup>
  import * as XLSX from 'xlsx';
  
  const emit = defineEmits(['close', 'imported']);
  
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;
  
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const importedData = XLSX.utils.sheet_to_json(worksheet);
  
      const etudiants = importedData.map((row) => ({
        matricule: row.Matricule || '',
        nom: row.Nom || '',
        prenom: row.Prénom || '',
        annee_academique: row['Année académique'] || '',
        classe: row.Classe || '',
        filiere: row.Filière || '',
        statut_paiement: row['Statut paiement'] || 'en attente',
      }));
  
      emit('imported', etudiants);
      alert('Importation réussie');
    };
  
    reader.readAsArrayBuffer(file);
  };
  </script>
  