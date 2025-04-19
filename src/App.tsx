
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Products from "./pages/products/Products";
import ProductDetail from "./pages/products/ProductDetail";
import About from "./pages/about/About";
import Help from "./pages/help/Help";
import Cart from "./pages/cart/Cart";
import Wishlist from "./pages/wishlist/Wishlist";

// Auth Pages
import UserTypeSelection from "./pages/auth/UserTypeSelection";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ForgotPassword from "./pages/auth/ForgotPassword";

// Farmer Pages
import FarmerDashboard from "./pages/farmer/FarmerDashboard";
import CropSelectionAnalysis from "./pages/farmer/CropSelectionAnalysis";
import FarmerOnboarding from "./pages/farmer/FarmerOnboarding";

// Customer Pages
import CustomerDashboard from "./pages/customer/CustomerDashboard";
import QualityScanner from "./pages/customer/QualityScanner";

const queryClient = new QueryClient();

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:productId" element={<ProductDetail />} />
      <Route path="/about" element={<About />} />
      <Route path="/help" element={<Help />} />
      
      <Route path="/cart" element={
        <ProtectedRoute>
          <Cart />
        </ProtectedRoute>
      } />
      
      <Route path="/wishlist" element={
        <ProtectedRoute>
          <Wishlist />
        </ProtectedRoute>
      } />
      
      {/* Auth Routes */}
      <Route path="/auth/user-type" element={<UserTypeSelection />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/signup" element={<Signup />} />
      <Route path="/auth/forgot-password" element={<ForgotPassword />} />
      
      {/* Farmer Routes */}
      <Route path="/farmer/dashboard" element={
        <ProtectedRoute requiredRole="farmer">
          <FarmerDashboard />
        </ProtectedRoute>
      } />
      
      <Route path="/farmer/crop-analysis" element={
        <ProtectedRoute requiredRole="farmer">
          <CropSelectionAnalysis />
        </ProtectedRoute>
      } />
      
      <Route path="/farmer/onboarding" element={
        <ProtectedRoute requiredRole="farmer">
          <FarmerOnboarding />
        </ProtectedRoute>
      } />
      
      <Route path="/farmer/register" element={<FarmerOnboarding />} />
      
      {/* Customer Routes */}
      <Route path="/customer/dashboard" element={
        <ProtectedRoute requiredRole="customer">
          <CustomerDashboard />
        </ProtectedRoute>
      } />
      
      <Route path="/customer/quality-scanner" element={
        <ProtectedRoute requiredRole="customer">
          <QualityScanner />
        </ProtectedRoute>
      } />
      
      {/* Catch All */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <AppRoutes />
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
