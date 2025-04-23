import buildService from '../config/serviceApi';
import { academiqueApi } from '../config/apiClients';

const etudiantService = buildService(academiqueApi);

// API pour gérer les étudiants
export const getEtudiants = () => etudiantService.get('/etudiants/');
export const getEtudiantById = (id) => etudiantService.get(`/etudiants/${id}`);
export const createEtudiant = (data) => etudiantService.post('/etudiant', data);
export const updateEtudiant = (id, data) => etudiantService.put(`/etudiants/${id}`, data);
export const deleteEtudiant = (id) => etudiantService.delete(`/etudiants/${id}`);

// API pour les résultats spécifiques à un étudiant
export const getResultatsByEtudiant = (etudiantId) =>
  etudiantService.get(`/etudiants/${etudiantId}/resultats`);

// API pour les notes spécifiques à un étudiant
export const getNotesByEtudiant = (etudiantId) => etudiantService.get(`/etudiants/${etudiantId}/notes`);

// API pour la moyenne spécifique à un étudiant
export const getMoyenneByEtudiant = (etudiantId) =>
  etudiantService.get(`/etudiants/${etudiantId}/moyenne`);

// API pour les évaluations spécifiques à un étudiant
export const getEvaluationsByEtudiant = (etudiantId) =>
  etudiantService.get(`/etudiants/${etudiantId}/evaluations`);
export const createEvaluationForEtudiant = (etudiantId, data) =>
  etudiantService.post(`/etudiants/${etudiantId}/evaluations`, data);
export const updateEvaluationForEtudiant = (etudiantId, evaluationId, data) =>
  etudiantService.put(`/etudiants/${etudiantId}/evaluations/${evaluationId}`, data);
export const deleteEvaluationForEtudiant = (etudiantId, evaluationId) =>
  etudiantService.delete(`/etudiants/${etudiantId}/evaluations/${evaluationId}`);

// Route pour lister les étudiants par classe, filière et année académique
export const getEtudiantsByClasseFiliereAnnee = (classeId, filiereId, anneeAcademiqueId) =>
  etudiantService.get(
    `/etudiants/classe/${classeId}/filiere/${filiereId}/annee/${anneeAcademiqueId}`
);
