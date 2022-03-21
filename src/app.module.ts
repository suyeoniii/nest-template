import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
