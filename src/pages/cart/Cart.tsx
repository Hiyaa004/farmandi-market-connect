
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const Cart = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [subtotal, setSubtotal] = useState(0);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Get cart items from localStorage
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    setCartItems(storedCartItems);
    
    // Calculate subtotal
    const total = storedCartItems.reduce((sum: number, item: any) => (
      sum + (item.price * item.quantity)
    ), 0);
    setSubtotal(total);
    
    // Listen for storage events (when cart is updated from another page)
    const handleStorageChange = () => {
      const updatedCartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
      setCartItems(updatedCartItems);
      const newTotal = updatedCartItems.reduce((sum: number, item: any) => (
        sum + (item.price * item.quantity)
      ), 0);
      setSubtotal(newTotal);
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleRemoveItem = (itemId: number) => {
    const updatedCartItems = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    
    // Recalculate subtotal
    const newTotal = updatedCartItems.reduce((sum: number, item: any) => (
      sum + (item.price * item.quantity)
    ), 0);
    setSubtotal(newTotal);
    
    toast({
      title: "Item removed",
      description: "Item has been removed from your cart",
    });
    
    // Force navbar to update
    window.dispatchEvent(new Event('storage'));
  };

  const handleQuantityChange = (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    const updatedCartItems = cartItems.map(item => {
      if (item.id === itemId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    
    // Recalculate subtotal
    const newTotal = updatedCartItems.reduce((sum: number, item: any) => (
      sum + (item.price * item.quantity)
    ), 0);
    setSubtotal(newTotal);
    
    // Force navbar to update
    window.dispatchEvent(new Event('storage'));
  };

  const handleCheckout = () => {
    // In a real app, this would navigate to checkout page
    toast({
      title: "Checkout",
      description: "Proceeding to checkout...",
    });
    
    // For now, just show a success message
    setTimeout(() => {
      toast({
        title: "Order placed",
        description: "Your order has been successfully placed!",
      });
      
      // Clear cart
      localStorage.setItem('cartItems', '[]');
      setCartItems([]);
      setSubtotal(0);
      
      // Force navbar to update
      window.dispatchEvent(new Event('storage'));
      
      // Redirect to home
      navigate('/');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Your Cart</h1>
        
        {cartItems.length === 0 ? (
          <Card className="p-8 text-center">
            <div className="flex flex-col items-center">
              <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
              <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
              <p className="text-gray-500 mb-6">Looks like you haven't added any products to your cart yet.</p>
              <Button variant="primary" asChild>
                <Link to="/products">Browse Products</Link>
              </Button>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <Card key={item.id} className="p-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="w-full sm:w-24 h-24">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover rounded-md" 
                      />
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between">
                        <Link to={`/products/${item.id}`} className="font-semibold hover:text-farmandi-green">
                          {item.name}
                        </Link>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-sm text-gray-500 mb-2">{item.packSize || '1 Piece'}</p>
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center">
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="h-7 w-7 p-0"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            -
                          </Button>
                          <span className="mx-2 w-8 text-center">{item.quantity}</span>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="h-7 w-7 p-0"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          >
                            +
                          </Button>
                        </div>
                        <div className="font-semibold">
                          ₹{item.price * item.quantity}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-20">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span>{subtotal >= 200 ? 'Free' : '₹40'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span>₹{Math.round(subtotal * 0.05)}</span>
                  </div>
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>₹{subtotal + (subtotal >= 200 ? 0 : 40) + Math.round(subtotal * 0.05)}</span>
                    </div>
                  </div>
                </div>
                <Button 
                  variant="customer" 
                  className="w-full"
                  onClick={handleCheckout}
                  disabled={cartItems.length === 0}
                >
                  Proceed to Checkout <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button 
                  variant="link" 
                  className="w-full mt-2"
                  asChild
                >
                  <Link to="/products">Continue Shopping</Link>
                </Button>
              </Card>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
