import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Search, User, ShoppingCart, Menu, X, Heart,
  ChevronDown, ChevronRight, ChevronsRight,
  Package, Tag, Info, Phone, Layers,
  Facebook, Instagram, Twitter, Youtube, Mail
} from 'lucide-react';
import { useCategoryStore } from '../store/categoryStore';
import { PiTiktokLogo } from "react-icons/pi";

import TopBar from './TopBar';
import NavigationMenu from './NavigationMenu';
import IconsNav from './IconsNav';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [hoverTimeout, setHoverTimeout] = useState(null);
  const [isProductOpen, setIsProductOpen] = useState(false);
  const { categories, fetchCategories, searchCategories, loading } = useCategoryStore();

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost/api';

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleCategoryHover = (category) => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    setHoveredCategory(category.id);
  };

  const handleCategoryLeave = () => {
    const timeout = setTimeout(() => {
      setHoveredCategory(null);
    }, 300);
    setHoverTimeout(timeout);
  };

  const handleDropdownEnter = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
  };

  const handleDropdownLeave = () => {
    setHoveredCategory(null);
  };

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
    if (isMenuOpen) {
      setIsProductOpen(false);
    }
  };

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, url: 'https://www.facebook.com/share/1CDgbwViau/', color: 'hover:bg-blue-600' },
    { name: 'Instagram', icon: Instagram, url: 'https://www.instagram.com/adnan_.shop?igsh=OTZwN2xkYjg1ZWU3', color: 'hover:bg-pink-600' },
    { name: 'Tiktok', icon: PiTiktokLogo, url: 'https://www.tiktok.com/@adnan.shopp?_t=ZS-901W20m0Q4d&_r=1', color: 'hover:bg-red-600' },
  ];

  return (
    <div className="w-full bg-gradient-to-b from-secondary  to-primary   ">
      <nav className="container mx-auto  max-w-7xl sticky top-0 z-50">
        {/* Top Bar */}
        <TopBar
          categories={categories}
          Menu={Menu}
          X={X}
          toggleMenu={toggleMenu}
          isMenuOpen={isMenuOpen}
          Link={Link}
          Search={Search}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
        />

        {/* NavigationMenu */}
        <NavigationMenu
          API_BASE_URL={API_BASE_URL}
          Link={Link}
          categories={categories}
          loading={loading}
          hoveredCategory={hoveredCategory}
          handleCategoryHover={handleCategoryHover}
          handleCategoryLeave={handleCategoryLeave}
          handleDropdownEnter={handleDropdownEnter}
          handleDropdownLeave={handleDropdownLeave}
        />

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div
            className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={toggleMenu}
          />
        )}

        {/* Mobile Menu Slide Panel */}
        <div
          className={`md:hidden fixed top-0 right-0 h-full w-[85%] max-w-sm bg-white z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto shadow-2xl ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Menu Header */}
          <div className="flex items-center justify-between p-5 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
            <div className="flex items-center gap-3">
             <img src="/logo.png" alt="logo" className='w-32' />
              
            </div>
            <button
              onClick={toggleMenu}
              className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            >
              <X className="h-5 w-5 text-gray-700" />
            </button>
          </div>

         

          {/* Navigation Items */}
          <div className="px-4 pb-4">
            {/* Products Section (Expandable) */}
            <div className="mb-2">
              <button
                onClick={() => setIsProductOpen(!isProductOpen)}
                className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-300 group ${
                  isProductOpen
                    ? 'bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200'
                    : 'bg-gray-50 hover:bg-gray-100 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                      isProductOpen
                        ? 'bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-amber-500/30'
                        : 'bg-white border border-gray-200 group-hover:border-amber-300'
                    }`}
                  >
                    <Package
                      className={`h-5 w-5 transition-colors ${
                        isProductOpen ? 'text-white' : 'text-gray-600'
                      }`}
                    />
                  </div>
                  <div className="text-left">
                    <span
                      className={`font-semibold text-sm block transition-colors ${
                        isProductOpen ? 'text-amber-600' : 'text-gray-900'
                      }`}
                    >
                      Products
                    </span>
                    <span className="text-xs text-gray-500">
                      {categories.length} categories
                    </span>
                  </div>
                </div>
                <ChevronDown
                  className={`h-5 w-5 transition-all duration-300 ${
                    isProductOpen
                      ? 'text-amber-600 rotate-180'
                      : 'text-gray-400'
                  }`}
                />
              </button>

              {/* Categories Dropdown */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  isProductOpen ? 'max-h-[600px] opacity-100 mt-2' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="bg-gray-50 rounded-2xl border border-gray-200 p-2 space-y-1">
                  {loading ? (
                    <div className="flex items-center justify-center py-8">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-8 h-8 border-2 border-amber-200 border-t-amber-500 rounded-full animate-spin" />
                        <span className="text-gray-600 text-xs">Loading...</span>
                      </div>
                    </div>
                  ) : (
                    categories.map((category, index) => (
                      <Link
                        key={category.id}
                        to={`/${category.slug.toLowerCase()}`}
                        state={{
                          category: category,
                          categoryName: category.name,
                        }}
                        onClick={() => {
                          setIsMenuOpen(false);
                          setIsProductOpen(false);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-white hover:shadow-sm transition-all duration-200 group/item border border-transparent hover:border-gray-200"
                        style={{
                          animationDelay: `${index * 50}ms`,
                          animation: isProductOpen
                            ? `fadeSlideIn 0.3s ease forwards ${index * 50}ms`
                            : 'none',
                        }}
                      >
                        {/* Category Icon/Number */}
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-xs font-bold text-amber-600 group-hover/item:from-amber-100 group-hover/item:to-orange-100 transition-all shrink-0">
                          {index + 1}
                        </div>

                        <div className="flex-1 min-w-0">
                          <span className="text-gray-700 text-sm font-medium group-hover/item:text-gray-900 transition-colors block truncate">
                            {category.name}
                          </span>
                        </div>

                        <ChevronRight className="h-4 w-4 text-gray-400 group-hover/item:text-amber-500 group-hover/item:translate-x-1 transition-all shrink-0" />
                      </Link>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Brand */}
            <Link
            
              to="/brands"
              onClick={() => {
                setIsMenuOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-3 p-4 mb-2 rounded-2xl bg-gray-50 hover:bg-white border border-transparent hover:border-gray-200 hover:shadow-sm transition-all duration-300 group"
            >
              <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 group-hover:bg-gradient-to-br group-hover:from-purple-500 group-hover:to-indigo-500 group-hover:border-transparent flex items-center justify-center transition-all duration-300 group-hover:shadow-lg group-hover:shadow-purple-500/30">
                <Tag className="h-5 w-5 text-gray-600 group-hover:text-white transition-colors" />
              </div>
              <div className="flex-1">
                <span className="text-gray-900 font-semibold text-sm group-hover:text-gray-900 transition-colors block">
                  Brands
                </span>
                <span className="text-xs text-gray-500">Top brands we carry</span>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-purple-500 group-hover:translate-x-1 transition-all" />
            </Link>

            {/* About */}
            <Link
              to="/about"
              onClick={() => {
                setIsMenuOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-3 p-4 mb-2 rounded-2xl bg-gray-50 hover:bg-white border border-transparent hover:border-gray-200 hover:shadow-sm transition-all duration-300 group"
            >
              <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 group-hover:bg-gradient-to-br group-hover:from-emerald-500 group-hover:to-teal-500 group-hover:border-transparent flex items-center justify-center transition-all duration-300 group-hover:shadow-lg group-hover:shadow-emerald-500/30">
                <Info className="h-5 w-5 text-gray-600 group-hover:text-white transition-colors" />
              </div>
              <div className="flex-1">
                <span className="text-gray-900 font-semibold text-sm group-hover:text-gray-900 transition-colors block">
                  About Us
                </span>
                <span className="text-xs text-gray-500">Our story & mission</span>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
            </Link>

            {/* Contact */}
            <Link
              to="/contact"
              onClick={() => {
                setIsMenuOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-3 p-4 mb-2 rounded-2xl bg-gray-50 hover:bg-white border border-transparent hover:border-gray-200 hover:shadow-sm transition-all duration-300 group"
            >
              <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 group-hover:bg-gradient-to-br group-hover:from-blue-500 group-hover:to-cyan-500 group-hover:border-transparent flex items-center justify-center transition-all duration-300 group-hover:shadow-lg group-hover:shadow-blue-500/30">
                <Phone className="h-5 w-5 text-gray-600 group-hover:text-white transition-colors" />
              </div>
              <div className="flex-1">
                <span className="text-gray-900 font-semibold text-sm group-hover:text-gray-900 transition-colors block">
                  Contact
                </span>
                <span className="text-xs text-gray-500">Get in touch with us</span>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
            </Link>
          </div>

          {/* Divider */}
          <div className="mx-5 border-t border-gray-200" />

          {/* Social Links Section */}
          <div className="px-5 py-5 bg-gradient-to-b from-white to-gray-50">
            <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-3">
              Follow Us
            </p>
            <div className="grid grid-cols-4 gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex flex-col items-center justify-center gap-2 py-3 rounded-xl bg-white border border-gray-200 hover:border-transparent transition-all duration-300 group ${social.color}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <social.icon className="h-5 w-5 text-gray-600 group-hover:text-white transition-colors" />
                  <span className="text-[10px] text-gray-600 group-hover:text-white font-medium transition-colors">
                    {social.name}
                  </span>
                </a>
              ))}
            </div>

          </div>

        
        </div>

        {/* CSS Animation for category items */}
        <style>{`
          @keyframes fadeSlideIn {
            from {
              opacity: 0;
              transform: translateX(-10px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
        `}</style>
      </nav>
    </div>
  );
};

export default Navbar;