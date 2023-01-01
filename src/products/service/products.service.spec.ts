import { NotFoundException } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { ProductsModule } from '../products.module';
import { ProductsRepository } from '../repository/products.repository';
import { ProductsService } from './products.service';

describe('ProductsService', () => {
  let service: ProductsService;
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
        ProductsModule,
      ],
      providers: [ProductsRepository, ProductsService],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
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
    it('should create a product', async () => {
      await service.create({
        name: '와이샤츠',
        price: 1500,
        category: '의류',
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
    it('should create a product', async () => {
      await service.create({
        name: '와이샤츠',
        price: 1500,
        category: '의류',
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
