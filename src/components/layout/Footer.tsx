
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-farmandi-green-dark text-white pt-12 pb-6">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <img src="/logo.svg" alt="Farmandi" className="h-10 w-10" />
            </Link>
            <p className="text-sm mb-4">
              Connecting farmers directly to customers. 
              Fresh produce, fair prices, and sustainable practices.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-farmandi-gold transition">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-farmandi-gold transition">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-farmandi-gold transition">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/products" className="hover:text-farmandi-gold transition">Browse Products</Link></li>
              <li><Link to="/about" className="hover:text-farmandi-gold transition">About Us</Link></li>
              <li><Link to="/blog" className="hover:text-farmandi-gold transition">Blog</Link></li>
              <li><Link to="/contact" className="hover:text-farmandi-gold transition">Contact Us</Link></li>
            </ul>
          </div>

          {/* For Farmers */}
          <div className="col-span-1">
            <h3 className="font-semibold text-lg mb-4">For Farmers</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/farmer/register" className="hover:text-farmandi-gold transition">Become a Seller</Link></li>
              <li><Link to="/farmer/dashboard" className="hover:text-farmandi-gold transition">Farmer Dashboard</Link></li>
              <li><Link to="/farmer/resources" className="hover:text-farmandi-gold transition">Farming Resources</Link></li>
              <li><Link to="/farmer/support" className="hover:text-farmandi-gold transition">Seller Support</Link></li>
            </ul>
          </div>

          {/* For Customers */}
          <div className="col-span-1">
            <h3 className="font-semibold text-lg mb-4">For Customers</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/auth/login" className="hover:text-farmandi-gold transition">Sign In</Link></li>
              <li><Link to="/auth/signup" className="hover:text-farmandi-gold transition">Create Account</Link></li>
              <li><Link to="/help" className="hover:text-farmandi-gold transition">Help Center</Link></li>
              <li><Link to="/terms" className="hover:text-farmandi-gold transition">Terms & Policies</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-farmandi-green pt-6 mt-8 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} Farmandi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
