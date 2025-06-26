<template>
  <nav class="sidebar sidebar-offcanvas" id="sidebar">
    <ul class="nav">
      <!-- 1. Tableau de bord -->
      <li class="nav-item">
        <a class="nav-link" href="/home">
          <i class="mdi mdi-home menu-icon"></i>
          <span class="menu-title">Tableau de Bord</span>
        </a>
      </li>

      <!-- 2. Scolarité -->
      <li class="nav-item">
        <a class="nav-link" data-bs-toggle="collapse" href="#scolarite" aria-expanded="false">
          <i class="mdi mdi-domain menu-icon"></i>
          <span class="menu-title">Scolarité</span>
          <i class="menu-arrow"></i>
        </a>
        <div class="collapse" id="scolarite">
          <ul class="nav flex-column sub-menu">
            <li class="nav-item">
              <a class="nav-link" href="/inscriptions">Inscriptions & Réinscriptions</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/etudiants">Informations personnelles</a>
            </li>
            <li class="nav-item"><a class="nav-link" href="/parcours">Parcours académique</a></li>
            <li class="nav-item">
              <a class="nav-link" href="/transferts">Transfert de filière</a>
            </li>
            <li class="nav-item"><a class="nav-link" href="/notes">Notes & Résultats</a></li>
            <li class="nav-item"><a class="nav-link" href="/progression">Progression</a></li>
          </ul>
        </div>
      </li>

      <!-- 3. Examens -->
      <li class="nav-item">
        <a class="nav-link" data-bs-toggle="collapse" href="#examens" aria-expanded="false">
          <i class="mdi mdi-book-open menu-icon"></i>
          <span class="menu-title">Examens</span>
          <i class="menu-arrow"></i>
        </a>
        <div class="collapse" id="examens">
          <ul class="nav flex-column sub-menu">
            <li class="nav-item">
              <a class="nav-link" href="/planification-examens">Planification des examens</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/inscription-examens">Inscriptions aux examens</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/salles-horaires">Salles & horaires</a>
            </li>
            <li class="nav-item"><a class="nav-link" href="/resultats-examens">Résultats</a></li>
          </ul>
        </div>
      </li>

      <!-- 4. Affaires pédagogiques -->
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
            <li class="nav-item"><a class="nav-link" href="/emplois">Emploi du temps</a></li>
            <li class="nav-item"><a class="nav-link" href="/conges">Congés & remplacements</a></li>
            <li class="nav-item">
              <a class="nav-link" href="/programmes">Programmes / Crédits / Horaires</a>
            </li>
          </ul>
        </div>
      </li>

      <!-- 5. Ressources matérielles -->
      <li class="nav-item">
        <a class="nav-link" data-bs-toggle="collapse" href="#ressources" aria-expanded="false">
          <i class="mdi mdi-database menu-icon"></i>
          <span class="menu-title">Ressources matérielles</span>
          <i class="menu-arrow"></i>
        </a>
        <div class="collapse" id="ressources">
          <ul class="nav flex-column sub-menu">
            <li class="nav-item"><a class="nav-link" href="/salles">Salles & équipements</a></li>
            <li class="nav-item">
              <a class="nav-link" href="/reservation">Réservation & planning</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/disponibilites">Suivi des disponibilités</a>
            </li>
          </ul>
        </div>
      </li>

      <!-- 6. Bibliothèque -->
      <li class="nav-item">
        <a class="nav-link" data-bs-toggle="collapse" href="#bibliotheque" aria-expanded="false">
          <i class="mdi mdi-library menu-icon"></i>
          <span class="menu-title">Bibliothèque</span>
          <i class="menu-arrow"></i>
        </a>
        <div class="collapse" id="bibliotheque">
          <ul class="nav flex-column sub-menu">
            <li class="nav-item"><a class="nav-link" href="/catalogue">Catalogue</a></li>
            <li class="nav-item"><a class="nav-link" href="/prets">Prêts & retours</a></li>
            <li class="nav-item">
              <a class="nav-link" href="/recherche">Recherche documentaire</a>
            </li>
          </ul>
        </div>
      </li>

      <!-- 7. Finances -->
      <li class="nav-item">
        <a class="nav-link" data-bs-toggle="collapse" href="#finances" aria-expanded="false">
          <i class="mdi mdi-currency-eur menu-icon"></i>
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

      <!-- 8. Coordination académique -->
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
            <li class="nav-item">
              <a class="nav-link" href="/soutenances">Calendrier des soutenances</a>
            </li>
            <li class="nav-item"><a class="nav-link" href="/statut">Statut étudiant</a></li>
          </ul>
        </div>
      </li>

      <!-- 9. Diplômes -->
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

      <!-- 10. Courrier & Notes administratives -->
      <li class="nav-item">
        <a class="nav-link" data-bs-toggle="collapse" href="#courrier" aria-expanded="false">
          <i class="mdi mdi-email menu-icon"></i>
          <span class="menu-title">Courrier & Notes</span>
          <i class="menu-arrow"></i>
        </a>
        <div class="collapse" id="courrier">
          <ul class="nav flex-column sub-menu">
            <li class="nav-item">
              <a class="nav-link" href="/courriers">Saisie & suivi des courriers</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/notes-admin">Notes & circulaires</a>
            </li>
            <li class="nav-item"><a class="nav-link" href="/archivage">Archivage</a></li>
          </ul>
        </div>
      </li>

      <!-- 11. Paramètres -->
      <li class="nav-item">
        <a class="nav-link" data-bs-toggle="collapse" href="#parametres" aria-expanded="false">
          <i class="mdi mdi-settings menu-icon"></i>
          <span class="menu-title">Paramètres</span>
          <i class="menu-arrow"></i>
        </a>
        <div class="collapse" id="parametres">
          <ul class="nav flex-column sub-menu">
            <li class="nav-item">
              <a class="nav-link" href="/utilisateurs">Gestion des utilisateurs</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/permissions">Permissions & rôles</a>
            </li>
            <li class="nav-item"><a class="nav-link" href="/journal">Journaux d’activité</a></li>
          </ul>
        </div>
      </li>

      <!-- Notifications -->
      <li class="nav-item">
        <router-link class="nav-link" to="/notifications">
          <i class="mdi mdi-bell menu-icon"></i>
          <span class="menu-title">Notifications</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>
