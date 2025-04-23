import { defineStore } from 'pinia';
import {
  getSessions,
  getSessionById,
  createSession,
  updateSession,
  deleteSession,
} from '@/api/evaluations/evaluationApi';
import { useMessageStore } from '@/stores/messages/messageStore';

export const useSessionStore = defineStore('sessionStore', {
  state: () => ({
    sessions: [],
    session: null,
    loading: false,
  }),

  actions: {
    // Récupérer toutes les sessions
    async fetchSessions() {
      this.loading = true;
      try {
        const response = await getSessions();
        this.sessions = response.data;
      } catch (error) {
        useMessageStore().addError('Erreur lors de la récupération des sessions.');
      } finally {
        this.loading = false;
      }
    },

    // Récupérer une session par ID
    async fetchSessionById(id) {
      this.loading = true;
      try {
        const response = await getSessionById(id);
        this.session = response.data;
      } catch (error) {
        useMessageStore().addError('Erreur lors de la récupération de la session.');
      } finally {
        this.loading = false;
      }
    },

    // Ajouter une nouvelle session
    async addSession(data) {
      this.loading = true;
      try {
        await createSession(data);
        useMessageStore().addSuccess('Session créée avec succès.');
        this.fetchSessions();
      } catch (error) {
        useMessageStore().addError('Erreur lors de la création de la session.');
      } finally {
        this.loading = false;
      }
    },

    // Modifier une session existante
    async editSession(id, data) {
      this.loading = true;
      try {
        await updateSession(id, data);
        useMessageStore().addSuccess('Session mise à jour avec succès.');
        this.fetchSessions();
      } catch (error) {
        useMessageStore().addError('Erreur lors de la mise à jour de la session.');
      } finally {
        this.loading = false;
      }
    },

    // Supprimer une session
    async removeSession(id) {
      this.loading = true;
      try {
        await deleteSession(id);
        useMessageStore().addSuccess('Session supprimée avec succès.');
        this.fetchSessions();
      } catch (error) {
        useMessageStore().addError('Erreur lors de la suppression de la session.');
      } finally {
        this.loading = false;
      }
    },
  },
});
