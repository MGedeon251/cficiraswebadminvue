<template>
    <div class="card p-4">
      <div class="d-flex mb-3">
        <button class="btn btn-outline-dark me-2">Tout</button>
        <button class="btn btn-outline-dark me-2">Actives</button>
        <button class="btn btn-outline-dark me-2">Inactives</button>
        <button class="btn btn-outline-dark">Archivées</button>
      </div>
      <p>Manage your products and view their sales performance.</p>
      <table class="table table-hover align-middle">
        <thead>
          <tr>
            <th>Designation</th>
            <th>Etat</th>
            <th>Coef</th>
            <th>Nombre Heure</th>
            <th>Formateur</th>
            <th colspan="3"></th>
          </tr>
        </thead>
        <tbody>
          <slot />
        </tbody>
      </table>
    </div>
  </template>
  