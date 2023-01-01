import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsRepository } from '../products/repository/products.repository';
import { OrdersRepository } from './repository/orders.repository';
import { OrderProductsRepository } from '../order_products/repository/order_products.repository';
import { LaundriesRepository } from './../laundries/repository/laundries.repository';
import { OrdersService } from './service/orders.service';
import { OrderProductsService } from '../order_products/service/order_products.service';
import { OrdersController } from './controller/orders.controller';
import { Order } from './order.entity';
import { Laundry } from '../laundries/laundry.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Laundry])],
  providers: [
    ProductsRepository,
    OrdersRepository,
    OrderProductsRepository,
    LaundriesRepository,
    OrdersService,
    OrderProductsService,
  ],
  controllers: [OrdersController],
  exports: [OrdersRepository],
})
export class OrdersModule {}
