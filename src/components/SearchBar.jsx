

import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { productApi } from '../lib/productApi';

const normalizeProductsResponse = (response) => {
  if (response?.success) {
    if (Array.isArray(response.data)) return response.data;
    if (Array.isArray(response.products)) return response.products;
    if (Array.isArray(response.latest_products)) return response.latest_products;
  }

  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.data)) return response.data;

  return [];
};

const isActiveProduct = (product) =>
  product?.status === 'active' || product?.is_active === 1 || product?.is_active === '1';

const getProductImageSrc = (product, apiBaseUrl) => {
  const imagePath = product?.primary_image_url;

  if (!imagePath) return '';
  if (imagePath.startsWith('http')) return imagePath;

  const normalizedPath = imagePath.includes('/uploads/')
    ? imagePath.slice(imagePath.indexOf('/uploads/'))
    : imagePath.startsWith('/')
      ? imagePath
      : `/${imagePath}`;

  return `${apiBaseUrl}/products/file.php?path=${encodeURIComponent(normalizedPath)}`;
};

const SearchBar = ({ Search, searchQuery, setSearchQuery, handleSearch }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const dropdownRef = useRef(null);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost/api';

  useEffect(() => {
    let isMounted = true;

    const fetchAllProducts = async () => {
      setIsLoadingProducts(true);

      try {
        const response = await productApi.getProducts({ limit: 5000 });
        const products = normalizeProductsResponse(response).filter(isActiveProduct);

        if (isMounted) {
          setAllProducts(products);
        }
      } catch (error) {
        console.error('Error fetching products for search:', error);
        if (isMounted) {
          setAllProducts([]);
        }
      } finally {
        if (isMounted) {
          setIsLoadingProducts(false);
        }
      }
    };

    fetchAllProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }

    const filtered = allProducts
      .filter((product) =>
        product?.name?.toLowerCase().includes(query) ||
        product?.brand?.toLowerCase().includes(query) ||
        product?.category?.toLowerCase().includes(query) ||
        product?.subcategory?.toLowerCase().includes(query)
      )
      .slice(0, 8);

    setSearchResults(filtered);
    setShowDropdown(true);
  }, [searchQuery, allProducts]);

  // Handle search input change
  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle form submit
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setShowDropdown(false);
    if (handleSearch) {
      handleSearch(e);
    }
  };

  return (
    <>
      <div className="flex flex-1 max-w-2xl mx-2 mb-1 md:mx-8" ref={dropdownRef}>
        
        <form onSubmit={handleFormSubmit} className="w-full relative">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={handleInputChange}
              placeholder="Search for cameras, lenses, accessories..."
              className="w-full ml-1 pl-4 pr-12 md:py-3 py-1.5 focus:outline-none   bg-gray-٢00 rounded-full outline-none border-primary/70 focus:border-primary text-sm"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2   p-2 rounded-full "
            >
              <Search className="size-4" />
            </button>
          </div>
          
          {/* Search Results Dropdown */}
          {showDropdown && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
              <div className="p-2">
                <div className="text-xs text-gray-500 px-3 py-2 border-b">
                  Found {searchResults.length} results
                </div>
                {searchResults.map((product) => (
                  <Link
                    key={product.id}
                    to={`/details/${product.slug}`}
                    state={{ product }}
                    onClick={() => {setShowDropdown(false)}}
                    className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div className="flex-shrink-0 size-12 md:size-20 mr-3">
                      <img
                        src={getProductImageSrc(product, API_BASE_URL)}
                        alt={product.name}
                        className=" rounded-md"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900 truncate">
                        {product.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {product.brand} • ${product.price}
                      </div>
                      <div className="flex items-center mt-1">
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
                  </Link>
                ))}
                {/* {searchResults.length === 8 && (
                  <div className="p-3 text-center border-t">
                    <button
                      type="submit"
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      onClick={() => setShowDropdown(false)}
                    >
                      View all results →
                    </button>
                  </div>
                )} */}
              </div>
            </div>
          )}
          
          {/* No Results */}
          {showDropdown && searchQuery.trim().length > 0 && isLoadingProducts && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              <div className="p-4 text-center text-gray-500">
                <div className="text-sm">Loading products...</div>
              </div>
            </div>
          )}

          {showDropdown && searchQuery.trim().length > 0 && !isLoadingProducts && searchResults.length === 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              <div className="p-4 text-center text-gray-500">
                <Search className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <div className="text-sm">No products found for "{searchQuery}"</div>
              </div>
            </div>
          )}
        </form>
      </div>
    </>
  )
}

export default SearchBar
