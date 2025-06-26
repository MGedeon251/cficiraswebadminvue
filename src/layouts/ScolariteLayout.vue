<!-- src/layouts/ScolariteLayout.vue -->
<template>
  <div class="container-scroller">
    <ScolariteHeader />
    <div class="container-fluid page-body-wrapper">
      <ScolariteSidebar />
      <div class="main-panel">
        <div class="content-wrapper">
          <router-view />
        </div>
        <ScolariteFooter />
      </div>
    </div>
  </div>
</template>

<script setup>
import ScolariteHeader from '@/components/scolarite/partials/header.vue';
import ScolariteSidebar from '@/components/scolarite/partials/sidebarsco.vue';
import ScolariteFooter from '@/components/scolarite/partials/footer.vue';
</script>
