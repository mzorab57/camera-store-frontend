import React, { useEffect, useRef, useState, useCallback } from 'react'
import { useBrandStore } from '../store/brandStore'
import { Link } from 'react-router-dom'

const Brands = () => {
  const { brands, loading, error, fetchBrands } = useBrandStore()
  const scrollRef = useRef(null)
  
  // لۆژیکی دراگ و جوڵە
  const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)
  const moveDistance = useRef(0)
  const pauseTimeout = useRef(null)

  useEffect(() => {
    fetchBrands({ is_active: 1, limit: 50 })
  }, [fetchBrands])

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost/api'

  const getLogoUrl = (brand) => {
    if (!brand.logo_url) return null
    return brand.logo_url.startsWith('http')
      ? brand.logo_url
      : `${API_BASE_URL}/products/file.php?path=${encodeURIComponent(brand.logo_url)}`
  }

  // ─── Drag Handlers ───
  const onStart = (e) => {
    isDragging.current = true
    moveDistance.current = 0
    const pageX = e.touches ? e.touches[0].pageX : e.pageX
    startX.current = pageX - scrollRef.current.offsetLeft
    scrollLeft.current = scrollRef.current.scrollLeft
    
    // وەستاندنی ئینیمەیشن
    scrollRef.current.classList.add('paused')
    if (pauseTimeout.current) clearTimeout(pauseTimeout.current)
  }

  const onMove = (e) => {
    if (!isDragging.current) return
    const pageX = e.touches ? e.touches[0].pageX : e.pageX
    const x = pageX - scrollRef.current.offsetLeft
    const walk = (x - startX.current) * 1.5
    
    // پاوانی مەودای جوڵە
    moveDistance.current = Math.abs(x - startX.current)
    
    if (moveDistance.current > 5) {
      scrollRef.current.scrollLeft = scrollLeft.current - walk
    }
  }

  const onEnd = () => {
    isDragging.current = false
    // دوای ٣ چرکە دەستپێکردنەوەی ئۆتۆماتیکی
    pauseTimeout.current = setTimeout(() => {
      if (scrollRef.current) scrollRef.current.classList.remove('paused')
    }, 3000)
  }

  if (loading) return <div className="py-20 text-center animate-pulse">Loading Brands...</div>
  if (error || !brands.length) return null

  return (
    <section className="relative py-4 bg-white overflow-hidden">
      <div className="relative max-w-7xl mx-auto ">
        <div className="text-center ">
       
          <h2 className="text-xl  font-bold  md:text-3xl  text-center text-[#1a1a1a] tracking-tighter uppercase">
              <div className=" text-center">
          <p className="text-sm text-stone-400">
            <span className="font-bold text-stone-600">{brands.length}+</span> brands 
          </p>
        </div>
           Trusted by Leading Brands
          </h2>
        </div>

        <div 
          className="relative group"
          onMouseEnter={() => scrollRef.current.classList.add('paused')}
          onMouseLeave={() => !isDragging.current && scrollRef.current.classList.remove('paused')}
        >
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-12 md:w-24 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 md:w-24 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none" />

          <div
            ref={scrollRef}
            className="overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing"
            onMouseDown={onStart}
            onMouseMove={onMove}
            onMouseUp={onEnd}
            onMouseLeave={onEnd}
            onTouchStart={onStart}
            onTouchMove={onMove}
            onTouchEnd={onEnd}
          >
            <div 
              className="marquee-content flex items-center gap-8 md:gap-12 py-4"
              style={{ width: 'max-content' }}
            >
              {[...brands, ...brands, ...brands].map((brand, idx) => (
                <Link
                  key={`${brand.id}-${idx}`}
                  to="/brands" // لێرە دەچێت بۆ پەیجی براندەکان
                  onClick={(e) => {
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                    if (moveDistance.current > 15) e.preventDefault()
                  }}
                  className="group flex-shrink-0 select-none block"
                  draggable={false}
                >
                  <div className="w-32 h-28 md:w-44 md:h-32 flex items-center justify-center rounded-2xl border border-stone-100 bg-white p-4 transition-all duration-500 group-hover:border-black group-hover:shadow-xl group-hover:scale-105">
                    <img
                      src={getLogoUrl(brand)}
                      alt={brand.name}
                      className="max-w-full max-h-full object-contain pointer-events-none grayscale group-hover:grayscale-0 transition-all duration-500"
                      draggable={false}
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

       
      </div>

      <style>{`
        .marquee-content {
          animation: marquee ${brands.length * 3}s linear infinite;
        }
        .paused .marquee-content {
          animation-play-state: paused;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  )
}

export default Brands