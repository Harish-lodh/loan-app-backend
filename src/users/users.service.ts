import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Role } from 'src/common/roles.enum';
@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

async create(dto: CreateUserDto) {
  const exists = await this.repo.findOne({
    where: [{ email: dto.email }, { mobile: dto.mobile }],
  });
  if (exists) throw new ConflictException('Email or mobile already in use');

  const passwordHash = await bcrypt.hash(dto.password, 10);
  
  const user = this.repo.create({
    ...dto,
    passwordHash,
    role: dto.role ?? Role.RM, // ✅ use enum, not string
  });

  return this.repo.save(user);
}

  findByEmail(email: string) { return this.repo.findOne({ where: { email } }); }
  findById(id: number) { return this.repo.findOne({ where: { id } }); }

  async setPassword(userId: number, newPassword: string) {
    const user = await this.findById(userId);
    if (!user) throw new NotFoundException('User not found');
    user.passwordHash = await bcrypt.hash(newPassword, 10);
    return this.repo.save(user);
  }

  list() { return this.repo.find(); }
}
