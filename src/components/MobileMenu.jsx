

const MobileMenu = ({ Menu, X, toggleMenu, isMenuOpen }) => {
  return (
    <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 text-gray-200 hover:text-primary transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-8 text-white" /> : <Menu  className="h-6 w-8  mb-2" />}
            </button>
          </div>
  )
}

export default MobileMenu