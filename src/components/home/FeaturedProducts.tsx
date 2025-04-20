import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';

const products = [
  {
    id: 1,
    name: 'Organic Tomatoes',
    image: 'https://images.unsplash.com/photo-1524593166156-312f362cada0?auto=format&fit=crop&q=80&w=300',
    price: 45,
    unit: 'per kg',
    farmer: 'Green Valley Farms',
    location: 'Karnataka'
  },
  {
    id: 2,
    name: 'Fresh Strawberries',
    image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&q=80&w=300',
    price: 120,
    unit: 'per box',
    farmer: 'Hill Side Orchards',
    location: 'Himachal Pradesh'
  },
  {
    id: 3,
    name: 'Organic Carrots',
    image: 'https://images.unsplash.com/photo-1598170845058-cbf39bd68459?auto=format&fit=crop&q=80&w=300',
    price: 35,
    unit: 'per kg',
    farmer: "Nature's Bounty",
    location: 'Punjab'
  },
  {
    id: 4,
    name: 'Farm Fresh Apples',
    image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&q=80&w=300',
    price: 80,
    unit: 'per kg',
    farmer: 'Mountain View Farms',
    location: 'Uttarakhand'
  },
];

const FeaturedProducts = () => {
  const navigate = useNavigate();

  const handleAddToCart = (product: any) => {
    toast.success(`Added ${product.name} to cart!`);
  };

  const handleViewProduct = (productId: number) => {
    navigate(`/products/${productId}`);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-farmandi-cream to-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-farmandi-brown mb-4">Featured Products</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Direct from farms to your table. Experience the freshness and quality of produce 
            sourced directly from local farmers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="h-56 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300" 
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  <div className="text-farmandi-green font-bold">₹{product.price}</div>
                </div>
                <p className="text-gray-500 text-sm">{product.unit}</p>
                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                  <div className="text-xs text-gray-500">
                    <p>Farmer: {product.farmer}</p>
                    <p>Location: {product.location}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-farmandi-green hover:text-farmandi-green-dark"
                      onClick={() => handleViewProduct(product.id)}
                    >
                      View
                    </Button>
                    <Button 
                      variant="customer" 
                      size="sm" 
                      onClick={() => handleAddToCart(product)}
                    >
                      <ShoppingCart className="h-4 w-4 mr-1" /> Add
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="primary" className="px-8">
            <Link to="/products">Browse All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
