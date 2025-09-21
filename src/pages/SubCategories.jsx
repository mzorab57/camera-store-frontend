import React, { useState, useEffect } from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import { useProductStore } from '../store/productStore';
import { Filter, Grid, List, Search, Star, Heart, ShoppingCart, Camera, Video, Image } from 'lucide-react';


const SubCategories = () => {
  const location = useLocation();
  const { categoryName, subcategoryType, subcategoryName } = useParams();
  const productList = location.state?.products || [];
    
  
  const { 
    latestProducts, 
    videoProducts, 
    photoProducts, 
    loading, 
    videoLoading, 
    photoLoading, 
    error, 
    videoError, 
    photoError, 
    fetchLatestProducts, 
    fetchVideoProducts, 
    fetchPhotoProducts, 
    getAllProducts 
  } = useProductStore();
  
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedType, setSelectedType] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');

  useEffect(() => {
    fetchLatestProducts();
    fetchVideoProducts();
    fetchPhotoProducts();
  }, [fetchLatestProducts, fetchVideoProducts, fetchPhotoProducts]);

  const isLoading = loading || videoLoading || photoLoading;
  const hasError = error || videoError || photoError;

  useEffect(() => {
    
    const products = productList;
    
    if (!products || products.length === 0) {
        console.log("products");
        console.log(products);
        
      setFilteredProducts([]);
      return;
    }
    
    let filtered = products;

    // Filter by type
    if (selectedType !== 'all') {
      filtered = filtered.filter(product => {
        const productType = product.type || 'both';
        return productType === selectedType;
      });
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return parseFloat(a.price) - parseFloat(b.price);
        case 'price-high':
          return parseFloat(b.price) - parseFloat(a.price);
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(filtered);
  }, [latestProducts, videoProducts, photoProducts, subcategoryName, selectedType, searchQuery, sortBy, getAllProducts]);

  const products = getAllProducts();

  const typeFilters = [
    { id: 'all', label: 'All Products', count: products?.length || 0, icon: Image },
    { id: 'photography', label: 'Photography', count: products?.filter(p => p.type === 'photography').length || 0, icon: Camera },
    { id: 'videography', label: 'Videography', count: products?.filter(p => p.type === 'videography').length || 0, icon: Video },
    { id: 'both', label: 'Both', count: products?.filter(p => p.type === 'both').length || 0, icon: Star }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Products</h2>
            <p className="text-gray-600">{error || videoError || photoError}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link to="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600">
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                </svg>
                <Link to={`/${categoryName}`} className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2">
                  {categoryName}
                </Link>
              </div>
            </li>

             <li>
              <div className="flex items-center">
                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                </svg>
                <Link  className="ml-1 text-sm font-medium text-gray-500 pointer-events-none  md:ml-2">
                  {subcategoryType}
                </Link>
              </div>
            </li>
            {subcategoryName && (
              <li>
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                  </svg>
                  <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 capitalize">
                    {subcategoryName}
                  </span>
                </div>
              </li>
            )}
          </ol>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gred-900 mb-2 capitalize">
            {subcategoryName || categoryName} Products
          </h1>
          <p className="text-gray-600">
            Discover our collection of professional {subcategoryName || categoryName} equipment
          </p>
        </div>

        
       

        {/* Filters and Controls */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          {/* Type Filters */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter by Type</h3>
            <div className="flex flex-wrap gap-3">
              {typeFilters.map((filter) => {
                const IconComponent = filter.icon;
                return (
                  <button
                    key={filter.id}
                    onClick={() => setSelectedType(filter.id)}
                    className={`flex items-center px-4 py-2 rounded-lg border transition-all duration-200 ${
                      selectedType === filter.id
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <IconComponent className="w-4 h-4 mr-2" />
                    {filter.label}
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                      selectedType === filter.id
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {filter.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Search and Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="text-sm text-gray-600">
              Showing {filteredProducts?.length || 0} of {products?.length || 0} products
            </div>
            <div className="flex items-center gap-2">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
              
              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
              
              {/* View Mode */}
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Products Display */}
        <div className=" rounded-lg shadow-sm p-6 ">
          {/* Products Grid/List */}
          {(filteredProducts?.length || 0) === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <div className="text-gray-400 mb-4">
                <Search className="w-16 h-16 mx-auto mb-4" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600 mb-4">
                {searchQuery ? `No products match "${searchQuery}"` : 'No products available in this category'}
              </p>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Clear Search
                </button>
              )}
            </div>
          ) : (
            <div className={viewMode === 'grid' 
              ? 'grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-6'
              : 'space-y-4'
            }>
              {filteredProducts.map((product) => (
                <div key={product.id} className={viewMode === 'grid' 
                  ? 'bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200'
                  : 'bg-white border border-gray-200 rounded-lg p-4 flex items-center space-x-4 hover:shadow-md transition-shadow duration-200'
                }>
                  {viewMode === 'grid' ? (
                    <>
                      <div className="relative">
                        <img
                          src={product.primary_image_url || 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400'}
                          alt={product.name}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
                            <Heart className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>
                        {product.discount_price && parseFloat(product.discount_price) > 0 && (
                          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
                            -{product.discount_price}$
                          </div>
                        )}
                        <div className="absolute bottom-2 left-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            product.type === 'photography' ? 'bg-green-100 text-green-800' :
                            product.type === 'videography' ? 'bg-blue-100 text-blue-800' :
                            'bg-purple-100 text-purple-800'
                          }`}>
                            {product.type === 'photography' ? 'Photo' : 
                             product.type === 'videography' ? 'Video' : 'Both'}
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{product.brand}</p>
                        <div className="flex items-center mb-3">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`w-4 h-4 ${
                                i < (product.rating || 4) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                              }`} />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600 ml-2">({product.rating || 4.0})</span>
                        </div>
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <span className="text-lg font-bold text-gray-900">${product.price}</span>
                            {product.discount_p && parseFloat(product.discount_p) > 0 && (
                              <span className="text-sm text-gray-500 line-through ml-2">
                                ${(parseFloat(product.price) + parseFloat(product.discount_p)).toFixed(2)}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                            Add to Cart
                          </button>
                          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                            View Details
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex-shrink-0">
                        <img
                          src={product.primary_image_url || 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400'}
                          alt={product.name}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
                            <p className="text-sm text-gray-600 mb-2">{product.brand}</p>
                            <div className="flex items-center mb-2">
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className={`w-4 h-4 ${
                                    i < (product.rating || 4) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                  }`} />
                                ))}
                              </div>
                              <span className="text-sm text-gray-600 ml-2">({product.rating || 4.0})</span>
                              <span className={`ml-4 px-2 py-1 rounded-full text-xs font-medium ${
                                product.type === 'photography' ? 'bg-green-100 text-green-800' :
                                product.type === 'videography' ? 'bg-blue-100 text-blue-800' :
                                'bg-purple-100 text-purple-800'
                              }`}>
                                {product.type === 'photography' ? 'Photo' : 
                                 product.type === 'videography' ? 'Video' : 'Both'}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-gray-900">${product.price}</div>
                            {product.discount_p && parseFloat(product.discount_p) > 0 && (
                              <div className="text-sm text-gray-500 line-through">
                                ${(parseFloat(product.price) + parseFloat(product.discount_p)).toFixed(2)}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex gap-2">
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                              Add to Cart
                            </button>
                            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                              View Details
                            </button>
                          </div>
                          <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                            <Heart className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubCategories;