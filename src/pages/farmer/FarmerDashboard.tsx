import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Activity, Package, Users, CreditCard, TrendingUp, 
  FileText, PieChart, Plus, ChevronDown, Filter 
} from 'lucide-react';
import { SalesOverviewChart } from '@/components/charts/SalesOverviewChart';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { CropAnalysisChart } from '@/components/charts/CropAnalysisChart';

const FarmerDashboard = () => {
  const navigate = useNavigate();
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState<string | null>(null);
  const [selectedState, setSelectedState] = useState<string | null>(null);

  // Mock data for the product list
  const [products, setProducts] = useState([
    { id: 1, name: 'Organic Tomatoes', price: 40, stock: 25, status: 'Active' },
    { id: 2, name: 'Red Onions', price: 30, stock: 50, status: 'Active' },
    { id: 3, name: 'Potatoes', price: 35, stock: 15, status: 'Low Stock' },
    { id: 4, name: 'Fresh Garlic', price: 60, stock: 10, status: 'Low Stock' },
  ]);

  // Mock form data for new product
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    stock: '',
    category: '',
    description: '',
  });

  // Profile data
  const profileData = {
    name: 'Rajesh Kumar',
    phone: '+91 9876543210',
    email: 'rajesh.kumar@example.com',
    farmName: 'Green Harvest Farms',
    location: 'Bangalore, Karnataka',
    farmSize: '25 acres',
    memberSince: 'March 2023',
    certifications: ['Organic Certified', 'Good Agricultural Practices'],
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newProduct.name || !newProduct.price || !newProduct.stock) {
      toast.error("Please fill all required fields");
      return;
    }
    
    const productToAdd = {
      id: products.length + 1,
      name: newProduct.name,
      price: parseInt(newProduct.price),
      stock: parseInt(newProduct.stock),
      status: parseInt(newProduct.stock) < 20 ? 'Low Stock' : 'Active',
    };
    
    setProducts([...products, productToAdd]);
    
    toast.success(`${newProduct.name} added successfully!`);
    
    // Reset form
    setNewProduct({
      name: '',
      price: '',
      stock: '',
      category: '',
      description: '',
    });
    
    setShowAddProduct(false);
  };

  const handleCropAnalysis = () => {
    if (selectedCrop && selectedState) {
      navigate(`/farmer/crop-analysis?crop=${selectedCrop}&state=${selectedState}`);
    } else {
      toast.error("Please select both crop and state for analysis");
    }
  };

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
              <Button 
                variant="outline" 
                className="bg-white/10 text-white border-white/20"
                onClick={() => setShowProfile(true)}
              >
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
          <div className="col-span-1 lg:col-span-2">
            <SalesOverviewChart />
          </div>

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
            
            <div className="space-y-4 mb-6">
              <div>
                <Label htmlFor="crop-select" className="block text-sm mb-1">Select Crop</Label>
                <select 
                  id="crop-select"
                  className="w-full p-2 border rounded-md"
                  value={selectedCrop || ''}
                  onChange={(e) => setSelectedCrop(e.target.value)}
                >
                  <option value="">Select a crop</option>
                  <option value="tomatoes">Tomatoes</option>
                  <option value="potatoes">Potatoes</option>
                  <option value="onions">Onions</option>
                  <option value="carrots">Carrots</option>
                  <option value="wheat">Wheat</option>
                  <option value="rice">Rice</option>
                </select>
              </div>
              
              <div>
                <Label htmlFor="state-select" className="block text-sm mb-1">Select State</Label>
                <select 
                  id="state-select"
                  className="w-full p-2 border rounded-md"
                  value={selectedState || ''}
                  onChange={(e) => setSelectedState(e.target.value)}
                >
                  <option value="">Select a state</option>
                  <option value="karnataka">Karnataka</option>
                  <option value="punjab">Punjab</option>
                  <option value="haryana">Haryana</option>
                  <option value="gujarat">Gujarat</option>
                  <option value="maharashtra">Maharashtra</option>
                  <option value="tamilnadu">Tamil Nadu</option>
                </select>
              </div>
              
              <Button 
                variant="farmer" 
                className="w-full"
                onClick={handleCropAnalysis}
                disabled={!selectedCrop || !selectedState}
              >
                <Filter className="h-4 w-4 mr-2" /> Analyze
              </Button>
            </div>
          
          <div className="flex justify-center items-center h-48 mb-4">
            {selectedState && <CropAnalysisChart selectedState={selectedState} />}
          </div>
        </Card>

          <Card className="p-6 col-span-1 lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold text-lg">Your Products</h3>
              <Button 
                variant="farmer" 
                size="sm"
                onClick={() => setShowAddProduct(true)}
              >
                <Plus className="h-4 w-4 mr-1" /> Add New Product
              </Button>
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
                  {products.map((product, index) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">₹{product.price}/kg</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{product.stock} kg</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs ${product.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                          {product.status}
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
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate('/farmer/products')}
              >
                View All Products
              </Button>
            </div>
          </Card>
        </div>
      </main>

      {/* Add New Product Dialog */}
      <Dialog open={showAddProduct} onOpenChange={setShowAddProduct}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleAddProduct} className="space-y-4 pt-4">
            <div>
              <Label htmlFor="name" className="block text-sm font-medium mb-1">
                Product Name *
              </Label>
              <input
                id="name"
                type="text"
                className="w-full p-2 border rounded-md"
                value={newProduct.name}
                onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price" className="block text-sm font-medium mb-1">
                  Price (₹) *
                </Label>
                <input
                  id="price"
                  type="number"
                  className="w-full p-2 border rounded-md"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="stock" className="block text-sm font-medium mb-1">
                  Stock (kg) *
                </Label>
                <input
                  id="stock"
                  type="number"
                  className="w-full p-2 border rounded-md"
                  value={newProduct.stock}
                  onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                  required
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="category" className="block text-sm font-medium mb-1">
                Category
              </Label>
              <select
                id="category"
                className="w-full p-2 border rounded-md"
                value={newProduct.category}
                onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
              >
                <option value="">Select a category</option>
                <option value="vegetables">Vegetables</option>
                <option value="fruits">Fruits</option>
                <option value="grains">Grains</option>
                <option value="dairy">Dairy</option>
                <option value="herbs">Herbs</option>
              </select>
            </div>
            
            <div>
              <Label htmlFor="description" className="block text-sm font-medium mb-1">
                Description
              </Label>
              <textarea
                id="description"
                rows={3}
                className="w-full p-2 border rounded-md"
                value={newProduct.description}
                onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
              />
            </div>
            
            <div className="flex justify-end gap-4 pt-4">
              <Button variant="outline" type="button" onClick={() => setShowAddProduct(false)}>
                Cancel
              </Button>
              <Button variant="farmer" type="submit">
                Add Product
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Profile Dialog */}
      <Dialog open={showProfile} onOpenChange={setShowProfile}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Farmer Profile</DialogTitle>
          </DialogHeader>
          
          <div className="flex items-center pt-6 pb-8 border-b">
            <div className="w-24 h-24 rounded-full bg-farmandi-green/10 flex items-center justify-center text-3xl text-farmandi-green font-bold mr-6">
              {profileData.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-xl font-bold">{profileData.name}</h2>
              <p className="text-gray-600">{profileData.farmName}</p>
              <p className="text-sm text-gray-500 mt-1">{profileData.location}</p>
            </div>
          </div>
          
          <div className="space-y-6 pt-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Contact Information</h3>
              <p className="mt-2">{profileData.phone}</p>
              <p>{profileData.email}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500">Farm Details</h3>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <p className="text-xs text-gray-500">Farm Size</p>
                  <p>{profileData.farmSize}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Member Since</p>
                  <p>{profileData.memberSince}</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500">Certifications</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {profileData.certifications.map((cert, idx) => (
                  <span key={idx} className="text-xs bg-farmandi-green/10 text-farmandi-green px-2 py-1 rounded-full">
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex justify-end gap-4 pt-6">
            <Button 
              variant="outline"
              onClick={() => setShowProfile(false)}
            >
              Close
            </Button>
            <Button variant="farmer">
              Edit Profile
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FarmerDashboard;
