<template>
  <div class="d-flex justify-content-between flex-wrap">
    <div class="d-flex align-items-center mt-3">
      <span class="me-2">Afficher</span>
      <select v-model="localItemsPerPage" class="form-select" @change="updateItemsPerPage">
        <option v-for="n in [5, 10, 15, 20]" :key="n" :value="n">{{ n }}</option>
      </select>
    </div>
    <div class="d-flex justify-content-between align-items-center mt-3">
      <nav>
        <ul class="pagination flex-wrap">
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <a class="page-link" href="#" @click.prevent="prevPage">
              <i class="mdi mdi-chevron-left"></i>
            </a>
          </li>

          <li
            v-for="page in totalPages"
            :key="page"
            class="page-item"
            :class="{ active: page === currentPage }"
          >
            <a class="page-link" href="#" @click.prevent="goToPage(page)">
              {{ page }}
            </a>
          </li>

          <li class="page-item" :class="{ disabled: currentPage >= totalPages }">
            <a class="page-link" href="#" @click.prevent="nextPage">
              <i class="mdi mdi-chevron-right"></i>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';

// Props reçues du parent
const props = defineProps({
  totalItems: {
    type: Number,
    required: true,
  },
  itemsPerPage: {
    type: Number,
    default: 5,
  },
  modelValue: {
    type: Number,
    default: 1,
  },
});

// Émissions d'événements
const emit = defineEmits(['update:modelValue', 'update:itemsPerPage']);

// Données internes
const currentPage = ref(props.modelValue);
const localItemsPerPage = ref(props.itemsPerPage);

// Recalculer le nombre total de pages
const totalPages = computed(() => {
  return Math.ceil(props.totalItems / localItemsPerPage.value);
});

// Navigation
const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};
const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};
const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

// Watchers pour synchroniser avec le parent
watch(currentPage, (val) => emit('update:modelValue', val));
watch(
  () => props.modelValue,
  (val) => (currentPage.value = val)
);

const updateItemsPerPage = () => {
  emit('update:itemsPerPage', localItemsPerPage.value);
};
</script>
