import serviceApi from '../config/serviceApi';



// API pour gérer les évaluations
export const getEvaluations = () => serviceApi.get('/controle');
export const getEvaluationById = (id) => serviceApi.get(`/controle/${id}`);
export const createEvaluation = (data) => serviceApi.post('/controle', data);
export const updateEvaluation = (id, data) => serviceApi.put(`/controle/${id}`, data);
export const deleteEvaluation = (id) => serviceApi.delete(`/controle/${id}`);

// API pour gérer les notes
export const getNotes = () => serviceApi.get('/notes');
export const getNoteById = (id) => serviceApi.get(`/notes/${id}`);
export const createNote = (data) => serviceApi.post('/notes', data);
export const updateNote = (id, data) => serviceApi.put(`/notes/${id}`, data);
export const deleteNote = (id) => serviceApi.delete(`/notes/${id}`);

// API pour gérer les examens
export const getExamens = () => serviceApi.get('/examens');
export const getExamenById = (id) => serviceApi.get(`/examens/${id}`);
export const createExamen = (data) => serviceApi.post('/examens', data);
export const updateExamen = (id, data) => serviceApi.put(`/examens/${id}`, data);
export const deleteExamen = (id) => serviceApi.delete(`/examens/${id}`);

// API pour gérer les sessions
export const getSessions = () => serviceApi.get('/sessions');
export const getSessionById = (id) => serviceApi.get(`/sessions/${id}`);
export const createSession = (data) => serviceApi.post('/sessions', data);
export const updateSession = (id, data) => serviceApi.put(`/sessions/${id}`, data);
export const deleteSession = (id) => serviceApi.delete(`/sessions/${id}`);

// API pour gérer les salles d'examens
export const getSalleExamens = () => serviceApi.get('/salle_examens');
export const getSalleExamenById = (id) => serviceApi.get(`/salle_examens/${id}`);
export const createSalleExamen = (data) => serviceApi.post('/salle_examens', data);
export const updateSalleExamen = (id, data) => serviceApi.put(`/salle_examens/${id}`, data);
export const deleteSalleExamen = (id) => serviceApi.delete(`/salle_examens/${id}`);

// API pour les résultats de tous les étudiants
export const getResultatsTousEtudiants = () => serviceApi.get('/resultats/tous');

// API pour les résultats par classe
export const getResultatsParClasse = (classeId) => serviceApi.get(`/resultats/classe/${classeId}`);

// API pour les statistiques
export const getStatistiques = () => serviceApi.get('/statistiques');
