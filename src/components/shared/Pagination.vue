<template>
  <div class="pagination-wrapper">
    <!-- Info et sélection du nombre d'éléments -->
    <div class="pagination-info">
      <div class="items-per-page-selector">
        <span class="text-muted me-2">Afficher</span>
        <select
          v-model="localItemsPerPage"
          class="form-select form-select-sm"
          @change="updateItemsPerPage"
          style="width: auto"
        >
          <option v-for="n in itemsPerPageOptions" :key="n" :value="n">
            {{ n }}
          </option>
        </select>
        <span class="text-muted ms-2">éléments</span>
      </div>

      <!-- Informations sur les résultats affichés -->
      <div class="results-info text-muted">
        <span v-if="totalItems > 0">
          Affichage de <strong>{{ startItem }}</strong> à <strong>{{ endItem }}</strong> sur
          <strong>{{ totalItems }}</strong> résultat{{ totalItems > 1 ? 's' : '' }}
        </span>
        <span v-else>Aucun résultat</span>
      </div>
    </div>

    <!-- Navigation de pagination -->
    <nav v-if="totalPages > 1" aria-label="Navigation de pagination">
      <ul class="pagination pagination-sm mb-0">
        <!-- Bouton Première page -->
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <a
            class="page-link"
            href="#"
            @click.prevent="goToPage(1)"
            :tabindex="currentPage === 1 ? -1 : 0"
            title="Première page"
          >
            <i class="mdi mdi-chevron-double-left"></i>
          </a>
        </li>

        <!-- Bouton Précédent -->
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <a
            class="page-link"
            href="#"
            @click.prevent="prevPage"
            :tabindex="currentPage === 1 ? -1 : 0"
            title="Page précédente"
          >
            <i class="mdi mdi-chevron-left"></i>
          </a>
        </li>

        <!-- Pages numérotées avec ellipses intelligentes -->
        <template v-for="page in displayedPages" :key="page">
          <li
            v-if="page === 'ellipsis-start' || page === 'ellipsis-end'"
            class="page-item disabled"
          >
            <span class="page-link">...</span>
          </li>
          <li v-else class="page-item" :class="{ active: page === currentPage }">
            <a
              class="page-link"
              href="#"
              @click.prevent="goToPage(page)"
              :aria-current="page === currentPage ? 'page' : undefined"
            >
              {{ page }}
            </a>
          </li>
        </template>

        <!-- Bouton Suivant -->
        <li class="page-item" :class="{ disabled: currentPage >= totalPages }">
          <a
            class="page-link"
            href="#"
            @click.prevent="nextPage"
            :tabindex="currentPage >= totalPages ? -1 : 0"
            title="Page suivante"
          >
            <i class="mdi mdi-chevron-right"></i>
          </a>
        </li>

        <!-- Bouton Dernière page -->
        <li class="page-item" :class="{ disabled: currentPage >= totalPages }">
          <a
            class="page-link"
            href="#"
            @click.prevent="goToPage(totalPages)"
            :tabindex="currentPage >= totalPages ? -1 : 0"
            title="Dernière page"
          >
            <i class="mdi mdi-chevron-double-right"></i>
          </a>
        </li>
      </ul>
    </nav>

    <!-- Saut rapide à une page (optionnel, affiché si beaucoup de pages) -->
    <div v-if="totalPages > 10" class="quick-jump">
      <span class="text-muted me-2">Aller à la page</span>
      <input
        v-model.number="jumpToPageInput"
        type="number"
        class="form-control form-control-sm"
        :min="1"
        :max="totalPages"
        @keyup.enter="jumpToPage"
        style="width: 70px"
      />
      <button
        class="btn btn-sm btn-outline-secondary ms-1"
        @click="jumpToPage"
        :disabled="!isValidPageJump"
      >
        <i class="mdi mdi-arrow-right"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';

// Props
const props = defineProps({
  totalItems: {
    type: Number,
    required: true,
    validator: (value) => value >= 0,
  },
  itemsPerPage: {
    type: Number,
    default: 10,
    validator: (value) => value > 0,
  },
  modelValue: {
    type: Number,
    default: 1,
    validator: (value) => value > 0,
  },
  itemsPerPageOptions: {
    type: Array,
    default: () => [10, 15, 20, 30, 50],
  },
  maxVisiblePages: {
    type: Number,
    default: 7, // Nombre max de pages visibles avant d'afficher des ellipses
    validator: (value) => value >= 5 && value % 2 === 1, // Doit être impair et >= 5
  },
});

