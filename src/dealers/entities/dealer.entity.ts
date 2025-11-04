import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';

@Entity('dealers')
export class Dealer {
  @PrimaryGeneratedColumn('increment') id: number;

  @Index({ unique: true }) @Column({ length: 32 })
  code: string; // auto code like DL-0001 (you can generate in service)

  @Column() registeredByUserId: number; // RM who onboarded
  @Column({ length: 180 }) name: string;
  @Column({ length: 180 }) ownerName: string;
  @Column({ length: 20 }) mobile: string;
  @Column({ length: 180, unique: true }) email: string;

  @Column({ length: 250 }) shopAddress: string;
  @Column({ length: 120 }) city: string;
  @Column({ length: 120 }) state: string;
  @Column({ length: 10 }) pincode: string;

  @Column({ length: 20, nullable: true }) gstNumber?: string;
  @Column({ length: 20, nullable: true }) panNumber?: string;

  @Column({ default: 'PENDING' })
  status: 'PENDING' | 'APPROVED' | 'REJECTED';

  @Column('json', { nullable: true }) extra?: any;

  @CreateDateColumn() createdAt: Date;
  @UpdateDateColumn() updatedAt: Date;
}
