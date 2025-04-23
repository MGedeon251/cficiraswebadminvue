<!-- settings.vue -->
<template>
  <div class="row">
    <h2>Preferences</h2>
    <p>Personnalizez votre compte</p>

    <div class="col-md-12 grid-margin stretch-card">
      <!-- Votre contenu existant -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'Setting',
  data() {
    return {
      email: 'gedeon.lekounda@gmail.com',
      selectedTheme: 'light',
      loading: true,
    };
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  },
};
</script>
