<template>
  <vue3-datatable :rows="rows" :columns="cols">
  </vue3-datatable>
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
      {
        field: "address.city",
        title: "Address",
        search: true,
        cellRenderer: (item: any) => {
          return (
            item &&
            item.address?.street +
              ", " +
              item.address?.suite +
              "<br/><strong>" +
              item.address?.city +
              "</strong>" +
              "<br/><strong>" +
              "lat: " +
              item.address?.geo?.lat +
              "&nbsp;&nbsp; lng: " +
              item.address?.geo?.lng +
              "</strong>"
          );
        },
      },
      { field: "company.name", title: "Company" },
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
  ]);
</script>