
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface FeaturedProductProps {
  product: Product;
}

const FeaturedProduct: React.FC<FeaturedProductProps> = ({ product }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="order-2 md:order-1"
      >
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
              {product.brand}
            </h3>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
              {product.name}
            </h2>
          </div>
          
          <p className="text-muted-foreground max-w-md">
            {product.description.split('.')[0]}.
          </p>
          
          <div className="pt-4">
            <span className="text-xl md:text-2xl font-semibold">
              ${product.price}
            </span>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <Link to={`/product/${product.id}`}>
              <Button size="lg" className="rounded-full px-8">
                View Details
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="order-1 md:order-2"
      >
        <div className="relative aspect-square overflow-hidden rounded-xl bg-muted/30">
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover object-center hover:scale-105 transition-transform duration-700"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default FeaturedProduct;
