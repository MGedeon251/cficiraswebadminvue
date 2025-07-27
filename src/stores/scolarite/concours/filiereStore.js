// src/stores/scolarite/filiere/filiereStore.js

const FILIERES_KEY = 'filieres';

const initialFilieres = [
  {
    id: 1,
    nom: 'Informatique',
    code: 'LIC',
    niveau: 'Licence',
    description: 'Licence en Informatique'
  },
  {
    id: 2,
    nom: 'Administration Publique',
    code: 'LAP',
    niveau: 'Licence',
    description: 'Licence en Administration Publique'
  },
  {
    id: 3,
    nom: 'Informatique de Gestion',
    code: 'DIG',
    niveau: 'DUT',
    description: 'DUT en Informatique de Gestion'
  },
  {
    id: 4,
    nom: 'Droit',
    code: 'LDR',
    niveau: 'Licence',
    description: 'Licence en Droit'
  },
  {
    id: 5,
    nom: 'Comptabilité',
    code: 'LCO',
    niveau: 'Licence',
    description: 'Licence en Comptabilité'
  }
];

function initialize() {
  if (!localStorage.getItem(FILIERES_KEY)) {
    localStorage.setItem(FILIERES_KEY, JSON.stringify(initialFilieres));
  }
}

export const filiereStore = {
  getAll() {
    initialize();
    const data = localStorage.getItem(FILIERES_KEY);
    return data ? JSON.parse(data) : [];
  },

  getNextId() {
    const data = this.getAll();
    if (data.length === 0) return 1;
    const ids = data.map(f => typeof f.id === 'number' ? f.id : 0);
    return Math.max(...ids) + 1;
  },

  add(filiere) {
    const data = this.getAll();

    if (!filiere.id || typeof filiere.id !== 'number') {
      filiere.id = this.getNextId();
    }

    const newFiliere = {
      id: filiere.id,
      nom: filiere.nom || 'Filière sans nom',
      code: filiere.code || '',
      niveau: filiere.niveau || '',
      description: filiere.description || '',
    };

    data.push(newFiliere);
    localStorage.setItem(FILIERES_KEY, JSON.stringify(data));
  },

  update(id, updatedFiliere) {
    const data = this.getAll();
    const index = data.findIndex(f => f.id === id);
    if (index !== -1) {
      data[index] = { ...data[index], ...updatedFiliere };
      localStorage.setItem(FILIERES_KEY, JSON.stringify(data));
    }
  },

  delete(id) {
    const data = this.getAll().filter(f => f.id !== id);
    localStorage.setItem(FILIERES_KEY, JSON.stringify(data));
  },

  getById(id) {
    return this.getAll().find(f => f.id === id);
  },
};
