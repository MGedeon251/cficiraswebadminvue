/** Ici les appels apis de :
 *  module
 *  cours (et type de cours)
 *  creanau (emploi du temps)
 *  support de cours
 *  typecours 
 */

import serviceApi from "../config/serviceApi";

// API pour gérer les modules
export const getModules = () => serviceApi.get('/modules');
export const getModuleById = (id) => serviceApi.get(`/modules/${id}`);
export const createModule = (data) => serviceApi.post('/modules', data);
export const updateModule = (id, data) => serviceApi.put(`/modules/${id}`, data);
export const deleteModule = (id) => serviceApi.delete(`/modules/${id}`);

// API pour gérer les cours
export const getCours = () => serviceApi.get('/cours');
export const getCoursById = (id) => serviceApi.get(`/cours/${id}`);
export const createCours = (data) => serviceApi.post('/cours', data);
export const updateCours = (id, data) => serviceApi.put(`/cours/${id}`, data);
export const deleteCours = (id) => serviceApi.delete(`/cours/${id}`);

// API pour gérer les types de cours
export const getTypeCours = () => serviceApi.get('/typecours');
export const getTypeCoursById = (id) => serviceApi.get(`/typecours/${id}`);
export const createTypeCours = (data) => serviceApi.post('/typecours', data);
export const updateTypeCours = (id, data) => serviceApi.put(`/typecours/${id}`, data);
export const deleteTypeCours = (id) => serviceApi.delete(`/typecours/${id}`);

// API pour gérer les créneaux (emploi du temps)
export const getCreneaux = () => serviceApi.get('/creneaux');
export const getCreneauById = (id) => serviceApi.get(`/creneaux/${id}`);
export const createCreneau = (data) => serviceApi.post('/creneaux', data);
export const updateCreneau = (id, data) => serviceApi.put(`/creneaux/${id}`, data);
export const deleteCreneau = (id) => serviceApi.delete(`/creneaux/${id}`);

// API pour gérer les supports de cours
export const getSupportsCours = () => serviceApi.get('/supports_cours');
export const getSupportCoursById = (id) => serviceApi.get(`/supports_cours/${id}`);
export const createSupportCours = (data) => serviceApi.post('/supports_cours', data);
export const updateSupportCours = (id, data) => serviceApi.put(`/supports_cours/${id}`, data);
export const deleteSupportCours = (id) => serviceApi.delete(`/supports_cours/${id}`);