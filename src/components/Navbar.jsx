import  { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, User, ShoppingCart, Menu, X, Heart, ChevronDown, ChevronsRight } from 'lucide-react';
import { useCategoryStore } from '../store/categoryStore';

import TopBar from './TopBar';
import NavigationMenu from './NavigationMenu';
import IconsNav from './IconsNav';



const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [hoverTimeout, setHoverTimeout] = useState(null);
  const { categories, fetchCategories, searchCategories, loading  } = useCategoryStore();

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
    // Update device type
   
  };

  return (
    <nav className=" container mx-auto lg:px-8 px-2 px-1  max-w-7xl bg-gray-50  sticky top-0 z-50">
      {/* Top Bar */}
     <TopBar categories={categories}  Menu={Menu} X={X} toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} Link={Link} Search={Search} searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleSearch={handleSearch}  />

      {/* NavigationMenu */}
     <NavigationMenu API_BASE_URL={API_BASE_URL} Link={Link} categories={categories}  loading={loading} hoveredCategory={hoveredCategory} handleCategoryHover={handleCategoryHover} handleCategoryLeave={handleCategoryLeave} handleDropdownEnter={handleDropdownEnter} handleDropdownLeave={handleDropdownLeave} />

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden  border-t">
          <div className="px-4 py-2">
            
            
            {/* Mobile Navigation */}
            <div className="space-y-2">
              {/* Categories */}
              {loading ? (
                <div className="text-gray-600 text-sm py-2">Loading categories...</div>
              ) : (
                categories.map((category) => (
                  <div key={category.id} className="border-b border-gray-100 last:border-b-0">
                    <Link
                      to={`/${category.slug.toLowerCase()}`}
                      state={{ category: category, categoryName: category.name}}
                      onClick={() => {
                        setIsMenuOpen(false);
                        toggleMenu();
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className=" py-3 text-gray-700 hover:text-primary font-medium transition-colors text-sm uppercase flex items-center justify-between"
                    >
                      {category.name}
                      <ChevronsRight className="h-4 w-4" />
                    </Link>
                    
                    {/* Mobile Subcategories */}
                    {category.subcategories && (<></>
                      // <div className="pl-4 pb-2 space-y-1">
                      //   {category.subcategories.length > 0 ? (
                      //     <>
                          
                      //       {category.subcategories.filter(sub => sub.type === 'photography').length > 0 && (
                      //         <div className="mb-3">
                      //           <h5 className="text-xs font-semibold text-gray-500 mb-1 uppercase">Photography</h5>
                      //           {category.subcategories
                      //             .filter(sub => sub.type === 'photography')
                      //             .map((subcategory) => (
                      //               <a
                      //                 key={`both-${subcategory.id}`}
                      //                 href={`#subcategory-${subcategory.id}`}
                      //                 className="flex items-center gap-2 px-2 py-1 text-sm text-gray-600 hover:text-primary hover:bg-blue-50 rounded transition-colors"
                      //               >
                      //                 {subcategory.image_url && (
                      //                   <img 
                      //                     src={subcategory.image_url.startsWith('http') ? subcategory.image_url : `${API_BASE_URL}/${subcategory.image_url}`} 
                      //                     alt={subcategory.name}
                      //                     className="w-8 h-8 rounded-full mr-2"
                      //                     onError={(e) => {
                      //                       e.target.style.display = 'none';
                      //                     }}
                      //                   />
                      //                 )}
                      //                 <span>
                      //                   {subcategory.name}
                      //                   {subcategory.product_count > 0 && (
                      //                     <span className="text-xs text-gray-400 ml-1">({subcategory.product_count})</span>
                      //                   )}
                      //                 </span>
                      //               </a>
                      //             ))
                      //           }
                      //         </div>
                      //       )}
                            
                      //       {/* Videography Section */}
                      //       {category.subcategories.filter(sub => sub.type === 'videography').length > 0 && (
                      //         <div className="mb-3">
                      //           <h5 className="text-xs font-semibold text-gray-500 mb-1 uppercase">Videography</h5>
                      //           {category.subcategories
                      //             .filter(sub => sub.type === 'videography')
                      //             .map((subcategory) => (
                      //               <a
                      //                 key={`both-${subcategory.id}`}
                      //                 href={`#subcategory-${subcategory.id}`}
                      //                 className="flex items-center gap-2 px-2 py-1 text-sm text-gray-600 hover:text-primary hover:bg-blue-50 rounded transition-colors"
                      //               >
                      //                 {subcategory.image_url && (
                      //                   <img 
                      //                     src={subcategory.image_url.startsWith('http') ? subcategory.image_url : `${API_BASE_URL}/${subcategory.image_url}`} 
                      //                     alt={subcategory.name}
                      //                     className="w-8 h-8 rounded-full mr-2"
                      //                     onError={(e) => {
                      //                       e.target.style.display = 'none';
                      //                     }}
                      //                   />
                      //                 )}
                      //                 <span>
                      //                   {subcategory.name}
                      //                   {subcategory.product_count > 0 && (
                      //                     <span className="text-xs text-gray-400 ml-1">({subcategory.product_count})</span>
                      //                   )}
                      //                 </span>
                      //               </a>
                      //             ))
                      //           }
                      //         </div>
                      //       )}
                            
                      //       {/* Both Section */}
                      //       {category.subcategories.filter(sub => sub.type === 'both').length > 0 && (
                      //         <div>
                      //           <h5 className="text-xs font-semibold text-gray-500 mb-1 uppercase">Both</h5>
                      //           {category.subcategories
                      //             .filter(sub => sub.type === 'both')
                      //             .map((subcategory) => (
                      //               <a
                      //                 key={`both-${subcategory.id}`}
                      //                 href={`#subcategory-${subcategory.id}`}
                      //                 className="flex items-center gap-2 px-2 py-1 text-sm text-gray-600 hover:text-primary hover:bg-blue-50 rounded transition-colors"
                      //               >
                      //                 {subcategory.image_url && (
                      //                   <img 
                      //                     src={subcategory.image_url.startsWith('http') ? subcategory.image_url : `${API_BASE_URL}/${subcategory.image_url}`} 
                      //                     alt={subcategory.name}
                      //                     className="w-8 h-8 rounded-full mr-2"
                      //                     onError={(e) => {
                      //                       e.target.style.display = 'none';
                      //                     }}
                      //                   />
                      //                 )}
                      //                 <span>
                      //                   {subcategory.name}
                      //                   {subcategory.product_count > 0 && (
                      //                     <span className="text-xs text-gray-400 ml-1">({subcategory.product_count})</span>
                      //                   )}
                      //                 </span>
                      //               </a>
                      //             ))
                      //           }
                      //         </div>
                      //       )}
                      //     </>
                      //   ) : (
                      //     <div className="text-xs text-gray-500 py-1">No subcategories available</div>
                      //   )}
                      // </div>
                    )}
                  </div>
                ))
              )}
             
            </div>
            
            {/* Mobile Icons */}
            <div className="flex items-center space-x-4 mt-4 pt-4 border-t">
             <IconsNav Link={Link} device="mobile" />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;