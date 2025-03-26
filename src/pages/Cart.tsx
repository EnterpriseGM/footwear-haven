
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartItem from '@/components/CartItem';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import { apiClient } from '@/lib/apiClient';
import { toast } from 'sonner';

const Cart: React.FC = () => {
  const { items, products, loading, totalItems, totalPrice, clearCart } = useCart();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  
  const handleCheckout = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    try {
      // Create a simple order object
      const orderData = {
        userId: user?.id,
        shippingAddress: {
          street: '123 Main St',
          city: 'Exampleville',
          state: 'CA',
          zipCode: '12345',
          country: 'US'
        },
        paymentMethod: 'credit_card'
      };
      
      // Create the order
      await apiClient.createOrder(orderData);
      
      // Clear the cart after successful order
      clearCart();
      
      toast.success('Order placed successfully!');
      navigate('/');
    } catch (error) {
      console.error('Failed to create order:', error);
      toast.error('Failed to place order');
    }
  };
  
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Shopping Cart</h1>
            <p className="text-muted-foreground mt-1">
              {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>
          
          {items.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-16"
            >
              <ShoppingBag className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
              <h2 className="text-xl font-medium mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6">
                Looks like you haven't added anything to your cart yet.
              </p>
              <Link to="/">
                <Button>
                  Continue Shopping
                </Button>
              </Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-card rounded-lg border border-border overflow-hidden">
                  <div className="divide-y divide-border">
                    {items.map((item) => {
                      const product = products.get(item.productId);
                      if (!product) return null;
                      
                      return (
                        <CartItem
                          key={item.id}
                          item={item}
                          product={product}
                        />
                      );
                    })}
                  </div>
                  
                  <div className="p-4 flex justify-between items-center">
                    <Link to="/" className="text-sm text-primary flex items-center">
                      <ArrowLeft size={16} className="mr-1" />
                      Continue Shopping
                    </Link>
                    
                    <Button variant="outline" size="sm" onClick={() => clearCart()}>
                      Clear Cart
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-1">
                <div className="bg-card rounded-lg border border-border p-6 sticky top-24">
                  <h2 className="text-lg font-medium mb-4">Order Summary</h2>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>Calculated at checkout</span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tax</span>
                      <span>Calculated at checkout</span>
                    </div>
                    
                    <div className="border-t border-border pt-3">
                      <div className="flex justify-between font-medium">
                        <span>Total</span>
                        <span>${totalPrice.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <Button className="w-full" size="lg" onClick={handleCheckout}>
                      {isAuthenticated ? 'Proceed to Checkout' : 'Sign In to Checkout'}
                    </Button>
                    
                    <div className="mt-4 text-xs text-center text-muted-foreground">
                      <p>Shipping and taxes calculated at checkout.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
