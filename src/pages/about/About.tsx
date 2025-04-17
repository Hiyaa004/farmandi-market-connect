
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { MapPin, Users, Leaf, BarChart3 } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-r from-farmandi-green/80 to-farmandi-brown/80">
          <div 
            className="absolute inset-0 z-0" 
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&q=80&w=2000')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "brightness(0.4)"
            }}
          />
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Our Mission
              </h1>
              <p className="text-xl text-white/90">
                At Farmandi, we're bridging the gap between farmers and consumers, 
                creating a sustainable ecosystem that benefits everyone. Our mission is 
                to revolutionize the agricultural marketplace by eliminating middlemen 
                and ensuring fair prices, freshness, and transparency.
              </p>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-farmandi-brown mb-6">Our Story</h2>
                <p className="text-gray-600 mb-4">
                  Farmandi was born out of a simple observation: despite the hard work of farmers, 
                  they often receive only a small fraction of the final price consumers pay. 
                  Meanwhile, consumers get produce that has traveled through many hands, reducing 
                  freshness and increasing costs.
                </p>
                <p className="text-gray-600 mb-4">
                  In 2023, our founding team of agricultural experts and tech innovators 
                  came together with a vision to create a direct farmer-to-consumer marketplace. 
                  We started in three states with just 50 farmers. Today, we connect thousands 
                  of farmers across India directly to consumers, cutting out middlemen and 
                  transforming the agricultural value chain.
                </p>
                <p className="text-gray-700 font-medium">
                  Our name "Farmandi" combines "Farm" and "Mandi" (market), representing 
                  our core mission: bringing the farm market directly to consumers.
                </p>
              </div>
              <div className="order-first md:order-last">
                <img 
                  src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=800" 
                  alt="Rural farm landscape" 
                  className="rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Impact Numbers */}
        <section className="py-16 bg-farmandi-cream">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-farmandi-brown mb-12">Our Impact</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white rounded-lg p-8 text-center shadow-md">
                <div className="bg-farmandi-green/10 rounded-full p-4 w-16 h-16 mx-auto flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-farmandi-green" />
                </div>
                <div className="text-4xl font-bold text-farmandi-green mb-2">5,000+</div>
                <p className="text-gray-600">Farmers Connected</p>
              </div>
              
              <div className="bg-white rounded-lg p-8 text-center shadow-md">
                <div className="bg-farmandi-brown/10 rounded-full p-4 w-16 h-16 mx-auto flex items-center justify-center mb-4">
                  <MapPin className="h-8 w-8 text-farmandi-brown" />
                </div>
                <div className="text-4xl font-bold text-farmandi-brown mb-2">15</div>
                <p className="text-gray-600">States Covered</p>
              </div>
              
              <div className="bg-white rounded-lg p-8 text-center shadow-md">
                <div className="bg-farmandi-green/10 rounded-full p-4 w-16 h-16 mx-auto flex items-center justify-center mb-4">
                  <Leaf className="h-8 w-8 text-farmandi-green" />
                </div>
                <div className="text-4xl font-bold text-farmandi-green mb-2">30%</div>
                <p className="text-gray-600">Reduced Food Wastage</p>
              </div>
              
              <div className="bg-white rounded-lg p-8 text-center shadow-md">
                <div className="bg-farmandi-brown/10 rounded-full p-4 w-16 h-16 mx-auto flex items-center justify-center mb-4">
                  <BarChart3 className="h-8 w-8 text-farmandi-brown" />
                </div>
                <div className="text-4xl font-bold text-farmandi-brown mb-2">40%</div>
                <p className="text-gray-600">Higher Farmer Income</p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-farmandi-brown mb-4">Our Values</h2>
            <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
              The principles that guide everything we do at Farmandi
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-farmandi-green/5 border-l-4 border-farmandi-green rounded-r-lg p-6">
                <h3 className="font-semibold text-xl text-farmandi-green mb-4">Transparency</h3>
                <p className="text-gray-600">
                  We believe in complete visibility across the supply chain. Customers know 
                  exactly where their food comes from, and farmers know where their produce goes.
                </p>
              </div>
              
              <div className="bg-farmandi-brown/5 border-l-4 border-farmandi-brown rounded-r-lg p-6">
                <h3 className="font-semibold text-xl text-farmandi-brown mb-4">Sustainability</h3>
                <p className="text-gray-600">
                  We encourage sustainable farming practices and shorter supply chains that 
                  reduce the carbon footprint of food transportation.
                </p>
              </div>
              
              <div className="bg-farmandi-green/5 border-l-4 border-farmandi-green rounded-r-lg p-6">
                <h3 className="font-semibold text-xl text-farmandi-green mb-4">Fairness</h3>
                <p className="text-gray-600">
                  We ensure farmers receive fair compensation for their hard work, and 
                  customers pay fair prices for quality produce.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Team Section */}
        <section className="py-16 bg-farmandi-cream">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-farmandi-brown mb-4">Our Team</h2>
            <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
              Meet the passionate people behind Farmandi
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  name: "Arjun Patel",
                  role: "Founder & CEO",
                  image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=300",
                  bio: "Agricultural economist with 15 years of experience in rural development."
                },
                {
                  name: "Meera Singh",
                  role: "Chief Technology Officer",
                  image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300",
                  bio: "Tech innovator with a background in supply chain optimization and AI."
                },
                {
                  name: "Raj Kumar",
                  role: "Head of Farmer Relations",
                  image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300",
                  bio: "Former farmer turned agricultural advisor with deep roots in the farming community."
                },
                {
                  name: "Priya Sharma",
                  role: "Customer Experience Director",
                  image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300",
                  bio: "Food quality expert committed to ensuring the best experience for customers."
                }
              ].map((member, index) => (
                <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-lg">{member.name}</h3>
                    <p className="text-farmandi-green text-sm mb-4">{member.role}</p>
                    <p className="text-gray-600 text-sm">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Join Our Mission */}
        <section className="py-16 bg-gradient-to-r from-farmandi-green to-farmandi-brown text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-6">Join Our Mission</h2>
            <p className="text-xl max-w-3xl mx-auto mb-8">
              Whether you're a farmer looking to reach more customers or a consumer seeking 
              fresh, fairly-priced produce, Farmandi welcomes you to our community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/farmer/register" 
                className="px-8 py-3 bg-white text-farmandi-green font-medium rounded-lg hover:bg-opacity-90 transition"
              >
                Join as a Farmer
              </a>
              <a 
                href="/auth/signup" 
                className="px-8 py-3 bg-white/20 text-white font-medium rounded-lg hover:bg-white/30 transition"
              >
                Sign Up as a Customer
              </a>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
