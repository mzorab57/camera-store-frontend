import React, { useEffect, useState, useRef } from 'react';
import { ShoppingBag, Star, Calendar, DollarSign, ChevronLeft, ChevronRight } from 'lucide-react';
import { useProductStore } from '../store/productStore';
import { useNavigate } from 'react-router-dom';

const LatestProducts = () => {
  const { latestProducts, stats, fetchLatestProducts, loading, error } = useProductStore();
  const navigate = useNavigate();
  const sliderRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    fetchLatestProducts();
  }, [fetchLatestProducts]);

  const checkScrollButtons = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener('scroll', checkScrollButtons);
      return () => slider.removeEventListener('scroll', checkScrollButtons);
    }
  }, [latestProducts]);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const ProductCard = ({ product }) => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost/api';
    
    const handleProductClick = () => {
      navigate('/details', { state: { product } });
    };
    
    return (
      <div 
        onClick={handleProductClick}
        className="flex-shrink-0 w-40 md:w-64 bg-white rounded-lg md:rounded-2xl border border-gray-200 py-2  px-3 md:px-6 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group"
      >
        <div className="w-full h-32 md:h-48 rounded-lg md:rounded-xl overflow-hidden  mb-3 md:mb-4 flex items-center justify-center">
          {product.primary_image_url ? (
            <img 
              src={product.primary_image_url.startsWith('http') ? product.primary_image_url : `${API_BASE_URL}/${product.primary_image_url}`}
              alt={product.name}
              className="max-w-full max-h-full  object-contain group-hover:scale-110 transition-transform duration-300"
              onError={(e) => {
                e.target.parentElement.innerHTML = `<div class="w-full h-full bg-blue-600 rounded-xl flex items-center justify-center"><svg class="h-16 w-16 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg></div>`;
              }}
            />
          ) : (
            <div className="w-full h-full bg-blue-600 rounded-xl flex items-center justify-center group-hover:bg-blue-700 transition-colors">
              <ShoppingBag className="h-16 w-16 text-white" />
            </div>
          )}
        </div>
        
        <div className="space-y-3  w-full">
          <h3 className="font-semibold text-gray-900 text-sm md:text-base  leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              {/* <DollarSign className="h-4 w-4 text-green-600" /> */}
              <span className="font-bold text-green-600 text-xs md:text-lg">
                ${parseFloat(product.price).toFixed(2)}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <span className="text-xs text-gray-600">4.5</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span className="font-medium">{product.brand}</span>
            <div className="flex items-center space-x-1">
              <Calendar className="h-3 w-3" />
              <span>{new Date(product.created_at).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <section className="py-16 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12 tracking-wider">
            LATEST PRODUCTS
          </h2>
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Loading latest products...</span>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-10 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12 tracking-wider">
            LATEST PRODUCTS
          </h2>
          <div className="text-center py-12">
            <div className="text-red-600 mb-4">
              <ShoppingBag className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p className="text-lg font-medium">Failed to load latest products</p>
              <p className="text-sm text-gray-500 mt-1">{error}</p>
            </div>
            <button 
              onClick={() => fetchLatestProducts()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 tracking-wider">
            LATEST PRODUCTS
          </h2>
          {/* <div className="flex justify-center space-x-8 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <ShoppingBag className="h-4 w-4" />
              <span>{stats.products_total} Total Products</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4" />
              <span>{stats.products_active} Active</span>
            </div>
          </div> */}
        </div>
        
        {latestProducts.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingBag className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600">No products available</p>
          </div>
        ) : (
          <div className="relative">
            <div 
              ref={sliderRef}
              className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide scroll-smooth"
            >
              {latestProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            
            {/* Navigation Arrows */}
            {canScrollLeft && (
              <button 
                onClick={scrollLeft}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white shadow-lg hover:shadow-xl text-gray-700 hover:text-blue-600 p-2 rounded-full transition-all z-10"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
            )}
            
            {canScrollRight && (
              <button 
                onClick={scrollRight}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white shadow-lg hover:shadow-xl text-gray-700 hover:text-blue-600 p-2 rounded-full transition-all z-10"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default LatestProducts;