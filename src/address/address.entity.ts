import { CommonEntity } from '../common/common.entity';
import { Laundry } from '../laundries/laundry.entity';
import { User } from '../users/users.entity';
import { Column, Entity, OneToOne } from 'typeorm';

@Entity()
export class Address extends CommonEntity {
  @Column()
  roadAddr: string;

  @Column()
  detailAddr: string;

  @Column()
  jibun: string;

  @OneToOne(() => User, (user) => user.address)
  user: User;

  @OneToOne(() => Laundry, (laundry) => laundry.address)
  laundry: Laundry;

  static createEntityInstance(
    roadAddr: string,
    detailAddr: string,
    jibun: string,
  ) {
    const address = new Address();
    address.roadAddr = roadAddr;
    address.detailAddr = detailAddr;
    address.jibun = jibun;
    return address;
  }
}
