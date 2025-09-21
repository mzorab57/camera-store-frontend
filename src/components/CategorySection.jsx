import React, { useEffect } from 'react';
import { Camera, Mic, Video, Headphones, Lightbulb, Monitor, Smartphone, Plane, CreditCard } from 'lucide-react';
import { useCategoryStore } from '../store/categoryStore';

const CategorySection = () => {
  const { categories, fetchCategories, loading, error } = useCategoryStore();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost/api';
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

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
    
    return (
      <div className="flex-shrink-0 bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer min-w-[200px] text-center group">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 overflow-hidden bg-gray-100">
          {category.image_url ? (
            <img 
              src={category.image_url.startsWith('http') ? category.image_url : `${API_BASE_URL}/${category.image_url}`}
              alt={category.name}
              className="w-full h-full object-cover rounded-full"
              onError={(e) => {
                e.target.parentElement.innerHTML = `<div class="bg-blue-600 w-full h-full rounded-full flex items-center justify-center group-hover:bg-blue-700 transition-colors"><svg class="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg></div>`;
              }}
            />
          ) : (
            <div className="bg-blue-600 w-full h-full rounded-full flex items-center justify-center group-hover:bg-blue-700 transition-colors">
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
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Loading categories...</span>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-white">
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
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12 tracking-wider">
          CATEGORIES
        </h2>
        
        {categories.length === 0 ? (
          <div className="text-center py-12">
            <Camera className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600">No categories available</p>
          </div>
        ) : (
          <div className="flex overflow-x-auto space-x-6 pb-4 scrollbar-hide">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CategorySection;