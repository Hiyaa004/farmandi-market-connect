import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<'farmer' | 'customer' | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const storedUserType = localStorage.getItem('userType') as 'farmer' | 'customer' | null;
    if (!storedUserType) {
      navigate('/auth/user-type');
    } else {
      setUserType(storedUserType);
    }
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', { email, password, userType });
    
    if (userType === 'farmer') {
      navigate('/farmer/dashboard');
    } else {
      navigate('/customer/dashboard');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex flex-col bg-farmandi-cream">
      <div className="flex-grow flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="mb-6">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-600"
              onClick={() => navigate('/auth/user-type')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Selection
            </Button>
          </div>

          <div className="text-center mb-8">
            <Link to="/" className="inline-block">
              <img src="/logo.svg" alt="Farmandi" className="h-16 mx-auto" />
            </Link>
            <h1 className="text-2xl font-bold text-farmandi-brown mt-4">
              {userType === 'farmer' ? 'Farmer Login' : 'Customer Login'}
            </h1>
            <p className="text-gray-600 mt-2">
              {userType === 'farmer' 
                ? 'Access your farm dashboard and manage your produce'
                : 'Sign in to shop for fresh farm produce'}
            </p>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-md">
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email"
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link to="/auth/forgot-password" className="text-xs text-farmandi-green hover:underline">
                      Forgot Password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Input 
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="pr-10"
                    />
                    <button 
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full"
                  variant={userType === 'farmer' ? 'farmer' : 'customer'}
                >
                  Sign In
                </Button>
              </div>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-100 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/auth/signup" className="text-farmandi-green font-semibold hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <footer className="py-4 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Farmandi. All rights reserved.
      </footer>
    </div>
  );
};

export default Login;
