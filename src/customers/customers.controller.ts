import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { JwtAuthGuard } from '../common/jwt-auth.guard';
import { RolesGuard } from '../common/roles.guard';
import { Roles } from '../common/roles.decorator';
import { Role } from '../common/roles.enum';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('customers')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
export class CustomersController {
  constructor(private service: CustomersService) {}

  @Post()
  @Roles(Role.DEALER, Role.ADMIN)
  create(@Body() dto: CreateCustomerDto) { return this.service.create(dto); }

  @Get('dealer/:dealerId')
  @Roles(Role.DEALER, Role.ADMIN, Role.CREDIT)
  list(@Param('dealerId') dealerId: number) { return this.service.listByDealer(+dealerId); }
}
