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
        stats.products_active = products.filter(p => p.status === 'active').length;
      } else if (response.data && Array.isArray(response.data)) {
        // If response has data field with array
        products = response.data;
        stats.products_total = products.length;
        stats.products_active = products.filter(p => p.status === 'active').length;
      }
      
      // If no products from API, use mock data
      if (products.length === 0) {
        const mockLatestProducts = [
          {
            id: 1,
            name: "Canon EOS R6 Mark II",
            price: "2499.00",
            discount_value: "100.00",
            brand: "Canon",
            type: "both",
            category: "photography",
            subcategory: "dslr-cameras",
            status: "active",
            primary_image_url: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400",
            created_at: "2024-01-15T10:30:00Z"
          },
          {
            id: 2,
            name: "Sony A7 IV Hybrid Camera",
            price: "2498.00",
            discount_value: "150.00",
            brand: "Sony",
            type: "both",
            category: "photography",
            subcategory: "dslr-cameras",
            status: "active",
            primary_image_url: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400",
            created_at: "2024-01-14T09:15:00Z"
          },
          {
            id: 3,
            name: "Panasonic GH6 Cinema Camera",
            price: "2197.99",
            discount_value: "0",
            brand: "Panasonic",
            type: "videography",
            category: "videography",
            subcategory: "cinema-cameras",
            status: "active",
            primary_image_url: "https://images.unsplash.com/photo-1495121553079-4c61bcce1894?w=400",
            created_at: "2024-01-13T14:20:00Z"
          },
          {
            id: 4,
            name: "Nikon D850 DSLR",
            price: "2996.95",
            discount_value: "200.00",
            brand: "Nikon",
            type: "photography",
            category: "photography",
            subcategory: "dslr-cameras",
            status: "active",
            primary_image_url: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400",
            created_at: "2024-01-12T11:45:00Z"
          },
          {
            id: 5,
            name: "Canon EOS 90D DSLR",
            price: "1199.00",
            discount_value: "50.00",
            brand: "Canon",
            type: "photography",
            category: "photography",
            subcategory: "dslr-cameras",
            status: "active",
            primary_image_url: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400",
            created_at: "2024-01-11T08:30:00Z"
          },
          {
            id: 6,
            name: "Nikon D780 DSLR",
            price: "2296.95",
            discount_value: "100.00",
            brand: "Nikon",
            type: "photography",
            category: "photography",
            subcategory: "dslr-cameras",
            status: "active",
            primary_image_url: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400",
            created_at: "2024-01-10T16:45:00Z"
          }
        ];
        products = mockLatestProducts;
        stats.products_total = products.length;
        stats.products_active = products.filter(p => p.status === 'active').length;
      }
      
      set({
        latestProducts: products,
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
      
      set({
        videoProducts: products,
        videoLoading: false,
        videoError: null
      });
    } catch (error) {
      console.error('Error fetching video products:', error);
      
      // Set mock video data when API fails
      const mockVideoProducts = [
        {
          id: 101,
          name: "Canon EOS R5 Mirrorless Camera",
          price: "3899.00",
          discount_value: "100.00",
          brand: "Canon",
          type: "photography",
          category: "photography",
          subcategory: "dslr-cameras",
          status: "active",
          primary_image_url: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400",
          created_at: "2024-01-15T10:30:00Z"
        },
        {
          id: 102,
          name: "Sony FX3 Full-Frame Cinema Camera",
          price: "3898.00",
          discount_value: "0",
          brand: "Sony",
          type: "videography",
          category: "videography",
          subcategory: "cinema-cameras",
          status: "active",
          primary_image_url: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400",
          created_at: "2024-01-14T09:15:00Z"
        },
        {
          id: 103,
          name: "Blackmagic Pocket Cinema Camera 6K Pro",
          price: "2535.00",
          discount_value: "200.00",
          brand: "Blackmagic Design",
          type: "videography",
          category: "videography",
          subcategory: "cinema-cameras",
          status: "active",
          primary_image_url: "https://images.unsplash.com/photo-1495121553079-4c61bcce1894?w=400",
          created_at: "2024-01-13T14:20:00Z"
        }
      ];
      
      set({
        videoProducts: mockVideoProducts,
        videoLoading: false,
        videoError: null
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
      
      set({
        photoProducts: products,
        photoLoading: false,
        photoError: null
      });
    } catch (error) {
      console.error('Error fetching photo products:', error);
      
      // Set mock photo data when API fails
      const mockPhotoProducts = [
        {
          id: 201,
          name: "Canon EOS R5 Mirrorless Camera",
          price: "3899.00",
          discount_value: "100.00",
          brand: "Canon",
          type: "photography",
          category: "photography",
          subcategory: "mirrorless-cameras",
          status: "active",
          primary_image_url: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400",
          created_at: "2024-01-15T10:30:00Z"
        },
        {
          id: 202,
          name: "Sony Alpha A7R V",
          price: "3898.00",
          discount_value: "200.00",
          brand: "Sony",
          type: "photography",
          category: "photography",
          subcategory: "mirrorless-cameras",
          status: "active",
          primary_image_url: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400",
          created_at: "2024-01-14T09:15:00Z"
        },
        {
          id: 203,
          name: "Nikon Z9 Mirrorless Camera",
          price: "5496.95",
          discount_value: "0",
          brand: "Nikon",
          type: "photography",
          category: "photography",
          subcategory: "mirrorless-cameras",
          status: "active",
          primary_image_url: "https://images.unsplash.com/photo-1495121553079-4c61bcce1894?w=400",
          created_at: "2024-01-13T14:20:00Z"
        },
        {
          id: 204,
          name: "Fujifilm X-T5 Mirrorless Camera",
          price: "1699.00",
          discount_value: "50.00",
          brand: "Fujifilm",
          type: "photography",
          category: "photography",
          subcategory: "mirrorless-cameras",
          status: "active",
          primary_image_url: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400",
          created_at: "2024-01-12T11:45:00Z"
        }
      ];
      
      set({
        photoProducts: mockPhotoProducts,
        photoLoading: false,
        photoError: null
      });
    }
  },

  // Get all products combined
  getAllProducts: () => {
    const { latestProducts, videoProducts, photoProducts } = get();
    const allProducts = [...latestProducts, ...videoProducts, ...photoProducts];
    // Remove duplicates based on id
    const uniqueProducts = allProducts.filter((product, index, self) => 
      index === self.findIndex(p => p.id === product.id)
    );
    return uniqueProducts;
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