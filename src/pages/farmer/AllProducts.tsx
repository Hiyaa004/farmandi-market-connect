
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChevronLeft, Plus, Search, Filter, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

// Generate 25 products for the demo
const generateProducts = () => {
  const categories = ['Vegetables', 'Fruits', 'Grains', 'Dairy', 'Herbs'];
  const units = ['kg', 'box', 'dozen', 'bundle'];
  const statuses = ['Active', 'Low Stock', 'Out of Stock'];
  
  return Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    name: `${['Organic', 'Fresh', 'Premium', 'Natural'][i % 4]} ${['Tomatoes', 'Potatoes', 'Onions', 'Carrots', 'Apples', 'Oranges', 'Strawberries', 'Cabbage', 'Spinach', 'Wheat', 'Rice', 'Milk', 'Cheese', 'Yogurt', 'Mint', 'Basil', 'Coriander', 'Garlic', 'Ginger', 'Lettuce', 'Cucumber', 'Eggplant', 'Pumpkin', 'Corn', 'Beans'][i % 25]}`,
    category: categories[i % categories.length],
    price: Math.floor(Math.random() * 90) + 10,
    stock: Math.floor(Math.random() * 100),
    unit: units[i % units.length],
    status: statuses[i % statuses.length],
    date: new Date(Date.now() - Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  }));
};

const AllProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState(generateProducts());
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');

  // Filter products based on search and filters
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory ? product.category === filterCategory : true;
    const matchesStatus = filterStatus ? product.status === filterStatus : true;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    let comparison = 0;
    
    if (sortField === 'name') {
      comparison = a.name.localeCompare(b.name);
    } else if (sortField === 'price') {
      comparison = a.price - b.price;
    } else if (sortField === 'stock') {
      comparison = a.stock - b.stock;
    } else if (sortField === 'date') {
      comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
    }
    
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleDeleteProduct = (id: number) => {
    const product = products.find(p => p.id === id);
    if (product) {
      setProducts(products.filter(p => p.id !== id));
      toast.success(`${product.name} has been deleted`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-farmandi-green text-white">
        <div className="container mx-auto px-6 py-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">All Products</h1>
              <p className="text-white/80">Manage your farm's product listings</p>
            </div>
            <Button 
              variant="outline" 
              className="bg-white/10 text-white border-white/20"
              onClick={() => navigate('/farmer/dashboard')}
            >
              <ChevronLeft className="h-4 w-4 mr-2" /> Back to Dashboard
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <Card className="mb-8">
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="md:w-1/3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full px-4 py-2 pl-10 border rounded-md"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
                </div>
              </div>
              
              <div className="md:w-1/3 flex gap-4">
                <select
                  className="w-1/2 px-3 py-2 border rounded-md"
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                >
                  <option value="">All Categories</option>
                  <option value="Vegetables">Vegetables</option>
                  <option value="Fruits">Fruits</option>
                  <option value="Grains">Grains</option>
                  <option value="Dairy">Dairy</option>
                  <option value="Herbs">Herbs</option>
                </select>
                
                <select
                  className="w-1/2 px-3 py-2 border rounded-md"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="">All Statuses</option>
                  <option value="Active">Active</option>
                  <option value="Low Stock">Low Stock</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
              </div>
              
              <div className="md:w-1/3 flex justify-end">
                <Button 
                  variant="farmer"
                  onClick={() => navigate('/farmer/add-product')}
                >
                  <Plus className="h-4 w-4 mr-2" /> Add New Product
                </Button>
              </div>
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button 
                      className="flex items-center"
                      onClick={() => handleSort('name')}
                    >
                      Product
                      {sortField === 'name' && (
                        <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                      )}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button 
                      className="flex items-center"
                      onClick={() => handleSort('price')}
                    >
                      Price
                      {sortField === 'price' && (
                        <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                      )}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button 
                      className="flex items-center"
                      onClick={() => handleSort('stock')}
                    >
                      Stock
                      {sortField === 'stock' && (
                        <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                      )}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button 
                      className="flex items-center"
                      onClick={() => handleSort('date')}
                    >
                      Added
                      {sortField === 'date' && (
                        <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                      )}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{product.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ₹{product.price}/{product.unit}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.stock} {product.unit}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        product.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : product.status === 'Low Stock'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-red-100 text-red-800'
                      }`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-red-500 hover:text-red-700"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {sortedProducts.length === 0 && (
            <div className="py-12 text-center text-gray-500">
              No products found matching your search criteria.
            </div>
          )}
        </Card>
      </main>
    </div>
  );
};

export default AllProducts;
