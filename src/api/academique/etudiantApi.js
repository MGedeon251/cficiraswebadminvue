import buildService from '../config/serviceApi';
import { academiqueApi } from '../config/apiClients';

const etudiantService = buildService(academiqueApi);

// API pour gérer les étudiants
export const getEtudiants = () => etudiantService.get('/etudiant');
export const getEtudiantById = (id) => etudiantService.get(`/etudiant/${id}`);
export const createEtudiant = (data) => etudiantService.post('/etudiant', data);
export const updateEtudiant = (id, data) => etudiantService.put(`/etudiant/${id}`, data);
export const deleteEtudiant = (id) => etudiantService.delete(`/etudiant/${id}`);

// API pour les résultats spécifiques à un étudiant
export const getResultatsByEtudiant = (etudiantId) =>
  etudiantService.get(`/etudiant/${etudiantId}/resultats`);

// API pour les notes spécifiques à un étudiant
export const getNotesByEtudiant = (etudiantId) => etudiantService.get(`/etudiant/${etudiantId}/notes`);

// API pour la moyenne spécifique à un étudiant
export const getMoyenneByEtudiant = (etudiantId) =>
  etudiantService.get(`/etudiant/${etudiantId}/moyenne`);

// API pour les évaluations spécifiques à un étudiant
export const getEvaluationsByEtudiant = (etudiantId) =>
  etudiantService.get(`/etudiant/${etudiantId}/evaluations`);
export const createEvaluationForEtudiant = (etudiantId, data) =>
  etudiantService.post(`/etudiant/${etudiantId}/evaluations`, data);
export const updateEvaluationForEtudiant = (etudiantId, evaluationId, data) =>
  etudiantService.put(`/etudiant/${etudiantId}/evaluations/${evaluationId}`, data);
export const deleteEvaluationForEtudiant = (etudiantId, evaluationId) =>
  etudiantService.delete(`/etudiant/${etudiantId}/evaluations/${evaluationId}`);

// Route pour lister les étudiants par classe, filière et année académique
export const getEtudiantsByClasseFiliereAnnee = (classeId, filiereId, anneeAcademiqueId) =>
  etudiantService.get(
    `/etudiant/classe/${classeId}/filiere/${filiereId}/annee/${anneeAcademiqueId}`
  );
