
const { Controller, Get, Post, Put, Delete, Body, Param } = require('@nestjs/common');
const { ProductsService } = require('./products.service');

class ProductsController {
  constructor(productsService) {
    this.productsService = productsService;
  }

  // Get all products
  getAllProducts() {
    return this.productsService.getAllProducts();
  }

  // Get a single product by ID
  getProductById(params) {
    return this.productsService.getProductById(params.id);
  }

  // Create a new product
  createProduct(productData) {
    return this.productsService.createProduct(productData);
  }

  // Update a product
  updateProduct(params, productData) {
    return this.productsService.updateProduct(params.id, productData);
  }

  // Delete a product
  deleteProduct(params) {
    return this.productsService.deleteProduct(params.id);
    return { success: true };
  }

  // Get featured products
  getFeaturedProducts() {
    return this.productsService.getFeaturedProducts();
  }
}

Controller('products')
Get()
Get(':id')
Post()
Put(':id')
Delete(':id')
Get('featured')
exports.ProductsController = ProductsController;
