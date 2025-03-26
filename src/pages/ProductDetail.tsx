import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Product } from '@/lib/api';
import { apiClient } from '@/lib/apiClient';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Minus, Plus, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart } = useCart();
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!id) {
          navigate('/');
          return;
        }
        
        const productData = await apiClient.getProductById(id);
        if (!productData) {
          navigate('/');
          return;
        }
        
        setProduct(productData);
        // Set default selections
        if (productData.sizes.length > 0) {
          setSelectedSize(productData.sizes[0]);
        }
        if (productData.colors.length > 0) {
          setSelectedColor(productData.colors[0]);
        }
      } catch (error) {
        console.error('Failed to fetch product:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [id, navigate]);
  
  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };
  
  const handleAddToCart = async () => {
    if (!product || !selectedSize || !selectedColor) return;
    
    await addToCart(product.id, quantity, selectedSize, selectedColor);
  };
  
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Product not found</h2>
          <Button className="mt-4" onClick={() => navigate('/')}>
            Back to Home
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Images */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <div className="aspect-square overflow-hidden rounded-lg bg-secondary/30">
                <img
                  src={product?.images[selectedImage]}
                  alt={product?.name}
                  className="h-full w-full object-contain object-center"
                />
              </div>
              
              {product?.images.length > 1 && (
                <div className="flex space-x-2 overflow-auto py-1">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md ${
                        selectedImage === index ? 'ring-2 ring-primary' : 'ring-1 ring-border'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} view ${index + 1}`}
                        className="h-full w-full object-cover object-center"
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
            
            {/* Product Info */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-6"
            >
              <div>
                <h1 className="text-3xl font-bold">{product?.name}</h1>
                <p className="text-muted-foreground">{product?.brand}</p>
              </div>
              
              <p className="text-2xl font-semibold">${product?.price}</p>
              
              <div className="space-y-4">
                {/* Size Selection */}
                <div>
                  <label htmlFor="size" className="text-sm font-medium block mb-2">
                    Select Size
                  </label>
                  <Select
                    value={selectedSize?.toString() || ''}
                    onValueChange={(value) => setSelectedSize(Number(value))}
                  >
                    <SelectTrigger id="size" className="w-full">
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      {product?.sizes.map((size) => (
                        <SelectItem key={size} value={size.toString()}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Color Selection */}
                <div>
                  <label className="text-sm font-medium block mb-2">
                    Select Color
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product?.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`h-10 px-4 rounded-md border ${
                          selectedColor === color
                            ? 'ring-2 ring-primary border-primary'
                            : 'border-border'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Quantity */}
                <div>
                  <label className="text-sm font-medium block mb-2">
                    Quantity
                  </label>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                    >
                      <Minus size={16} />
                    </Button>
                    <span className="w-10 text-center">{quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleQuantityChange(1)}
                    >
                      <Plus size={16} />
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Add to Cart */}
              <Button
                className="w-full"
                size="lg"
                onClick={handleAddToCart}
                disabled={!selectedSize || !selectedColor}
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              
              {/* Description */}
              <div className="pt-4 border-t border-border">
                <h2 className="text-lg font-medium mb-2">Product Description</h2>
                <p className="text-muted-foreground">
                  {product?.description}
                </p>
              </div>
              
              {/* Product Details */}
              <div className="pt-4 border-t border-border">
                <h2 className="text-lg font-medium mb-2">Product Details</h2>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Brand: {product?.brand}</li>
                  <li>Category: {product?.category}</li>
                  <li>Available Sizes: {product?.sizes.join(', ')}</li>
                  <li>Available Colors: {product?.colors.join(', ')}</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
