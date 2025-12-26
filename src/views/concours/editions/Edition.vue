<template>
  <div>
    <HeaderView />
    <div class="row">
      <div class="container my-2">
        <div class="col-md-12 grid margin stretch-card">
          <div class="card">
            <div class="card-body">
              <div class="d-flex justify-content-between flex-wrap">
                <div class="d-flex align-items-end flex-wrap"></div>
                <div class="d-flex justify-content-between align-items-end flex-wrap">
                  <!--
                  <button class="btn btn-outline-dark me-2">Cloturer un concours </button>
                  <button
                    class="btn btn-success mt-2 mt-xl-0"
                    data-bs-toggle="modal"
                    data-bs-target="#exam"
                  >
                    Ouvrir un concours
                  </button>
                  -->
                </div>
              </div>
              <SkeletonLoader v-if="loading" type="table" :rows="3" :columns="1" />
              <ListConcours></ListConcours>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup="setup">
import HeaderView from './components/HeaderView.vue';
import ListConcours from './components/table/ListConcour.vue';
</script>
