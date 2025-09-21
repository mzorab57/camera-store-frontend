import React from 'react'
import { Instagram, Facebook, Tablet } from 'lucide-react'
import { PiTiktokLogo } from "react-icons/pi";

const IconsNav = ({ Link }) => {
  return (
    <div className=" items-center space-x-4 hidden md:flex">
      <Link 
        to="https://instagram.com" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-gray-600 hover:text-pink-600 transition-colors duration-200"
        aria-label="Instagram"
      >
        <Instagram className="size-5" />
      </Link>
      
      <Link 
        to="https://facebook.com" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
        aria-label="Facebook"
      >
        <Facebook className="size-5" />
      </Link>
      
      <Link 
        to="https://tiktok.com" 
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