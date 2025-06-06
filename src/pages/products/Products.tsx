
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Search, Filter, Star, ShoppingCart, Heart } from 'lucide-react';
import { Card } from '@/components/ui/card';

// Sample products data
const productsData = [
  {
    id: 1,
    name: 'Organic Tomatoes',
    image: 'https://images.unsplash.com/photo-1524593166156-312f362cada0?auto=format&fit=crop&q=80&w=400',
    price: 45,
    unit: 'per kg',
    farmer: 'Green Valley Farms',
    location: 'Karnataka',
    rating: 4.8,
    category: 'vegetables',
    isOrganic: true
  },
  {
    id: 2,
    name: 'Fresh Strawberries',
    image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&q=80&w=400',
    price: 120,
    unit: 'per box',
    farmer: 'Hill Side Orchards',
    location: 'Himachal Pradesh',
    rating: 4.7,
    category: 'fruits',
    isOrganic: true
  },
  {
    id: 3,
    name: 'Organic Carrots',
    image: 'https://images.unsplash.com/photo-1598170845058-cbf39bd68459?auto=format&fit=crop&q=80&w=400',
    price: 35,
    unit: 'per kg',
    farmer: "Nature's Bounty",
    location: 'Punjab',
    rating: 4.5,
    category: 'vegetables',
    isOrganic: true
  },
  {
    id: 4,
    name: 'Farm Fresh Apples',
    image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&q=80&w=400',
    price: 80,
    unit: 'per kg',
    farmer: 'Mountain View Farms',
    location: 'Uttarakhand',
    rating: 4.6,
    category: 'fruits',
    isOrganic: false
  },
  {
    id: 5,
    name: 'Fresh Potatoes',
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&q=80&w=400',
    price: 30,
    unit: 'per kg',
    farmer: 'Golden Harvest',
    location: 'Uttar Pradesh',
    rating: 4.3,
    category: 'vegetables',
    isOrganic: false
  },
  {
    id: 6,
    name: 'Organic Spinach',
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&q=80&w=400',
    price: 25,
    unit: 'per bunch',
    farmer: 'Green Fields',
    location: 'Maharashtra',
    rating: 4.4,
    category: 'greens',
    isOrganic: true
  },
  {
    id: 7,
    name: 'Fresh Milk',
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&q=80&w=400',
    price: 60,
    unit: 'per liter',
    farmer: 'Happy Cows Dairy',
    location: 'Gujarat',
    rating: 4.9,
    category: 'dairy',
    isOrganic: true
  },
  {
    id: 8,
    name: 'Brown Rice',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e8ac?auto=format&fit=crop&q=80&w=400',
    price: 95,
    unit: 'per kg',
    farmer: 'Paddy Fields Co-op',
    location: 'West Bengal',
    rating: 4.6,
    category: 'grains',
    isOrganic: true
  },
];

// Categories
const categories = [
  { id: 'all', label: 'All Products' },
  { id: 'vegetables', label: 'Vegetables' },
  { id: 'fruits', label: 'Fruits' },
  { id: 'greens', label: 'Leafy Greens' },
  { id: 'dairy', label: 'Dairy' },
  { id: 'grains', label: 'Grains & Pulses' },
];

// Sort options
const sortOptions = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'price-low-high', label: 'Price: Low to High' },
  { value: 'price-high-low', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'newest', label: 'Newest Arrivals' },
];

