import buildService from '../config/serviceApi';
import { authApi } from '../config/apiClients';

const authService = buildService(authApi);

export const login = (credentials) => authService.post('/login', credentials);
export const logout = () => authService.post('/logout');
export const getCurrentUser = () => authService.get('/user');
export const signup = (data) => authService.post('/signup', data);
