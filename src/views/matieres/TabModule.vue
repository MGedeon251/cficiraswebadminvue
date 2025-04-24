<script setup>
import { ref, onMounted, computed } from 'vue'
import { getModules } from '@/api/academique/moduleApi'
import Pagination from '@/components/Pagination.vue'

// Données principales
const modules = ref([])
const isLoading = ref(false)
const error = ref(null)

// Pagination
const currentPage = ref(1)
const itemsPerPage = ref(5)

const totalItems = computed(() => modules.value.length)

const paginatedModules = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return modules.value.slice(start, end)
})

// Récupération des modules
const fetchModules = async () => {
  isLoading.value = true
  error.value = null

  try {
    const response = await getModules()
    modules.value = response
    console.log('Modules:', response)
  } catch (err) {
    error.value = 'Erreur lors du chargement des modules'
    console.error(err)
  } finally {
    isLoading.value = false
  }
}

const refreshModules = () => {
  fetchModules()
}

// Placeholder fonctions
const editModule = (module) => {
  console.log('Editer:', module)
}
const confirmDelete = (module) => {
  console.log('Supprimer:', module)
}

onMounted(fetchModules)
</script>


<template>
   <div v-if="error" class="alert alert-danger alert-dismissible fade show">
      {{ error }}
      <button type="button" class="btn-close" @click="error = null"></button>
    </div>
  <div class="card p-4">
    <div class="d-flex mb-3">
      <button class="btn btn-outline-dark me-2">Tout</button>
      <button class="btn btn-outline-dark me-2">Actives</button>
      <button class="btn btn-outline-dark me-2">Inactives</button>
      <button class="btn btn-outline-dark me-2">Archivées</button>
      <button 
        @click="refreshModules" 
        class="btn btn-outline-dark me-2"
        :disabled="isLoading">
        <span v-if="!isLoading">🔄 Rafraîchir</span>
        <span v-else>Chargement...</span>
      </button>
    </div>
    <div v-if="isLoading" class="skeleton-loader">
      <div class="skeleton-line" v-for="n in 5" :key="n"></div>
    </div>

    <p>Listes de toutes les modules.</p>

    <table class="table table-hover align-middle">
      <thead>
        <tr>
          <th scope="col">code</th>
          <th scope="col">designation</th>
          <th scope="col">credit</th>
          <th scope="col">coefficient</th>
          <th scope="col">volume horaire</th>
          <th scope="col"></th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="module in paginatedModules" :key="module.id">
          <td>{{ module.code }}</td>
          <td>{{ module.designation }}</td>
          <td>{{ module.credit }}</td>
          <td>{{ module.coefficient }}</td>
          <td>{{ module.volume_horaire }}</td>
          <td>{{ module.responsable_id }}</td>
          <td>
            <div class="btn-group btn-group-sm">
              <button class="btn btn-outline-primary" @click="editModule(module)">
                ✏️
              </button>
              <button class="btn btn-outline-danger" @click="confirmDelete(module)">
                🗑️
              </button>
            </div>
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
