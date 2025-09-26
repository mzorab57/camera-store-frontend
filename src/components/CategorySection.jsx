import React, { useEffect, useState } from 'react';
import { Camera, Mic, Video, Headphones, Lightbulb, Monitor, Smartphone, Plane, CreditCard } from 'lucide-react';
import { useCategoryStore } from '../store/categoryStore';
import { Link } from 'react-router-dom';

const CategorySection = () => {
  const { categories, fetchCategories, loading, error } = useCategoryStore();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost/api';
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);
  
  // Auto-slide effect
  useEffect(() => {
    if (categories.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === categories.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change slide every 3 seconds
    
    return () => clearInterval(interval);
  }, [categories.length]);

  // Icon mapping for categories
  const getIconForCategory = (categoryName) => {
    const name = categoryName.toLowerCase();
    if (name.includes('camera') || name.includes('photo')) return Camera;
    if (name.includes('audio') || name.includes('sound')) return Mic;
    if (name.includes('video') || name.includes('recording')) return Video;
    if (name.includes('headphone') || name.includes('speaker')) return Headphones;
    if (name.includes('light') || name.includes('studio')) return Lightbulb;
    if (name.includes('monitor') || name.includes('display')) return Monitor;
    if (name.includes('mobile') || name.includes('phone')) return Smartphone;
    if (name.includes('drone') || name.includes('aerial')) return Plane;
    if (name.includes('memory') || name.includes('storage')) return CreditCard;
    return Camera; // Default icon
  };

  const CategoryCard = ({ category }) => {
    const IconComponent = getIconForCategory(category.name);
    const [imageError, setImageError] = useState(false);
    
    // Check if image URL is problematic
    const isValidImageUrl = category.image_url && 
      !category.image_url.includes('cdn.example.com') && 
      !imageError;
    
    return (
      <div  className="flex-shrink-0 bg-white rounded-2xl border border-gray-200 p-2 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer min-w-[200px] text-center group">
        <Link to={`/${category.slug.toLowerCase()}`}
              state={{ category: category, categoryName: category.name}}
        >
        <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 flex items-center justify-center mx-auto mb-4 overflow-hidden">
          {isValidImageUrl ? (
            <img 
              src={category.image_url.startsWith('http') ? category.image_url : `${API_BASE_URL}/${category.image_url}`}
              alt={category.slug}
              className="w-full h-full object-cover rounded"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="bg-primary w-full h-full rounded-full flex items-center justify-center group-hover:bg-primary/50 transition-colors">
              <IconComponent className="h-8 w-8 text-white" />
            </div>
          )}
        </div>
        <h3 className="font-medium text-gray-900 text-sm leading-tight">
          {category.name}
        </h3>
        {category.description && (
          <p className="text-xs text-gray-500 mt-2 line-clamp-2">
            {category.description}
          </p>
        )}
        </Link>
      </div>
    );
  };

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12 tracking-wider">
            CATEGORIES
          </h2>
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <span className="ml-3 text-gray-600">Loading categories...</span>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12 tracking-wider">
            CATEGORIES
          </h2>
          <div className="text-center py-12">
            <div className="text-red-600 mb-4">
              <Camera className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p className="text-lg font-medium">Failed to load categories</p>
              <p className="text-sm text-gray-500 mt-1">{error}</p>
            </div>
            <button 
              onClick={() => fetchCategories()}
              className="bg-primary hover:bg-primary/50 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12 tracking-wider">
          CATEGORIES
        </h2>
        
        {categories.length === 0 ? (
          <div className="text-center py-12">
            <Camera className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600">No categories available</p>
          </div>
        ) : (
          <div className="relative overflow-hidden stopScroll" >
            <div 
              className="flex transition-transform duration-500 ease-in-out enable-animation-x"
              style={{
                transform: `translateX(-${currentIndex * (100 / Math.min(categories.length, 4))}%)`,
                width: `${Math.max(categories.length, 4) * 25}%`
              }}
            >
              {categories.concat(categories.slice(0, 8)).map((category, index) => (
                <div key={`${category.id}-${index}`} className=" flex-shrink-0 px-2">
                  <CategoryCard category={category} />
                </div>
              ))}
            </div>
           
          </div>
        )}
      </div>
    </section>
  );
};

export default CategorySection;