
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Dashboard.vue'; // Page d'accueil
import Login from '../views/auth/Login.vue'; // Page de login
import Dashboard from '../views/Dashboard.vue'; // Page du tableau de bord
import Statistique from '../views/stats/Statistiques.vue'; // Page des statistiques
import Documentation from '../views/docf/Document.vue'; // Page de la documentation
import Inscription from '../views/Inscription.vue';
import Schedule from '../views/Schedule.vue';
import Etudiants from '../views/portal/Etudiants.vue';
import Modules from '../views/portal/Modules.vue';
import Examens from '../views/portal/Examens.vue';
import Notes from '../views/portal/Notes.vue';
import Parcours from '../views/portal/Parcours.vue';
import Support from '../views/portal/Support.vue';
import Settings from '../views/Settings.vue';

const routes = [
  { path: '/', name: 'home', component: Home }, // Route vers la page d'accueil
  { path: '/home', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login }, // Route vers le login
  { path: '/dashboard', name: 'Dashboard', component: Dashboard }, // Tableau de bord
  { path: '/statistiques', name: 'Statistique', component: Statistique }, // Statistiques
  { path: '/documentation', name: 'Documentations', component: Documentation },
  { path: '/inscriptions', name: 'Inscriptions', component: Inscription },
  { path: '/schedule', name: 'Schedule', component: Schedule },
  { path: '/etudiants', name: 'Etudiants', component: Etudiants },
  { path: '/modules', name: 'Modules', component: Modules},
  { path: '/examens', name: 'Examens', component: Examens},
  { path: '/notes', name: 'Notes', component: Notes},
  { path: '/parcours', name: 'Parcours', component: Parcours}, 
  { path: '/supcours', name: 'Support', component: Support},
  { path: '/settings', name: 'Settings', component: Settings},  

  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
