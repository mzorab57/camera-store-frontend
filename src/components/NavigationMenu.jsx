


const NavigationMenu = ({API_BASE_URL, Link, categories, loading, hoveredCategory, handleCategoryHover, handleCategoryLeave, handleDropdownEnter, handleDropdownLeave }) => {
  console.log("categories");
  console.log(categories);
  
  return (
        <div className=" bg-primary mx-auto  rounded-tl-xl relative rounded-tr-xl">
          <div className="hidden md:flex  items-center py-1">
          
            {/* Categories */}
            <div className={` grid grid-cols-8 py-2  items-center space-x-1 `} >
             {loading ? (
               <div className="text-white text-sm">Loading categories...</div>
            ) : (
              categories.map((category) => (
                <div
                  key={category.id}
                  className="relative group   "
                  onMouseEnter={() => handleCategoryHover(category)}
                  onMouseLeave={handleCategoryLeave}
                >
                  <Link
                    to={`/${category.slug.toLowerCase()}`}
                    state={{ category: category, categoryName: category.name}}
                    className="text-white  hover:text-blue-200  w-fit  text-xs transition-colors px-1 py-1 rounded uppercase flex items-center "
                  >
                    {category.name}
                  </Link>
                  
                  {/* Dropdown Menu */}
                  {hoveredCategory === category.id && category.subcategories && (
                    <div 
                      className="absolute  top-10 left-0  bg-white shadow-xl  rounded-lg border whitespace-nowrap z-40 animate-in fade-in-0 zoom-in-95 duration-700"
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
                                      to={`/${category.slug}/${subcategory.type}/${subcategory.slug}`}
                                      state={{ products:subcategory.products }}
                                      className="flex items-center px-2 py-1 text-sm text-gray-600 hover:text-primary hover:bg-blue-50 rounded transition-colors"
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
                                       to={`/${category.slug}/${subcategory.type}/${subcategory.slug}`}
                                      state={{ products:subcategory.products }}
                                      className="flex items-center px-2 py-1 text-sm text-gray-600 hover:text-primary hover:bg-blue-50 rounded transition-colors"
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
                                       to={`/${category.slug}/${subcategory.type}/${subcategory.slug}`}
                                       state={{ products:subcategory.products }}
                                      className="flex items-center gap-2 px-2 py-1 text-sm text-gray-600 hover:text-primary hover:bg-blue-50 rounded transition-colors"
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
            
            
          </div>
        </div>
     
  )
}

export default NavigationMenu