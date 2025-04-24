import serviceApi from '../config/serviceApi';

// API pour gérer les concours
export const getConcours = () => serviceApi.get('/concours');
export const getConcoursById = (id) => serviceApi.get(`/concours/${id}`);
export const createConcours = (data) => serviceApi.post('/concours', data);
export const updateConcours = (id, data) => serviceApi.put(`/concours/${id}`, data);
export const deleteConcours = (id) => serviceApi.delete(`/concours/${id}`);

// API pour gérer les candidatures
export const getCandidatures = () => serviceApi.get('/candidatures');
export const getCandidatureById = (id) => serviceApi.get(`/candidatures/${id}`);
export const createCandidature = (data) => serviceApi.post('/candidatures', data);
export const updateCandidature = (id, data) => serviceApi.put(`/candidatures/${id}`, data);
export const deleteCandidature = (id) => serviceApi.delete(`/candidatures/${id}`);

// API pour gérer les créneaux (emploi du temps)
export const getCreneaux = () => serviceApi.get('/creneaux');
export const getCreneauById = (id) => serviceApi.get(`/creneaux/${id}`);
export const createCreneau = (data) => serviceApi.post('/creneaux', data);
export const updateCreneau = (id, data) => serviceApi.put(`/creneaux/${id}`, data);
export const deleteCreneau = (id) => serviceApi.delete(`/creneaux/${id}`);

// API pour gérer les inscriptions
export const getInscriptions = () => serviceApi.get('/inscriptions');
export const getInscriptionById = (id) => serviceApi.get(`/inscriptions/${id}`);
export const createInscription = (data) => serviceApi.post('/inscriptions', data);
export const updateInscription = (id, data) => serviceApi.put(`/inscriptions/${id}`, data);
export const deleteInscription = (id) => serviceApi.delete(`/inscriptions/${id}`);

// API pour gérer les salles
export const getSalles = () => serviceApi.get('/salles');
export const getSalleById = (id) => serviceApi.get(`/salles/${id}`);
export const createSalle = (data) => serviceApi.post('/salles', data);
export const updateSalle = (id, data) => serviceApi.put(`/salles/${id}`, data);
export const deleteSalle = (id) => serviceApi.delete(`/salles/${id}`);
