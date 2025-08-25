// stores/authStore.js
import { defineStore } from 'pinia';
import { login, logout, getCurrentUser } from '@/api/auth/authApi';
import { useRouter } from 'vue-router';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,  // Récupérer le token dans le stockage local si disponible
    status: 'idle',  // Pour gérer l'état de chargement ou d'erreur
  }),

  actions: {
    async fetchUser(force = false) {
      const now = Date.now();
      if (!force && this.user && now - this.lastFetch < 300000) { // 5min cache
        return this.user;
      }
      this.user = await getCurrentUser().then(res => res.data);
      this.lastFetch = now;
    },
    async loginUser(credentials) {
      this.status = 'loading';
      try {
        const response = await login(credentials);  // Appel API de connexion
        
        // Vérifie que la réponse contient un token
        if (response && response.token) {
          this.token = response.token;  // Sauvegarde le token reçu
          localStorage.setItem('token', this.token);  // Sauvegarde le token dans le localStorage
          this.status = 'success';
          await this.fetchCurrentUser();  // Récupère les informations de l'utilisateur après la connexion
        } else {
          throw new Error('Token manquant dans la réponse de l\'API');
        }
      } catch (error) {
        this.status = 'error';
        console.error('Erreur de connexion:', error.message);  // Log de l'erreur avec message
      }
    },

    async logoutUser() {
      try {
        await logout();
        this.token = null;
        this.user = null;
        localStorage.removeItem('token'); 
      } catch (error) {
        console.error('Erreur de déconnexion:', error);
      }
    },
    async fetchCurrentUser() {
      const router = useRouter();
      try {
        const response = await getCurrentUser();
        this.user = response.user;  // Sauvegarde les informations de l'utilisateur
        console.log('Utilisateur récupéré:', this.user);  // Log de l'utilisateur récupéré
        this.status = 'success';
      } catch (error) {
        // Vérification si l'erreur est liée au token expiré
        if (error.response && error.response.status === 401) {
          this.status = 'error';
          console.error('Token expiré, redirection vers la page de connexion');
          this.logoutUser();  // Déconnexion de l'utilisateur en cas de token expiré
          router.push('/login');
        } else {
          console.error('Erreur lors de la récupération de l\'utilisateur:', error);
        }
      }
    },

    checkAuthentication() {
      return !!this.token;
    },
  },
  
  getters: {
    isAuthenticated: (state) => {
      return !!state.token;  // Vérifie si un token existe
    },
    getUser: (state) =>  state.user,
    getToken: (state) => state.token,
    userRole: (state) => state.user?.role,
    // Getters par rôle
    isAdmin: (state) => state.user?.role === 'admin',
    isAgent: (state) => state.user?.role === 'agent',
    isResponsable: (state) => state.user?.role === 'responsable',
    isDirecteur: (state) => state.user?.role === 'directeur',
    isChefDivision: (state) => state.user?.role === 'chef_division',
    isStandard: (state) => state.user?.role === 'standard',
    isManager: (state) => state.user?.role === 'manager'  // si tu l'utilises encore
  }
});