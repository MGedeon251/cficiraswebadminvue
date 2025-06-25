<template>
  <div>
    <div class="row">
      <DashHeader />
    </div>
    <div class="row">
      <div class="col-md-12 grid-margin stretch-card">
        <div class="card">
          <SkeletonLoader v-if="loading" type="table" :rows="3" :columns="1" />
          <div v-else class="card-body dashboard-tabs p-0">
            <DashTab />
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 grid-margin stretch-card">
        <div class="card">
          <RecentPurchases :purchases="recentPurchases" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import DashTab from './components/DashTab.vue';
import DashHeader from './components/Header.vue';
import SkeletonLoader from '@/components/SkeletonLoader.vue';

import RecentPurchases from './components/TabList.vue';

const recentPurchases = [
  {
    name: 'Jeremy Ortega',
    status: 'Levelled up',
    office: 'Catalinaborough',
    price: '$790',
    date: '06 Jan 2018',
    grossAmount: '$2274253',
  },
  {
    name: 'Alvin Fisher',
    status: 'Ui design completed',
    office: 'East Mayra',
    price: '$23230',
    date: '18 Jul 2018',
    grossAmount: '$83127',
  },
  // Ajouter les autres données ici
];
</script>

<style scoped>
.drag-drop-area {
  background: #f8f9fa;
  border: 2px dashed #007bff;
  cursor: pointer;
}
.drag-drop-area.drag-over {
  background: #e9ecef;
}
</style>

<style scoped>
body {
  background-color: #f8f9fa;
  color: #212529;
}
.card {
  background-color: #ffffff;
  border: 1px solid #dee2e6;
  border-radius: 06px;
}
.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
  color: #fff;
}
.btn-primary:hover {
  background-color: #0056b3;
  border-color: #004080;
}
.status-badge {
  padding: 0.5em 1em;
  border-radius: 20px;
  font-size: 0.85rem;
  color: #fff;
}
.status-draft {
  background-color: #6c757d;
}
.status-active {
  background-color: #0d6efd;
}
.table thead th {
  border-bottom: 2px solid #dee2e6;
}
</style>
