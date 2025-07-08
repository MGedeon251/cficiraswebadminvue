<template>
  <nav class="sidebar sidebar-offcanvas" id="sidebar">
    <ul class="nav">
      <!-- Tableau de bord -->
      <li class="nav-item">
        <a class="nav-link" href="/home">
          <i class="mdi mdi-home menu-icon"></i>
          <span class="menu-title">Tableau de Bord</span>
        </a>
      </li>

      <!-- Scolarité -->
      <li class="nav-item">
        <a class="nav-link" data-bs-toggle="collapse" href="#scolarite" aria-expanded="false">
          <i class="mdi mdi-domain menu-icon"></i>
          <span class="menu-title">Scolarité</span>
          <i class="menu-arrow"></i>
        </a>
        <div class="collapse" id="scolarite">
          <ul class="nav flex-column sub-menu">
            <li class="nav-item"><a class="nav-link" href="/etudiants">Étudiants</a></li>
            <li class="nav-item"><a class="nav-link" href="/modules">Modules / UV</a></li>
            <li class="nav-item"><a class="nav-link" href="/parcours">Parcours académique</a></li>
            <li class="nav-item"><a class="nav-link" href="/notes">Notes et Résultats</a></li>
            <li class="nav-item"><a class="nav-link" href="/supcours">Support & cours</a></li>
          </ul>
        </div>
      </li>

      <li class="nav-item">
        <a class="nav-link" data-bs-toggle="collapse" href="#examens" aria-expanded="false">
          <i class="mdi mdi-book-open menu-icon"></i>
          <span class="menu-title">Examens</span>
          <i class="menu-arrow"></i>
        </a>
        <div class="collapse" id="examens">
          <ul class="nav flex-column sub-menu">
            <li class="nav-item">
              <a class="nav-link" href="/planification-examens">Planification</a>
            </li>
            <li class="nav-item"><a class="nav-link" href="/calendrier-examens">Calendrier</a></li>
            <li class="nav-item">
              <a class="nav-link" href="/salles-horaires">Salles & horaires</a>
            </li>
            <li class="nav-item"><a class="nav-link" href="/rapport-examens">Rapports</a></li>
          </ul>
        </div>
      </li>
      <li class="nav-item">
        <a class="nav-link" data-bs-toggle="collapse" href="#concours" aria-expanded="false">
          <i class="mdi mdi-trophy menu-icon"></i>
          <span class="menu-title">Concours</span>
          <i class="menu-arrow"></i>
        </a>
        <div class="collapse" id="concours">
          <ul class="nav flex-column sub-menu">
            <li class="nav-item">
              <a class="nav-link" href="/edition-concours">Editions</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/resultats-concours">Resultats</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/rapport-concours">Rapports</a>
            </li>
          </ul>
        </div>
      </li>

      <!-- Inscriptions -->
      <li class="nav-item">
        <a class="nav-link" href="/inscriptions">
          <i class="mdi mdi-view-headline menu-icon"></i>
          <span class="menu-title">Inscriptions</span>
        </a>
      </li>

      <!-- Emploi du temps -->
      <li class="nav-item">
        <a class="nav-link" href="/schedule">
          <i class="mdi mdi-calendar-clock menu-icon"></i>
          <span class="menu-title">Emploi du temps</span>
        </a>
      </li>

      <!-- Finances -->
      <li class="nav-item">
        <a class="nav-link" data-bs-toggle="collapse" href="#finances" aria-expanded="false">
          <i class="mdi mdi-wallet menu-icon"></i>
          <span class="menu-title">Finances</span>
          <i class="menu-arrow"></i>
        </a>
        <div class="collapse" id="finances">
          <ul class="nav flex-column sub-menu">
            <li class="nav-item"><a class="nav-link" href="/paiements">Paiements & reçus</a></li>
            <li class="nav-item"><a class="nav-link" href="/facturation">Facturation</a></li>
            <li class="nav-item">
              <a class="nav-link" href="/rapports-financiers">Historique & rapports</a>
            </li>
          </ul>
        </div>
      </li>

      <!-- Affaires pédagogiques -->
      <li class="nav-item">
        <a class="nav-link" data-bs-toggle="collapse" href="#pedagogique" aria-expanded="false">
          <i class="mdi mdi-school menu-icon"></i>
          <span class="menu-title">Affaires pédagogiques</span>
          <i class="menu-arrow"></i>
        </a>
        <div class="collapse" id="pedagogique">
          <ul class="nav flex-column sub-menu">
            <li class="nav-item"><a class="nav-link" href="/enseignants">Enseignants</a></li>
            <li class="nav-item">
              <a class="nav-link" href="/attribution-cours">Attribution des cours</a>
            </li>
            <li class="nav-item"><a class="nav-link" href="/emplois">Creneaux / Horaires</a></li>
            <li class="nav-item"><a class="nav-link" href="/conges">Congés & remplacements</a></li>
            <li class="nav-item">
              <a class="nav-link" href="/programmes">Programmes / Crédits</a>
            </li>
          </ul>
        </div>
      </li>

      <!-- Bibliothèque -->
      <li class="nav-item">
        <a class="nav-link" href="/bibliotheque">
          <i class="mdi mdi-library menu-icon"></i>
          <span class="menu-title">Bibliothèque</span>
        </a>
      </li>

      <!-- Ressources matérielles -->
      <li class="nav-item">
        <a class="nav-link" data-bs-toggle="collapse" href="#ressources" aria-expanded="false">
          <i class="mdi mdi-database menu-icon"></i>
          <span class="menu-title">Ressources matérielles</span>
          <i class="menu-arrow"></i>
        </a>
        <div class="collapse" id="ressources">
          <ul class="nav flex-column sub-menu">
            <li class="nav-item"><a class="nav-link" href="/salles">Salles & équipements</a></li>
            <li class="nav-item"><a class="nav-link" href="/reservation">Réservation</a></li>
            <li class="nav-item"><a class="nav-link" href="/disponibilites">Disponibilités</a></li>
          </ul>
        </div>
      </li>
      <!-- Services -->
      <li class="nav-item">
        <a class="nav-link" href="/administration">
          <i class="mdi mdi-briefcase menu-icon"></i>
          <span class="menu-title">Services</span>
        </a>
      </li>
      <!-- Coordination académique -->
      <li class="nav-item">
        <a class="nav-link" data-bs-toggle="collapse" href="#coordination" aria-expanded="false">
          <i class="mdi mdi-clipboard-text menu-icon"></i>
          <span class="menu-title">Coordination académique</span>
          <i class="menu-arrow"></i>
        </a>
        <div class="collapse" id="coordination">
          <ul class="nav flex-column sub-menu">
            <li class="nav-item"><a class="nav-link" href="/cycles">Cycles & niveaux</a></li>
            <li class="nav-item"><a class="nav-link" href="/memoires">Thèmes & mémoires</a></li>
            <li class="nav-item"><a class="nav-link" href="/soutenances">Soutenances</a></li>
            <li class="nav-item"><a class="nav-link" href="/statut">Statut étudiant</a></li>
          </ul>
        </div>
      </li>

      <!-- Diplômes -->
      <li class="nav-item">
        <a class="nav-link" data-bs-toggle="collapse" href="#diplomes" aria-expanded="false">
          <i class="mdi mdi-certificate menu-icon"></i>
          <span class="menu-title">Diplômes</span>
          <i class="menu-arrow"></i>
        </a>
        <div class="collapse" id="diplomes">
          <ul class="nav flex-column sub-menu">
            <li class="nav-item">
              <a class="nav-link" href="/demande-diplome">Demande de diplôme</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/edition-diplome">Édition & certification</a>
            </li>
            <li class="nav-item"><a class="nav-link" href="/historique-diplome">Historique</a></li>
          </ul>
        </div>
      </li>
      <!-- Courrier -->
      <li class="nav-item">
        <a class="nav-link" data-bs-toggle="collapse" href="#courrier" aria-expanded="false">
          <i class="mdi mdi-email menu-icon"></i>
          <span class="menu-title">Courrier & Notes</span>
          <i class="menu-arrow"></i>
        </a>
        <div class="collapse" id="courrier">
          <ul class="nav flex-column sub-menu">
            <li class="nav-item"><a class="nav-link" href="/courriers">Courriers</a></li>
            <li class="nav-item">
              <a class="nav-link" href="/notes-admin">Notes administratives</a>
            </li>
            <li class="nav-item"><a class="nav-link" href="/archivage">Archivage</a></li>
          </ul>
        </div>
      </li>

      <!-- Notifications -->
      <li class="nav-item">
        <router-link class="nav-link" to="/notification">
          <i class="mdi mdi-bell menu-icon"></i>
          <span class="menu-title">Notifications</span>
        </router-link>
      </li>

      <!-- Statistiques -->
      <li class="nav-item">
        <a class="nav-link" href="/statistiques">
          <i class="mdi mdi-chart-bar menu-icon"></i>
          <span class="menu-title">Statistiques</span>
        </a>
      </li>

      <!-- Paramètres -->
      <li class="nav-item">
        <a class="nav-link" href="/settings">
          <i class="mdi mdi-settings menu-icon"></i>
          <span class="menu-title">Paramètres</span>
        </a>
      </li>
    </ul>
  </nav>
</template>
