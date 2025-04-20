
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Calendar, Clock, Users, MapPin, 
  ChevronLeft, Check 
} from 'lucide-react';
import { toast } from 'sonner';

const farmData = [
  {
    id: 1,
    name: 'Green Valley Farms',
    location: 'Karnataka',
    description: 'Nestled in the lush valleys of Karnataka, Green Valley Farms specializes in organic vegetable production using traditional and sustainable farming methods. Our farm spans over 25 acres of fertile land and has been in the family for generations.',
    images: [
      'https://images.unsplash.com/photo-1500076656116-558758c991c1?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1500595046743-cd271d694e30?auto=format&fit=crop&w=600&q=80'
    ],
    availableDates: ['2025-04-25', '2025-04-26', '2025-04-27', '2025-04-28']
  },
  {
    id: 2,
    name: 'Sunrise Organics',
    location: 'Punjab',
    description: 'Located in the fertile plains of Punjab, Sunrise Organics is a family-owned farm that has been delivering fresh fruits, vegetables, and dairy products for over 5 years. We pride ourselves on our sustainable farming practices and high-quality produce.',
    images: [
      'https://images.unsplash.com/photo-1485637701894-09ad422f6de6?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?auto=format&fit=crop&w=600&q=80'
    ],
    availableDates: ['2025-04-23', '2025-04-24', '2025-04-29', '2025-04-30']
  }
];

const timeSlots = ['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM'];

const FarmVisit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const farmId = Number(id) || 1;
  
  const farm = farmData.find(f => f.id === farmId) || farmData[0];
  
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [visitors, setVisitors] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedTime) {
      toast.error('Please select a date and time for your visit');
      return;
    }
    
    setSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      toast.success('Farm visit scheduled successfully!');
    }, 1500);
  };
  
  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-6">
          <Button 
            variant="outline" 
            className="mb-6"
            onClick={() => navigate('/customer/dashboard')}
          >
            <ChevronLeft className="h-4 w-4 mr-2" /> Back to Dashboard
          </Button>
          
          <Card className="max-w-2xl mx-auto p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="h-10 w-10 text-green-600" />
            </div>
            
            <h1 className="text-2xl font-bold mb-2">Visit Confirmed!</h1>
            <p className="text-gray-600 mb-6">
              Your visit to {farm.name} has been scheduled for {selectedDate} at {selectedTime}.
            </p>
            
            <div className="bg-gray-50 p-6 rounded-lg text-left mb-6">
              <h3 className="font-semibold mb-2">Visit Details:</h3>
              <ul className="space-y-2">
                <li className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 mr-2 text-farmandi-brown" />
                  Date: {selectedDate}
                </li>
                <li className="flex items-center text-sm">
                  <Clock className="h-4 w-4 mr-2 text-farmandi-brown" />
                  Time: {selectedTime}
                </li>
                <li className="flex items-center text-sm">
                  <Users className="h-4 w-4 mr-2 text-farmandi-brown" />
                  Number of Visitors: {visitors}
                </li>
                <li className="flex items-center text-sm">
                  <MapPin className="h-4 w-4 mr-2 text-farmandi-brown" />
                  Farm: {farm.name}, {farm.location}
                </li>
              </ul>
            </div>
            
            <Button 
              variant="customer" 
              className="w-full"
              onClick={() => navigate('/customer/dashboard')}
            >
              Return to Dashboard
            </Button>
          </Card>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-6">
        <Button 
          variant="outline" 
          className="mb-6"
          onClick={() => navigate('/customer/dashboard')}
        >
          <ChevronLeft className="h-4 w-4 mr-2" /> Back to Dashboard
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <Card className="overflow-hidden">
              <div className="relative h-64">
                <img 
                  src={farm.images[0]} 
                  alt={farm.name} 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white p-6">
                  <h1 className="text-2xl font-bold">{farm.name}</h1>
                  <div className="flex items-center mt-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{farm.location}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">About the Farm</h2>
                <p className="text-gray-600 mb-6">{farm.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {farm.images.map((img, index) => (
                    <img 
                      key={index} 
                      src={img} 
                      alt={`${farm.name} view ${index + 1}`} 
                      className="w-full h-40 object-cover rounded-lg"
                    />
                  ))}
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-semibold">What to expect during your visit:</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600">
                    <li>Guided tour of the farm and its operations</li>
                    <li>Hands-on experience with farming activities (seasonal)</li>
                    <li>Product sampling and tasting</li>
                    <li>Farm-to-table knowledge sharing</li>
                    <li>Opportunity to purchase fresh produce directly</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
          
          <div className="lg:col-span-2">
            <Card>
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-6">Schedule Your Visit</h2>
                
                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Select Date
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {farm.availableDates.map((date) => (
                          <div 
                            key={date}
                            className={`
                              p-3 border rounded-md text-center cursor-pointer transition-colors
                              ${selectedDate === date 
                                ? 'bg-farmandi-brown text-white border-farmandi-brown' 
                                : 'border-gray-200 hover:border-farmandi-brown/50'}
                            `}
                            onClick={() => setSelectedDate(date)}
                          >
                            {new Date(date).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric',
                              weekday: 'short'
                            })}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Select Time
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {timeSlots.map((time) => (
                          <div 
                            key={time}
                            className={`
                              p-3 border rounded-md text-center cursor-pointer transition-colors
                              ${selectedTime === time 
                                ? 'bg-farmandi-brown text-white border-farmandi-brown' 
                                : 'border-gray-200 hover:border-farmandi-brown/50'}
                            `}
                            onClick={() => setSelectedTime(time)}
                          >
                            {time}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Number of Visitors
                      </label>
                      <div className="flex items-center border rounded-md overflow-hidden">
                        <button 
                          type="button"
                          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 transition-colors"
                          onClick={() => setVisitors(Math.max(1, visitors - 1))}
                        >
                          -
                        </button>
                        <div className="flex-1 text-center py-2">
                          {visitors} {visitors === 1 ? 'person' : 'people'}
                        </div>
                        <button 
                          type="button"
                          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 transition-colors"
                          onClick={() => setVisitors(Math.min(10, visitors + 1))}
                        >
                          +
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Maximum 10 visitors per group
                      </p>
                    </div>
                    
                    <Button 
                      type="submit" 
                      variant="customer" 
                      className="w-full"
                      disabled={submitting || !selectedDate || !selectedTime}
                    >
                      {submitting ? 'Processing...' : 'Schedule Visit'}
                    </Button>
                  </div>
                </form>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmVisit;
