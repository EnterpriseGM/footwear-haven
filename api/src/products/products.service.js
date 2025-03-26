
const { Injectable, NotFoundException } = require('@nestjs/common');
const { v4: uuidv4 } = require('uuid');

// Initial product data
const initialProducts = [
  {
    id: "1",
    name: "Air Max 90",
    brand: "Nike",
    description: "The Nike Air Max 90 stays true to its OG running roots with the iconic Waffle sole, stitched overlays and classic TPU details.",
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
    description: "Ultraboost has been carefully crafted to deliver incredible energy return, comfort and style.",
    price: 180,
    images: [
      "https://assets.adidas.com/images/w_600,f_auto,q_auto/a8c0466e30b5443aa044ac9c01091e16_9366/Ultraboost_22_Shoes_Black_GZ0127_01_standard.jpg",
      "https://assets.adidas.com/images/w_600,f_auto,q_auto/d3e57dd658cb4bb79a9aac9c010934eb_9366/Ultraboost_22_Shoes_Black_GZ0127_02_standard_hover.jpg"
    ],
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11],
    colors: ["Black", "White", "Grey"],
    category: "Running",
    featured: true
  }
];

class ProductsService {
  constructor() {
    this.products = [...initialProducts];
  }

  getAllProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find(p => p.id === id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  createProduct(productData) {
    const newProduct = {
      id: uuidv4(),
      ...productData,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  updateProduct(id, updates) {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    
    this.products[index] = {
      ...this.products[index],
      ...updates,
    };
    
    return this.products[index];
  }

  deleteProduct(id) {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    
    const [removedProduct] = this.products.splice(index, 1);
    return removedProduct;
  }

  getFeaturedProducts() {
    return this.products.filter(p => p.featured);
  }
}

Injectable()
exports.ProductsService = ProductsService;
