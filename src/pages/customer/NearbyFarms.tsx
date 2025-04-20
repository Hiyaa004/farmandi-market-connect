
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  ChevronLeft, MapPin, Star, 
  Clock, Check, Filter, Mail, Phone, 
  Navigation 
} from 'lucide-react';

const farms = [
  {
    id: 1,
    name: 'Green Valley Farms',
    image: 'https://images.unsplash.com/photo-1500076656116-558758c991c1?auto=format&fit=crop&w=600&q=80',
    location: 'Bangalore, Karnataka',
    distance: 4.5,
    rating: 4.7,
    reviews: 42,
    products: ['Tomatoes', 'Carrots', 'Spinach', 'Potatoes'],
    organic: true,
    contactEmail: 'contact@greenvalleyfarms.com',
    contactPhone: '+91 9876543210',
    description: 'Specializing in organic vegetables grown using traditional farming methods.'
  },
  {
    id: 2,
    name: 'Sunrise Organics',
    image: 'https://images.unsplash.com/photo-1485637701894-09ad422f6de6?auto=format&fit=crop&w=600&q=80',
    location: 'Mysore, Karnataka',
    distance: 8.2,
    rating: 4.5,
    reviews: 38,
    products: ['Apples', 'Strawberries', 'Milk', 'Yogurt'],
    organic: true,
    contactEmail: 'hello@sunriseorganics.com',
    contactPhone: '+91 9876543211',
    description: 'A family-owned farm delivering fresh fruits and dairy products daily.'
  },
  {
    id: 3,
    name: 'Happy Harvest Farms',
    image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=600&q=80',
    location: 'Hubli, Karnataka',
    distance: 12.5,
    rating: 4.2,
    reviews: 27,
    products: ['Rice', 'Wheat', 'Corn', 'Millets'],
    organic: false,
    contactEmail: 'info@happyharvest.com',
    contactPhone: '+91 9876543212',
    description: 'Traditional farm focusing on staple grains and cereals with sustainable practices.'
  },
  {
    id: 4,
    name: 'Fertile Fields',
    image: 'https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?auto=format&fit=crop&w=600&q=80',
    location: 'Mangalore, Karnataka',
    distance: 15.8,
    rating: 4.0,
    reviews: 19,
    products: ['Coconuts', 'Bananas', 'Pineapples', 'Spices'],
    organic: false,
    contactEmail: 'support@fertilefields.com',
    contactPhone: '+91 9876543213',
    description: 'Coastal farm specializing in tropical fruits and aromatic spices.'
  },
  {
    id: 5,
    name: 'Mountain View Orchards',
    image: 'https://images.unsplash.com/photo-1470549638415-0a0755be0619?auto=format&fit=crop&w=600&q=80',
    location: 'Coorg, Karnataka',
    distance: 20.1,
    rating: 4.9,
    reviews: 56,
    products: ['Coffee', 'Oranges', 'Honey', 'Spices'],
    organic: true,
    contactEmail: 'visit@mountainvieworchards.com',
    contactPhone: '+91 9876543214',
    description: 'Hill station farm known for their premium coffee beans and citrus fruits.'
  }
];

