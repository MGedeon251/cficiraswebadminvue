<template>
  <div class="row">
    <div class="col-md-12 grid-margin">
      <div class="d-flex justify-content-between flex-wrap">
        <div class="d-flex align-items-end flex-wrap">
          <div class="me-md-3 me-xl-5">
            <h2>Gestion des etudiants</h2>
            <p class="mb-md-0">Gestion des etudiants</p>
          </div>
          <div class="d-flex">
            <i class="mdi mdi-home text-muted hover-cursor"></i>
            <p class="text-muted mb-0 hover-cursor">&nbsp;/&nbsp;Portail&nbsp;/&nbsp;</p>
            <p class="text-primary mb-0 hover-cursor">Etudiants</p>
          </div>
        </div>
        <div class="d-flex justify-content-between align-items-end flex-wrap">
          <button class="btn btn-outline-dark me-2" @click="exportToExcel">Exporter</button>
          <div class="btn-group">
            <button
              type="button"
              class="btn btn-primary mt-2 mt-xl-0"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              aria-hidden="true"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
            >
              + Ajouter
            </button>
            <button
              type="button"
              class="btn btn-primary dropdown-toggle dropdown-toggle-split"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span class="visually-hidden">Toggle Dropdown</span>
            </button>
            <ul class="dropdown-menu">
              <li>
                <a class="dropdown-item" href="#drop_table">Importer fichier</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import * as XLSX from 'xlsx';
const tableDataRef = ref(null);
import AddEtudiantView from './modal/AddEtudiantView.vue';

const exportToExcel = async () => {
  try {
    // Récupère les données des étudiants depuis le composant TableData
    const etudiants = await tableDataRef.value.getTableData();

    if (!etudiants || !etudiants.length) {
      return alert('Aucune donnée à exporter.');
    }

    // Transforme les données en format JSON plat
    const data = etudiants.map((etudiant) => ({
      ID: etudiant.id,
      Matricule: etudiant.matricule,
      Nom: etudiant.nom,
      Prénom: etudiant.prenom,
      Sexe: etudiant.sexe,
      Classe: etudiant.classe,
      Filière: etudiant.filiere,
    }));

    // Crée le fichier Excel
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Étudiants');
    XLSX.writeFile(workbook, 'etudiants.xlsx');
  } catch (error) {
    console.error("Erreur lors de l'export:", error);
    alert("Une erreur est survenue lors de l'export");
  }
};
</script>
