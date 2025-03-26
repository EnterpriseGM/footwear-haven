
// This is a mock API client that simulates backend calls
// In a real application, this would be replaced with actual API calls

export interface Product {
  id: string;
  name: string;
  brand: string;
  description: string;
  price: number;
  images: string[];
  sizes: number[];
  colors: string[];
  category: string;
  featured: boolean;
}

export interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  size: number;
  color: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

// Mock data
const products: Product[] = [
  {
    id: "1",
    name: "Air Max 90",
    brand: "Nike",
    description: "The Nike Air Max 90 stays true to its OG running roots with the iconic Waffle sole, stitched overlays and classic TPU details. Classic colors celebrate your fresh style while Max Air cushioning adds comfort to your journey.",
    price: 120,
    images: [
      "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/e14fc1e7-b501-4294-91f7-a4ab1c5a5020/air-max-90-shoes-kRsBnD.png",
      "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/2efaf871-bb98-4887-b12f-7a2af45c0f42/air-max-90-shoes-kRsBnD.png"
    ],
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11],
    colors: ["White", "Black", "Red"],
    category: "Running",
    featured: true
  },
  {
    id: "2",
    name: "Ultra Boost",
    brand: "Adidas",
    description: "Ultraboost has been carefully crafted to deliver incredible energy return, comfort and style. These shoes feature a seamless knit upper that hugs your foot and a Boost midsole that delivers extraordinary energy return with every step.",
    price: 180,
    images: [
      "https://assets.adidas.com/images/w_600,f_auto,q_auto/a8c0466e30b5443aa044ac9c01091e16_9366/Ultraboost_22_Shoes_Black_GZ0127_01_standard.jpg",
      "https://assets.adidas.com/images/w_600,f_auto,q_auto/d3e57dd658cb4bb79a9aac9c010934eb_9366/Ultraboost_22_Shoes_Black_GZ0127_02_standard_hover.jpg"
    ],
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11],
    colors: ["Black", "White", "Grey"],
    category: "Running",
    featured: true
  },
  {
    id: "3",
    name: "Chuck Taylor All Star",
    brand: "Converse",
    description: "The Chuck Taylor All Star Classic celebrates the iconic high top silhouette presented in a fresh new light with premium materials. Canvas upper provides durability and iconic style. Medial eyelets enhance airflow.",
    price: 55,
    images: [
      "https://www.converse.com/dw/image/v2/BCZC_PRD/on/demandware.static/-/Sites-cnv-master-catalog/default/dw9dbe438e/images/a_107/M9160_A_107X1.jpg",
      "https://www.converse.com/dw/image/v2/BCZC_PRD/on/demandware.static/-/Sites-cnv-master-catalog/default/dw31246e84/images/d_08/M9160_D_08X1.jpg"
    ],
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11],
    colors: ["Black", "White", "Red"],
    category: "Casual",
    featured: false
  },
  {
    id: "4",
    name: "Classic Leather",
    brand: "Reebok",
    description: "Inspired by the '80s, these Reebok Classic Leather shoes have a timeless design. They're made with soft leather for support and an EVA midsole for lightweight cushioning. A rubber outsole provides traction and durability.",
    price: 75,
    images: [
      "https://assets.reebok.com/images/w_600,f_auto,q_auto/fdadd4bf63ae4c49b2a4aa74016f10e2_9366/Classic_Leather_Shoes_White_49799_01_standard.jpg",
      "https://assets.reebok.com/images/w_600,f_auto,q_auto/90cd6dfa6fce47449e24aa74016f1f7d_9366/Classic_Leather_Shoes_White_49799_02_standard.jpg"
    ],
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11],
    colors: ["White", "Black", "Grey"],
    category: "Casual",
    featured: false
  },
  {
    id: "5",
    name: "Old Skool",
    brand: "Vans",
    description: "The Old Skool, Vans classic skate shoe and the first to bear the iconic side stripe, has a low-top lace-up silhouette with a durable suede and canvas upper with padded tongue and lining and Vans signature Waffle Outsole.",
    price: 60,
    images: [
      "https://images.vans.com/is/image/VansEU/VN000D3HY28-HERO?wid=1600&hei=1600&fmt=jpeg&qlt=95",
      "https://images.vans.com/is/image/VansEU/VN000D3HY28-ALT1?wid=1600&hei=1600&fmt=jpeg&qlt=95"
    ],
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11],
    colors: ["Black", "White", "Red"],
    category: "Skateboarding",
    featured: true
  },
  {
    id: "6",
    name: "574 Core",
    brand: "New Balance",
    description: "The 574 Core features a reliable build, premium materials and classic '80s running inspiration. With new colors and quality materials, the timeless 574 continues to be one of New Balance's most iconic sneakers.",
    price: 80,
    images: [
      "https://nb.scene7.com/is/image/NB/ml574egb_nb_02_i?$dw_detail_main_lg$&bgc=f1f1f1&layer=1&bgcolor=f1f1f1&blendMode=mult&scale=10&wid=1600&hei=1600",
      "https://nb.scene7.com/is/image/NB/ml574egb_nb_05_i?$dw_detail_main_lg$&bgc=f1f1f1&layer=1&bgcolor=f1f1f1&blendMode=mult&scale=10&wid=1600&hei=1600"
    ],
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11],
    colors: ["Grey", "Navy", "Black"],
    category: "Lifestyle",
    featured: false
  }
];

