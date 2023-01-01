import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { User } from './src/users/users.entity';
import { Address } from './src/address/address.entity';
import { Laundry } from './src/laundries/laundry.entity';
import { Review } from './src/common/review.entity';
import { Order } from './src/orders/order.entity';
import { OrderProduct } from './src/order_products/order_product.entity';
import { Product } from './src/products/product.entity';
import { Wallet } from './src/wallets/wallet.entity';

dotenv.config();

const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_SCHEMA,
  entities: [
    User,
    Address,
    Laundry,
    Review,
    Order,
    OrderProduct,
    Product,
    Wallet,
  ],
  synchronize: false,
  logging: true,
});

export default dataSource;
