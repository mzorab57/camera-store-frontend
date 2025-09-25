import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost/api';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Get all brands with optional filters
export const getBrands = async (params = {}) => {
  try {
    const response = await api.get('/brands/get.php', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching brands:', error);
    throw error;
  }
};

// Get brand by ID
export const getBrandById = async (id) => {
  try {
    const response = await api.get(`/brands/get.php?id=${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching brand by ID:', error);
    throw error;
  }
};

// Get brand by slug
export const getBrandBySlug = async (slug) => {
  try {
    const response = await api.get(`/brands/get.php?slug=${slug}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching brand by slug:', error);
    throw error;
  }
};

// Search brands
export const searchBrands = async (query, params = {}) => {
  try {
    const response = await api.get('/brands/get.php', {
      params: {
        q: query,
        ...params
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error searching brands:', error);
    throw error;
  }
};

export default api;