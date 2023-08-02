import { Module } from '@nestjs/common';
import { databaseProviders } from './database.provider';
import { ConfigModule } from '@nestjs/config';
import { databaseModels } from './entities';
import { UserRepository } from './repositories/user/user.repository';
import { RoleRepository } from './repositories/role/role.repository';
import { AuthRepository } from './repositories/auth/auth.repository';

@Module({
  imports: [ConfigModule],
  providers: [
    ...databaseProviders,
    ...databaseModels,
    UserRepository,
    RoleRepository,
    AuthRepository,
  ],
  exports: [
    ...databaseProviders,
    ...databaseModels,
    UserRepository,
    RoleRepository,
    AuthRepository,
  ],
})
export class DatabaseModule {}
