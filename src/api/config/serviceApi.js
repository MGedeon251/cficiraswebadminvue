import { useErrorStore } from '@/stores/messages/errorStore';

const buildService = (client) => ({
  get: async (url, params = {}) => {
    try {
      const response = await client.get(url, { params });
      return response.data;
    } catch (error) {
      useErrorStore().addError(error);
      throw error;
    }
  },

  post: async (url, data) => {
    try {
      const response = await client.post(url, data);
      return response.data;
    } catch (error) {
      useErrorStore().addError(error);
      throw error;
    }
  },

  put: async (url, data) => {
    try {
      const response = await client.put(url, data);
      return response.data;
    } catch (error) {
      useErrorStore().addError(error);
      throw error;
    }
  },

  delete: async (url) => {
    try {
      const response = await client.delete(url);
      return response.data;
    } catch (error) {
      useErrorStore().addError(error);
      throw error;
    }
  },
});

export default buildService;
