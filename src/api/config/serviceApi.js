import apiClient from './axiosClients';
import { useErrorStore } from '@/stores/errorStore';

const serviceApi = {
  get: async (url, params = {}) => {
    try {
      const response = await apiClient.get(url, { params });
      return response.data;
    } catch (error) {
      useErrorStore().addError(error);
      throw error;
    }
  },

  post: async (url, data) => {
    try {
      const response = await apiClient.post(url, data);
      return response.data;
    } catch (error) {
      useErrorStore().addError(error);
      throw error;
    }
  },

  put: async (url, data) => {
    try {
      const response = await apiClient.put(url, data);
      return response.data;
    } catch (error) {
      useErrorStore().addError(error);
      throw error;
    }
  },

  delete: async (url) => {
    try {
      const response = await apiClient.delete(url);
      return response.data;
    } catch (error) {
      useErrorStore().addError(error);
      throw error;
    }
  },
};

export default serviceApi;
