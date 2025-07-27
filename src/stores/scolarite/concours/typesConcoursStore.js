// src/stores/scolarite/concours/typesConcoursStore.js

const TYPES_CONCOURS_KEY = 'types_concours';

// Jeu initial par défaut
const DEFAULT_TYPES = [
  { id: '1', code: 'TEST', libelle: 'Test' },
  { id: '2', code: 'PASSAGE', libelle: 'Passage' },
  { id: '3', code: 'CONCOURS', libelle: 'Concours' },
];

export const typesConcoursStore = {
  getAll() {
    const data = localStorage.getItem(TYPES_CONCOURS_KEY);
    if (!data) {
      localStorage.setItem(TYPES_CONCOURS_KEY, JSON.stringify(DEFAULT_TYPES));
      return DEFAULT_TYPES;
    }
    return JSON.parse(data);
  },
  add(type) {
    const types = this.getAll();
    types.push(type);
    localStorage.setItem(TYPES_CONCOURS_KEY, JSON.stringify(types));
  },
  update(id, updatedType) {
    const types = this.getAll();
    const index = types.findIndex(t => t.id === id);
    if (index !== -1) {
      types[index] = { ...types[index], ...updatedType };
      localStorage.setItem(TYPES_CONCOURS_KEY, JSON.stringify(types));
    }
  },
  delete(id) {
    const types = this.getAll().filter(t => t.id !== id);
    localStorage.setItem(TYPES_CONCOURS_KEY, JSON.stringify(types));
  },
  getById(id) {
    return this.getAll().find(t => t.id === id);
  },
};
