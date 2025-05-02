import { createRouter, createWebHistory } from 'vue-router';
import DefaultLayout from '../layouts/DefaultLayout.vue'; // Importer le layout global
import Home from '../views/dashboard/Dashboard.vue'; // Page d'accueil
import Login from '../views/auth/Login.vue'; // Page de login
import Dashboard from '../views/dashboard/Dashboard.vue'; // Page du tableau de bord
import NotificationView from '../views/notifications/notification.vue';
import Statistique from '../views/stats/Statistiques.vue'; // Page des statistiques
import Documentation from '../views/docf/Document.vue'; // Page de la documentation
import Inscription from '../views/inscriptions/Inscription.vue';
import Schedule from '../views/schedule/Schedule.vue';
import Etudiants from '../views/etudiants/Etudiants.vue';
import Modules from '../views/matieres/Modules.vue';
import Examens from '../views/examens/Examens.vue';
import Notes from '../views/notes/Notes.vue';
import appNotes from '../views/notes/addNotes/main/notev1.vue';
import Parcours from '../views/parcours/Parcours.vue';
import Support from '../views/support/Support.vue';
import Settings from '../views/settings/Settings.vue';
import Formateur from '../views/formateurs/Formateur.vue';
import Admins from '../views/admin/Administration.vue';
import Finance from '../views/finances/Finance.vue';
import NotFound from '../views/errors/NotFound.vue';
import calendrier from '../views/examens/calendrier/sample.vue';

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
      { path: '/examens', name: 'Examens', component: Examens },
      { path: '/examens/calendrier', 
        name: 'Calendrier', 
        component: calendrier,
        props: true, },
      { path: '/notes', name: 'Notes', component: Notes },
      { path: '/parcours', name: 'Parcours', component: Parcours },
      { path: '/supcours', name: 'Support', component: Support },
      { path: '/settings', name: 'Settings', component: Settings },
      { path: '/formateur', name: 'Formateur', component: Formateur },
      { path: '/administration', name: 'Administration', component: Admins },
      { path: '/finance', name: 'Finance', component: Finance },
      { path: '/notification', name: 'Notification', component: NotificationView },
      
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
