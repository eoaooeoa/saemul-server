import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { OrderProduct } from '../order_product.entity';

@Injectable()
export class OrderProductsRepository extends Repository<OrderProduct> {
  constructor(private dataSource: DataSource) {
    super(OrderProduct, dataSource.createEntityManager());
  }

  async saveByTransaction(manager: EntityManager, orderProduct: OrderProduct) {
    return await manager.save(orderProduct);
  }
}
