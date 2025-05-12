import buildService from '../config/serviceApi';
import { academiqueApi } from '../config/apiClients';

const moduleService = buildService(academiqueApi);

// API pour gérer les modules
export const getModules = () => moduleService.get('/modules');
export const getModuleById = (id) => moduleService.get(`/modules/${id}`);
export const createModule = (data) => moduleService.post('/modules', data);
export const updateModule = (id, data) => moduleService.put(`/modules/${id}`, data);
export const deleteModule = (id) => moduleService.delete(`/modules/${id}`);

// Fonction pour récupérer les modules d'une classe et d'un semestre
export const getClasseModules = (classeId, semestreId) => 
    moduleService.get(`/modules/classe/${classeId}/semestre/${semestreId}`);

// API pour gérer les cours
export const getCours = () => moduleService.get('/cours');
export const getCoursById = (id) => moduleService.get(`/cours/${id}`);
export const createCours = (data) => moduleService.post('/cours', data);
export const updateCours = (id, data) => moduleService.put(`/cours/${id}`, data);
export const deleteCours = (id) => moduleService.delete(`/cours/${id}`);

// API pour gérer les types de cours
export const getTypeCours = () => moduleService.get('/typecours');
export const getTypeCoursById = (id) => moduleService.get(`/typecours/${id}`);
export const createTypeCours = (data) => moduleService.post('/typecours', data);
export const updateTypeCours = (id, data) => moduleService.put(`/typecours/${id}`, data);
export const deleteTypeCours = (id) => moduleService.delete(`/typecours/${id}`);

// API pour gérer les créneaux (emploi du temps)
export const getCreneaux = () => moduleService.get('/creneaux');
export const getCreneauById = (id) => moduleService.get(`/creneaux/${id}`);
export const createCreneau = (data) => moduleService.post('/creneaux', data);
export const updateCreneau = (id, data) => moduleService.put(`/creneaux/${id}`, data);
export const deleteCreneau = (id) => moduleService.delete(`/creneaux/${id}`);

// API pour gérer les supports de cours
export const getSupportsCours = () => moduleService.get('/supports_cours');
export const getSupportCoursById = (id) => moduleService.get(`/supports_cours/${id}`);
export const createSupportCours = (data) => moduleService.post('/supports_cours', data);
export const updateSupportCours = (id, data) => moduleService.put(`/supports_cours/${id}`, data);
export const deleteSupportCours = (id) => moduleService.delete(`/supports_cours/${id}`);
