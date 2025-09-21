

import React, { useState, useEffect, useRef } from 'react';
import { useProductStore } from '../store/productStore';
import { Link } from 'react-router-dom';

const SearchBar = ({ Search, searchQuery, setSearchQuery, handleSearch }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const dropdownRef = useRef(null);
  const { getAllProducts } = useProductStore();

  // Handle search input change
  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.trim().length > 0) {
      const products = getAllProducts();
      const filtered = products.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.brand?.toLowerCase().includes(query.toLowerCase()) ||
        product.category?.toLowerCase().includes(query.toLowerCase()) ||
        product.subcategory?.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 8); // Limit to 8 results
      
      setSearchResults(filtered);
      setShowDropdown(true);
    } else {
      setSearchResults([]);
      setShowDropdown(false);
    }
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
              className="w-full pl-4 pr-12 md:py-3 py-1 border border-gray-300  rounded-full  focus:border-transparent text-sm"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2  text-primary p-2 rounded-full "
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
                    to={`/product/${product.id}`}
                    className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors"
                    onClick={() => setShowDropdown(false)}
                  >
                    <div className="flex-shrink-0 w-12 h-12 mr-3">
                      <img
                        src={product.primary_image_url || 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400'}
                        alt={product.name}
                        className="w-full h-full object-cover rounded-md"
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
                {searchResults.length === 8 && (
                  <div className="p-3 text-center border-t">
                    <button
                      type="submit"
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      onClick={() => setShowDropdown(false)}
                    >
                      View all results →
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* No Results */}
          {showDropdown && searchQuery.trim().length > 0 && searchResults.length === 0 && (
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