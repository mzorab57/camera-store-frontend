import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, User, ShoppingCart, Menu, X, Heart, ChevronDown } from 'lucide-react';
import { useCategoryStore } from '../store/categoryStore';


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [hoverTimeout, setHoverTimeout] = useState(null);
  const { categories, fetchCategories, searchCategories, loading } = useCategoryStore();

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost/api';

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleCategoryHover = (category) => {
    // Clear any existing timeout
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    setHoveredCategory(category.id);
  };

  const handleCategoryLeave = () => {
    // Add delay before hiding dropdown
    const timeout = setTimeout(() => {
      setHoveredCategory(null);
    }, 300);
    setHoverTimeout(timeout);
  };

  const handleDropdownEnter = () => {
    // Clear timeout when entering dropdown
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
  };

  const handleDropdownLeave = () => {
    // Hide dropdown immediately when leaving
    setHoveredCategory(null);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
      }
    };
  }, [hoverTimeout]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      searchCategories(searchQuery);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <div className="bg-gradient-to-r from-blue-600 to-orange-500 text-white px-3 py-2 rounded">
                <span className="font-bold text-lg">CAMERA</span>
                <span className="font-normal text-sm block leading-none">STORE</span>
              </div>
            </Link>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search For STUDIO & PRODUCTION"
                  className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
                >
                  <Search className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div>

          {/* Right Icons */}
          <div className="hidden md:flex items-center space-x-6">
            <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors">
              <Heart className="h-5 w-5" />
              <span className="text-sm font-medium">WISHLIST</span>
            </button>
            <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="text-sm font-medium">MY CART</span>
            </button>
            <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors">
              <User className="h-5 w-5" />
              <span className="text-sm font-medium">LOGIN</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="hidden md:flex items-center justify-between py-3">
            {/* Main Navigation Links */}
            {/* <div className="flex items-center space-x-6">
              <Link to="/" className="text-white hover:text-blue-200 font-medium text-sm transition-colors px-3 py-2 rounded">
                Home
              </Link>
              <Link to="/products" className="text-white hover:text-blue-200 font-medium text-sm transition-colors px-3 py-2 rounded">
                Products
              </Link>
              <Link to="/about" className="text-white hover:text-blue-200 font-medium text-sm transition-colors px-3 py-2 rounded">
                About
              </Link>
              <Link to="/contact" className="text-white hover:text-blue-200 font-medium text-sm transition-colors px-3 py-2 rounded">
                Contact
              </Link>
            </div> */}
            
            {/* Categories */}
            <div className="flex items-center space-x-4 relative">
             {loading ? (
               <div className="text-white text-sm">Loading categories...</div>
            ) : (
              categories.map((category) => (
                <div
                  key={category.id}
                  className="relative group"
                  onMouseEnter={() => handleCategoryHover(category)}
                  onMouseLeave={handleCategoryLeave}
                >
                  <Link
                    to={`/${category.slug.toLowerCase()}`}
                    state={{ category: category, categoryName: category.name}}
                    className="text-white hover:text-blue-200 w-32 font-medium text-xs transition-colors px-2 py-1 rounded uppercase flex items-center gap-1"
                  >
                    {category.name}
                    <ChevronDown className="h-3 w-8" />
                  </Link>
                  
                  {/* Dropdown Menu */}
                  {hoveredCategory === category.id && category.subcategories && (
                    <div 
                      className="absolute top-full left-0 mt-1 bg-white shadow-xl rounded-lg border whitespace-nowrap z-50 animate-in fade-in-0 zoom-in-95 duration-200"
                      onMouseEnter={handleDropdownEnter}
                      onMouseLeave={handleDropdownLeave}
                    >
                      <div className="py-2">
                        {category.subcategories.length > 0 ? (
                          <div className='flex w-full justify-between'>

                            {/* Photography Section */}
                            {category.subcategories.filter(sub => sub.type === 'photography').length > 0 && (
                              <div className="px-4 py-2">
                                <h4 className="text-sm font-semibold text-gray-800 mb-2 uppercase">Photography</h4>
                                {category.subcategories
                                  .filter(sub => sub.type === 'photography')
                                  .map((subcategory) => (
                                    <Link
                                      key={`photo-${subcategory.id}`}
                                      to={`/${category.slug.toLowerCase()}/${subcategory.type.toLowerCase()}/${subcategory.slug.toLowerCase()}`}
                                      state={{ subCategories: category.subcategories }}
                                      className="block px-2 py-1 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                    >
                                      {subcategory.image_url && (
                                        <img 
                                          src={subcategory.image_url.startsWith('http') ? subcategory.image_url : `${API_BASE_URL}/${subcategory.image_url}`} 
                                          alt={subcategory.name} 
                                          className="w-8 h-8 rounded-full mr-2" 
                                          onError={(e) => {
                                            e.target.style.display = 'none';
                                          }}
                                        />
                                      )}
                                      {subcategory.name}
                                      {subcategory.product_count > 0 && (
                                        <span className="text-xs text-gray-400 ml-1">({subcategory.product_count})</span>
                                      )}
                                    </Link>
                                  ))
                                }
                              </div>
                            )}
                            
                            {/* Videography Section */}
                            {category.subcategories.filter(sub => sub.type === 'videography').length > 0 && (
                              <div className="px-4 py-2 border-t border-gray-100">
                                <h4 className="text-sm font-semibold text-gray-800 mb-2 uppercase">Videography</h4>
                                {category.subcategories
                                  .filter(sub => sub.type === 'videography')
                                  .map((subcategory) => (
                                    <Link
                                      key={`video-${subcategory.id}`}
                                      to={`/${category.slug.toLowerCase()}/${subcategory.type.toLowerCase()}/${subcategory.slug.toLowerCase()}`}
                                       state={{ subCategories: category.subcategories }}
                                      className="block px-2 py-1 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                    >
                                      {subcategory.image_url && (
                                        <img 
                                          src={subcategory.image_url.startsWith('http') ? subcategory.image_url : `${API_BASE_URL}/${subcategory.image_url}`} 
                                          alt={subcategory.name} 
                                          className="w-8 h-8 rounded-full mr-2" 
                                          onError={(e) => {
                                            e.target.style.display = 'none';
                                          }}
                                        />
                                      )}
                                      {subcategory.name}
                                      {subcategory.product_count > 0 && (
                                        <span className="text-xs text-gray-400 ml-1">({subcategory.product_count})</span>
                                      )}
                                    </Link>
                                  ))
                                }
                              </div>
                            )}

                            {/* Both Section */}
                            {category.subcategories.filter(sub => sub.type === 'both').length > 0 && (
                              <div className="px-4 py-2 border-t border-gray-100">
                                <h4 className="text-sm font-semibold text-gray-800 mb-2 uppercase">Both</h4>
                                {category.subcategories
                                  .filter(sub => sub.type === 'both')
                                  .map((subcategory) => (
                                    <Link
                                      key={`both-${subcategory.id}`}
                                      to={`/${category.slug.toLowerCase()}/${subcategory.type.toLowerCase()}/${subcategory.slug.toLowerCase()}`}
                                      state={{ subCategories: category.subcategories }}
                                      className="flex items-center gap-2 px-2 py-1 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                    >
                                      {subcategory.image_url && (
                                        <img 
                                          src={subcategory.image_url.startsWith('http') ? subcategory.image_url : `${API_BASE_URL}/${subcategory.image_url}`} 
                                          alt={subcategory.name}
                                          className="w-8 h-8 rounded-full mr-2"
                                          onError={(e) => {
                                            e.target.style.display = 'none';
                                          }}
                                        />
                                      )}
                                      <span>
                                        {subcategory.name}
                                        {subcategory.product_count > 0 && (
                                          <span className="text-xs text-gray-400 ml-1">({subcategory.product_count})</span>
                                        )}
                                      </span>
                                    </Link>
                                  ))
                                }
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="px-4 py-2 text-sm text-gray-500">No subcategories available</div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
            </div>
            
            {/* Additional static menu items */}
            <div className="flex items-center space-x-4">
            <a
              href="#top-brands"
              className="text-white hover:text-blue-200 font-medium text-xs transition-colors px-2 py-1 rounded"
            >
              TOP BRANDS
            </a>
            <a
              href="#best-sellers"
              className="text-white hover:text-blue-200 font-medium text-xs transition-colors px-2 py-1 rounded"
            >
              BEST SELLERS
            </a>
            <a
              href="#offers"
              className="text-white hover:text-blue-200 font-medium text-xs transition-colors px-2 py-1 rounded"
            >
              OFFERS
            </a>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-2">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search For STUDIO & PRODUCTION"
                  className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-600"
                >
                  <Search className="h-5 w-5" />
                </button>
              </div>
            </form>
            
            {/* Mobile Navigation */}
            <div className="space-y-2">
              {/* Main Navigation Links */}
              <Link to="/" className="block py-3 text-gray-700 hover:text-blue-600 font-medium transition-colors text-sm border-b border-gray-100">
                Home
              </Link>
              <Link to="/products" className="block py-3 text-gray-700 hover:text-blue-600 font-medium transition-colors text-sm border-b border-gray-100">
                Products
              </Link>
              <Link to="/about" className="block py-3 text-gray-700 hover:text-blue-600 font-medium transition-colors text-sm border-b border-gray-100">
                About
              </Link>
              <Link to="/contact" className="block py-3 text-gray-700 hover:text-blue-600 font-medium transition-colors text-sm border-b border-gray-100">
                Contact
              </Link>
              
              {/* Categories */}
              {loading ? (
                <div className="text-gray-600 text-sm py-2">Loading categories...</div>
              ) : (
                categories.map((category) => (
                  <div key={category.id} className="border-b border-gray-100 last:border-b-0">
                    <Link
                      to={`/category/${category.name.toLowerCase()}`}
                      className=" py-3 text-gray-700 hover:text-blue-600 font-medium transition-colors text-sm uppercase flex items-center justify-between"
                      onClick={(e) => {
                        e.preventDefault();
                        // Toggle category visibility in mobile
                      }}
                    >
                      {category.name}
                      <ChevronDown className="h-4 w-4" />
                    </Link>
                    
                    {/* Mobile Subcategories */}
                    {category.subcategories && (
                      <div className="pl-4 pb-2 space-y-1">
                        {category.subcategories.length > 0 ? (
                          <>
                            {/* Photography Section */}
                            {category.subcategories.filter(sub => sub.type === 'photography').length > 0 && (
                              <div className="mb-3">
                                <h5 className="text-xs font-semibold text-gray-500 mb-1 uppercase">Photography</h5>
                                {category.subcategories
                                  .filter(sub => sub.type === 'photography')
                                  .map((subcategory) => (
                                    <a
                                      key={`both-${subcategory.id}`}
                                      href={`#subcategory-${subcategory.id}`}
                                      className="flex items-center gap-2 px-2 py-1 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                    >
                                      {subcategory.image_url && (
                                        <img 
                                          src={subcategory.image_url.startsWith('http') ? subcategory.image_url : `${API_BASE_URL}/${subcategory.image_url}`} 
                                          alt={subcategory.name}
                                          className="w-8 h-8 rounded-full mr-2"
                                          onError={(e) => {
                                            e.target.style.display = 'none';
                                          }}
                                        />
                                      )}
                                      <span>
                                        {subcategory.name}
                                        {subcategory.product_count > 0 && (
                                          <span className="text-xs text-gray-400 ml-1">({subcategory.product_count})</span>
                                        )}
                                      </span>
                                    </a>
                                  ))
                                }
                              </div>
                            )}
                            
                            {/* Videography Section */}
                            {category.subcategories.filter(sub => sub.type === 'videography').length > 0 && (
                              <div className="mb-3">
                                <h5 className="text-xs font-semibold text-gray-500 mb-1 uppercase">Videography</h5>
                                {category.subcategories
                                  .filter(sub => sub.type === 'videography')
                                  .map((subcategory) => (
                                    <a
                                      key={`both-${subcategory.id}`}
                                      href={`#subcategory-${subcategory.id}`}
                                      className="flex items-center gap-2 px-2 py-1 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                    >
                                      {subcategory.image_url && (
                                        <img 
                                          src={subcategory.image_url.startsWith('http') ? subcategory.image_url : `${API_BASE_URL}/${subcategory.image_url}`} 
                                          alt={subcategory.name}
                                          className="w-8 h-8 rounded-full mr-2"
                                          onError={(e) => {
                                            e.target.style.display = 'none';
                                          }}
                                        />
                                      )}
                                      <span>
                                        {subcategory.name}
                                        {subcategory.product_count > 0 && (
                                          <span className="text-xs text-gray-400 ml-1">({subcategory.product_count})</span>
                                        )}
                                      </span>
                                    </a>
                                  ))
                                }
                              </div>
                            )}
                            
                            {/* Both Section */}
                            {category.subcategories.filter(sub => sub.type === 'both').length > 0 && (
                              <div>
                                <h5 className="text-xs font-semibold text-gray-500 mb-1 uppercase">Both</h5>
                                {category.subcategories
                                  .filter(sub => sub.type === 'both')
                                  .map((subcategory) => (
                                    <a
                                      key={`both-${subcategory.id}`}
                                      href={`#subcategory-${subcategory.id}`}
                                      className="flex items-center gap-2 px-2 py-1 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                    >
                                      {subcategory.image_url && (
                                        <img 
                                          src={subcategory.image_url.startsWith('http') ? subcategory.image_url : `${API_BASE_URL}/${subcategory.image_url}`} 
                                          alt={subcategory.name}
                                          className="w-8 h-8 rounded-full mr-2"
                                          onError={(e) => {
                                            e.target.style.display = 'none';
                                          }}
                                        />
                                      )}
                                      <span>
                                        {subcategory.name}
                                        {subcategory.product_count > 0 && (
                                          <span className="text-xs text-gray-400 ml-1">({subcategory.product_count})</span>
                                        )}
                                      </span>
                                    </a>
                                  ))
                                }
                              </div>
                            )}
                          </>
                        ) : (
                          <div className="text-xs text-gray-500 py-1">No subcategories available</div>
                        )}
                      </div>
                    )}
                  </div>
                ))
              )}
              <a
                href="#top-brands"
                className="block py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors text-sm"
              >
                TOP BRANDS
              </a>
              <a
                href="#best-sellers"
                className="block py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors text-sm"
              >
                BEST SELLERS
              </a>
              <a
                href="#offers"
                className="block py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors text-sm"
              >
                OFFERS
              </a>
            </div>
            
            {/* Mobile Icons */}
            <div className="flex items-center space-x-4 mt-4 pt-4 border-t">
              <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                <Heart className="h-5 w-5" />
                <span>Wishlist</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                <ShoppingCart className="h-5 w-5" />
                <span>Cart</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                <User className="h-5 w-5" />
                <span>Login</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;