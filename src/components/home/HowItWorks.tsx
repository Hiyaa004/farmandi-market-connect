
import React from 'react';
import { Sprout, ShoppingCart, Truck } from 'lucide-react';

const steps = [
  {
    icon: <Sprout className="h-12 w-12 text-farmandi-green" />,
    title: 'Farm Fresh Produce',
    description: 'Our farmers harvest crops at peak freshness to ensure the highest quality produce reaches your table.'
  },
  {
    icon: <ShoppingCart className="h-12 w-12 text-farmandi-green" />,
    title: 'Direct Purchase',
    description: 'Skip the middleman and buy directly from farmers, ensuring fair prices for both you and the producer.'
  },
  {
    icon: <Truck className="h-12 w-12 text-farmandi-green" />,
    title: 'Quick Delivery',
    description: 'Get your fresh produce delivered to your doorstep, often within 24-48 hours of harvesting.'
  }
];

const HowItWorks = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-farmandi-brown mb-4">How Farmandi Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A simple three-step process that connects farmers directly to customers, 
            cutting out middlemen and ensuring freshness.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="bg-farmandi-cream rounded-lg p-8 text-center hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex justify-center mb-6">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold text-farmandi-brown mb-4">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>

        {/* Farmer and Customer Journey */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-farmandi-green/10 rounded-lg p-8">
            <h3 className="text-xl font-semibold text-farmandi-green mb-4">For Farmers</h3>
            <ol className="list-decimal pl-5 space-y-3 text-gray-700">
              <li>Register and verify your farm identity</li>
              <li>List your available produce and set fair prices</li>
              <li>Receive orders directly from customers</li>
              <li>Harvest and prepare orders for delivery</li>
              <li>Track your sales and grow your customer base</li>
            </ol>
          </div>
          
          <div className="bg-farmandi-brown/10 rounded-lg p-8">
            <h3 className="text-xl font-semibold text-farmandi-brown mb-4">For Customers</h3>
            <ol className="list-decimal pl-5 space-y-3 text-gray-700">
              <li>Create your account and browse available produce</li>
              <li>Select items from farmers in your region</li>
              <li>Use our quality scanner for produce verification</li>
              <li>Place your order and choose delivery options</li>
              <li>Receive farm-fresh produce at your doorstep</li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
