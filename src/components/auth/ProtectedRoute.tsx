
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'farmer' | 'customer';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole 
}) => {
  const { user, loading, userProfile } = useAuth();
  const location = useLocation();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-farmandi-green" />
        <span className="ml-2 text-lg">Loading...</span>
      </div>
    );
  }
  
  if (!user) {
    // Redirect to login if not authenticated
    return (
      <Navigate 
        to="/auth/login" 
        state={{ returnPath: location.pathname }}
        replace 
      />
    );
  }
  
  // If role check is required and the user doesn't have that role
  if (requiredRole && userProfile?.user_type !== requiredRole) {
    return (
      <Navigate 
        to={userProfile?.user_type === 'farmer' ? '/farmer/dashboard' : '/customer/dashboard'}
        replace 
      />
    );
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;
