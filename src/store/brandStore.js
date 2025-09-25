import { create } from 'zustand';
import { getBrands, getBrandById, getBrandBySlug, searchBrands } from '../lib/brandApi';

const useBrandStore = create((set, get) => ({
  // State
  brands: [],
  currentBrand: null,
  loading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 20,
    total: 0,
    pages: 0
  },

  // Actions
  fetchBrands: async (params = {}) => {
    set({ loading: true, error: null });
    try {
      const response = await getBrands(params);
      if (response.success) {
        set({
          brands: response.data,
          pagination: response.pagination,
          loading: false
        });
      } else {
        set({ error: 'Failed to fetch brands', loading: false });
      }
    } catch (error) {
      set({ error: error.message || 'Failed to fetch brands', loading: false });
    }
  },

  fetchBrandById: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await getBrandById(id);
      if (response.success) {
        set({ currentBrand: response.data, loading: false });
      } else {
        set({ error: 'Brand not found', loading: false });
      }
    } catch (error) {
      set({ error: error.message || 'Failed to fetch brand', loading: false });
    }
  },

  fetchBrandBySlug: async (slug) => {
    set({ loading: true, error: null });
    try {
      const response = await getBrandBySlug(slug);
      if (response.success) {
        set({ currentBrand: response.data, loading: false });
      } else {
        set({ error: 'Brand not found', loading: false });
      }
    } catch (error) {
      set({ error: error.message || 'Failed to fetch brand', loading: false });
    }
  },

  searchBrands: async (query, params = {}) => {
    set({ loading: true, error: null });
    try {
      const response = await searchBrands(query, params);
      if (response.success) {
        set({
          brands: response.data,
          pagination: response.pagination,
          loading: false
        });
      } else {
        set({ error: 'Failed to search brands', loading: false });
      }
    } catch (error) {
      set({ error: error.message || 'Failed to search brands', loading: false });
    }
  },

  // Reset state
  resetBrands: () => set({
    brands: [],
    currentBrand: null,
    loading: false,
    error: null,
    pagination: {
      page: 1,
      limit: 20,
      total: 0,
      pages: 0
    }
  }),

  // Clear error
  clearError: () => set({ error: null })
}));

export { useBrandStore };