<template>
  <img :src="`/src/assets/icons/${name}.svg`" :class="customClass" alt="" />
</template>

<script setup>
defineProps({
  name: String,
  customClass: String,
});
</script>
