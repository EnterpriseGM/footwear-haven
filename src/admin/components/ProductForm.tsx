
import React, { useState, useEffect } from 'react';
import { Product } from '@/lib/api';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface ProductFormProps {
  product?: Partial<Product>;
  onSubmit: (product: Partial<Product>) => void;
  onCancel: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<Partial<Product>>({
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
  
  useEffect(() => {
    if (product) {
      setFormData(product);
    }
  }, [product]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'price' ? Number(value) : value
    });
  };
  
  const handleArrayChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'sizes' | 'colors' | 'images') => {
    const values = e.target.value.split(',').map(v => v.trim());
    
    if (field === 'sizes') {
      const sizeNumbers = values.map(v => Number(v)).filter(v => !isNaN(v));
      setFormData({
        ...formData,
        [field]: sizeNumbers
      });
    } else {
      setFormData({
        ...formData,
        [field]: values.filter(v => v !== '')
      });
    }
  };
  
  const handleSwitchChange = (checked: boolean) => {
    setFormData({
      ...formData,
      featured: checked
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };
  
  return (
    <div>
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onCancel}
          className="mr-2"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-xl font-semibold">
          {product?.id ? 'Edit Product' : 'Create New Product'}
        </h1>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6 bg-card p-6 rounded-lg border border-border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="brand">Brand</Label>
            <Input
              id="brand"
              name="brand"
              value={formData.brand}
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
              value={formData.price}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="images">Images URLs (comma separated)</Label>
            <Input
              id="images"
              value={formData.images?.join(', ')}
              onChange={(e) => handleArrayChange(e, 'images')}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="sizes">Sizes (comma separated)</Label>
            <Input
              id="sizes"
              value={formData.sizes?.join(', ')}
              onChange={(e) => handleArrayChange(e, 'sizes')}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="colors">Colors (comma separated)</Label>
            <Input
              id="colors"
              value={formData.colors?.join(', ')}
              onChange={(e) => handleArrayChange(e, 'colors')}
              required
            />
          </div>
          
          <div className="space-y-2 flex items-center space-x-2">
            <Switch
              id="featured"
              checked={formData.featured || false}
              onCheckedChange={handleSwitchChange}
            />
            <Label htmlFor="featured">Featured Product</Label>
          </div>
        </div>
        
        <div className="flex justify-end space-x-2">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button type="submit">
            {product?.id ? 'Update Product' : 'Create Product'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
