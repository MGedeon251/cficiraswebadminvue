<template>
  <div>
    <div class="row">
      <div class="col-md-12 grid-margin">
        <div class="d-flex justify-content-between flex-wrap">
          <div class="d-flex align-items-end flex-wrap">
            <div class="me-md-3 me-xl-5">
              <h2>Gestion des Inscriptions</h2>
              <p class="mb-md-0">Inscription examens concours et année academique</p>
            </div>
            <div class="d-flex">
              <i class="mdi mdi-home text-muted hover-cursor"></i>
              <p class="text-muted mb-0 hover-cursor">&nbsp;/&nbsp;Portail&nbsp;/&nbsp;</p>
              <p class="text-primary mb-0 hover-cursor">Inscriptions</p>
            </div>
          </div>
          <div class="d-flex justify-content-between align-items-end aflex-wrap">
            <div class="dropdown me-2">
              <button class="btn btn-sm btn-outline-secondary" data-bs-toggle="dropdown">
                <i class="mdi mdi-dots-vertical"></i>
              </button>
              <ul class="dropdown-menu dropdown-menu-end">
                <li>
                  <a class="dropdown-item" href="#" @click.prevent="exportToExcel">
                    <i class="mdi mdi-file-excel me-2"></i>Exporter Excel
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#" @click.prevent="printTable">
                    <i class="mdi mdi-printer me-2"></i>Imprimer
                  </a>
                </li>
                <li><hr class="dropdown-divider" /></li>
                <li>
                  <a class="dropdown-item" href="#"><i class="mdi mdi-cog me-2"></i>Paramètres</a>
                </li>
              </ul>
            </div>
            <div class="btn-group">
              <button
                class="btn btn-primary mt-2 mt-xl-0"
                data-bs-toggle="modal"
                data-bs-target="#wizardModal"
              >
                + Inscription
              </button>
              <button
                class="btn btn-primary dropdown-toggle dropdown-toggle-split"
                data-bs-toggle="dropdown"
              >
                <span class="visually-hidden">Toggle Dropdown</span>
              </button>
              <ul class="dropdown-menu">
                <li>
                  <a
                    class="dropdown-item"
                    href="#inscription-par-classe"
                    data-bs-toggle="modal"
                    data-bs-target="#inscriptionClasseModal"
                  >
                    Inscription par classe
                  </a>
                </li>
                <li>
                  <a
                    class="dropdown-item"
                    href="#ajouter-tuteur"
                    data-bs-toggle="modal"
                    data-bs-target="#ajouterTuteurModal"
                  >
                    Ajouter tuteur étudiant
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup="setup">
import ImportModal from './modal/InscriptionsModal.vue';
</script>
