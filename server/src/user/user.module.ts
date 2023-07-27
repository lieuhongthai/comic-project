import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from 'src/database/database.module';
import { LoggerModule } from 'src/loggers/logger.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [DatabaseModule, LoggerModule],
})
export class UserModule {}
