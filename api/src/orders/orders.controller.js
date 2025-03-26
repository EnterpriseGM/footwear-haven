
const { Controller, Get, Post, Put, Delete, Body, Param, Query } = require('@nestjs/common');
const { OrdersService } = require('./orders.service');

class OrdersController {
  constructor(ordersService) {
    this.ordersService = ordersService;
  }

  // Get all orders for a user
  getUserOrders(query) {
    return this.ordersService.getUserOrders(query.userId);
  }

  // Get all orders (admin only)
  getAllOrders() {
    return this.ordersService.getAllOrders();
  }

  // Get a single order by ID
  getOrderById(params) {
    return this.ordersService.getOrderById(params.id);
  }

  // Create a new order from cart
  createOrder(orderData) {
    return this.ordersService.createOrder(orderData);
  }

  // Update order status (admin only)
  updateOrderStatus(params, statusData) {
    return this.ordersService.updateOrderStatus(params.id, statusData.status);
  }
}

Controller('orders')
Get('user')
Get('admin/all')
Get(':id')
Post()
Put(':id/status')
exports.OrdersController = OrdersController;
