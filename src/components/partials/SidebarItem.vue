<template>
  <li class="nav-item">
    <router-link class="nav-link" :to="to" active-class="active" exact>
      <i :class="['mdi', icon, 'menu-icon']"></i>
      <span class="menu-title">{{ title }}</span>
    </router-link>
  </li>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  to: { type: String, required: true },
  icon: { type: String, required: true },
});
</script>
