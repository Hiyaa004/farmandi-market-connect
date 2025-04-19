
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer
} from 'recharts';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Sample data for the charts
const cropData = {
  tomato: {
    monthlyPrice: [
      { month: 'Jan', price: 45 },
      { month: 'Feb', price: 40 },
      { month: 'Mar', price: 35 },
      { month: 'Apr', price: 30 },
      { month: 'May', price: 35 },
      { month: 'Jun', price: 45 },
      { month: 'Jul', price: 50 },
      { month: 'Aug', price: 55 },
      { month: 'Sep', price: 60 },
      { month: 'Oct', price: 55 },
      { month: 'Nov', price: 50 },
      { month: 'Dec', price: 48 }
    ],
    regionData: [
      { region: 'North', production: 3500 },
      { region: 'South', production: 4200 },
      { region: 'East', production: 2800 },
      { region: 'West', production: 3100 },
      { region: 'Central', production: 3800 }
    ],
    varietyDistribution: [
      { name: 'Roma', value: 30 },
      { name: 'Cherry', value: 25 },
      { name: 'Beefsteak', value: 20 },
      { name: 'Heirloom', value: 15 },
      { name: 'Grape', value: 10 }
    ],
    summary: "Tomatoes are showing strong market demand with peak prices in September. South region leads in production. Roma variety has the highest market share."
  },
  potato: {
    monthlyPrice: [
      { month: 'Jan', price: 25 },
      { month: 'Feb', price: 28 },
      { month: 'Mar', price: 30 },
      { month: 'Apr', price: 32 },
      { month: 'May', price: 35 },
      { month: 'Jun', price: 38 },
      { month: 'Jul', price: 36 },
      { month: 'Aug', price: 34 },
      { month: 'Sep', price: 30 },
      { month: 'Oct', price: 28 },
      { month: 'Nov', price: 26 },
      { month: 'Dec', price: 25 }
    ],
    regionData: [
      { region: 'North', production: 5200 },
      { region: 'South', production: 3800 },
      { region: 'East', production: 4100 },
      { region: 'West', production: 4500 },
      { region: 'Central', production: 4900 }
    ],
    varietyDistribution: [
      { name: 'Russet', value: 35 },
      { name: 'Red', value: 25 },
      { name: 'White', value: 20 },
      { name: 'Yellow', value: 15 },
      { name: 'Purple', value: 5 }
    ],
    summary: "Potatoes show highest prices during summer months. Northern and Central regions lead in production. Russet variety has the highest market share."
  },
  onion: {
    monthlyPrice: [
      { month: 'Jan', price: 35 },
      { month: 'Feb', price: 32 },
      { month: 'Mar', price: 30 },
      { month: 'Apr', price: 28 },
      { month: 'May', price: 32 },
      { month: 'Jun', price: 35 },
      { month: 'Jul', price: 40 },
      { month: 'Aug', price: 45 },
      { month: 'Sep', price: 50 },
      { month: 'Oct', price: 48 },
      { month: 'Nov', price: 43 },
      { month: 'Dec', price: 38 }
    ],
    regionData: [
      { region: 'North', production: 3200 },
      { region: 'South', production: 2800 },
      { region: 'East', production: 2200 },
      { region: 'West', production: 4500 },
      { region: 'Central', production: 3800 }
    ],
    varietyDistribution: [
      { name: 'Red', value: 40 },
      { name: 'Yellow', value: 35 },
      { name: 'White', value: 15 },
      { name: 'Sweet', value: 10 }
    ],
    summary: "Onions reach peak prices in September. Western region leads in production. Red onions dominate the market share."
  },
  rice: {
    monthlyPrice: [
      { month: 'Jan', price: 52 },
      { month: 'Feb', price: 54 },
      { month: 'Mar', price: 55 },
      { month: 'Apr', price: 58 },
      { month: 'May', price: 60 },
      { month: 'Jun', price: 62 },
      { month: 'Jul', price: 65 },
      { month: 'Aug', price: 63 },
      { month: 'Sep', price: 60 },
      { month: 'Oct', price: 58 },
      { month: 'Nov', price: 55 },
      { month: 'Dec', price: 53 }
    ],
    regionData: [
      { region: 'North', production: 2800 },
      { region: 'South', production: 5200 },
      { region: 'East', production: 4800 },
      { region: 'West', production: 2200 },
      { region: 'Central', production: 3000 }
    ],
    varietyDistribution: [
      { name: 'Basmati', value: 35 },
      { name: 'Jasmine', value: 20 },
      { name: 'Brown', value: 15 },
      { name: 'White', value: 25 },
      { name: 'Black', value: 5 }
    ],
    summary: "Rice prices peak during July. Southern and Eastern regions dominate production. Basmati variety commands the highest market share and price premium."
  },
  apple: {
    monthlyPrice: [
      { month: 'Jan', price: 120 },
      { month: 'Feb', price: 125 },
      { month: 'Mar', price: 130 },
      { month: 'Apr', price: 135 },
      { month: 'May', price: 140 },
      { month: 'Jun', price: 145 },
      { month: 'Jul', price: 150 },
      { month: 'Aug', price: 145 },
      { month: 'Sep', price: 140 },
      { month: 'Oct', price: 135 },
      { month: 'Nov', price: 130 },
      { month: 'Dec', price: 125 }
    ],
    regionData: [
      { region: 'North', production: 4800 },
      { region: 'South', production: 1200 },
      { region: 'East', production: 1800 },
      { region: 'West', production: 2500 },
      { region: 'Central', production: 1500 }
    ],
    varietyDistribution: [
      { name: 'Red Delicious', value: 30 },
      { name: 'Gala', value: 25 },
      { name: 'Granny Smith', value: 20 },
      { name: 'Fuji', value: 15 },
      { name: 'Honeycrisp', value: 10 }
    ],
    summary: "Apples reach highest prices in July. Northern region dominates production due to favorable climate. Red Delicious has the highest market share."
  }
};

