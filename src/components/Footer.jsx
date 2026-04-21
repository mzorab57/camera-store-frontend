import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin, Send, ArrowUpRight } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'Facebook', icon: <Facebook size={20} />, href: 'https://www.facebook.com/share/1CDgbwViau/' },
    { name: 'Instagram', icon: <Instagram size={20} />, href: 'https://www.instagram.com/adnan_.shop?igsh=OTZwN2xkYjg1ZWU3' },
    { name: 'TikTok', icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
      </svg>
    ), href: 'https://www.tiktok.com/@adnan.shopp?_t=ZS-901W20m0Q4d&_r=1' },
  ];

  return (
    <footer className="bg-gradient-to-r from-secondary to-black/90 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Identity */}
          <div className="space-y-6">
            <h3 className="text-2xl font-black uppercase tracking-tighter italic">
              ADNAN <span className="text-primary">SHOP</span>
            </h3>
            <p className="text-gray-400 leading-relaxed text-sm">
              Your trusted partner for professional photography and videography equipment. 
              Elevate your creative journey with the best gear in the industry.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a 
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-primary hover:border-primary transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 border-l-4 border-primary pl-3">Quick Links</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><Link onClick={() => window.scrollTo(0, 0)} to="/" className="hover:text-white hover:translate-x-1 transition-all flex items-center gap-2 group">Home <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100" /></Link></li>
              <li><Link onClick={() => window.scrollTo(0, 0)} to="/about" className="hover:text-white hover:translate-x-1 transition-all flex items-center gap-2 group">About Our Story <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100" /></Link></li>
              <li><Link onClick={() => window.scrollTo(0, 0)} to="/contact" className="hover:text-white hover:translate-x-1 transition-all flex items-center gap-2 group">Contact Support <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100" /></Link></li>
              <li><Link onClick={() => window.scrollTo(0, 0)} to="/brands" className="hover:text-white hover:translate-x-1 transition-all flex items-center gap-2 group">Authorized Brands <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100" /></Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-bold mb-6 border-l-4 border-primary pl-3">Gear Categories</h4>
            <ul className="grid grid-cols-1 gap-4 text-gray-400 text-sm">
              <li className="hover:text-white transition-colors cursor-pointer flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" /> Professional Audio
              </li>
              <li className="hover:text-white transition-colors cursor-pointer flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" /> Cinema Cameras
              </li>
              <li className="hover:text-white transition-colors cursor-pointer flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" /> Studio Lenses
              </li>
              <li className="hover:text-white transition-colors cursor-pointer flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" /> Lighting & Grip
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6 border-l-4 border-primary pl-3">Find Us</h4>
            <div className="space-y-4 text-sm text-gray-400">
              <div className="flex items-start gap-3">
                <MapPin size={20} className="text-primary shrink-0" />
                <p>Sulaymaniyah, Chwarchra</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-primary shrink-0" />
                <p>+964 07702260440</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-primary shrink-0" />
                <p>info@adnanshops.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-gray-500 text-xs text-center md:text-left">
              &copy; {currentYear} <span className="text-gray-300 font-bold tracking-widest">ADNAN SHOP</span>. All rights reserved.
            </p>
            
            <div className="flex items-center  text-xs text-gray-500">
              <span>DESIGNED BY</span>
              <a 
                href="https://wa.me/9647701411893" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1.5  px-2 py-2 rounded-full   font-bold hover:bg-white hover:text-black transition-all duration-500"
              >
                AL-CODE 
                {/* <ArrowUpRight size={14} /> */}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;