import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateOrderDto } from '../dto/create-order.dto';
import { OrdersService } from '../service/orders.service';
import { FilterOrderDto } from '../dto/filter-order.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt.guard';
import { CurrentUser } from '../../common/decorators/user.decorator';
import { User } from '../../users/users.entity';
import { Order } from '../order.entity';
import { UpdateOrderDto } from '../dto/update-order.dto';
import {
  ApiCreatedResponse,
  ApiHeader,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('orders')
@ApiHeader({
  name: 'Authorization',
  description: 'Access Token',
})
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
  })
  async create(
    @Body() orderData: CreateOrderDto,
    @CurrentUser() currentUser: User,
  ) {
    return await this.ordersService.create(orderData, currentUser);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async getAll(
    @Query() dto: FilterOrderDto,
    @CurrentUser() currentUser: User,
  ): Promise<Order[]> {
    if (dto.status) {
      return await this.ordersService.findAllByStatus(dto.status, currentUser);
    } else if (dto.laundryId) {
      return await this.ordersService.findAllByLaundry(
        dto.laundryId,
        currentUser,
      );
    }

    return await this.ordersService.findAll(currentUser);
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  async getOne(@Param('id') orderId: string): Promise<Order> {
    return await this.ordersService.findOne(orderId);
  }

  @Patch('/:id')
  @HttpCode(204)
  async patchOne(
    @Param('id') orderId: string,
    @Body() order: UpdateOrderDto,
  ): Promise<void> {
    await this.ordersService.updateOne(orderId, order);
  }
}
