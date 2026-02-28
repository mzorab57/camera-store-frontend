import axios from 'axios';

// Base API URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const hasLocalStorage = typeof localStorage !== 'undefined';
  const token = hasLocalStorage
    ? (localStorage.getItem('admin_token') ||
      localStorage.getItem('auth_token') ||
      localStorage.getItem('token'))
    : null;
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return config;
});

// Products API
export const productApi = {
  // Get latest products
  getLatestProducts: async (limit = 10) => {
    try {
      const response = await api.get('/products/get.php', {
        params: {
          limit: limit,
          sort: 'created_at',
          order: 'DESC',
          is_active: 1
        }
      });
      console.log('Latest products:', response.data);
      
      return response.data;
    } catch (error) {
      console.error('Error fetching latest products:', error);
      throw error;
    }
  },

  // Get all products
  getProducts: async (params = {}) => {
    try {
      // Add is_active filter by default unless explicitly set to false
      const finalParams = { is_active: 1, ...params };
      const response = await api.get('/products/get.php', { params: finalParams });
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  // Get video products
  getVideoProducts: async (limit = 10) => {
    try {
      const response = await api.get('/products/get.php', {
        params: {
          type: 'videography',
          limit: limit,
          sort: 'created_at',
          order: 'DESC',
          is_active: 1
        }
      });
      console.log('Video products:', response.data);
      
      return response.data;
    } catch (error) {
      console.error('Error fetching video products:', error);
      throw error;
    }
  },

  // Get photo products
  getPhotoProducts: async (limit = 10) => {
    try {
      const response = await api.get('/products/get.php', {
        params: {
          type: 'photography',
          limit: limit,
          sort: 'created_at',
          order: 'DESC',
          is_active: 1
        }
      });
      console.log('Photo products:', response.data);
      
      return response.data;
    } catch (error) {
      console.error('Error fetching photo products:', error);
      throw error;
    }
  },

  // Get product by ID
  getProductById: async (id) => {
    try {
      const response = await api.get(`/products/get.php?id=${id}&is_active=1`);
      return response.data;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  },

  // Search products
  searchProducts: async (query) => {
    try {
      const response = await api.get(`/products/search.php?q=${encodeURIComponent(query)}&is_active=1`);
      return response.data;
    } catch (error) {
      console.error('Error searching products:', error);
      throw error;
    }
  },
};

export default productApi;
