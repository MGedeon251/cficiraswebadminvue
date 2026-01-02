import { defineStore } from 'pinia';
import {
  getFilieres,
  createFiliere,
  updateFiliere,
  deleteFiliere,
} from '@/api/academique/academiqueApi';
import { useMessageStore } from '@/stores/messages/messageStore';

// Helpers pour gérer le cache
function setCache(key, data) {
  localStorage.setItem(key, JSON.stringify({
    data,
    timestamp: Date.now()
  }));
}

function getCache(key, ttl = 5 * 60 * 1000) { // TTL par défaut : 5 minutes
  const cached = localStorage.getItem(key);
  if (!cached) return null;

  const parsed = JSON.parse(cached);
  if (Date.now() - parsed.timestamp > ttl) {
    localStorage.removeItem(key);
    return null;
  }
  return parsed.data;
}

export const useFiliereStore = defineStore('filiereStore', {
  state: () => ({
    filieres: [],
    loading: false,
  }),

  actions: {
    // Récupérer toutes les filières
    async fetchFilieres() {
      this.loading = true;
      try {
        const cached = getCache('filieres');
        if (cached) {
          this.filieres = cached;
        } else {
          const response = await getFilieres();
          this.filieres = response;
          setCache('filieres', response);
        }
      } catch (error) {
        useMessageStore().addMessage('Erreur lors de la récupération des filières.');
      } finally {
        this.loading = false;
      }
    },

    // Ajouter une nouvelle filière
    async addFiliere(data) {
      this.loading = true;
      try {
        await createFiliere(data);
        useMessageStore().addSuccess('Filière créée avec succès.');
        localStorage.removeItem('filieres'); // Invalider le cache
        this.fetchFilieres();
      } catch (error) {
        useMessageStore().addError('Erreur lors de la création de la filière.');
      } finally {
        this.loading = false;
      }
    },

    // Modifier une filière existante
    async editFiliere(id, data) {
      this.loading = true;
      try {
        await updateFiliere(id, data);
        useMessageStore().addSuccess('Filière mise à jour avec succès.');
        localStorage.removeItem('filieres'); // Invalider le cache
        this.fetchFilieres();
      } catch (error) {
        useMessageStore().addError('Erreur lors de la mise à jour de la filière.');
      } finally {
        this.loading = false;
      }
    },

    // Supprimer une filière
    async removeFiliere(id) {
      this.loading = true;
      try {
        await deleteFiliere(id);
        useMessageStore().addSuccess('Filière supprimée avec succès.');
        localStorage.removeItem('filieres'); // Invalider le cache
        this.fetchFilieres();
      } catch (error) {
        useMessageStore().addError('Erreur lors de la suppression de la filière.');
      } finally {
        this.loading = false;
      }
    },
  },
});
