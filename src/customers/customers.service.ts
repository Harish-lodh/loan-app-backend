import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity'
import { CreateCustomerDto } from './dto/create-customer.dto';
import { Dealer } from '../dealers/entities/dealer.entity'

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer) private repo: Repository<Customer>,
    @InjectRepository(Dealer) private dealers: Repository<Dealer>,
  ) {}

  async create(dto: CreateCustomerDto) {
    const dealer = await this.dealers.findOne({ where: { id: dto.dealerId } });
    if (!dealer) throw new NotFoundException('Dealer not found');
    if (dealer.status !== 'APPROVED') throw new BadRequestException('Dealer not approved');

    const c = this.repo.create({ ...dto });
    return this.repo.save(c);
  }

  listByDealer(dealerId: number) {
    return this.repo.find({ where: { dealerId } });
  }
}
