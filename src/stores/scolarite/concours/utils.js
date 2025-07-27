// src/stores/scolarite/concours/utils.js

// Générer un ID unique basé sur la date et un random
export function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2, 10);
  }
  
  // Format simple d'une date YYYY-MM-DD
  export function formatDate(date) {
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  }
  