<template>
  <nav class="sidebar sidebar-offcanvas" id="sidebar">
    <ul class="nav">
      <!-- Menu items principaux -->
      <SidebarItem icon="mdi-home" title="Tableau de Bord" to="/home" />

      <!-- Scolarité -->
      <SidebarDropdown icon="mdi-domain" title="Scolarité" collapseId="scolarite">
        <SidebarSubItem title="Étudiants" to="/etudiants" />
        <SidebarSubItem title="Modules / UV" to="/modules" />
        <SidebarSubItem title="Parcours académique" to="/parcours" />
        <SidebarSubItem title="Notes et Résultats" to="/notes" />
        <SidebarSubItem title="Support & cours" to="/supcours" />
      </SidebarDropdown>

      <!-- Examens -->
      <SidebarDropdown icon="mdi-book-open" title="Examens" collapseId="examens">
        <SidebarSubItem title="Planification" to="/planification-examens" />
        <SidebarSubItem title="Calendrier" to="/calendrier-examens" />
        <SidebarSubItem title="Salles & horaires" to="/salles-horaires" />
        <SidebarSubItem title="Rapports" to="/rapport-examens" />
      </SidebarDropdown>

      <!-- Concours -->
      <SidebarDropdown icon="mdi-trophy" title="Concours" collapseId="concours">
        <SidebarSubItem title="Editions" to="/edition-concours" />
        <SidebarSubItem title="Résultats" to="/resultats-concours" />
        <SidebarSubItem title="Rapports" to="/rapport-concours" />
      </SidebarDropdown>

      <!-- Autres liens simples -->
      <SidebarItem icon="mdi-view-headline" title="Inscriptions" to="/inscriptions" />
      <SidebarItem icon="mdi-calendar-clock" title="Emploi du temps" to="/schedule" />
      <SidebarDropdown icon="mdi-wallet" title="Finances" collapseId="finances">
        <SidebarSubItem title="Paiements & reçus" to="/paiements" />
        <SidebarSubItem title="Facturation" to="/facturation" />
        <SidebarSubItem title="Historique & rapports" to="/rapports-financiers" />
      </SidebarDropdown>

      <SidebarDropdown icon="mdi-school" title="Affaires pédagogiques" collapseId="pedagogique">
        <SidebarSubItem title="Enseignants" to="/enseignants" />
        <SidebarSubItem title="Attribution des cours" to="/attribution-cours" />
        <SidebarSubItem title="Créneaux / Horaires" to="/emplois" />
        <SidebarSubItem title="Congés & remplacements" to="/conges" />
        <SidebarSubItem title="Programmes / Crédits" to="/programmes" />
      </SidebarDropdown>

      <SidebarItem icon="mdi-library" title="Bibliothèque" to="/bibliotheque" />
      <SidebarDropdown icon="mdi-database" title="Ressources matérielles" collapseId="ressources">
        <SidebarSubItem title="Salles & équipements" to="/salles" />
        <SidebarSubItem title="Réservation" to="/reservation" />
        <SidebarSubItem title="Disponibilités" to="/disponibilites" />
      </SidebarDropdown>
      <SidebarItem icon="mdi-briefcase" title="Services" to="/administration" />

      <SidebarDropdown
        icon="mdi-clipboard-text"
        title="Coordination académique"
        collapseId="coordination"
      >
        <SidebarSubItem title="Cycles & niveaux" to="/cycles" />
        <SidebarSubItem title="Thèmes & mémoires" to="/memoires" />
        <SidebarSubItem title="Soutenances" to="/soutenances" />
        <SidebarSubItem title="Statut étudiant" to="/statut" />
      </SidebarDropdown>

      <SidebarDropdown icon="mdi-certificate" title="Diplômes" collapseId="diplomes">
        <SidebarSubItem title="Demande de diplôme" to="/demande-diplome" />
        <SidebarSubItem title="Édition & certification" to="/edition-diplome" />
        <SidebarSubItem title="Historique" to="/historique-diplome" />
      </SidebarDropdown>

      <SidebarDropdown icon="mdi-email" title="Courrier & Notes" collapseId="courrier">
        <SidebarSubItem title="Courriers" to="/courriers" />
        <SidebarSubItem title="Notes administratives" to="/notes-admin" />
        <SidebarSubItem title="Archivage" to="/archivage" />
      </SidebarDropdown>

      <SidebarItem icon="mdi-bell" title="Notifications" to="/notification" />
      <SidebarItem icon="mdi-chart-bar" title="Statistiques" to="/statistiques" />
      <SidebarItem icon="mdi-settings" title="Paramètres" to="/settings" />
    </ul>
  </nav>
</template>

<script setup>
import SidebarItem from './SidebarItem.vue';
import SidebarDropdown from './SidebarDropdown.vue';
import SidebarSubItem from './SidebarSubItem.vue';
</script>
