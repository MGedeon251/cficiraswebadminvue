<template>
  <div>
    <div class="row">
      <div class="col-md-12 grid-margin">
        <div class="d-flex justify-content-between flex-wrap">
          <div class="d-flex align-items-end flex-wrap">
            <div class="me-md-3 me-xl-5">
              <h2>Candidatures Etudiantes</h2>
              <p class="mb-md-0">Gestion des candidatures étudiantes</p>
            </div>
            <div class="d-flex">
              <i class="mdi mdi-home text-muted hover-cursor"></i>
              <p class="text-muted mb-0 hover-cursor">&nbsp;/&nbsp;Candidatures&nbsp;/&nbsp;</p>
              <p class="text-primary mb-0 hover-cursor">analytics</p>
            </div>
          </div>
          <div class="d-flex justify-content-between align-items-end flex-wrap">
            <button class="btn btn-outline-dark me-2">Imprimer</button>
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
                  <a class="dropdown-item" href="#drag-drop-area">Importer fichier</a>
                </li>
              </ul>
              <div class="text-center"></div>
              <div
                class="modal fade"
                id="exampleModal"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog modal-lg custom-modal-width" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                      <button
                        type="button"
                        class="close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                      <!-- Formulaire d’ajout -->
                      <CreateCandidat @candidatAjoute="ajouterCandidat" />
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-success">Submit</button>
                      <button type="button" class="btn btn-light" data-bs-dismiss="modal">
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import CreateCandidat from './CreateCandidat.vue';
</script>
<style>
.custom-modal-width {
  max-width: 60%;
}
</style>
