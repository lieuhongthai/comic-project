import { Module } from '@nestjs/common';
import { BullBoardQueueService } from './bull-board-queue.service';
import { BullBoardQueueController } from './bull-board-queue.controller';

@Module({
  controllers: [BullBoardQueueController],
  providers: [BullBoardQueueService],
  exports: [BullBoardQueueService],
})
export class BullBoardQueueModule {}
