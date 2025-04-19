
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tractor, ShoppingBag } from 'lucide-react';

const UserTypeSelection = () => {
  const navigate = useNavigate();

  const handleSelection = (type: 'farmer' | 'customer') => {
    // In a real app, you might store this in context or localStorage
    localStorage.setItem('userType', type);
    navigate('/auth/login');
  };

  return (
    <div className="min-h-screen flex flex-col bg-farmandi-cream">
      <div className="flex-grow flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link to="/" className="inline-block">
              <img src="/logo.svg" alt="Farmandi" className="h-16 w-16 mx-auto" />
            </Link>
            <h1 className="text-2xl font-bold text-farmandi-brown mt-4">Welcome to Farmandi</h1>
            <p className="text-gray-600 mt-2">Please select how you want to use Farmandi</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button
              onClick={() => handleSelection('farmer')}
              className="bg-white rounded-lg p-6 text-center border-2 border-transparent hover:border-farmandi-green transition-all duration-300 focus:outline-none focus:border-farmandi-green"
            >
              <div className="bg-farmandi-green/10 rounded-full p-4 w-20 h-20 mx-auto flex items-center justify-center mb-4">
                <Tractor className="h-10 w-10 text-farmandi-green" />
              </div>
              <h3 className="font-semibold text-lg text-farmandi-green mb-2">I'm a Farmer</h3>
              <p className="text-sm text-gray-600">I want to sell my produce directly to customers</p>
            </button>

            <button
              onClick={() => handleSelection('customer')}
              className="bg-white rounded-lg p-6 text-center border-2 border-transparent hover:border-farmandi-brown transition-all duration-300 focus:outline-none focus:border-farmandi-brown"
            >
              <div className="bg-farmandi-brown/10 rounded-full p-4 w-20 h-20 mx-auto flex items-center justify-center mb-4">
                <ShoppingBag className="h-10 w-10 text-farmandi-brown" />
              </div>
              <h3 className="font-semibold text-lg text-farmandi-brown mb-2">I'm a Customer</h3>
              <p className="text-sm text-gray-600">I want to buy fresh produce directly from farmers</p>
            </button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 mb-4">
              Already have an account? Your previous selection will be remembered.
            </p>
            <Button asChild variant="outline" className="w-full">
              <Link to="/">
                Return to Home
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <footer className="py-4 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Farmandi. All rights reserved.
      </footer>
    </div>
  );
};

export default UserTypeSelection;
