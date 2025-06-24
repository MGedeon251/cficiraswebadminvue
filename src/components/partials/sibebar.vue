<template>
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
        <a class="nav-link" href="/concours">
          <i class="mdi mdi-currency-eur menu-icon"></i>
          <span class="menu-title">concours</span>
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
        <router-link class="nav-link" to="/notification">
          <i class="mdi mdi-bell menu-icon"></i>
          <span class="menu-title">Notifications</span>
        </router-link>
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
</template>
