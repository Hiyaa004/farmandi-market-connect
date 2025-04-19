
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Trash2, ShoppingBag, Heart } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Get wishlist items from localStorage
    const storedWishlistItems = JSON.parse(localStorage.getItem('wishlistItems') || '[]');
    setWishlistItems(storedWishlistItems);
    
    // Listen for storage events (when wishlist is updated from another page)
    const handleStorageChange = () => {
      const updatedWishlistItems = JSON.parse(localStorage.getItem('wishlistItems') || '[]');
      setWishlistItems(updatedWishlistItems);
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleRemoveItem = (itemId: number) => {
    const updatedWishlistItems = wishlistItems.filter(item => item.id !== itemId);
    setWishlistItems(updatedWishlistItems);
    localStorage.setItem('wishlistItems', JSON.stringify(updatedWishlistItems));
    
    toast({
      title: "Item removed",
      description: "Item has been removed from your wishlist",
    });
    
    // Force navbar to update
    window.dispatchEvent(new Event('storage'));
  };

  const handleAddToCart = (item: any) => {
    // Get existing cart items or initialize empty array
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    
    // Check if product is already in cart
    const existingItemIndex = cartItems.findIndex((cartItem: any) => cartItem.id === item.id);
    
    if (existingItemIndex >= 0) {
      // Update quantity if product is already in cart
      cartItems[existingItemIndex].quantity += 1;
    } else {
      // Add new product to cart
      cartItems.push({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: 1
      });
    }
    
    // Save updated cart to localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart`,
    });
    
    // Force navbar to update
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Your Wishlist</h1>
        
        {wishlistItems.length === 0 ? (
          <Card className="p-8 text-center">
            <div className="flex flex-col items-center">
              <Heart className="h-16 w-16 text-gray-300 mb-4" />
              <h2 className="text-xl font-semibold mb-2">Your wishlist is empty</h2>
              <p className="text-gray-500 mb-6">Looks like you haven't added any products to your wishlist yet.</p>
              <Button variant="primary" asChild>
                <Link to="/products">Browse Products</Link>
              </Button>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative h-48">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover" 
                  />
                  <button 
                    className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white flex items-center justify-center"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </button>
                </div>
                <div className="p-4">
                  <Link to={`/products/${item.id}`}>
                    <h3 className="font-semibold hover:text-farmandi-green">{item.name}</h3>
                  </Link>
                  <div className="flex justify-between items-center mt-4">
                    <p className="font-semibold text-farmandi-brown">₹{item.price}</p>
                    <Button 
                      variant="customer" 
                      size="sm" 
                      onClick={() => handleAddToCart(item)}
                    >
                      <ShoppingBag className="h-3.5 w-3.5 mr-1" /> Add to Cart
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Wishlist;
