<script setup lang="ts">
import Footer from './Footer.vue';
</script>
<template>
  <div class="container-scroller">
    <!-- partial:partials/_navbar.html -->
    <nav class="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
      <div class="navbar-brand-wrapper d-flex justify-content-center">
        <div
          class="navbar-brand-inner-wrapper d-flex justify-content-between align-items-center w-100"
        >
          <a class="navbar-brand brand-logo" href="/home"
            ><img src="/img/photo-format.ico" alt="logo"
          /></a>
          <a class="navbar-brand brand-logo-mini" href="/home"
            ><img src="/img/logo1.ico" alt="logo"
          /></a>
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
        <ul class="navbar-nav navbar-nav-right">
          <li class="nav-item dropdown me-1">
            <a
              class="nav-link count-indicator dropdown-toggle d-flex justify-content-center align-items-center"
              id="messageDropdown"
              href="#"
              data-bs-toggle="dropdown"
            >
              <i class="mdi mdi-message-text mx-0"></i>
              <span class="count"></span>
            </a>
            <div
              class="dropdown-menu dropdown-menu-right navbar-dropdown"
              aria-labelledby="messageDropdown"
            >
              <p class="mb-0 font-weight-normal float-left dropdown-header">Messages</p>
            </div>
          </li>
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
          <li class="nav-item nav-profile dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              data-bs-toggle="dropdown"
              id="profileDropdown"
            >
              <img src="/img/faces/face29.png" alt="profile" />
              <span class="nav-profile-name">Gedeon LEKOUNDA</span>
            </a>
            <div
              class="dropdown-menu dropdown-menu-right navbar-dropdown"
              aria-labelledby="profileDropdown"
            >
              <a class="dropdown-item">
                <i class="mdi mdi-settings text-primary"></i>
                Settings
              </a>
              <a class="dropdown-item">
                <i class="mdi mdi-logout text-primary"></i>
                Logout
              </a>
            </div>
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
    <!-- partial -->
    <div class="container-fluid page-body-wrapper">
      <!-- partial:partials/_sidebar.html -->
      <nav class="sidebar sidebar-offcanvas" id="sidebar">
        <ul class="nav">
          <li class="nav-item">
            <a class="nav-link" href="/home">
              <i class="mdi mdi-home menu-icon"></i>
              <span class="menu-title">Tableau de Bord </span>
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              data-bs-toggle="collapse"
              href="#ui-basic"
              aria-expanded="false"
              aria-controls="ui-basic"
            >
              <i class="mdi mdi-circle-outline menu-icon"></i>
              <span class="menu-title">Portail Etudiant</span>
              <i class="menu-arrow"></i>
            </a>
            <div class="collapse" id="ui-basic">
              <ul class="nav flex-column sub-menu">
                <li class="nav-item"><a class="nav-link" href="/etudiants">Etudiants</a></li>
                <li class="nav-item"><a class="nav-link" href="/modules">Modules</a></li>
                <li class="nav-item"><a class="nav-link" href="/examens">Examens</a></li>
                <li class="nav-item"><a class="nav-link" href="/notes">Notes</a></li>
                <li class="nav-item"><a class="nav-link" href="/parcours">Parcours</a></li>
                <li class="nav-item"><a class="nav-link" href="/supcours">Support Cours</a></li>
              </ul>
            </div>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/inscriptions">
              <i class="mdi mdi-view-headline menu-icon"></i>
              <span class="menu-title">Inscriptions</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/schedule">
              <i class="mdi mdi-grid-large menu-icon"></i>
              <span class="menu-title">Emploi du temps</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/statistiques">
              <i class="mdi mdi-chart-pie menu-icon"></i>
              <span class="menu-title">Statistiques</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/administration">
              <i class="mdi mdi-briefcase menu-icon"></i>
              <span class="menu-title">Services</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/finance">
              <i class="mdi mdi-currency-eur menu-icon"></i>
              <span class="menu-title">Finances</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/formateur">
              <i class="mdi mdi-account-multiple menu-icon"></i>
              <span class="menu-title">Formateurs</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/documentation">
              <i class="mdi mdi-file-document-box-outline menu-icon"></i>
              <span class="menu-title">Documents</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/settings">
              <i class="mdi mdi-server menu-icon"></i>
              <span class="menu-title">Preferences</span>
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              data-bs-toggle="collapse"
              href="#auth"
              aria-expanded="false"
              aria-controls="auth"
            >
              <i class="mdi mdi-account-circle menu-icon"></i>
              <span class="menu-title">Compte</span>
              <i class="menu-arrow"></i>
            </a>
            <div class="collapse" id="auth">
              <ul class="nav flex-column sub-menu">
                <li class="nav-item"><a class="nav-link" href="/login"> Login </a></li>
                <li class="nav-item">
                  <a class="nav-link" href="pages/samples/login-2.html"> Login 2 </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="pages/samples/register.html"> Register </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="pages/samples/register-2.html"> Register 2 </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="pages/samples/lock-screen.html"> Lockscreen </a>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </nav>
      <div class="main-panel">
        <div class="content-wrapper">
          <slot></slot>
        </div>
        <Footer></Footer>
      </div>
    </div>
  </div>
</template>
