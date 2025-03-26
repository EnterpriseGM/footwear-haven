
const { Module } = require('@nestjs/common');
const { CartsController } = require('./carts.controller');
const { CartsService } = require('./carts.service');
const { ProductsModule } = require('../products/products.module');

class CartsModule {}

Module({
  imports: [ProductsModule],
  controllers: [CartsController],
  providers: [CartsService],
  exports: [CartsService],
})
exports.CartsModule = CartsModule;
