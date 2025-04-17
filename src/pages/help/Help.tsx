
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, Minus, Mail, Phone, MessageSquare } from 'lucide-react';

const faqCategories = [
  { id: 'general', label: 'General Questions' },
  { id: 'customers', label: 'For Customers' },
  { id: 'farmers', label: 'For Farmers' },
  { id: 'quality', label: 'Quality & Safety' },
  { id: 'ordering', label: 'Ordering & Delivery' },
  { id: 'account', label: 'Account & Privacy' },
];

const faqData = [
  {
    category: 'general',
    question: 'What is Farmandi?',
    answer: 'Farmandi is a direct farm-to-consumer marketplace that connects farmers with customers, eliminating middlemen in the agricultural supply chain. Our platform enables farmers to sell directly to consumers, ensuring fair prices for farmers and fresh produce for customers.'
  },
  {
    category: 'general',
    question: 'How does Farmandi work?',
    answer: "Farmers list their available produce on our platform. Customers can browse products, check quality, and place orders directly from farmers. We handle the logistics, ensuring produce is delivered from farms to customers' doorsteps quickly and efficiently."
  },
  {
    category: 'general',
    question: 'Where does Farmandi operate?',
    answer: 'Farmandi currently operates in 15 states across India, with plans to expand nationwide. Our strongest presence is in Punjab, Karnataka, Gujarat, Maharashtra, and Uttar Pradesh.'
  },
  {
    category: 'customers',
    question: 'How do I know the produce is fresh?',
    answer: 'All produce on Farmandi is typically harvested within 24-48 hours before delivery. You can also use our Quality Scanner feature to verify the freshness and quality of fruits and vegetables. Additionally, our platform shows harvest dates and quality ratings for transparency.'
  },
  {
    category: 'customers',
    question: 'What is the Quality Scanner?',
    answer: 'The Quality Scanner is our innovative technology that allows customers to verify the quality of produce. Simply take a photo of fruits or vegetables, and our AI-powered system will analyze freshness, nutritional value, and detect any quality issues.'
  },
  {
    category: 'customers',
    question: 'How much does delivery cost?',
    answer: 'Delivery is free for orders above ₹500. For orders below this amount, a delivery fee of ₹40 is applied. Orders are typically delivered within 1-3 days depending on your location.'
  },
  {
    category: 'farmers',
    question: 'How do I become a seller on Farmandi?',
    answer: 'Register on our platform through the "Become a Seller" option. You\'ll need to provide identification, farm details, and undergo a simple verification process. Once approved, you can start listing your produce and receiving orders.'
  },
  {
    category: 'farmers',
    question: 'What are the fees for farmers?',
    answer: 'Farmandi charges a 7% commission on sales, significantly lower than traditional market channels that can take 30-50% of the final consumer price. This fee covers platform maintenance, marketing, and customer support.'
  },
  {
    category: 'farmers',
    question: 'How does the crop analysis feature work?',
    answer: 'Our crop analysis tool provides state-wise market trends, demand forecasts, and price predictions based on historical data and current market conditions. This helps farmers make informed decisions about what to grow and when to sell.'
  },
  {
    category: 'quality',
    question: 'Does Farmandi verify product quality?',
    answer: 'Yes, we have a quality assurance process in place. We conduct regular farm visits, verify farming practices, and use technology to ensure quality standards. Our customer feedback system also helps maintain high product standards.'
  },
  {
    category: 'ordering',
    question: 'Can I cancel my order?',
    answer: 'Orders can be cancelled up to 12 hours after placement. After this window, cancellation might not be possible as farmers begin harvest and preparation based on confirmed orders.'
  },
  {
    category: 'account',
    question: 'How is my personal information protected?',
    answer: 'Farmandi takes data privacy seriously. We use secure encryption for all personal and payment information. We do not share your data with third parties without consent. For more details, please refer to our Privacy Policy.'
  },
];

