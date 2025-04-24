import buildService from '../config/serviceApi';
import { academiqueApi } from '../config/apiClients';

const academiqueService = buildService(academiqueApi);

// API pour gérer les années académiques
export const getAnneesAcademiques = () => academiqueService.get('/annees');
export const createAnneeAcademique = (data) => academiqueService.post('/annees', data);
export const updateAnneeAcademique = (id, data) => academiqueService.put(`/annees/${id}`, data);
export const deleteAnneeAcademique = (id) => academiqueService.delete(`/annes/${id}`);

// API pour gérer les classes
export const getClasses = () => academiqueService.get('/classes');
export const createClasse = (data) => academiqueService.post('/classes', data);
export const updateClasse = (id, data) => academiqueService.put(`/classes/${id}`, data);
export const deleteClasse = (id) => academiqueService.delete(`/classes/${id}`);

// API pour gérer les cursus
export const getCursus = () => academiqueService.get('/cursus');
export const createCursus = (data) => academiqueService.post('/cursus', data);
export const updateCursus = (id, data) => academiqueService.put(`/cursus/${id}`, data);
export const deleteCursus = (id) => academiqueService.delete(`/cursus/${id}`);

// API pour gérer les cycles
export const getCycles = () => academiqueService.get('/cycle');
export const createCycle = (data) => academiqueService.post('/cycle', data);
export const updateCycle = (id, data) => academiqueService.put(`/cycle/${id}`, data);
export const deleteCycle = (id) => academiqueService.delete(`/cycle/${id}`);

// API pour gérer les filières
export const getFilieres = () => academiqueService.get('/filieres');
export const createFiliere = (data) => academiqueService.post('/filieres', data);
export const updateFiliere = (id, data) => academiqueService.put(`/filieres/${id}`, data);
export const deleteFiliere = (id) => academiqueService.delete(`/filieres/${id}`);

// API pour gérer les niveaux
export const getNiveaux = () => academiqueService.get('/niveaux');
export const createNiveau = (data) => academiqueService.post('/niveaux', data);
export const updateNiveau = (id, data) => academiqueService.put(`/niveaux/${id}`, data);
export const deleteNiveau = (id) => academiqueService.delete(`/niveaux/${id}`);

// API pour gérer les semestres
export const getSemestres = () => academiqueService.get('/semestres');
export const createSemestre = (data) => academiqueService.post('/semestres', data);
export const updateSemestre = (id, data) => academiqueService.put(`/semestres/${id}`, data);
export const deleteSemestre = (id) => academiqueService.delete(`/semestres/${id}`);

// Ajoutez ces nouvelles fonctions si elles n'existent pas
export const getClassesByAnnee = (anneeId) => academiqueService.get(`/classes/annee/${anneeId}`);

export const getFilieresByAnnee = (anneeId) => academiqueService.get(`/filieres/annee/${anneeId}`);
