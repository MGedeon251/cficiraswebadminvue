<template>
  <div>
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
          id="devoirf-tab"
          data-bs-toggle="tab"
          href="#devoirf"
          role="tab"
          aria-controls="devoirf"
          aria-selected="false"
          >Devoirs</a
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
          >Sessions ordinaires</a
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
          >Sessions de rappels</a
        >
      </li>
    </ul>
    <div class="tab-content p-4">
      <div
        class="tab-pane fade show active"
        id="overview"
        role="tabpanel"
        aria-labelledby="overview-tab"
      >
        <app-notes />
      </div>
      <div class="tab-pane fade" id="devoirf" role="tabpanel" aria-labelledby="devoirf-tab">
        <app-notes />
      </div>
      <div class="tab-pane fade" id="sales" role="tabpanel" aria-labelledby="sales-tab">
        <app-notes />
      </div>
      <div class="tab-pane fade" id="purchases" role="tabpanel" aria-labelledby="purchases-tab">
        <app-notes />
      </div>
    </div>
  </div>
</template>

<script setup></script>
