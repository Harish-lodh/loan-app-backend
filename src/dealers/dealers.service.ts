import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dealer } from '../dealers/entities/dealer.entity'
import { CreateDealerDto } from './dto/create-dealer.dto';

function nextCode(n: number) {
  return `DL-${String(n).padStart(4, '0')}`;
}

@Injectable()
export class DealersService {
  constructor(@InjectRepository(Dealer) private repo: Repository<Dealer>) {}

  async create(dto: CreateDealerDto, registeredByUserId: number) {
    const dup = await this.repo.findOne({ where: [{ email: dto.email }, { mobile: dto.mobile }] });
    if (dup) throw new ConflictException('Dealer with email/mobile exists');

    const count = await this.repo.count();
    const dealer = this.repo.create({
      ...dto,
      code: nextCode(count + 1),
      registeredByUserId,
      status: 'PENDING',
    });
    return this.repo.save(dealer);
  }

  list(filter: Partial<Dealer> = {}) { return this.repo.find({ where: filter }); }

  async approve(id: number) {
    const d = await this.repo.findOne({ where: { id } });
    if (!d) throw new NotFoundException('Dealer not found');
    d.status = 'APPROVED';
    return this.repo.save(d);
  }

  async reject(id: number, reason?: string) {
    const d = await this.repo.findOne({ where: { id } });
    if (!d) throw new NotFoundException('Dealer not found');
    d.status = 'REJECTED';
    d.extra = { ...(d.extra || {}), rejectionReason: reason };
    return this.repo.save(d);
  }
}
