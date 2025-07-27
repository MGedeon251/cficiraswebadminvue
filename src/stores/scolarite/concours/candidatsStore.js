// src/stores/scolarite/candidats/candidatsStore.js

import { filiereStore } from '../concours/filiereStore';
import { concoursStore } from '../concours/concoursStore';

const CANDIDATS_KEY = 'candidats';

export const candidatsStore = {
  getAll() {
    const data = localStorage.getItem(CANDIDATS_KEY);
    return data ? JSON.parse(data) : [];
  },

  getNextId() {
    const data = this.getAll();
    if (data.length === 0) return 1;
    const ids = data.map(c => typeof c.id === 'number' ? c.id : 0);
    return Math.max(...ids) + 1;
  },

  /**
   * Génère un matricule du type : CODEFILIERE + ID_CONCOURS + 0 + NUM_ORDRE
   * Exemple : LAP + 1 + 0 + 1 => LAP101
   */
  generateMatricule(filiereId, concoursId) {
    const filiere = filiereStore.getById(parseInt(filiereId));
    const codeFiliere = filiere?.code || 'XXX';

    const allCandidats = this.getAll();

    // Compter les candidats existants dans cette même filière pour ce concours
    const candidatsFiliere = allCandidats.filter(c =>
      (c.filiere === filiereId || c.filiere?.id === filiereId) &&
      c.concours_id === concoursId
    );

    const numeroOrdre = candidatsFiliere.length + 1;

    return `${codeFiliere}${concoursId}0${numeroOrdre}`;
  },

  add(candidat) {
    const data = this.getAll();

    if (!candidat.id || typeof candidat.id !== 'number') {
      candidat.id = this.getNextId();
    }

    // Matricule : passer l'id concours et id filière
    const concoursId = parseInt(candidat.concours_id);
    const filiereId = parseInt(candidat.filiere);

    candidat.matricule = this.generateMatricule(filiereId, concoursId);

    const newCandidat = {
      id: candidat.id,
      nom: candidat.nom || '',
      prenom: candidat.prenom || '',
      datenais: candidat.datenais || '',
      lieunais: candidat.lieunais || '',
      sexe: candidat.sexe || '',
      tel: candidat.tel || '',
      email: candidat.email || '',
      ville: candidat.ville || '',
      adresse: candidat.adresse || '',
      filiere: filiereId,
      concours_id: concoursId,
      statut: candidat.statut || '',
      nationalite: candidat.nationalite || '',
      photo: candidat.photo || null,
      photourl: candidat.photourl || '',
      date_inscription: new Date().toISOString(),
      matricule: candidat.matricule,
    };

    data.push(newCandidat);
    localStorage.setItem(CANDIDATS_KEY, JSON.stringify(data));
  },

  // Nouvelle méthode pour ajouter plusieurs candidats en une fois
  ajouter(candidats) {
    candidats.forEach(candidat => {
      this.add(candidat);
    });
  },

  update(id, updatedCandidat) {
    const data = this.getAll();
    const index = data.findIndex(c => c.id === id);
    if (index !== -1) {
      data[index] = { ...data[index], ...updatedCandidat };
      localStorage.setItem(CANDIDATS_KEY, JSON.stringify(data));
    }
  },

  delete(id) {
    const data = this.getAll().filter(c => c.id !== id);
    localStorage.setItem(CANDIDATS_KEY, JSON.stringify(data));
  },

  getById(id) {
    return this.getAll().find(c => c.id === id);
  },
};
