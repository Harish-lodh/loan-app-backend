import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity'
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { Dealer } from '../dealers/entities/dealer.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Customer, Dealer])],
  providers: [CustomersService],
  controllers: [CustomersController],
})
export class CustomersModule {}
