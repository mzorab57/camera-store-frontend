import React from 'react'

const LogoNav = ({ Link }) => {
  return (
     <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <div className="">
               <img src="/logo.png" alt="logo" className='md:w-20 w-16 sm:scale-110 md:scale-125  ' />
              </div>
            </Link>
          </div>
  )
}

export default LogoNav