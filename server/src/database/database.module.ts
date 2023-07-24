import { Module } from '@nestjs/common';
import { databaseProviders } from './database.provider';
import { ConfigModule } from '@nestjs/config';
import { databaseModels } from './entities';
import { UserRepository } from './repositories/user/user.repository';
import { RoleRepository } from './repositories/role/role.repository';

@Module({
  imports: [ConfigModule],
  providers: [
    ...databaseProviders,
    ...databaseModels,
    UserRepository,
    RoleRepository,
  ],
  exports: [
    ...databaseProviders,
    ...databaseModels,
    UserRepository,
    RoleRepository,
  ],
})
export class DatabaseModule {}
