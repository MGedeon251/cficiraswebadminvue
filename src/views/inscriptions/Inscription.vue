<template>
  <div>
    <HeaderView />

    <div class="row">
      <div class="col-md-12 grid-margin stretch-card">
        <div class="card">
          <SkeletonLoader v-if="loading" type="table" :rows="3" :columns="1" />
          <div v-else class="card-body dashboard-tabs p-0">
            <TabInscription />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import HeaderView from './components/HeaderView.vue';
import TabInscription from './components/tabs/TabInscription.vue';
</script>
