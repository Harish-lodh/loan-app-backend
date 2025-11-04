import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';

@Entity('leads')
export class Lead {
  @PrimaryGeneratedColumn('increment') id: number;

  @Index() @Column() dealerId: number;
  @Index() @Column() customerId: number;

  @Column({ length: 80 }) productType: string; // e.g., 'MOBILE'
  @Column('decimal', { precision: 12, scale: 2 }) productPrice: number;
  @Column('decimal', { precision: 12, scale: 2 }) downPayment: number;

  @Column({ default: 'NEW' })
  status: 'NEW' | 'KYC_PENDING' | 'DOCS_PENDING' | 'UW_REVIEW' | 'APPROVED' | 'REJECTED' | 'DISBURSED';

  @Column('json', { nullable: true }) extra?: any;

  @CreateDateColumn() createdAt: Date;
  @UpdateDateColumn() updatedAt: Date;
}
