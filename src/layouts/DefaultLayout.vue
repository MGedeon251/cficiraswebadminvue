<template>
    <div class="container-scroller">
      <!-- Header component -->
      <Header />
  
      <div class="container-fluid page-body-wrapper">
        <!-- Sidebar component -->
        <Sidebar />
  
        <!-- Main content -->
        <div class="main-panel">
          <div class="content-wrapper">
            <slot></slot>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
import Header from  '@/components/partials/header.vue'
import Sidebar from '@/components/partials/sibebar.vue'
import Footer from '@/components/partials/footer.vue'
  </script>
  