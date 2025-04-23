<script setup>
import sidebar from '@/components/Header.vue';
</script>

<template>
  <div>
    <sidebar>
      <div class="row">
        <div class="col-md-12 grid-margin">
          <div class="d-flex justify-content-between flex-wrap">
            <div class="d-flex align-items-end flex-wrap">
              <div class="me-md-3 me-xl-5">
                <h2>Administration SSE</h2>
                <p class="mb-md-0">Gestion des formateurs et enseignant</p>
              </div>
              <div class="d-flex">
                <i class="mdi mdi-home text-muted hover-cursor"></i>
                <p class="text-muted mb-0 hover-cursor">&nbsp;/&nbsp;Formateur&nbsp;/&nbsp;</p>
                <p class="text-primary mb-0 hover-cursor">Analytics</p>
              </div>
            </div>
            <div class="d-flex justify-content-between align-items-end flex-wrap"></div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="container my-2">
          <div class="col-md-12 grid margin stretch-card">
            <div class="card">
              <div class="card-body"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12 grid-margin stretch-card">
          <div class="card">
            <div class="card-body">
              <h4 class="card-title">Liste des Formateurs</h4>
              <p class="card-description">Liste de formateurs actifs</p>
              <div class="table-responsive">
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th>Matricule</th>
                      <th>Nom</th>
                      <th>Prenom</th>
                      <th>Email</th>
                      <th>Telephone</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </sidebar>
  </div>
</template>
