import React, { useState, useEffect } from 'react';
import { useLocation, useParams, Link, useNavigate } from 'react-router-dom';
import { useProductStore } from '../store/productStore';
import { Filter, Grid, List, Search, Star, Heart, ShoppingCart, Camera, Video, Image } from 'lucide-react';
import { subcategoryApi } from '../lib/categoryApi';
import { productApi } from '../lib/productApi';


const SubCategories = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { categoryName, subcategoryType, subcategoryName } = useParams();
  const initialProducts = (location.state && location.state.products) ? location.state.products : [];
  const [productList, setProductList] = useState(initialProducts);
  const [pageLoading, setPageLoading] = useState(false);
  const [pageError, setPageError] = useState(null);
  console.log("productList");
  console.log(productList);
  

  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost/api";
    
    const handleProductClick = (product ) => {
      navigate(`/details/${product.slug}`, { state: { product } });
    };
    
  
  const { 
    loading, 
    videoLoading, 
    photoLoading, 
    error, 
    videoError, 
    photoError, 
  } = useProductStore();
  
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedType, setSelectedType] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const isLoading = pageLoading || loading || videoLoading || photoLoading;
  const hasError = pageError || error || videoError || photoError;

  useEffect(() => {
    let isMounted = true;
    const fetchFullSubcategoryProducts = async () => {
      setPageLoading(true);
      setPageError(null);
      try {
        const res = await subcategoryApi.getSubcategoriesWithProducts({
          categorySlug: categoryName,
          perSubcatLimit: 2000,
        });
        const subcategories = res.subcategories || res.data?.subcategories || [];
        const current = subcategories.find(
          (s) => s.slug === subcategoryName
        );
        if (isMounted && current) {
          try {
            const productsRes = await productApi.getProducts({
              subcategory_id: current.id,
              limit: 1000,
              is_active: 1,
            });
            const arr = productsRes?.data || [];
            setProductList(arr);
          } catch {
            setProductList(current.products || []);
          }
        } else if (isMounted && initialProducts.length > 0) {
          setProductList(initialProducts);
        } else if (isMounted) {
          setProductList([]);
        }
      } catch (e) {
        if (isMounted) {
          setPageError(e.message || 'Failed to load products');
        }
      } finally {
        if (isMounted) setPageLoading(false);
      }
    };
    fetchFullSubcategoryProducts();
    return () => {
      isMounted = false;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryName, subcategoryName]);

  useEffect(() => {
    setSelectedType('all');
    setSearchQuery('');
    setSortBy('name');
  }, [subcategoryName]);

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
  }, [ productList, subcategoryName, selectedType, searchQuery, sortBy]);


  const typeFilters = [
    { id: 'all', label: 'All Products', count: productList?.length || 0, icon: Image },
    { id: 'photography', label: 'Photography', count: productList?.filter(p => p.type === 'photography').length || 0, icon: Camera },
    { id: 'videography', label: 'Videography', count: productList?.filter(p => p.type === 'videography').length || 0, icon: Video },
    { id: 'both', label: 'Both', count: productList?.filter(p => p.type === 'both').length || 0, icon: Star }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
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
          <ol className="inline-flex items-center  md:space-x-3">
            <li className="inline-flex items-center">
              <Link to="/" className="inline-flex items-center scale-75 md:scale-100 text-xs md:text-sm font-medium text-gray-700 hover:text-primary">
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                </svg>
                <span onClick={() => navigate(-1)} className="ml-1 cursor-pointer scale-75 md:scale-100 text-xs md:text-sm font-medium text-gray-700 hover:text-primary md:ml-2">
                  {categoryName}
                </span>
              </div>
            </li>

             <li>
              <div className="flex items-center">
                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                </svg>
                <Link  className="ml-1 text-xs scale-75 md:scale-100  md:text-smace-nowrap font-medium text-gray-500 pointer-events-none  md:ml-2">
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
                  <span className="ml-1 text-xs scale-75 md:scale-100  md:text-smace-nowrap font-medium text-gray-500 md:ml-2 capitalize">
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
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-6 sm:mb-8">
          {/* Type Filters */}
          <div className="mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Filter by Type</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3">
              {typeFilters.map((filter) => {
                const IconComponent = filter.icon;
                return (
                  <button
                    key={filter.id}
                    onClick={() => setSelectedType(filter.id)}
                    className={`flex items-center justify-center sm:justify-between w-full px-3 sm:px-4 py-2 rounded-lg border transition-all duration-200 text-sm ${
                      selectedType === filter.id
                        ? 'bg-primary text-white border-primary'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <IconComponent className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="truncate">{filter.label}</span>
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs flex-shrink-0 ${
                      selectedType === filter.id
                        ? 'border border-red-300 text-white'
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
          <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4">
            
            <div className="text-xs sm:text-sm text-gray-600 order-2 lg:order-1">
              Showing {filteredProducts?.length || 0} of {productList?.length || 0} products
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-2 order-1 lg:order-2">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-full pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
              
              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 w-full sm:w-48 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
              
              {/* View Mode */}
              <div className="flex w-full sm:w-fit border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`flex-1 sm:flex-none p-2 sm:px-4 flex items-center justify-center ${viewMode === 'grid' ? 'bg-primary text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                >
                  <Grid className="w-4 h-4 sm:mr-2" />
                  <span className="hidden sm:inline text-sm">Grid</span>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`flex-1 sm:flex-none p-2 sm:px-4 flex items-center justify-center ${viewMode === 'list' ? 'bg-primary text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                >
                  <List className="w-4 h-4 sm:mr-2" />
                  <span className="hidden sm:inline text-sm">List</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Products Display */}
        <div className=" rounded-lg shadow-sm   ">
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
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors"
                >
                  Clear Search
                </button>
              )}
            </div>
          ) : (
            <div className={viewMode === 'grid' 
              ? 'grid grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-6'
              : 'space-y-4'
            }>
              {filteredProducts.map((product) => (
                <Link 
                  to={`/details/${product.slug}`}
                  state={{ product }}
                  onClick={()=> window.scrollTo({ top: 0, behavior: 'smooth' })}
                  
                 key={product.id} className={viewMode === 'grid' 
                  ? 'bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200'
                  : 'bg-white border border-gray-200 rounded-lg p-4 flex flex-col lg:flex-row items-center space-x-4 hover:shadow-md transition-shadow duration-200'
                }>
                  {viewMode === 'grid' ? (
                    <>
                      <div className="relative" >
                        <img
                          src={
                                product.primary_image_url &&
                                product.primary_image_url.startsWith("http")
                                  ? product.primary_image_url
                                  : product.primary_image_url
                                  ? `${API_BASE_URL}/${product.primary_image_url}`
                                  : "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400"
                              }
                          alt={product.name}
                                        className="size-44 place-self-center p-2 object-contain group-hover:scale-110 transition-transform duration-300"

                        />
                       
                        {product.discount_price && parseFloat(product.discount_price) > 0 && (
                           <div className="flex items-center justify-between absolute top-0.5 z-10 left-0.5">
    <span className="text-xs text-red-600 bg-red-100 rounded-full px-1 font-light">
      {parseFloat(product.discount_price)}% OFF
    </span>
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
                      <div className="p-4 pb-0 ">
                        <div className='flex justify-between items-center'>
                        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                        {/* <p className="text-sm text-gray-600 mb-2">{product.brand}</p> */}
                        </div>
                        <div className="flex flex-col md:flex-row justify-between md:items-center mb-1">
                          <div className="flex  items-center">
                            {/* {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`w-4 h-4 ${
                                i < (product.rating || 4) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                              }`} />
                            ))} 
                            <span className="text-sm text-gray-600 ml-2">({product.rating || 4.0})</span>*/}
                          </div>
                           <span className="text-lg font-bold text-gray-900">${product.price}  </span>
                           
                        </div>
                        <div className="flex items-center justify-between mb-4">
                          <div>
                           
                            {product.discount_price && parseFloat(product.discount_price) > 0 && (
                              <span className="text-sm text-gray-500 line-through ">
                                ${(parseFloat(product.price) + parseFloat(product.discount_price)).toFixed(2)}
                              </span>
                            )}
                          </div>
                        </div>
                      
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex-shrink-0 ">
                        <img
                          src={
                                product.primary_image_url &&
                                product.primary_image_url.startsWith("http")
                                  ? product.primary_image_url
                                  : product.primary_image_url
                                  ? `${API_BASE_URL}/${product.primary_image_url}`
                                  : "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400"
                              }
                          alt={product.name}
                          className="size-28 object-contain group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex-1 min-w-0 ">
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
                            {product.discount_price && parseFloat(product.discount_price) > 0 && (
                              <div className="text-sm text-gray-500 line-through">
                                ${(parseFloat(product.price) + parseFloat(product.discount_price)).toFixed(2)}
                              </div>
                            )}
                          </div>
                        </div>
                       
                      </div>
                    </>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubCategories;
