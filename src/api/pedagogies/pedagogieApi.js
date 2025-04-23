import serviceApi from "../config/serviceApi";

// API pour gérer les enseignants
export const getEnseignants = () => serviceApi.get('/enseignants');
export const getEnseignantById = (id) => serviceApi.get(`/enseignants/${id}`);
export const createEnseignant = (data) => serviceApi.post('/enseignants', data);
export const updateEnseignant = (id, data) => serviceApi.put(`/enseignants/${id}`, data);
export const deleteEnseignant = (id) => serviceApi.delete(`/enseignants/${id}`);

// API pour gérer les contrats
export const getContrats = () => serviceApi.get('/contrats');
export const getContratById = (id) => serviceApi.get(`/contrats/${id}`);
export const createContrat = (data) => serviceApi.post('/contrats', data);
export const updateContrat = (id, data) => serviceApi.put(`/contrats/${id}`, data);
export const deleteContrat = (id) => serviceApi.delete(`/contrats/${id}`);

// API pour gérer les diplômes
export const getDiplomes = () => serviceApi.get('/diplomes');
export const getDiplomeById = (id) => serviceApi.get(`/diplomes/${id}`);
export const createDiplome = (data) => serviceApi.post('/diplomes', data);
export const updateDiplome = (id, data) => serviceApi.put(`/diplomes/${id}`, data);
export const deleteDiplome = (id) => serviceApi.delete(`/diplomes/${id}`);

// API pour gérer les enseignants par module
export const getEnseignantsByModule = (moduleId) => serviceApi.get(`/modules/${moduleId}/enseignants`);
export const assignEnseignantToModule = (moduleId, enseignantId) => serviceApi.post(`/modules/${moduleId}/enseignants`, { enseignantId });
export const removeEnseignantFromModule = (moduleId, enseignantId) => serviceApi.delete(`/modules/${moduleId}/enseignants/${enseignantId}`);

// API pour gérer les enseignants par classe
export const getEnseignantsByClasse = (classeId) => serviceApi.get(`/classes/${classeId}/enseignants`);
export const assignEnseignantToClasse = (classeId, enseignantId) => serviceApi.post(`/classes/${classeId}/enseignants`, { enseignantId });
export const removeEnseignantFromClasse = (classeId, enseignantId) => serviceApi.delete(`/classes/${classeId}/enseignants/${enseignantId}`);

// API pour gérer les créneaux des enseignants
export const getCreneauxByEnseignant = (enseignantId) => serviceApi.get(`/enseignants/${enseignantId}/creneaux`);
export const assignCreneauToEnseignant = (enseignantId, creneauId) => serviceApi.post(`/enseignants/${enseignantId}/creneaux`, { creneauId });
export const removeCreneauFromEnseignant = (enseignantId, creneauId) => serviceApi.delete(`/enseignants/${enseignantId}/creneaux/${creneauId}`);