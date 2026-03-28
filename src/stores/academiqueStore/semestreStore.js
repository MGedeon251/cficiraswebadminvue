import { defineStore } from 'pinia';
import {
  getSemestres,
  createSemestre,
  updateSemestre,
  deleteSemestre,
} from '@/api/academique/academiqueApi';
import { useMessageStore } from '@/stores/messages/messageStore';
import { extractErrorMessage } from '@/stores/messages/useErrorMessage';

// Helpers pour gérer le cache
function setCache(key, data) {
  localStorage.setItem(
    key,
    JSON.stringify({
      data,
      timestamp: Date.now(),
    })
  );
}

function getCache(key, ttl = 5 * 60 * 1000) {
  const cached = localStorage.getItem(key);
  if (!cached) return null;

  const parsed = JSON.parse(cached);
  if (Date.now() - parsed.timestamp > ttl) {
    localStorage.removeItem(key);
    return null;
  }
  return parsed.data;
}

export const useSemestreStore = defineStore('semestreStore', {
  state: () => ({
    semestres: [],
    loading: false,
  }),

  actions: {
    // Récupérer tous les semestres
    async fetchSemestres() {
      const messageStore = useMessageStore();
      this.loading = true;
      try {
        const cached = getCache('semestres');
        if (cached) {
          this.semestres = cached;
        } else {
          const response = await getSemestres();
          this.semestres = response;
          setCache('semestres', this.semestres);
        }
      } catch (error) {
        messageStore.notifyError(
          extractErrorMessage(error, 'Échec lors du chargement des semestres.')
        );
      } finally {
        this.loading = false;
      }
    },

    // Créer un semestre
    async addSemestre(data) {
      const messageStore = useMessageStore();
      this.loading = true;
      try {
        await createSemestre(data);
        messageStore.notifySuccess('Semestre créé avec succès.');
        localStorage.removeItem('semestres');
        await this.fetchSemestres();
      } catch (error) {
        messageStore.notifyError(
          extractErrorMessage(error, 'Échec lors de la création du semestre.')
        );
      } finally {
        this.loading = false;
      }
    },

    // Modifier un semestre
    async editSemestre(id, data) {
      const messageStore = useMessageStore();
      this.loading = true;
      try {
        await updateSemestre(id, data);
        messageStore.notifySuccess('Semestre mis à jour avec succès.');
        localStorage.removeItem('semestres');
        await this.fetchSemestres();
      } catch (error) {
        messageStore.notifyError(
          extractErrorMessage(error, 'Échec lors de la mise à jour du semestre.')
        );
      } finally {
        this.loading = false;
      }
    },

    // Supprimer un semestre
    async removeSemestre(id) {
      const messageStore = useMessageStore();
      this.loading = true;
      try {
        await deleteSemestre(id);
        messageStore.notifySuccess('Semestre supprimé avec succès.');
        localStorage.removeItem('semestres');
        await this.fetchSemestres();
      } catch (error) {
        messageStore.notifyError(
          extractErrorMessage(error, 'Échec lors de la suppression du semestre.')
        );
      } finally {
        this.loading = false;
      }
    },
  },
});
