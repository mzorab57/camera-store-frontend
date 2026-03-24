import React, { useEffect, useState, useMemo, useRef, useCallback } from 'react';
import { Camera, Mic, Video, Headphones, Lightbulb, Monitor, Smartphone, Plane, CreditCard } from 'lucide-react';
import { useCategoryStore } from '../store/categoryStore';
import { Link } from 'react-router-dom';

const CategorySection = () => {
  const { categories, fetchCategories, loading, error } = useCategoryStore();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost/api';

  // Refs for both rows
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);

  // Touch/Drag state for Row 1
  const [isDragging1, setIsDragging1] = useState(false);
  const [startX1, setStartX1] = useState(0);
  const [scrollLeft1, setScrollLeft1] = useState(0);
  const [isPaused1, setIsPaused1] = useState(false);
  const pauseTimeout1 = useRef(null);

  // Touch/Drag state for Row 2
  const [isDragging2, setIsDragging2] = useState(false);
  const [startX2, setStartX2] = useState(0);
  const [scrollLeft2, setScrollLeft2] = useState(0);
  const [isPaused2, setIsPaused2] = useState(false);
  const pauseTimeout2 = useRef(null);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

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

  // ─── Row 1 Handlers ───
  const handleTouchStart1 = useCallback((e) => {
    const container = row1Ref.current;
    if (!container) return;
    setIsDragging1(true);
    setIsPaused1(true);
    setStartX1(e.touches ? e.touches[0].pageX : e.pageX);
    setScrollLeft1(container.scrollLeft);

    if (pauseTimeout1.current) clearTimeout(pauseTimeout1.current);
  }, []);

  const handleTouchMove1 = useCallback((e) => {
    if (!isDragging1) return;
    const container = row1Ref.current;
    if (!container) return;
    const x = e.touches ? e.touches[0].pageX : e.pageX;
    const walk = (x - startX1) * 1.5;
    container.scrollLeft = scrollLeft1 - walk;
  }, [isDragging1, startX1, scrollLeft1]);

  const handleTouchEnd1 = useCallback(() => {
    setIsDragging1(false);
    pauseTimeout1.current = setTimeout(() => {
      setIsPaused1(false);
    }, 3000);
  }, []);

  // ─── Row 2 Handlers ───
  const handleTouchStart2 = useCallback((e) => {
    const container = row2Ref.current;
    if (!container) return;
    setIsDragging2(true);
    setIsPaused2(true);
    setStartX2(e.touches ? e.touches[0].pageX : e.pageX);
    setScrollLeft2(container.scrollLeft);

    if (pauseTimeout2.current) clearTimeout(pauseTimeout2.current);
  }, []);

  const handleTouchMove2 = useCallback((e) => {
    if (!isDragging2) return;
    const container = row2Ref.current;
    if (!container) return;
    const x = e.touches ? e.touches[0].pageX : e.pageX;
    const walk = (x - startX2) * 1.5;
    container.scrollLeft = scrollLeft2 - walk;
  }, [isDragging2, startX2, scrollLeft2]);

  const handleTouchEnd2 = useCallback(() => {
    setIsDragging2(false);
    pauseTimeout2.current = setTimeout(() => {
      setIsPaused2(false);
    }, 3000);
  }, []);

  // Cleanup timeouts
  useEffect(() => {
    return () => {
      if (pauseTimeout1.current) clearTimeout(pauseTimeout1.current);
      if (pauseTimeout2.current) clearTimeout(pauseTimeout2.current);
    };
  }, []);

  const CategoryCard = ({ category }) => {
    const IconComponent = getIconForCategory(category.name);
    const [imageError, setImageError] = useState(false);

    const isValidImageUrl =
      category.image_url &&
      !category.image_url.includes('cdn.example.com') &&
      !imageError;

    return (
      <div className="flex-shrink-0 group cursor-pointer transition-transform duration-300 hover:scale-105 select-none">
        <Link
          to={`/${category.slug.toLowerCase()}`}
          state={{ category, categoryName: category.name }}
          className="block"
          draggable={false}
          onClick={(e) => {
            // Prevent navigation when dragging
            if (isDragging1 || isDragging2) {
              e.preventDefault();
            }
          }}
        >
          <div className="w-[100px] h-[90px] md:w-[200px] md:h-[150px] bg-white border border-black rounded-[15px] overflow-hidden flex flex-col shadow-sm">
            <div className="h-24 md:h-32 flex items-center justify-center">
              {isValidImageUrl ? (
                <img
                  src={
                    category.image_url.startsWith('http')
                      ? category.image_url
                      : `${API_BASE_URL}/${category.image_url}`
                  }
                  alt={category.slug}
                  className="max-h-full max-w-full object-contain pointer-events-none"
                  onError={() => setImageError(true)}
                  draggable={false}
                />
              ) : (
                <IconComponent className="h-12 w-12 text-primary group-hover:scale-110 transition-transform" />
              )}
            </div>
            <div className="bg-black h-9 pt-1">
              <h3 className="font-bold text-center text-white text-[8px] md:text-xs uppercase line-clamp-2">
                {category.name}
              </h3>
            </div>
          </div>
        </Link>
      </div>
    );
  };

  /* ─── Loading ─── */
  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8 tracking-wider">
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
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8 tracking-wider">
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

  return (
    <section className="py-8 bg-gradient-to-b from-primary/30 via-primary-10 to-transparent overflow-hidden">
      <div className="max-w-[1250px] mx-auto px-4">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-semibold text-center text-[#1a1a1a] mb-8 tracking-tighter uppercase">
          CATEGORIES
        </h2>

        {/* ═══ Row 1: Left to Right with Touch Scroll ═══ */}
        <div className="relative mb-8 overflow-hidden">
          {/* Fade edges */}
          {/* <div className="absolute left-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-r from-white/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-l from-white/80 to-transparent z-10 pointer-events-none" /> */}

          <div
            ref={row1Ref}
            className={`flex gap-3 overflow-x-auto scrollbar-hide touch-pan-x ${
              isDragging1 ? 'cursor-grabbing' : 'cursor-grab'
            }`}
            style={{
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
            // Touch events
            onTouchStart={handleTouchStart1}
            onTouchMove={handleTouchMove1}
            onTouchEnd={handleTouchEnd1}
            // Mouse drag events
            onMouseDown={handleTouchStart1}
            onMouseMove={handleTouchMove1}
            onMouseUp={handleTouchEnd1}
            onMouseLeave={() => {
              if (isDragging1) handleTouchEnd1();
            }}
          >
            <div
              className={`flex gap-3 ${isPaused1 ? '' : 'animate-marquee-ltr'}`}
              style={{
                width: 'max-content',
                animationPlayState: isPaused1 ? 'paused' : 'running',
              }}
            >
              {[...categories, ...categories, ...categories].map((category, index) => (
                <CategoryCard key={`row1-${category.id}-${index}`} category={category} />
              ))}
            </div>
          </div>

        
        </div>

        {/* ═══ Row 2: Right to Left with Touch Scroll (mobile only) ═══ */}
        <div className="relative overflow-hidden lg:hidden">
          {/* Fade edges */}
          {/* <div className="absolute left-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-r from-white/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-l from-white/80 to-transparent z-10 pointer-events-none" /> */}

          <div
            ref={row2Ref}
            className={`flex gap-3 overflow-x-auto scrollbar-hide touch-pan-x ${
              isDragging2 ? 'cursor-grabbing' : 'cursor-grab'
            }`}
            style={{
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
            onTouchStart={handleTouchStart2}
            onTouchMove={handleTouchMove2}
            onTouchEnd={handleTouchEnd2}
            onMouseDown={handleTouchStart2}
            onMouseMove={handleTouchMove2}
            onMouseUp={handleTouchEnd2}
            onMouseLeave={() => {
              if (isDragging2) handleTouchEnd2();
            }}
          >
            <div
              className={`flex gap-3 ${isPaused2 ? '' : 'animate-marquee-rtl'}`}
              style={{
                width: 'max-content',
                animationPlayState: isPaused2 ? 'paused' : 'running',
              }}
            >
              {[...reversedCategories, ...reversedCategories, ...reversedCategories].map(
                (category, index) => (
                  <CategoryCard key={`row2-${category.id}-${index}`} category={category} />
                )
              )}
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        .animate-marquee-ltr {
          animation: marquee-ltr 40s linear infinite;
        }
        .animate-marquee-rtl {
          animation: marquee-rtl 40s linear infinite;
        }

        @keyframes marquee-ltr {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }

        @keyframes marquee-rtl {
          0% { transform: translateX(-33.333%); }
          100% { transform: translateX(0); }
        }

        /* Hide scrollbar */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        /* Swipe indicator animations */
        @keyframes bounce-x {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(-4px); }
        }
        @keyframes bounce-x-reverse {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(4px); }
        }
        .animate-bounce-x {
          animation: bounce-x 1.5s ease-in-out infinite;
        }
        .animate-bounce-x-reverse {
          animation: bounce-x-reverse 1.5s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default CategorySection;