import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from 'src/database/database.module';
import { LoggerModule } from 'src/loggers/logger.module';
import { BullModule } from '@nestjs/bull';
import { FileUploadProcessor } from './handleFile.service';
import { BullBoardModule } from 'nestjs-bull-board';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';

@Module({
  controllers: [UserController],
  providers: [UserService, FileUploadProcessor],
  imports: [
    DatabaseModule,
    LoggerModule,
    BullModule.registerQueue({ name: 'file-upload-queue' }),
    BullBoardModule.forFeature({
      name: 'file-upload-queue',
      adapter: BullMQAdapter,
    }),
  ],
})
export class UserModule {}
