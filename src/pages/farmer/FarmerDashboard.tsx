
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  BarChart, LineChart, PieChart, Activity, Package, Users, CreditCard, TrendingUp, FileText,
  Home, Settings, LogOut, Bell, User, Calendar, ChevronDown, Menu
} from 'lucide-react';
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RePieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

const FarmerDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Sample data for sales chart
  const salesData = [
    { name: 'Mon', sales: 1500 },
    { name: 'Tue', sales: 2200 },
    { name: 'Wed', sales: 1800 },
    { name: 'Thu', sales: 2400 },
    { name: 'Fri', sales: 2600 },
    { name: 'Sat', sales: 3200 },
    { name: 'Sun', sales: 2800 },
  ];
  
  // Sample data for pie chart
  const cropData = [
    { name: 'Tomatoes', value: 45, color: '#4CAF50' },
    { name: 'Potatoes', value: 25, color: '#795548' },
    { name: 'Onions', value: 15, color: '#2196F3' },
    { name: 'Others', value: 15, color: '#FFC107' },
  ];
  
  const navigationItems = [
    { icon: Home, label: 'Dashboard', value: 'overview' },
    { icon: Package, label: 'Products', value: 'products' },
    { icon: Users, label: 'Customers', value: 'customers' },
    { icon: FileText, label: 'Orders', value: 'orders' },
    { icon: BarChart, label: 'Analytics', value: 'analytics' },
    { icon: Calendar, label: 'Schedule', value: 'schedule' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex md:w-64 flex-col bg-white border-r border-gray-200 h-screen sticky top-0">
        <div className="p-6 border-b">
          <Link to="/" className="flex items-center">
            <img src="/logo.svg" alt="Farmandi" className="h-8 w-8" />
            <span className="ml-2 font-bold text-lg">Farmer Portal</span>
          </Link>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="px-4 space-y-1">
            {navigationItems.map((item) => (
              <button
                key={item.value}
                className={`flex items-center w-full px-3 py-2 text-sm rounded-md transition-colors ${
                  activeTab === item.value
                    ? 'bg-farmandi-green text-white font-medium'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab(item.value)}
              >
                <item.icon className="h-4 w-4 mr-3" />
                {item.label}
              </button>
            ))}
          </nav>
        </div>
        
        <div className="p-4 border-t">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center w-full p-2 text-left text-sm rounded-md hover:bg-gray-100">
                <div className="w-8 h-8 rounded-full bg-farmandi-green/20 flex items-center justify-center text-farmandi-green mr-2">
                  R
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="font-medium">Rajesh Kumar</p>
                  <p className="text-xs text-gray-500 truncate">rajesh@example.com</p>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell className="mr-2 h-4 w-4" />
                <span>Notifications</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>
      
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-30 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            className="p-2 rounded-md text-gray-500 hover:bg-gray-100"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
          
          <Link to="/" className="flex items-center">
            <img src="/logo.svg" alt="Farmandi" className="h-8 w-8" />
          </Link>
          
          <div className="w-10">
            <Sheet>
              <SheetTrigger asChild>
                <button className="p-2 rounded-full bg-gray-100">
                  <User className="h-5 w-5 text-gray-600" />
                </button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Farmer Account</SheetTitle>
                  <SheetDescription>
                    Manage your farmer account settings
                  </SheetDescription>
                </SheetHeader>
                <div className="py-4">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 rounded-full bg-farmandi-green/20 flex items-center justify-center text-farmandi-green mr-4">
                      R
                    </div>
                    <div>
                      <h3 className="font-semibold">Rajesh Kumar</h3>
                      <p className="text-sm text-gray-500">rajesh@example.com</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <SheetClose asChild>
                      <Button variant="ghost" className="w-full justify-start" asChild>
                        <Link to="/profile">
                          <User className="mr-2 h-4 w-4" />
                          <span>Profile</span>
                        </Link>
                      </Button>
                    </SheetClose>
                    
                    <SheetClose asChild>
                      <Button variant="ghost" className="w-full justify-start" asChild>
                        <Link to="/settings">
                          <Settings className="mr-2 h-4 w-4" />
                          <span>Settings</span>
                        </Link>
                      </Button>
                    </SheetClose>
                    
                    <SheetClose asChild>
                      <Button variant="ghost" className="w-full justify-start" asChild>
                        <Link to="/notifications">
                          <Bell className="mr-2 h-4 w-4" />
                          <span>Notifications</span>
                        </Link>
                      </Button>
                    </SheetClose>
                    
                    <hr className="my-2" />
                    
                    <SheetClose asChild>
                      <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-700 hover:bg-red-50">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Sign Out</span>
                      </Button>
                    </SheetClose>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
      
      {/* Mobile Sidebar */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <div className="p-6 border-b">
            <Link to="/" className="flex items-center" onClick={() => setMobileMenuOpen(false)}>
              <img src="/logo.svg" alt="Farmandi" className="h-8 w-8" />
              <span className="ml-2 font-bold text-lg">Farmer Portal</span>
            </Link>
          </div>
          
          <div className="py-4">
            <nav className="px-4 space-y-1">
              {navigationItems.map((item) => (
                <SheetClose asChild key={item.value}>
                  <button
                    className={`flex items-center w-full px-3 py-2 text-sm rounded-md transition-colors ${
                      activeTab === item.value
                        ? 'bg-farmandi-green text-white font-medium'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setActiveTab(item.value)}
                  >
                    <item.icon className="h-4 w-4 mr-3" />
                    {item.label}
                  </button>
                </SheetClose>
              ))}
            </nav>
          </div>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 md:ml-0 mt-14 md:mt-0">
        {/* Farmer Dashboard Header */}
        <header className="bg-farmandi-green text-white md:block hidden">
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
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={salesData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4CAF50" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#4CAF50" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="sales" 
                      stroke="#4CAF50" 
                      fillOpacity={1} 
                      fill="url(#colorSales)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
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
              <div className="h-48 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <RePieChart>
                    <Pie
                      data={cropData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {cropData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Legend />
                    <Tooltip />
                  </RePieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2">
                {cropData.map((entry, index) => (
                  <div key={index} className="flex justify-between items-center text-sm">
                    <span className="flex items-center">
                      <span 
                        className="h-3 w-3 rounded-full mr-2" 
                        style={{ backgroundColor: entry.color }}
                      ></span>
                      {entry.name}
                    </span>
                    <span>{entry.value}%</span>
                  </div>
                ))}
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
    </div>
  );
};

export default FarmerDashboard;
