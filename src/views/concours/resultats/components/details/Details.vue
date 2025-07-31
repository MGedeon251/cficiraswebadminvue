<template>
  <div>
    <HeaderView />
    <div class="row">
      <div class="container my-2">
        <div class="col-md-12 grid margin stretch-card">
          <div class="card">
            <ResultatTabs />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import HeaderView from '../HeaderResultat.vue';
import ResultatTabs from '../tabs/ResultatTabs.vue';
import dayjs from 'dayjs'; // ici c'est pour gerer les formats des dates
</script>
