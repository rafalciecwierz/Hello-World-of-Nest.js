import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductService {
  private products: Product[] = [];

  insertProduct(title: string, description: string, price: number) {
    const productId = Math.random().toString();
    const newProduct = new Product(productId, title, description, price);
    this.products.push(newProduct);
    return productId;
  }

  getAllProducts() {
    //   Spread operator to ensure that we send a copy of array, not the pointer to it
    return [...this.products];
  }

  getProduct(id: string) {
    const product = this.findProduct(id);
    return { ...product.product };
  }

  updateProduct(id: string, title: string, description: string, price: number) {
    const product = this.findProduct(id);
    const updatedProduct = { ...product.product };
    if (title) updatedProduct.title = title;
    if (description) updatedProduct.description = description;
    if (price > 0) updatedProduct.price = price;
    this.products[product.index] = updatedProduct;
    return updatedProduct;
  }

  deleteProduct(id: string) {
    const product = this.findProduct(id);
    this.products.splice(product.index, 1);
  }

  private findProduct(id: string): { product: Product; index: number } {
    const productIndex = this.products.findIndex(product => product.id === id);
    const product = this.products[productIndex];
    if (!product) {
      throw new NotFoundException('Could not found product ');
    }
    return { product: product, index: productIndex };
  }
}
