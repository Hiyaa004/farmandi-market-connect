import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, LineChart, TrendingUp, TrendingDown, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CropAnalysisChart } from '@/components/charts/CropAnalysisChart';

const stateData = [
  { 
    state: 'Punjab', 
    topCrops: ['Wheat', 'Rice', 'Maize'],
    demandTrend: 'up',
    priceRange: { wheat: '₹2200-2500/quintal', rice: '₹1800-2200/quintal', maize: '₹1400-1700/quintal' },
    marketInsight: 'High demand for wheat continues with stable prices. Rice prices expected to rise in coming months.',
    seasonalTrend: 'positive'
  },
  { 
    state: 'Karnataka', 
    topCrops: ['Millet', 'Sugarcane', 'Cotton'],
    demandTrend: 'stable',
    priceRange: { millet: '₹1900-2200/quintal', sugarcane: '₹2800-3200/quintal', cotton: '₹5500-6000/quintal' },
    marketInsight: 'Millet gaining popularity due to health trends. Cotton prices slightly down due to oversupply.',
    seasonalTrend: 'neutral'
  },
  { 
    state: 'Gujarat', 
    topCrops: ['Groundnut', 'Cotton', 'Cumin'],
    demandTrend: 'up',
    priceRange: { groundnut: '₹5200-5500/quintal', cotton: '₹5600-6100/quintal', cumin: '₹14000-15000/quintal' },
    marketInsight: 'Premium prices for organic groundnut. Cumin exports rising, leading to higher domestic prices.',
    seasonalTrend: 'positive'
  },
  { 
    state: 'Maharashtra', 
    topCrops: ['Soybean', 'Sugarcane', 'Cotton'],
    demandTrend: 'down',
    priceRange: { soybean: '₹3800-4200/quintal', sugarcane: '₹2900-3300/quintal', cotton: '₹5400-5900/quintal' },
    marketInsight: 'Soybean prices under pressure due to international market trends. Consider diversification.',
    seasonalTrend: 'negative'
  },
];

const CropAnalysis = () => {
  const [selectedState, setSelectedState] = useState('Punjab');
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-farmandi-green text-white">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center">
            <Link to="/farmer/dashboard" className="mr-4">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold">Crop Analysis</h1>
              <p className="text-white/80">Market trends and recommendations for optimal farming</p>
            </div>
          </div>
        </div>
      </header>

      <div className="bg-white shadow-sm py-6">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap gap-2">
            <Button 
              variant={selectedState === 'All States' ? 'farmer' : 'outline'}
              onClick={() => setSelectedState('All States')}
            >
              All States
            </Button>
            {stateData.map(data => (
              <Button 
                key={data.state}
                variant={selectedState === data.state ? 'farmer' : 'outline'}
                onClick={() => setSelectedState(data.state)}
              >
                {data.state}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <main className="container mx-auto px-6 py-8">
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-6">Market Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 col-span-1 md:col-span-2">
              <h3 className="font-semibold text-lg mb-4">Crop Distribution by State</h3>
              <CropAnalysisChart selectedState={selectedState} />
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-4">Seasonal Insights</h3>
              <div className="space-y-4">
                <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-md">
                  <h4 className="text-amber-700 font-medium">Upcoming Season</h4>
                  <p className="text-sm text-amber-600 mt-1">Prepare for Rabi crop planning. Wheat and mustard prices expected to be strong.</p>
                </div>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-md">
                  <h4 className="text-blue-700 font-medium">Weather Alert</h4>
                  <p className="text-sm text-blue-600 mt-1">Higher than average rainfall predicted for Central India in coming weeks.</p>
                </div>
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-md">
                  <h4 className="text-green-700 font-medium">Market Opportunity</h4>
                  <p className="text-sm text-green-600 mt-1">Organic pulses commanding 40% premium in urban markets.</p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-6">State-wise Crop Analysis</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {stateData.map((data, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="bg-farmandi-green text-white p-6">
                  <h3 className="font-semibold text-lg">{data.state}</h3>
                  <div className="flex items-center mt-2">
                    <span className="text-sm">Demand Trend:</span>
                    <div className={`ml-2 flex items-center ${
                      data.demandTrend === 'up' ? 'text-green-300' : 
                      data.demandTrend === 'down' ? 'text-red-300' : 'text-yellow-300'
                    }`}>
                      {data.demandTrend === 'up' ? <TrendingUp className="h-4 w-4 mr-1" /> : 
                       data.demandTrend === 'down' ? <TrendingDown className="h-4 w-4 mr-1" /> : 
                       <Info className="h-4 w-4 mr-1" />}
                      {data.demandTrend === 'up' ? 'Increasing' : 
                       data.demandTrend === 'down' ? 'Decreasing' : 'Stable'}
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-700 mb-2">Top Performing Crops</h4>
                    <div className="flex flex-wrap gap-2">
                      {data.topCrops.map((crop, i) => (
                        <span key={i} className="text-sm bg-farmandi-green/10 text-farmandi-green px-3 py-1 rounded-full">
                          {crop}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-700 mb-2">Price Ranges</h4>
                    <div className="space-y-2">
                      {Object.entries(data.priceRange).map(([crop, price], i) => (
                        <div key={i} className="flex justify-between items-center text-sm">
                          <span className="capitalize">{crop}</span>
                          <span className="font-medium">{price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-700 mb-2">Market Insight</h4>
                    <p className="text-sm text-gray-600">{data.marketInsight}</p>
                  </div>
                  
                  <Button variant="outline" className="w-full">View Detailed Analysis</Button>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-6">Farmandi Recommendations</h2>
          <Card className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-lg mb-4">Crop Recommendations</h3>
                <div className="space-y-4">
                  <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start">
                      <div className="bg-farmandi-green/10 rounded-full p-2 mr-3">
                        <span className="text-farmandi-green font-semibold">1</span>
                      </div>
                      <div>
                        <h4 className="font-medium">Consider organic certification</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Organic produce commands 30-40% premium and has growing demand in urban markets.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start">
                      <div className="bg-farmandi-green/10 rounded-full p-2 mr-3">
                        <span className="text-farmandi-green font-semibold">2</span>
                      </div>
                      <div>
                        <h4 className="font-medium">Diversify with high-value crops</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Adding herbs and specialized vegetables to your crop rotation can increase profit margins.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start">
                      <div className="bg-farmandi-green/10 rounded-full p-2 mr-3">
                        <span className="text-farmandi-green font-semibold">3</span>
                      </div>
                      <div>
                        <h4 className="font-medium">Water management techniques</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Implement drip irrigation to reduce water usage by up to 40% and improve crop quality.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-4">Marketing Strategies</h3>
                <div className="space-y-4">
                  <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start">
                      <div className="bg-farmandi-brown/10 rounded-full p-2 mr-3">
                        <span className="text-farmandi-brown font-semibold">1</span>
                      </div>
                      <div>
                        <h4 className="font-medium">Bundle products for higher value</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Create vegetable baskets or themed bundles to increase average order value by 25%.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start">
                      <div className="bg-farmandi-brown/10 rounded-full p-2 mr-3">
                        <span className="text-farmandi-brown font-semibold">2</span>
                      </div>
                      <div>
                        <h4 className="font-medium">Leverage Farmandi's quality verification</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Highlight your produce quality ratings to attract premium customers.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start">
                      <div className="bg-farmandi-brown/10 rounded-full p-2 mr-3">
                        <span className="text-farmandi-brown font-semibold">3</span>
                      </div>
                      <div>
                        <h4 className="font-medium">Encourage customer reviews</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Farmers with 10+ positive reviews see 32% higher sales on average.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default CropAnalysis;
