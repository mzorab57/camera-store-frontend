import React, { useState, useEffect } from 'react';
import { useProductStore } from '../store/productStore';
import { Star, ShoppingCart } from 'lucide-react';

function Products() {
  const { products, loading, error, fetchProducts } = useProductStore();
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const filteredProducts = products.filter(product => {
    if (filter === 'all') return true;
    return product.type === filter;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Products</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Products</h1>
          <p className="text-xl text-gray-600">Discover our complete range of photography and videography equipment</p>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-4">
            <button
              onClick={() => setFilter('all')}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              All Products
            </button>
            <button
              onClick={() => setFilter('photography')}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                filter === 'photography'
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Photography
            </button>
            <button
              onClick={() => setFilter('videography')}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                filter === 'videography'
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Videography
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-48 w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <div className="p-4">
                <h3 className="text-sm font-medium text-gray-900 mb-2">{product.name}</h3>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-1">
                    {product.discount_value && parseFloat(product.discount_value) > 0 ? (
                      <div className="flex flex-col">
                        <span className="font-bold text-green-600 text-lg">
                          ${(parseFloat(product.price) - parseFloat(product.discount_value)).toFixed(2)}
                        </span>
                        <span className="text-sm text-gray-500 line-through">
                          ${parseFloat(product.price).toFixed(2)}
                        </span>
                      </div>
                    ) : (
                      <span className="font-bold text-green-600 text-lg">
                        ${parseFloat(product.price).toFixed(2)}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm text-gray-600">4.8</span>
                  </div>
                </div>
                
                {product.discount_value && parseFloat(product.discount_value) > 0 && (
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-medium">
                      Save ${parseFloat(product.discount_value).toFixed(2)}
                    </span>
                    <span className="text-xs text-green-600 font-medium">
                      {Math.round((parseFloat(product.discount_value) / parseFloat(product.price)) * 100)}% OFF
                    </span>
                  </div>
                )}
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                  <span className="font-medium">{product.brand}</span>
                  <span className="capitalize">{product.category}</span>
                </div>
                
                <button className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                  <ShoppingCart className="h-4 w-4" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your filter or check back later.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;