const NearbyFarms = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOrganic, setFilterOrganic] = useState(false);
  const [filterDistance, setFilterDistance] = useState('');
  
  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Filter farms based on search and filters
  const filteredFarms = farms.filter(farm => {
    const matchesSearch = 
      farm.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      farm.products.some(product => product.toLowerCase().includes(searchTerm.toLowerCase())) ||
      farm.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesOrganic = filterOrganic ? farm.organic : true;
    
    const matchesDistance = 
      filterDistance === '' ? true :
      filterDistance === '0-5' ? farm.distance <= 5 :
      filterDistance === '5-10' ? farm.distance > 5 && farm.distance <= 10 :
      filterDistance === '10-20' ? farm.distance > 10 && farm.distance <= 20 :
      farm.distance > 20;
    
    return matchesSearch && matchesOrganic && matchesDistance;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-farmandi-brown text-white">
        <div className="container mx-auto px-6 py-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Nearby Farms</h1>
              <p className="text-white/80">Discover local farms and fresh produce around you</p>
            </div>
            <Button 
              variant="outline" 
              className="bg-white/10 text-white border-white/20"
              onClick={() => navigate('/customer/dashboard')}
            >
              <ChevronLeft className="h-4 w-4 mr-2" /> Back to Dashboard
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Search and Filters */}
        <Card className="mb-8">
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="md:flex-1">
                <input
                  type="text"
                  placeholder="Search for farms, products, or locations..."
                  className="w-full px-4 py-2 border rounded-md"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex gap-4">
                <select
                  className="px-3 py-2 border rounded-md"
                  value={filterDistance}
                  onChange={(e) => setFilterDistance(e.target.value)}
                >
                  <option value="">Any Distance</option>
                  <option value="0-5">0-5 km</option>
                  <option value="5-10">5-10 km</option>
                  <option value="10-20">10-20 km</option>
                  <option value="20+">20+ km</option>
                </select>
                
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="organic-filter"
                    checked={filterOrganic}
                    onChange={(e) => setFilterOrganic(e.target.checked)}
                    className="h-4 w-4 text-farmandi-brown"
                  />
                  <label htmlFor="organic-filter" className="text-sm">
                    Organic Only
                  </label>
                </div>
                
                <Button variant="outline" className="flex gap-2">
                  <Filter className="h-4 w-4" /> More Filters
                </Button>
              </div>
            </div>
          </div>
        </Card>
        
        {isLoading ? (
          <div className="py-12 text-center">
            <div className="animate-spin h-8 w-8 border-4 border-farmandi-brown border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600">Finding farms near you...</p>
          </div>
        ) : (
          <>
            {filteredFarms.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-gray-600 mb-4">No farms found matching your criteria.</p>
                <Button 
                  variant="outline"
                  onClick={() => {
                    setSearchTerm('');
                    setFilterOrganic(false);
                    setFilterDistance('');
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredFarms.map((farm) => (
                  <Card key={farm.id} className="overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/3 h-60 md:h-auto">
                        <img 
                          src={farm.image} 
                          alt={farm.name} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      
                      <div className="md:w-2/3 p-6">
                        <div className="flex justify-between items-start mb-2">
                          <h2 className="text-xl font-bold">{farm.name}</h2>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-amber-500 fill-amber-500 mr-1" />
                            <span className="font-medium">{farm.rating}</span>
                            <span className="text-gray-500 text-sm ml-1">({farm.reviews} reviews)</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center mb-4">
                          <MapPin className="h-4 w-4 text-farmandi-brown mr-1" />
                          <span className="text-gray-700 mr-3">{farm.location}</span>
                          <span className="text-gray-500 text-sm flex items-center">
                            <Navigation className="h-3 w-3 mr-1" />
                            {farm.distance} km away
                          </span>
                        </div>
                        
                        <p className="text-gray-600 mb-4">{farm.description}</p>
                        
                        <div className="mb-4">
                          <h3 className="text-sm font-medium mb-2">Available Products:</h3>
                          <div className="flex flex-wrap gap-2">
                            {farm.products.map((product, idx) => (
                              <span key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-700">
                                {product}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        {farm.organic && (
                          <div className="flex items-center text-green-700 text-sm mb-4">
                            <Check className="h-4 w-4 mr-1" />
                            Certified Organic Farm
                          </div>
                        )}
                        
                        <div className="flex flex-col sm:flex-row gap-3">
                          <Button 
                            variant="outline" 
                            className="flex gap-2"
                            onClick={() => window.location.href = `mailto:${farm.contactEmail}`}
                          >
                            <Mail className="h-4 w-4" /> Email
                          </Button>
                          <Button 
                            variant="outline" 
                            className="flex gap-2"
                            onClick={() => window.location.href = `tel:${farm.contactPhone}`}
                          >
                            <Phone className="h-4 w-4" /> Call
                          </Button>
                          <Button 
                            variant="customer"
                            onClick={() => navigate(`/farm-visit/${farm.id}`)}
                          >
                            Schedule Visit
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default NearbyFarms;
