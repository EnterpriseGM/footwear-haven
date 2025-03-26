
const { Injectable, NotFoundException, BadRequestException } = require('@nestjs/common');
const { v4: uuidv4 } = require('uuid');
const { CartsService } = require('../carts/carts.service');
const { ProductsService } = require('../products/products.service');

class OrdersService {
  constructor(cartsService, productsService) {
    this.cartsService = cartsService;
    this.productsService = productsService;
    this.orders = [];
  }

  getAllOrders() {
    return this.orders;
  }

  getUserOrders(userId) {
    return this.orders.filter(order => order.userId === userId);
  }

  getOrderById(id) {
    const order = this.orders.find(o => o.id === id);
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  createOrder(orderData) {
    const { userId, shippingAddress, paymentMethod } = orderData;
    
    // Get user's cart
    const cartItems = this.cartsService.getCart(userId);
    
    if (!cartItems || cartItems.length === 0) {
      throw new BadRequestException('Cannot create order with empty cart');
    }
    
    // Calculate total price and get product details
    let totalAmount = 0;
    const items = [];
    
    for (const item of cartItems) {
      const product = this.productsService.getProductById(item.productId);
      const itemTotal = product.price * item.quantity;
      
      items.push({
        productId: item.productId,
        productName: product.name,
        price: product.price,
        quantity: item.quantity,
        size: item.size,
        color: item.color,
        itemTotal
      });
      
      totalAmount += itemTotal;
    }
    
    // Create the order
    const newOrder = {
      id: uuidv4(),
      userId,
      items,
      totalAmount,
      shippingAddress,
      paymentMethod,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    
    this.orders.push(newOrder);
    
    // Clear the user's cart after creating the order
    this.cartsService.clearCart(userId);
    
    return newOrder;
  }

  updateOrderStatus(id, status) {
    const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
    
    if (!validStatuses.includes(status)) {
      throw new BadRequestException(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
    }
    
    const orderIndex = this.orders.findIndex(o => o.id === id);
    
    if (orderIndex === -1) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    
    this.orders[orderIndex].status = status;
    this.orders[orderIndex].updatedAt = new Date().toISOString();
    
    return this.orders[orderIndex];
  }
}

Injectable()
exports.OrdersService = OrdersService;
