import buildService from '@/api/config/serviceApi';
import { gestionFormApi } from '@/api/config/apiClients';

const service = buildService(gestionFormApi);

export const importCandidats = (formData) =>
  service.post('/candidat/importv2', formData);

export const importEtudiants = (formData) =>
  service.post('/etudiants/import', formData);

export const uploadJustificatifPaiement = (formData) =>
  service.post('/paiements/upload-justificatif', formData);

export const importNotesConcours = (formData) =>
  service.post('/resultats/import', formData);

// Ajoute ici d'autres appels liés à FormData
