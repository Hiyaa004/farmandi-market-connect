import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Menu, X, User, Heart, Settings, Package, LogOut, Bell, CreditCard, History, Home } from 'lucide-react';
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('userType') !== null;
  const userType = localStorage.getItem('userType');
  const username = localStorage.getItem('username') || 'User';

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLoginClick = () => {
    navigate('/auth/user-type');
  };

  const handleLogout = () => {
    localStorage.removeItem('userType');
    localStorage.removeItem('username');
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <img src="/logo.svg" alt="Farmandi" className="h-10 w-10" />
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/products" 
              className={`text-gray-700 hover:text-farmandi-green transition-colors ${
                location.pathname === '/products' ? 'font-semibold text-farmandi-green' : ''
              }`}
            >
              Products
            </Link>
            <Link 
              to="/about" 
              className={`text-gray-700 hover:text-farmandi-green transition-colors ${
                location.pathname === '/about' ? 'font-semibold text-farmandi-green' : ''
              }`}
            >
              About
            </Link>
            <Link 
              to="/help" 
              className={`text-gray-700 hover:text-farmandi-green transition-colors ${
                location.pathname === '/help' ? 'font-semibold text-farmandi-green' : ''
              }`}
            >
              Help
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative"
              onClick={() => isLoggedIn ? navigate('/wishlist') : navigate('/auth/user-type', { 
                state: { returnPath: '/wishlist', action: 'add-to-wishlist' } 
              })}
            >
              <Heart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-farmandi-brown text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">0</span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative"
              onClick={() => isLoggedIn ? navigate('/cart') : navigate('/auth/user-type', { 
                state: { returnPath: '/cart', action: 'view-cart' } 
              })}
            >
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-farmandi-brown text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">0</span>
            </Button>

            {isLoggedIn ? (
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="primary" className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    {username}
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-[300px] sm:w-[400px]">
                  <SheetHeader>
                    <SheetTitle>Account Settings</SheetTitle>
                    <SheetDescription>
                      Manage your account settings and preferences
                    </SheetDescription>
                  </SheetHeader>
                  <div className="py-6">
                    <div className="flex flex-col items-center mb-6">
                      <div className="h-20 w-20 rounded-full bg-farmandi-green-dark/20 flex items-center justify-center text-farmandi-green-dark text-2xl font-bold mb-2">
                        {username.charAt(0).toUpperCase()}
                      </div>
                      <h3 className="font-semibold text-lg">{username}</h3>
                      <p className="text-sm text-gray-500">{username.toLowerCase()}@example.com</p>
                    </div>
                    
                    <div className="space-y-3">
                      <SheetClose asChild>
                        <Button variant="ghost" className="w-full justify-start" asChild>
                          <Link to={userType === 'farmer' ? '/farmer/dashboard' : '/customer/dashboard'}>
                            <Home className="mr-2 h-4 w-4" />
                            <span>Dashboard</span>
                          </Link>
                        </Button>
                      </SheetClose>
                      
                      <SheetClose asChild>
                        <Button variant="ghost" className="w-full justify-start" asChild>
                          <Link to="/profile">
                            <User className="mr-2 h-4 w-4" />
                            <span>Profile</span>
                          </Link>
                        </Button>
                      </SheetClose>
                      
                      <SheetClose asChild>
                        <Button variant="ghost" className="w-full justify-start" asChild>
                          <Link to="/orders">
                            <Package className="mr-2 h-4 w-4" />
                            <span>Orders</span>
                          </Link>
                        </Button>
                      </SheetClose>
                      
                      <SheetClose asChild>
                        <Button variant="ghost" className="w-full justify-start" asChild>
                          <Link to="/wishlist">
                            <Heart className="mr-2 h-4 w-4" />
                            <span>Wishlist</span>
                          </Link>
                        </Button>
                      </SheetClose>
                      
                      <SheetClose asChild>
                        <Button variant="ghost" className="w-full justify-start" asChild>
                          <Link to="/history">
                            <History className="mr-2 h-4 w-4" />
                            <span>Purchase History</span>
                          </Link>
                        </Button>
                      </SheetClose>
                      
                      <SheetClose asChild>
                        <Button variant="ghost" className="w-full justify-start" asChild>
                          <Link to="/payment-methods">
                            <CreditCard className="mr-2 h-4 w-4" />
                            <span>Payment Methods</span>
                          </Link>
                        </Button>
                      </SheetClose>
                      
                      <SheetClose asChild>
                        <Button variant="ghost" className="w-full justify-start" asChild>
                          <Link to="/notifications">
                            <Bell className="mr-2 h-4 w-4" />
                            <span>Notifications</span>
                          </Link>
                        </Button>
                      </SheetClose>
                      
                      <SheetClose asChild>
                        <Button variant="ghost" className="w-full justify-start" asChild>
                          <Link to="/settings">
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Settings</span>
                          </Link>
                        </Button>
                      </SheetClose>
                      
                      <hr className="my-2" />
                      
                      <SheetClose asChild>
                        <Button 
                          variant="ghost" 
                          className="w-full justify-start text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={handleLogout}
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          <span>Sign Out</span>
                        </Button>
                      </SheetClose>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            ) : (
              <Button 
                variant="primary" 
                onClick={handleLoginClick}
                className="flex items-center"
              >
                <User className="mr-2 h-4 w-4" />
                Sign In
              </Button>
            )}

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              aria-label="Menu"
              className="md:hidden"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t py-4">
          <div className="container mx-auto px-4 space-y-4">
            <Link 
              to="/products" 
              className="block py-2 text-gray-700 hover:text-farmandi-green"
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </Link>
            <Link 
              to="/about" 
              className="block py-2 text-gray-700 hover:text-farmandi-green"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/help" 
              className="block py-2 text-gray-700 hover:text-farmandi-green"
              onClick={() => setIsMenuOpen(false)}
            >
              Help
            </Link>
            <div className="pt-2 border-t flex justify-between items-center">
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-1/4 justify-center"
                onClick={() => {
                  navigate('/wishlist');
                  setIsMenuOpen(false);
                }}
              >
                <Heart className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-1/4 justify-center"
                onClick={() => {
                  navigate('/cart');
                  setIsMenuOpen(false);
                }}
              >
                <ShoppingBag className="h-4 w-4" />
              </Button>
              {isLoggedIn ? (
                <Button 
                  variant="primary" 
                  size="sm" 
                  className="w-2/4"
                  onClick={() => {
                    navigate(userType === 'farmer' ? '/farmer/dashboard' : '/customer/dashboard');
                    setIsMenuOpen(false);
                  }}
                >
                  <User className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>
              ) : (
                <Button 
                  variant="primary" 
                  size="sm" 
                  className="w-2/4"
                  onClick={() => {
                    navigate('/auth/user-type');
                    setIsMenuOpen(false);
                  }}
                >
                  <User className="h-4 w-4 mr-2" />
                  Account
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
