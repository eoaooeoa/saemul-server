import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Connection } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersModule } from '../orders.module';
import { OrdersRepository } from '../repository/orders.repository';

describe('OrdersService', () => {
  let service: OrdersService;
  let app;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: process.env.DATABASE_HOST,
          port: Number(process.env.DATABASE_PORT),
          username: process.env.DATABASE_USER,
          password: process.env.DATABASE_PASSWORD,
          database: process.env.DATABASE_SCHEMA,
          entities: [],
          synchronize: true,
          autoLoadEntities: true,
          logging: true,
        }),
        OrdersModule,
      ],
      providers: [OrdersRepository, OrdersService],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
    app = module.createNestApplication();
    app.init();
  });

  afterEach(async () => {
    const connection = app.get(Connection);
    await connection.synchronize(true);
    await connection.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a order', async () => {
      await service.create({
        status: '신청',
        notice: '주의사항',
        pickUpDateTime: new Date(2022, 12, 14),
        productIds: ['1', '2'],
      });
    });
  });

  describe('getAll', () => {
    it('should return an promise', () => {
      const result = service.findAll();

      expect(result).toBeInstanceOf(Promise);
    });
  });

  describe('getOne', () => {
    it('should create a order', async () => {
      await service.create({
        status: '신청',
        notice: '주의사항',
        pickUpDateTime: new Date(2022, 12, 14),
        productIds: ['1', '2'],
      });
    });

    it('should thorw 404 error', async () => {
      try {
        await service.findOne('1');
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
