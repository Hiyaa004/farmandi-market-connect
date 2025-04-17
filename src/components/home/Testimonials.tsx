
import React from 'react';

const testimonials = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    role: 'Farmer',
    location: 'Punjab',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    quote: 'Farmandi has changed how I sell my produce. I now get better prices and can directly connect with my customers. The platform is easy to use even for someone like me who is not tech-savvy.'
  },
  {
    id: 2,
    name: 'Priya Sharma',
    role: 'Customer',
    location: 'Bangalore',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
    quote: 'I love knowing exactly where my food comes from. The quality of produce from Farmandi is exceptional, and I feel good supporting local farmers. The quality verification feature gives me confidence in my purchases.'
  },
  {
    id: 3,
    name: 'Amit Patel',
    role: 'Farmer',
    location: 'Gujarat',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=150',
    quote: "The crop analysis tool helped me understand what crops are in demand in my region. This season, I've sold 40% more produce through Farmandi than through traditional markets."
  }
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-farmandi-cream">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-farmandi-brown mb-4">What Our Community Says</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear from the farmers and customers who are part of our growing community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex flex-col h-full">
                <div className="mb-6">
                  <p className="text-gray-600 italic">"{testimonial.quote}"</p>
                </div>
                
                <div className="mt-auto flex items-center">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="h-12 w-12 rounded-full object-cover mr-4" 
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">
                      {testimonial.role} • {testimonial.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
