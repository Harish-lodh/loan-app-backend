import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { DealersModule } from './dealers/dealers.module'
import { CustomersModule } from './customers/customers.module';
import { LeadsModule } from './leads/leads.module';
import { DocumentsModule } from './documents/documents.module';
import { User } from './users/user.entity'
import { Dealer } from './dealers/entities/dealer.entity';
import { Customer } from './customers/entities/customer.entity';
import { Lead } from './leads/entities/lead.entity';
import { DocumentFile } from './documents/entities/document.entity';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        entities: [User, Dealer, Customer, Lead, DocumentFile],
        synchronize: true, // ⚠️ dev only; switch off in prod & use migrations
      }),
    }),
    AuthModule,
    UsersModule,
    DealersModule,
    CustomersModule,
    LeadsModule,
    DocumentsModule,
  ],
})
export class AppModule {}
