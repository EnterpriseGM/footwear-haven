
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem } from '@/lib/api';
import { apiClient } from '@/lib/apiClient';
import { toast } from 'sonner';

interface CartContextType {
  cart: CartItem[];
  totalItems: number;
  totalPrice: number;
  loading: boolean;
  // Renamed functions to match what's used in components
  addToCart: (product: Product | string, quantity: number, size: number, color: string) => Promise<void>;
  removeItem: (cartItemId: string) => Promise<void>;
  updateQuantity: (cartItemId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  // Add these properties to match what's used in Cart.tsx
  items: CartItem[];
  products: Map<string, Product>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [productsData, setProductsData] = useState<Product[]>([]);
  // Create a Map for easier product lookup
  const [productsMap, setProductsMap] = useState<Map<string, Product>>(new Map());
  
  const fetchCartAndProducts = async () => {
    setLoading(true);
    try {
      const [cartData, products] = await Promise.all([
        apiClient.getCart(),
        apiClient.getProducts()
      ]);
      
      setCart(cartData);
      setProductsData(products);
      
      // Create a Map from products array for efficient lookups
      const productsMap = new Map();
      products.forEach(product => {
        productsMap.set(product.id, product);
      });
      setProductsMap(productsMap);
    } catch (error) {
      console.error('Failed to fetch cart or products:', error);
      toast.error('Failed to load cart');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchCartAndProducts();
  }, []);
  
  // Calculate total items
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  
  // Calculate total price
  const totalPrice = cart.reduce((total, item) => {
    const product = productsMap.get(item.productId);
    return total + (product?.price || 0) * item.quantity;
  }, 0);
  
  const addToCart = async (productOrId: Product | string, quantity: number, size: number, color: string) => {
    try {
      const productId = typeof productOrId === 'string' ? productOrId : productOrId.id;
      
      await apiClient.addToCart({
        productId,
        quantity,
        size,
        color
      });
      
      toast.success('Added to cart');
      fetchCartAndProducts();
    } catch (error) {
      console.error('Failed to add to cart:', error);
      toast.error('Failed to add to cart');
    }
  };
  
  const removeItem = async (cartItemId: string) => {
    try {
      await apiClient.removeFromCart(cartItemId);
      toast.success('Item removed from cart');
      setCart(cart.filter(item => item.id !== cartItemId));
    } catch (error) {
      console.error('Failed to remove from cart:', error);
      toast.error('Failed to remove from cart');
    }
  };
  
  const updateQuantity = async (cartItemId: string, quantity: number) => {
    try {
      await apiClient.updateCartItem(cartItemId, { quantity });
      toast.success('Cart updated');
      
      setCart(cart.map(item => 
        item.id === cartItemId ? { ...item, quantity } : item
      ));
    } catch (error) {
      console.error('Failed to update cart:', error);
      toast.error('Failed to update cart');
    }
  };
  
  const clearCart = async () => {
    try {
      await apiClient.clearCart();
      toast.success('Cart cleared');
      setCart([]);
    } catch (error) {
      console.error('Failed to clear cart:', error);
      toast.error('Failed to clear cart');
    }
  };
  
  return (
    <CartContext.Provider
      value={{
        cart,
        totalItems,
        totalPrice,
        loading,
        addToCart,
        removeItem,
        updateQuantity,
        clearCart,
        // Add these properties to match what's used in Cart.tsx
        items: cart,
        products: productsMap
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
