import React, { useEffect, useState } from 'react';
import { useBrandStore } from '../store/brandStore';
import { Star, Award, TrendingUp } from 'lucide-react';

const Brands = () => {
  const { brands, loading, error, fetchBrands } = useBrandStore();
  const [duplicatedBrands, setDuplicatedBrands] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchBrands({ is_active: 1, limit: 50 });
  }, [fetchBrands]);

  useEffect(() => {
    if (brands.length > 0) {
      // Duplicate brands for seamless infinite scroll
      setDuplicatedBrands([...brands, ...brands, ...brands]);
    }
  }, [brands]);

  // Auto-scroll functionality
  useEffect(() => {
    if (duplicatedBrands.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentIndex(prev => {
        const maxIndex = Math.max(duplicatedBrands.length - 4, 0);
        return prev >= maxIndex ? 0 : prev + 1;
      });
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [duplicatedBrands.length]);

  const BrandCard = ({ brand, index }) => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost/api';
    
    return (
      <div 
        className="flex-shrink-0 w-32 h-20 md:w-40 md:h-24 bg-white rounded-xl border border-gray-200 hover:border-red-300 transition-all duration-300 hover:shadow-lg hover:scale-105 group cursor-pointer mx-2"
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        <div className="w-full h-full p-3 md:p-4 flex items-center justify-center relative overflow-hidden">
          {brand.logo_url ? (
            <img 
              src={brand.logo_url.startsWith('http') ? brand.logo_url : `${API_BASE_URL}/${brand.logo_url}`}
              alt={brand.name}
              className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300 group-hover:scale-110"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextElementSibling.style.display = 'flex';
              }}
            />
          ) : null}
          
          {/* Fallback when no logo or logo fails to load */}
          <div className="hidden w-full h-full items-center justify-center bg-gradient-to-br from-red-50 to-red-100 rounded-lg">
            <div className="text-center">
              <Award className="h-6 w-6 md:h-8 md:w-8 text-red-500 mx-auto mb-1" />
              <span className="text-xs md:text-sm font-semibold text-red-700 leading-tight">
                {brand.name}
              </span>
            </div>
          </div>
          
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
          
          {/* Brand name tooltip on hover */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10">
            {brand.name}
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              TRUSTED BRANDS
            </h2>
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
              <span className="ml-3 text-gray-600">Loading brands...</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              TRUSTED BRANDS
            </h2>
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  if (!brands.length) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              TRUSTED BRANDS
            </h2>
            <p className="text-gray-600">No brands available</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto  px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
           
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-wider">
              TRUSTED BRANDS
            </h2>
           
          </div>
          
          <div className="flex items-center justify-center mt-4 space-x-4 text-sm text-gray-500">
            <div className="flex items-center">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>Premium Quality</span>
            </div>
            <div className="flex items-center">
              <Award className="h-4 w-4 mr-1" />
              <span>Authorized Dealers</span>
            </div>
          </div>
        </div>

        {/* Animated Brand Carousel */}
        <div className="relative overflow-hidden stopScroll">
          <div 
            className="flex transition-transform duration-500 py-3 ease-in-out enable-animation-x" 
            style={{ 
              transform: `translateX(-${currentIndex * (100 / Math.min(duplicatedBrands.length, 4))}%)`, 
              width: `${Math.max(duplicatedBrands.length, 4) * 25}%` 
            }} 
          > 
            {duplicatedBrands.concat(duplicatedBrands.slice(0, 8)).map((brand, index) => ( 
              <div key={`${brand.id}-${index}`} className="flex-shrink-0 px-2"> 
                <BrandCard brand={brand} index={index} /> 
              </div> 
            ))} 
          </div> 
        </div>

     
      </div>
    </section>
  );
};

export default Brands;