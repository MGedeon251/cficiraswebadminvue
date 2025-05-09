<script setup>
import { ref, onMounted, computed } from 'vue';
import { getModules } from '@/api/academique/moduleApi';
import Pagination from '@/components/shared/Pagination.vue';
import ItemActions from '@/components/shared/ItemDetails.vue';

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
onMounted(fetchModules);
</script>

<template>
  <div v-if="error" class="alert alert-danger">{{ error }}</div>
  <div class="card p-4">
    <div class="d-flex justify-content-between flex-wrap">
      <div class="d-flex mb-3">
        <button @click="refreshModules" class="btn btn-outline-dark me-2" :disabled="isLoading">
          <span v-if="!isLoading">🔄 Rafraîchir</span>
          <span v-else>Chargement...</span>
        </button>
      </div>
      <div class="d-flex justify-content-between align-items-end flex-wrap mb-3">
        <div class="input-group" style="width: 250px">
          <input
            type="text"
            class="form-control"
            placeholder="Rechercher..."
            v-model="searchQuery"
          />
          <span class="input-group-text bg-transparent">
            <i class="mdi mdi-magnify"></i>
          </span>
        </div>
      </div>
    </div>

    <table class="table table-hover align-middle">
      <thead class="table-light">
        <tr>
          <th>Code</th>
          <th>Désignation</th>
          <th>Crédit</th>
          <th>Coefficient</th>
          <th>Volume Horaire</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="module in paginatedModules" :key="module.id">
          <td>{{ module.code }}</td>
          <td>{{ module.designation }}</td>
          <td>{{ module.credit }}</td>
          <td>{{ module.coefficient + '.00' }}</td>
          <td>{{ module.volume_horaire + 'h' }}</td>
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
  </div>
</template>
