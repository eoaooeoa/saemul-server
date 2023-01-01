import { Controller, Get, Query } from '@nestjs/common';
import { FilterProductDto } from '../dto/filter-product.dto';
import { Product } from '../product.entity';
import { ProductsService } from '../service/products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getAll(@Query() dto: FilterProductDto): Promise<Product[]> {
    if (dto.category) {
      return await this.productsService.findByCategory(dto.category);
    }

    return await this.productsService.findAll();
  }
}
