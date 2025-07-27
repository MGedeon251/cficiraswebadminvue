// src/stores/scolarite/concours/anneeStore.js
import { generateId } from './utils.js';

const ANNEES_KEY = 'annees_academiques';

export const anneeStore = {
  getAll() {
    const data = localStorage.getItem(ANNEES_KEY);
    return data ? JSON.parse(data) : [];
  },
  add(annee) {
    const annees = this.getAll();
    annee.id = generateId();
    annees.push(annee);
    localStorage.setItem(ANNEES_KEY, JSON.stringify(annees));
  },
  update(id, updatedAnnee) {
    const annees = this.getAll();
    const index = annees.findIndex(a => a.id === id);
    if (index !== -1) {
      annees[index] = { ...annees[index], ...updatedAnnee };
      localStorage.setItem(ANNEES_KEY, JSON.stringify(annees));
    }
  },
  delete(id) {
    const annees = this.getAll().filter(a => a.id !== id);
    localStorage.setItem(ANNEES_KEY, JSON.stringify(annees));
  },
  getById(id) {
    return this.getAll().find(a => a.id === id);
  },
  getLast() {
    const annees = this.getAll();
    if (!annees.length) return null;
    
    // trie par nom (ex: "2024-2025") en prenant la fin
    return annees.sort((a, b) => {
      const anA = parseInt(a.nom?.split('-')[0]) || 0;
      const anB = parseInt(b.nom?.split('-')[0]) || 0;
      return anB - anA;
    })[0];
  }
  
};
