import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Menu, X, User } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLoginClick = () => {
    navigate('/auth/user-type');
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src="/logo.svg" alt="Farmandi" className="h-10" />
            <span className="ml-2 text-xl font-bold text-farmandi-green">Farmandi</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/products" 
              className={`text-gray-700 hover:text-farmandi-green transition-colors ${
                location.pathname === '/products' ? 'font-semibold text-farmandi-green' : ''
              }`}
            >
              Products
            </Link>
            <Link 
              to="/about" 
              className={`text-gray-700 hover:text-farmandi-green transition-colors ${
                location.pathname === '/about' ? 'font-semibold text-farmandi-green' : ''
              }`}
            >
              About
            </Link>
            <Link 
              to="/help" 
              className={`text-gray-700 hover:text-farmandi-green transition-colors ${
                location.pathname === '/help' ? 'font-semibold text-farmandi-green' : ''
              }`}
            >
              Help
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative"
              onClick={() => navigate('/cart')}
            >
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-farmandi-brown text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">0</span>
            </Button>
            <Button 
              variant="primary" 
              onClick={handleLoginClick}
              className="flex items-center"
            >
              <User className="mr-2 h-4 w-4" />
              Login
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t py-4">
          <div className="container mx-auto px-4 space-y-4">
            <Link 
              to="/products" 
              className="block py-2 text-gray-700 hover:text-farmandi-green"
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </Link>
            <Link 
              to="/about" 
              className="block py-2 text-gray-700 hover:text-farmandi-green"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/help" 
              className="block py-2 text-gray-700 hover:text-farmandi-green"
              onClick={() => setIsMenuOpen(false)}
            >
              Help
            </Link>
            <div className="pt-2 border-t flex justify-between items-center">
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-1/2 justify-start"
                onClick={() => {
                  navigate('/cart');
                  setIsMenuOpen(false);
                }}
              >
                <ShoppingBag className="h-4 w-4 mr-2" />
                Cart
              </Button>
              <Button 
                variant="primary" 
                size="sm" 
                className="w-1/2"
                onClick={() => {
                  navigate('/auth/user-type');
                  setIsMenuOpen(false);
                }}
              >
                <User className="h-4 w-4 mr-2" />
                Login
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
