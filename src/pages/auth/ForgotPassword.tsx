
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userType, setUserType] = useState<'farmer' | 'customer' | null>(null);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Get user type from localStorage
    const storedUserType = localStorage.getItem('userType') as 'farmer' | 'customer' | null;
    if (!storedUserType) {
      // If no user type selected, redirect to selection page
      navigate('/auth/user-type');
    } else {
      setUserType(storedUserType);
    }
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // In a real application, you would handle the password reset request here
    console.log('Password reset request for:', email);
    
    // Simulate API call with timeout
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Reset email sent",
        description: "If an account exists with this email, you'll receive password reset instructions.",
      });
      // Clear the form
      setEmail('');
    }, 1500);
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
              onClick={() => navigate('/auth/login')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Login
            </Button>
          </div>

          <div className="text-center mb-8">
            <Link to="/" className="inline-block">
              <img src="/logo.svg" alt="Farmandi" className="h-16 w-16 mx-auto" />
            </Link>
            <h1 className="text-2xl font-bold text-farmandi-brown mt-4">
              Reset Your Password
            </h1>
            <p className="text-gray-600 mt-2">
              Enter your email address and we'll send you instructions to reset your password.
            </p>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-md">
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email"
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full"
                  variant={userType === 'farmer' ? 'farmer' : 'customer'}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Reset Instructions'}
                </Button>
              </div>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-100 text-center">
              <p className="text-sm text-gray-600">
                Remember your password?{' '}
                <Link to="/auth/login" className="text-farmandi-green font-semibold hover:underline">
                  Back to Login
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

export default ForgotPassword;
