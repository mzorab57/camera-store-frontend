

const MobileMenu = ({ Menu, X, toggleMenu, isMenuOpen }) => {
  return (
    <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 text-gray-600 hover:text-primary transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
  )
}

export default MobileMenu