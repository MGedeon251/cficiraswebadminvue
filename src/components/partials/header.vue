<template>
  <nav class="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
    <div class="navbar-brand-wrapper d-flex justify-content-center">
      <div
        class="navbar-brand-inner-wrapper d-flex justify-content-between align-items-center w-100"
      >
        <a class="navbar-brand brand-logo" href="/home">
          <img src="/img/photo-format.ico" alt="logo" />
        </a>
        <a class="navbar-brand brand-logo-mini" href="/home">
          <img src="/img/logo1.ico" alt="logo" />
        </a>
        <button
          class="navbar-toggler navbar-toggler align-self-center"
          type="button"
          data-toggle="minimize"
        >
          <span class="mdi mdi-sort-variant"></span>
        </button>
      </div>
    </div>

    <div class="navbar-menu-wrapper d-flex align-items-center justify-content-end">
      <!-- Barre de recherche -->
      <ul class="navbar-nav mr-lg-4 w-100">
        <li class="nav-item nav-search d-none d-lg-block w-100">
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text" id="search">
                <i class="mdi mdi-magnify"></i>
              </span>
            </div>
            <input
              type="text"
              class="form-control"
              placeholder="Search now"
              aria-label="search"
              aria-describedby="search"
            />
          </div>
        </li>
      </ul>

      <!-- Menu droite -->
      <ul class="navbar-nav navbar-nav-right">
        <!-- Notifications -->
        <li class="nav-item dropdown me-4">
          <a
            class="nav-link count-indicator dropdown-toggle d-flex align-items-center justify-content-center notification-dropdown"
            id="notificationDropdown"
            href="#"
            data-bs-toggle="dropdown"
          >
            <i class="mdi mdi-bell mx-0"></i>
            <span class="count"></span>
          </a>
          <div
            class="dropdown-menu dropdown-menu-right navbar-dropdown"
            aria-labelledby="notificationDropdown"
          >
            <p class="mb-0 font-weight-normal float-left dropdown-header">Notifications</p>
          </div>
        </li>

        <!-- Profil -->
        <li class="nav-item nav-profile dropdown" v-if="isAuthenticated">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            data-bs-toggle="dropdown"
            id="profileDropdown"
          >
            <img src="/img/faces/face29.png" alt="profile" />
            <span class="nav-profile-name">
              {{ user?.username || user?.email || 'Utilisateur' }}
            </span>
          </a>
          <div
            class="dropdown-menu dropdown-menu-right navbar-dropdown"
            aria-labelledby="profileDropdown"
          >
            <a class="dropdown-item">
              <i class="mdi mdi-settings text-primary"></i>
              Paramètres
            </a>
            <a @click="handleLogout" class="dropdown-item">
              <i class="mdi mdi-logout text-primary"></i>
              Déconnexion
            </a>
          </div>
        </li>

        <!-- Si pas connecté -->
        <li class="nav-item" v-else>
          <router-link to="/auth/login" class="nav-link">
            <i class="mdi mdi-login"></i> Connexion
          </router-link>
        </li>
      </ul>

      <button
        class="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
        type="button"
        data-toggle="offcanvas"
      >
        <span class="mdi mdi-menu"></span>
      </button>
    </div>
  </nav>
</template>

<script setup>
import { onMounted } from 'vue';
import { useAuthStore } from '@/stores/authStore/authStore';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const { user, isAuthenticated } = storeToRefs(authStore);
const router = useRouter();

const handleLogout = async () => {
  await authStore.logoutUser();
  router.push('/auth/login');
};

// Assure que le user est chargé si token présent
onMounted(async () => {
  if (authStore.token && !authStore.user) {
    await authStore.fetchCurrentUser();
  }
});
</script>
