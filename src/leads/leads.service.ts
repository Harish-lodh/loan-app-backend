import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lead } from './entities/lead.entity'
import { CreateLeadDto } from './dto/create-lead.dto';
import { Dealer } from '../dealers/entities/dealer.entity'
import { Customer } from '../customers/entities/customer.entity'

@Injectable()
export class LeadsService {
  constructor(
    @InjectRepository(Lead) private repo: Repository<Lead>,
    @InjectRepository(Dealer) private dealers: Repository<Dealer>,
    @InjectRepository(Customer) private customers: Repository<Customer>,
  ) {}

  async create(dto: CreateLeadDto) {
    const dealer = await this.dealers.findOne({ where: { id: dto.dealerId } });
    if (!dealer) throw new NotFoundException('Dealer not found');
    if (dealer.status !== 'APPROVED') throw new BadRequestException('Dealer not approved');

    const cust = await this.customers.findOne({ where: { id: dto.customerId, dealerId: dto.dealerId } });
    if (!cust) throw new NotFoundException('Customer not found for dealer');

    const lead = this.repo.create({
      dealerId: dto.dealerId,
      customerId: dto.customerId,
      productType: dto.productType,
      productPrice: Number(dto.productPrice),
      downPayment: Number(dto.downPayment),
      status: 'NEW',
    });
    return this.repo.save(lead);
  }

  listByDealer(dealerId: number) { return this.repo.find({ where: { dealerId } }); }

  async setStatus(id: number, status: Lead['status'], extra?: any) {
    const lead = await this.repo.findOne({ where: { id } });
    if (!lead) throw new NotFoundException('Lead not found');
    lead.status = status;
    if (extra) lead.extra = { ...(lead.extra || {}), ...extra };
    return this.repo.save(lead);
  }
}
