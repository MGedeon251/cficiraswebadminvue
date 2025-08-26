<template>
  <li class="nav-item">
    <router-link
      class="nav-link"
      :to="to"
      active-class="active-submenu"
      exact
    >
      {{ title }}
    </router-link>
  </li>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  to: { type: String, required: true },
})
</script>

