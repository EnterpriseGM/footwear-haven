
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem } from '@/lib/api';
import { apiClient } from '@/lib/apiClient';
import { toast } from 'sonner';

interface CartContextType {
  cart: CartItem[];
  totalItems: number;
  totalPrice: number;
  loading: boolean;
  addToCart: (product: Product, quantity: number, size: number, color: string) => Promise<void>;
  removeFromCart: (cartItemId: string) => Promise<void>;
  updateCartItem: (cartItemId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  
  const fetchCartAndProducts = async () => {
    setLoading(true);
    try {
      const [cartData, productsData] = await Promise.all([
        apiClient.getCart(),
        apiClient.getProducts()
      ]);
      
      setCart(cartData);
      setProducts(productsData);
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
    const product = products.find(p => p.id === item.productId);
    return total + (product?.price || 0) * item.quantity;
  }, 0);
  
  const addToCart = async (product: Product, quantity: number, size: number, color: string) => {
    try {
      await apiClient.addToCart({
        productId: product.id,
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
  
  const removeFromCart = async (cartItemId: string) => {
    try {
      await apiClient.removeFromCart(cartItemId);
      toast.success('Item removed from cart');
      setCart(cart.filter(item => item.id !== cartItemId));
    } catch (error) {
      console.error('Failed to remove from cart:', error);
      toast.error('Failed to remove from cart');
    }
  };
  
  const updateCartItem = async (cartItemId: string, quantity: number) => {
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
        removeFromCart,
        updateCartItem,
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
