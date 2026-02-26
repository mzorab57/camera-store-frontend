import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, []);

  const slides = [
    {
      id: 6,
      brand: 'Sony',
      title: 'Innovation in Every Shot.',
      subtitle: 'Experience the future of photography with cutting-edge technology.',
      cta: 'LEARN MORE',
      brandLogo: 'S',
      image: './bg6.jpg'
    },
    {
      id: 1,
      brand: 'Manfrotto',
      title: 'One Tripod, Endless Possibilities.',
      subtitle: 'Capture stunning photos and video with one unique tripod.',
      cta: 'FIND OUT MORE',
      brandLogo: 'M',
      image: './bg1.jpg'
    },
    {
      id: 2,
      brand: 'Canon',
      title: 'Professional Photography Made Simple.',
      subtitle: 'Discover our latest range of professional cameras and lenses.',
      cta: 'EXPLORE NOW',
      brandLogo: 'C',
      image: './bg2.jpg'
    },
    {
      id: 3,
      brand: 'Sony',
      title: 'Innovation in Every Shot.',
      subtitle: 'Experience the future of photography with cutting-edge technology.',
      cta: 'LEARN MORE',
      brandLogo: 'S',
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2064&q=80'
    },
    {
      id: 4,
      brand: 'Sony',
      title: 'Innovation in Every Shot.',
      subtitle: 'Experience the future of photography with cutting-edge technology.',
      cta: 'LEARN MORE',
      brandLogo: 'S',
      image: './bg3.jpg'
    },
     {
      id: 2,
      brand: 'Canon',
      title: 'Professional Photography Made Simple.',
      subtitle: 'Discover our latest range of professional cameras and lenses.',
      cta: 'EXPLORE NOW',
      brandLogo: 'C',
      image: './bg4.jpg'
    },
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
    <section className="relative bg-gray-50   overflow-hidden">
      <div className="max-w-7xl mx-auto px-2 sm:px-0 lg:px-6 ">
        <div className="relative  overflow-hidden ">
          <div className="relative  ">
            {/* Background Image */}
          
             <img src={currentSlideData.image} alt={currentSlideData.brand} className='lg:rounded-bl-2xl lg:rounded-br-2xl rounded-2xl lg:rounded-t-none size-full bg-cover bg-center bg-no-repeat object-cover px-2 w-full h-[10rem] sm:h-[15] md:h-[15rem] lg:h-[20rem] overflow-hidden cursor-pointer"' />
            
            {/* Navigation Arrows */}
            <button 
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white md:p-3 p-1 rounded-full transition-all backdrop-blur-sm"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button 
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white md:p-3 p-1 rounded-full transition-all backdrop-blur-sm"
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