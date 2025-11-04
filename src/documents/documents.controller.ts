import { Body, Controller, Get, Param, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuid } from 'uuid';
import { DocumentsService } from './documents.service';
import { JwtAuthGuard } from '../common/jwt-auth.guard';
import { RolesGuard } from '../common/roles.guard';
import { Roles } from '../common/roles.decorator';
import { Role } from '../common/roles.enum';
import { ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';

const storage = diskStorage({
  destination: process.env.FILE_UPLOAD_DIR || './uploads',
  filename: (_req, file, cb) => cb(null, `${uuid()}${extname(file.originalname)}`),
});

@Controller('documents')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
export class DocumentsController {
  constructor(private service: DocumentsService) {}

  @Post(':ownerType/:ownerId/:docType')
  @ApiConsumes('multipart/form-data')
  @Roles(Role.DEALER, Role.RM, Role.ADMIN)
  @UseInterceptors(FileInterceptor('file', { storage }))
  upload(
    @Param('ownerType') ownerType: 'DEALER'|'CUSTOMER'|'LEAD',
    @Param('ownerId') ownerId: number,
    @Param('docType') docType: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.service.save(ownerType, +ownerId, docType, file);
  }

  @Get(':ownerType/:ownerId')
  @Roles(Role.DEALER, Role.RM, Role.CREDIT, Role.ADMIN)
  list(@Param('ownerType') ownerType: 'DEALER'|'CUSTOMER'|'LEAD', @Param('ownerId') ownerId: number) {
    return this.service.list(ownerType, +ownerId);
  }
}
