import SearchBar from './SearchBar';
import LogoNav from './LogoNav';
import IconsNav from './IconsNav';
import MobileMenu from './MobileMenu';

const TopBar = ({ categories,  Menu, X, toggleMenu, isMenuOpen, Link, Search, searchQuery, setSearchQuery, handleSearch }) => {
  return (
     <div className="bg-gray-50  mx-auto  px-4 sm:px-6 lg:px-8">
        <div className="flex md:justify-between items-center h-16">
          {/* Logo */}
         <LogoNav Link={Link} device="topbar" />
          {/* Search Bar */}
          <SearchBar categories={categories} Search={Search} searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleSearch={handleSearch} />

          {/* Right Icons */}
         <IconsNav device="desktop" Link={Link} />

          {/* Mobile Menu Button */}
          <MobileMenu Menu={Menu} X={X} toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
        </div>
      </div>
  )
}

export default TopBar