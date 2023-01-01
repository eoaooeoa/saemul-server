import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Product } from '../product.entity';

@Injectable()
export class ProductsRepository extends Repository<Product> {
  constructor(private dataSource: DataSource) {
    super(Product, dataSource.createEntityManager());
  }

  async findByCategory(category: string): Promise<Product[]> {
    const result = await this.createQueryBuilder('Product')
      .where('Product.category = :category', { category: category })
      .getMany();
    return result;
  }

  async findAllProducts() {
    return await this.createQueryBuilder('Product').getMany();
  }
}
