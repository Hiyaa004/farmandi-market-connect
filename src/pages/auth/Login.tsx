
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      toast({
        title: "Error",
        description: "Please enter both username and password",
        variant: "destructive",
      });
      return;
    }

    // Simulate login success
    // In a real app, this would validate with a server
    localStorage.setItem('userType', 'customer'); // or 'farmer' based on user
    toast({
      title: "Welcome back!",
      description: `You've successfully logged in as ${username}`,
    });
    
    // Redirect based on user type
    // This would normally come from the server response
    const userType = localStorage.getItem('userType');
    if (userType === 'farmer') {
      navigate('/farmer/dashboard');
    } else {
      navigate('/customer/dashboard');
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
            <Label htmlFor="username">Username</Label>
            <Input 
              id="username" 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              placeholder="Enter your username"
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
          
          <Button type="submit" className="w-full">Sign In</Button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/auth/signup" className="text-farmandi-green hover:text-farmandi-green-dark font-medium">
              Sign up
            </Link>
          </p>
        </div>
        
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue as</span>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-2 gap-3">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => {
                localStorage.setItem('userType', 'farmer');
                navigate('/farmer/dashboard');
              }}
            >
              Farmer
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => {
                localStorage.setItem('userType', 'customer');
                navigate('/customer/dashboard');
              }}
            >
              Customer
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Login;
