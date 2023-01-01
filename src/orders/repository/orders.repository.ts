import { Injectable } from '@nestjs/common';
import { OrderProduct } from '../../order_products/order_product.entity';
import { User } from '../../users/users.entity';
import { DataSource, Repository, EntityManager } from 'typeorm';
import { Order } from '../order.entity';
import { Laundry } from '../../laundries/laundry.entity';
import { CreateOrderDto } from './../dto/create-order.dto';

@Injectable()
export class OrdersRepository extends Repository<Order> {
  constructor(private dataSource: DataSource) {
    super(Order, dataSource.createEntityManager());
  }

  async saveByTransaction(
    manager: EntityManager,
    orderData: CreateOrderDto,
    user: User,
    laundry: Laundry,
    orderNum: number,
  ) {
    return await manager
      .createQueryBuilder()
      .insert()
      .into(Order)
      .values({ ...orderData, user, laundry, orderNum: orderNum + 1 })
      .execute();
  }

  async findByJoin(): Promise<Order[]> {
    const result = await this.createQueryBuilder('order')
      .leftJoinAndSelect(
        OrderProduct,
        'order_product',
        'order.id = order_product.id',
      )
      .getMany();
    return result;
  }

  async findAllByStatus(status: string, userId: string): Promise<Order[]> {
    const result = await this.createQueryBuilder('order')
      .where('order.status = :status', { status: status })
      .andWhere('order.userId = :userId', {
        userId: userId,
      })
      .getMany();
    return result;
  }
}
