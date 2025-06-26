import { createRouter, createWebHistory } from 'vue-router';

// Importer le layout global
import DefaultLayout from '../layouts/DefaultLayout.vue'; // Importer le layout global
//page  d'accueil
import Home from '../views/dashboard/Dashboard.vue'; // Page d'accueil
import Login from '../views/auth/Login.vue'; // Page de login

//Tableau de bord
import Dashboard from '../views/dashboard/Dashboard.vue'; // Page du tableau de bord
// Notification
import NotificationView from '../views/notifications/notification.vue';
import Statistique from '../views/stats/Statistiques.vue'; // Page des statistiques
import Documentation from '../views/docf/Document.vue'; // Page de la documentation

// Inscriptions et admissions
import Inscription from '../views/inscriptions/Inscription.vue';
// Planification des cours et emplois du temps
import Schedule from '../views/schedule/Schedule.vue';
// Etudiants et gestion des étudiants (Details)
import Etudiants from '../views/etudiants/Etudiants.vue';
//Modules et matières

import Modules from '../views/matieres/Modules.vue';

//Planification des examens
import Examens from '../views/examens/Examens.vue';
import Planning from '../views/examens/calendrier/sample.vue';
import DetailExamen from '../views/examens/calendrier/detail/DetailExamen.vue'; // Détails des examens
import Calendrier from '../views/examens/calendrier/Calendrier.vue'; // Calendrier des examens
import Plannification from '../views/examens/planification/Planification.vue'; // Planification des examens
import Salles from '../views/examens/salles/Salles.vue'; // Salles d'examen
import RapportExamens from '../views/examens/rapports/RapportExamens.vue'; // Rapport des examens
//Notes et résultats
import Notes from '../views/notes/Notes.vue'; // Page des notes
import appNotes from '../views/notes/addNotes/main/notev1.vue';
//Parcours et filières
import Parcours from '../views/parcours/Parcours.vue';
// Cours et supports
import Support from '../views/support/Support.vue';
//Paramètres et configurations
import Settings from '../views/settings/Settings.vue';
//Formateurs et enseignants
import Formateur from '../views/formateurs/Formateur.vue';
//Administration et gestion
import Admins from '../views/admin/Administration.vue';
//Finances et paiements
import Finance from '../views/finances/Finance.vue';
//PAGE  Not Found (ERREUR 404)
import NotFound from '../views/errors/NotFound.vue';

const routes = [
  // Route de login (pas besoin de layout global ici)
  { path: '/login', name: 'Login', component: Login },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound, meta: { public: true } },
  { path: '/addNotes', name: 'appNotes', component: appNotes },
  // Routes qui utilisent le layout global DefaultLayout
  {
    path: '/',
    component: DefaultLayout, // Enveloppe tout le contenu avec le DefaultLayout
    children: [
      { path: '', name: 'root', component: Home },
      { path: '/home', name: 'Home', component: Home },
      { path: '/dashboard', name: 'Dashboard', component: Dashboard }, // Tableau de bord
      { path: '/statistiques', name: 'Statistique', component: Statistique }, // Statistiques
      { path: '/documentation', name: 'Documentations', component: Documentation },
      { path: '/inscriptions', name: 'Inscriptions', component: Inscription },
      { path: '/schedule', name: 'Schedule', component: Schedule },
      { path: '/etudiants', name: 'Etudiants', component: Etudiants },
      {
        path: '/etudiants/:id',
        name: 'EtudiantDetails',
        component: () => import('@/views/etudiants/details/DetailEtudiant.vue'),
        props: true,
      },
      { path: '/modules', name: 'Modules', component: Modules },
      {
        path: '/modules/:id',
        name: 'ModuleDetails',
        component: () => import('@/views/matieres/details/DetailsPanel.vue'),
        props: true,
      },
      { path: '/notes', name: 'Notes', component: Notes },
      { path: '/parcours', name: 'Parcours', component: Parcours },
      { path: '/supcours', name: 'Support', component: Support },
      { path: '/settings', name: 'Settings', component: Settings },
      { path: '/enseignants', name: 'Formateur', component: Formateur },
      { path: '/administration', name: 'Administration', component: Admins },
      { path: '/finance', name: 'Finance', component: Finance },
      { path: '/notification', name: 'Notification', component: NotificationView },

      { path: '/examens', name: 'Examens', component: Examens },
      { path: '/examens/planning/:id', name: 'Planning', component: Planning, props: true },
      {
        path: '/examens/planning/:id/calendrier/:semestreId',
        name: 'Calendrier',
        component: DetailExamen,
        props: true,
      },
      { path: '/planification-examens', name: 'Planification', component: Plannification },
      { path: '/calendrier-examens', name: 'CalendrierExamens', component: Calendrier },
      { path: '/salles-horaires', name: 'SallesExamens', component: Salles },
      { path: '/rapport-examens', name: 'RapportExamens', component: RapportExamens },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
