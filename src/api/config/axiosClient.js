// config/axiosClient.js
import axios from 'axios';

export const createApiClient = (prefix = '', useJson = true) => {
  const instance = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api/v1${prefix}`,
    headers: useJson ? { 'Content-Type': 'application/json' } : {},
  });

  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return instance;
};

