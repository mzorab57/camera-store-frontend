import React, { useEffect, useRef, useState } from 'react'
import { useBrandStore } from '../store/brandStore'

const Brands = () => {
  const { brands, loading, error, fetchBrands } = useBrandStore()
  const scrollRef = useRef(null)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    fetchBrands({ is_active: 1, limit: 50 })
  }, [fetchBrands])

  /* ─── Infinite smooth scroll with CSS ─── */
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost/api'

  const getLogoUrl = (brand) => {
    if (!brand.logo_url) return null
    return brand.logo_url.startsWith('http')
      ? brand.logo_url
      : `${API_BASE_URL}/${brand.logo_url}`
  }

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
      <div className="absolute inset-0 opacity-[0.02]"
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
          <div className="mt-4 mx-auto h-1 w-12 rounded-full bg-gradient-to-r from-red-500 to-red-400" />
        </div>

        {/* ─── Marquee Container ─── */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none" />

          {/* Scrolling track */}
          <div className="overflow-hidden" ref={scrollRef}>
            <div
              className={`flex items-center gap-8 md:gap-12 ${isPaused ? '[animation-play-state:paused]' : ''}`}
              style={{
                animation: `marquee ${brands.length * 3}s linear infinite`,
                width: 'max-content',
              }}
            >
              {/* Render brands 3x for seamless loop */}
              {[...brands, ...brands, ...brands].map((brand, idx) => (
                <div
                  key={`${brand.id}-${idx}`}
                  className="group flex-shrink-0 relative"
                >
                  <div className="w-36 h-24 md:w-44 md:h-28 flex items-center justify-center rounded-2xl border border-stone-100 bg-white px-5 py-4 transition-all duration-500 hover:border-stone-200 hover:shadow-[0_8px_30px_-10px_rgba(0,0,0,0.08)] hover:scale-105">
                    {getLogoUrl(brand) ? (
                      <img
                        src={getLogoUrl(brand)}
                        alt={brand.name}
                        className="max-w-full max-h-full object-contain opacity-40 grayscale transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                          e.currentTarget.nextElementSibling.style.display = 'flex'
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
        </div>

        {/* ─── Brand Count ─── */}
        <div className="mt-14 text-center">
          <p className="text-sm text-stone-400">
            <span className="font-bold text-stone-600">{brands.length}+</span>{' '}
            brands trust us for quality & service
          </p>
        </div>
      </div>

      {/* ─── Keyframes ─── */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>
    </section>
  )
}

export default Brands