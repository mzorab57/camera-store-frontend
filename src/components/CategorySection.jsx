import React, { useEffect, useState, useMemo, useRef } from 'react';
import { Camera } from 'lucide-react';
import { useCategoryStore } from '../store/categoryStore';
import { Link } from 'react-router-dom';

const CategorySection = () => {
  const { categories, fetchCategories, loading } = useCategoryStore();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost/api';

  const row1Ref = useRef(null);
  const row2Ref = useRef(null);
  
  // Animation state
  const animationFrame1 = useRef(null);
  const animationFrame2 = useRef(null);
  const scrollSpeed1 = useRef(0.5); // خێرایی جووڵە
  const scrollSpeed2 = useRef(-0.5); // بەرەو پێچەوانە
  
  // Drag state
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const moveDistance = useRef(0);
  const isPaused = useRef(false);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const reversedCategories = useMemo(() => [...categories].reverse(), [categories]);

  const getIconForCategory = (categoryName) => {
    return Camera;
  };

  // ─── Auto Scroll Animation ───
  useEffect(() => {
    const animateScroll = (ref, speed, frameRef) => {
      if (!ref.current) return;
      
      // مەرجەکە هێنرایە ئێرە بۆ ئەوەی لوپەکە نەپچڕێت کاتێک ماوسی دەچێتە سەر
      if (!isPaused.current) {
        ref.current.scrollLeft += speed;
        
        // Reset لەکاتی گەیشتن بە کۆتایی
        const maxScroll = ref.current.scrollWidth / 3; // چونکە 3 جار دووبارەمان کردووەتەوە
        
        if (speed > 0 && ref.current.scrollLeft >= maxScroll) {
          ref.current.scrollLeft = 0;
        } else if (speed < 0 && ref.current.scrollLeft <= 0) {
          ref.current.scrollLeft = maxScroll;
        }
      }
      
      // دەرەوەی مەرجەکە بۆ ئەوەی هەمیشە ئامادە بێت بۆ جووڵە
      frameRef.current = requestAnimationFrame(() => animateScroll(ref, speed, frameRef));
    };

    if (categories.length > 0) {
      animateScroll(row1Ref, scrollSpeed1.current, animationFrame1);
      if (row2Ref.current) {
        animateScroll(row2Ref, scrollSpeed2.current, animationFrame2);
      }
    }

    return () => {
      if (animationFrame1.current) cancelAnimationFrame(animationFrame1.current);
      if (animationFrame2.current) cancelAnimationFrame(animationFrame2.current);
    };
  }, [categories]);

  // ─── Drag Handlers ───
  const handleMouseDown = (e, ref) => {
    isDragging.current = true;
    isPaused.current = true;
    moveDistance.current = 0;
    startX.current = (e.touches ? e.touches[0].pageX : e.pageX) - ref.current.offsetLeft;
    scrollLeft.current = ref.current.scrollLeft;
    ref.current.style.cursor = 'grabbing';
  };

  const handleMouseMove = (e, ref) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = (e.touches ? e.touches[0].pageX : e.pageX) - ref.current.offsetLeft;
    const walk = (x - startX.current) * 2;
    moveDistance.current = Math.abs(walk);
    ref.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleMouseUp = (ref) => {
    isDragging.current = false;
    ref.current.style.cursor = 'grab';
    
    // دوای 1.5 چرکە ئینیمەیشن دەستپێدەکاتەوە
    setTimeout(() => {
      isPaused.current = false;
    }, 1500);
  };

  const handleMouseEnter = () => {
    isPaused.current = true;
  };

  const handleMouseLeave = () => {
    if (!isDragging.current) {
      isPaused.current = false;
    }
  };

  const CategoryCard = ({ category }) => {
    const IconComponent = getIconForCategory(category.name);
    const [imageError, setImageError] = useState(false);

    return (
      <div className="flex-shrink-0 group cursor-pointer transition-transform duration-300 select-none">
        <Link
          to={`/${category.slug.toLowerCase()}`}
          state={{ category, categoryName: category.name }}
          className="block"
          onClick={(e) => {
            if (moveDistance.current > 15) {
              e.preventDefault();
            }
          }}
          draggable={false}
        >
          <div className="w-[90px] h-[80px] md:w-[200px] md:h-[150px] bg-white border rounded-2xl overflow-hidden flex flex-col shadow-sm border-black transition-all hover:shadow-lg ">
            <div className="flex-1 flex items-center justify-center p-2">
              {category.image_url && !imageError ? (
                <img
                  src={category.image_url.startsWith('http') 
                    ? category.image_url 
                    : `${API_BASE_URL}/products/file.php?path=${encodeURIComponent(category.image_url)}`}
                  alt={category.name}
                  className="max-h-full scale-150 md:scale-125 max-w-full object-contain pointer-events-none"
                  onError={() => setImageError(true)}
                  draggable={false}
                />
              ) : (
                <IconComponent className="h-10 w-10 text-gray-400 group-hover:scale-110 transition-transform" />
              )}
            </div>
            <div className="bg-black text-center flex items-center justify-center lg:py-2 py-0.5 px-1">
              <h3 className="lg:font-bold text-white text-[8px] md:text-xs">
                {category.name}
              </h3>
            </div>
          </div>
        </Link>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="py-20 text-center uppercase font-black animate-pulse">
        Loading Categories...
      </div>
    );
  }

  return (
    <section className="bg-gradient-to-b from-primary/30 via-primary/5 to-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-xl font-bold md:text-3xl text-center text-[#1a1a1a] py-3 lg:py-5 tracking-tighter uppercase">
          Categories
        </h2>

        {/* Row 1 - بەرەو ڕاست */}
        <div 
          className="relative mb-2"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            ref={row1Ref}
            className="flex gap-4 overflow-x-auto scrollbar-hide cursor-grab select-none"
            style={{ scrollBehavior: 'auto' }}
            onMouseDown={(e) => handleMouseDown(e, row1Ref)}
            onMouseMove={(e) => handleMouseMove(e, row1Ref)}
            onMouseUp={() => handleMouseUp(row1Ref)}
            onMouseLeave={() => handleMouseUp(row1Ref)}
            onTouchStart={(e) => handleMouseDown(e, row1Ref)}
            onTouchMove={(e) => handleMouseMove(e, row1Ref)}
            onTouchEnd={() => handleMouseUp(row1Ref)}
          >
            {[...categories, ...categories, ...categories].map((cat, i) => (
              <CategoryCard key={`r1-${cat.id}-${i}`} category={cat} />
            ))}
          </div>
        </div>

        {/* Row 2 - بەرەو چەپ (تەنها موبایل) */}
        <div 
          className="relative lg:hidden"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            ref={row2Ref}
            className="flex gap-4 overflow-x-auto scrollbar-hide cursor-grab select-none"
            style={{ scrollBehavior: 'auto' }}
            onMouseDown={(e) => handleMouseDown(e, row2Ref)}
            onMouseMove={(e) => handleMouseMove(e, row2Ref)}
            onMouseUp={() => handleMouseUp(row2Ref)}
            onMouseLeave={() => handleMouseUp(row2Ref)}
            onTouchStart={(e) => handleMouseDown(e, row2Ref)}
            onTouchMove={(e) => handleMouseMove(e, row2Ref)}
            onTouchEnd={() => handleMouseUp(row2Ref)}
          >
            {[...reversedCategories, ...reversedCategories, ...reversedCategories].map((cat, i) => (
              <CategoryCard key={`r2-${cat.id}-${i}`} category={cat} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { 
          display: none; 
        }
        .scrollbar-hide { 
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default CategorySection;