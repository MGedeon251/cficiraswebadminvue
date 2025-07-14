import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/auth/Login.vue'; // Page de login
import appNotes from '../views/notes/addNotes/main/notev1.vue';
import NotFound from '../views/errors/NotFound.vue';
import ScolariteLayout from '@/layouts/ScolariteLayout.vue';

const routes = [
  // Route de login (pas besoin de layout global ici)
  { path: '/login', name: 'Login', component: Login },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound, meta: { public: true } },
  { path: '/addNotes', name: 'appNotes', component: appNotes },

  {
    path: '/', // Chemin de base pour la scolarité
    component: ScolariteLayout, // layout spécifique à la scolarité s'il y en a un
    children: [
      {
        path: '',
        name: 'ScolariteAccueil',
        component: () => import('@/views/scolarite/scolarite.vue'),
      },
      {
        path: '/home',
        name: 'ScolariteHome',
        component: () => import('@/views/scolarite/scolarite.vue'),
      },
      {
        path: '/scolarite', // Résultat final : /scolarite
        redirect: '/home', // Redirection vers la page d'accueil de la scolarité
      },
      {
        path: '/candidats',
        name: 'ScolariteCandidats',
        component: () => import('@/views/scolarite/candidats/Candidats.vue'),
      },
      {
        path: '/candidats', // ✅ mis à jour ici
        name: 'Candidats',
        component: () => import('@/views/scolarite/candidats/Candidats.vue'),
      },
      {
        path: '/classes', // Résultat final : /scolarite/classes
        name: 'ClasseGestion',
        component: () => import('@/views/scolarite/classes/Classe.vue'),
      },
      {
        path: '/inscriptions', // Résultat final : /scolarite/inscriptions
        name: 'InscriptionsScolarite',
        component: () => import('@/views/inscriptions/Inscription.vue'),
      },
      //j'ai ajouté cette route pour la page d'examens
      {
        path: '/examens', // Résultat final : /scolarite/examens
        name: 'ExamensScolarite',
        component: () => import('@/views/examens/Examens.vue'),
      },
      {
        path: '/notes', // Résultat final : /scolarite/notes
        name: 'NotesScolarite',
        component: () => import('@/views/admin/Administration.vue'),
      },
      //j'ai ajouté cette route pour la sous pages planning des examens
      {
        path: '/examens/planning/:id', // Résultat final : /scolarite/examens
        name: 'ExamensPlanning',
        component: () => import('@/views/examens/calendrier/sample.vue'),
      },
      //j'ai ajouté cette route pour la sous pages planning des examens
      {
        path: '/etudiants', // Résultat final : /scolarite/examens
        name: 'Etudiants',
        component: () => import('@/views/etudiants/Etudiants.vue'),
      },

      {
        path: '/global',
        name: 'ScolariteGlobal',
        component: () => import('@/views/scolarite/Global.vue'),
        meta: { title: 'Vue Global' },
      },
      {
        path: '/filieres',
        name: 'FiliereIndex',
        component: () => import('@/views/scolarite/filieres/Filiere.vue'),
      },
      {
        path: '/filieres/create',
        name: 'FiliereCreate',
        component: () => import('@/views/scolarite/filieres/CreateFi.vue'),
      },
      {
        path: '/candidats',
        name: 'ListeCandidats',
        component: () => import('@/views/scolarite/candidats/ListeCandidats.vue'),
      },
      {
        path: '/scolarite/candidats/:id',
        name: 'DetailsCandidat',
        component: () => import('@/views/scolarite/candidats/DetailsCandidat.vue'),
      },
      {
        path: '/candidats/validation',
        name: 'ValidationCandidats',
        component: () => import('@/views/scolarite/candidats/ValidationCandidats.vue'),
      },
      {
        path: '/concours',
        name: 'Deconcours',
        component: () => import('@/views/scolarite/concours/Deconcours.vue'),
      },
      /*{
        path: '/organiser-concours',
        name: 'Concours',
        component: () => import('@/views/concours/concours.vue'),
      },*/
      {
        path: '/organiser-concours',
        name: 'Concours',
        component: () => import('@/views/concours-v2/Edition.vue'),
      },
      {
        path: '/edition-concours/details/:id',
        name: 'DetailsConcours',
        component: () => import('@/views/concours-v2/components/details/Details.vue'),
      },
      {
        path: '/concours/information',
        name: 'InformationConcours',
        component: () => import('@/views/scolarite/concours/Information.vue'),
      },
      {
        path: '/scolarite/concours/organiser',
        name: 'OrganiserConcours',
        component: () => import('@/views/scolarite/concours/OrganiserConcours.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
