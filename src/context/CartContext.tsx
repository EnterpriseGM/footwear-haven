
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem } from '@/lib/api';
import { apiClient } from '@/lib/apiClient';
import { toast } from 'sonner';

interface CartContextType {
  items: CartItem[];
  products: Map<string, Product>;
  totalItems: number;
  totalPrice: number;
  loading: boolean;
  addToCart: (productId: string, quantity: number, size: number, color: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Map<string, Product>>(new Map());
  const [loading, setLoading] = useState(true);
  
  // Fetch initial cart and products
  useEffect(() => {
    const fetchCartAndProducts = async () => {
      try {
        const [cartItems, allProducts] = await Promise.all([
          apiClient.getCart(),
          apiClient.getProducts()
        ]);
        
        setItems(cartItems);
        
        const productMap = new Map();
        allProducts.forEach(product => {
          productMap.set(product.id, product);
        });
        
        setProducts(productMap);
      } catch (error) {
        console.error('Failed to fetch cart or products:', error);
        toast.error('Failed to load cart');
      } finally {
        setLoading(false);
      }
    };
    
    fetchCartAndProducts();
  }, []);
  
  // Calculate total items and price
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  
  const totalPrice = items.reduce((sum, item) => {
    const product = products.get(item.productId);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);
  
  // Add item to cart
  const addToCart = async (productId: string, quantity: number, size: number, color: string) => {
    try {
      // The userId would normally come from auth context
      const userId = 'user1'; 
      
      const newItem = await apiClient.addToCart({
        userId,
        productId,
        quantity,
        size,
        color
      });
      
      // Update local state
      const existingItem = items.find(
        item => item.productId === productId && item.size === size && item.color === color
      );
      
      if (existingItem) {
        setItems(items.map(item => 
          item.id === existingItem.id ? { ...item, quantity: item.quantity + quantity } : item
        ));
      } else {
        setItems([...items, newItem]);
      }
      
      toast.success('Added to cart');
    } catch (error) {
      console.error('Failed to add to cart:', error);
      toast.error('Failed to add to cart');
    }
  };
  
  // Update item quantity
  const updateQuantity = async (itemId: string, quantity: number) => {
    try {
      await apiClient.updateCartItem(itemId, { quantity });
      
      setItems(items.map(item => 
        item.id === itemId ? { ...item, quantity } : item
      ));
    } catch (error) {
      console.error('Failed to update cart:', error);
      toast.error('Failed to update cart');
    }
  };
  
  // Remove item from cart
  const removeItem = async (itemId: string) => {
    try {
      await apiClient.removeFromCart(itemId);
      
      setItems(items.filter(item => item.id !== itemId));
      toast.success('Item removed from cart');
    } catch (error) {
      console.error('Failed to remove from cart:', error);
      toast.error('Failed to remove from cart');
    }
  };
  
  // Clear cart
  const clearCart = async () => {
    try {
      await apiClient.clearCart();
      
      setItems([]);
      toast.success('Cart cleared');
    } catch (error) {
      console.error('Failed to clear cart:', error);
      toast.error('Failed to clear cart');
    }
  };
  
  return (
    <CartContext.Provider
      value={{
        items,
        products,
        totalItems,
        totalPrice,
        loading,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
