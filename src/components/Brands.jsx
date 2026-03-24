import React, { useEffect, useRef, useState, useCallback } from 'react'
import { useBrandStore } from '../store/brandStore'

const Brands = () => {
  const { brands, loading, error, fetchBrands } = useBrandStore()
  const scrollRef = useRef(null)
  const trackRef = useRef(null)

  // Animation state
  const [isPaused, setIsPaused] = useState(false)

  // Touch/Drag state
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [hasDragged, setHasDragged] = useState(false)
  const pauseTimeout = useRef(null)

  useEffect(() => {
    fetchBrands({ is_active: 1, limit: 50 })
  }, [fetchBrands])

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost/api'

  const getLogoUrl = (brand) => {
    if (!brand.logo_url) return null
    return brand.logo_url.startsWith('http')
      ? brand.logo_url
      : `${API_BASE_URL}/${brand.logo_url}`
  }

  // ─── Touch Start ───
  const handleDragStart = useCallback((e) => {
    const container = scrollRef.current
    if (!container) return

    setIsDragging(true)
    setHasDragged(false)
    setIsPaused(true)

    const pageX = e.touches ? e.touches[0].pageX : e.pageX
    setStartX(pageX)
    setScrollLeft(container.scrollLeft)

    if (pauseTimeout.current) clearTimeout(pauseTimeout.current)
  }, [])

  // ─── Touch Move ───
  const handleDragMove = useCallback((e) => {
    if (!isDragging) return
    const container = scrollRef.current
    if (!container) return

    const pageX = e.touches ? e.touches[0].pageX : e.pageX
    const diff = pageX - startX

    // Mark as dragged if moved more than 5px
    if (Math.abs(diff) > 5) {
      setHasDragged(true)
    }

    const walk = diff * 1.8
    container.scrollLeft = scrollLeft - walk
  }, [isDragging, startX, scrollLeft])

  // ─── Touch End ───
  const handleDragEnd = useCallback(() => {
    setIsDragging(false)

    // Resume animation after 3 seconds
    pauseTimeout.current = setTimeout(() => {
      setIsPaused(false)
      setHasDragged(false)
    }, 3000)
  }, [])

  // Cleanup
  useEffect(() => {
    return () => {
      if (pauseTimeout.current) clearTimeout(pauseTimeout.current)
    }
  }, [])

  // Prevent default on touch move to avoid page scroll while swiping
  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    const preventScroll = (e) => {
      if (isDragging) {
        e.preventDefault()
      }
    }

    container.addEventListener('touchmove', preventScroll, { passive: false })
    return () => {
      container.removeEventListener('touchmove', preventScroll)
    }
  }, [isDragging])

  /* ─── Loading ─── */
  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-center gap-3 py-12">
            <div className="h-5 w-5 rounded-full border-2 border-stone-300 border-t-stone-800 animate-spin" />
            <span className="text-sm text-stone-400">Loading...</span>
          </div>
        </div>
      </section>
    )
  }

  if (error || !brands.length) return null

  return (
    <section className="relative py-20 bg-white overflow-hidden">
      {/* Subtle background texture */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #000 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* ─── Header ─── */}
        <div className="text-center mb-16">
          <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-stone-400 mb-3">
            Our Partners
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-stone-900 tracking-tight">
            Trusted by Leading Brands
          </h2>
        </div>

        {/* ─── Marquee + Touch Scroll Container ─── */}
        <div className="relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-12 md:w-24 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 md:w-24 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none" />

          {/* Scrollable container */}
          <div
            ref={scrollRef}
            className={`overflow-x-auto scrollbar-hide ${
              isDragging ? 'cursor-grabbing' : 'cursor-grab'
            }`}
            style={{
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
            // Touch events
            onTouchStart={handleDragStart}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}
            // Mouse events
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={() => {
              if (isDragging) handleDragEnd()
            }}
            // Hover pause (only when not dragging)
            onMouseEnter={() => {
              if (!isDragging) setIsPaused(true)
            }}
          >
            {/* Animated track */}
            <div
              ref={trackRef}
              className="flex items-center gap-8 md:gap-12"
              style={{
                width: 'max-content',
                animation: `marquee ${brands.length * 3}s linear infinite`,
                animationPlayState: isPaused ? 'paused' : 'running',
              }}
            >
              {[...brands, ...brands, ...brands].map((brand, idx) => (
                <div
                  key={`${brand.id}-${idx}`}
                  className="group flex-shrink-0 relative select-none"
                >
                  <div className="w-24 h-20 md:w-44 md:h-28 flex items-center justify-center rounded-2xl border border-stone-100 bg-white p-1 transition-all duration-500 hover:border-stone-200 hover:shadow-[0_8px_30px_-10px_rgba(0,0,0,0.08)] hover:scale-105">
                    {getLogoUrl(brand) ? (
                      <img
                        src={getLogoUrl(brand)}
                        alt={brand.name}
                        className="max-w-full max-h-full object-contain opacity-100 transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0 pointer-events-none"
                        draggable={false}
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                          if (e.currentTarget.nextElementSibling) {
                            e.currentTarget.nextElementSibling.style.display = 'flex'
                          }
                        }}
                      />
                    ) : null}

                    {/* Fallback */}
                    <div
                      className="hidden items-center justify-center w-full h-full"
                      style={{ display: getLogoUrl(brand) ? undefined : 'flex' }}
                    >
                      <span className="text-sm font-bold text-stone-300 group-hover:text-stone-600 transition-colors duration-500 text-center leading-tight">
                        {brand.name}
                      </span>
                    </div>
                  </div>

                  {/* Tooltip */}
                  <div className="absolute -bottom-9 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:-bottom-8 pointer-events-none z-20">
                    <div className="bg-stone-900 text-white text-[11px] font-medium px-3 py-1.5 rounded-lg whitespace-nowrap shadow-xl">
                      {brand.name}
                      <div className="absolute -top-1 left-1/2 -translate-x-1/2 h-2 w-2 rotate-45 bg-stone-900" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Swipe hint - mobile only */}
          <div className="flex justify-center mt-5 md:hidden">
            <span className="text-[10px] text-stone-300 flex items-center gap-1.5 select-none">
              <svg
                className="w-3 h-3 animate-bounce-left"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16l-4-4m0 0l4-4m-4 4h18"
                />
              </svg>
              swipe to explore
              <svg
                className="w-3 h-3 animate-bounce-right"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>
          </div>
        </div>

        {/* ─── Brand Count ─── */}
        <div className="mt-14 text-center">
          <p className="text-sm text-stone-400">
            <span className="font-bold text-stone-600">{brands.length}+</span>{' '}
            brands trust us for quality & service
          </p>
        </div>
      </div>

      {/* ─── Styles ─── */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }

        /* Hide scrollbar everywhere */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        /* Swipe hint arrows */
        @keyframes bounce-left {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(-4px); }
        }
        @keyframes bounce-right {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(4px); }
        }
        .animate-bounce-left {
          animation: bounce-left 1.5s ease-in-out infinite;
        }
        .animate-bounce-right {
          animation: bounce-right 1.5s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}

export default Brands