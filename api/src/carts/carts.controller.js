
const { Controller, Get, Post, Put, Delete, Body, Param, Query } = require('@nestjs/common');
const { CartsService } = require('./carts.service');

class CartsController {
  constructor(cartsService) {
    this.cartsService = cartsService;
  }

  // Get cart for a user
  getCart(query) {
    return this.cartsService.getCart(query.userId);
  }

  // Add item to cart
  addToCart(cartItem) {
    return this.cartsService.addToCart(cartItem);
  }

  // Update cart item
  updateCartItem(params, updates) {
    return this.cartsService.updateCartItem(params.id, updates);
  }

  // Remove item from cart
  removeFromCart(params) {
    return this.cartsService.removeFromCart(params.id);
    return { success: true };
  }

  // Clear cart
  clearCart(query) {
    return this.cartsService.clearCart(query.userId);
    return { success: true };
  }
}

Controller('carts')
Get()
Post()
Put(':id')
Delete(':id')
Delete()
exports.CartsController = CartsController;
