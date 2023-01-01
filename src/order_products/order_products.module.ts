import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsRepository } from '../products/repository/products.repository';
import { OrderProduct } from './order_product.entity';
import { OrderProductsRepository } from './repository/order_products.repository';
import { OrderProductsService } from './service/order_products.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrderProduct])],
  controllers: [],
  providers: [
    ProductsRepository,
    OrderProductsRepository,
    OrderProductsService,
  ],
})
export class OrderProductsModule {}
