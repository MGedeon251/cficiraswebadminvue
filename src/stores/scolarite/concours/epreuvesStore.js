// stores/scolarite/concours/epreuvesStore.js

import { ref } from 'vue';

const STORAGE_KEY = 'cf_concours_epreuves';
const epreuves = ref([]);

function loadEpreuves() {
  const raw = localStorage.getItem(STORAGE_KEY);
  epreuves.value = raw ? JSON.parse(raw) : [];
}

function saveEpreuves() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(epreuves.value));
}

function getEpreuvesByConcoursId(concoursId) {
  return epreuves.value.filter(e => e.concours_id === concoursId);
}

function addOrUpdateEpreuve(epreuve) {
  if (!epreuve.id) {
    epreuve.id = Date.now() + Math.floor(Math.random() * 1000);
    epreuves.value.push(epreuve);
  } else {
    const index = epreuves.value.findIndex(e => e.id === epreuve.id);
    if (index !== -1) epreuves.value[index] = epreuve;
  }
  saveEpreuves();
}

function removeEpreuveById(id) {
  epreuves.value = epreuves.value.filter(e => e.id !== id);
  saveEpreuves();
}

loadEpreuves();

export function useEpreuvesStore() {
  return {
    epreuves,
    loadEpreuves,
    getEpreuvesByConcoursId,
    addOrUpdateEpreuve,
    removeEpreuveById
  };
}