const Help = () => {
  const [activeCategory, setActiveCategory] = useState('general');
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaqs, setOpenFaqs] = useState<number[]>([]);

  // Filter FAQs based on category and search query
  const filteredFaqs = faqData.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFaq = (index: number) => {
    if (openFaqs.includes(index)) {
      setOpenFaqs(openFaqs.filter(item => item !== index));
    } else {
      setOpenFaqs([...openFaqs, index]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-farmandi-cream py-12">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold text-farmandi-brown mb-4">
                How Can We Help You?
              </h1>
              <p className="text-gray-600 mb-8">
                Find answers to common questions or reach out to our support team.
              </p>

              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                <Input
                  type="text"
                  placeholder="Search for answers..."
                  className="pl-10 py-6 text-base"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl font-bold text-center text-farmandi-brown mb-12">
              Frequently Asked Questions
            </h2>

            {/* Category Tabs */}
            <div className="mb-8 overflow-x-auto">
              <div className="flex space-x-2 min-w-max pb-2">
                <Button
                  variant={activeCategory === 'all' ? 'customer' : 'outline'}
                  onClick={() => setActiveCategory('all')}
                  className="whitespace-nowrap"
                >
                  All Questions
                </Button>
                {faqCategories.map((category) => (
                  <Button
                    key={category.id}
                    variant={activeCategory === category.id ? 'customer' : 'outline'}
                    onClick={() => setActiveCategory(category.id)}
                    className="whitespace-nowrap"
                  >
                    {category.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* FAQ Content */}
            <div className="max-w-3xl mx-auto">
              {filteredFaqs.length > 0 ? (
                <div className="space-y-4">
                  {filteredFaqs.map((faq, index) => (
                    <div 
                      key={index} 
                      className="border border-gray-200 rounded-lg overflow-hidden"
                    >
                      <button
                        className="flex justify-between items-center w-full p-4 text-left font-medium focus:outline-none"
                        onClick={() => toggleFaq(index)}
                      >
                        <span>{faq.question}</span>
                        {openFaqs.includes(index) ? (
                          <Minus className="h-4 w-4 text-farmandi-brown" />
                        ) : (
                          <Plus className="h-4 w-4 text-farmandi-brown" />
                        )}
                      </button>
                      {openFaqs.includes(index) && (
                        <div className="p-4 bg-gray-50 border-t border-gray-200">
                          <p className="text-gray-600">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No questions found matching your search.</p>
                  <p className="text-gray-600 mt-2">Try adjusting your search terms or contact our support team.</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-farmandi-cream">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl font-bold text-center text-farmandi-brown mb-4">
              Still Need Help?
            </h2>
            <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
              Our support team is here to assist you with any questions or concerns.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
                <div className="bg-farmandi-green/10 rounded-full p-4 w-16 h-16 mx-auto flex items-center justify-center mb-4">
                  <Mail className="h-6 w-6 text-farmandi-green" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Email Us</h3>
                <p className="text-gray-600 mb-4">
                  Send us an email and we'll respond within 24 hours.
                </p>
                <a 
                  href="mailto:support@farmandi.com" 
                  className="text-farmandi-green font-medium hover:underline"
                >
                  support@farmandi.com
                </a>
              </div>

              <div className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
                <div className="bg-farmandi-brown/10 rounded-full p-4 w-16 h-16 mx-auto flex items-center justify-center mb-4">
                  <Phone className="h-6 w-6 text-farmandi-brown" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Call Us</h3>
                <p className="text-gray-600 mb-4">
                  Available Monday to Saturday, 9am to 6pm.
                </p>
                <a 
                  href="tel:+911234567890" 
                  className="text-farmandi-brown font-medium hover:underline"
                >
                  +91 12345 67890
                </a>
              </div>

              <div className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
                <div className="bg-farmandi-green/10 rounded-full p-4 w-16 h-16 mx-auto flex items-center justify-center mb-4">
                  <MessageSquare className="h-6 w-6 text-farmandi-green" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Live Chat</h3>
                <p className="text-gray-600 mb-4">
                  Chat with our support team in real-time.
                </p>
                <Button variant="outline" className="text-farmandi-green border-farmandi-green">
                  Start Chat
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Help Topics */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl font-bold text-center text-farmandi-brown mb-12">
              Popular Help Topics
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                {
                  title: 'Getting Started with Farmandi',
                  description: 'Learn how to create an account, browse products, and place your first order.',
                  link: '#'
                },
                {
                  title: 'Farmer Onboarding Guide',
                  description: 'Step-by-step instructions for farmers to register and start selling on Farmandi.',
                  link: '#'
                },
                {
                  title: 'Understanding Quality Ratings',
                  description: 'How we rate product quality and what our verification process involves.',
                  link: '#'
                },
                {
                  title: 'Payment & Refund Policies',
                  description: 'Information about payment methods, processing, and our refund policy.',
                  link: '#'
                },
                {
                  title: 'Shipping & Delivery',
                  description: 'Details about our delivery process, timeframes, and tracking orders.',
                  link: '#'
                },
                {
                  title: 'Account Security',
                  description: 'Tips for keeping your Farmandi account secure and managing your settings.',
                  link: '#'
                }
              ].map((topic, index) => (
                <a 
                  key={index} 
                  href={topic.link}
                  className="block bg-gray-50 border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <h3 className="font-semibold text-lg mb-2 text-farmandi-brown">{topic.title}</h3>
                  <p className="text-gray-600 text-sm">{topic.description}</p>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Help;
