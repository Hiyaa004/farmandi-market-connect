
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { signIn, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const returnPath = location.state?.returnPath || '/';
  const action = location.state?.action || '';
  const productId = location.state?.productId || null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn(email, password);
    
    // Handle post-login actions
    if (action === 'add-to-cart' && productId) {
      navigate('/cart');
    } else if (action === 'add-to-wishlist' && productId) {
      navigate('/wishlist');
    } else if (action === 'view-product' && returnPath.startsWith('/products/')) {
      navigate(returnPath);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md p-8">
        <div className="flex justify-center mb-6">
          <Link to="/">
            <img src="/logo.svg" alt="Farmandi" className="h-12 w-12" />
          </Link>
        </div>
        
        <h2 className="text-center text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
        <p className="text-center text-gray-600 mb-6">Sign in to your account</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="text" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Enter your email"
              className="mt-1 block w-full" 
              required
            />
          </div>
          
          <div>
            <div className="flex justify-between items-center">
              <Label htmlFor="password">Password</Label>
              <Link to="/auth/forgot-password" className="text-sm text-farmandi-green hover:text-farmandi-green-dark">
                Forgot password?
              </Link>
            </div>
            <div className="relative mt-1">
              <Input 
                id="password" 
                type={showPassword ? "text" : "password"}
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="••••••••"
                className="block w-full pr-10" 
                required
              />
              <button 
                type="button" 
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                onClick={toggleShowPassword}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>
          
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/auth/signup" className="text-farmandi-green hover:text-farmandi-green-dark font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Login;
