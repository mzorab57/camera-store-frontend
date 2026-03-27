import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getBrands } from '../lib/brandApi'

const BrandsPage = () => {
  const [brands, setBrands] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost/api'
  useEffect(() => {
    const run = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await getBrands({ is_active: 1, limit: 1000 })
        const arr = Array.isArray(res) ? res : (res?.data || [])
        setBrands(arr)
      } catch (e) {
        setError('Failed to load brands')
      } finally {
        setLoading(false)
      }
    }
    run()
  }, [])

  const getLogoUrl = (brand) => {
    if (!brand.logo_url) return null
    return brand.logo_url.startsWith('http')
      ? brand.logo_url
      : `${API_BASE_URL}/products/file.php?path=${encodeURIComponent(brand.logo_url.includes('/uploads/') ? brand.logo_url.slice(brand.logo_url.indexOf('/uploads/')) : (brand.logo_url.startsWith('/') ? brand.logo_url : '/' + brand.logo_url))}`
  }

  const list = brands
    .filter((b) =>
      !search ||
      (b.name || '').toLowerCase().includes(search.toLowerCase()) ||
      (b.slug || '').toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => (a.name || '').localeCompare(b.name || ''))

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Brands</h1>
          <p className="text-gray-600">Explore all brands</p>
        </div>

        <div className="mb-6">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search brands..."
            className="w-full sm:w-96 rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          />
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {list.map((brand) => (
              <Link
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                key={brand.id}
                to={`/brands/${brand.slug || brand.id}`}
                className="group bg-white border border-gray-200 rounded-2xl p-4 hover:shadow-md transition"
              >
                <div className="w-full h-28 flex items-center justify-center rounded-xl border border-gray-100 bg-white mb-3">
                  {getLogoUrl(brand) ? (
                    <img
                      src={getLogoUrl(brand)}
                      alt={brand.name}
                      className="max-w-full max-h-full object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                        const next = e.currentTarget.nextElementSibling
                        if (next) next.style.display = 'flex'
                      }}
                    />
                  ) : null}
                  <div
                    className="hidden items-center justify-center w-full h-full"
                    style={{ display: getLogoUrl(brand) ? undefined : 'flex' }}
                  >
                    <span className="text-sm font-semibold text-gray-600 text-center">
                      {brand.name}
                    </span>
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-gray-900">{brand.name}</div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default BrandsPage
