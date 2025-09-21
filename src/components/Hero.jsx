import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      brand: 'Manfrotto',
      title: 'One Tripod, Endless Possibilities.',
      subtitle: 'Capture stunning photos and video with one unique tripod.',
      cta: 'FIND OUT MORE',
      brandLogo: 'M'
    },
    {
      id: 2,
      brand: 'Canon',
      title: 'Professional Photography Made Simple.',
      subtitle: 'Discover our latest range of professional cameras and lenses.',
      cta: 'EXPLORE NOW',
      brandLogo: 'C'
    },
    {
      id: 3,
      brand: 'Sony',
      title: 'Innovation in Every Shot.',
      subtitle: 'Experience the future of photography with cutting-edge technology.',
      cta: 'LEARN MORE',
      brandLogo: 'S'
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const currentSlideData = slides[currentSlide];

  return (
    <section className="relative bg-gradient-to-r from-blue-50 to-blue-100 py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg">
          <div className="relative h-96 md:h-[500px]">
            {/* Background Image */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-600">
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              
              {/* Photographer silhouette */}
              <div className="absolute left-8 bottom-8 w-64 h-64 opacity-30">
                <svg viewBox="0 0 200 200" className="w-full h-full text-white fill-current">
                  {/* Photographer figure */}
                  <circle cx="100" cy="60" r="12" />
                  <rect x="90" y="72" width="20" height="40" rx="3" />
                  <rect x="85" y="85" width="30" height="15" rx="5" />
                  <rect x="75" y="112" width="50" height="8" rx="4" />
                  <rect x="80" y="120" width="15" height="30" rx="3" />
                  <rect x="105" y="120" width="15" height="30" rx="3" />
                  
                  {/* Tripod */}
                  <line x1="130" y1="120" x2="130" y2="160" stroke="currentColor" strokeWidth="2" />
                  <line x1="130" y1="160" x2="115" y2="175" stroke="currentColor" strokeWidth="2" />
                  <line x1="130" y1="160" x2="145" y2="175" stroke="currentColor" strokeWidth="2" />
                  <line x1="130" y1="160" x2="130" y2="175" stroke="currentColor" strokeWidth="2" />
                  
                  {/* Camera */}
                  <rect x="125" y="115" width="15" height="10" rx="2" />
                  <circle cx="132" cy="120" r="3" />
                </svg>
              </div>
            </div>
            
            {/* Content Overlay */}
            <div className="absolute inset-0 flex items-center justify-end pr-8 md:pr-16">
              <div className="text-right text-white max-w-md">
                {/* Brand Logo */}
                <div className="mb-4">
                  <div className="inline-flex items-center space-x-2 bg-white bg-opacity-20 px-4 py-2 rounded-lg backdrop-blur-sm">
                    <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{currentSlideData.brandLogo}</span>
                    </div>
                    <span className="text-white font-bold text-lg">{currentSlideData.brand}</span>
                  </div>
                </div>
                
                {/* Main Content */}
                <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                  {currentSlideData.title.split(',').map((part, index) => (
                    <span key={index}>
                      {part.trim()}
                      {index < currentSlideData.title.split(',').length - 1 && <br />}
                    </span>
                  ))}
                </h1>
                <p className="text-lg md:text-xl mb-6 text-blue-100">
                  {currentSlideData.subtitle.split(' and').map((part, index) => (
                    <span key={index}>
                      {part.trim()}
                      {index < currentSlideData.subtitle.split(' and').length - 1 && <br />}
                    </span>
                  ))}
                </p>
                <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition-colors text-lg">
                  {currentSlideData.cta}
                </button>
              </div>
            </div>
            
            {/* Navigation Arrows */}
            <button 
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all backdrop-blur-sm"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button 
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all backdrop-blur-sm"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
            
            {/* Slider Dots */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;