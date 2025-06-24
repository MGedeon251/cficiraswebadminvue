import buildService from '../config/serviceApi';
import { pedagogieApi } from '../config/apiClients';

const pedagogieService = buildService(pedagogieApi);

// API pour gérer les enseignants
export const getEnseignants = () => pedagogieService.get('/enseignant/enseignants');
export const getEnseignantById = (id) => pedagogieService.get(`/enseignant/enseignants/${id}`);
export const createEnseignant = (data) => pedagogieService.post('/enseignant/enseignants', data);
export const updateEnseignant = (id, data) =>
  pedagogieService.put(`/enseignant/enseignants/${id}`, data);
export const deleteEnseignant = (id) => pedagogieService.delete(`/enseignant/enseignants/${id}`);

// API pour gérer les contrats
export const getContrats = () => pedagogieService.get('/contrats');
export const getContratById = (id) => pedagogieService.get(`/contrats/${id}`);
export const createContrat = (data) => pedagogieService.post('/contrats', data);
export const updateContrat = (id, data) => pedagogieService.put(`/contrats/${id}`, data);
export const deleteContrat = (id) => pedagogieService.delete(`/contrats/${id}`);

// API pour gérer les diplômes
export const getDiplomes = () => pedagogieService.get('/diplomes');
export const getDiplomeById = (id) => pedagogieService.get(`/diplomes/${id}`);
export const createDiplome = (data) => pedagogieService.post('/diplomes', data);
export const updateDiplome = (id, data) => pedagogieService.put(`/diplomes/${id}`, data);
export const deleteDiplome = (id) => pedagogieService.delete(`/diplomes/${id}`);

// API pour gérer les enseignants par module
export const getEnseignantsByModule = (moduleId) =>
  pedagogieService.get(`/modules/${moduleId}/enseignants`);
export const assignEnseignantToModule = (moduleId, enseignantId) =>
  pedagogieService.post(`/modules/${moduleId}/enseignants`, { enseignantId });
export const removeEnseignantFromModule = (moduleId, enseignantId) =>
  pedagogieService.delete(`/modules/${moduleId}/enseignants/${enseignantId}`);

// API pour gérer les enseignants par classe
export const getEnseignantsByClasse = (classeId) =>
  pedagogieService.get(`/classes/${classeId}/enseignants`);
export const assignEnseignantToClasse = (classeId, enseignantId) =>
  pedagogieService.post(`/classes/${classeId}/enseignants`, { enseignantId });
export const removeEnseignantFromClasse = (classeId, enseignantId) =>
  pedagogieService.delete(`/classes/${classeId}/enseignants/${enseignantId}`);

// API pour gérer les créneaux des enseignants
export const getCreneauxByEnseignant = (enseignantId) =>
  pedagogieService.get(`/enseignants/${enseignantId}/creneaux`);
export const assignCreneauToEnseignant = (enseignantId, creneauId) =>
  pedagogieService.post(`/enseignants/${enseignantId}/creneaux`, { creneauId });
export const removeCreneauFromEnseignant = (enseignantId, creneauId) =>
  pedagogieService.delete(`/enseignants/${enseignantId}/creneaux/${creneauId}`);
