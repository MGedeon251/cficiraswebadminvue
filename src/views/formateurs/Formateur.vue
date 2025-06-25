<template>
  <div>
    <div class="row">
      <div class="col-md-12 grid-margin">
        <div class="d-flex justify-content-between flex-wrap">
          <div class="d-flex align-items-end flex-wrap">
            <div class="me-md-3 me-xl-5">
              <h2>Enseignants | Formateurs</h2>
              <p class="mb-md-0">Gestion des formateurs et enseignant</p>
            </div>
            <div class="d-flex">
              <i class="mdi mdi-home text-muted hover-cursor"></i>
              <p class="text-muted mb-0 hover-cursor">&nbsp;/&nbsp;Formateur&nbsp;/&nbsp;</p>
              <p class="text-primary mb-0 hover-cursor">Analytics</p>
            </div>
          </div>
          c
        </div>
      </div>
    </div>
    <FormateurList />

    <ImportFormateur />
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import FormateurList from './FormateurList.vue';
import ImportFormateur from './ImportFormateur.vue';

const email = ref('gedeon.lekounda@gmail.com');
const selectedTheme = ref('light');
const loading = ref(true);

onMounted(() => {
  setTimeout(() => {
    loading.value = false;
  }, 2000);
});
</script>

<style scoped>
.container {
  max-width: 800px;
}
.skeleton-loader {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.skeleton-item {
  height: 20px;
  background: #f3f3f3;
  border-radius: 4px;
  animation: pulse 1.5s infinite ease-in-out;
}
@keyframes pulse {
  0% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.6;
  }
}
</style>
