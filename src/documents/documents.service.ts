import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DocumentFile } from './entities/document.entity'

@Injectable()
export class DocumentsService {
  constructor(@InjectRepository(DocumentFile) private repo: Repository<DocumentFile>) {}

  save(ownerType: DocumentFile['ownerType'], ownerId: number, docType: string, file: Express.Multer.File) {
    const doc = this.repo.create({
      ownerType, ownerId, docType,
      fileName: file.filename,
      originalName: file.originalname,
      mimeType: file.mimetype,
      path: file.path,
    });
    return this.repo.save(doc);
  }

  list(ownerType: DocumentFile['ownerType'], ownerId: number) {
    return this.repo.find({ where: { ownerType, ownerId } });
  }
}
