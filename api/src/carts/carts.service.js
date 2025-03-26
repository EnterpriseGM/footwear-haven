
const { Injectable, NotFoundException } = require('@nestjs/common');
const { v4: uuidv4 } = require('uuid');
const { ProductsService } = require('../products/products.service');

class CartsService {
  constructor(productsService) {
    this.productsService = productsService;
    this.carts = new Map(); // Map of userId -> CartItems[]
  }

  getCart(userId) {
    if (!this.carts.has(userId)) {
      return [];
    }
    return this.carts.get(userId);
  }

  addToCart(cartItem) {
    const { userId, productId, quantity, size, color } = cartItem;
    
    // Validate product exists
    try {
      this.productsService.getProductById(productId);
    } catch (error) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }
    
    if (!this.carts.has(userId)) {
      this.carts.set(userId, []);
    }
    
    const userCart = this.carts.get(userId);
    
    // Check if the item already exists in the cart
    const existingItemIndex = userCart.findIndex(
      item => item.productId === productId && item.size === size && item.color === color
    );
    
    if (existingItemIndex >= 0) {
      // Update quantity if the item exists
      userCart[existingItemIndex].quantity += quantity;
      return userCart[existingItemIndex];
    } else {
      // Add new item if it doesn't exist
      const newItem = {
        id: uuidv4(),
        userId,
        productId,
        quantity,
        size,
        color
      };
      
      userCart.push(newItem);
      return newItem;
    }
  }

  updateCartItem(id, updates) {
    // Find the cart item across all user carts
    for (const [userId, cart] of this.carts.entries()) {
      const itemIndex = cart.findIndex(item => item.id === id);
      
      if (itemIndex >= 0) {
        // Update the item
        const updatedItem = {
          ...cart[itemIndex],
          ...updates
        };
        
        cart[itemIndex] = updatedItem;
        
        // Remove item if quantity is 0 or less
        if (updatedItem.quantity <= 0) {
          cart.splice(itemIndex, 1);
        }
        
        return updatedItem;
      }
    }
    
    throw new NotFoundException(`Cart item with ID ${id} not found`);
  }

  removeFromCart(id) {
    // Find and remove the cart item across all user carts
    for (const [userId, cart] of this.carts.entries()) {
      const itemIndex = cart.findIndex(item => item.id === id);
      
      if (itemIndex >= 0) {
        const [removedItem] = cart.splice(itemIndex, 1);
        return removedItem;
      }
    }
    
    throw new NotFoundException(`Cart item with ID ${id} not found`);
  }

  clearCart(userId) {
    if (!this.carts.has(userId)) {
      return [];
    }
    
    const emptyCart = [];
    this.carts.set(userId, emptyCart);
    return emptyCart;
  }
}

Injectable()
exports.CartsService = CartsService;
