import SearchBar from './SearchBar';
import LogoNav from './LogoNav';
import IconsNav from './IconsNav';
import MobileMenu from './MobileMenu';

const TopBar = ({ Menu, X, toggleMenu, isMenuOpen, Link, Search, searchQuery, setSearchQuery, handleSearch }) => {
  return (
     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex md:justify-between items-center h-16">
          {/* Logo */}
         <LogoNav Link={Link} />
          {/* Search Bar */}
          <SearchBar Search={Search} searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleSearch={handleSearch} />

          {/* Right Icons */}
        <IconsNav Link={Link} />

          {/* Mobile Menu Button */}
          <MobileMenu Menu={Menu} X={X} toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
        </div>
      </div>
  )
}

export default TopBar