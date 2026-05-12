<template>
  <div class="tabs-container">
    <ul class="nav nav-tabs px-4" role="tablist">
      <li v-for="tab in tabs" :key="tab.id" class="nav-item" role="presentation">
        <button
          class="nav-link"
          :class="{ active: activeTab === tab.id }"
          :id="`${tab.id}-tab`"
          type="button"
          role="tab"
          @click="activeTab = tab.id"
        >
          <i v-if="tab.icon" :class="[tab.icon, 'me-2']"></i>
          {{ tab.label }}
        </button>
      </li>
    </ul>

    <div class="tab-content p-4 border-start border-end border-bottom rounded-bottom bg-white">
      <Transition name="fade-slide" mode="out-in">
        <KeepAlive :include="['PaiementForm']">
          <component :is="currentTabComponent" :key="activeTab" />
        </KeepAlive>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import PaiementList from './Tab/PaiementList.vue';
import PaiementForm from './Tab/PaiementForm.vue';
import PaiementArchives from './Tab/PaiementArchives.vue';

// Configuration des onglets
const tabs = [
  { id: 'paiement', label: 'Paiements', component: PaiementList, icon: 'mdi mdi-cash' },
  {
    id: 'nouveau',
    label: 'Nouveau Paiement',
    component: PaiementForm,
    icon: 'mdi mdi-plus-circle',
  },
  { id: 'archives', label: 'Archives', component: PaiementArchives, icon: 'mdi mdi-archive' },
];

// État de l'onglet actif
const activeTab = ref('paiement');

// Calcul du composant à afficher
const currentTabComponent = computed(() => {
  return tabs.find((tab) => tab.id === activeTab.value)?.component;
});
</script>

<style scoped>
/* Style pour peaufiner l'apparence Bootstrap */
.nav-tabs .nav-link {
  border: none;
  color: #6c757d;
  font-weight: 500;
  padding: 1rem 1.5rem;
  transition: all 0.2s ease;
}

.nav-tabs .nav-link.active {
  color: #4b49ac; /* Couleur primaire selon ton thème */
  border-bottom: 3px solid #4b49ac;
  background: transparent;
}

.nav-tabs .nav-link:hover:not(.active) {
  background-color: #f8f9fa;
  border-color: transparent;
}

/* Animation de transition */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.2s ease-out;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
