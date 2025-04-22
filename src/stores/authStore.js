import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    // Simuler un utilisateur avec un rôle pour la démo
    user: {
      user_role: 'admin', // Changer ici pour tester avec différents rôles : 'admin', 'user', 'manager', 'direction'
    },
  }),

  getters: {
    // Getter pour récupérer le rôle de l'utilisateur
    currentRole: (state) => state.user.user_role,
  },

  actions: {
    async fetchUser(force = false) {
      const now = Date.now();
      // Vérification du cache pour éviter les requêtes redondantes
      if (!force && this.user && now - this.lastFetch < 300000) { // 5min cache
        return this.user;
      }

      // Simuler la récupération des données utilisateur
      // Remplace cette partie par des données statiques pour le moment
      this.user = {
        id: 'USER001',
        name: 'Jean Dupont',
        user_role: 'admin', // Le rôle de l'utilisateur peut être 'admin', 'user', etc.
        email: 'jean.dupont@example.com',
      };

      // Simule la mise à jour du cache
      this.lastFetch = now;
      
      return this.user;
    },

    // Fonction pour simuler la mise à jour de l'utilisateur (par exemple lors de la connexion)
    setUser(newUser) {
      this.user = newUser;
      this.lastFetch = Date.now(); // Met à jour la date de dernière récupération
    }
  },
});
