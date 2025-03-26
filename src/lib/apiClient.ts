
import { Product, CartItem, User } from './api'; // We'll reuse the existing types

// Define the base URL for our API
const API_URL = 'http://localhost:3000'; // This should point to your NestJS server

// Helper function for API requests
const fetchAPI = async (endpoint: string, options: RequestInit = {}) => {
  const response = await fetch(`${API_URL}/${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'An error occurred' }));
    throw new Error(error.message || 'API request failed');
  }

  return response.json();
};

// API client that communicates with our NestJS backend
export const apiClient = {
  // Product endpoints
  getProducts: async (): Promise<Product[]> => {
    return fetchAPI('products');
  },
  
  getProductById: async (id: string): Promise<Product | undefined> => {
    return fetchAPI(`products/${id}`);
  },
  
  getFeaturedProducts: async (): Promise<Product[]> => {
    return fetchAPI('products/featured');
  },
  
  createProduct: async (product: Omit<Product, 'id'>): Promise<Product> => {
    return fetchAPI('products', {
      method: 'POST',
      body: JSON.stringify(product),
    });
  },
  
  updateProduct: async (id: string, updates: Partial<Product>): Promise<Product | undefined> => {
    return fetchAPI(`products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  },
  
  deleteProduct: async (id: string): Promise<boolean> => {
    await fetchAPI(`products/${id}`, {
      method: 'DELETE',
    });
    return true;
  },
  
  // Cart endpoints
  getCart: async (): Promise<CartItem[]> => {
    return fetchAPI('carts');
  },
  
  addToCart: async (item: Omit<CartItem, 'id'>): Promise<CartItem> => {
    return fetchAPI('carts', {
      method: 'POST',
      body: JSON.stringify(item),
    });
  },
  
  updateCartItem: async (id: string, updates: Partial<CartItem>): Promise<CartItem | undefined> => {
    return fetchAPI(`carts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  },
  
  removeFromCart: async (id: string): Promise<boolean> => {
    await fetchAPI(`carts/${id}`, {
      method: 'DELETE',
    });
    return true;
  },
  
  clearCart: async (): Promise<boolean> => {
    await fetchAPI('carts', {
      method: 'DELETE',
    });
    return true;
  },
  
  // Auth endpoints (mocked for now until we implement real auth)
  login: async (email: string, password: string): Promise<User | null> => {
    try {
      // This would be replaced with a real login endpoint once implemented
      if (email === "user@example.com" && password === "password") {
        return {
          id: "user1",
          name: "John Doe",
          email: "user@example.com",
          isAdmin: false
        };
      } else if (email === "admin@example.com" && password === "admin") {
        return {
          id: "admin1",
          name: "Admin User",
          email: "admin@example.com",
          isAdmin: true
        };
      }
      return null;
    } catch (error) {
      console.error('Login error:', error);
      return null;
    }
  },
  
  logout: async (): Promise<boolean> => {
    // This would be replaced with a real logout endpoint once implemented
    return true;
  },
  
  getCurrentUser: async (): Promise<User | null> => {
    // This would be replaced with a real endpoint to get current user
    return null;
  },
  
  // Order endpoints
  getUserOrders: async (userId: string): Promise<any[]> => {
    return fetchAPI(`orders/user?userId=${userId}`);
  },
  
  getAllOrders: async (): Promise<any[]> => {
    return fetchAPI('orders/admin/all');
  },
  
  getOrderById: async (id: string): Promise<any> => {
    return fetchAPI(`orders/${id}`);
  },
  
  createOrder: async (orderData: any): Promise<any> => {
    return fetchAPI('orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  },
  
  updateOrderStatus: async (id: string, status: string): Promise<any> => {
    return fetchAPI(`orders/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  }
};
