<template>
  <div>
    <ul class="nav nav-tabs px-4" role="tablist">
      <li class="nav-item">
        <a class="nav-link active" id="details-tab" data-bs-toggle="tab" href="#details" role="tab"
          >Details</a
        >
      </li>
      <li class="nav-item">
        <a class="nav-link" id="stats-tab" data-bs-toggle="tab" href="#stats" role="tab"
          >Statistiques</a
        >
      </li>
      <li class="nav-item">
        <a class="nav-link" id="final-tab" data-bs-toggle="tab" href="#final" role="tab"
          >Résultats finaux</a
        >
      </li>
      <li class="nav-item">
        <a class="nav-link" id="publication-tab" data-bs-toggle="tab" href="#publication" role="tab"
          >Publication</a
        >
      </li>
    </ul>

    <div class="tab-content p-4">
      <div class="tab-pane fade show active" id="details" role="tabpanel">
        <DetailsConcours />
      </div>
      <div class="tab-pane fade" id="stats" role="tabpanel">
        <StatistiquesConcours />
      </div>
      <div class="tab-pane fade" id="final" role="tabpanel">
        <ResultatsFinaux />
      </div>
      <div class="tab-pane fade" id="publication" role="tabpanel">
        <PublicationResultats />
      </div>
    </div>
  </div>
</template>

<script setup>
import DetailsConcours from './detail-content.vue';
import StatistiquesConcours from './StatistiquesConcours.vue';
import ResultatsFinaux from './ResultatsFinaux.vue';
import PublicationResultats from './PublicationResultats.vue';
</script>
