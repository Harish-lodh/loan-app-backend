import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index } from 'typeorm';

@Entity('documents')
export class DocumentFile {
  @PrimaryGeneratedColumn('increment') id: number;

  @Index() @Column() ownerType: 'DEALER' | 'CUSTOMER' | 'LEAD';
  @Index() @Column() ownerId: number;

  @Column({ length: 60 }) docType: string; // 'AADHAR_FRONT', 'PAN', 'INVOICE', etc.
  @Column({ length: 255 }) fileName: string; // stored name
  @Column({ length: 255 }) originalName: string; // uploaded name
  @Column({ length: 100 }) mimeType: string;
  @Column({ length: 500 }) path: string;
  @CreateDateColumn() uploadedAt: Date;
}
