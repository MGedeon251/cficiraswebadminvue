// src/stores/scolarite/concours/concoursStore.js

const CONCOURS_KEY = 'concours';

export const concoursStore = {
  getAll() {
    const data = localStorage.getItem(CONCOURS_KEY);
    return data ? JSON.parse(data) : [];
  },

  getNextId() {
    const data = this.getAll();
    if (data.length === 0) return 1;
    const ids = data.map(c => typeof c.id === 'number' ? c.id : 0);
    return Math.max(...ids) + 1;
  },

  add(concours) {
    const data = this.getAll();

    // 👇 On utilise ici un ID numérique auto-incrémenté
    if (!concours.id || typeof concours.id !== 'number') {
      concours.id = this.getNextId();
    }

    concours = {
      id: concours.id,
      designation: concours.designation || 'Sans titre',
      type_code: concours.type_code || 'inconnu',
      date_debut: concours.date_debut || null,
      date_fin: concours.date_fin || null,
      date_limite_dossier: concours.date_limite_dossier || null,
      annee_id: concours.annee_id || null,
      annee_data: concours.annee_data || {},
      dossier_requis: concours.dossier_requis || 'non',
      statut: concours.statut || 'fermé',
      description: concours.description || '',
    };

    data.push(concours);
    localStorage.setItem(CONCOURS_KEY, JSON.stringify(data));
  },

  update(id, updatedConcours) {
    const data = this.getAll();
    const index = data.findIndex(c => c.id === id);
    if (index !== -1) {
      data[index] = { ...data[index], ...updatedConcours };
      localStorage.setItem(CONCOURS_KEY, JSON.stringify(data));
    }
  },

  delete(id) {
    const data = this.getAll().filter(c => c.id !== id);
    localStorage.setItem(CONCOURS_KEY, JSON.stringify(data));
  },

  getById(id) {
    return this.getAll().find(c => c.id === id);
  },

  async fetchConcoursById(id) {
    const concours = this.getById(id);
    return new Promise(resolve => setTimeout(() => resolve(concours), 200));
  },
};
