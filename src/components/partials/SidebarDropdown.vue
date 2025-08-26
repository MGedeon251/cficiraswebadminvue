<template>
  <li class="nav-item">
    <a
      class="nav-link"
      :class="{ active: isActive }"
      data-bs-toggle="collapse"
      :href="'#' + collapseId"
      aria-expanded="false"
      role="button"
    >
      <i :class="['mdi', icon, 'menu-icon']"></i>
      <span class="menu-title">{{ title }}</span>
      <i class="menu-arrow"></i>
    </a>

    <div class="collapse" :id="collapseId" ref="collapseRef" :class="{ show: isActive }">
      <ul class="nav flex-column sub-menu">
        <slot />
      </ul>
    </div>
  </li>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'

defineProps({
  title: { type: String, required: true },
  icon: { type: String, required: true },
  collapseId: { type: String, required: true },
})

const collapseRef = ref(null)
const route = useRoute()

// Vérifie si un sous-menu est actif après le montage
const isActive = computed(() => {
  if (!collapseRef.value) return false
  const activeLink = collapseRef.value.querySelector('a.router-link-active')
  return !!activeLink
})
</script>

