<template>
  <div>
    <Header />
    <TabNavigation>
      <TabContent tabId="overview">
        <DashboardStats />
      </TabContent>
      <TabContent tabId="sales">
        <DashboardStats />
        <!-- Adapter avec les données spécifiques -->
      </TabContent>
      <TabContent tabId="purchases">
        <DashboardStats />
        <!-- Adapter avec les données spécifiques -->
      </TabContent>
    </TabNavigation>

    <div class="row">
      <div class="card">
        <RecentPurchases :purchases="recentPurchases" />
      </div>
    </div>
  </div>
</template>

<script setup>
import Header from './Header.vue';
import TabNavigation from './TabNavigation.vue';
import TabContent from './TabContent.vue';
import DashboardStats from './DashboardStats.vue';
import RecentPurchases from './TabList.vue';

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
