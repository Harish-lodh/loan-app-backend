import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Role } from '../common/roles.enum';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 150 })
  name: string;

  @Column({ length: 150, unique: true })
  email: string;

  @Column({ length: 20, nullable: true, unique: true })
  mobile?: string;

  @Column()
  passwordHash: string;

  @Column({ type: 'enum', enum: Role, default: Role.RM })
  role: Role;

  @Column({ type: 'json', nullable: true })
  permissions?: any;

  @Column({ default: 'ACTIVE' })
  status: 'ACTIVE' | 'INACTIVE';

  @CreateDateColumn() createdAt: Date;
  @UpdateDateColumn() updatedAt: Date;
}
