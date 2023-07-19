import { Module } from '@nestjs/common';
import { databaseProviders } from './database.provider';
import { ConfigModule } from '@nestjs/config';
import { databaseModels } from './entities';

@Module({
  imports: [ConfigModule],
  providers: [...databaseProviders, ...databaseModels],
  exports: [...databaseProviders, ...databaseModels],
})
export class DatabaseModule {}
