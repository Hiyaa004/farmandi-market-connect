
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ShoppingBag, Heart, Truck, Shield, RotateCcw, Star } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

// Sample product details (in a real app this would come from an API)
const productsData = [
  {
    id: 1,
    name: 'Organic Tomatoes',
    image: 'https://images.unsplash.com/photo-1524593166156-312f362cada0?auto=format&fit=crop&q=80&w=800',
    price: 45,
    originalPrice: 60,
    unit: 'per kg',
    farmer: 'Green Valley Farms',
    location: 'Karnataka',
    rating: 4.8,
    category: 'vegetables',
    isOrganic: true,
    description: 'Fresh, organic tomatoes grown without pesticides. Rich in flavor and perfect for salads, cooking, or making sauces.',
    benefits: 'Tomatoes are a great source of vitamin C, potassium, folate, and vitamin K. They are also a major dietary source of the antioxidant lycopene, which has been linked to many health benefits, including reduced risk of heart disease and cancer.',
    howToUse: 'Can be used raw in salads, sandwiches, and salsas or cooked in sauces, soups, and stews. Store at room temperature away from direct sunlight.'
  },
  {
    id: 2,
    name: 'Fresh Strawberries',
    image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&q=80&w=800',
    price: 120,
    originalPrice: 150,
    unit: 'per box',
    farmer: 'Hill Side Orchards',
    location: 'Himachal Pradesh',
    rating: 4.7,
    category: 'fruits',
    isOrganic: true,
    description: 'Sweet and juicy strawberries freshly picked from our hill farms. Perfect for desserts or enjoying as is.',
    benefits: 'Strawberries are packed with antioxidants, vitamins, and fiber which helps regulate blood sugar levels. They\'re naturally low in calories, high in vitamin C, and a good source of manganese.',
    howToUse: 'Enjoy fresh as a snack, add to desserts, blend in smoothies, or use as a topping for cereals and yogurt. Store in the refrigerator and wash just before using.'
  },
  {
    id: 3,
    name: 'Organic Carrots',
    image: 'https://images.unsplash.com/photo-1598170845058-cbf39bd68459?auto=format&fit=crop&q=80&w=800',
    price: 35,
    originalPrice: 50,
    unit: 'per kg',
    farmer: "Nature's Bounty",
    location: 'Punjab',
    rating: 4.5,
    category: 'vegetables',
    isOrganic: true,
    description: 'Crisp and sweet organic carrots. Harvested at peak freshness to ensure the best flavor and nutritional value.',
    benefits: 'Carrots are rich in beta-carotene, a compound your body changes into vitamin A. They\'re also a good source of fiber, vitamin K, potassium, and antioxidants.',
    howToUse: 'Eat raw as a snack, shred for salads, juice, or cook in a variety of dishes. Store in the refrigerator for up to 2 weeks.'
  },
  {
    id: 4,
    name: 'Farm Fresh Apples',
    image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&q=80&w=800',
    price: 80,
    originalPrice: 100,
    unit: 'per kg',
    farmer: 'Mountain View Farms',
    location: 'Uttarakhand',
    rating: 4.6,
    category: 'fruits',
    isOrganic: false,
    description: 'Crisp and juicy apples handpicked from our mountain orchards. Sweet with a perfect balance of tartness.',
    benefits: 'Apples are high in fiber, vitamin C, and various antioxidants. They\'re also very filling, making them a weight-loss-friendly food.',
    howToUse: 'Enjoy fresh, add to salads, bake into desserts, or make into sauces and juices. Store in a cool, dry place or refrigerate for longer freshness.'
  },
  {
    id: 5,
    name: 'Fresh Potatoes',
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&q=80&w=800',
    price: 30,
    originalPrice: 40,
    unit: 'per kg',
    farmer: 'Golden Harvest',
    location: 'Uttar Pradesh',
    rating: 4.3,
    category: 'vegetables',
    isOrganic: false,
    description: 'Firm and hearty potatoes perfect for a variety of cooking methods. Sourced directly from our farms for maximum freshness.',
    benefits: 'Potatoes are a good source of fiber, potassium, vitamin C, and vitamin B6. They also contain a variety of phytonutrients that have antioxidant activity.',
    howToUse: 'Bake, boil, mash, roast, or fry. Store in a cool, dark place with good ventilation, not in the refrigerator.'
  },
  {
    id: 6,
    name: 'Organic Spinach',
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&q=80&w=800',
    price: 25,
    originalPrice: 35,
    unit: 'per bunch',
    farmer: 'Green Fields',
    location: 'Maharashtra',
    rating: 4.4,
    category: 'greens',
    isOrganic: true,
    description: 'Fresh, crisp organic spinach leaves. Dark green and full of nutrients, perfect for salads and cooking.',
    benefits: 'Spinach is an excellent source of vitamin K, vitamin A, vitamin C, folate, and is a good source of manganese, magnesium, iron and vitamin B2.',
    howToUse: 'Use raw in salads, blend into smoothies, or cook in a variety of dishes. Store in the refrigerator and wash before use.'
  },
  {
    id: 7,
    name: 'Fresh Milk',
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&q=80&w=800',
    price: 60,
    originalPrice: 70,
    unit: 'per liter',
    farmer: 'Happy Cows Dairy',
    location: 'Gujarat',
    rating: 4.9,
    category: 'dairy',
    isOrganic: true,
    description: 'Fresh, creamy milk from grass-fed cows. Pasteurized for safety while preserving its nutritional value and taste.',
    benefits: 'Milk is a great source of calcium, protein, vitamin D, and other essential nutrients that are important for bone health.',
    howToUse: 'Drink plain, use in coffee or tea, pour over cereal, or use in cooking and baking. Keep refrigerated at all times.'
  },
  {
    id: 8,
    name: 'Brown Rice',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e8ac?auto=format&fit=crop&q=80&w=800',
    price: 95,
    originalPrice: 120,
    unit: 'per kg',
    farmer: 'Paddy Fields Co-op',
    location: 'West Bengal',
    rating: 4.6,
    category: 'grains',
    isOrganic: true,
    description: 'Nutritious whole grain brown rice. Nutty flavor and chewy texture make it a healthy alternative to white rice.',
    benefits: 'Brown rice is rich in fiber, antioxidants, and contains essential minerals like manganese, selenium, and magnesium. It helps with digestion and weight management.',
    howToUse: 'Rinse before cooking. Cook with 2 cups of water for every 1 cup of rice. Store in an airtight container in a cool, dry place.'
  },
  {
    id: 9,
    name: 'Bael Fruit',
    image: '/lovable-uploads/52823382-16c4-485f-b7a5-9be715e64640.png',
    price: 30,
    originalPrice: 50,
    unit: 'per piece',
    farmer: 'Tropical Fruits Collective',
    location: 'Bihar',
    rating: 4.5,
    category: 'fruits',
    isOrganic: true,
    description: 'Bel fruit, (Aegle marmelos), bel also spelled bael, also called Bengal quince, tree of the family Rutaceae, cultivated for its fruit. The plant is native to India and Bangladesh and has naturalized throughout much of Southeast Asia.',
    benefits: 'Bael fruits are a power punch of various nutrients like beta-carotene, protein, riboflavin and vitamin C. It is loaded with vitamin B1 and B2, thiamine, riboflavin, niacin, carotene and possesses good amounts of minerals like calcium, potassium, fiber and good fats.',
    howToUse: 'Can be eaten fresh or made into juice, jam, or syrup. The ripe fruit is sweet and aromatic with a woody shell. Often used in traditional medicine.'
  }
];

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedPackSize, setSelectedPackSize] = useState('1 Piece');
  
  useEffect(() => {
    // In a real app, you would fetch the product details from an API
    const fetchedProduct = productsData.find(p => p.id === Number(productId));
    if (fetchedProduct) {
      setProduct(fetchedProduct);
    } else {
      navigate('/products'); // Redirect if product not found
    }
  }, [productId, navigate]);

  const handleAddToCart = () => {
    if (!product) return;
    
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('userType') !== null;
    
    if (isLoggedIn) {
      // Get existing cart items or initialize empty array
      const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
      
      // Check if product is already in cart
      const existingItemIndex = cartItems.findIndex((item: any) => item.id === product.id);
      
      if (existingItemIndex >= 0) {
        // Update quantity if product is already in cart
        cartItems[existingItemIndex].quantity += quantity;
      } else {
        // Add new product to cart
        cartItems.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: quantity,
          packSize: selectedPackSize
        });
      }
      
      // Save updated cart to localStorage
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart`,
      });
      
      // Force navbar to update
      window.dispatchEvent(new Event('storage'));
    } else {
      // Navigate to user type selection
      navigate('/auth/user-type', { 
        state: { 
          returnPath: `/products/${productId}`,
          action: 'add-to-cart',
          productId: product.id
        } 
      });
    }
  };

  const handleAddToWishlist = () => {
    if (!product) return;
    
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('userType') !== null;
    
    if (isLoggedIn) {
      // Get existing wishlist items or initialize empty array
      const wishlistItems = JSON.parse(localStorage.getItem('wishlistItems') || '[]');
      
      // Check if product is already in wishlist
      const isProductInWishlist = wishlistItems.some((item: any) => item.id === product.id);
      
      if (!isProductInWishlist) {
        // Add new product to wishlist
        wishlistItems.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image
        });
        
        // Save updated wishlist to localStorage
        localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
        
        toast({
          title: "Added to wishlist",
          description: `${product.name} has been added to your wishlist`,
        });
        
        // Force navbar to update
        window.dispatchEvent(new Event('storage'));
      } else {
        toast({
          title: "Already in wishlist",
          description: `${product.name} is already in your wishlist`,
        });
      }
    } else {
      // Navigate to user type selection
      navigate('/auth/user-type', { 
        state: { 
          returnPath: `/products/${productId}`,
          action: 'add-to-wishlist',
          productId: product.id
        } 
      });
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <p>Loading product details...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-auto object-cover"
            />
          </div>
          
          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{product.name}</h1>
              <div className="flex items-center mt-2">
                <div className="flex items-center text-amber-500">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="ml-1 text-sm">{product.rating} Rating</span>
                </div>
                <span className="mx-2 text-gray-300">•</span>
                <span className="text-sm text-gray-500">Sold by {product.farmer}</span>
              </div>
            </div>
            
            <div className="flex items-center">
              <span className="text-3xl font-bold text-farmandi-brown">₹{product.price}</span>
              {product.originalPrice > product.price && (
                <span className="ml-2 text-gray-500 line-through">₹{product.originalPrice}</span>
              )}
              <span className="ml-2 text-sm text-gray-500">{product.unit}</span>
            </div>
            
            {/* Pack Size */}
            <div>
              <h3 className="text-lg font-medium mb-2">Pack Size</h3>
              <div className="flex flex-wrap gap-2">
                {['1 Piece', '500g', '1kg', '2kg'].map((size) => (
                  <Button 
                    key={size}
                    variant={selectedPackSize === size ? "default" : "outline"}
                    onClick={() => setSelectedPackSize(size)}
                    className={selectedPackSize === size ? "bg-farmandi-green" : ""}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>
            
            {/* Quantity */}
            <div>
              <h3 className="text-lg font-medium mb-2">Quantity</h3>
              <div className="flex items-center">
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </Button>
                <span className="mx-4 w-8 text-center">{quantity}</span>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </Button>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="outline" 
                className="flex-1 border-farmandi-brown text-farmandi-brown hover:bg-farmandi-brown/10"
                onClick={handleAddToWishlist}
              >
                <Heart className="mr-2 h-4 w-4" /> Add to Wishlist
              </Button>
              <Button 
                variant="customer" 
                className="flex-1"
                onClick={handleAddToCart}
              >
                <ShoppingBag className="mr-2 h-4 w-4" /> Add to Cart
              </Button>
            </div>
            
            {/* Delivery Info */}
            <Card className="p-4 bg-gray-50">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center">
                  <Truck className="h-5 w-5 text-farmandi-green mr-2" />
                  <div>
                    <p className="text-sm font-medium">Free Delivery</p>
                    <p className="text-xs text-gray-500">On orders above ₹200</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-farmandi-green mr-2" />
                  <div>
                    <p className="text-sm font-medium">Quality Guarantee</p>
                    <p className="text-xs text-gray-500">100% authentic products</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <RotateCcw className="h-5 w-5 text-farmandi-green mr-2" />
                  <div>
                    <p className="text-sm font-medium">Easy Returns</p>
                    <p className="text-xs text-gray-500">Within 24 hours</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
        
        {/* Product Description Sections */}
        <div className="mt-12 space-y-8">
          {/* About this Product */}
          <section>
            <h2 className="text-xl font-semibold mb-4">About this Product</h2>
            <p className="text-gray-700">{product.description}</p>
          </section>
          
          {/* Benefits */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Benefits</h2>
            <p className="text-gray-700">{product.benefits}</p>
          </section>
          
          {/* How to Use */}
          <section>
            <h2 className="text-xl font-semibold mb-4">How to Use</h2>
            <p className="text-gray-700">{product.howToUse}</p>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
