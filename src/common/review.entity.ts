import { Laundry } from '../laundries/laundry.entity';
import { Order } from '../orders/order.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { CommonEntity } from './common.entity';

@Entity()
export class Review extends CommonEntity {
  @Column({ type: 'float' })
  rate: number;

  @Column({ type: 'text' })
  reviewText: string;

  @OneToOne(() => Order, (order) => order.review)
  order: Order;

  @ManyToOne(() => Laundry, (laundry) => laundry.reviews)
  @JoinColumn()
  laundry: Laundry;
}
