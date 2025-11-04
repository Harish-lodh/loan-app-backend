import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';

@Entity('customers')
export class Customer {
  @PrimaryGeneratedColumn('increment') id: number;

  @Index() @Column() dealerId: number;
  @Column({ length: 150 }) firstName: string;
  @Column({ length: 150 }) lastName: string;
  @Column({ length: 20, unique: true }) mobile: string;
  @Column({ length: 150, nullable: true, unique: true }) email?: string;
  @Column({ length: 20, nullable: true }) panNumber?: string;
  @Column({ length: 12, nullable: true }) aadharNumber?: string;

  @Column({ length: 200, nullable: true }) currentAddress?: string;
  @Column({ length: 10, nullable: true }) pincode?: string;

  @Column('json', { nullable: true }) extra?: any;

  @CreateDateColumn() createdAt: Date;
  @UpdateDateColumn() updatedAt: Date;
}
