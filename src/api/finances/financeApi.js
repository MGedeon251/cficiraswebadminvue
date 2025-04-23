import serviceApi from '../config/serviceApi';

// API pour gérer les finances
export const getFinances = () => serviceApi.get('/finances');
export const getFinanceById = (id) => serviceApi.get(`/finances/${id}`);
export const createFinance = (data) => serviceApi.post('/finances', data);
export const updateFinance = (id, data) => serviceApi.put(`/finances/${id}`, data);
export const deleteFinance = (id) => serviceApi.delete(`/finances/${id}`);

// API pour gérer les factures
export const getFactures = () => serviceApi.get('/factures');
export const getFactureById = (id) => serviceApi.get(`/factures/${id}`);
export const createFacture = (data) => serviceApi.post('/factures', data);
export const updateFacture = (id, data) => serviceApi.put(`/factures/${id}`, data);
export const deleteFacture = (id) => serviceApi.delete(`/factures/${id}`);

// API pour gérer les paiements
export const getPaiements = () => serviceApi.get('/paiements');
export const getPaiementById = (id) => serviceApi.get(`/paiements/${id}`);
export const createPaiement = (data) => serviceApi.post('/paiements', data);
export const updatePaiement = (id, data) => serviceApi.put(`/paiements/${id}`, data);
export const deletePaiement = (id) => serviceApi.delete(`/paiements/${id}`);

// API pour gérer les frais d'inscription
export const getFraisInscription = () => serviceApi.get('/frais_inscription');
export const getFraisInscriptionById = (id) => serviceApi.get(`/frais_inscription/${id}`);
export const createFraisInscription = (data) => serviceApi.post('/frais_inscription', data);
export const updateFraisInscription = (id, data) =>
  serviceApi.put(`/frais_inscription/${id}`, data);
export const deleteFraisInscription = (id) => serviceApi.delete(`/frais_inscription/${id}`);
