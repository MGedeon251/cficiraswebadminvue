import buildService from '../config/serviceApi';
import { statistiquesApi } from '../config/apiClients';

const statistiqueService = buildService(statistiquesApi);

// API pour gérer les modules
export const getGlobalesStat = () => statistiqueService.get('/globales');
export const getGlobalesFilie = () => statistiqueService.get('/par-filiere');
export const getGlobalesClass = () => statistiqueService.get('/par-classe');
export const getGlobalesAnne = () => statistiqueService.get('/par-annee');
export const getGlobalesReussi = () => statistiqueService.get('/taux-reussite');
export const getGlobalesSexe = () => statistiqueService.get('/repartition-sexe');
export const getGlobalesClassSex = () => statistiqueService.get('/classe-sexe');
export const getGlobalesInscrip = () => statistiqueService.get('/inscriptions');
export const getGlobalesConcInscrip = () => statistiqueService.get('/concours/participation');
export const getGlobalesFiliere = () => statistiqueService.get('/filiere-cycle');
export const getGlobalesFiliereAnne = () => statistiqueService.get('/filiere-cycle-annee');
