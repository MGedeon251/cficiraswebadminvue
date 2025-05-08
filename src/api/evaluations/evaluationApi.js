import buildService from '../config/serviceApi';
import { evaluationApi } from '../config/apiClients';

const evaluationService = buildService(evaluationApi);



// API pour gérer les évaluations
export const getEvaluations = () => evaluationService.get('/controle');
export const getEvaluationById = (id) => evaluationService.get(`/controle/${id}`);
export const createEvaluation = (data) => evaluationService.post('/controle', data);
export const updateEvaluation = (id, data) => evaluationService.put(`/controle/${id}`, data);
export const deleteEvaluation = (id) => evaluationService.delete(`/controle/${id}`);

// API pour gérer les notes
export const getNotes = () => evaluationService.get('/notes');
export const getNoteById = (id) => evaluationService.get(`/notes/${id}`);
export const createNote = (data) => evaluationService.post('/notes', data);
export const updateNote = (id, data) => evaluationService.put(`/notes/${id}`, data);
export const deleteNote = (id) => evaluationService.delete(`/notes/${id}`);

// API pour gérer les examens
export const getExamens = () => evaluationService.get('/examens');
export const getExamenById = (id) => evaluationService.get(`/examens/${id}`);
export const createExamen = (data) => evaluationService.post('/examens', data);
export const updateExamen = (id, data) => evaluationService.put(`/examens/${id}`, data);
export const deleteExamen = (id) => evaluationService.delete(`/examens/${id}`);

// API pour gérer les sessions
export const getSessions = () => evaluationService.get('/sessions');
export const getSessionById = (id) => evaluationService.get(`/sessions/${id}`);
export const createSession = (data) => evaluationService.post('/sessions', data);
export const updateSession = (id, data) => evaluationService.put(`/sessions/${id}`, data);
export const deleteSession = (id) => evaluationService.delete(`/sessions/${id}`);

//API pour gerer les planings
export const getPlanning = () => evaluationService.get('/planning');   
export const getPlanningById = (id) => evaluationService.get(`/planning/${id}`);    
export const createPlanning = (data) => evaluationService.post('/planning', data);
export const updatePlanning = (id, data) => evaluationService.put(`/planning/${id}`, data); 
export const deletePlanning = (id) => evaluationService.delete(`/planning/${id}`);
export const getPlanningByExamenId = (classeId) => evaluationService.get(`/planning/classe/${classeId}`);
export const getExamenByPlanning = (id) => evaluationService.get(`/classes/planning/${id}`);
export const getPlanningBySessionId = (sessionId) => evaluationService.get(`/planning/session/${sessionId}`);

// API pour gérer les salles d'examens
export const getSalleExamens = () => evaluationService.get('/salle_examens');
export const getSalleExamenById = (id) => evaluationService.get(`/salle_examens/${id}`);
export const createSalleExamen = (data) => evaluationService.post('/salle_examens', data);
export const updateSalleExamen = (id, data) => evaluationService.put(`/salle_examens/${id}`, data);
export const deleteSalleExamen = (id) => evaluationService.delete(`/salle_examens/${id}`);

// API pour les résultats de tous les étudiants
export const getResultatsTousEtudiants = () => evaluationService.get('/resultats/tous');

// API pour les résultats par classe
export const getResultatsParClasse = (classeId) => evaluationService.get(`/resultats/classe/${classeId}`);

// API pour les statistiques
export const getStatistiques = () => evaluationService.get('/statistiques');
