import React, { useEffect, useState, useMemo } from 'react';
import { Camera, Mic, Video, Headphones, Lightbulb, Monitor, Smartphone, Plane, CreditCard } from 'lucide-react';
import { useCategoryStore } from '../store/categoryStore';
import { Link } from 'react-router-dom';

const CategorySection = () => {
  const { categories, fetchCategories, loading, error } = useCategoryStore();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost/api';

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Reversed categories (safe — no mutation)
  const reversedCategories = useMemo(() => [...categories].reverse(), [categories]);

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
    return Camera;
  };

  const CategoryCard = ({ category }) => {
    const IconComponent = getIconForCategory(category.name);
    const [imageError, setImageError] = useState(false);

    const isValidImageUrl =
      category.image_url &&
      !category.image_url.includes('cdn.example.com') &&
      !imageError;

    return (
      <div className="flex-shrink-0 bg-white rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer min-w-[200px] text-center group">
        <Link
          to={`/${category.slug.toLowerCase()}`}
          state={{ category, categoryName: category.name }}
        >
          <div className="flex items-center justify-center overflow-hidden">
            {isValidImageUrl ? (
              <img
                src={
                  category.image_url.startsWith('http')
                    ? category.image_url
                    : `${API_BASE_URL}/${category.image_url}`
                }
                alt={category.slug}
                className="w-30 h-20 rounded"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="bg-primary w-full h-full rounded-full flex items-center justify-center group-hover:bg-primary/50 transition-colors">
                <IconComponent className="h-8 w-8 text-white" />
              </div>
            )}
          </div>
          <h3 className="font-medium text-gray-900 text-sm leading-tight p-2">
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

  /* ─── Loading ─── */
  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12 tracking-wider">
            CATEGORIES
          </h2>
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
            <span className="ml-3 text-gray-600">Loading categories...</span>
          </div>
        </div>
      </section>
    );
  }

  /* ─── Error ─── */
  if (error) {
    return (
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12 tracking-wider">
            CATEGORIES
          </h2>
          <div className="text-center py-12">
            <Camera className="h-12 w-12 mx-auto mb-2 opacity-50 text-red-600" />
            <p className="text-lg font-medium text-red-600">Failed to load categories</p>
            <p className="text-sm text-gray-500 mt-1">{error}</p>
            <button
              onClick={() => fetchCategories()}
              className="mt-4 bg-primary hover:bg-primary/50 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  /* ─── Empty ─── */
  if (categories.length === 0) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 tracking-wider">CATEGORIES</h2>
          <Camera className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600">No categories available</p>
        </div>
      </section>
    );
  }

  /* ─── Speed based on count ─── */
  const speed = categories.length * 3;

  return (
    <section className="py-10 bg-gradient-to-b from-primary/30 via-primary/5 to-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12 tracking-wider">
          CATEGORIES
        </h2>

        {/* ═══ Row 1: Left to Right ═══ */}
        <div className="relative mb-6 group/row">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16   z-10 bg-gradient-to-r from-white/80 to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16  z-10 bg-gradient-to-l from-white/80 to-transparent pointer-events-none" />

          <div className="overflow-hidden">
            <div
              className="flex gap-4 group-hover/row:[animation-play-state:paused]"
              style={{
                animation: `marquee-ltr ${speed}s linear infinite`,
                width: 'max-content',
              }}
            >
              {/* 3x for seamless loop */}
              {[...categories, ...categories, ...categories].map((category, index) => (
                <div key={`row1-${category.id}-${index}`} className="flex-shrink-0">
                  <CategoryCard category={category} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ═══ Row 2: Right to Left (Reversed) ═══ */}
        <div className="relative group/row">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-white/80 to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-white/80 to-transparent pointer-events-none" />

          <div className="overflow-hidden">
            <div
              className="flex gap-4 group-hover/row:[animation-play-state:paused]"
              style={{
                animation: `marquee-rtl ${speed}s linear infinite`,
                width: 'max-content',
              }}
            >
              {/* 3x reversed for seamless loop */}
              {[...reversedCategories, ...reversedCategories, ...reversedCategories].map(
                (category, index) => (
                  <div key={`row2-${category.id}-${index}`} className="flex-shrink-0">
                    <CategoryCard category={category} />
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ═══ CSS Keyframes ═══ */}
      <style>{`
        @keyframes marquee-ltr {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        @keyframes marquee-rtl {
          0% {
            transform: translateX(-33.333%);
          }
          100% {
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
};

export default CategorySection;