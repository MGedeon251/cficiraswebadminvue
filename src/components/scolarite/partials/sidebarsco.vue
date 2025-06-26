<template>
  <nav class="sidebar sidebar-offcanvas" id="sidebar">
    <ul class="nav">
      <!-- Tableau de bord -->
      <li class="nav-item">
        <router-link class="nav-link" to="/home">
          <i class="mdi mdi-home menu-icon"></i>
          <span class="menu-title">Tableau de Bord</span>
        </router-link>
      </li>

      <!-- Menus étudiants -->
      <li class="nav-item">
        <router-link class="nav-link" to="/etudiants">
          <i class="mdi mdi-account menu-icon"></i>
          <span class="menu-title">Étudiants</span>
        </router-link>
      </li>

      <li class="nav-item">
        <router-link class="nav-link" to="/modules">
          <i class="mdi mdi-book-open menu-icon"></i>
          <span class="menu-title">Modules</span>
        </router-link>
      </li>

      <li class="nav-item">
        <router-link class="nav-link" to="/examens">
          <i class="mdi mdi-clipboard-text menu-icon"></i>
          <span class="menu-title">Examens</span>
        </router-link>
      </li>

      <li class="nav-item">
        <router-link class="nav-link" to="/notes">
          <i class="mdi mdi-note-multiple menu-icon"></i>
          <span class="menu-title">Notes</span>
        </router-link>
      </li>

      <li class="nav-item">
        <router-link class="nav-link" to="/parcours">
          <i class="mdi mdi-map-marker-path menu-icon"></i>
          <span class="menu-title">Parcours</span>
        </router-link>
      </li>

      <li class="nav-item">
        <router-link class="nav-link" to="/supcours">
          <i class="mdi mdi-folder-text menu-icon"></i>
          <span class="menu-title">Support Cours</span>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/filieres">
          <i class="mdi mdi-folder-text menu-icon"></i>
          <span class="menu-title">Filières</span>
        </router-link>
      </li>

      <!-- Autres menus -->
      <li class="nav-item">
        <router-link class="nav-link" to="/inscriptions">
          <i class="mdi mdi-view-headline menu-icon"></i>
          <span class="menu-title">Inscriptions</span>
        </router-link>
      </li>

      <li class="nav-item">
        <router-link class="nav-link" to="/statistiques">
          <i class="mdi mdi-chart-pie menu-icon"></i>
          <span class="menu-title">Statistiques</span>
        </router-link>
      </li>

      <li class="nav-item">
        <router-link class="nav-link" to="/concours">
          <i class="mdi mdi-school menu-icon"></i>
          <span class="menu-title">Concours</span>
        </router-link>
      </li>

      <!-- Candidats -->
      <li class="nav-item">
        <a class="nav-link" href="/candidats">
          <i class="mdi mdi-account-multiple menu-icon"></i>
          <span class="menu-title">Candidats</span>
        </a>
      </li>

      <!-- Déconnexion (en bas) -->
      <li class="nav-item mt-auto">
        <router-link class="nav-link text-danger" to="/login">
          <i class="mdi mdi-logout menu-icon"></i>
          <span class="menu-title">Déconnexion</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>
