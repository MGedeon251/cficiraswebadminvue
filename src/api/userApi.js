import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL + '/api/v1',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Récupère le token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // L'ajoute aux requêtes
  }
  return config;
});

export const getUsers = async () => {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error) {
    console.error('Erreur API:', error);
    throw error;
  }
};
