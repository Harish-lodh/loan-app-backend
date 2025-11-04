import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { LeadsService } from './leads.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { JwtAuthGuard } from '../common/jwt-auth.guard';
import { RolesGuard } from '../common/roles.guard';
import { Roles } from '../common/roles.decorator';
import { Role } from '../common/roles.enum';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('leads')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
export class LeadsController {
  constructor(private service: LeadsService) {}

  @Post()
  @Roles(Role.DEALER, Role.ADMIN)
  create(@Body() dto: CreateLeadDto) { return this.service.create(dto); }

  @Get('dealer/:dealerId')
  @Roles(Role.DEALER, Role.ADMIN, Role.CREDIT)
  list(@Param('dealerId') dealerId: number) { return this.service.listByDealer(+dealerId); }

  @Patch(':id/status/:status')
  @Roles(Role.CREDIT, Role.ADMIN)
  setStatus(@Param('id') id: number, @Param('status') status: string, @Body() body: any) {
    return this.service.setStatus(+id, status as any, body?.extra);
  }
}
