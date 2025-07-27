// src/stores/scolarite/concours/dossierStore.js

const DOSSIERS_KEY = 'dossiers';

export const dossierStore = {
  getAll() {
    const data = localStorage.getItem(DOSSIERS_KEY);
    return data ? JSON.parse(data) : [];
  },

  getByCandidatId(candidatId) {
    return this.getAll().filter(d => d.candidatId === candidatId);
  },

  add(dossier) {
    const data = this.getAll();

    const newDossier = {
      id: Date.now(),
      nom: dossier.nom || 'document',
      type: dossier.type || '',
      taille: dossier.taille || 0,
      contenu: dossier.contenu || '', // base64 string
      url: dossier.url || '',
      candidatId: dossier.candidatId || null,
    };

    data.push(newDossier);
    localStorage.setItem(DOSSIERS_KEY, JSON.stringify(data));
  },

  delete(id) {
    const filtered = this.getAll().filter(d => d.id !== id);
    localStorage.setItem(DOSSIERS_KEY, JSON.stringify(filtered));
  },

  clearAll() {
    localStorage.removeItem(DOSSIERS_KEY);
  }
};
