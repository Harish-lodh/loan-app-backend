import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentFile } from './entities/document.entity'
import { DocumentsService } from './documents.service';
import { DocumentsController } from './documents.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DocumentFile])],
  providers: [DocumentsService],
  controllers: [DocumentsController],
})
export class DocumentsModule {}
