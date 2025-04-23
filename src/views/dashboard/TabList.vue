<template>
    <div class="card-body">
      <p class="card-title">Recent Purchases</p>
      <div class="table-responsive">
        <table id="recent-purchases-listing" class="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Status report</th>
              <th>Office</th>
              <th>Price</th>
              <th>Date</th>
              <th>Gross amount</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(purchase, index) in purchases" :key="index">
              <td>{{ purchase.name }}</td>
              <td>{{ purchase.status }}</td>
              <td>{{ purchase.office }}</td>
              <td>{{ purchase.price }}</td>
              <td>{{ purchase.date }}</td>
              <td>{{ purchase.grossAmount }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    purchases: Array, // Liste des achats récents
  })
  </script>
  