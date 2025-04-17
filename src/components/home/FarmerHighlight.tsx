
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const FarmerHighlight = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-farmandi-green/10 to-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=800" 
              alt="Farmer in field" 
              className="rounded-lg shadow-lg"
            />
          </div>
          
          <div>
            <span className="text-farmandi-green font-semibold">JOIN OUR COMMUNITY</span>
            <h2 className="text-3xl md:text-4xl font-bold text-farmandi-brown mt-2 mb-6">
              Are You a Farmer Looking to Reach More Customers?
            </h2>
            <p className="text-gray-600 mb-6">
              Farmandi offers farmers a direct channel to sell your produce to customers without 
              any middlemen. Get fair prices for your hard work and connect with consumers who value 
              quality and sustainability.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <div className="h-6 w-6 rounded-full bg-farmandi-green text-white flex items-center justify-center mr-3 mt-1">✓</div>
                <div>
                  <h4 className="font-semibold">Higher Profit Margins</h4>
                  <p className="text-gray-600 text-sm">Sell directly to consumers and keep more of your earnings.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="h-6 w-6 rounded-full bg-farmandi-green text-white flex items-center justify-center mr-3 mt-1">✓</div>
                <div>
                  <h4 className="font-semibold">Simple Listing Process</h4>
                  <p className="text-gray-600 text-sm">Easily list your products and manage your inventory.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="h-6 w-6 rounded-full bg-farmandi-green text-white flex items-center justify-center mr-3 mt-1">✓</div>
                <div>
                  <h4 className="font-semibold">Crop Analysis & Recommendations</h4>
                  <p className="text-gray-600 text-sm">Get insights on market demand and optimize your farming.</p>
                </div>
              </div>
            </div>
            
            <Button asChild variant="farmer" size="lg">
              <Link to="/farmer/register">Become a Seller</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FarmerHighlight;