// Colors for the pie chart
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#83a6ed'];

const CropSelectionAnalysis = () => {
  const [selectedCrop, setSelectedCrop] = useState('tomato');
  const cropOptions = [
    { value: 'tomato', label: 'Tomato' },
    { value: 'potato', label: 'Potato' },
    { value: 'onion', label: 'Onion' },
    { value: 'rice', label: 'Rice' },
    { value: 'apple', label: 'Apple' }
  ];
  
  const data = cropData[selectedCrop as keyof typeof cropData];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-farmandi-brown mb-4">Crop Analysis</h1>
          <p className="text-gray-600 mb-6">
            Analyze market trends, prices, and production data for different crops to make informed farming decisions.
          </p>
          
          <div className="mb-8 max-w-xs">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Crop for Analysis
            </label>
            <Select defaultValue={selectedCrop} onValueChange={setSelectedCrop}>
              <SelectTrigger>
                <SelectValue placeholder="Select crop" />
              </SelectTrigger>
              <SelectContent>
                {cropOptions.map((crop) => (
                  <SelectItem key={crop.value} value={crop.value}>
                    {crop.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="p-6 lg:col-span-3">
            <h2 className="text-xl font-semibold mb-4">Monthly Price Trends (₹/kg)</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={data.monthlyPrice}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="price" 
                    stroke="#16a34a" 
                    activeDot={{ r: 8 }} 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
          
          <Card className="p-6 lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Regional Production (tons)</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data.regionData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="region" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="production" fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
          
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Variety Distribution (%)</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data.varietyDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={(entry) => entry.name}
                  >
                    {data.varietyDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
        
        <Card className="p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">Market Analysis Summary</h2>
          <p className="text-gray-700">
            {data.summary}
          </p>
          <div className="mt-6 p-4 bg-farmandi-green/10 rounded-lg">
            <h3 className="font-semibold text-farmandi-green">Recommendations</h3>
            <ul className="mt-2 space-y-2 list-disc list-inside text-gray-700">
              <li>Optimal planting time: {
                selectedCrop === 'tomato' ? 'February for highest yield' :
                selectedCrop === 'potato' ? 'January for early market advantage' :
                selectedCrop === 'onion' ? 'November for best growth cycle' :
                selectedCrop === 'rice' ? 'June for monsoon season' :
                'April for spring growth'
              }</li>
              <li>Best variety for market demand: {
                selectedCrop === 'tomato' ? 'Roma and Cherry varieties' :
                selectedCrop === 'potato' ? 'Russet for commercial sales' :
                selectedCrop === 'onion' ? 'Red varieties command premium prices' :
                selectedCrop === 'rice' ? 'Basmati for export market' :
                'Red Delicious and Honeycrisp for premium segment'
              }</li>
              <li>Target harvest time: {
                selectedCrop === 'tomato' ? 'August-September for peak prices' :
                selectedCrop === 'potato' ? 'May-June for highest returns' :
                selectedCrop === 'onion' ? 'August-September before price peak' :
                selectedCrop === 'rice' ? 'Late July for optimal returns' :
                'Mid-July for premium pricing'
              }</li>
            </ul>
          </div>
        </Card>
        
        <div className="mt-8 text-center">
          <Button variant="farmer" asChild>
            <Link to="/farmer/dashboard">Back to Dashboard</Link>
          </Button>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CropSelectionAnalysis;
