import serviceApi from '../config/serviceApi';

// API pour gérer les étudiants
export const getEtudiants = () => serviceApi.get('/etudiant');
export const getEtudiantById = (id) => serviceApi.get(`/etudiant/${id}`);
export const createEtudiant = (data) => serviceApi.post('/etudiant', data);
export const updateEtudiant = (id, data) => serviceApi.put(`/etudiant/${id}`, data);
export const deleteEtudiant = (id) => serviceApi.delete(`/etudiant/${id}`);

// API pour les résultats spécifiques à un étudiant
export const getResultatsByEtudiant = (etudiantId) =>
  serviceApi.get(`/etudiant/${etudiantId}/resultats`);

// API pour les notes spécifiques à un étudiant
export const getNotesByEtudiant = (etudiantId) => serviceApi.get(`/etudiant/${etudiantId}/notes`);

// API pour la moyenne spécifique à un étudiant
export const getMoyenneByEtudiant = (etudiantId) =>
  serviceApi.get(`/etudiant/${etudiantId}/moyenne`);

// API pour les évaluations spécifiques à un étudiant
export const getEvaluationsByEtudiant = (etudiantId) =>
  serviceApi.get(`/etudiant/${etudiantId}/evaluations`);
export const createEvaluationForEtudiant = (etudiantId, data) =>
  serviceApi.post(`/etudiant/${etudiantId}/evaluations`, data);
export const updateEvaluationForEtudiant = (etudiantId, evaluationId, data) =>
  serviceApi.put(`/etudiant/${etudiantId}/evaluations/${evaluationId}`, data);
export const deleteEvaluationForEtudiant = (etudiantId, evaluationId) =>
  serviceApi.delete(`/etudiant/${etudiantId}/evaluations/${evaluationId}`);
