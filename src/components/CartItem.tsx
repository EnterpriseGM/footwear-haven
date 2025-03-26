
import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Product, CartItem as CartItemType } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';

interface CartItemProps {
  item: CartItemType;
  product: Product;
}

const CartItem: React.FC<CartItemProps> = ({ item, product }) => {
  const { updateQuantity, removeItem } = useCart();
  
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(item.id, newQuantity);
  };
  
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center py-6 border-b border-border animate-fade-in">
      <div className="flex-shrink-0 w-24 h-24 bg-secondary/50 rounded-md overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover object-center"
        />
      </div>
      
      <div className="flex-1 sm:ml-6 mt-4 sm:mt-0">
        <div className="flex flex-col sm:flex-row sm:justify-between">
          <div>
            <h3 className="text-base font-medium">
              <Link to={`/product/${product.id}`} className="hover:underline">
                {product.name}
              </Link>
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {product.brand} | Size: {item.size} | Color: {item.color}
            </p>
          </div>
          
          <div className="mt-2 sm:mt-0 text-right">
            <p className="font-medium">${product.price}</p>
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => handleQuantityChange(item.quantity - 1)}
            >
              <Minus size={14} />
            </Button>
            
            <span className="w-10 text-center">{item.quantity}</span>
            
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => handleQuantityChange(item.quantity + 1)}
            >
              <Plus size={14} />
            </Button>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-destructive"
            onClick={() => removeItem(item.id)}
          >
            <Trash2 size={16} className="mr-1" />
            <span className="text-sm">Remove</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
