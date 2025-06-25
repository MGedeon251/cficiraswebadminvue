// src/router/routes/scolarite.js
export default [
  {
    path: '/etudiants',
    name: 'Etudiants',
    component: () => import('@/views/etudiants/Etudiants.vue'),
  },
  {
    path: '/etudiants/:id',
    name: 'EtudiantDetails',
    component: () => import('@/views/etudiants/details/DetailEtudiant.vue'),
    props: true,
  },
  {
    path: '/inscriptions',
    name: 'Inscriptions',
    component: () => import('@/views/inscriptions/Inscription.vue'),
  },
];
