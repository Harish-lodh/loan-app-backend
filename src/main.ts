import * as dotenv from 'dotenv';
dotenv.config(); // ⬅️ Load .env before anything else

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const config = new DocumentBuilder()
    .setTitle('Loan LOS Core API')
    .setDescription('RMs register dealers; dealers onboard customers & leads.')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const doc = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, doc);

  const port = process.env.PORT || 5000;
  await app.listen(port);
  console.log(`Server running on http://localhost:${port}`);
}
bootstrap();
