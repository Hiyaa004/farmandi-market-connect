
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Search, Heart, ShoppingBag, Camera, MapPin, 
  Clock, Star, TrendingUp 
} from 'lucide-react';
import { toast } from 'sonner';

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleNearbyFarms = () => {
    toast.info("Finding farms near you...");
    // In a real app, we would use geolocation to find nearby farms
    setTimeout(() => {
      navigate('/nearby-farms');
    }, 1500);
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    toast.success(`Browsing ${category} products`);
    navigate(`/products?category=${category.toLowerCase()}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Customer Dashboard Header */}
      <header className="bg-farmandi-brown text-white">
        <div className="container mx-auto px-6 py-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Welcome Back, Priya</h1>
              <p className="text-white/80">Discover fresh produce from local farmers</p>
            </div>
            <div className="flex space-x-4">
              <Button variant="outline" className="bg-white/10 text-white border-white/20">
                <Heart className="h-4 w-4 mr-2" /> Wishlist
              </Button>
              <Button variant="outline" className="bg-white/10 text-white border-white/20">
                <ShoppingBag className="h-4 w-4 mr-2" /> My Orders
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Search and Quality Scanner */}
      <div className="bg-white shadow-sm py-6">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-grow">
              <input 
                type="text" 
                placeholder="Search for fruits, vegetables, etc."
                className="w-full px-4 py-3 pl-10 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-farmandi-brown"
              />
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            </div>
            <Button 
              variant="outline" 
              className="bg-white text-farmandi-brown border-farmandi-brown flex gap-2 md:w-auto w-full"
              onClick={handleNearbyFarms}
            >
              <MapPin className="h-4 w-4" /> Nearby Farms
            </Button>
            <Button 
              variant="customer" 
              className="flex gap-2 md:w-auto w-full"
              onClick={() => navigate('/customer/quality-scanner')}
            >
              <Camera className="h-4 w-4" /> Quality Scanner
            </Button>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Categories */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-6">Browse Categories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {['Vegetables', 'Fruits', 'Dairy', 'Herbs', 'Grains', 'Organic'].map((category, index) => (
              <Card 
                key={index} 
                className="p-4 text-center hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleCategoryClick(category)}
              >
                <div className={`w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center ${
                  index % 2 === 0 ? 'bg-farmandi-green/10' : 'bg-farmandi-brown/10'
                }`}>
                  <img 
                    src={`https://via.placeholder.com/36/4CAF50/FFFFFF?text=${category.charAt(0)}`} 
                    alt={category} 
                    className="h-9 w-9 rounded-full" 
                  />
                </div>
                <h3 className="font-medium text-sm">{category}</h3>
              </Card>
            ))}
          </div>
        </section>

        {/* Recently Viewed and Recommended */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Recently Viewed</h2>
            <Button variant="link" className="text-farmandi-brown">View All</Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((_, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative h-48">
                  <img 
                    src={`https://images.unsplash.com/photo-${1550900110 + index * 1000}?auto=format&fit=crop&w=300&q=80`} 
                    alt={`Product ${index + 1}`} 
                    className="w-full h-full object-cover" 
                  />
                  <button className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/80 flex items-center justify-center">
                    <Heart className="h-4 w-4 text-farmandi-brown" />
                  </button>
                </div>
                <div className="p-4">
                  <div className="flex justify-between mb-1">
                    <h3 className="font-medium">Organic {['Apples', 'Tomatoes', 'Carrots', 'Potatoes'][index]}</h3>
                    <div className="flex items-center text-amber-500">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="text-xs ml-1">{4.5 - index * 0.1}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">Sunrise Farms</p>
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-farmandi-brown">₹{(index + 2) * 25}/kg</p>
                    <Button 
                      variant="customer" 
                      size="sm"
                      onClick={() => toast.success(`Added to cart!`)}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Farm Spotlights */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-6">Farm Spotlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map((_, index) => (
              <Card key={index} className="flex flex-col md:flex-row overflow-hidden hover:shadow-md transition-shadow">
                <div className="md:w-1/3 h-48 md:h-auto">
                  <img 
                    src={`https://images.unsplash.com/photo-${1550900410 + index * 2000}?auto=format&fit=crop&w=300&q=80`} 
                    alt={`Farm ${index + 1}`} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="p-6 md:w-2/3">
                  <h3 className="font-semibold text-lg mb-2">{['Green Valley Farms', 'Sunrise Organics'][index]}</h3>
                  <div className="flex items-center mb-3">
                    <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                    <span className="text-sm text-gray-500">{['Karnataka', 'Punjab'][index]}</span>
                    <span className="mx-2 text-gray-300">•</span>
                    <Clock className="h-4 w-4 text-gray-500 mr-1" />
                    <span className="text-sm text-gray-500">{['3 years', '5 years'][index]} with Farmandi</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    {index === 0 
                      ? 'Specializing in organic vegetables grown using traditional farming methods.' 
                      : 'A family-owned farm delivering fresh fruits and dairy products daily.'}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {['Organic', 'Vegetables', 'Sustainable'].map((tag, i) => (
                      <span key={i} className="text-xs bg-farmandi-green/10 text-farmandi-green px-2 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full md:w-auto"
                    onClick={() => navigate(`/farm-visit/${index + 1}`)}
                  >
                    Visit Farm Store
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Quality Scanner Promo */}
        <section className="mb-12">
          <Card className="bg-gradient-to-r from-farmandi-brown/20 to-farmandi-cream p-8">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-2/3 mb-6 md:mb-0 md:pr-6">
                <h2 className="text-2xl font-bold mb-4">Quality Scanner</h2>
                <p className="text-gray-700 mb-4">
                  Use our AI-powered quality scanner to check the freshness and quality of fruits and vegetables. 
                  Simply take a photo, and we'll analyze it for you.
                </p>
                <Button 
                  variant="customer"
                  onClick={() => navigate('/customer/quality-scanner')}
                >
                  <Camera className="h-4 w-4 mr-2" /> Open Scanner
                </Button>
              </div>
              <div className="md:w-1/3">
                <img 
                  src="https://images.unsplash.com/photo-1579113800032-c38bd7635818?auto=format&fit=crop&w=400&q=80" 
                  alt="Quality scanner" 
                  className="rounded-lg shadow-lg" 
                />
              </div>
            </div>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default CustomerDashboard;
