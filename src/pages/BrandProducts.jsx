import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getBrandBySlug } from '../lib/brandApi'
import { productApi } from '../lib/productApi'

const BrandProducts = () => {
  const { slug } = useParams()
  const [brand, setBrand] = useState(null)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost/api'
  

  useEffect(() => {
    const run = async () => {
      setLoading(true)
      setError(null)
      try {
        const br = await getBrandBySlug(slug)
        const b = br?.data || br?.brand || null
        setBrand(b)
        const res = await productApi.getProducts({ brand: b?.name || slug, is_active: 1, limit: 1000 })
        const arr = Array.isArray(res) ? res : (res?.data || [])
        setProducts(arr)
      } catch (e) {
        setError('Failed to load brand products')
      } finally {
        setLoading(false)
      }
    }
    run()
  }, [slug])

  const filtered = products.filter((p) =>
    !search ||
    (p.name || '').toLowerCase().includes(search.toLowerCase())
  )

  const getImg = (u) => {
    if (!u) return null
    return u.startsWith('http') ? u : `${API_BASE_URL}${u.startsWith('/') ? '' : '/'}${u}`
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{brand?.name || slug}</h1>
            <p className="text-gray-600">Products by this brand</p>
          </div>
          <Link to="/brands" className="text-sm text-gray-600 hover:text-gray-900">Back to Brands</Link>
        </div>

        <div className="mb-6">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
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
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
            <p className="text-gray-600">No products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filtered.map((product) => (
              <Link
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                key={product.id}
                to={`/details/${product.slug}`}
                state={{ product }}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-md transition"
              >
                <div className="w-full h-44 flex items-center justify-center bg-white">
                  <img
                    src={getImg(product.primary_image_url)}
                    alt={product.name}
                    className="max-w-full max-h-full object-contain"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400'
                    }}
                  />
                </div>
                <div className="p-4">
                  <div className="font-semibold text-gray-900 line-clamp-2">{product.name}</div>
                  <div className="text-sm text-gray-600 mt-1">${product.price}</div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default BrandProducts
