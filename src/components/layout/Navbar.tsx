
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Menu, X, User, Heart, Settings, Package, History, LogOut } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

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
            <img src="/logo.svg" alt="Farmandi" className="h-10 w-10" />
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
              onClick={() => navigate('/wishlist')}
            >
              <Heart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-farmandi-brown text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">0</span>
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative"
              onClick={() => navigate('/cart')}
            >
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-farmandi-brown text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">0</span>
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="primary" className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  Account
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-white">
                <div className="px-2 py-1.5 text-sm font-semibold">My Account</div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/auth/user-type')}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/orders')}>
                  <Package className="mr-2 h-4 w-4" />
                  <span>My Orders</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/wishlist')}>
                  <Heart className="mr-2 h-4 w-4" />
                  <span>Wishlist</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/history')}>
                  <History className="mr-2 h-4 w-4" />
                  <span>Purchase History</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/settings')}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/auth/login')}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign In/Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
                className="w-1/4 justify-center"
                onClick={() => {
                  navigate('/wishlist');
                  setIsMenuOpen(false);
                }}
              >
                <Heart className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-1/4 justify-center"
                onClick={() => {
                  navigate('/cart');
                  setIsMenuOpen(false);
                }}
              >
                <ShoppingBag className="h-4 w-4" />
              </Button>
              <Button 
                variant="primary" 
                size="sm" 
                className="w-2/4"
                onClick={() => {
                  navigate('/auth/user-type');
                  setIsMenuOpen(false);
                }}
              >
                <User className="h-4 w-4 mr-2" />
                Account
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
