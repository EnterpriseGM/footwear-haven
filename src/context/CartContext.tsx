
import React, { createContext, useContext, useState, useEffect } from 'react';
import { api, CartItem, Product } from '@/lib/api';
import { toast } from 'sonner';

interface CartContextType {
  items: CartItem[];
  products: Map<string, Product>;
  loading: boolean;
  addToCart: (productId: string, quantity: number, size: number, color: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Map<string, Product>>(new Map());
  const [loading, setLoading] = useState(true);
  
  // Initialize cart
  useEffect(() => {
    const initCart = async () => {
      try {
        const cartItems = await api.getCart();
        setItems(cartItems);
        
        // Fetch product details for each cart item
        const productDetails = new Map<string, Product>();
        
        for (const item of cartItems) {
          const product = await api.getProductById(item.productId);
          if (product) {
            productDetails.set(item.productId, product);
          }
        }
        
        setProducts(productDetails);
      } catch (error) {
        console.error('Failed to initialize cart:', error);
      } finally {
        setLoading(false);
      }
    };
    
    initCart();
  }, []);
  
  const addToCart = async (productId: string, quantity: number, size: number, color: string) => {
    try {
      setLoading(true);
      const newItem = await api.addToCart({ productId, quantity, size, color });
      
      // Check if we need to fetch the product
      if (!products.has(productId)) {
        const product = await api.getProductById(productId);
        if (product) {
          setProducts(new Map(products).set(productId, product));
        }
      }
      
      // Update items state
      const existingItemIndex = items.findIndex(
        item => item.productId === productId && item.size === size && item.color === color
      );
      
      if (existingItemIndex >= 0) {
        const updatedItems = [...items];
        updatedItems[existingItemIndex].quantity += quantity;
        setItems(updatedItems);
      } else {
        setItems([...items, newItem]);
      }
      
      toast.success('Added to cart');
    } catch (error) {
      console.error('Failed to add to cart:', error);
      toast.error('Failed to add to cart');
    } finally {
      setLoading(false);
    }
  };
  
  const updateQuantity = async (itemId: string, quantity: number) => {
    try {
      setLoading(true);
      
      if (quantity <= 0) {
        await removeItem(itemId);
        return;
      }
      
      await api.updateCartItem(itemId, { quantity });
      
      setItems(
        items.map(item => (item.id === itemId ? { ...item, quantity } : item))
      );
      
      toast.success('Cart updated');
    } catch (error) {
      console.error('Failed to update cart:', error);
      toast.error('Failed to update cart');
    } finally {
      setLoading(false);
    }
  };
  
  const removeItem = async (itemId: string) => {
    try {
      setLoading(true);
      await api.removeFromCart(itemId);
      setItems(items.filter(item => item.id !== itemId));
      toast.success('Item removed from cart');
    } catch (error) {
      console.error('Failed to remove item:', error);
      toast.error('Failed to remove item');
    } finally {
      setLoading(false);
    }
  };
  
  const clearCart = async () => {
    try {
      setLoading(true);
      await api.clearCart();
      setItems([]);
      toast.success('Cart cleared');
    } catch (error) {
      console.error('Failed to clear cart:', error);
      toast.error('Failed to clear cart');
    } finally {
      setLoading(false);
    }
  };
  
  // Calculate total items and price
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  
  const totalPrice = items.reduce((total, item) => {
    const product = products.get(item.productId);
    return total + (product?.price || 0) * item.quantity;
  }, 0);
  
  return (
    <CartContext.Provider
      value={{
        items,
        products,
        loading,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        totalItems,
        totalPrice,
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
