import { useState } from 'react';
import * as api from '../services/api';

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRequest = async (requestFn, ...args) => {
    setLoading(true);
    setError(null);
    try {
      const response = await requestFn(...args);
      return response;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    getPosts: (...args) => handleRequest(api.getPosts, ...args),
    getPost: (...args) => handleRequest(api.getPost, ...args),
    createPost: (...args) => handleRequest(api.createPost, ...args),
    updatePost: (...args) => handleRequest(api.updatePost, ...args),
    deletePost: (...args) => handleRequest(api.deletePost, ...args),
    getCategories: (...args) => handleRequest(api.getCategories, ...args),
    createCategory: (...args) => handleRequest(api.createCategory, ...args),
  };
};