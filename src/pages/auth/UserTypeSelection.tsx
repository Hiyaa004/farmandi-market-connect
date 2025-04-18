
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, UserRound, Tractor } from 'lucide-react';

const UserTypeSelection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const returnPath = location.state?.returnPath || '/';
  const action = location.state?.action || '';
  const productId = location.state?.productId || null;

  const handleUserTypeSelect = (type: 'customer' | 'farmer') => {
    localStorage.setItem('userType', type);
    
    // Redirect to login with return path information
    navigate('/auth/login', { 
      state: { 
        returnPath,
        action,
        productId,
        userType: type // Add user type to state
      } 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-6">
      <Link to="/" className="mb-8">
        <img src="/logo.svg" alt="Farmandi" className="h-16 w-16" />
      </Link>
      
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Farmandi</h1>
        <p className="text-gray-600 max-w-md mx-auto">
          Please select how you want to continue. Are you a customer looking to buy fresh produce, or a farmer looking to sell?
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl">
        <Card className="p-6 hover:shadow-lg transition-shadow border-2 border-transparent hover:border-farmandi-green">
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-farmandi-green/20 flex items-center justify-center mb-4">
              <UserRound className="h-10 w-10 text-farmandi-green" />
            </div>
            <h2 className="text-xl font-semibold mb-2">I'm a Customer</h2>
            <p className="text-gray-600 mb-6">
              I want to buy fresh produce directly from farmers. Getting quality food while supporting local agriculture.
            </p>
            <Button 
              variant="customer"
              onClick={() => handleUserTypeSelect('customer')}
              className="w-full"
            >
              Continue as Customer <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </Card>
        
        <Card className="p-6 hover:shadow-lg transition-shadow border-2 border-transparent hover:border-farmandi-green">
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-farmandi-green/20 flex items-center justify-center mb-4">
              <Tractor className="h-10 w-10 text-farmandi-green" />
            </div>
            <h2 className="text-xl font-semibold mb-2">I'm a Farmer</h2>
            <p className="text-gray-600 mb-6">
              I want to sell my produce directly to customers. Getting fair prices while connecting with my community.
            </p>
            <Button 
              variant="farmer"
              onClick={() => handleUserTypeSelect('farmer')}
              className="w-full"
            >
              Continue as Farmer <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </Card>
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/auth/login" className="text-farmandi-green hover:text-farmandi-green-dark font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default UserTypeSelection;
