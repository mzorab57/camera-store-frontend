import { create } from 'zustand';
import { categoryApi, subcategoryApi } from '../lib/categoryApi';

const useCategoryStore = create((set, get) => ({
  // State
  categories: [],
  subcategories: [],
  selectedCategory: null,
  selectedSubcategory: null,
  loading: false,
  error: null,

  // Actions
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  
  // Categories actions
  fetchCategories: async () => {
    set({ loading: true, error: null });
    try {
      const response = await categoryApi.getCategoriesWithSubcategoriesAndProducts();
      if (response.success) {
        set({ categories: response.data, loading: false });
      } else {
        set({ error: 'Failed to fetch categories', loading: false });
      }
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Fallback method for getting active categories without nested data
  fetchActiveCategories: async () => {
    set({ loading: true, error: null });
    try {
      const response = await categoryApi.getActiveCategories();
      if (response.success) {
        set({ categories: response.data, loading: false });
      } else {
        set({ error: 'Failed to fetch categories', loading: false });
      }
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  setSelectedCategory: (category) => {
    set({ selectedCategory: category, selectedSubcategory: null });
    // Auto-fetch subcategories when category is selected
    if (category) {
      get().fetchSubcategoriesByCategory(category.id);
    } else {
      set({ subcategories: [] });
    }
  },

  // Subcategories actions
  fetchSubcategories: async () => {
    set({ loading: true, error: null });
    try {
      const response = await subcategoryApi.getSubcategories({ is_active: 1 });
      if (response.success) {
        set({ subcategories: response.data, loading: false });
      } else {
        set({ error: 'Failed to fetch subcategories', loading: false });
      }
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  fetchSubcategoriesByCategory: async (categoryId, type = null) => {
    set({ loading: true, error: null });
    try {
      const response = await subcategoryApi.getSubcategoriesByCategory(categoryId, type);
      if (response.success) {
        set({ subcategories: response.data, loading: false });
      } else {
        set({ error: 'Failed to fetch subcategories', loading: false });
      }
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  setSelectedSubcategory: (subcategory) => {
    set({ selectedSubcategory: subcategory });
  },

  // Search actions
  searchCategories: async (searchTerm) => {
    set({ loading: true, error: null });
    try {
      const response = await categoryApi.searchCategories(searchTerm);
      if (response.success) {
        set({ categories: response.data, loading: false });
      } else {
        set({ error: 'Failed to search categories', loading: false });
      }
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  searchSubcategories: async (searchTerm, categoryId = null) => {
    set({ loading: true, error: null });
    try {
      const response = await subcategoryApi.searchSubcategories(searchTerm, categoryId);
      if (response.success) {
        set({ subcategories: response.data, loading: false });
      } else {
        set({ error: 'Failed to search subcategories', loading: false });
      }
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Utility actions
  clearError: () => set({ error: null }),
  
  reset: () => set({
    categories: [],
    subcategories: [],
    selectedCategory: null,
    selectedSubcategory: null,
    loading: false,
    error: null
  }),

  // Getters
  getCategoryById: (id) => {
    const { categories } = get();
    return categories.find(cat => cat.id === id);
  },

  getSubcategoryById: (id) => {
    const { subcategories } = get();
    return subcategories.find(sub => sub.id === id);
  },

  getSubcategoriesByType: (type) => {
    const { subcategories } = get();
    return subcategories.filter(sub => sub.type === type || sub.type === 'both');
  }
}));

export { useCategoryStore };
export default useCategoryStore;