import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Star, 
  ShoppingCart, 
  Heart, 
  Share2, 
  ChevronLeft, 
  ChevronRight,
  Package,
  Truck,
  Shield,
  Award,
  Info
} from 'lucide-react';

const ProductDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { product } = location.state || {};
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('specifications');
  const [isWishlisted, setIsWishlisted] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost/api';

  useEffect(() => {
    if (!product) {
      navigate('/');
    }
  }, [product, navigate]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  const getImageSrc = (imageUrl) => {
    if (!imageUrl) return null;
    return imageUrl.startsWith('http') ? imageUrl : `${API_BASE_URL}/${imageUrl}`;
  };

  const handleImageNavigation = (direction) => {
    if (direction === 'prev') {
      setSelectedImageIndex(prev => 
        prev === 0 ? product.images.length - 1 : prev - 1
      );
    } else {
      setSelectedImageIndex(prev => 
        prev === product.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const groupedSpecs = product.specifications?.reduce((acc, spec) => {
    const group = spec.group || 'General';
    if (!acc[group]) acc[group] = [];
    acc[group].push(spec);
    return acc;
  }, {}) || {};

  const discountPercentage = product.discount_price ? 
    Math.round(((parseFloat(product.price) - parseFloat(product.discount_price)) / parseFloat(product.price)) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Products
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative bg-white rounded-2xl p-8 shadow-lg">
              <div className="aspect-square flex items-center justify-center">
                {product.images && product.images.length > 0 ? (
                  <img 
                    src={getImageSrc(product.images[selectedImageIndex]?.image_url)}
                    alt={product.name}
                  className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD1cIjQwMFwiIGhlaWdodD1cIjQwMFwiIHZpZXdCb3g9XCIwIDAgNDAwIDQwMFwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPjxyZWN0IHdpZHRoPVwiNDAwXCIgaGVpZ2h0PVwiNDAwXCIgZmlsbD1cIiNGM0Y0RjZcIi8+PHBhdGggZD1cIk0yMDAgMTAwQzE2MS4zNDMgMTAwIDEzMCAxMzEuMzQzIDEzMCAxNzBTMTYxLjM0MyAyNDAgMjAwIDI0MFMyNzAgMjA4LjY1NyAyNzAgMTcwUzIzOC42NTcgMTAwIDIwMCAxMDBaTTIwMCAyMTBDMTc3Ljk0MyAyMTAgMTYwIDE5Mi4wNTcgMTYwIDE3MFMxNzcuOTQzIDEzMCAyMDAgMTMwUzI0MCAxNDcuOTQzIDI0MCAxNzBTMjIyLjA1NyAyMTAgMjAwIDIxMFpcIiBmaWxsPVwiIzlDQTNBRlwiLz48L3N2Zz4=';
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 rounded-xl flex items-center justify-center">
                    <Package className="h-24 w-24 text-gray-400" />
                  </div>
                )}
              </div>
              
              {/* Navigation Arrows */}
              {product.images && product.images.length > 1 && (
                <>
                  <button 
                    onClick={() => handleImageNavigation('prev')}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 p-2 rounded-full shadow-lg transition-all"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button 
                    onClick={() => handleImageNavigation('next')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 p-2 rounded-full shadow-lg transition-all"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Images */}
            {product.images && product.images.length > 1 && (
              <div className="flex space-x-3 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImageIndex === index 
                        ? 'border-blue-500 ring-2 ring-blue-200' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img 
                      src={getImageSrc(image.image_url)}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Product Title & Rating */}
            <div>
              <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                <span>{product.category_name}</span>
                <span>•</span>
                <span>{product.subcategory_name}</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                  <span className="text-gray-600 ml-2">(4.5) • 127 reviews</span>
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center space-x-4 mb-4">
                {product.discount_price ? (
                  <>
                    <span className="text-3xl font-bold text-green-600">
                      ${parseFloat(product.discount_price).toFixed(2)}
                    </span>
                    <span className="text-xl text-gray-500 line-through">
                      ${parseFloat(product.price).toFixed(2)}
                    </span>
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm font-medium">
                      {discountPercentage}% OFF
                    </span>
                  </>
                ) : (
                  <span className="text-3xl font-bold text-green-600">
                    ${parseFloat(product.price).toFixed(2)}
                  </span>
                )}
              </div>
              
              {/* Quantity & Add to Cart */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
                {/* <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
                  <ShoppingCart className="h-5 w-5" />
                  <span>Add to Cart</span>
                </button> */}
                <button 
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`p-3 rounded-lg border transition-colors ${
                    isWishlisted 
                      ? 'bg-red-50 border-red-200 text-red-600' 
                      : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Product Info */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Package className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">SKU: {product.sku}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">Brand: {product.brand}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Truck className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">Free Shipping</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">2 Year Warranty</span>
                </div>
              </div>
            </div>

            {/* Share */}
            <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
              <Share2 className="h-5 w-5" />
              <span>Share this product</span>
            </button>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {['specifications', 'description'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8">
            {activeTab === 'specifications' && (

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <Info className="h-5 w-5 mr-2" />
                  Technical Specifications
                </h3>
                {Object.keys(groupedSpecs).length > 0 ? (
                  <div className="space-y-8">
                    {Object.entries(groupedSpecs).map(([group, specs]) => (
                      <div key={group}>
                        <h4 className="text-lg font-medium text-gray-800 mb-4 pb-2 border-b border-gray-200">
                          {group}
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {specs
                            .sort((a, b) => a.display_order - b.display_order)
                            .map((spec, index) => (
                            <div key={index} className="flex justify-between py-3 border-b border-gray-100 last:border-b-0">
                              <span className="font-medium text-gray-700">{spec.name}</span>
                              <span className="text-gray-600">{spec.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">No specifications available for this product.</p>
                )}
              </div>
            )}

            {activeTab === 'description' && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Product Description</h3>
                <div className="prose max-w-none">
                  {product.short_description && (
                    <div className="mb-6">
                      <h4 className="text-lg font-medium text-gray-800 mb-2">Overview</h4>
                      <p className="text-gray-600 leading-relaxed">{product.short_description}</p>
                    </div>
                  )}
                  {product.description && (
                    <div>
                      <h4 className="text-lg font-medium text-gray-800 mb-2">Detailed Description</h4>
                      <p className="text-gray-600 leading-relaxed whitespace-pre-line">{product.description}</p>
                    </div>
                  )}
                  {!product.description && !product.short_description && (
                    <p className="text-gray-600">No description available for this product.</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;