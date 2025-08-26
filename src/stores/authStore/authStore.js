// stores/authStore.js
import { defineStore } from 'pinia';
import { login, logout, getCurrentUser, signup } from '@/api/auth/authApi';
import { useRouter } from 'vue-router';
import { useNotifier } from '@/stores/messages/useNotifier';
import { extractErrorMessage } from '@/stores/messages/useErrorMessage';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
    status: 'idle', // idle | loading | success | error
    error: null,
    lastFetch: null, // cache de la dernière récupération user
  }),

  actions: {
    // ====== SIGNUP ======
    async signupUser(data) {
      this.status = 'loading';
      this.error = null;
      try {
        const response = await signup(data); // API backend
        if (response.success && response.token) {
          this.token = response.token;
          localStorage.setItem('token', this.token);
          this.user = response.user;
          this.status = 'success';
        } else {
          throw new Error(response.message || 'Erreur lors de l’inscription');
        }
      } catch (error) {
        this.status = 'error';
        this.error = error.response?.data?.message || error.message;
        notifyError(extractErrorMessage(error, 'Erreur lors de l’inscription'));
        console.error('Erreur signup:', this.error);
      }
    },

    // ====== LOGIN ======
    async loginUser(credentials) {
      this.status = 'loading';
      this.error = null;
      try {
        const response = await login(credentials);

        if (response.success && response.token) {
          this.token = response.token;
          localStorage.setItem('token', this.token);
          this.user = response.user; // le backend renvoie déjà user
          this.status = 'success';
        } else {
          throw new Error(response.message || 'Identifiants invalides');
        }
      } catch (error) {
        const { notifyError } = useNotifier();
        this.status = 'error';
        this.error = error.response?.data?.message || error.message;
        notifyError(extractErrorMessage(error, 'Erreur lors de la connexion'));
        console.error('Erreur login:', this.error);
      }
    },

    // ====== LOGOUT ======
    async logoutUser() {
      try {
        const { notifySuccess } = useNotifier();
        await logout(); // backend peut juste renvoyer {success:true}
        notifySuccess('Déconnexion réussie');
      } catch (error) {
        console.warn('Erreur logout (côté backend):', error.message);
      }
      this.token = null;
      this.user = null;
      localStorage.removeItem('token');
      this.status = 'idle';
    },

    // ====== GET CURRENT USER ======
    async fetchCurrentUser(force = false) {
      const now = Date.now();
      if (!force && this.user && this.lastFetch && now - this.lastFetch < 300000) {
        return this.user; // cache 5min
      }
      try {
        const response = await getCurrentUser();
        if (response.success) {
          this.user = response.user;
          this.status = 'success';
          this.lastFetch = now;
        } else {
          throw new Error(response.message || 'Impossible de récupérer l’utilisateur');
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.warn('Token expiré, redirection login');
          this.logoutUser();
          const router = useRouter();
          router.push('/login');
        } else {
          this.status = 'error';
          this.error = error.response?.data?.message || error.message;
          console.error('Erreur fetchCurrentUser:', this.error);
        }
      }
    },

    checkAuthentication() {
      return !!this.token;
    },
  },

  getters: {
    isAuthenticated: (state) => !!state.token,
    getUser: (state) => state.user,
    getToken: (state) => state.token,
    userRole: (state) => state.user?.role,

    // ====== Match avec les rôles backend ======
    isAdmin: (state) => state.user?.role === 'admin',
    isScolarite: (state) => state.user?.role === 'scolarite',
    isPedagogie: (state) => state.user?.role === 'pedagogie',
    isCCycle: (state) => state.user?.role === 'c_cycle',
    isFinances: (state) => state.user?.role === 'finances',
    isDirecteur: (state) => state.user?.role === 'directeur',
    isEnseignant: (state) => state.user?.role === 'enseignant',
    isGestionnaire: (state) => state.user?.role === 'gestionnaire',
  },
});
