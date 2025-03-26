
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { api, Product } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Edit, Plus, Search, Trash } from 'lucide-react';
import { toast } from 'sonner';

const Admin: React.FC = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({
    name: '',
    brand: '',
    description: '',
    price: 0,
    images: [''],
    sizes: [],
    colors: [],
    category: '',
    featured: false
  });
  
  // Check authentication and admin status
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    if (!isAdmin) {
      navigate('/');
      toast.error('You do not have access to the admin area');
      return;
    }
  }, [isAuthenticated, isAdmin, navigate]);
  
  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await api.getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
        toast.error('Failed to load products');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);
  
  const handleEditProduct = (product: Product) => {
    setCurrentProduct({...product});
    setIsEditing(true);
  };
  
  const handleCreateProduct = () => {
    setCurrentProduct({
      name: '',
      brand: '',
      description: '',
      price: 0,
      images: [''],
      sizes: [],
      colors: [],
      category: '',
      featured: false
    });
    setIsEditing(true);
  };
  
  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    try {
      await api.deleteProduct(id);
      setProducts(products.filter(p => p.id !== id));
      toast.success('Product deleted');
    } catch (error) {
      console.error('Failed to delete product:', error);
      toast.error('Failed to delete product');
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (currentProduct.id) {
        // Update existing product
        const updated = await api.updateProduct(
          currentProduct.id,
          currentProduct as Product
        );
        
        if (updated) {
          setProducts(
            products.map(p => (p.id === updated.id ? updated : p))
          );
          toast.success('Product updated');
        }
      } else {
        // Create new product
        const newProduct = await api.createProduct(
          currentProduct as Omit<Product, 'id'>
        );
        
        setProducts([...products, newProduct]);
        toast.success('Product created');
      }
      
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to save product:', error);
      toast.error('Failed to save product');
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentProduct({
      ...currentProduct,
      [name]: name === 'price' ? Number(value) : value
    });
  };
  
  const handleArrayChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'sizes' | 'colors' | 'images') => {
    const values = e.target.value.split(',').map(v => v.trim());
    
    if (field === 'sizes') {
      const sizeNumbers = values.map(v => Number(v)).filter(v => !isNaN(v));
      setCurrentProduct({
        ...currentProduct,
        [field]: sizeNumbers
      });
    } else {
      setCurrentProduct({
        ...currentProduct,
        [field]: values
      });
    }
  };
  
  const handleSwitchChange = (checked: boolean) => {
    setCurrentProduct({
      ...currentProduct,
      featured: checked
    });
  };
  
  // Filter products based on search term
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-8 flex justify-between items-center">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            
            <Button onClick={handleCreateProduct}>
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </div>
          
          {isEditing ? (
            <div className="bg-card rounded-lg border border-border p-6">
              <h2 className="text-xl font-bold mb-6">
                {currentProduct.id ? 'Edit Product' : 'Add New Product'}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Product Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={currentProduct.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="brand">Brand</Label>
                    <Input
                      id="brand"
                      name="brand"
                      value={currentProduct.brand}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="price">Price</Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      min="0"
                      step="0.01"
                      value={currentProduct.price}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Input
                      id="category"
                      name="category"
                      value={currentProduct.category}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={currentProduct.description}
                      onChange={handleInputChange}
                      rows={4}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="images">Images URLs (comma separated)</Label>
                    <Input
                      id="images"
                      value={currentProduct.images?.join(', ')}
                      onChange={(e) => handleArrayChange(e, 'images')}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="sizes">Sizes (comma separated)</Label>
                    <Input
                      id="sizes"
                      value={currentProduct.sizes?.join(', ')}
                      onChange={(e) => handleArrayChange(e, 'sizes')}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="colors">Colors (comma separated)</Label>
                    <Input
                      id="colors"
                      value={currentProduct.colors?.join(', ')}
                      onChange={(e) => handleArrayChange(e, 'colors')}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2 flex items-center space-x-2">
                    <Switch
                      id="featured"
                      checked={currentProduct.featured}
                      onCheckedChange={handleSwitchChange}
                    />
                    <Label htmlFor="featured">Featured Product</Label>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    {currentProduct.id ? 'Update Product' : 'Create Product'}
                  </Button>
                </div>
              </form>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search products..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              {loading ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No products found</p>
                </div>
              ) : (
                <div className="bg-card rounded-lg border border-border overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-muted/50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Product
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Price
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Category
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Featured
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {filteredProducts.map((product) => (
                          <tr key={product.id} className="hover:bg-muted/30">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="h-10 w-10 flex-shrink-0 bg-secondary/50 rounded overflow-hidden">
                                  <img
                                    src={product.images[0]}
                                    alt={product.name}
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                                <div className="ml-4">
                                  <div className="font-medium">{product.name}</div>
                                  <div className="text-sm text-muted-foreground">{product.brand}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              ${product.price}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {product.category}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {product.featured ? (
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                  Yes
                                </span>
                              ) : (
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                                  No
                                </span>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEditProduct(product)}
                                className="mr-2"
                              >
                                <Edit size={16} />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteProduct(product.id)}
                                className="text-destructive"
                              >
                                <Trash size={16} />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Admin;
