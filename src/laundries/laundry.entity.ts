import { Address } from '../address/address.entity';
import { CommonEntity } from '../common/common.entity';
import { Review } from '../common/review.entity';
import { Order } from '../orders/order.entity';
import { User } from '../users/users.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

@Entity()
export class Laundry extends CommonEntity {
  @Column()
  name: string;

  @Column()
  bizNo: string;

  @Column()
  phoneNumber: string;

  @Column()
  isApprove: boolean;

  @OneToOne(() => User, (user) => user.laundry)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: User;

  @OneToOne(() => Address, (address) => address.laundry)
  @JoinColumn()
  address: Address;

  @OneToMany(() => Review, (review) => review.laundry)
  reviews: Review[];

  @OneToMany(() => Order, (order) => order.laundry)
  order: Order[];

  static createEntityInstance(
    name: string,
    phoneNumber: string,
    bizNo: string,
    isApprove: boolean,
  ) {
    const laundry = new Laundry();
    laundry.name = name;
    laundry.phoneNumber = phoneNumber;
    laundry.bizNo = bizNo;
    laundry.isApprove = isApprove;
    return laundry;
  }
}
