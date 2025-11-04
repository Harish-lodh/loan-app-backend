import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lead } from './entities/lead.entity'
import { LeadsService } from './leads.service';
import { LeadsController } from './leads.controller';
import { Dealer } from '../dealers/entities/dealer.entity'
import { Customer } from '../customers/entities/customer.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Lead, Dealer, Customer])],
  providers: [LeadsService],
  controllers: [LeadsController],
})
export class LeadsModule {}
