import React from "react";
import { Link, useLocation } from "react-router-dom";


const Categories = () => {
  const location = useLocation();
  const { category, categoryName } = location.state || {};

  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost/api";
  return (
    <div className="container mx-auto max-w-7xl px-8 w-full min-h-full">
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

          </ol>
        </nav>

        {/* sub Category Section */}
      {category &&  (
        <div className="mb-12 container mx-auto max-w-7xl w-full place-self-center">
            
          <h2 className="text-2xl font-bold text-gray-700 mb-6">
            Browse by Category
          </h2>
          <div className=" ">
            {/* Videography Section */}
            {category.subcategories.filter((sub) => sub.type === "videography")
              .length > 0 && (
              <div className="w-full  py-2 border-t border-gray-100">
                <h4 className="text-lg font-semibold text-primary mb-2 uppercase">
                  Videography
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {category.subcategories
                    .filter((sub) => sub.type === "videography")
                    .map((subcategory) => (
                      <Link
                        key={subcategory.slug}
                        to={`/${category.slug}/${subcategory.type}/${subcategory.slug}`}
                        state={{ products:subcategory.products }}
                        className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 p-4 sm:p-6 text-center border border-gray-200 hover:border-primary/30"
                      >
                        <div className="mb-2 sm:mb-3">
                          <div className="w-14 h-14 sm:w-20 sm:h-20 mx-auto bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/50 transition-colors">
                            <img
                              src={
                                subcategory.image_url &&
                                subcategory.image_url.startsWith("http")
                                  ? subcategory.image_url
                                  : subcategory.image_url
                                  ? `${API_BASE_URL}/${subcategory.image_url}`
                                  : "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400"
                              }
                              alt={subcategory.name}
                              // className="size-8 sm:size-12 group-hover:bg-primary/50"
                            />
                          </div>
                        </div>
                        <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1 group-hover:text-primary transition-colors">
                          {subcategory.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-500 capitalize">
                          {subcategory.type}
                        </p>
                        {subcategory.product_count && (
                          <p className="text-xs text-gray-400 mt-1">
                            {subcategory.product_count} products
                          </p>
                        )}
                      </Link>
                    ))}
                </div>
              </div>
            )}

             {/* Photography Section */}
            {category.subcategories.filter((sub) => sub.type === "photography")
              .length > 0 && (
              <div className="w-full  py-2 border-t border-gray-100">
                <h4 className="text-lg font-semibold text-primary mb-2 uppercase">
                  Photography
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {category.subcategories
                    .filter((sub) => sub.type === "photography")
                    .map((subcategory) => (
                      <Link
                        key={subcategory.slug}
                        to={`/${category.slug}/${subcategory.type}/${subcategory.slug}`}
                         state={{ products:subcategory.products }}
                        className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 p-4 sm:p-6 text-center border border-gray-200 hover:border-primary/30"
                      >
                        <div className="mb-2 sm:mb-3">
                          <div className="w-14 h-14 sm:w-20 sm:h-20 mx-auto bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/50 transition-colors">
                            <img
                              src={
                                subcategory.image_url &&
                                subcategory.image_url.startsWith("http")
                                  ? subcategory.image_url
                                  : subcategory.image_url
                                  ? `${API_BASE_URL}/${subcategory.image_url}`
                                  : "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400"
                              }
                              alt={subcategory.name}
                              // className="w-4 h-4 sm:w-6 sm:h-6"
                            />
                          </div>
                        </div>
                        <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1 group-hover:text-primary transition-colors">
                          {subcategory.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-500 capitalize">
                          {subcategory.type}
                        </p>
                        {subcategory.product_count && (
                          <p className="text-xs text-gray-400 mt-1">
                            {subcategory.product_count} products
                          </p>
                        )}
                      </Link>
                    ))}
                </div>
              </div>
            )}
             {/* both Section */}
            {category.subcategories.filter((sub) => sub.type === "both")
              .length > 0 && (
              <div className="w-full py-2 border-t border-gray-100">
                <h4 className="text-lg font-semibold text-primary mb-2 uppercase">
                  Both
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {category.subcategories
                    .filter((sub) => sub.type === "both")
                    .map((subcategory) => (
                      <Link
                        key={subcategory.slug}
                        to={`/${category.slug}/${subcategory.type}/${subcategory.slug}`}
                         state={{ products:subcategory.products }}
                        className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 p-4 sm:p-6 text-center border border-gray-200 hover:border-primary/30"
                      >
                        <div className="mb-2 sm:mb-3">
                          <div className="w-14 h-14 sm:w-20 sm:h-20 mx-auto bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/50 transition-colors">
                            <img
                              src={
                                subcategory.image_url &&
                                subcategory.image_url.startsWith("http")
                                  ? subcategory.image_url
                                  : subcategory.image_url
                                  ? `${API_BASE_URL}/${subcategory.image_url}`
                                  : "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400"
                              }
                              alt={subcategory.name}
                              // className="w-4 h-4 sm:w-6 sm:h-6"
                            />
                          </div>
                        </div>
                        <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1 group-hover:text-primary transition-colors">
                          {subcategory.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-500 capitalize">
                          {subcategory.type}
                        </p>
                        {subcategory.product_count && (
                          <p className="text-xs text-gray-400 mt-1">
                            {subcategory.product_count} products
                          </p>
                        )}
                      </Link>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
