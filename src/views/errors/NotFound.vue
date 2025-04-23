<template>
  <div class="container text-center py-5">
    <div class="error-code display-1 fw-bold text-primary animate__animated animate__fadeInDown">
      404
    </div>
    <p class="lead text-muted">Oups ! La page que vous cherchez n’existe pas ou a été déplacée.</p>
    <img
      src="https://cdn-icons-png.flaticon.com/512/2748/2748558.png"
      alt="Erreur 404"
      class="img-fluid my-4"
      style="max-width: 200px"
    />
    <router-link to="/home" class="btn btn-outline-primary btn-lg mt-3">
      Retour à l’accueil
    </router-link>
  </div>
</template>

<style scoped>
@import 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css';

.error-code {
  font-size: 10rem;
}
</style>
