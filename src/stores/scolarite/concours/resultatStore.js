const RESULTATS_KEY = 'resultats';

export const resultatsStore = {
  getAll() {
    const data = localStorage.getItem(RESULTATS_KEY);
    return data ? JSON.parse(data) : [];
  },

  add(resultat) {
    const resultats = this.getAll();
    resultats.push(resultat);
    localStorage.setItem(RESULTATS_KEY, JSON.stringify(resultats));
  },

  update(id, updatedResultat) {
    const resultats = this.getAll();
    const index = resultats.findIndex(r => r.id === id);
    if (index !== -1) {
      resultats[index] = { ...resultats[index], ...updatedResultat };
      localStorage.setItem(RESULTATS_KEY, JSON.stringify(resultats));
    }
  },

  delete(id) {
    const resultats = this.getAll().filter(r => r.id !== id);
    localStorage.setItem(RESULTATS_KEY, JSON.stringify(resultats));
  },

  getById(id) {
    return this.getAll().find(r => r.id === id);
  }
};
