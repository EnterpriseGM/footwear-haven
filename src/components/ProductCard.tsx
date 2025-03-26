
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/lib/api';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Staggered animation delay based on index
  const delay = index * 0.1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative overflow-hidden rounded-lg bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-all duration-300"
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative h-[280px] overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className={`w-full h-full object-cover object-center transition-transform duration-700 ${
              isHovered && product.images.length > 1 ? 'opacity-0' : 'opacity-100'
            }`}
          />
          
          {product.images.length > 1 && (
            <img
              src={product.images[1]}
              alt={`${product.name} alternate view`}
              className={`absolute top-0 left-0 w-full h-full object-cover object-center transition-opacity duration-700 ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
            />
          )}
        </div>
        
        <div className="p-4">
          <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-1">
            {product.brand}
          </div>
          <h3 className="text-base font-medium line-clamp-1">{product.name}</h3>
          <div className="mt-2 font-medium">${product.price}</div>
        </div>
      </Link>
      
      <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background to-transparent h-24 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />
    </motion.div>
  );
};

export default ProductCard;
