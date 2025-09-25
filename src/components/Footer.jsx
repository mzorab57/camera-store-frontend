import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold mb-4">Camera Store</h3>
            <p className="text-gray-400 mb-4">
              Your trusted partner for professional photography and videography equipment. 
              We provide high-quality cameras, lenses, and accessories from top brands.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/share/1CDgbwViau/" className="text-gray-400 hover:text-white transition-colors">
                Facebook
              </a>
              <a href="https://www.instagram.com/adnan_.shop?igsh=OTZwN2xkYjg1ZWU3" className="text-gray-400 hover:text-white transition-colors">
                Instagram
              </a>
              <a href="https://www.tiktok.com/@adnan.shopp?_t=ZS-901W20m0Q4d&_r=1" className="text-gray-400 hover:text-white transition-colors">
                TikTok
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link onClick={() => window.scrollTo(0, 0)} to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link onClick={() => window.scrollTo(0, 0)} to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link onClick={() => window.scrollTo(0, 0)} href="/about" className="hover:text-white transition-colors">Support</Link></li>
             
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Professinal Audio</li>
              <li>Cameras</li>
              <li>Lenses</li>
              <li>Accessories</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} Service Energy All rights reserved. | Developed by{' '}
            <a 
              href="https://wa.me/9647701411893" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:text-primaryLighter transition-colors"

            >
              Al-Code
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;