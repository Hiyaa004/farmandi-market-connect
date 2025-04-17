
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import HowItWorks from '@/components/home/HowItWorks';
import FarmerHighlight from '@/components/home/FarmerHighlight';
import Testimonials from '@/components/home/Testimonials';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        <FeaturedProducts />
        <HowItWorks />
        <FarmerHighlight />
        <Testimonials />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
