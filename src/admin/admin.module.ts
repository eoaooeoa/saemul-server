import { Module } from '@nestjs/common';
import { AddressModule } from 'src/address/address.module';
import { laundriesModule } from 'src/laundries/laundries.module';
import { OrdersModule } from 'src/orders/orders.module';
import { OrderProductsRepository } from 'src/order_products/repository/order_products.repository';
import { ProductsModule } from 'src/products/products.module';
import { UsersModule } from 'src/users/users.module';
import { AdminController } from './controller/admin.controller';
import { AdminService } from './service/admin.service';

@Module({
  imports: [
    UsersModule,
    laundriesModule,
    ProductsModule,
    OrdersModule,
    AddressModule,
  ],
  providers: [AdminService, OrderProductsRepository],
  controllers: [AdminController],
})
export class AdminModule {}