const Products = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recommended');
  const [filters, setFilters] = useState({
    organic: false,
    priceRange: [0, 200]
  });
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Filter products based on search, category, and filters
  const filteredProducts = productsData.filter(product => {
    const matchesSearch = searchQuery === '' || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.farmer.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    
    const matchesOrganic = !filters.organic || product.isOrganic;
    
    const matchesPriceRange = 
      product.price >= filters.priceRange[0] && 
      product.price <= filters.priceRange[1];
    
    return matchesSearch && matchesCategory && matchesOrganic && matchesPriceRange;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low-high':
        return a.price - b.price;
      case 'price-high-low':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0; // Default or 'recommended'
    }
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Banner */}
        <section className="bg-gradient-to-r from-farmandi-green/10 to-farmandi-brown/10 py-10">
          <div className="container mx-auto px-6">
            <h1 className="text-3xl md:text-4xl font-bold text-farmandi-brown mb-4">
              Fresh Products
            </h1>
            <p className="text-gray-600 mb-6 max-w-2xl">
              Browse our wide selection of farm-fresh produce, directly sourced from local farmers 
              across India. Quality and freshness guaranteed.
            </p>
            
            <div className="flex flex-col md:flex-row gap-4 max-w-xl">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                <Input 
                  type="text" 
                  placeholder="Search for products, farmers, etc."
                  className="pl-10 py-6"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button 
                variant="outline" 
                className="md:hidden"
                onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
              >
                <Filter className="h-4 w-4 mr-2" /> Filters
              </Button>
            </div>
          </div>
        </section>

        {/* Product Listing Section */}
        <section className="py-12">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Sidebar Filters - Desktop */}
              <div className="hidden md:block w-64 shrink-0">
                <div className="sticky top-6 space-y-8">
                  {/* Categories */}
                  <div>
                    <h3 className="font-semibold text-lg mb-4">Categories</h3>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <button
                          key={category.id}
                          className={`block w-full text-left px-3 py-2 rounded-md ${
                            activeCategory === category.id 
                              ? 'bg-farmandi-green text-white' 
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                          onClick={() => setActiveCategory(category.id)}
                        >
                          {category.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Filters */}
                  <div>
                    <h3 className="font-semibold text-lg mb-4">Filters</h3>
                    
                    <div className="space-y-6">
                      {/* Organic Filter */}
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="organic" 
                          checked={filters.organic}
                          onCheckedChange={(checked) => 
                            setFilters({...filters, organic: checked as boolean})
                          }
                        />
                        <label 
                          htmlFor="organic" 
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Organic Products Only
                        </label>
                      </div>
                      
                      {/* Price Range */}
                      <div>
                        <h4 className="text-sm font-medium mb-2">Price Range</h4>
                        <div className="flex items-center gap-2">
                          <Input 
                            type="number" 
                            min="0"
                            value={filters.priceRange[0]}
                            onChange={(e) => setFilters({
                              ...filters, 
                              priceRange: [Number(e.target.value), filters.priceRange[1]]
                            })}
                            className="w-20"
                          />
                          <span>to</span>
                          <Input 
                            type="number" 
                            min="0"
                            value={filters.priceRange[1]}
                            onChange={(e) => setFilters({
                              ...filters, 
                              priceRange: [filters.priceRange[0], Number(e.target.value)]
                            })}
                            className="w-20"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Filters */}
              {mobileFiltersOpen && (
                <div className="md:hidden p-4 bg-white rounded-lg border border-gray-200 mb-6">
                  <div className="space-y-6">
                    {/* Categories */}
                    <div>
                      <h3 className="font-semibold text-lg mb-3">Categories</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {categories.map((category) => (
                          <button
                            key={category.id}
                            className={`text-left px-3 py-2 rounded-md text-sm ${
                              activeCategory === category.id 
                                ? 'bg-farmandi-green text-white' 
                                : 'bg-gray-100 text-gray-700'
                            }`}
                            onClick={() => setActiveCategory(category.id)}
                          >
                            {category.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Filters */}
                    <div>
                      <h3 className="font-semibold text-lg mb-3">Filters</h3>
                      
                      <div className="space-y-4">
                        {/* Organic Filter */}
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="organic-mobile" 
                            checked={filters.organic}
                            onCheckedChange={(checked) => 
                              setFilters({...filters, organic: checked as boolean})
                            }
                          />
                          <label 
                            htmlFor="organic-mobile" 
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Organic Products Only
                          </label>
                        </div>
                        
                        {/* Price Range */}
                        <div>
                          <h4 className="text-sm font-medium mb-2">Price Range</h4>
                          <div className="flex items-center gap-2">
                            <Input 
                              type="number" 
                              min="0"
                              value={filters.priceRange[0]}
                              onChange={(e) => setFilters({
                                ...filters, 
                                priceRange: [Number(e.target.value), filters.priceRange[1]]
                              })}
                              className="w-20"
                            />
                            <span>to</span>
                            <Input 
                              type="number" 
                              min="0"
                              value={filters.priceRange[1]}
                              onChange={(e) => setFilters({
                                ...filters, 
                                priceRange: [filters.priceRange[0], Number(e.target.value)]
                              })}
                              className="w-20"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-200">
                      <Button 
                        variant="customer" 
                        className="w-full"
                        onClick={() => setMobileFiltersOpen(false)}
                      >
                        Apply Filters
                      </Button>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Product Grid */}
              <div className="flex-grow">
                {/* Sort and Results Count */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                  <p className="text-gray-600 mb-4 sm:mb-0">
                    Showing {sortedProducts.length} results
                  </p>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Sort by:</span>
                    <select
                      className="rounded-md border-gray-300 text-sm"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                    >
                      {sortOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                {/* Products Grid */}
                {sortedProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sortedProducts.map((product) => (
                      <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="relative">
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-full h-56 object-cover" 
                          />
                          {product.isOrganic && (
                            <span className="absolute top-2 left-2 bg-farmandi-green text-white text-xs px-2 py-1 rounded-full">
                              Organic
                            </span>
                          )}
                          <button className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/80 flex items-center justify-center">
                            <Heart className="h-4 w-4 text-farmandi-brown" />
                          </button>
                        </div>
                        <div className="p-4">
                          <div className="flex justify-between items-start mb-1">
                            <h3 className="font-semibold">{product.name}</h3>
                            <div className="flex items-center text-amber-500">
                              <Star className="h-4 w-4 fill-current" />
                              <span className="text-xs ml-1">{product.rating}</span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-500 mb-2">{product.farmer}</p>
                          <div className="flex items-center text-xs text-gray-500 mb-4">
                            <span className="inline-block">{product.location}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <div>
                              <span className="font-bold text-farmandi-brown">₹{product.price}</span>
                              <span className="text-xs text-gray-500 ml-1">{product.unit}</span>
                            </div>
                            <Button variant="customer" size="sm" className="flex items-center">
                              <ShoppingCart className="h-4 w-4 mr-1" /> Add
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500 mb-4">No products found matching your criteria.</p>
                    <Button variant="outline" onClick={() => {
                      setSearchQuery('');
                      setActiveCategory('all');
                      setFilters({ organic: false, priceRange: [0, 200] });
                    }}>
                      Reset Filters
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Products;
