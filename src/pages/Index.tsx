
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api, Product } from '@/lib/api';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FeaturedProduct from '@/components/FeaturedProduct';
import ProductCard from '@/components/ProductCard';
import { motion } from 'framer-motion';

const Index: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [featured, allProducts] = await Promise.all([
          api.getFeaturedProducts(),
          api.getProducts()
        ]);
        
        setFeaturedProducts(featured);
        setProducts(allProducts.slice(0, 4)); // Show first 4 products
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Step into <span className="relative inline-block">
                  <span className="relative z-10">Perfection</span>
                  <span className="absolute bottom-2 left-0 w-full h-3 bg-primary/10 rounded-full -z-0"></span>
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8">
                Discover our collection of premium footwear designed for style, comfort, and performance.
              </p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <Link to="/products">
                  <Button size="lg" className="rounded-full px-8">
                    Shop Collection
                  </Button>
                </Link>
                <Link to="/about">
                  <Button size="lg" variant="outline" className="rounded-full px-8">
                    Learn More
                  </Button>
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-square max-w-lg mx-auto">
                <img
                  src="https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/e14fc1e7-b501-4294-91f7-a4ab1c5a5020/air-max-90-shoes-kRsBnD.png"
                  alt="Featured Shoe"
                  className="w-full h-full object-contain z-10 relative"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/30 rounded-full blur-3xl -z-0"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Featured Collection</h2>
            <p className="text-muted-foreground mt-2">Our most popular styles</p>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="space-y-24">
              {featuredProducts.slice(0, 2).map((product, index) => (
                <FeaturedProduct key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* New Arrivals */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">New Arrivals</h2>
            <Link to="/products" className="text-sm font-medium hover:underline">
              View All
            </Link>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {products.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* Promotion */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Join Our Community
            </h2>
            <p className="mb-8">
              Subscribe to our newsletter for exclusive deals and updates on new releases.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-2 rounded-md text-foreground bg-background flex-1"
              />
              <Button variant="secondary" className="whitespace-nowrap">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
