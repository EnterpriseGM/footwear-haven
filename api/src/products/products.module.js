
const { Module } = require('@nestjs/common');
const { ProductsController } = require('./products.controller');
const { ProductsService } = require('./products.service');

class ProductsModule {}

Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
exports.ProductsModule = ProductsModule;
