import { createApiClient } from './axiosClient';

export const authApi = createApiClient('/auth');
export const academiqueApi = createApiClient('/academique');
export const gestionApi = createApiClient('/gestion');
export const pedagogieApi = createApiClient('/pedagogie');
export const financeApi = createApiClient('/finance');
export const evaluationApi = createApiClient('/evaluation');
