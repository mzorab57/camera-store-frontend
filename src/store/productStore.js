import { create } from 'zustand';
import { productApi } from '../lib/productApi';

export const useProductStore = create((set, get) => ({
  // State
  latestProducts: [],
  videoProducts: [],
  photoProducts: [],
  stats: {
    products_total: 0,
    products_active: 0,
    categories: 0,
    subcategories: 0,
    brands: 0,
    tags: 0,
    images: 0
  },
  loading: false,
  videoLoading: false,
  photoLoading: false,
  error: null,
  videoError: null,
  photoError: null,

  // Actions
  fetchLatestProducts: async () => {
    set({ loading: true, error: null });
    try {
      const response = await productApi.getLatestProducts();
      console.log('API Response:', response);
      
      // Handle different response structures
      let products = [];
      let stats = {
        products_total: 0,
        products_active: 0,
        categories: 0,
        subcategories: 0,
        brands: 0,
        tags: 0,
        images: 0
      };
      
      if (response.success) {
        products = response.latest_products || response.data || [];
        stats = response.counts || response.stats || stats;
      } else if (Array.isArray(response)) {
        // If response is directly an array of products
        products = response;
        console.log('Products from array response:', products);
        
        stats.products_total = products.length;
        stats.products_active = products.filter(p => p.status === 'active' || p.is_active === 1 || p.is_active === '1').length;
      } else if (response.data && Array.isArray(response.data)) {
        // If response has data field with array
        products = response.data;
        stats.products_total = products.length;
        stats.products_active = products.filter(p => p.status === 'active' || p.is_active === 1 || p.is_active === '1').length;
      }
      
      // Filter to only include active products
      const activeProducts = products.filter(product => 
        product.status === 'active' || product.is_active === 1 || product.is_active === '1'
      );
      
      set({
        latestProducts: activeProducts,
        stats: stats,
        loading: false,
        error: null
      });
    } catch (error) {
      console.error('Error fetching latest products:', error);
      set({
        loading: false,
        error: error.message || 'Failed to fetch latest products'
      });
    }
  },

  // Fetch video products
  fetchVideoProducts: async () => {
    set({ videoLoading: true, videoError: null });
    try {
      const response = await productApi.getVideoProducts();
      console.log('Video API Response:', response);
      
      // Handle different response structures
      let products = [];
      
      if (response.success) {
        products = response.video_products || response.data || [];
      } else if (Array.isArray(response)) {
        products = response;
      } else if (response.data && Array.isArray(response.data)) {
        products = response.data;
      }
      
      // Filter to only include active products
      const activeVideoProducts = products.filter(product => 
        product.status === 'active' || product.is_active === 1 || product.is_active === '1'
      );
      
      set({
        videoProducts: activeVideoProducts,
        videoLoading: false,
        videoError: null
      });
    } catch (error) {
      console.error('Error fetching video products:', error);
      
      set({
        videoProducts: [],
        videoLoading: false,
        videoError: error.message || 'Failed to fetch video products'
      });
    }
  },

  // Fetch photo products
    fetchPhotoProducts: async () => {
      set({ photoLoading: true, photoError: null });
      try {
        const response = await productApi.getPhotoProducts();
        console.log('Photo API Response:', response);
      
      // Handle different response structures
      let products = [];
      
      if (response.success) {
        products = response.photo_products || response.data || [];
      } else if (Array.isArray(response)) {
        products = response;
      } else if (response.data && Array.isArray(response.data)) {
        products = response.data;
      }
      
      // Filter to only include active products
      const activePhotoProducts = products.filter(product => 
        product.status === 'active' || product.is_active === 1 || product.is_active === '1'
      );
      
      set({
        photoProducts: activePhotoProducts,
        photoLoading: false,
        photoError: null
      });
    } catch (error) {
      console.error('Error fetching photo products:', error);
      
      set({
        photoProducts: [],
        photoLoading: false,
        photoError: error.message || 'Failed to fetch photo products'
      });
    }
  },

  // Get all products combined (only active products)
  getAllProducts: () => {
    const { latestProducts, videoProducts, photoProducts } = get();
    const allProducts = [...latestProducts, ...videoProducts, ...photoProducts];
    // Remove duplicates based on id and filter only active products
    const uniqueProducts = allProducts.filter((product, index, self) => 
      index === self.findIndex(p => p.id === product.id) && 
      (product.status === 'active' || product.is_active === 1 || product.is_active === '1')
    );
    return uniqueProducts;
  },

  // Get only active products from any product array
  getActiveProducts: (products) => {
    return products.filter(product => 
      product.status === 'active' || product.is_active === 1 || product.is_active === '1'
    );
  },

  // Clear error
    clearError: () => set({ error: null, videoError: null, photoError: null }),

  // Reset store
  reset: () => set({
    latestProducts: [],
    videoProducts: [],
    photoProducts: [],
    stats: {
      products_total: 0,
      products_active: 0,
      categories: 0,
      subcategories: 0,
      brands: 0,
      tags: 0,
      images: 0
    },
    loading: false,
    videoLoading: false,
    photoLoading: false,
    error: null,
    videoError: null,
    photoError: null
  })
}));