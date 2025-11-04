import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { DealersService } from './dealers.service';
import { CreateDealerDto } from './dto/create-dealer.dto';
import { JwtAuthGuard } from '../common/jwt-auth.guard';
import { RolesGuard } from '../common/roles.guard';
import { Roles } from '../common/roles.decorator';
import { Role } from '../common/roles.enum';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('dealers')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
export class DealersController {
  constructor(private dealers: DealersService) {}

  @Post()
  @Roles(Role.RM, Role.ADMIN) // RM creates
  create(@Body() dto: CreateDealerDto, @Req() req: any) {
    return this.dealers.create(dto, req.user.sub);
  }

  @Get()
  @Roles(Role.ADMIN, Role.CREDIT, Role.RM)
  list() { return this.dealers.list(); }

  @Patch(':id/approve')
  @Roles(Role.CREDIT, Role.ADMIN) // Credit/ops approves
  approve(@Param('id') id: number) { return this.dealers.approve(+id); }

  @Patch(':id/reject')
  @Roles(Role.CREDIT, Role.ADMIN)
  reject(@Param('id') id: number, @Body('reason') reason?: string) {
    return this.dealers.reject(+id, reason);
  }
}
