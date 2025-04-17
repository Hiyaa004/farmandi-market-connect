
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm py-4 px-6 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img src="/logo.svg" alt="Farmandi" className="h-10 w-10" />
          <div>
            <h1 className="text-farmandi-green-dark font-bold text-xl">Farmandi</h1>
            <p className="text-xs text-farmandi-brown-light">Connecting farmers directly to customers</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/products" className="text-gray-700 hover:text-farmandi-green transition">Browse Products</Link>
          <Link to="/about" className="text-gray-700 hover:text-farmandi-green transition">About</Link>
          <Link to="/help" className="text-gray-700 hover:text-farmandi-green transition">Help</Link>
          <Link to="/cart" className="relative">
            <ShoppingCart className="h-6 w-6 text-farmandi-brown" />
            <span className="absolute -top-2 -right-2 bg-farmandi-green text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">0</span>
          </Link>
          <Link to="/login">
            <Button variant="primary" size="sm" className="rounded-full">
              <User className="h-4 w-4 mr-1" /> Login
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          className="md:hidden text-gray-700"
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg py-4 px-6">
          <div className="flex flex-col space-y-4">
            <Link to="/products" className="text-gray-700 hover:text-farmandi-green transition" onClick={() => setIsMenuOpen(false)}>
              Browse Products
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-farmandi-green transition" onClick={() => setIsMenuOpen(false)}>
              About
            </Link>
            <Link to="/help" className="text-gray-700 hover:text-farmandi-green transition" onClick={() => setIsMenuOpen(false)}>
              Help
            </Link>
            <Link to="/cart" className="text-gray-700 hover:text-farmandi-green transition" onClick={() => setIsMenuOpen(false)}>
              Cart
            </Link>
            <Link to="/login" onClick={() => setIsMenuOpen(false)}>
              <Button variant="primary" className="w-full">Login</Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
