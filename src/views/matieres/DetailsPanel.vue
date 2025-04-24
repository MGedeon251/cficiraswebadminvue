<template>
  <div class="container mt-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h3 class="mb-0">📘 Détails du module</h3>
      <router-link class="btn btn-outline-secondary" to="/modules">⬅ Retour</router-link>
    </div>

    <div v-if="module" class="card shadow-sm p-4 rounded-4">
      <div class="row mb-3">
        <div class="col-md-6">
          <p><strong>📎 Code :</strong> {{ module.data.code }}</p>
          <p><strong>📖 Désignation :</strong> {{ module.data.designation }}</p>
          <p><strong>🧮 Crédit :</strong> {{ module.data.credit }}</p>
          <p><strong>🧪 Coefficient :</strong> {{ module.data.coefficient }}</p>
          <p><strong>⏱️ Volume Horaire :</strong> {{ module.data.volume_horaire }}h</p>
        </div>
        <div class="col-md-6">
          <p><strong>👤 Responsable :</strong> {{ module.responsable_id || 'Non défini' }}</p>
          <p><strong>🏫 Filières & Classes :</strong></p>
          <ul class="list-group list-group-flush ms-3">
            <li
              v-for="(filiere, index) in module.data.filieres_classes"
              :key="index"
              class="list-group-item"
            >
              <strong>{{ filiere.filiere }}</strong>
              <ul class="ms-3">
                <li v-for="(classe, i) in filiere.classes" :key="i">
                  {{ classe }}
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>

      <div class="d-flex justify-content-end gap-3 mt-4">
        <button class="btn btn-outline-primary" @click="editModule">✏️ Modifier</button>
        <button class="btn btn-outline-warning" @click="assignToClass">
          🧩 Assigner à une classe
        </button>
        <button class="btn btn-outline-danger" @click="archiveModule">🗄️ Archiver</button>
      </div>
    </div>

    <div v-else class="alert alert-info">Chargement des détails...</div>
  </div>
</template>

<script setup>
import ModuleHeader from './ModuleHeader.vue';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getModuleById } from '@/api/academique/moduleApi';

const route = useRoute();
const router = useRouter();
const module = ref(null);

const editModule = () => {
  router.push(`/modules/${route.params.id}/edit`);
};

const assignToClass = () => {
  router.push(`/modules/${route.params.id}/assign`);
};

const archiveModule = () => {
  alert("Fonction d'archivage à implémenter ✨");
};

onMounted(async () => {
  const id = route.params.id;
  try {
    const response = await getModuleById(id);
    module.value = response;
  } catch (error) {
    console.error('Erreur lors du chargement du module :', error);
  }
});
</script>

<style scoped>
.card {
  border: none;
  background-color: #f8f9fa;
}
</style>
