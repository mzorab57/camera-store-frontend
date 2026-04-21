import React, { useEffect, useState, useMemo, useRef } from 'react';
import { Camera, Mic, Video, Headphones, Lightbulb, Monitor, Smartphone, Plane, CreditCard } from 'lucide-react';
import { useCategoryStore } from '../store/categoryStore';
import { Link } from 'react-router-dom';

const CategorySection = () => {
  const { categories, fetchCategories, loading, error } = useCategoryStore();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost/api';

  const row1Ref = useRef(null);
  const row2Ref = useRef(null);
  
  // لۆژیکی دراگ بە ڕێف (بۆ ئەوەی ڕێندەر نەکاتەوە و کلیک نەکوژێت)
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const moveDistance = useRef(0);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const reversedCategories = useMemo(() => [...categories].reverse(), [categories]);

  const getIconForCategory = (categoryName) => {
    const name = categoryName.toLowerCase();
    if (name.includes('camera')) return Camera;
    return Camera;
  };

  // ─── Drag Handlers ───
  const handleMouseDown = (e, ref) => {
    isDragging.current = true;
    moveDistance.current = 0;
    startX.current = (e.touches ? e.touches[0].pageX : e.pageX) - ref.current.offsetLeft;
    scrollLeft.current = ref.current.scrollLeft;
    // وەستاندنی ئینیمەیشنەکە بە کڵاس
    ref.current.classList.add('paused');
  };

  const handleMouseMove = (e, ref) => {
    if (!isDragging.current) return;
    const x = (e.touches ? e.touches[0].pageX : e.pageX) - ref.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    const distance = Math.abs(x - startX.current);
    moveDistance.current = distance;
    
    if (distance > 5) {
      ref.current.scrollLeft = scrollLeft.current - walk;
    }
  };

  const handleMouseUp = (ref) => {
    isDragging.current = false;
    // دوای ماوەیەک ئینیمەیشنەکە دەستپێدەکاتەوە
    setTimeout(() => {
      if (ref.current) ref.current.classList.remove('paused');
    }, 2000);
  };

  const CategoryCard = ({ category }) => {
    const IconComponent = getIconForCategory(category.name);
    const [imageError, setImageError] = useState(false);

    return (
      <div className="flex-shrink-0 group cursor-pointer transition-transform duration-300  select-none">
        <Link
          to={`/${category.slug.toLowerCase()}`}
          state={{ category, categoryName: category.name }}
          className="block"
          onClick={(e) => {
            // ئەگەر دەستت زۆر جوڵاندبێت، مەچۆ بۆ لینکەکە
            if (moveDistance.current > 15) {
              e.preventDefault();
            }
          }}
          draggable={false}
        >
          <div className="w-[110px] h-[100px] md:w-[200px] md:h-[150px] bg-white border  rounded-2xl overflow-hidden flex flex-col shadow-sm border-black transition-colors">
            <div className="flex-1 flex items-center justify-center p-2">
              {category.image_url && !imageError ? (
                <img
                  src={category.image_url.startsWith('http') ? category.image_url : `${API_BASE_URL}/products/file.php?path=${encodeURIComponent(category.image_url)}`}
                  alt={category.name}
                  className="max-h-full max-w-full object-contain pointer-events-none"
                  onError={() => setImageError(true)}
                  draggable={false}
                />
              ) : (
                <IconComponent className="h-10 w-10 text-gray-400 group-hover:scale-110 transition-transform" />
              )}
            </div>
            <div className="bg-black py-2 px-1">
              <h3 className="font-bold text-center text-white text-[10px] md:text-xs uppercase truncate">
                {category.name}
              </h3>
            </div>
          </div>
        </Link>
      </div>
    );
  };

  if (loading) return <div className="py-20 text-center uppercase font-black animate-pulse">Loading Categories...</div>;

  return (
    <section className="  bg-gradient-to-b from-primary/30 via-primary/5 to-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto ">
        <h2 className="text-xl font-bold  md:text-3xl  text-center text-[#1a1a1a] py-3 lg:py-5 tracking-tighter uppercase">
          Categories
        </h2>

        {/* Row 1 */}
        <div 
          className="marquee-container relative mb-2"
          onMouseEnter={() => row1Ref.current.classList.add('paused')}
          onMouseLeave={() => !isDragging.current && row1Ref.current.classList.remove('paused')}
        >
          <div
            ref={row1Ref}
            className="marquee-wrapper flex gap-4 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing"
            onMouseDown={(e) => handleMouseDown(e, row1Ref)}
            onMouseMove={(e) => handleMouseMove(e, row1Ref)}
            onMouseUp={() => handleMouseUp(row1Ref)}
            onTouchStart={(e) => handleMouseDown(e, row1Ref)}
            onTouchMove={(e) => handleMouseMove(e, row1Ref)}
            onTouchEnd={() => handleMouseUp(row1Ref)}
          >
            <div className="marquee-content flex gap-4">
              {[...categories, ...categories, ...categories].map((cat, i) => (
                <CategoryCard key={`r1-${cat.id}-${i}`} category={cat} />
              ))}
            </div>
          </div>
        </div>

        {/* Row 2 (Mobile only) */}
        <div 
          className="marquee-container relative lg:hidden"
          onMouseEnter={() => row2Ref.current.classList.add('paused')}
          onMouseLeave={() => !isDragging.current && row2Ref.current.classList.remove('paused')}
        >
          <div
            ref={row2Ref}
            className="marquee-wrapper flex gap-4 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing"
            onMouseDown={(e) => handleMouseDown(e, row2Ref)}
            onMouseMove={(e) => handleMouseMove(e, row2Ref)}
            onMouseUp={() => handleMouseUp(row2Ref)}
            onTouchStart={(e) => handleMouseDown(e, row2Ref)}
            onTouchMove={(e) => handleMouseMove(e, row2Ref)}
            onTouchEnd={() => handleMouseUp(row2Ref)}
          >
            <div className="marquee-content-reverse flex gap-4">
              {[...reversedCategories, ...reversedCategories, ...reversedCategories].map((cat, i) => (
                <CategoryCard key={`r2-${cat.id}-${i}`} category={cat} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .marquee-wrapper .marquee-content {
          width: max-content;
          animation: marquee-ltr 60s linear infinite;
        }
        .marquee-wrapper .marquee-content-reverse {
          width: max-content;
          animation: marquee-rtl 60s linear infinite;
        }

        /* وەستان لەکاتی هۆڤەر یان دراگ */
        .marquee-wrapper.paused .marquee-content,
        .marquee-wrapper.paused .marquee-content-reverse {
          animation-play-state: paused;
        }

        @keyframes marquee-ltr {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        @keyframes marquee-rtl {
          0% { transform: translateX(-33.33%); }
          100% { transform: translateX(0); }
        }

        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
};

export default CategorySection;