<template>
  <div>
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
              <vue3-datatable :rows="rows" :columns="cols">
              </vue3-datatable>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from "vue";
  import Vue3Datatable from "@bhplugin/vue3-datatable";
  import "@bhplugin/vue3-datatable/dist/style.css";

  const cols =
    ref([
      { field: "id", title: "ID", width: "90px", filter: false },
      { field: "name", title: "Name" },
      { field: "username", title: "Username" },
      { field: "email", title: "Email" },
      { field: "phone", title: "Phone" },
      { field: "date", title: "Date", type: "date" },
      { field: "active", title: "Active", type: "bool" },
      { field: "age", title: "Age", type: "number" },
    ]) || [];

  const rows = ref([
    {
      id: 1,
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz",
      address: {
        street: "Kulas Light",
        suite: "Apt. 556",
        city: "Gwenborough",
        zipcode: "92998-3874",
        geo: {
          lat: "-37.3159",
          lng: "81.1496",
        },
      },
      phone: "1-770-736-8031 x56442",
      website: "hildegard.org",
      company: {
        name: "Romaguera-Crona",
        catchPhrase: "Multi-layered client-server neural-net",
        bs: "harness real-time e-markets",
      },
      date: "Tue Sep 27 2022 22:19:57",
      active: true,
      age: 10,
    },
    {
      id: 2,
      name: "Ervin Howell",
      username: "Antonette",
      email: "Shanna@melissa.tv",
      address: {
        street: "Victor Plains",
        suite: "Apt. 556",
        city: "Gwenborough",
        zipcode: "92998-3874",
        geo: {
          lat: "-37.3159",
          lng: "81.1496",
        },
      },
      phone: "1-770-736-8031 x56442",
      website: "hildegard.org",
      company: {
        name: "Romaguera-Crona",
        catchPhrase: "Multi-layered client-server neural-net",
        bs: "harness real-time e-markets",
      },
      date: "Tue Sep 27 2022 22:19:57",
      active: true,
      age: 10,
    },
  ]);
</script>
