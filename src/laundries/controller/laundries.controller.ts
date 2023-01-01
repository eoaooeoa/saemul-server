import { Body, Controller, Delete, Get, Put, UseGuards } from '@nestjs/common';
import { Roles } from 'src/common/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { LaundriesService } from '../service/laundries.service';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { Role } from 'src/common/enums/role.enum';
import { User } from 'src/users/users.entity';
import { UpdateLaundryDto } from '../dto/updateLaundryDto';

@Controller('laundries')
export class LaundriesController {
  constructor(private readonly laundriesService: LaundriesService) {}

  // @Post()
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.Partner)
  // async registerLaundry(
  //   @CurrentUser() currentUser: User,
  //   @Body() laundryDto: LaundryDto,
  // ) {
  //   return await this.laundriesService.createLaundry(currentUser, laundryDto);
  // }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllLaundries() {
    return this.laundriesService.findAllLaundry();
  }

  @Put()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Partner)
  async modifyLaundry(
    @CurrentUser() currentUser: User,
    @Body() updateLaundryDto: UpdateLaundryDto,
  ) {
    return await this.laundriesService.updateLaundry(
      currentUser,
      updateLaundryDto,
    );
  }

  @Delete()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Partner)
  async deleteLaundry(@CurrentUser() currentUser: User) {
    return await this.laundriesService.deleteLaundry(currentUser);
  }
}
