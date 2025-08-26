import buildService from '../config/serviceApi';
import { gestionApi, gestionFormApi } from '../config/apiClients';

const gestionService = buildService(gestionApi);
const gestionFormService = buildService(gestionFormApi);

// API pour gérer les concours
export const getConcours = () => gestionService.get('/concours/');
export const getConcoursById = (id) => gestionService.get(`/concours/${id}`);
export const createConcours = (data) => gestionService.post('/concours', data);
export const updateConcours = (id, data) => gestionService.put(`/concours/${id}`, data);
export const deleteConcours = (id) => gestionService.delete(`/concours/${id}`);

export const getEpreuvesConcours = (id) => gestionService.get(`/concours/${id}/epreuves`);
export const createEpreuves = (id, data) => gestionService.post(`/concours/${id}/epreuves`, data);

export const getResultatsConcours = (id) => gestionService.get(`/concours/${id}/resultats`);
export const getResultatsPublications = (id) => gestionService.get(`/concours/${id}/resultats`);
export const getStatistiqueConcours = (id) => gestionService.get(`/concours/${id}/statistiques`);
export const getStatistiqueConcoursGlobal = (id) =>
  gestionService.get(`/concours/${id}/statistiques-globales/`);
export const getPublicationConcours = (id) => gestionService.get(`/concours/${id}/publication`);
export const calculResultatConcour = (id, data) =>
  gestionService.get(`/concours/${id}/calculate`, data);

export const getResultatsPubliees = () => gestionService.get(`/concours/resultats/publications`);
export const getResultatsStats = (id) =>
  gestionService.get(`/concours/${id}/resultats/statistiques`);
export const getResultatsFinal = (id) => gestionService.get(`/concours/${id}/resultats/final`);

// API pour gérer les candidatures
export const getCandidatures = (id) => gestionService.get(`/candidat/concours/${id}`);
export const getCandidatureById = (id) => gestionService.get(`/candidat/${id}`);
export const createCandidature = (data) => gestionService.post('/candidat/', data);
export const addOrUpdatesNotes = (data) => gestionService.post(`/candidat/addOrUpdateNotes`, data);
export const updateCandidature = (id, data) => gestionService.put(`/candidatures/${id}`, data);
export const deleteCandidature = (id) => gestionService.delete(`/candidatures/${id}`);

export const importCandidats = async (file, concoursId) => {
  try {
    if (!file) throw new Error('Fichier manquant');
    if (!concoursId) throw new Error('ID Concours manquant');

    const formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('concours_id', concoursId);
    return await gestionFormService.post('/candidat/importv2', formData);
  } catch (error) {
    console.error('Erreur import:', error);
    throw error;
  }
};

export const importNotesCandidats = async (file, concoursId) => {
  try {
    if (!file) throw new Error('Fichier manquant');
    if (!concoursId) throw new Error('ID Concours manquant');

    const formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('concours_id', concoursId);
    return await gestionFormService.post('/candidat/importNotes', formData);
  } catch (error) {
    console.error('Erreur import:', error);
    throw error;
  }
};

// API pour gérer les créneaux (emploi du temps)
export const getCreneaux = () => gestionService.get('/creneaux');
export const getCreneauById = (id) => gestionService.get(`/creneaux/${id}`);
export const createCreneau = (data) => gestionService.post('/creneaux', data);
export const updateCreneau = (id, data) => gestionService.put(`/creneaux/${id}`, data);
export const deleteCreneau = (id) => gestionService.delete(`/creneaux/${id}`);

// API pour gérer les inscriptions
export const getInscriptions = () => gestionService.get('/inscriptions');
export const getInscriptionById = (id) => gestionService.get(`/inscriptions/${id}`);
export const createInscription = (data) => gestionService.post('/inscriptions', data);
export const updateInscription = (id, data) => gestionService.put(`/inscriptions/${id}`, data);
export const deleteInscription = (id) => gestionService.delete(`/inscriptions/${id}`);

// API pour gérer les salles
export const getSalles = () => gestionService.get('/salles');
export const getSalleById = (id) => gestionService.get(`/salles/${id}`);
export const createSalle = (data) => gestionService.post('/salles', data);
export const updateSalle = (id, data) => gestionService.put(`/salles/${id}`, data);
export const deleteSalle = (id) => gestionService.delete(`/salles/${id}`);
