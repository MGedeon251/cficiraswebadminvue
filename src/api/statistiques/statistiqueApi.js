import buildService from '../config/serviceApi';
import { statistiquesApi } from '../config/apiClients';

const statistiqueService = buildService(statistiquesApi);

// API pour gérer les modules
export const getModules = () =>statistiqueService.get('/modules');
