
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

const Hero = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearch = () => {
    if (searchQuery) {
      navigate(`/products?search=${searchQuery}`);
    } else {
      navigate('/products');
    }
  };

  return (
    <section className="relative h-[70vh] min-h-[500px] bg-gradient-to-r from-farmandi-green/80 to-farmandi-brown/80 overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0" 
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1465379962078-7f2c2d9a46e6?auto=format&fit=crop&q=80&w=2000')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.7)"
        }}
      />

      <div className="container mx-auto px-6 relative z-10 h-full flex flex-col justify-center">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Fresh from Farm to Table
          </h1>
          <p className="text-xl text-white/90 mb-8">
            Connecting farmers directly to customers. Get fresh, locally sourced produce 
            at fair prices while supporting sustainable farming.
          </p>
          
          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-grow">
              <input 
                type="text" 
                placeholder="Search for fresh produce..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-10 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-farmandi-green"
              />
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            </div>
            <Button variant="farmer" size="lg" className="sm:w-auto w-full" onClick={handleSearch}>
              Search
            </Button>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild variant="customer" size="lg">
              <Link to="/products" className="w-full sm:w-auto">
                Shop Now
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-white/20 text-white border-white">
              <Link to="/farmer/register" className="w-full sm:w-auto">
                Become a Seller
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
