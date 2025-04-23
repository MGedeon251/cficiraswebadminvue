<template>
  <div>
    <h1>Détails de la Note {{ $route.params.id }}</h1>
    <router-link to="/notes">Retour</router-link>
  </div>
</template>

<script>
export default {
  props: ['id'],
};
</script>
