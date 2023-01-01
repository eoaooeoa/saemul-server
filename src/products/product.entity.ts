import { CommonEntity } from '../common/common.entity';
import { Entity, Column } from 'typeorm';

@Entity()
export class Product extends CommonEntity {
  @Column({ unique: true })
  name: string;

  @Column()
  price: number;

  @Column()
  category: string;
}