let cart: CartItem[] = [];
let currentUser: User | null = null;

// API functions
export const api = {
  // Product endpoints
  getProducts: (): Promise<Product[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...products]);
      }, 500);
    });
  },
  
  getProductById: (id: string): Promise<Product | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const product = products.find(p => p.id === id);
        resolve(product);
      }, 300);
    });
  },
  
  getFeaturedProducts: (): Promise<Product[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const featured = products.filter(p => p.featured);
        resolve(featured);
      }, 300);
    });
  },
  
  createProduct: (product: Omit<Product, 'id'>): Promise<Product> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newProduct = {
          ...product,
          id: Math.random().toString(36).substr(2, 9)
        };
        products.push(newProduct);
        resolve(newProduct);
      }, 500);
    });
  },
  
  updateProduct: (id: string, updates: Partial<Product>): Promise<Product | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = products.findIndex(p => p.id === id);
        if (index !== -1) {
          products[index] = { ...products[index], ...updates };
          resolve(products[index]);
        }
        resolve(undefined);
      }, 500);
    });
  },
  
  deleteProduct: (id: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = products.findIndex(p => p.id === id);
        if (index !== -1) {
          products.splice(index, 1);
          resolve(true);
        }
        resolve(false);
      }, 500);
    });
  },
  
  // Cart endpoints
  getCart: (): Promise<CartItem[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...cart]);
      }, 300);
    });
  },
  
  addToCart: (item: Omit<CartItem, 'id'>): Promise<CartItem> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Check if the product is already in the cart with the same size and color
        const existingItem = cart.find(
          i => i.productId === item.productId && 
               i.size === item.size && 
               i.color === item.color
        );
        
        if (existingItem) {
          // Update quantity if it exists
          existingItem.quantity += item.quantity;
          resolve(existingItem);
        } else {
          // Add new item if it doesn't exist
          const newItem = {
            ...item,
            id: Math.random().toString(36).substr(2, 9)
          };
          cart.push(newItem);
          resolve(newItem);
        }
      }, 500);
    });
  },
  
  updateCartItem: (id: string, updates: Partial<CartItem>): Promise<CartItem | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = cart.findIndex(i => i.id === id);
        if (index !== -1) {
          cart[index] = { ...cart[index], ...updates };
          resolve(cart[index]);
        }
        resolve(undefined);
      }, 300);
    });
  },
  
  removeFromCart: (id: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = cart.findIndex(i => i.id === id);
        if (index !== -1) {
          cart.splice(index, 1);
          resolve(true);
        }
        resolve(false);
      }, 300);
    });
  },
  
  clearCart: (): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        cart = [];
        resolve(true);
      }, 300);
    });
  },
  
  // Auth endpoints
  login: (email: string, password: string): Promise<User | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simplified login - in a real app, validate credentials
        if (email === "user@example.com" && password === "password") {
          currentUser = {
            id: "user1",
            name: "John Doe",
            email: "user@example.com",
            isAdmin: false
          };
          resolve(currentUser);
        } else if (email === "admin@example.com" && password === "admin") {
          currentUser = {
            id: "admin1",
            name: "Admin User",
            email: "admin@example.com",
            isAdmin: true
          };
          resolve(currentUser);
        } else {
          resolve(null);
        }
      }, 800);
    });
  },
  
  logout: (): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        currentUser = null;
        resolve(true);
      }, 300);
    });
  },
  
  getCurrentUser: (): Promise<User | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(currentUser);
      }, 300);
    });
  }
};
