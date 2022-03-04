import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot(), ConfigModule.forRoot(), UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
