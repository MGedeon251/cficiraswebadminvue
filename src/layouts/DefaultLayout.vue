<template>
  <div class="container-scroller">
    <Header />

    <div class="container-fluid page-body-wrapper">
      <MessageList />
      <Sidebar />
      <div class="main-panel">
        <div class="content-wrapper">
          <!-- Ajoutez ceci pour déboguer -->
          <div>
            <router-view></router-view>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  </div>
</template>

<script setup>
import Header from '@/components/partials/header.vue';
import Sidebar from '@/components/partials/sibebar.vue';
import Footer from '@/components/partials/footer.vue';
import MessageList from '@/components/messageList.vue';
</script>
