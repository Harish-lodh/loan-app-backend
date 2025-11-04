import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dealer } from '../dealers/entities/dealer.entity';
import { DealersService } from './dealers.service';
import { DealersController } from './dealers.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Dealer])],
  providers: [DealersService],
  controllers: [DealersController],
  exports: [DealersService],
})
export class DealersModule {}
