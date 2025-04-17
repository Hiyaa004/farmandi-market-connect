
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Products from "./pages/products/Products";
import About from "./pages/about/About";
import Help from "./pages/help/Help";

// Auth Pages
import UserTypeSelection from "./pages/auth/UserTypeSelection";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

// Farmer Pages
import FarmerDashboard from "./pages/farmer/FarmerDashboard";
import CropAnalysis from "./pages/farmer/CropAnalysis";
import FarmerOnboarding from "./pages/farmer/FarmerOnboarding";

// Customer Pages
import CustomerDashboard from "./pages/customer/CustomerDashboard";
import QualityScanner from "./pages/customer/QualityScanner";

const queryClient = new QueryClient();

const App = () => {
  // In a real app, this would be a proper auth system
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<string | null>(null);

  useEffect(() => {
    // Check localStorage for auth
    const storedUserType = localStorage.getItem('userType');
    if (storedUserType) {
      setUserType(storedUserType);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/products" element={<Products />} />
            <Route path="/about" element={<About />} />
            <Route path="/help" element={<Help />} />
            
            {/* Auth Routes */}
            <Route path="/auth/user-type" element={<UserTypeSelection />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/signup" element={<Signup />} />
            
            {/* Farmer Routes */}
            <Route path="/farmer/dashboard" element={<FarmerDashboard />} />
            <Route path="/farmer/crop-analysis" element={<CropAnalysis />} />
            <Route path="/farmer/onboarding" element={<FarmerOnboarding />} />
            <Route path="/farmer/register" element={<FarmerOnboarding />} />
            
            {/* Customer Routes */}
            <Route path="/customer/dashboard" element={<CustomerDashboard />} />
            <Route path="/customer/quality-scanner" element={<QualityScanner />} />
            
            {/* Catch All */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
