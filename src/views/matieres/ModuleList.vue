<script setup>
import { ref, onMounted, computed } from 'vue';
import { getModules } from '@/api/academique/moduleApi';
import Pagination from '@/components/Pagination.vue';
import ItemActions from '@/components/ItemDetails.vue';
import DetailsPanel from './DetailsPanelv1.vue';
const selectedModule = ref(null);

// Données principales
const modules = ref([]);
const isLoading = ref(false);
const error = ref(null);
// Pagination
const currentPage = ref(1);
const itemsPerPage = ref(5);
const totalItems = computed(() => modules.value.length);
const paginatedModules = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return modules.value.slice(start, end);
});
// Récupération des modules
const fetchModules = async () => {
  isLoading.value = true;
  error.value = null;

  try {
    const response = await getModules();
    modules.value = response;
    console.log('Modules:', response);
  } catch (err) {
    error.value = 'Erreur lors du chargement des modules';
    console.error(err);
  } finally {
    isLoading.value = false;
  }
};

const refreshModules = () => {
  fetchModules();
};

const showDetails = (module) => (selectedModule.value = module);

const editModule = (item) => {
  console.log('Modifier module', item);
};

const confirmDelete = (item) => {
  console.log('Supprimer module', item);
};

onMounted(fetchModules);
</script>

<template>
  <div class="card p-4">
    <div class="d-flex mb-3">
      <button @click="refreshModules" class="btn btn-outline-dark me-2" :disabled="isLoading">
        <span v-if="!isLoading">🔄 Rafraîchir</span>
        <span v-else>Chargement...</span>
      </button>
    </div>

    <div v-if="error" class="alert alert-danger">{{ error }}</div>

    <table class="table table-hover align-middle">
      <thead>
        <tr>
          <th>Code</th>
          <th>Désignation</th>
          <th>Crédit</th>
          <th>Coefficient</th>
          <th>Volume Horaire</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="module in paginatedModules" :key="module.id">
          <td>{{ module.code }}</td>
          <td>{{ module.designation }}</td>
          <td>{{ module.credit }}</td>
          <td>{{ module.coefficient }}</td>
          <td>{{ module.volume_horaire }}</td>
          <td>
            <ItemActions :item="module" moduleRoute="/modules" />
          </td>
        </tr>
        <!-- Aucune donnée -->
        <tr v-if="!isLoading && modules.length === 0">
          <td colspan="5" class="text-center py-4">
            <div class="d-flex flex-column align-items-center">
              <img src="/img/empty-box.svg" alt="Aucune donnée" class="mb-2" width="auto" />
            </div>
            <div class="text-pr">Aucune donnée</div>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination
      v-model="currentPage"
      :items-per-page="itemsPerPage"
      :total-items="totalItems"
      @update:itemsPerPage="itemsPerPage = $event"
    />

    <!-- Section des détails -->
    <!-- Affichage des détails via le composant -->
    <DetailsPanel v-if="selectedModule" :item="selectedModule" @close="selectedModule = null" />
  </div>
</template>
