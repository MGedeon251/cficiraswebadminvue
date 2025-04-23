import serviceApi from '../config/serviceApi';

// API pour gérer les années académiques
export const getAnneesAcademiques = () => serviceApi.get('/anneacademique');
export const createAnneeAcademique = (data) => serviceApi.post('/anneacademique', data);
export const updateAnneeAcademique = (id, data) => serviceApi.put(`/anneacademique/${id}`, data);
export const deleteAnneeAcademique = (id) => serviceApi.delete(`/anneacademique/${id}`);

// API pour gérer les classes
export const getClasses = () => serviceApi.get('/classe');
export const createClasse = (data) => serviceApi.post('/classe', data);
export const updateClasse = (id, data) => serviceApi.put(`/classe/${id}`, data);
export const deleteClasse = (id) => serviceApi.delete(`/classe/${id}`);

// API pour gérer les cursus
export const getCursus = () => serviceApi.get('/cursus');
export const createCursus = (data) => serviceApi.post('/cursus', data);
export const updateCursus = (id, data) => serviceApi.put(`/cursus/${id}`, data);
export const deleteCursus = (id) => serviceApi.delete(`/cursus/${id}`);

// API pour gérer les cycles
export const getCycles = () => serviceApi.get('/cycle');
export const createCycle = (data) => serviceApi.post('/cycle', data);
export const updateCycle = (id, data) => serviceApi.put(`/cycle/${id}`, data);
export const deleteCycle = (id) => serviceApi.delete(`/cycle/${id}`);

// API pour gérer les filières
export const getFilieres = () => serviceApi.get('/filiere');
export const createFiliere = (data) => serviceApi.post('/filiere', data);
export const updateFiliere = (id, data) => serviceApi.put(`/filiere/${id}`, data);
export const deleteFiliere = (id) => serviceApi.delete(`/filiere/${id}`);

// API pour gérer les niveaux
export const getNiveaux = () => serviceApi.get('/niveau');
export const createNiveau = (data) => serviceApi.post('/niveau', data);
export const updateNiveau = (id, data) => serviceApi.put(`/niveau/${id}`, data);
export const deleteNiveau = (id) => serviceApi.delete(`/niveau/${id}`);

// API pour gérer les semestres
export const getSemestres = () => serviceApi.get('/semestre');
export const createSemestre = (data) => serviceApi.post('/semestre', data);
export const updateSemestre = (id, data) => serviceApi.put(`/semestre/${id}`, data);
export const deleteSemestre = (id) => serviceApi.delete(`/semestre/${id}`);
