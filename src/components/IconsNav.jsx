import React from 'react'
import { Instagram, Facebook, Tablet } from 'lucide-react'
import { PiTiktokLogo } from "react-icons/pi";

const IconsNav = ({ Link, device }) => {
  return (
    <div className={`flex items-center space-x-4 ${
      device === 'mobile' ? 'flex md:hidden' : 'hidden md:flex'
    }`}>
      <Link 
        to="https://www.instagram.com/adnan_.shop?igsh=OTZwN2xkYjg1ZWU3" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-gray-600 hover:text-pink-600 transition-colors duration-200"
        aria-label="Instagram"
      >
        <Instagram className="size-5" />
      </Link>
      
      <Link 
        to="https://www.facebook.com/share/1CDgbwViau/" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
        aria-label="Facebook"
      >
        <Facebook className="size-5" />
      </Link>
      
      <Link 
        to="https://www.tiktok.com/@adnan.shopp?_t=ZS-901W20m0Q4d&_r=1" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-gray-600 hover:text-black transition-colors duration-200"
        aria-label="TikTok"
      >
        <PiTiktokLogo className="size-5" />
      </Link>
    </div>
  )
}

export default IconsNav