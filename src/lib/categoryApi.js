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

// Categories API
export const categoryApi = {
  // Get all categories
  getCategories: async (params = {}) => {
    try {
      const response = await api.get('/categories/get.php', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },

  // Get active categories only
  getActiveCategories: async () => {
    try {
      const response = await api.get('/categories/get.php', {
        params: { is_active: 1 }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching active categories:', error);
      throw error;
    }
  },

  // Get category by ID
  getCategoryById: async (id) => {
    try {
      const response = await api.get('/categories/get.php', {
        params: { id }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching category by ID:', error);
      throw error;
    }
  },

  // Search categories
  searchCategories: async (searchTerm) => {
    try {
      const response = await api.get('/categories/get.php', {
        params: { q: searchTerm }
      });
      return response.data;
    } catch (error) {
      console.error('Error searching categories:', error);
      throw error;
    }
  },

  // Get categories with nested subcategories and products
  getCategoriesWithSubcategoriesAndProducts: async (params = {}) => {
    try {
      const response = await api.get('/categories/get_with_subcategories_and_products.php', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching categories with subcategories and products:', error);
      throw error;
    }
  },

  // Get single category with nested subcategories and products
  getCategoryWithSubcategoriesAndProducts: async (id) => {
    try {
      const response = await api.get('/categories/get_with_subcategories_and_products.php', {
        params: { id }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching category with subcategories and products:', error);
      throw error;
    }
  }
};



// Subcategories API
export const subcategoryApi = {
  // Get all subcategories
  getSubcategories: async (params = {}) => {
    try {
      const response = await api.get('/subcategories/get.php', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching subcategories:', error);
      throw error;
    }
  },

  // Get subcategories by category ID
  getSubcategoriesByCategory: async (categoryId, type = null) => {
    try {
      const params = { category_id: categoryId, is_active: 1 };
      if (type) params.type = type;
      
      const response = await api.get('/subcategories/get.php', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching subcategories by category:', error);
      throw error;
    }
  },

  // Get subcategories with products
  getSubcategoriesWithProducts: async (options = null) => {
    try {
      const params = {};
      if (options) {
        if (typeof options === 'number') {
          params.category_id = options;
        } else {
          if (options.categoryId) params.category_id = options.categoryId;
          if (options.categorySlug) params.category_slug = options.categorySlug;
          if (options.perSubcatLimit) params.per_subcat_limit = options.perSubcatLimit;
        }
      }
      const response = await api.get('/subcategories/with_products.php', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching subcategories with products:', error);
      throw error;
    }
  },

  // Get subcategory by ID
  getSubcategoryById: async (id) => {
    try {
      const response = await api.get('/subcategories/get.php', {
        params: { id }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching subcategory by ID:', error);
      throw error;
    }
  },

  // Search subcategories
  searchSubcategories: async (searchTerm, categoryId = null) => {
    try {
      const params = { q: searchTerm, is_active: 1 };
      if (categoryId) params.category_id = categoryId;
      
      const response = await api.get('/subcategories/get.php', { params });
      return response.data;
    } catch (error) {
      console.error('Error searching subcategories:', error);
      throw error;
    }
  }
};

export default api;
