
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { BarChart, LineChart, PieChart, Activity, Package, Users, CreditCard, TrendingUp, FileText } from 'lucide-react';

const FarmerDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Farmer Dashboard Header */}
      <header className="bg-farmandi-green text-white">
        <div className="container mx-auto px-6 py-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Farmer Dashboard</h1>
              <p className="text-white/80">Welcome back, Rajesh Kumar</p>
            </div>
            <div className="flex space-x-4">
              <Button variant="outline" className="bg-white/10 text-white border-white/20">
                View Profile
              </Button>
              <Button variant="outline" className="bg-white/10 text-white border-white/20">
                Settings
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Sales</p>
                <h3 className="text-2xl font-bold mt-1">₹24,500</h3>
                <p className="text-green-500 text-sm flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 mr-1" /> +8% from last month
                </p>
              </div>
              <div className="bg-farmandi-green/10 p-3 rounded-full">
                <CreditCard className="h-6 w-6 text-farmandi-green" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-500 text-sm">Active Listings</p>
                <h3 className="text-2xl font-bold mt-1">12</h3>
                <p className="text-green-500 text-sm flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 mr-1" /> +2 new this week
                </p>
              </div>
              <div className="bg-farmandi-brown/10 p-3 rounded-full">
                <Package className="h-6 w-6 text-farmandi-brown" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Customers</p>
                <h3 className="text-2xl font-bold mt-1">45</h3>
                <p className="text-green-500 text-sm flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 mr-1" /> +5 new customers
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-500 text-sm">Pending Orders</p>
                <h3 className="text-2xl font-bold mt-1">8</h3>
                <p className="text-amber-500 text-sm flex items-center mt-2">
                  <Activity className="h-4 w-4 mr-1" /> Needs attention
                </p>
              </div>
              <div className="bg-amber-100 p-3 rounded-full">
                <FileText className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Activity and Sales Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 col-span-1 lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold text-lg">Sales Overview</h3>
              <select className="text-sm border rounded p-1">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 3 months</option>
              </select>
            </div>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-md">
              <BarChart className="h-8 w-8 text-gray-400" />
              <span className="ml-2 text-gray-500">Sales chart will appear here</span>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-6">Recent Orders</h3>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((_, index) => (
                <div key={index} className="flex items-center p-3 rounded-md hover:bg-gray-50">
                  <div className="w-10 h-10 rounded-full bg-farmandi-brown/10 flex items-center justify-center mr-3">
                    <span className="text-farmandi-brown font-semibold">#{index + 1}</span>
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-medium">Order #{10045 + index}</h4>
                    <p className="text-sm text-gray-500">Customer: Priya S.</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium">₹560</span>
                    <p className="text-xs text-gray-500">2 items</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">View All Orders</Button>
          </Card>
        </div>

        {/* Crop Analysis and Products */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <Card className="p-6 col-span-1 lg:col-span-2">
            <h3 className="font-semibold text-lg mb-6">Crop Analysis</h3>
            <div className="flex justify-center items-center h-48 mb-4">
              <PieChart className="h-8 w-8 text-gray-400" />
              <span className="ml-2 text-gray-500">Crop distribution chart</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="flex items-center">
                  <span className="h-3 w-3 rounded-full bg-farmandi-green mr-2"></span>
                  Tomatoes
                </span>
                <span>45%</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="flex items-center">
                  <span className="h-3 w-3 rounded-full bg-farmandi-brown mr-2"></span>
                  Potatoes
                </span>
                <span>25%</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="flex items-center">
                  <span className="h-3 w-3 rounded-full bg-blue-500 mr-2"></span>
                  Onions
                </span>
                <span>15%</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="flex items-center">
                  <span className="h-3 w-3 rounded-full bg-amber-500 mr-2"></span>
                  Others
                </span>
                <span>15%</span>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-6">
              <Link to="/farmer/crop-analysis">Detailed Crop Analysis</Link>
            </Button>
          </Card>

          <Card className="p-6 col-span-1 lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold text-lg">Your Products</h3>
              <Button variant="farmer" size="sm">+ Add New Product</Button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {['Organic Tomatoes', 'Red Onions', 'Potatoes', 'Fresh Garlic'].map((product, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">₹{(index + 2) * 20}/kg</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{(index + 1) * 25} kg</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs ${index % 2 === 0 ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                          {index % 2 === 0 ? 'Active' : 'Low Stock'}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                        <Button variant="ghost" size="sm">Edit</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="text-center mt-4">
              <Button variant="outline" className="w-full">View All Products</Button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default FarmerDashboard;
