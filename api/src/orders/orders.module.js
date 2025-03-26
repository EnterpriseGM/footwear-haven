
const { Module } = require('@nestjs/common');
const { OrdersController } = require('./orders.controller');
const { OrdersService } = require('./orders.service');
const { CartsModule } = require('../carts/carts.module');
const { ProductsModule } = require('../products/products.module');

class OrdersModule {}

Module({
  imports: [CartsModule, ProductsModule],
  controllers: [OrdersController],
  providers: [OrdersService],
})
exports.OrdersModule = OrdersModule;
