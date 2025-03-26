
const { Module } = require('@nestjs/common');
const { ProductsModule } = require('./products/products.module');
const { CartsModule } = require('./carts/carts.module');
const { OrdersModule } = require('./orders/orders.module');

class AppModule {}

Module({
  imports: [ProductsModule, CartsModule, OrdersModule],
})
exports.AppModule = AppModule;
