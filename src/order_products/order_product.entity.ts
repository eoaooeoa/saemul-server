import { CommonEntity } from '../common/common.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class OrderProduct extends CommonEntity {
  @Column()
  productName: string;

  @Column()
  price: number;

  @Column()
  qty: number;

  @Column()
  orderId: string;

  @Column('simple-array')
  images: string[];
}
