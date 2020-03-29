import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ProductService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductService) {}
  @Post()
  addProduct(
    @Body('title') productTitle: string,
    @Body('description') productDescription: string,
    @Body('price') productPrice: number,
  ) {
    const generatedId = this.productsService.insertProduct(
      productTitle,
      productDescription,
      productPrice,
    );
    return { id: generatedId };
  }

  @Get()
  getAllProducts() {
    return this.productsService.getAllProducts();
  }

  @Get(':id')
  getProduct(@Param('id') paramId: string) {
    return this.productsService.getProduct(paramId);
  }

  @Patch(':id')
  updateProduct(
    @Param('id') paramId: string,
    @Body('title') productTitle: string,
    @Body('description') productDescription: string,
    @Body('price') productPrice: number,
  ) {
    return this.productsService.updateProduct(
      paramId,
      productTitle,
      productDescription,
      productPrice,
    );
  }

  @Delete(':id')
  deteteProduct(@Param('id') paramId: string) {
    this.productsService.deleteProduct(paramId);
    return null;
  }
}
