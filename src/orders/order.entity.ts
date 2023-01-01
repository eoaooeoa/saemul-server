import { CommonEntity } from '../common/common.entity';
import { Review } from '../common/review.entity';
import { Laundry } from '../laundries/laundry.entity';
import { User } from '../users/users.entity';
import { Column, Entity, ManyToOne, OneToOne } from 'typeorm';
import { Status } from '../common/enums/status.enum';

@Entity()
export class Order extends CommonEntity {
  @Column({ type: 'enum', enum: Status })
  status: Status;

  @Column()
  pickUpMethod: string;

  @Column()
  pickUpDateTime: Date;

  @Column('simple-json')
  address: { roadAddr: string; detailAddr: string; jibun: string };

  @Column({ nullable: true })
  wishLaundryDateTime: Date;

  @Column({ nullable: true })
  notice: string;

  @Column({ nullable: true })
  deniedReason: string;

  @Column({ nullable: true })
  completedDateTime: Date;

  @Column({ nullable: true })
  cancelledDateTime: Date;

  @Column()
  orderNum: number;

  @ManyToOne(() => User, (user) => user.order, { eager: true })
  user: User;

  @ManyToOne(() => Laundry, (laundry) => laundry.order, { eager: true })
  laundry: Laundry;

  @OneToOne(() => Review, (review) => review.order)
  review: Review;
}
