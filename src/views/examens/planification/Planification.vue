<script setup>
import HeaderView from './components/HeaderView.vue';
import ExamenList from './components/tables/ExamenList.vue';
</script>
<template>
  <HeaderView />
  <div class="row">
    <div class="container">
      <div class="row">
        <div class="col-md-12 grid-margin stretch-card">
          <div class="card">
            <div class="card-body dashboard-tabs p-0">
              <ul class="nav nav-tabs px-4" role="tablist">
                <li class="nav-item">
                  <a
                    class="nav-link active"
                    id="overview-tab"
                    data-bs-toggle="tab"
                    href="#overview"
                    role="tab"
                    aria-controls="overview"
                    aria-selected="true"
                    >Tout</a
                  >
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    id="sales-tab"
                    data-bs-toggle="tab"
                    href="#sales"
                    role="tab"
                    aria-controls="sales"
                    aria-selected="false"
                    >Semestre 1</a
                  >
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    id="purchases-tab"
                    data-bs-toggle="tab"
                    href="#purchases"
                    role="tab"
                    aria-controls="purchases"
                    aria-selected="false"
                    >Semestre 2</a
                  >
                </li>
              </ul>

              <div class="tab-content py-0 px-0">
                <div
                  class="tab-pane fade show active"
                  id="overview"
                  role="tabpanel"
                  aria-labelledby="overview-tab"
                >
                  <examen-list :semestre="0" />
                </div>
                <div class="tab-pane fade" id="sales" role="tabpanel" aria-labelledby="sales-tab">
                  <examen-list :semestre="1" />
                </div>
                <div
                  class="tab-pane fade"
                  id="purchases"
                  role="tabpanel"
                  aria-labelledby="purchases-tab"
                >
                  <examen-list :semestre="2" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    ExamenList,
  },
};
</script>

<style scoped>
body {
  background-color: #f8f9fa;
  color: #212529;
}
.card {
  background-color: #ffffff;
  border: 1px solid #dee2e6;
  border-radius: 12px;
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
