import React from 'react';
import { Camera, Users, Award, Truck } from 'lucide-react';

function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Adnan Shop</h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            Your trusted partner for professional photography and videography equipment since 2000
          </p>
        </div>
      </div>

      {/* Story Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-lg text-gray-600 mb-6">
                Founded in 2000 by a team of passionate photographers and videographers, CameraStore began as a small shop with a big vision: to provide creators with the best equipment and support to bring their artistic visions to life.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Over the years, we've grown from a local camera shop to a trusted online destination for professionals and enthusiasts worldwide. Our commitment to quality, expertise, and customer service has remained unchanged.
              </p>
              <p className="text-lg text-gray-600">
                Today, we're proud to serve thousands of customers, from weekend hobbyists to award-winning professionals, helping them capture moments that matter.
              </p>
            </div>
            <div className="relative">
              <img
                src="./logoJpg.jpg"
                alt="Camera store interior"
                className=""
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose CameraStore?</h2>
            <p className="text-xl text-gray-600">We're more than just a store - we're your creative partner</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Expert Curation</h3>
              <p className="text-gray-600">
                Every product is carefully selected by our team of photography and videography experts.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Personal Support</h3>
              <p className="text-gray-600">
                Get personalized recommendations and technical support from our knowledgeable team.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality Guarantee</h3>
              <p className="text-gray-600">
                All products come with manufacturer warranty and our satisfaction guarantee.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-orange-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Fast Shipping</h3>
              <p className="text-gray-600">
                Free shipping on orders over $100 with fast, secure delivery worldwide.
              </p>
            </div>
          </div>
        </div>
      </div>

    
    </div>
  );
}

export default About;