// Émissions
const emit = defineEmits(['update:modelValue', 'update:itemsPerPage']);

// État interne
const currentPage = ref(props.modelValue);
const localItemsPerPage = ref(props.itemsPerPage);
const jumpToPageInput = ref(null);

// Nombre total de pages
const totalPages = computed(() => {
  return Math.max(1, Math.ceil(props.totalItems / localItemsPerPage.value));
});

// Calcul de l'index de départ et fin pour l'affichage
const startItem = computed(() => {
  if (props.totalItems === 0) return 0;
  return (currentPage.value - 1) * localItemsPerPage.value + 1;
});

const endItem = computed(() => {
  const end = currentPage.value * localItemsPerPage.value;
  return Math.min(end, props.totalItems);
});

// Pages affichées avec ellipses intelligentes
const displayedPages = computed(() => {
  const pages = [];
  const total = totalPages.value;
  const current = currentPage.value;
  const maxVisible = props.maxVisiblePages;

  // Si peu de pages, afficher toutes
  if (total <= maxVisible) {
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
    return pages;
  }

  // Logique avec ellipses
  const halfVisible = Math.floor(maxVisible / 2);

  // Toujours afficher la première page
  pages.push(1);

  // Calculer la plage autour de la page courante
  let startPage = Math.max(2, current - halfVisible);
  let endPage = Math.min(total - 1, current + halfVisible);

  // Ajuster si on est proche du début
  if (current <= halfVisible + 1) {
    endPage = Math.min(maxVisible - 1, total - 1);
  }

  // Ajuster si on est proche de la fin
  if (current >= total - halfVisible) {
    startPage = Math.max(2, total - maxVisible + 2);
  }

  // Ajouter ellipse au début si nécessaire
  if (startPage > 2) {
    pages.push('ellipsis-start');
  }

  // Ajouter les pages du milieu
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  // Ajouter ellipse à la fin si nécessaire
  if (endPage < total - 1) {
    pages.push('ellipsis-end');
  }

  // Toujours afficher la dernière page
  if (total > 1) {
    pages.push(total);
  }

  return pages;
});

// Validation du saut de page
const isValidPageJump = computed(() => {
  return jumpToPageInput.value >= 1 && jumpToPageInput.value <= totalPages.value;
});

// Navigation
const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const jumpToPage = () => {
  if (isValidPageJump.value) {
    goToPage(jumpToPageInput.value);
    jumpToPageInput.value = null;
  }
};

// Mise à jour du nombre d'éléments par page
const updateItemsPerPage = () => {
  // Réinitialiser à la page 1 lors du changement
  currentPage.value = 1;
  emit('update:itemsPerPage', localItemsPerPage.value);
};

// Watchers pour synchronisation
watch(currentPage, (val) => {
  // S'assurer que la page est valide
  const validPage = Math.max(1, Math.min(val, totalPages.value));
  if (validPage !== val) {
    currentPage.value = validPage;
    return;
  }
  emit('update:modelValue', val);
});

watch(
  () => props.modelValue,
  (val) => {
    if (val !== currentPage.value) {
      currentPage.value = val;
    }
  }
);

watch(
  () => props.itemsPerPage,
  (val) => {
    if (val !== localItemsPerPage.value) {
      localItemsPerPage.value = val;
    }
  }
);

// Réinitialiser à la page 1 si le total change drastiquement
watch(
  () => props.totalItems,
  () => {
    if (currentPage.value > totalPages.value) {
      currentPage.value = Math.max(1, totalPages.value);
    }
  }
);
</script>

<style scoped>
.pagination-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1rem 0;
}

.pagination-info {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.items-per-page-selector {
  display: flex;
  align-items: center;
}

.results-info {
  font-size: 0.9rem;
}

.quick-jump {
  display: flex;
  align-items: center;
}

.pagination {
  margin: 0;
}

.page-link {
  cursor: pointer;
  user-select: none;
}

.page-item.disabled .page-link {
  cursor: not-allowed;
}

.page-item.active .page-link {
  font-weight: 600;
}

/* Responsive */
@media (max-width: 768px) {
  .pagination-wrapper {
    flex-direction: column;
    align-items: stretch;
  }

  .pagination-info {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  nav {
    width: 100%;
    overflow-x: auto;
  }

  .pagination {
    justify-content: center;
  }

  .quick-jump {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 576px) {
  .pagination-sm .page-link {
    padding: 0.25rem 0.5rem;
    font-size: 0.875rem;
  }
}
</style>
